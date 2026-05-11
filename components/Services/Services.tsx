'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  {
    id: 1,
    icon: '◎',
    title: 'Fashion Editorial',
    tagline: 'Couture meets Cinema',
    description:
      'Full-scale editorial productions for luxury fashion houses and independent designers. We bring your collection to life through cinematic storytelling, dramatic lighting, and immersive visual narratives.',
    features: ['Multi-day shoots', 'Studio & location', 'Hair & makeup', 'Art direction', 'Post-production'],
    color: '#1a6bff',
    price: 'From $8,500',
  },
  {
    id: 2,
    icon: '▶',
    title: 'Commercial Campaigns',
    tagline: 'Brand stories that convert',
    description:
      'End-to-end commercial photography and videography for global brands. Strategy, creative direction, production, and delivery — everything under one visionary roof.',
    features: ['Campaign strategy', 'Multi-platform delivery', 'Motion & stills', 'Retouching', 'Licensing'],
    color: '#6b21ff',
    price: 'From $15,000',
  },
  {
    id: 3,
    icon: '✦',
    title: 'Fine Art Photography',
    tagline: 'Where art transcends medium',
    description:
      'Limited edition fine art series and personal artistic projects. Museum-quality prints, gallery representation, and collector editions available.',
    features: ['Limited editions', 'Museum prints', 'Archival quality', 'Artist statement', 'Exhibition'],
    color: '#00d4ff',
    price: 'From $3,200',
  },
  {
    id: 4,
    icon: '◈',
    title: 'Cinematic Video',
    tagline: 'Motion as an art form',
    description:
      'Brand films, music videos, and cinematic short films. From concept to post-production, we create moving images that define culture.',
    features: ['4K/8K production', 'Aerial cinematography', 'Color grading', 'Sound design', 'VFX compositing'],
    color: '#4d9fff',
    price: 'From $25,000',
  },
  {
    id: 5,
    icon: '⬡',
    title: 'Portrait & Personal',
    tagline: 'Iconic portraits, not just photos',
    description:
      'Executive portraits, personal branding sessions, and intimate portrait series. We reveal the essence of who you are through masterful light and composition.',
    features: ['Personal branding', 'Executive portraits', 'Wardrobe styling', 'Multiple looks', 'Rush delivery'],
    color: '#a855f7',
    price: 'From $1,800',
  },
  {
    id: 6,
    icon: '◷',
    title: 'Event Coverage',
    tagline: 'Moments made eternal',
    description:
      'Red carpet events, exclusive product launches, private celebrations, and corporate events captured with cinematic precision and luxury attention to detail.',
    features: ['Real-time gallery', 'Multi-photographer', 'Video highlights', 'Same-day delivery', 'Print packages'],
    color: '#0ea5e9',
    price: 'From $5,500',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      className="service-card relative p-8 glass rounded-2xl cursor-none overflow-hidden group"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 30% 30%, ${service.color}08 0%, transparent 70%)`,
        }}
      />

      {/* Neon border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `inset 0 0 0 1px ${service.color}30, 0 0 30px ${service.color}10`,
        }}
      />

      {/* Top row */}
      <div className="relative z-10 flex items-start justify-between mb-8">
        <motion.span
          className="text-4xl"
          style={{ color: service.color }}
          animate={expanded ? { scale: 1.2, rotate: 180 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.4 }}
        >
          {service.icon}
        </motion.span>

        <div className="flex flex-col items-end gap-1">
          <span
            className="text-[9px] tracking-[0.3em] uppercase font-medium"
            style={{ color: service.color }}
          >
            {service.price}
          </span>
          <div className="w-6 h-px" style={{ background: service.color }} />
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 mb-3">
        <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
        <p className="text-xs tracking-[0.15em] uppercase" style={{ color: service.color }}>
          {service.tagline}
        </p>
      </div>

      {/* Description */}
      <p className="relative z-10 text-[#a8b3cf]/60 text-sm leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Features */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="relative z-10 mb-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap gap-2 pt-2">
              {service.features.map((feat, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-[10px] tracking-wider"
                  style={{
                    background: `${service.color}15`,
                    border: `1px solid ${service.color}30`,
                    color: service.color,
                  }}
                >
                  {feat}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <motion.button
        className="relative z-10 flex items-center gap-3 text-xs tracking-[0.2em] uppercase group/btn"
        style={{ color: service.color }}
        whileHover={{ x: 4 }}
        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span>Inquire Now</span>
        <motion.span
          animate={expanded ? { x: 6 } : { x: 0 }}
          transition={{ duration: 0.3 }}
        >
          →
        </motion.span>
      </motion.button>

      {/* Bottom index */}
      <div className="absolute bottom-6 right-6 text-[60px] font-black text-white/[0.03] leading-none select-none">
        {String(index + 1).padStart(2, '0')}
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full bg-lux-black py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-lux-navy/20 via-lux-black to-lux-navy/20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a6bff]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6b21ff]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-8">

        {/* Header */}
        <div className="mb-20">
          <motion.p
            className="text-[10px] tracking-[0.4em] text-[#1a6bff] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            — What We Offer
          </motion.p>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="overflow-clip">
                <motion.h2
                  className="text-6xl md:text-8xl font-black leading-none text-white"
                  initial={{ y: '100%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  SERVICES
                </motion.h2>
              </div>
              <div className="overflow-clip">
                <motion.h2
                  className="text-6xl md:text-8xl font-black leading-none gradient-text"
                  initial={{ y: '100%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  & CRAFT
                </motion.h2>
              </div>
            </div>

            <motion.p
              className="text-[#a8b3cf]/60 font-light max-w-sm text-sm leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Every service is delivered with obsessive attention to craft,
              cinematic precision, and an unwavering commitment to excellence.
            </motion.p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 p-12 glass-blue rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div>
            <h3 className="text-3xl font-bold text-white mb-3">Need something custom?</h3>
            <p className="text-[#a8b3cf]/60 text-sm max-w-md">
              Every vision is unique. Let&apos;s craft a bespoke production package tailored specifically to your brand and creative goals.
            </p>
          </div>
          <motion.button
            className="flex-shrink-0 px-10 py-5 bg-gradient-to-r from-[#1a6bff] to-[#00d4ff] rounded-full text-sm font-medium tracking-widest uppercase text-white btn-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start a Conversation
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
