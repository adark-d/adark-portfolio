import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

/* ─── Fonts ─────────────────────────────────────────────────────────── */

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

/* ─── SEO & Open Graph ──────────────────────────────────────────────── */

const META_DESCRIPTION =
  'Senior AI & Data Engineer. Building fault-tolerant pipelines, production MLOps platforms, and multi-agent systems.'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Adarkwah.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  description: META_DESCRIPTION,
  metadataBase: new URL('https://dadark.dev'),
  openGraph: {
    title: '▲dark.',
    description: META_DESCRIPTION,
    url: 'https://dadark.dev',
    siteName: '▲dark.',
    images: [{ url: '/og-image.jpeg', width: 1200, height: 630 }],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '▲dark.',
    description: META_DESCRIPTION,
    images: ['/og-image.jpeg'],
  },
}

/* ─── Root Layout ───────────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-void text-[#f0ede6] antialiased`}>
        {children}
      </body>
    </html>
  )
}
