'use client'

import { Mail, Linkedin, Calendar, Download } from 'lucide-react'
import { personalInfo } from '@/data/content'

/* ─── Component ─────────────────────────────────────────────────────── */

export default function Uplink() {
  return (
    <>
      <section
        id="connect"
        className="mx-auto max-w-[1400px] px-6 py-20 text-center md:px-12 md:py-32 lg:px-24"
      >
        <div className="mx-auto mb-12 h-px w-24 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <h2 className="mb-10 font-serif text-4xl tracking-tighter text-[#f0ede6] md:mb-16 md:text-7xl">
          Let&apos;s build something <br />
          <span className="text-accent/60 italic">meaningful.</span>
        </h2>

        <div className="flex items-center justify-center gap-5 md:flex-wrap md:gap-6">
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-[#060810] shadow-[0_0_30px_rgba(94,234,212,0.2)] transition-transform hover:scale-110 md:h-auto md:w-auto md:gap-3 md:px-10 md:py-5 md:text-lg md:font-medium"
          >
            <Mail className="h-5 w-5" />
            <span className="hidden md:inline">Say Hello</span>
          </a>
          <a
            href={personalInfo.calendly}
            target="_blank"
            rel="noreferrer"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-[#f0ede6]/15 text-[#f0ede6] transition-colors hover:bg-[#f0ede6]/8 md:h-auto md:w-auto md:gap-3 md:px-10 md:py-5 md:text-lg md:font-medium"
          >
            <Calendar className="h-5 w-5" />
            <span className="hidden md:inline">Schedule a Call</span>
          </a>
          <a
            href={personalInfo.cv}
            download
            className="flex h-14 w-14 items-center justify-center rounded-full border border-[#f0ede6]/15 transition-colors hover:bg-[#f0ede6]/8 md:h-auto md:w-auto md:gap-3 md:px-10 md:py-5 md:text-lg md:font-medium md:text-[#f0ede6]"
          >
            <span className="font-mono text-sm font-bold tracking-wider text-[#f0ede6] md:hidden">CV</span>
            <Download className="hidden h-5 w-5 md:block" />
            <span className="hidden md:inline">Download CV</span>
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-[#f0ede6]/15 text-[#f0ede6] transition-colors hover:bg-[#f0ede6]/8 md:h-auto md:w-auto md:gap-3 md:px-10 md:py-5 md:text-lg md:font-medium"
          >
            <Linkedin className="h-5 w-5" />
            <span className="hidden md:inline">LinkedIn</span>
          </a>
        </div>
      </section>

      <footer className="border-t border-[#f0ede6]/6 px-6 py-10 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <span className="font-serif text-2xl font-medium tracking-tighter text-[#f0ede6]">
              Adarkwah.
            </span>
            <span className="font-mono text-xs tracking-widest text-warm/35 uppercase">
              Engineer. Architect. Builder.
            </span>
          </div>
          <span className="text-center font-mono text-xs tracking-widest text-[#f0ede6]/18">
            © {new Date().getFullYear()} David Adarkwah. All rights reserved.
          </span>
        </div>
      </footer>
    </>
  )
}
