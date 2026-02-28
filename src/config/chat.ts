/* ─── Chat UI (safe for client bundle) ─────────────────────────────── */

/** Pre-written prompts shown in the empty-state chat drawer */
export const SUGGESTED_QUESTIONS = [
  'What does David build at Bloomberg?',
  'Tell me about his AI projects',
  "What's his tech stack?",
  'How can I contact David?',
] as const

/** Framer Motion spring for drawer open/close */
export const DRAWER_SPRING = { type: 'spring' as const, damping: 30, stiffness: 300 }

/** Max characters per user message (shared with client validation) */
export const MAX_MESSAGE_LENGTH = 1000
