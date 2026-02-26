import { Radar } from 'lucide-react'
import { techRadar } from '@/data/content'

export default function ExpertiseRadar() {
  return (
    <section id="expertise" className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-24">
      <div className="mb-12 md:mb-16">
        <h2 className="mb-4 flex items-center gap-2 text-xs font-bold tracking-widest text-stone-400 uppercase md:text-sm">
          <Radar className="h-4 w-4" /> Architecture & Capabilities
        </h2>
        <h3 className="font-serif text-3xl text-stone-900 md:text-4xl">
          How I evaluate technology.
        </h3>
        <p className="mt-4 max-w-2xl text-base text-stone-500 md:text-lg">
          As an architect and founder, I don&apos;t just collect language syntax. I evaluate
          technology based on its readiness for production scale, its ability to solve the exact
          problem, and its long-term viability.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 transition-colors duration-300 hover:border-orange-200 md:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-bold tracking-widest text-emerald-700 uppercase md:mb-6 md:text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span> Adopt
          </div>
          <p className="mb-4 border-b border-stone-100 pb-4 text-xs text-stone-500 md:mb-6 md:text-sm">
            Technologies I default to for production systems due to proven stability and scale.
          </p>
          <div className="space-y-4">
            {techRadar.adopt.map((tech, idx) => (
              <div key={idx}>
                <h4 className="text-sm font-bold text-stone-900 md:text-base">{tech.name}</h4>
                <p className="text-xs text-stone-500 md:text-sm">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 transition-colors duration-300 hover:border-orange-200 md:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-[10px] font-bold tracking-widest text-amber-700 uppercase md:mb-6 md:text-xs">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span> Trial
          </div>
          <p className="mb-4 border-b border-stone-100 pb-4 text-xs text-stone-500 md:mb-6 md:text-sm">
            Tools I am actively building with in non-critical paths or MVP environments.
          </p>
          <div className="space-y-4">
            {techRadar.trial.map((tech, idx) => (
              <div key={idx}>
                <h4 className="text-sm font-bold text-stone-900 md:text-base">{tech.name}</h4>
                <p className="text-xs text-stone-500 md:text-sm">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 transition-colors duration-300 hover:border-orange-200 md:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-[10px] font-bold tracking-widest text-stone-600 uppercase md:mb-6 md:text-xs">
            <span className="h-2 w-2 rounded-full bg-stone-400"></span> Assess
          </div>
          <p className="mb-4 border-b border-stone-100 pb-4 text-xs text-stone-500 md:mb-6 md:text-sm">
            Emerging patterns I am researching for future architectural shifts.
          </p>
          <div className="space-y-4">
            {techRadar.assess.map((tech, idx) => (
              <div key={idx}>
                <h4 className="text-sm font-bold text-stone-900 md:text-base">{tech.name}</h4>
                <p className="text-xs text-stone-500 md:text-sm">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
