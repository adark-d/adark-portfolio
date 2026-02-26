'use client'

import { useState, useEffect } from 'react'
import TextureOverlay from '@/components/ui/TextureOverlay'
import Navbar from '@/components/layout/Navbar'
import LivePulse from '@/components/layout/LivePulse'
import DeveloperConsole from '@/components/layout/DeveloperConsole'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import ExpertiseRadar from '@/components/sections/ExpertiseRadar'
import SelectedWorks from '@/components/sections/SelectedWorks'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import ProjectDrawer from '@/components/ui/ProjectDrawer'
import { Project } from '@/types'

export default function Home() {
  const [isCmdKOpen, setIsCmdKOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsCmdKOpen((prev) => !prev)
      }
      if (e.key === 'Escape' && isCmdKOpen) {
        setIsCmdKOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCmdKOpen])

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] font-sans text-stone-800 selection:bg-orange-200 selection:text-orange-900">
      <TextureOverlay />
      <Navbar onOpenCmdK={() => setIsCmdKOpen(true)} />
      <LivePulse />
      <DeveloperConsole isOpen={isCmdKOpen} onClose={() => setIsCmdKOpen(false)} />
      <main className="relative z-10">
        <Hero />
        <About />
        <ExpertiseRadar />
        <SelectedWorks onProjectSelect={setActiveProject} />
        <Contact />
        <Footer />
      </main>
      <ProjectDrawer
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  )
}
