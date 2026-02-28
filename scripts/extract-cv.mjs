/**
 * Build-time script: extracts text from the CV PDF and writes it to
 * a plain text file that the server can read at runtime without
 * needing pdf-parse (which requires browser APIs unavailable on Lambda).
 *
 * Runs automatically before `next build` via the package.json prebuild hook.
 */

import { readFile, writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { PDFParse } from 'pdf-parse'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const CV_PDF = join(root, 'public', 'david-cv.pdf')
const CV_TXT = join(root, 'src', 'data', 'cv.txt')

try {
  const buffer = await readFile(CV_PDF)
  const pdf = new PDFParse({ data: new Uint8Array(buffer) })
  const result = await pdf.getText()
  await mkdir(dirname(CV_TXT), { recursive: true })
  await writeFile(CV_TXT, result.text.trim(), 'utf-8')
  console.log(`✓ CV extracted: ${CV_TXT} (${result.text.trim().length} chars)`)
} catch (err) {
  console.error('✗ Failed to extract CV:', err.message)
  await writeFile(CV_TXT, '(CV unavailable)', 'utf-8')
}
