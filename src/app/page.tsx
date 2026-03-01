'use client'

import { useScrollPhysics } from '@/hooks/useScrollPhysics'
import InteractiveGlow from '@/components/ui/InteractiveGlow'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import IdentityProtocol from '@/components/sections/IdentityProtocol'
import CareerEvolution from '@/components/sections/CareerEvolution'
import Archive from '@/components/sections/Archive'
import Uplink from '@/components/sections/Uplink'
import { ChatProvider } from '@/context/ChatContext'
import ChatDrawer from '@/components/chat/ChatDrawer'

/* ─── Page ──────────────────────────────────────────────────────────── */

export default function Home() {
  const scrollY = useScrollPhysics()

  /* ── Hero scroll transforms ──────────────────────────────────────── */
  const heroOpacity = Math.max(1 - scrollY / 600, 0)
  const heroRotateX = Math.min(scrollY / 15, 60)
  const heroTranslateZ = -scrollY
  const heroScale = Math.max(1 - scrollY / 2000, 0.8)

  return (
    <ChatProvider>
    <div className="relative min-h-screen overflow-x-hidden bg-void font-sans text-[#f0ede6] selection:bg-accent/25">
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[5] opacity-[0.06] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <InteractiveGlow />
      <Navbar />
      <ChatDrawer />

      {/* Hero — sticky scroll animation */}
      <div className="relative z-10 h-[105vh]" style={{ perspective: '1500px' }}>
        <section
          id="origin"
          className="sticky top-0 mx-auto flex h-screen max-w-[1400px] origin-bottom flex-col justify-center px-6 md:px-12 lg:px-24"
          style={{
            opacity: heroOpacity,
            transform: `translateZ(${heroTranslateZ}px) rotateX(${heroRotateX}deg) scale(${heroScale})`,
          }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Hero />
          </div>
        </section>
      </div>

      {/* Sections */}
      <main className="relative z-20">
        <IdentityProtocol />
        <CareerEvolution />
        <Archive />
        <Uplink />
      </main>
    </div>
    </ChatProvider>
  )
}
