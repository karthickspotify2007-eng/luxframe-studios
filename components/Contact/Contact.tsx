'use client'

import { useRef, useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'

const services = [
  'Fashion Editorial',
  'Commercial Campaign',
  'Fine Art Photography',
  'Cinematic Video',
  'Portrait Session',
  'Event Coverage',
  'Custom Project',
]

const budgets = ['$1,000 – $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+']

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [focused, setFocused] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1800))
    setSending(false)
    setSubmitted(true)
  }

  const inputClass = (name: string) => `
    w-full bg-transparent border-b transition-all duration-500 py-4 pr-4 text-white text-sm font-light outline-none placeholder-[#a8b3cf]/20
    ${focused === name
      ? 'border-[#1a6bff] input-glow'
      : 'border-white/10 hover:border-white/20'
    }
  `

  return (
    <section
      id="contact"
      className="relative w-full bg-lux-black py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a6bff]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-lux-navy/20 to-lux-black" />
        {/* Animated particle field */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#1a6bff]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1.5, 0],
                y: [0, -80, -160],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 6,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left info */}
          <div>
            <motion.p
              className="text-[10px] tracking-[0.4em] text-[#1a6bff] uppercase mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              — Let&apos;s Create Together
            </motion.p>

            <div className="overflow-clip mb-2">
              <motion.h2
                className="text-6xl md:text-8xl font-black leading-none text-white"
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                START A
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
                PROJECT
              </motion.h2>
            </div>

            <motion.p
              className="text-[#a8b3cf]/60 font-light leading-relaxed max-w-sm mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Tell us about your vision. We&apos;ll respond within 24 hours with a
              tailored approach to bring it to life.
            </motion.p>

            {/* Contact options */}
            <div className="flex flex-col gap-5">
              {[
                {
                  icon: '◎',
                  label: 'Email',
                  value: 'hello@luxframe.studio',
                  color: '#1a6bff',
                },
                {
                  icon: '◈',
                  label: 'WhatsApp',
                  value: '+1 (310) 555-0192',
                  color: '#00d4ff',
                  href: 'https://wa.me/13105550192',
                },
                {
                  icon: '◷',
                  label: 'Studio',
                  value: 'Los Angeles, California',
                  color: '#6b21ff',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-5 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <span className="text-xl" style={{ color: item.color }}>{item.icon}</span>
                  <div>
                    <div className="text-[9px] tracking-[0.3em] uppercase text-[#a8b3cf]/40 mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-[#a8b3cf] hover:text-white transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm text-[#a8b3cf]">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-4 mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              {['IG', 'TW', 'BE', 'LI'].map((s, i) => (
                <div
                  key={i}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-[10px] font-medium text-[#a8b3cf]/60 hover:text-white hover:glass-blue transition-all duration-300 cursor-none"
                >
                  {s}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {submitted ? (
              <motion.div
                className="p-12 glass-blue rounded-3xl text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1a6bff] to-[#00d4ff] flex items-center justify-center mx-auto mb-8 text-3xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✓
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4">Message Received</h3>
                <p className="text-[#a8b3cf]/60 leading-relaxed mb-8">
                  Thank you for reaching out. We&apos;ll review your project brief and
                  respond within 24 hours with our thoughts and next steps.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[10px] tracking-[0.3em] uppercase text-[#1a6bff] hover:text-[#00d4ff] transition-colors"
                >
                  Send another message →
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-10">

                {/* Service selection */}
                <div>
                  <label className="text-[9px] tracking-[0.3em] uppercase text-[#a8b3cf]/40 block mb-4">
                    Service Interest
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedService(s === selectedService ? null : s)}
                        className={`px-4 py-2 rounded-full text-[10px] tracking-wider uppercase transition-all duration-300 ${
                          selectedService === s
                            ? 'bg-[#1a6bff] text-white'
                            : 'glass text-[#a8b3cf]/60 hover:text-white hover:glass-blue'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + Email row */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="text-[9px] tracking-[0.3em] uppercase text-[#a8b3cf]/40 block mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className={inputClass('name')}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div>
                    <label className="text-[9px] tracking-[0.3em] uppercase text-[#a8b3cf]/40 block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      className={inputClass('email')}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                {/* Project name */}
                <div>
                  <label className="text-[9px] tracking-[0.3em] uppercase text-[#a8b3cf]/40 block mb-2">
                    Brand / Project Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your brand or project name"
                    className={inputClass('brand')}
                    onFocus={() => setFocused('brand')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="text-[9px] tracking-[0.3em] uppercase text-[#a8b3cf]/40 block mb-4">
                    Estimated Budget
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBudget(b === selectedBudget ? null : b)}
                        className={`px-4 py-2 rounded-full text-[10px] tracking-wider transition-all duration-300 ${
                          selectedBudget === b
                            ? 'bg-[#1a6bff]/20 border border-[#1a6bff] text-[#1a6bff]'
                            : 'glass text-[#a8b3cf]/60 hover:text-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-[9px] tracking-[0.3em] uppercase text-[#a8b3cf]/40 block mb-2">
                    Project Brief
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your vision, timeline, and any specific requirements..."
                    className={`${inputClass('message')} resize-none`}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Submit */}
                <MagneticButton
                  type="submit"
                  className="group relative flex items-center justify-center gap-4 py-5 bg-gradient-to-r from-[#1a6bff] to-[#00d4ff] rounded-full text-sm font-medium tracking-widest uppercase text-white btn-glow overflow-hidden w-full"
                  strength={15}
                >
                  {sending ? (
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      <span>Sending</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span>Send Project Brief</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </div>
                  )}
                </MagneticButton>

                <p className="text-[9px] text-center text-[#a8b3cf]/30 tracking-wider">
                  We respond to all inquiries within 24 hours. Your information is kept confidential.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
