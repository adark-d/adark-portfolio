'use client'

import { useState, useEffect } from 'react'
import {
  Search,
  X,
  Calendar,
  Mail,
  Download,
  Github,
  Linkedin,
  Fingerprint,
  Radar,
  Layers,
} from 'lucide-react'
import { personalInfo } from '@/data/content'

interface DeveloperConsoleProps {
  isOpen: boolean
  onClose: () => void
}

export default function DeveloperConsole({ isOpen, onClose }: DeveloperConsoleProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      setQuery('')
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const commands = [
    {
      id: 'nav-1',
      icon: <Fingerprint className="h-4 w-4" />,
      label: 'About Me',
      action: () => {
        onClose()
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      id: 'nav-2',
      icon: <Radar className="h-4 w-4" />,
      label: 'Architecture & Capabilities',
      action: () => {
        onClose()
        document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      id: 'nav-3',
      icon: <Layers className="h-4 w-4" />,
      label: 'Selected Works',
      action: () => {
        onClose()
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      id: 'action-1',
      icon: <Calendar className="h-4 w-4" />,
      label: 'Book an Appointment',
      action: () => window.open(personalInfo.calendly, '_blank'),
    },
    {
      id: 'action-2',
      icon: <Mail className="h-4 w-4" />,
      label: 'Send Email',
      action: () => {
        window.location.href = `mailto:${personalInfo.email}`
      },
    },
    {
      id: 'action-3',
      icon: <Download className="h-4 w-4" />,
      label: 'Download CV',
      action: () => window.open(personalInfo.cv, '_blank'),
    },
    {
      id: 'action-4',
      icon: <Github className="h-4 w-4" />,
      label: 'View GitHub',
      action: () => window.open(personalInfo.github, '_blank'),
    },
    {
      id: 'action-5',
      icon: <Linkedin className="h-4 w-4" />,
      label: 'Connect on LinkedIn',
      action: () => window.open(personalInfo.linkedin, '_blank'),
    },
  ]

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="animate-in fade-in fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[10vh] duration-200 md:pt-[20vh]">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl">
        <div className="flex shrink-0 items-center gap-3 border-b border-stone-100 px-4 py-4">
          <Search className="h-5 w-5 text-stone-400" />
          <input
            autoFocus
            type="text"
            placeholder="Search or navigate..."
            className="flex-1 bg-transparent text-[16px] text-stone-800 outline-none placeholder:text-stone-400 md:text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-600 md:hidden">
            <X className="h-5 w-5" />
          </button>
          <div className="hidden gap-1 md:flex">
            <kbd className="rounded border border-stone-200 bg-stone-100 px-2 py-1 font-mono text-xs text-stone-500">
              esc
            </kbd>
          </div>
        </div>

        <div className="overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="p-4 text-center text-sm text-stone-500">No commands found.</div>
          ) : (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-stone-700 transition-colors hover:bg-stone-50 hover:text-orange-600"
              >
                <span className="text-stone-400 transition-colors group-hover:text-orange-500">
                  {cmd.icon}
                </span>
                <span className="text-sm font-medium">{cmd.label}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
