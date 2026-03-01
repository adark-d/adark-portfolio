/* ─── Server-only chat API config ──────────────────────────────────── */

/** Max conversation turns sent to the model */
export const MAX_MESSAGES = 6

/** Max tokens in model response (~600 words — enough for detailed answers, prevents essays) */
export const MAX_TOKENS = 800

/** Primary model — accurate, follows system prompt reliably */
export const MODEL = 'llama-3.3-70b-versatile'

/** Fallback model — used when primary hits rate limits (14.4K RPD) */
export const FALLBACK_MODEL = 'llama-3.1-8b-instant'

/** Sampling temperature for chat completions */
export const TEMPERATURE = 0.6
