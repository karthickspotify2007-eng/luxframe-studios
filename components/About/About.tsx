'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  { year: '2019', title: 'Founded', desc: 'LUXFRAME was born from a dream to redefine visual storytelling.' },
  { year: '2020', title: 'First Award', desc: 'Cannes Lions Silver for immersive brand campaign.' },
  { year: '2021', title: 'Studio Launch', desc: 'Opened our 10,000 sq ft cinematic production facility.' },
  { year: '2022', title: 'Global Reach', desc: 'Expanded to New York, London, and Tokyo markets.' },
  { year: '2024', title: 'Awwwards SOTD', desc: 'Recognized for pioneering immersive digital experiences.' },
]

const team = [
  { name: 'Marcus Veil', role: 'Founder & Creative Director', initial: 'M' },
  { name: 'Aria Lux', role: 'Cinematographer', initial: 'A' },
  { name: 'Dorian Grey', role: 'Post Production Lead', initial: 'D' },
  { name: 'Zara Night', role: 'Art Director', initial: 'Z' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line reveal
      gsap.fromTo(
        '.timeline-line-inner',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        }
      )

      // Milestone items
      gsap.fromTo(
        '.milestone-item',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-lux-black py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a6bff]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-lux-black via-lux-navy/30 to-lux-black" />
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1a6bff]/3 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-8">

        {/* Top heading */}
        <div className="mb-24 max-w-3xl">
          <motion.p
            className="text-[10px] tracking-[0.4em] text-[#1a6bff] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            — Our Story
          </motion.p>

          <div className="overflow-clip mb-6">
            <motion.h2
              className="text-6xl md:text-8xl font-black leading-none"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-white">WE ARE</span>
            </motion.h2>
          </div>
          <div className="overflow-clip mb-10">
            <motion.h2
              className="text-6xl md:text-8xl font-black leading-none gradient-text"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              LUXFRAME
            </motion.h2>
          </div>

          <motion.p
            className="text-[#a8b3cf] font-light leading-relaxed text-lg max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            We are visual architects. Dreamers with cameras. Storytellers who
            operate at the intersection of cinematic art and commercial impact.
            Every project we undertake is an opportunity to create something
            that has never been seen before.
          </motion.p>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

          {/* Timeline */}
          <div ref={timelineRef}>
            <motion.h3
              className="text-lg font-light text-[#a8b3cf] tracking-[0.2em] uppercase mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Journey
            </motion.h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5">
                <div
                  className="timeline-line-inner absolute inset-0 origin-top"
                  style={{ background: 'linear-gradient(180deg, #1a6bff, #00d4ff, #6b21ff)' }}
                />
              </div>

              <div className="flex flex-col gap-10 pl-8">
                {milestones.map((m, i) => (
                  <div key={i} className="milestone-item relative">
                    {/* Dot */}
                    <div className="absolute -left-[37px] top-1 w-3 h-3 rounded-full bg-[#1a6bff] border-2 border-lux-black shadow-[0_0_10px_rgba(26,107,255,0.8)]" />

                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="text-[10px] tracking-[0.3em] text-[#1a6bff] font-mono">{m.year}</span>
                      <h4 className="text-white font-semibold">{m.title}</h4>
                    </div>
                    <p className="text-[#a8b3cf]/60 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team + Numbers */}
          <div className="flex flex-col gap-16">

            {/* Numbers */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '500+', label: 'Global Clients' },
                { value: '$50M+', label: 'Brand Value Created' },
                { value: '12', label: 'Industry Awards' },
                { value: '7', label: 'Countries Active' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="p-6 glass rounded-2xl group hover:glass-blue transition-all duration-500"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <div className="text-4xl font-black gradient-text-electric mb-2">{stat.value}</div>
                  <div className="text-[10px] tracking-[0.2em] text-[#a8b3cf]/50 uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Team */}
            <div>
              <motion.h3
                className="text-lg font-light text-[#a8b3cf] tracking-[0.2em] uppercase mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                The Visionaries
              </motion.h3>

              <div className="grid grid-cols-2 gap-4">
                {team.map((member, i) => (
                  <motion.div
                    key={i}
                    className="group flex items-center gap-4 p-4 glass rounded-xl hover:glass-blue transition-all duration-400 cursor-none"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    whileHover={{ x: 4 }}
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a6bff] to-[#6b21ff] flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">{member.initial}</span>
                    </div>
                    <div>
                      <div className="text-white text-xs font-medium">{member.name}</div>
                      <div className="text-[#a8b3cf]/50 text-[10px]">{member.role}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <motion.blockquote
              className="p-8 glass-blue rounded-2xl border-l-2 border-[#1a6bff]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <p className="text-[#a8b3cf] font-light text-lg leading-relaxed italic mb-4">
                &ldquo;We don&apos;t take photographs. We architect moments that live forever in the memory of those who witness them.&rdquo;
              </p>
              <footer className="text-[#1a6bff] text-xs tracking-[0.2em] uppercase">
                — Marcus Veil, Founder
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
