'use client'

import { useState, useEffect } from 'react'
import { Command, MoveRight } from 'lucide-react'

interface NavbarProps {
  onOpenCmdK: () => void
}

export default function Navbar({ onOpenCmdK }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 z-40 w-full transition-all duration-500 ${isScrolled ? 'border-b border-stone-200 bg-[#FAF9F6]/90 py-4 shadow-sm backdrop-blur-md' : 'bg-transparent py-6 md:py-8'}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <a href="#" className="group flex cursor-pointer flex-col outline-none">
          <div className="flex items-end">
            <svg
              viewBox="0 0 24 24"
              className="h-[20px] w-[20px] stroke-current text-stone-900 transition-transform duration-500 group-hover:-translate-y-0.5 md:h-[22px] md:w-[22px]"
            >
              <path
                d="M 3 24 L 12 2 L 21 24"
                fill="none"
                strokeWidth="4.5"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
              />
            </svg>
            <span className="ml-[1px] translate-y-[2px] text-xl leading-none font-medium tracking-tighter text-stone-500 transition-colors duration-500 group-hover:text-stone-800 md:translate-y-[3px] md:text-2xl">
              dark
            </span>
          </div>
          <div className="mt-1.5 flex w-full items-center opacity-70 transition-opacity duration-500 group-hover:opacity-100">
            <div className="h-[2px] flex-grow bg-stone-300 transition-colors duration-500 group-hover:bg-stone-800"></div>
            <div className="ml-1 h-1.5 w-1.5 rounded-full bg-orange-600 transition-all duration-500 group-hover:bg-orange-500 group-hover:shadow-[0_0_8px_rgba(234,88,12,0.6)]"></div>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 text-sm font-medium text-stone-500 md:flex">
          <a href="#about" className="transition-colors hover:text-stone-900">
            About
          </a>
          <a href="#expertise" className="transition-colors hover:text-stone-900">
            Expertise
          </a>
          <a href="#work" className="transition-colors hover:text-stone-900">
            Selected Work
          </a>

          <button
            onClick={onOpenCmdK}
            className="group flex items-center gap-2 rounded-full border border-stone-200 bg-stone-100 px-3 py-1.5 text-stone-500 transition-all hover:bg-stone-200 hover:text-stone-800"
          >
            <Command className="h-3.5 w-3.5" />
            <span>Command</span>
            <span className="ml-1 flex gap-0.5 opacity-70">
              <kbd className="font-mono text-[10px]">⌘</kbd>
              <kbd className="font-mono text-[10px]">K</kbd>
            </span>
          </button>

          <a
            href="#contact"
            className="flex items-center gap-1 text-stone-900 transition-colors hover:text-orange-700"
          >
            Connect <MoveRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={onOpenCmdK}
          className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-100 px-4 py-2 text-sm font-medium text-stone-800 transition-colors hover:bg-stone-200 md:hidden"
        >
          <Command className="h-4 w-4" /> Menu
        </button>
      </div>
    </nav>
  )
}
