'use client'

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Loader, RotateCcw, Check, Copy } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useChat } from '@/context/ChatContext'
import { useChatStream } from '@/hooks/useChatStream'
import { SUGGESTED_QUESTIONS, DRAWER_SPRING } from '@/config/chat'

/* ─── Copy Button ───────────────────────────────────────────────────── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* Clipboard unavailable (non-HTTPS, permission denied, iframe) */
    }
  }, [text])

  return (
    <button
      onClick={handleCopy}
      className="absolute -bottom-6 right-0 flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[10px] text-white/0 transition-all group-hover:text-white/30 hover:!bg-white/5 hover:!text-white/60"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" /> copied
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" /> copy
        </>
      )}
    </button>
  )
}

/* ─── Markdown Renderers ────────────────────────────────────────────── */

const markdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-xs text-accent">
      {children}
    </code>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-2 ml-4 list-disc space-y-1 last:mb-0">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mb-2 ml-4 list-decimal space-y-1 last:mb-0">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => <li className="text-white/70">{children}</li>,
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-accent underline underline-offset-2 hover:text-accent/80"
    >
      {children}
    </a>
  ),
}

/* ─── Chat Drawer ───────────────────────────────────────────────────── */

export default function ChatDrawer() {
  const { isOpen, close } = useChat()
  const { messages, isStreaming, error, sendMessage, clearMessages } = useChatStream()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* ── Auto-scroll on new messages ─────────────────────────────────── */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  /* ── Focus input when drawer opens ───────────────────────────────── */

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  /* ── Lock body scroll when open on mobile ────────────────────────── */

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  /* ── Close on Escape ─────────────────────────────────────────────── */

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) close()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, close])

  /* ── Handlers ────────────────────────────────────────────────────── */

  const handleSend = () => {
    if (!input.trim() || isStreaming) return
    sendMessage(input)
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  /* ── Render ──────────────────────────────────────────────────────── */

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={DRAWER_SPRING}
            className="fixed top-0 right-0 z-50 flex h-full w-full flex-col border-l border-[#f0ede6]/8 bg-[#0b0d17]/95 backdrop-blur-xl md:w-[420px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#f0ede6]/8 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="/favicon.svg" alt="" className="h-5 w-5 rounded-sm" />
                  <div className="absolute -top-0.5 -right-0.5 h-2 w-2 animate-pulse rounded-full bg-accent" />
                </div>
                <div>
                  <span className="font-mono text-xs tracking-widest text-[#f0ede6]/80 uppercase">
                    adarkwah.ai
                  </span>
                  <span className="ml-3 font-mono text-[10px] tracking-widest text-accent/60">
                    {isStreaming ? 'processing...' : 'online'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={clearMessages}
                    className="rounded-full p-2 text-white/30 transition-colors hover:bg-white/5 hover:text-white/60"
                    title="Clear conversation"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={close}
                  className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="hide-scroll flex-1 overflow-y-auto px-6 py-4">
              {messages.length === 0 ? (
                /* ── Empty State ──────────────────────────────────────── */
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#f0ede6]/8 bg-[#f0ede6]/5">
                    <img src="/favicon.svg" alt="" className="h-8 w-8 rounded-sm" />
                  </div>
                  <p className="mb-8 max-w-[280px] text-center text-sm font-light text-[#f0ede6]/40">
                    Ask me anything about David&apos;s experience, projects, or technical
                    expertise.
                  </p>
                  <div className="flex w-full flex-col gap-2">
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(q)}
                        className="rounded-lg border border-[#f0ede6]/5 bg-[#f0ede6]/[0.02] px-4 py-3 text-left text-sm text-[#f0ede6]/45 transition-all hover:border-accent/15 hover:bg-accent/[0.04] hover:text-[#f0ede6]/70"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* ── Conversation ─────────────────────────────────────── */
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`group relative max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          message.role === 'user'
                            ? 'bg-[#f0ede6]/10 text-[#f0ede6]'
                            : 'border border-[#f0ede6]/6 bg-[#f0ede6]/[0.03] text-[#f0ede6]/80'
                        }`}
                      >
                        {message.role === 'assistant' && !message.content && isStreaming ? (
                          <div className="flex gap-1">
                            <span
                              className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60"
                              style={{ animationDelay: '0ms' }}
                            />
                            <span
                              className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60"
                              style={{ animationDelay: '150ms' }}
                            />
                            <span
                              className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60"
                              style={{ animationDelay: '300ms' }}
                            />
                          </div>
                        ) : message.role === 'assistant' ? (
                          <>
                            <ReactMarkdown components={markdownComponents}>
                              {message.content}
                            </ReactMarkdown>
                            {message.content && !isStreaming && (
                              <CopyButton text={message.content} />
                            )}
                          </>
                        ) : (
                          <span className="whitespace-pre-wrap">{message.content}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}

              {error && (
                <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 font-mono text-xs text-red-400/80">
                  {error}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-[#f0ede6]/8 px-4 py-4">
              <div className="flex items-center gap-2 rounded-xl border border-[#f0ede6]/10 bg-[#f0ede6]/[0.03] px-4 py-2 transition-colors focus-within:border-accent/30">
                <span className="font-mono text-xs text-accent/50">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about David..."
                  disabled={isStreaming}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isStreaming}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-20"
                >
                  {isStreaming ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-center font-mono text-[9px] tracking-wider text-[#f0ede6]/12">
                Powered by Groq inference
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
