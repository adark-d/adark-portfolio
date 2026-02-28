import { readFile } from 'fs/promises'
import { join } from 'path'
import { PDFParse } from 'pdf-parse'
import {
  personalInfo,
  experience,
  careerEvolution,
  awards,
  techRadar,
  selectedWorks,
} from '@/data/content'
import { buildPromptFromSections } from './promptTemplate'

/* ─── CV Parser ────────────────────────────────────────────────────── */

let cachedCvText: string | null = null

async function parseCv(): Promise<string> {
  if (cachedCvText) return cachedCvText

  try {
    const cvPath = join(process.cwd(), 'public', 'david-cv.pdf')
    const buffer = await readFile(cvPath)
    const pdf = new PDFParse({ data: new Uint8Array(buffer) })
    const result = await pdf.getText()
    cachedCvText = result.text.trim()
    return cachedCvText
  } catch (err) {
    console.error('Failed to parse CV PDF:', err)
    return '(CV unavailable)'
  }
}

/* ─── Section Formatters ───────────────────────────────────────────── */

function formatPersonal(): string {
  return `NAME: ${personalInfo.fullName} (goes by ${personalInfo.name})
ROLE: ${personalInfo.role}
LOCATION: ${personalInfo.location}
HERITAGE: ${personalInfo.heritage}
EMAIL: ${personalInfo.email}
GITHUB: ${personalInfo.github}
LINKEDIN: ${personalInfo.linkedin}
CALENDLY: ${personalInfo.calendly}
TAGLINE: ${personalInfo.tagline}
SUB-TAGLINE: ${personalInfo.subTagline}
PHILOSOPHY: ${personalInfo.philosophy}`
}

function formatExperience(): string {
  return experience
    .map(
      (e) =>
        `[${e.type.toUpperCase()}] ${e.title} @ ${e.org} (${e.date})\n${e.desc}\nTags: ${e.tags.join(', ')}`
    )
    .join('\n\n')
}

function formatCareer(): string {
  return careerEvolution
    .map(
      (c) =>
        `Phase ${c.phase}: ${c.role} @ ${c.org} (${c.period})\nFocus: ${c.focus}\n${c.description}`
    )
    .join('\n\n')
}

function formatAwards(): string {
  return awards
    .map((a) => `${a.title} (${a.category}, ${a.date}): ${a.desc}`)
    .join('\n')
}

function formatTechRadar(): string {
  return [
    `ADOPT (production-ready): ${techRadar.adopt.map((t) => `${t.name} — ${t.desc}`).join('; ')}`,
    `TRIAL (actively exploring): ${techRadar.trial.map((t) => `${t.name} — ${t.desc}`).join('; ')}`,
    `ASSESS (researching): ${techRadar.assess.map((t) => `${t.name} — ${t.desc}`).join('; ')}`,
  ].join('\n')
}

function formatProjects(): string {
  return selectedWorks
    .map(
      (p) =>
        `[${p.type}] ${p.title} (${p.category}, ${p.year})\n${p.description}\nStack: ${p.stack.join(', ')}\nProblem: ${p.details.problem}\nArchitecture: ${p.details.architecture.map((a) => `${a.label}: ${a.desc}`).join('; ')}`
    )
    .join('\n\n')
}

/* ─── System Prompt Builder ────────────────────────────────────────── */

export async function buildSystemPrompt(): Promise<string> {
  const cvText = await parseCv()

  const today = new Date()
  const currentDate = today.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return buildPromptFromSections({
    currentDate,
    cvText,
    personal: formatPersonal(),
    experience: formatExperience(),
    career: formatCareer(),
    awards: formatAwards(),
    tech: formatTechRadar(),
    projects: formatProjects(),
  })
}
