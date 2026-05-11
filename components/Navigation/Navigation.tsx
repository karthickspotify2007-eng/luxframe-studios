'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'

const navLinks = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Studio', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    // Initial reveal
    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 3.2 }
    )

    const onScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-700 ${
          scrolled
            ? 'py-4 glass border-b border-white/5'
            : 'py-8'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-8 flex items-center justify-between">

          {/* Logo */}
          <MagneticButton
            href="#"
            className="group flex items-center gap-3"
            strength={20}
          >
            <div className="w-8 h-8 relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a6bff] to-[#00d4ff] rounded-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-[3px] bg-lux-black rounded-sm" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#00d4ff] rounded-full" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold tracking-[0.15em] text-white">LUXFRAME</span>
              <span className="text-[9px] tracking-[0.3em] text-[#a8b3cf]/60 uppercase">Studios</span>
            </div>
          </MagneticButton>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="nav-link relative text-[12px] font-light tracking-[0.15em] text-[#a8b3cf] hover:text-white transition-colors duration-300 uppercase"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA + Menu */}
          <div className="flex items-center gap-6">
            <MagneticButton
              className="hidden md:flex items-center gap-3 px-6 py-3 neon-border rounded-full text-[11px] font-medium tracking-[0.2em] uppercase text-white hover:bg-white/5 transition-all duration-300"
              onClick={() => scrollTo('#contact')}
              strength={20}
            >
              Book Studio
            </MagneticButton>

            {/* Hamburger */}
            <button
              className="md:hidden relative w-8 h-8 flex flex-col items-end justify-center gap-[6px]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <motion.span
                className="block h-[1px] bg-white"
                animate={{ width: menuOpen ? '100%' : '100%', rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-[1px] bg-white w-[70%]"
                animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? 10 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-[1px] bg-white w-[50%]"
                animate={{ width: menuOpen ? '100%' : '50%', rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[9980] bg-lux-black/98 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-4xl font-thin tracking-widest text-white/80 hover:text-white transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                onClick={() => scrollTo('#contact')}
                className="mt-6 px-8 py-4 border border-[#1a6bff]/50 text-[#1a6bff] text-sm tracking-[0.2em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Book Studio
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
