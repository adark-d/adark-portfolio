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
        <h2 className="mb-10 font-serif text-4xl tracking-tighter text-white md:mb-16 md:text-7xl">
          Let&apos;s build something <br />
          <span className="text-white/60 italic">meaningful.</span>
        </h2>

        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-6">
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-transform hover:scale-105 md:w-auto md:px-10 md:py-5 md:text-lg"
          >
            <Mail className="h-4 w-4 md:h-5 md:w-5" /> Say Hello
          </a>
          <a
            href={personalInfo.calendly}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10 md:w-auto md:px-10 md:py-5 md:text-lg"
          >
            <Calendar className="h-4 w-4 md:h-5 md:w-5" /> Schedule a Call
          </a>
          <a
            href={personalInfo.cv}
            download
            className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10 md:w-auto md:px-10 md:py-5 md:text-lg"
          >
            <Download className="h-4 w-4 md:h-5 md:w-5" /> Download CV
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10 md:w-auto md:px-10 md:py-5 md:text-lg"
          >
            <Linkedin className="h-4 w-4 md:h-5 md:w-5" /> LinkedIn
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <span className="font-serif text-2xl font-medium tracking-tighter text-white">
              Adarkwah.
            </span>
            <span className="font-mono text-xs tracking-widest text-white/30 uppercase">
              Engineer. Architect. Builder.
            </span>
          </div>
          <span className="text-center font-mono text-xs tracking-widest text-white/20">
            © {new Date().getFullYear()} David Adarkwah. All rights reserved.
          </span>
        </div>
      </footer>
    </>
  )
}
