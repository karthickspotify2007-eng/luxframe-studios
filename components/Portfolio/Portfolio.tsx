'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'NOIR ESSENCE',
    category: 'Fashion Editorial',
    year: '2024',
    color: '#1a6bff',
    bg: 'from-[#020409] via-[#0a1628] to-[#020409]',
    accent: '#00d4ff',
    description: 'A high-fashion editorial exploring the tension between shadow and light.',
  },
  {
    id: 2,
    title: 'CHROME DREAMS',
    category: 'Commercial Campaign',
    year: '2024',
    color: '#6b21ff',
    bg: 'from-[#020409] via-[#100820] to-[#020409]',
    accent: '#a855f7',
    description: 'Automotive luxury redefined through cinematic visual storytelling.',
  },
  {
    id: 3,
    title: 'AQUA MOTION',
    category: 'Brand Identity',
    year: '2023',
    color: '#00d4ff',
    bg: 'from-[#020409] via-[#041218] to-[#020409]',
    accent: '#00d4ff',
    description: 'Fluid dynamics meets luxury brand photography in motion.',
  },
  {
    id: 4,
    title: 'SILENT GALAXY',
    category: 'Fine Art Series',
    year: '2023',
    color: '#4d9fff',
    bg: 'from-[#020409] via-[#060c1a] to-[#020409]',
    accent: '#1a6bff',
    description: 'An intimate journey through cosmic solitude and human connection.',
  },
  {
    id: 5,
    title: 'PULSE',
    category: 'Music Video',
    year: '2023',
    color: '#ff3366',
    bg: 'from-[#020409] via-[#180810] to-[#020409]',
    accent: '#ff3366',
    description: 'Visual rhythm and sonic energy collide in this cinematic music piece.',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const imgOverlayRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={cardRef}
      className="portfolio-item relative flex-shrink-0 cursor-none"
      style={{ width: 'min(500px, 80vw)', height: '650px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.bg} rounded-2xl overflow-hidden`}>

        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0"
          animate={hovered ? { opacity: 0.8 } : { opacity: 0.4 }}
          transition={{ duration: 0.5 }}
          style={{
            background: `radial-gradient(ellipse at 50% 30%, ${project.color}20 0%, transparent 70%)`,
          }}
        />

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(${project.color} 1px, transparent 1px),
              linear-gradient(90deg, ${project.color} 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Simulated photo area */}
        <div className="absolute inset-8 rounded-xl overflow-hidden">
          <motion.div
            className="w-full h-full"
            animate={hovered
              ? { scale: 1.06, filter: 'brightness(0.6) saturate(1.2)' }
              : { scale: 1, filter: 'brightness(0.9) saturate(1)' }
            }
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{
              background: `
                linear-gradient(135deg,
                  ${project.color}15 0%,
                  transparent 40%,
                  ${project.accent}10 80%,
                  transparent 100%
                ),
                radial-gradient(ellipse at 30% 40%, ${project.color}20, transparent 60%),
                radial-gradient(ellipse at 70% 70%, ${project.accent}15, transparent 50%)
              `,
            }}
          >
            {/* Cinematic visual elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative w-32 h-32"
                animate={hovered ? { rotate: 180, scale: 1.2 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              >
                <div
                  className="absolute inset-0 rounded-full border opacity-30"
                  style={{ borderColor: project.color }}
                />
                <div
                  className="absolute inset-4 rounded-full border opacity-20"
                  style={{ borderColor: project.accent }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center text-5xl font-black opacity-20 text-white"
                >
                  {index + 1}
                </div>
              </motion.div>
            </div>

            {/* Horizontal scan lines */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-0 right-0 h-px opacity-5"
                style={{
                  top: `${12.5 * (i + 1)}%`,
                  background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                }}
                animate={hovered ? { opacity: [0.05, 0.15, 0.05] } : { opacity: 0.05 }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </div>

        {/* Corner brackets */}
        {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos} w-6 h-6`}
            animate={hovered ? { opacity: 1, scale: 1.2 } : { opacity: 0.4 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className={`absolute ${i % 2 === 0 ? 'left-0' : 'right-0'} top-0 h-px w-4`}
              style={{ background: project.color }}
            />
            <div
              className={`absolute ${i % 2 === 0 ? 'left-0' : 'right-0'} top-0 w-px h-4`}
              style={{ background: project.color }}
            />
          </motion.div>
        ))}
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">

        {/* Top */}
        <div className="flex items-start justify-between">
          <div
            className="px-3 py-1.5 rounded-full text-[9px] tracking-[0.3em] uppercase font-medium"
            style={{
              background: `${project.color}20`,
              border: `1px solid ${project.color}40`,
              color: project.color,
            }}
          >
            {project.category}
          </div>
          <span className="text-[#a8b3cf]/40 text-xs font-light">{project.year}</span>
        </div>

        {/* Bottom */}
        <div>
          <motion.p
            className="text-[#a8b3cf]/60 text-xs leading-relaxed mb-4 max-w-xs"
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
          >
            {project.description}
          </motion.p>

          <h3 className="text-4xl font-black text-white tracking-tight leading-none mb-4">
            {project.title}
          </h3>

          <motion.div
            className="flex items-center gap-3"
            animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="w-8 h-px"
              style={{ background: project.color }}
            />
            <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: project.color }}>
              View Project
            </span>
            <span style={{ color: project.color }}>→</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const cards = track.querySelectorAll('.portfolio-item')
    const totalWidth = track.scrollWidth - window.innerWidth

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth + window.innerHeight}`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (projects.length - 1))
            setActiveIndex(Math.min(idx, projects.length - 1))
          },
        },
      })

      tl.to(track, {
        x: -totalWidth,
        ease: 'none',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-lux-black overflow-hidden"
    >
      {/* Header — fixed inside section */}
      <div className="absolute top-0 left-0 right-0 z-20 px-8 pt-20 pb-10 flex items-end justify-between">
        <div>
          <p className="text-[10px] tracking-[0.4em] text-[#1a6bff] uppercase mb-4">
            — Selected Work
          </p>
          <h2 className="text-5xl md:text-7xl font-black leading-none">
            <span className="text-white">OUR</span>
            <br />
            <span className="gradient-text">PORTFOLIO</span>
          </h2>
        </div>

        {/* Progress indicator */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-sm font-light text-[#a8b3cf]/40">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <div className="w-32 h-px bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#1a6bff] to-[#00d4ff]"
              animate={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span className="text-sm font-light text-[#a8b3cf]/40">
            {String(projects.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div className="absolute top-1/2 -translate-y-1/2 mt-10 left-0 w-full">
        <div
          ref={trackRef}
          className="gallery-track flex gap-8 px-[max(2rem,calc((100vw-1400px)/2))]"
          style={{ width: 'max-content' }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}

          {/* Ending CTA */}
          <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: 'min(400px, 70vw)', height: '650px' }}
          >
            <motion.div
              className="flex flex-col items-center gap-6 text-center"
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            >
              <div className="w-16 h-16 rounded-full border border-[#1a6bff]/40 flex items-center justify-center">
                <span className="text-2xl text-[#1a6bff]">+</span>
              </div>
              <p className="text-[#a8b3cf]/40 text-sm">More coming soon</p>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 neon-border rounded-full text-xs tracking-widest uppercase text-[#1a6bff] hover:bg-[#1a6bff]/10 transition-all"
              >
                Commission a Project
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20"
        animate={{ x: [0, 30, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[9px] tracking-[0.3em] text-[#a8b3cf]/40 uppercase">Scroll to explore</span>
        <span className="text-[#1a6bff] text-lg">→</span>
      </motion.div>
    </section>
  )
}
