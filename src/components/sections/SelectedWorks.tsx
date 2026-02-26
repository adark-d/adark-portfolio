'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { selectedWorks } from '@/data/content'
import { Project } from '@/types'

interface SelectedWorksProps {
  onProjectSelect: (project: Project) => void
}

export default function SelectedWorks({ onProjectSelect }: SelectedWorksProps) {
  return (
    <section id="work" className="bg-stone-900 px-6 py-20 text-stone-100 md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div>
            <h2 className="mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase md:mb-4 md:text-sm">
              Selected Works 26–28
            </h2>
            <h3 className="font-serif text-3xl text-white md:text-5xl">
              Architecture & Engineering.
            </h3>
          </div>
          <a
            href="https://github.com/adark-d"
            className="group flex items-center gap-2 pb-2 text-sm text-stone-400 transition-colors hover:text-white md:text-base"
          >
            View GitHub Archive{' '}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16">
          {selectedWorks.map((work, idx) => (
            <div key={idx} className="group cursor-pointer" onClick={() => onProjectSelect(work)}>
              <div className="relative mb-6 flex aspect-[4/3] w-full flex-col overflow-hidden rounded-2xl bg-stone-800 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-orange-900/20 md:mb-8">
                <img
                  src={work.image}
                  alt={work.title}
                  className="absolute inset-0 h-full w-full transform object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-stone-900/20 opacity-90 transition-opacity duration-500 group-hover:opacity-70"></div>
                <div className="absolute inset-0 bg-stone-900/30 transition-colors duration-500 group-hover:bg-transparent"></div>
                <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
                  <div className="font-serif text-4xl font-black text-white/40 mix-blend-overlay md:text-5xl">
                    {work.id}
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-stone-900/50 shadow-lg backdrop-blur-md transition-colors duration-300 group-hover:border-orange-500 group-hover:bg-orange-600 md:h-12 md:w-12">
                      <ArrowUpRight className="h-4 w-4 text-white md:h-5 md:w-5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <p className="mb-2 text-xs font-bold tracking-widest text-orange-500 uppercase md:text-sm">
                  {work.category}
                </p>
                <h4 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-orange-400 md:mb-4 md:text-2xl">
                  {work.title}
                </h4>
                <p className="mb-4 text-sm leading-relaxed text-stone-400 md:mb-6 md:text-base">
                  {work.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {work.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-stone-700 px-3 py-1 font-mono text-[10px] text-stone-300 md:text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
