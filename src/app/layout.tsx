import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

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
        <script src="https://cdn.tailwindcss.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      void: '#060810',
                      surface: '#0b0d17',
                      elevated: '#10131f',
                      raised: '#161a2a',
                      accent: '#5eead4',
                      warm: '#d4a853',
                    },
                    fontFamily: {
                      sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                      mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
                      serif: ['Playfair Display', 'Georgia', 'serif'],
                    },
                    animation: {
                      spinSlow: 'spinSlow 12s linear infinite',
                      spinSlowReverse: 'spinSlowReverse 8s linear infinite',
                      dataFlow: 'dataFlow 1.2s linear infinite',
                      fadeInTerminal: 'fadeInTerminal 0s ease-in forwards',
                    },
                    keyframes: {
                      dataFlow: {
                        '0%': { left: '-20%', opacity: '0' },
                        '20%': { opacity: '1' },
                        '80%': { opacity: '1' },
                        '100%': { left: '100%', opacity: '0' },
                      },
                      spinSlow: {
                        from: { transform: 'rotate(0deg)' },
                        to: { transform: 'rotate(360deg)' },
                      },
                      spinSlowReverse: {
                        from: { transform: 'rotate(360deg)' },
                        to: { transform: 'rotate(0deg)' },
                      },
                      fadeInTerminal: {
                        to: { opacity: '1' },
                      },
                    },
                  },
                },
              }
            `,
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          ::selection { background: rgba(94, 234, 212, 0.25); color: #f0ede6; }
          body {
            background-color: #060810;
            color: #f0ede6;
            -webkit-font-smoothing: antialiased;
            overflow-x: hidden;
          }
          .font-serif { font-family: 'Playfair Display', Georgia, serif; }
          .hide-scroll::-webkit-scrollbar { display: none; }
          .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-void text-[#f0ede6] antialiased`}>
        {children}
      </body>
    </html>
  )
}
