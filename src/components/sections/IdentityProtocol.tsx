'use client'

import { useState, useEffect, useRef } from 'react'
import { Fingerprint, Trophy, ChevronLeft, ChevronRight } from 'lucide-react'
import { personalInfo, awards } from '@/data/content'
import { useInView } from '@/hooks/useInView'

const WHEEL_DEBOUNCE_MS = 800

/* ─── Component ─────────────────────────────────────────────────────── */

export default function IdentityProtocol() {
  const [activeAwardIdx, setActiveAwardIdx] = useState(0)
  const [identityRef, isIdentityInView] = useInView({ threshold: 0.1, triggerOnce: false })
  const carouselContainerRef = useRef<HTMLDivElement>(null)
  const wheelTimeout = useRef(false)

  const nextAward = () => setActiveAwardIdx((prev) => Math.min(prev + 1, awards.length - 1))
  const prevAward = () => setActiveAwardIdx((prev) => Math.max(prev - 1, 0))

  useEffect(() => {
    const container = carouselContainerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()
        if (!wheelTimeout.current && Math.abs(e.deltaX) > 10) {
          if (e.deltaX > 0) {
            setActiveAwardIdx((prev) => Math.min(prev + 1, awards.length - 1))
          } else {
            setActiveAwardIdx((prev) => Math.max(prev - 1, 0))
          }
          wheelTimeout.current = true
          setTimeout(() => {
            wheelTimeout.current = false
          }, WHEEL_DEBOUNCE_MS)
        }
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <section id="about" ref={identityRef} className="relative z-20 bg-surface pt-20 pb-12 md:pt-32 md:pb-20">
      <div className="pointer-events-none absolute top-0 right-0 -z-10 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/[0.03] blur-[100px]" />

      {/* Part A — Axioms */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        <div className="mb-12 flex items-center justify-between border-b border-[#f0ede6]/8 pb-6 md:mb-20 md:pb-8">
          <h2 className="flex items-center gap-3 font-mono text-sm tracking-[0.2em] text-[#f0ede6]/40 uppercase">
            <Fingerprint className="h-4 w-4" /> About
          </h2>
          <span className="hidden font-serif text-xl text-warm/25 italic md:block">Core Philosophy</span>
        </div>

        <div
          className={`mx-auto mb-16 w-full max-w-5xl transition-all duration-1000 md:mb-32 ${
            isIdentityInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <h3 className="mb-8 text-center font-serif text-3xl leading-[1.1] tracking-tight text-[#f0ede6] md:mb-12 md:text-left md:text-5xl lg:text-7xl">
            Raw data is just noise until you engineer it into{' '}
            <span className="text-accent/60 italic">action.</span>
          </h3>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
            <div className="space-y-4 text-base leading-relaxed font-light text-[#f0ede6]/60 md:text-lg">
              <p>{personalInfo.philosophy}</p>
            </div>
            <div className="grid grid-rows-2 gap-6 border-t border-[#f0ede6]/8 pt-6 md:gap-8 md:border-t-0 md:border-l md:pt-0 md:pl-12">
              <div>
                <span className="mb-2 block font-serif text-2xl text-[#f0ede6] md:text-3xl">01</span>
                <span className="mb-2 block font-mono text-xs tracking-widest text-warm/50 uppercase">
Design Principle
                </span>
                <p className="text-sm font-light text-[#f0ede6]/65">
                  Infrastructure must be invisible, fault-tolerant, and infinitely scalable.
                </p>
              </div>
              <div>
                <span className="mb-2 block font-serif text-2xl text-[#f0ede6] md:text-3xl">02</span>
                <span className="mb-2 block font-mono text-xs tracking-widest text-warm/50 uppercase">
Current Focus
                </span>
                <p className="text-sm font-light text-[#f0ede6]/65">
                  Transitioning from single-prompt LLMs to deterministic multi-agent swarms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part B — Award Carousel */}
      <div
        className={`w-full transition-all delay-300 duration-1000 ${
          isIdentityInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        <div className="mx-auto mb-8 flex max-w-[1400px] items-end justify-between px-6 md:px-12 lg:px-24">
          <h4 className="flex items-center gap-3 font-mono text-sm tracking-[0.2em] text-[#f0ede6]/40 uppercase">
            <Trophy className="h-4 w-4" /> Awards & Recognition
          </h4>
          <div className="relative z-50 flex gap-2">
            <button
              onClick={prevAward}
              disabled={activeAwardIdx === 0}
              className="rounded-full border border-[#f0ede6]/10 bg-elevated p-3 text-[#f0ede6]/50 transition-colors hover:bg-raised hover:text-[#f0ede6] active:scale-90 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextAward}
              disabled={activeAwardIdx === awards.length - 1}
              className="rounded-full border border-[#f0ede6]/10 bg-elevated p-3 text-[#f0ede6]/50 transition-colors hover:bg-raised hover:text-[#f0ede6] active:scale-90 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-24">
          <div
            className="relative w-full overflow-hidden py-4"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              maskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <div
              ref={carouselContainerRef}
              className="relative flex h-[350px] w-full items-center justify-center md:h-[450px]"
              style={{ perspective: '1200px' }}
            >
              {awards.map((award, idx) => {
                const offset = idx - activeAwardIdx
                const absOffset = Math.abs(offset)
                const isActive = offset === 0

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveAwardIdx(idx)}
                    className={`absolute flex w-[85%] max-w-[340px] shrink-0 flex-col rounded-3xl p-8 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:max-w-[450px] ${
                      isActive
                        ? 'cursor-default shadow-[0_20px_60px_-15px_rgba(94,234,212,0.35)]'
                        : 'cursor-pointer'
                    }`}
                    style={{
                      transform: `translateX(calc(${offset * 105}%)) scale(${
                        isActive ? 1 : 0.85 - absOffset * 0.05
                      }) rotateY(${offset * -15}deg)`,
                      filter: `blur(${isActive ? '0px' : `${absOffset * 5}px`})`,
                      opacity: isActive ? 1 : Math.max(0, 0.6 - absOffset * 0.2),
                      zIndex: 50 - absOffset,
                      backgroundColor: isActive ? '#10131f' : '#0b0d17',
                      borderColor: isActive ? 'rgba(94,234,212,0.3)' : 'rgba(240,237,230,0.06)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                    }}
                  >
                    <div className="mb-6 flex items-start justify-between">
                      <span
                        className={`rounded border px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors duration-700 ${
                          isActive
                            ? 'border-accent/30 bg-accent/10 text-accent'
                            : 'border-[#f0ede6]/8 bg-[#f0ede6]/5 text-[#f0ede6]/30'
                        }`}
                      >
                        {award.category}
                      </span>
                      <span className="font-mono text-xs text-white/30">{award.date}</span>
                    </div>
                    <h5
                      className={`mb-4 text-xl font-bold tracking-tight transition-colors duration-700 md:text-2xl ${
                        isActive ? 'text-white' : 'text-white/60'
                      }`}
                    >
                      {award.title}
                    </h5>
                    <p
                      className={`flex-1 text-sm leading-relaxed font-light transition-colors duration-700 md:text-base ${
                        isActive ? 'text-white/80' : 'text-white/30'
                      }`}
                    >
                      {award.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
