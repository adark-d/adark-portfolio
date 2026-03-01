'use client'

import { useEffect, useRef } from 'react'

/* ─── Types ─────────────────────────────────────────────────────────── */

interface DecryptedTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  trigger: boolean
}

/* ─── Constants ─────────────────────────────────────────────────────── */

const SCRAMBLE_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789-_/*+<>'

/* ─── Component ─────────────────────────────────────────────────────── */

export default function DecryptedText({
  text,
  speed = 40,
  delay = 0,
  className = '',
  trigger,
}: DecryptedTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)
  const chars = SCRAMBLE_CHARS

  useEffect(() => {
    if (!trigger || hasAnimated.current || !spanRef.current) return

    let iteration = 0
    let timeoutId: ReturnType<typeof setTimeout>
    let intervalId: ReturnType<typeof setInterval>

    const startAnimation = () => {
      intervalId = setInterval(() => {
        if (!spanRef.current) return

        const scrambled = text
          .split('')
          .map((letter, index) => {
            if (letter === ' ') return ' '
            if (index < iteration) return text[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')

        spanRef.current.innerText = scrambled

        if (iteration >= text.length) {
          spanRef.current.innerText = text
          clearInterval(intervalId)
          hasAnimated.current = true
        }
        iteration += 1 / 3
      }, speed)
    }

    timeoutId = setTimeout(startAnimation, delay)
    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [trigger, text, speed, delay])

  return (
    <span className={`relative inline-block max-w-full ${className}`}>
      <span className="invisible break-words whitespace-pre-wrap">{text}</span>
      <span
        ref={spanRef}
        className="absolute top-0 left-0 h-full w-full break-words whitespace-pre-wrap"
        aria-hidden="true"
      >
        {text
          .split('')
          .map((c) => (c === ' ' ? ' ' : '·'))
          .join('')}
      </span>
    </span>
  )
}
