export interface PersonalInfo {
  name: string
  fullName: string
  role: string
  location: string
  heritage: string
  email: string
  github: string
  linkedin: string
  cv: string
  calendly: string
  tagline: string
  subTagline: string
  philosophy: string
}

export interface Experience {
  type: 'work' | 'edu'
  title: string
  org: string
  date: string
  desc: string
  tags: string[]
}

export interface Award {
  title: string
  date: string
  desc: string
}

export interface TechItem {
  name: string
  desc: string
}

export interface TechRadar {
  adopt: TechItem[]
  trial: TechItem[]
  assess: TechItem[]
}

export interface ProjectArchitecture {
  label: string
  desc: string
}

export interface ProjectDetails {
  problem: string
  architecture: ProjectArchitecture[]
  impact: string
  githubUrl: string
  liveUrl: string
}

export interface Project {
  id: string
  title: string
  category: string
  description: string
  stack: string[]
  image: string
  details: ProjectDetails
}
