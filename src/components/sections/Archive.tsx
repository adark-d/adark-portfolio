'use client'

import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import {
  Database,
  Terminal,
  FileText,
  PlayCircle,
  X,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { selectedWorks } from '@/data/content'

/* ─── Constants ─────────────────────────────────────────────────────── */

/** Number of project cards visible per page before pagination kicks in */
const ITEMS_PER_PAGE = 4
const FILTERS = ['All', ...Array.from(new Set(selectedWorks.map((item) => item.type)))]

/* ─── Component ─────────────────────────────────────────────────────── */

export default function Archive() {
  const [filter, setFilter] = useState('All')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredArchive =
    filter === 'All' ? selectedWorks : selectedWorks.filter((item) => item.type === filter)

  const totalPages = Math.ceil(filteredArchive.length / ITEMS_PER_PAGE)
  const paginatedArchive = filteredArchive.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const listRef = useRef<HTMLDivElement>(null)
  const [listMinHeight, setListMinHeight] = useState(0)

  // Refs let async handlers (fonts.ready, resize) read current state
  // without needing those values in dependency arrays.
  const expandedIdRef = useRef(expandedId)
  expandedIdRef.current = expandedId
  const itemCountRef = useRef(paginatedArchive.length)
  itemCountRef.current = paginatedArchive.length

  // Capture baseline height on mount (before paint).
  // Guard ensures this only fires once (when listMinHeight is still 0).
  useLayoutEffect(() => {
    if (listRef.current && listMinHeight === 0) {
      setListMinHeight(listRef.current.offsetHeight)
    }
  }, [listMinHeight])

  // Re-measure after web fonts load (font swap changes text metrics)
  // and on viewport resize / orientation change.
  // Uses refs so the handler never triggers on expand/collapse.
  useEffect(() => {
    const measure = () => {
      const el = listRef.current
      if (!el) return
      if (expandedIdRef.current !== null || itemCountRef.current < ITEMS_PER_PAGE) return
      const prev = el.style.minHeight
      el.style.minHeight = '0px'
      const h = el.offsetHeight
      el.style.minHeight = prev
      if (h > 0) setListMinHeight(h)
    }

    document.fonts.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const handleFilterChange = (f: string) => {
    setFilter(f)
    setCurrentPage(1)
    setExpandedId(null)
  }

  return (
    <section
      id="projects"
      className="relative z-20 border-t border-white/10 bg-[#050505] py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        {/* Header & Filters */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-20 md:gap-8 lg:flex-row lg:items-end">
          <div>
            <h2 className="mb-4 flex items-center gap-3 font-mono text-sm tracking-[0.2em] text-white/50 uppercase md:mb-6">
              <Database className="h-4 w-4" /> Projects
            </h2>
            <h3 className="font-serif text-3xl tracking-tight text-white md:text-6xl">
              Selected Work.
            </h3>
          </div>

          <div className="hide-scroll flex w-full max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-[#0a0a0a] p-1 font-mono text-xs tracking-widest uppercase md:w-auto md:gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`rounded-full px-4 py-2.5 whitespace-nowrap transition-all md:px-6 md:py-3 ${
                  filter === f ? 'bg-white font-bold text-black' : 'text-white/50 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Project List */}
        <div ref={listRef} className="flex w-full flex-col" style={{ minHeight: listMinHeight }}>
          <div className="hidden grid-cols-12 gap-6 border-b border-white/20 pb-6 font-mono text-xs tracking-widest text-white/40 uppercase md:grid">
            <div className="col-span-5 pl-4">Title / Designation</div>
            <div className="col-span-4">Category</div>
            <div className="col-span-2">Year</div>
            <div className="col-span-1 pr-4 text-right">Expand</div>
          </div>

          {paginatedArchive.map((item) => {
            const isExpanded = expandedId === item.id

            return (
              <div key={item.id} className="group border-b border-white/10">
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="grid cursor-pointer grid-cols-1 items-center gap-3 px-3 py-5 transition-colors hover:bg-white/[0.02] md:grid-cols-12 md:gap-6 md:px-4 md:py-6"
                >
                  <div className="col-span-12 flex flex-col justify-center md:col-span-5 md:pr-6">
                    <h4
                      className={`font-serif text-lg leading-snug tracking-tight transition-all duration-300 md:text-2xl ${
                        isExpanded
                          ? 'text-white'
                          : 'text-white/70 group-hover:translate-x-2 group-hover:text-white'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p className="mt-1 line-clamp-1 text-sm font-light text-white/40 md:hidden">
                      {item.description}
                    </p>
                  </div>

                  <div className="col-span-6 flex items-center pt-2 md:col-span-4 md:pt-0">
                    <span
                      className={`flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs transition-colors md:text-sm ${
                        isExpanded
                          ? 'border-white/20 bg-white/10 text-white'
                          : 'border-white/5 bg-transparent text-white/50 group-hover:border-white/20'
                      }`}
                    >
                      {item.type === 'System' && <Terminal className="h-3 w-3" />}
                      {item.type === 'Article' && <FileText className="h-3 w-3" />}
                      {item.type === 'Talk' && <PlayCircle className="h-3 w-3" />}
                      <span className="truncate">{item.category}</span>
                    </span>
                  </div>

                  <div className="col-span-6 flex items-center justify-end pt-2 font-mono text-sm md:col-span-2 md:justify-start md:pt-0">
                    <span className={isExpanded ? 'text-white' : 'text-white/40'}>{item.year}</span>
                  </div>

                  <div className="hidden items-center justify-end md:col-span-1 md:flex">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 ${
                        isExpanded
                          ? 'rotate-45 border-white bg-white text-black'
                          : 'border-white/10 text-white/50 group-hover:border-white/30 group-hover:text-white'
                      }`}
                    >
                      <X
                        className={`h-4 w-4 transition-transform duration-500 ${
                          isExpanded ? 'rotate-0' : 'rotate-45'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <div
                  className={`grid transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`mx-2 mb-2 mt-0 flex flex-col gap-6 rounded-2xl border border-white/5 bg-[#0a0a0a] p-4 transition-all duration-1000 md:m-4 md:mt-0 md:gap-8 md:p-8 lg:flex-row ${
                        isExpanded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
                      }`}
                    >
                      <div className="relative h-44 w-full overflow-hidden rounded-xl bg-black md:h-80 lg:w-5/12">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-out"
                          style={{
                            filter: isExpanded
                              ? 'blur(0px) grayscale(0%) contrast(1.1)'
                              : 'blur(20px) grayscale(100%) contrast(1.5)',
                            transform: isExpanded ? 'scale(1)' : 'scale(1.2)',
                            opacity: isExpanded ? 0.9 : 0.2,
                          }}
                        />
                      </div>

                      <div className="flex w-full flex-col justify-center lg:w-7/12">
                        <div
                          className={`transition-all delay-300 duration-700 ${
                            isExpanded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                          }`}
                        >
                          <h5 className="mb-4 border-b border-white/10 pb-2 font-mono text-sm tracking-widest text-white/40 uppercase">
                            Overview
                          </h5>
                          <p className="mb-6 text-sm leading-relaxed font-light text-white/80 md:mb-8 md:text-xl">
                            {item.details?.problem || item.description}
                          </p>
                        </div>

                        <div
                          className={`mb-6 flex flex-wrap gap-2 transition-all delay-500 duration-700 md:mb-8 ${
                            isExpanded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                          }`}
                        >
                          {item.stack.map((tech, i) => (
                            <span
                              key={i}
                              className="rounded-sm border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] tracking-widest text-white/60 uppercase"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div
                          className={`mt-auto flex gap-4 transition-all delay-700 duration-700 ${
                            isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                          }`}
                        >
                          {item.type === 'System' ? (
                            <button className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold tracking-wider text-black uppercase transition-transform hover:scale-105 md:px-6 md:py-3 md:text-sm md:tracking-widest">
                              Deep Dive <ArrowRight className="h-4 w-4" />
                            </button>
                          ) : (
                            <button className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-white/10 md:px-6 md:py-3 md:text-sm md:tracking-widest">
                              View Material <ExternalLink className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

        </div>

        {/* Pagination */}
        <div
          className={`mt-12 flex justify-end transition-opacity duration-500 ${
            totalPages > 1 ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div className="relative z-50 flex gap-2">
            <button
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1))
                setExpandedId(null)
              }}
              disabled={currentPage === 1}
              className="rounded-full border border-white/10 bg-[#0a0a0a] p-3 text-white/50 transition-colors hover:bg-white/10 hover:text-white active:scale-90 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1))
                setExpandedId(null)
              }}
              disabled={currentPage === totalPages}
              className="rounded-full border border-white/10 bg-[#0a0a0a] p-3 text-white/50 transition-colors hover:bg-white/10 hover:text-white active:scale-90 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
