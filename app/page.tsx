'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useLenis } from '@/hooks/useLenis'
import ErrorBoundary from '@/components/ui/ErrorBoundary'

// All components are client-side only — no SSR to prevent hydration mismatches
const Preloader   = dynamic(() => import('@/components/Preloader/Preloader'),         { ssr: false })
const FilmGrain   = dynamic(() => import('@/components/effects/FilmGrain'),            { ssr: false })
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'),             { ssr: false })
const Navigation  = dynamic(() => import('@/components/Navigation/Navigation'),        { ssr: false })
const Hero        = dynamic(() => import('@/components/Hero/Hero'),                    { ssr: false })
const ThreeScene  = dynamic(() => import('@/components/ThreeScene/ThreeScene'),        { ssr: false })
const Portfolio   = dynamic(() => import('@/components/Portfolio/Portfolio'),           { ssr: false })
const About       = dynamic(() => import('@/components/About/About'),                  { ssr: false })
const Services    = dynamic(() => import('@/components/Services/Services'),            { ssr: false })
const Testimonials = dynamic(() => import('@/components/Testimonials/Testimonials'),  { ssr: false })
const Contact     = dynamic(() => import('@/components/Contact/Contact'),              { ssr: false })
const Footer      = dynamic(() => import('@/components/Footer/Footer'),                { ssr: false })

function PageContent() {
  useLenis()
  return (
    <main className="relative bg-lux-black">
      <CustomCursor />
      <FilmGrain />
      <Navigation />
      <Hero />
      <ThreeScene />
      <Portfolio />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)

  // Render nothing on the server — avoids ALL hydration mismatches
  // useEffect only runs on the client, so the server HTML is always empty
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <ErrorBoundary>
      {!ready && <Preloader onComplete={() => setReady(true)} />}
      {ready && <PageContent />}
    </ErrorBoundary>
  )
}
