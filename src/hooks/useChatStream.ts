'use client'

import { useState, useCallback, useRef } from 'react'
import { ChatMessage } from '@/types'

/* ─── Helpers ───────────────────────────────────────────────────────── */

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/* ─── Hook ──────────────────────────────────────────────────────────── */

export function useChatStream() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const messagesRef = useRef<ChatMessage[]>([])

  // Keep ref in sync so sendMessage never reads stale state
  messagesRef.current = messages

  /* ── Send ────────────────────────────────────────────────────────── */

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || abortControllerRef.current) return

    setError(null)

    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    }

    const assistantMessage: ChatMessage = {
      id: generateId(),
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage, assistantMessage])
    setIsStreaming(true)

    // Build API payload from ref (always current) + the new user message
    const apiMessages = [...messagesRef.current, userMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }))

    try {
      abortControllerRef.current = new AbortController()

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response stream')

      const decoder = new TextDecoder()
      let buffer = ''       // raw text received from API
      let displayed = ''    // text currently shown in UI
      let streamDone = false

      // Drip characters from buffer to UI at a readable pace
      const CHARS_PER_TICK = 3
      const TICK_MS = 16

      const drip = (): Promise<void> =>
        new Promise((resolve) => {
          const tick = () => {
            if (displayed.length >= buffer.length && streamDone) {
              // Final flush
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessage.id ? { ...m, content: buffer } : m
                )
              )
              resolve()
              return
            }

            const end = Math.min(displayed.length + CHARS_PER_TICK, buffer.length)
            displayed = buffer.slice(0, end)

            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMessage.id ? { ...m, content: displayed } : m
              )
            )

            setTimeout(tick, TICK_MS)
          }
          tick()
        })

      const dripPromise = drip()

      // Fill buffer from API stream
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
      }

      streamDone = true
      await dripPromise
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return

      setError('Something went wrong. Please try again.')
      setMessages((prev) => prev.filter((m) => m.id !== assistantMessage.id))
    } finally {
      setIsStreaming(false)
      abortControllerRef.current = null
    }
  }, [])

  /* ── Cancel ──────────────────────────────────────────────────────── */

  const cancelStream = useCallback(() => {
    abortControllerRef.current?.abort()
    setIsStreaming(false)
  }, [])

  /* ── Clear ───────────────────────────────────────────────────────── */

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return { messages, isStreaming, error, sendMessage, cancelStream, clearMessages }
}
