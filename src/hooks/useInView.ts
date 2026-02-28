'use client'

import { useState, useEffect, useRef } from 'react'

/* ─── Types ─────────────────────────────────────────────────────────── */

interface UseInViewOptions {
  threshold?: number
  triggerOnce?: boolean
}

/* ─── Hook ──────────────────────────────────────────────────────────── */

export const useInView = (options: UseInViewOptions = {}) => {
  const { threshold = 0.2, triggerOnce = false } = options
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce && ref.current) observer.unobserve(ref.current)
        } else {
          if (!triggerOnce) setIsInView(false)
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, triggerOnce])

  return [ref, isInView] as const
}
