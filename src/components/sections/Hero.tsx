import { ArrowRight, Download, Github, Linkedin } from 'lucide-react'
import { personalInfo } from '@/data/content'

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-32 pb-16 md:px-12 md:pt-20">
      <div className="max-w-4xl">
        <div className="mb-6 flex items-center gap-4 md:mb-8">
          <span className="h-px w-8 bg-orange-600 md:w-12"></span>
          <p className="text-xs font-medium tracking-widest text-orange-700 uppercase md:text-sm">
            Portfolio 2026
          </p>
        </div>

        <h1 className="mb-6 font-serif text-5xl leading-[1.1] tracking-tight text-stone-900 md:mb-8 md:text-7xl md:leading-[1.05] lg:text-8xl">
          Hi, I&apos;m {personalInfo.name}.
          <br />
          <span className="font-light text-stone-400 italic">I engineer intelligence.</span>
        </h1>

        <p className="mb-10 max-w-2xl text-lg leading-relaxed font-light text-stone-600 md:mb-12 md:text-2xl">
          <strong className="font-semibold text-stone-900">{personalInfo.tagline}</strong>{' '}
          {personalInfo.subTagline}
        </p>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <a
            href="#work"
            className="group flex w-full items-center justify-center gap-3 rounded-full bg-stone-900 px-8 py-4 font-medium text-stone-100 transition-all duration-300 hover:bg-orange-700 sm:w-auto"
          >
            View My Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <div className="flex w-full items-center justify-center gap-4 text-stone-500 sm:w-auto sm:justify-start">
            <a
              href={personalInfo.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center gap-2 rounded-full border border-stone-200 bg-white p-2 px-4 text-sm font-medium shadow-sm transition-all hover:border-stone-400 hover:text-stone-900 sm:h-auto"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
            <a
              href={personalInfo.github}
              className="flex h-12 w-12 items-center justify-center p-2 transition-colors hover:text-stone-900 sm:h-auto sm:w-auto"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={personalInfo.linkedin}
              className="flex h-12 w-12 items-center justify-center p-2 transition-colors hover:text-stone-900 sm:h-auto sm:w-auto"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
