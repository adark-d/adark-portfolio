'use client'

import { useEffect } from 'react'
import {
  X,
  Layers,
  Fingerprint,
  Terminal,
  CheckCircle2,
  BarChart3,
  Github,
  ExternalLink,
} from 'lucide-react'
import { Project } from '@/types'

interface ProjectDrawerProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectDrawer({ project, isOpen, onClose }: ProjectDrawerProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div
        className={`absolute top-0 right-0 bottom-0 flex w-full transform flex-col overflow-y-auto bg-[#FAF9F6] shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:w-[70vw] lg:w-[50vw] xl:w-[45vw] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-stone-900/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-stone-900 md:top-6 md:right-6 md:h-12 md:w-12"
        >
          <X className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {project && (
          <>
            <div className="relative h-64 w-full shrink-0 md:h-96">
              <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/20 to-transparent"></div>
            </div>

            <div className="relative z-10 -mt-12 px-6 pb-24 md:-mt-20 md:px-16">
              <div className="mb-8 md:mb-12">
                <p className="mb-3 flex items-center gap-2 text-xs font-bold tracking-widest text-orange-600 uppercase md:text-sm">
                  <Layers className="h-4 w-4" /> {project.category}
                </p>
                <h2 className="mb-4 font-serif text-3xl leading-tight text-stone-900 md:mb-6 md:text-5xl">
                  {project.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-stone-200 bg-white px-3 py-1.5 font-mono text-[10px] text-stone-600 shadow-sm md:px-4 md:text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="prose prose-stone prose-base md:prose-lg max-w-none">
                <h3 className="mb-4 flex items-center gap-2 border-b border-stone-200 pb-2 text-lg font-bold text-stone-900 md:text-xl">
                  <Fingerprint className="h-5 w-5 text-orange-600" /> The Problem Space
                </h3>
                <p className="mb-8 leading-relaxed text-stone-600 md:mb-10">
                  {project.details?.problem || project.description}
                </p>

                {project.details?.architecture && (
                  <>
                    <h3 className="mb-6 flex items-center gap-2 border-b border-stone-200 pb-2 text-lg font-bold text-stone-900 md:text-xl">
                      <Terminal className="h-5 w-5 text-orange-600" /> Architecture & Implementation
                    </h3>
                    <div className="mb-8 space-y-6 md:mb-10">
                      {project.details.architecture.map((item, i) => (
                        <div key={i} className="flex gap-4">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500 md:mt-1 md:h-6 md:w-6" />
                          <div>
                            <h4 className="mb-1 font-bold text-stone-900">{item.label}</h4>
                            <p className="m-0 text-sm text-stone-600 md:text-base">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {project.details?.impact && (
                  <>
                    <h3 className="mb-4 flex items-center gap-2 border-b border-stone-200 pb-2 text-lg font-bold text-stone-900 md:text-xl">
                      <BarChart3 className="h-5 w-5 text-orange-600" /> Strategic Impact
                    </h3>
                    <p className="mb-10 leading-relaxed text-stone-600 md:mb-12">
                      {project.details.impact}
                    </p>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-4 border-t border-stone-200 pt-8 sm:flex-row">
                <a
                  href={project.details?.githubUrl || '#'}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-orange-700 md:text-base"
                >
                  <Github className="h-5 w-5" /> View Source Code
                </a>
                <a
                  href={project.details?.liveUrl || '#'}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-4 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-50 md:text-base"
                >
                  <ExternalLink className="h-5 w-5" /> Visit Live Project
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
