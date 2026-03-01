/**
 * Hero section with a live neural network canvas background and
 * fluid clamp()-based typography overlay.
 *
 * The canvas renders a layered feedforward network (nodes, edges,
 * signal pulses) via the engine in `@/lib/neuralNetwork`. Cursor
 * proximity triggers activation cascades that propagate forward
 * through the layers — a visual metaphor for AI data processing.
 *
 * All text sizing uses CSS clamp() for smooth responsive scaling
 * from mobile to ultrawide — no breakpoints needed.
 */

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { personalInfo } from '@/data/content'
import { ChevronDown } from 'lucide-react'
import {
  type Network,
  buildNetwork,
  updateNetwork,
  renderNetwork,
} from '@/lib/neuralNetwork'

/* ─── Component ────────────────────────────────────────────────────── */

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<Network>({ nodes: [], edges: [], numLayers: 6 })
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animRef = useRef<number>(0)
  const frameRef = useRef(0)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    let active = true
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1

    let lastW = 0
    let lastH = 0
    let currentIsMobile = window.innerWidth < 768
    let visible = true

    /**
     * Sync the canvas pixel-buffer to the container's layout dimensions.
     *
     * IMPORTANT — the parent <section> applies 3D scroll transforms
     * (perspective, translateZ, rotateX, scale). getBoundingClientRect()
     * returns the screen-projected rect *after* those transforms, so it
     * would produce corrupted dimensions whenever this runs mid-scroll.
     * offsetWidth / offsetHeight and ResizeObserver.contentRect both
     * report the element's own CSS layout box, which is transform-immune.
     *
     * The canvas display size is handled entirely by CSS `absolute inset-0`
     * (stretches to fill the container). We only set the buffer dimensions
     * here — no inline style.width / style.height, which would overconstrain
     * the layout and pin the canvas to whatever JS last wrote.
     */
    const syncBuffer = (w: number, h: number) => {
      if (!active || w === 0 || h === 0) return
      if (w === lastW && h === lastH) return

      lastW = w
      lastH = h
      currentIsMobile = window.innerWidth < 768

      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      networkRef.current = buildNetwork(w, h, currentIsMobile)
      frameRef.current = 0
    }

    const draw = () => {
      if (!active || !visible) return
      frameRef.current++
      ctx.clearRect(0, 0, lastW, lastH)
      updateNetwork(networkRef.current, mouseRef.current.x, mouseRef.current.y, frameRef.current, currentIsMobile)
      renderNetwork(ctx, networkRef.current, currentIsMobile)
      animRef.current = requestAnimationFrame(draw)
    }

    syncBuffer(container.offsetWidth, container.offsetHeight)
    animRef.current = requestAnimationFrame(draw)
    setTimeout(() => { if (active) setRevealed(true) }, 600)

    /* ResizeObserver — use entry.contentRect (transform-immune layout box) */
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      syncBuffer(Math.round(width), Math.round(height))
    })
    ro.observe(container)

    /* Pause when hero leaves viewport, resume + re-sync on return */
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        syncBuffer(container.offsetWidth, container.offsetHeight)
        cancelAnimationFrame(animRef.current)
        animRef.current = requestAnimationFrame(draw)
      } else {
        cancelAnimationFrame(animRef.current)
      }
    }, { threshold: 0 })
    io.observe(container)

    /* Re-sync when returning from a background tab */
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && visible) {
        syncBuffer(container.offsetWidth, container.offsetHeight)
        cancelAnimationFrame(animRef.current)
        animRef.current = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      active = false
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  /* ── Mouse / Touch ──────────────────────────────────────────────── */

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const t = e.touches[0]
    mouseRef.current = { x: t.clientX - rect.left, y: t.clientY - rect.top }
  }, [])

  const resetMouse = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 }
  }, [])

  /* ── Render ─────────────────────────────────────────────────────── */

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={resetMouse}
      onTouchEnd={resetMouse}
      className="relative flex h-full w-full flex-col items-center justify-center"
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 z-0 h-full w-full" />

      {/* Identity — clamp()-scaled typography, no breakpoints needed */}
      <div className="pointer-events-none relative z-10 flex flex-col items-center gap-[clamp(0.75rem,2vw,2rem)] px-6">
        <h1
          className={`text-center font-serif font-semibold leading-[0.95] tracking-tight text-[#f0ede6] transition-all duration-1000 text-[clamp(1.75rem,7vw,7.5rem)] ${
            revealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          David<br />Adarkwah
        </h1>

        <p
          className={`max-w-xl text-center font-serif tracking-tight text-[#f0ede6]/45 italic transition-all delay-300 duration-1000 text-[clamp(0.8rem,2.5vw,1.625rem)] ${
            revealed ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          {personalInfo.tagline}
        </p>

        <p
          className={`text-center font-mono tracking-[0.2em] text-warm/40 uppercase transition-all delay-500 duration-1000 text-[clamp(0.45rem,1.2vw,0.85rem)] ${
            revealed ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
        >
          {personalInfo.role} · {personalInfo.location}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-[clamp(1rem,3vw,2.5rem)] left-1/2 z-10 -translate-x-1/2 transition-all delay-700 duration-1000 ${
          revealed ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
      >
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-[clamp(0.25rem,0.5vw,0.5rem)] text-[#f0ede6]/15 transition-colors hover:text-accent/40"
        >
          <span className="font-mono tracking-[0.3em] uppercase text-[clamp(0.4rem,0.8vw,0.6rem)]">Scroll</span>
          <ChevronDown style={{ width: 'clamp(0.75rem, 1.2vw, 1rem)', height: 'clamp(0.75rem, 1.2vw, 1rem)' }} className="animate-bounce" />
        </button>
      </div>
    </div>
  )
}
