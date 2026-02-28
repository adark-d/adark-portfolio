'use client'

import { Layers, Database, Cpu, Network, BrainCircuit } from 'lucide-react'
import { careerEvolution } from '@/data/content'
import { useInView } from '@/hooks/useInView'
import DecryptedText from '@/components/ui/DecryptedText'
import { CareerStage } from '@/types'

/* ─── Constants ─────────────────────────────────────────────────────── */

const iconMap: Record<CareerStage['iconName'], React.ReactNode> = {
  Database: <Database className="h-8 w-8" />,
  Cpu: <Cpu className="h-8 w-8" />,
  Network: <Network className="h-8 w-8" />,
  BrainCircuit: <BrainCircuit className="h-8 w-8" />,
}

/* ─── Career Block ──────────────────────────────────────────────────── */

function CareerBlock({ stage, idx }: { stage: CareerStage; idx: number }) {
  const [blockRef, isBlockInView] = useInView({ threshold: 0.3, triggerOnce: false })

  return (
    <div ref={blockRef}>
      <div
        className={`relative flex flex-row gap-6 transition-all duration-1000 ease-out md:gap-16 ${
          isBlockInView ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
        }`}
      >
        <div className="z-10 flex flex-shrink-0 items-start">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full border bg-[#050505] transition-all duration-1000 md:h-20 md:w-20 ${
              isBlockInView
                ? 'scale-100 border-white text-white'
                : 'scale-75 border-white/10 text-white/20'
            }`}
          >
            <div
              className={`transition-transform duration-1000 ${isBlockInView ? 'rotate-0' : '-rotate-45'}`}
            >
              {iconMap[stage.iconName]}
            </div>
          </div>
        </div>

        <div className="max-w-2xl flex-1 pt-1 md:pt-4">
          <div className="mb-2 flex items-baseline gap-4 md:mb-4">
            <h3 className="font-serif text-2xl tracking-tight text-white md:text-5xl">
              <DecryptedText text={stage.role} trigger={isBlockInView} delay={0} speed={25} />
            </h3>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-widest text-white/50 uppercase md:mb-6 md:text-xs">
            <DecryptedText text={stage.org} trigger={isBlockInView} delay={150} speed={15} />
            <span className="h-1 w-1 shrink-0 rounded-full bg-white/20" />
            <DecryptedText text={stage.period} trigger={isBlockInView} delay={250} speed={15} />
          </div>

          <p
            className={`text-sm leading-relaxed font-light text-white/50 transition-opacity delay-400 duration-1000 md:text-lg ${
              isBlockInView ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {stage.description}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Component ─────────────────────────────────────────────────────── */

export default function CareerEvolution() {
  return (
    <section
      id="trajectory"
      className="relative z-20 border-t border-white/10 bg-[#050505] py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-6 md:mb-24 md:pb-8">
          <h2 className="flex items-center gap-3 font-mono text-sm tracking-[0.2em] text-white/50 uppercase">
            <Layers className="h-4 w-4" /> Trajectory
          </h2>
          <span className="hidden font-serif text-xl text-white/20 italic md:block">Career Arc</span>
        </div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-7 w-px bg-white/10 md:left-10" />
          <div className="space-y-14 md:space-y-24">
            {careerEvolution.map((stage, idx) => (
              <CareerBlock key={idx} stage={stage} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
