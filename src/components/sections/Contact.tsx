import { Mail, Download, Linkedin, Calendar } from 'lucide-react'
import { personalInfo } from '@/data/content'

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24 text-center md:px-12 md:py-32">
      <div className="mx-auto mb-6 flex h-12 w-12 rotate-3 items-center justify-center rounded-2xl bg-stone-200 md:mb-8 md:h-16 md:w-16">
        <Mail className="h-5 w-5 -rotate-3 text-stone-800 md:h-6 md:w-6" />
      </div>

      <h2 className="mb-4 font-serif text-4xl text-stone-900 md:mb-6 md:text-5xl">
        Let&apos;s build something meaningful.
      </h2>
      <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-stone-600 md:mb-12 md:text-xl">
        I am always open to discussing compelling engineering challenges, tech collaborations, or
        startup opportunities.
      </p>

      <div className="flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row md:gap-4">
        <a
          href={personalInfo.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-4 text-base font-medium text-white shadow-lg shadow-stone-900/20 transition-colors duration-300 hover:bg-orange-700 sm:w-auto md:px-8 md:py-5 md:text-lg"
        >
          <Calendar className="h-4 w-4 md:h-5 md:w-5" /> Schedule a Call
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-4 text-base font-medium text-stone-900 transition-colors duration-300 hover:bg-stone-50 sm:w-auto md:px-8 md:py-5 md:text-lg"
        >
          <Mail className="h-4 w-4 md:h-5 md:w-5" /> Say Hello
        </a>
        <a
          href={personalInfo.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-4 text-base font-medium text-stone-900 transition-colors duration-300 hover:bg-stone-50 sm:w-auto md:px-8 md:py-5 md:text-lg"
        >
          <Download className="h-4 w-4 md:h-5 md:w-5" /> Download CV
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-4 text-base font-medium text-stone-900 transition-colors duration-300 hover:bg-stone-50 sm:w-auto md:px-8 md:py-5 md:text-lg"
        >
          <Linkedin className="h-4 w-4 md:h-5 md:w-5" /> LinkedIn
        </a>
      </div>
    </section>
  )
}
