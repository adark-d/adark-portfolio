'use client'

import { useState, useEffect } from 'react'

/* ─── Hook ──────────────────────────────────────────────────────────── */

export const useScrollPhysics = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY))
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}
