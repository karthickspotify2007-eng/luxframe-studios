'use client'

import { useEffect, useRef, Suspense } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import MagneticButton from '../ui/MagneticButton'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => null,
})

gsap.registerPlugin(ScrollTrigger)

const words = ['CINEMATIC.', 'IMMERSIVE.', 'UNFORGETTABLE.']

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const wordIndex = useRef(0)
  const wordRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.5 })

      // Badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
      )

      // Title lines
      const lines = titleRef.current?.querySelectorAll('.hero-line')
      if (lines) {
        tl.fromTo(
          lines,
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.12 },
          '-=0.3'
        )
      }

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
        '-=0.5'
      )

      // CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      )

      // Parallax on scroll
      if (heroRef.current) {
        gsap.to(titleRef.current, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })

        gsap.to(subtitleRef.current, {
          yPercent: -20,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '40% top',
            scrub: 1,
          },
        })
      }
    })

    // Cycling words
    const interval = setInterval(() => {
      if (!wordRef.current) return
      wordIndex.current = (wordIndex.current + 1) % words.length
      gsap.fromTo(
        wordRef.current,
        { opacity: 0, y: 20, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }
      )
      wordRef.current.textContent = words[wordIndex.current]
    }, 2500)

    return () => {
      ctx.revert()
      clearInterval(interval)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-lux-black"
    >
      {/* Three.js background */}
      <HeroCanvas />

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-lux-black/40 via-transparent to-lux-black pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-lux-black/60 via-transparent to-lux-black/60 pointer-events-none z-10" />

      {/* Moving light rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-px bg-gradient-to-b from-transparent via-[#1a6bff]/20 to-transparent"
            style={{
              left: `${20 + i * 30}%`,
              height: '100%',
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scaleY: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + i * 1.5,
              repeat: Infinity,
              delay: i * 1.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#1a6bff]/8 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#6b21ff]/8 rounded-full blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-20 max-w-[1600px] mx-auto px-8 pt-24">
        <div className="flex flex-col items-start max-w-5xl">

          {/* Badge */}
          <div
            ref={badgeRef}
            className="opacity-0 flex items-center gap-3 mb-12"
          >
            <div className="flex items-center gap-2 px-4 py-2 glass-blue rounded-full">
              <span className="w-2 h-2 bg-[#00d4ff] rounded-full animate-pulse-glow" />
              <span className="text-[10px] tracking-[0.3em] text-[#00d4ff] uppercase font-light">
                Est. 2019 · Los Angeles, CA
              </span>
            </div>
          </div>

          {/* Main title */}
          <div ref={titleRef} className="mb-8">
            <div className="overflow-clip">
              <div className="hero-line cinematic-title text-white font-black leading-none">
                VISUAL
              </div>
            </div>
            <div className="overflow-clip">
              <div className="hero-line cinematic-title gradient-text font-black leading-none">
                STORIES
              </div>
            </div>
            <div className="overflow-clip flex items-baseline gap-4">
              <div className="hero-line cinematic-title text-white/20 font-black leading-none">
                MADE
              </div>
              <div className="hero-line overflow-clip">
                <span
                  ref={wordRef}
                  className="cinematic-title gradient-text-electric font-black leading-none block"
                >
                  {words[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} className="opacity-0 mb-14 max-w-xl">
            <p className="text-base font-light text-[#a8b3cf] leading-relaxed tracking-wide">
              We are a luxury cinematic photography and film studio crafting
              visual narratives that transcend the ordinary — where every frame
              tells an unforgettable story.
            </p>
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="opacity-0 flex items-center gap-6 flex-wrap">
            <MagneticButton
              className="group flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-[#1a6bff] to-[#00d4ff] rounded-full text-sm font-medium tracking-widest uppercase text-white btn-glow overflow-hidden"
              onClick={() => {
                document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span>Explore Work</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </MagneticButton>

            <MagneticButton
              className="flex items-center gap-3 px-8 py-4 glass rounded-full text-sm font-light tracking-widest uppercase text-[#a8b3cf] hover:text-white transition-colors"
              onClick={() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Book a Session
            </MagneticButton>
          </div>

          {/* Stats */}
          <motion.div
            className="mt-20 flex items-center gap-12 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.8, duration: 0.8 }}
          >
            {[
              { value: '500+', label: 'Projects Delivered' },
              { value: '12', label: 'Awards Won' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '7+', label: 'Years of Craft' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-3xl font-bold gradient-text-electric">{stat.value}</span>
                <span className="text-[10px] tracking-[0.2em] text-[#a8b3cf]/60 uppercase">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] tracking-[0.3em] text-[#a8b3cf]/40 uppercase">Scroll</span>
        <div className="relative w-[1px] h-16 bg-white/10 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#1a6bff] to-[#00d4ff]"
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Corner info */}
      <div className="absolute bottom-10 right-10 z-20 hidden md:flex flex-col items-end gap-1">
        <span className="text-[9px] tracking-[0.3em] text-[#a8b3cf]/30 uppercase">Los Angeles</span>
        <span className="text-[9px] tracking-[0.3em] text-[#a8b3cf]/30 uppercase">California, USA</span>
      </div>
    </section>
  )
}
