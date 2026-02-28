/* ─── Navigation Configuration ─────────────────────────────────────── */

export interface NavItem {
  id: string
  index: string
  label: string
  short: string
}

export const SECTION_IDS = ['origin', 'about', 'trajectory', 'projects', 'connect'] as const

export const NAV_ITEMS: NavItem[] = [
  { id: 'origin', index: '01', label: 'Origin', short: 'Origin' },
  { id: 'about', index: '02', label: 'About', short: 'About' },
  { id: 'trajectory', index: '03', label: 'Trajectory', short: 'Trajectory' },
  { id: 'projects', index: '04', label: 'Projects', short: 'Projects' },
  { id: 'connect', index: '05', label: 'Connect', short: 'Connect' },
]
