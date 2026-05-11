'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

const testimonials = [
  {
    id: 1,
    quote: 'LUXFRAME didn\'t just shoot our campaign — they redefined what our brand could look like. The results were breathtaking. Every single frame felt like a painting.',
    author: 'Valentina Cruz',
    role: 'Creative Director',
    company: 'MAISON ÉLITE',
    rating: 5,
    color: '#1a6bff',
  },
  {
    id: 2,
    quote: 'I\'ve worked with dozens of studios over my career. LUXFRAME operates on a completely different level. They understand light, story, and emotion in a way that\'s truly rare.',
    author: 'James Harrington',
    role: 'CEO',
    company: 'APEX AUTOMOTIVE',
    rating: 5,
    color: '#00d4ff',
  },
  {
    id: 3,
    quote: 'The music video they created exceeded every expectation. The cinematography, the atmosphere, the emotion — it launched our single to platinum status. Absolute visionaries.',
    author: 'Zara Nova',
    role: 'Recording Artist',
    company: 'UNIVERSAL MUSIC',
    rating: 5,
    color: '#6b21ff',
  },
  {
    id: 4,
    quote: 'Our product launch photography generated 2.3 million impressions in 48 hours. LUXFRAME delivered images so compelling they sold themselves. Exceptional ROI.',
    author: 'Marcus Chen',
    role: 'VP Marketing',
    company: 'NEXUS TECH',
    rating: 5,
    color: '#4d9fff',
  },
]

const AUTOPLAY_DURATION = 5000

function WaveformVisualizer({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-[3px] h-8">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full"
          style={{ height: '100%', background: color, transformOrigin: 'center' }}
          animate={{
            scaleY: [0.2, Math.random() * 0.8 + 0.2, 0.2],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.6,
            repeat: Infinity,
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const progressRef = useRef<HTMLDivElement>(null)

  const goTo = (idx: number) => {
    setDirection(idx > active ? 1 : -1)
    setActive(idx)
  }

  const next = () => {
    const idx = (active + 1) % testimonials.length
    setDirection(1)
    setActive(idx)
  }

  const prev = () => {
    const idx = (active - 1 + testimonials.length) % testimonials.length
    setDirection(-1)
    setActive(idx)
  }

  useEffect(() => {
    intervalRef.current = setInterval(next, AUTOPLAY_DURATION)
    return () => clearInterval(intervalRef.current)
  }, [active])

  // Progress bar
  useEffect(() => {
    if (!progressRef.current) return
    gsap.fromTo(
      progressRef.current,
      { width: '0%' },
      { width: '100%', duration: AUTOPLAY_DURATION / 1000, ease: 'none' }
    )
  }, [active])

  const current = testimonials[active]

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      filter: 'blur(10px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      filter: 'blur(10px)',
    }),
  }

  return (
    <section
      id="testimonials"
      className="relative w-full bg-lux-black py-32 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a6bff]/30 to-transparent" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse at 20% 50%, rgba(26,107,255,0.04) 0%, transparent 60%)',
              'radial-gradient(ellipse at 80% 50%, rgba(107,33,255,0.04) 0%, transparent 60%)',
              'radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 60%)',
              'radial-gradient(ellipse at 20% 50%, rgba(26,107,255,0.04) 0%, transparent 60%)',
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-8">

        {/* Header */}
        <div className="mb-20">
          <motion.p
            className="text-[10px] tracking-[0.4em] text-[#1a6bff] uppercase mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            — Client Voices
          </motion.p>
          <div className="overflow-clip">
            <motion.h2
              className="text-6xl md:text-8xl font-black text-white leading-none"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              WHAT THEY
            </motion.h2>
          </div>
          <div className="overflow-clip">
            <motion.h2
              className="text-6xl md:text-8xl font-black gradient-text leading-none"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              SAY
            </motion.h2>
          </div>
        </div>

        {/* Main testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">

          {/* Quote */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              {/* Giant quote mark */}
              <motion.div
                className="text-[120px] font-black leading-none select-none"
                style={{ color: current.color, opacity: 0.2, lineHeight: 0.8 }}
                animate={{ opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                &ldquo;
              </motion.div>

              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={active}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-2xl md:text-3xl font-light text-white leading-relaxed -mt-8">
                    {current.quote}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Author */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${active}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-6"
              >
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${current.color}, ${current.color}80)` }}
                >
                  {current.author[0]}
                </div>

                <div>
                  <div className="text-white font-semibold">{current.author}</div>
                  <div className="text-[#a8b3cf]/60 text-sm">{current.role}</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: current.color }}>
                    {current.company}
                  </div>
                </div>

                {/* Stars */}
                <div className="ml-auto flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ color: current.color }}>★</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-8">
            {/* Waveform */}
            <div className="p-6 glass rounded-2xl">
              <p className="text-[9px] tracking-[0.3em] text-[#a8b3cf]/40 uppercase mb-4">Audio Sentiment</p>
              <WaveformVisualizer color={current.color} />
            </div>

            {/* All testimonials nav */}
            <div className="flex flex-col gap-3">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => goTo(i)}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-400 text-left ${
                    i === active ? 'glass-blue' : 'glass hover:glass-blue'
                  }`}
                >
                  <div
                    className={`w-1.5 h-8 rounded-full transition-all duration-400 ${
                      i === active ? 'opacity-100' : 'opacity-20'
                    }`}
                    style={{ background: t.color }}
                  />
                  <div>
                    <div className="text-white text-xs font-medium">{t.author}</div>
                    <div className="text-[#a8b3cf]/50 text-[10px]">{t.company}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:glass-blue transition-all"
              >
                ←
              </button>

              {/* Progress */}
              <div className="flex-1 h-px bg-white/5 relative overflow-hidden">
                <div
                  ref={progressRef}
                  className="absolute left-0 top-0 h-full"
                  style={{ background: current.color }}
                />
              </div>

              <button
                onClick={next}
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:glass-blue transition-all"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Client logos row */}
        <div className="mt-24 pt-12 border-t border-white/5">
          <p className="text-[9px] tracking-[0.4em] text-[#a8b3cf]/30 uppercase text-center mb-10">
            Trusted by world-class brands
          </p>
          <div className="flex items-center justify-center flex-wrap gap-12">
            {['MAISON ÉLITE', 'APEX AUTO', 'NEXUS TECH', 'UNIVERSAL', 'SOLARIS CO', 'NOVA GROUP'].map((brand, i) => (
              <motion.span
                key={i}
                className="text-sm font-bold tracking-[0.2em] text-[#a8b3cf]/25 hover:text-[#a8b3cf]/60 transition-colors duration-400 uppercase cursor-none"
                whileHover={{ scale: 1.05 }}
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
