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

        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-6">
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-[#060810] shadow-[0_0_30px_rgba(94,234,212,0.2)] transition-transform hover:scale-105 md:w-auto md:px-10 md:py-5 md:text-lg"
          >
            <Mail className="h-4 w-4 md:h-5 md:w-5" /> Say Hello
          </a>
          <a
            href={personalInfo.calendly}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-[#f0ede6]/15 px-6 py-3.5 text-sm font-medium text-[#f0ede6] transition-colors hover:bg-[#f0ede6]/8 md:w-auto md:px-10 md:py-5 md:text-lg"
          >
            <Calendar className="h-4 w-4 md:h-5 md:w-5" /> Schedule a Call
          </a>
          <a
            href={personalInfo.cv}
            download
            className="flex w-full items-center justify-center gap-3 rounded-full border border-[#f0ede6]/15 px-6 py-3.5 text-sm font-medium text-[#f0ede6] transition-colors hover:bg-[#f0ede6]/8 md:w-auto md:px-10 md:py-5 md:text-lg"
          >
            <Download className="h-4 w-4 md:h-5 md:w-5" /> Download CV
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-[#f0ede6]/15 px-6 py-3.5 text-sm font-medium text-[#f0ede6] transition-colors hover:bg-[#f0ede6]/8 md:w-auto md:px-10 md:py-5 md:text-lg"
          >
            <Linkedin className="h-4 w-4 md:h-5 md:w-5" /> LinkedIn
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
