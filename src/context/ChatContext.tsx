'use client'

import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react'

/* ─── Types ─────────────────────────────────────────────────────────── */

interface ChatContextType {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

/* ─── Context ───────────────────────────────────────────────────────── */

const ChatContext = createContext<ChatContextType | undefined>(undefined)

/* ─── Provider ──────────────────────────────────────────────────────── */

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  const value = useMemo(() => ({ isOpen, open, close, toggle }), [isOpen, open, close, toggle])

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

/* ─── Hook ──────────────────────────────────────────────────────────── */

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) throw new Error('useChat must be used within ChatProvider')
  return context
}
