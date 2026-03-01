import { headers } from 'next/headers'
import Groq from 'groq-sdk'
import { buildSystemPrompt } from '@/lib/systemPrompt'
import { checkRateLimit } from '@/lib/rateLimit'
import { MAX_MESSAGE_LENGTH } from '@/config/chat'
import { MAX_MESSAGES, MAX_TOKENS, MODEL, FALLBACK_MODEL, TEMPERATURE } from '@/config/chat.server'

const ALLOWED_ORIGINS = [
  'https://dadark.dev',
  'https://www.dadark.dev',
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
].filter(Boolean)

/* ─── Groq Client ───────────────────────────────────────────────────── */

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

/* ─── Types ─────────────────────────────────────────────────────────── */

type ChatRole = 'user' | 'assistant'
type ValidMessage = { role: ChatRole; content: string }

/* ─── Validation ────────────────────────────────────────────────────── */

function validateMessages(messages: unknown): messages is ValidMessage[] {
  if (!Array.isArray(messages) || messages.length === 0) return false

  return messages.every(
    (m) =>
      typeof m === 'object' &&
      m !== null &&
      (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string' &&
      (m.role === 'assistant' || m.content.length <= MAX_MESSAGE_LENGTH)
  )
}

/* ─── Route Handler ─────────────────────────────────────────────────── */

export async function POST(request: Request) {
  try {
    /* ── Origin check ─────────────────────────────────────────────── */

    const reqHeaders = await headers()
    const origin = reqHeaders.get('origin')
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return new Response(
        JSON.stringify({ error: 'Forbidden.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    /* ── Rate limiting (10 req/min per IP) ────────────────────────── */

    const forwarded = reqHeaders.get('x-forwarded-for')
    const ip = forwarded?.split(',')[0].trim() ?? 'unknown'
    const { allowed, retryAfter } = checkRateLimit(ip)

    if (!allowed) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait a moment.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(retryAfter),
          },
        }
      )
    }

    /* ── Validate payload ─────────────────────────────────────────── */

    const body = await request.json()
    const { messages } = body

    if (!validateMessages(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages. Each message must have a role and content under 1000 characters.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const recentMessages = messages.slice(-MAX_MESSAGES)
    const systemPrompt = await buildSystemPrompt()
    const chatMessages = [{ role: 'system' as const, content: systemPrompt }, ...recentMessages]

    /* ── Stream from Groq (primary → fallback on rate limit) ───────── */

    const streamResponse = async (model: string) => {
      const stream = await groq.chat.completions.create({
        model,
        messages: chatMessages,
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS,
        stream: true,
      })

      const encoder = new TextEncoder()
      return new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const content = chunk.choices[0]?.delta?.content
              if (content) {
                controller.enqueue(encoder.encode(content))
              }
            }
            controller.close()
          } catch {
            controller.error(new Error('Stream interrupted'))
          }
        },
      })
    }

    let readableStream: ReadableStream
    try {
      readableStream = await streamResponse(MODEL)
    } catch (err) {
      const status = (err as { status?: number }).status
      if (status === 429 || status === 503) {
        readableStream = await streamResponse(FALLBACK_MODEL)
      } else {
        throw err
      }
    }

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process request. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
