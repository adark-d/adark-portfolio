'use client'

import { useState, useEffect } from 'react'
import { Github, Linkedin, X } from 'lucide-react'
import { personalInfo } from '@/data/content'
import { useChat } from '@/context/ChatContext'
import { useActiveSection } from '@/hooks/useActiveSection'
import { SECTION_IDS, NAV_ITEMS } from '@/config/navigation'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ─── Component ─────────────────────────────────────────────────────── */

export default function Navbar() {
  const activeSection = useActiveSection(SECTION_IDS)
  const activeSectionObj = NAV_ITEMS.find((n) => n.id === activeSection) || NAV_ITEMS[0]
  const { toggle, isOpen } = useChat()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isScrolled = scrollY > 50

  return (
    <>
      {/* ── Full-Screen Mobile Menu Overlay ────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[60] overflow-y-auto bg-[#060810]/95 backdrop-blur-3xl transition-all duration-700 ${
          isMobileMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 z-10 p-2 text-white/50 transition-transform hover:rotate-90 hover:text-white sm:top-8 sm:right-8"
        >
          <X className="h-8 w-8" />
        </button>
        <div className="flex min-h-full flex-col justify-center px-8 py-20 sm:px-12">
        <div className="flex flex-col gap-5 sm:gap-8">
          {NAV_ITEMS.map((nav, i) => (
            <button
              key={nav.id}
              onClick={() => { setIsMobileMenuOpen(false); scrollTo(nav.id) }}
              className={`transform text-left font-serif text-2xl text-white transition-all duration-500 hover:text-accent sm:text-3xl md:text-6xl ${
                isMobileMenuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 100 + 100}ms` }}
            >
              <span className="mr-4 mb-2 block font-mono text-xs tracking-widest text-warm/50 uppercase">
                {nav.index}
              </span>
              <span className="capitalize">{nav.label}</span>
            </button>
          ))}
          {/* AI chat toggle in mobile menu */}
          <button
            onClick={() => { setIsMobileMenuOpen(false); toggle() }}
            className={`transform text-left font-serif text-2xl transition-all duration-500 sm:text-3xl md:text-6xl ${
              isMobileMenuOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
            } ${isOpen ? 'text-accent' : 'text-white hover:text-accent'}`}
            style={{ transitionDelay: `${NAV_ITEMS.length * 100 + 100}ms` }}
          >
            <span className="mr-4 mb-2 block font-mono text-xs tracking-widest text-warm/50 uppercase">
              06
            </span>
            <span className="relative">
              AI Assistant
              <span className="ml-3 inline-block h-2 w-2 rounded-full bg-accent">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-accent opacity-75" />
              </span>
            </span>
          </button>
        </div>
        </div>
      </div>

      {/* ── Morphing Mirror HUD (Notch → Fixed Frosted Navbar) ─────────── */}
      <nav
        className={`fixed z-50 flex items-center justify-center overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'top-0 left-0 h-16 w-full translate-x-0 rounded-none border-b border-[#f0ede6]/8 bg-[#060810]/80 shadow-[0_10px_40px_rgba(0,0,0,0.5)] saturate-[1.5] backdrop-blur-2xl md:h-20'
            : 'top-6 left-1/2 h-12 w-[240px] -translate-x-1/2 rounded-full border border-[#f0ede6]/8 bg-[#0b0d17]/80 backdrop-blur-xl md:top-8 md:h-14 md:w-[280px] md:hover:w-[calc(100vw-6rem)] lg:hover:w-[calc(100vw-12rem)] md:hover:max-w-[1400px]'
        } group cursor-pointer md:cursor-default`}
        onClick={() => {
          if (!isScrolled && window.innerWidth < 768) setIsMobileMenuOpen(true)
        }}
      >
        {/* Collapsed State: System Status Indicator (Notch mode only) */}
        <div
          className={`absolute flex items-center justify-center gap-3 transition-all duration-500 ease-out ${
            isScrolled
              ? 'pointer-events-none hidden scale-90 opacity-0'
              : 'md:group-hover:pointer-events-none md:group-hover:scale-90 md:group-hover:opacity-0'
          }`}
        >
          <div className="h-1.5 w-1.5 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-accent shadow-[0_0_10px_rgba(94,234,212,0.6)]" />
          <span className="font-mono text-[10px] tracking-widest whitespace-nowrap text-white uppercase md:text-xs">
            {activeSectionObj.label}
          </span>
          {/* Mobile hamburger hint */}
          <div className="ml-2 flex flex-col gap-[3px] opacity-50 md:hidden">
            <span className="block h-[1px] w-3 bg-white" />
            <span className="block h-[1px] w-2 bg-white" />
          </div>
        </div>

        {/* Expanded / Scrolled Mirror State: Full Command Center */}
        <div
          className={`mx-auto h-full w-full max-w-[1400px] items-center justify-between transition-all duration-700 ease-out ${
            isScrolled
              ? 'pointer-events-auto flex scale-100 px-6 opacity-100 md:px-12 lg:px-24'
              : 'pointer-events-none absolute inset-0 hidden scale-105 px-8 opacity-0 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 md:flex'
          }`}
        >
          <span className="font-serif text-xl font-medium tracking-tighter text-white">
            Adarkwah.
          </span>

          <div className="hidden items-center gap-1 rounded-full border border-[#f0ede6]/6 bg-[#0b0d17]/60 p-1.5 shadow-inner md:flex">
            {NAV_ITEMS.map((nav) => (
              <button
                key={nav.id}
                onClick={() => scrollTo(nav.id)}
                className={`rounded-full px-5 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 ${
                  activeSection === nav.id
                    ? 'bg-white font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                    : 'text-[#f0ede6]/40 hover:bg-[#f0ede6]/8 hover:text-[#f0ede6]'
                }`}
              >
                {nav.short}
              </button>
            ))}
            <button
              onClick={toggle}
              className={`relative rounded-full px-5 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 ${
                isOpen
                  ? 'bg-accent/10 text-accent'
                  : 'text-[#f0ede6]/40 hover:bg-[#f0ede6]/8 hover:text-[#f0ede6]'
              }`}
            >
              ai
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              </span>
            </button>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-5 md:flex">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-white/30 transition-colors hover:text-accent"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="text-white/30 transition-colors hover:text-accent"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>

            {/* Mobile hamburger (visible in scrolled mirror state) */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsMobileMenuOpen(true)
              }}
              className={`flex-col gap-1.5 p-2 md:hidden ${isScrolled ? 'flex' : 'hidden'}`}
            >
              <span className="block h-[2px] w-6 bg-white" />
              <span className="block h-[2px] w-4 bg-white" />
            </button>
          </div>
        </div>
      </nav>

    </>
  )
}
