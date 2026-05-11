'use client'

import { motion } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-lux-black border-t border-white/5 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-lux-navy/10 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a6bff] to-[#00d4ff] rounded-sm opacity-80" />
                <div className="absolute inset-[3px] bg-lux-black rounded-sm" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#00d4ff] rounded-full" />
                </div>
              </div>
              <div>
                <div className="text-[13px] font-bold tracking-[0.15em] text-white">LUXFRAME</div>
                <div className="text-[9px] tracking-[0.3em] text-[#a8b3cf]/50 uppercase">Studios</div>
              </div>
            </div>

            <p className="text-[#a8b3cf]/50 text-sm leading-relaxed max-w-xs mb-8">
              Luxury cinematic photography and film studio. We craft visual stories that
              transcend the ordinary and define the extraordinary.
            </p>

            <MagneticButton
              href="https://wa.me/13105550192"
              className="inline-flex items-center gap-3 px-6 py-3 glass-blue rounded-full text-xs tracking-[0.2em] uppercase text-[#1a6bff] hover:bg-[#1a6bff]/10 transition-all"
              strength={15}
            >
              <span className="w-2 h-2 bg-[#00d4ff] rounded-full animate-pulse-glow" />
              Chat on WhatsApp
            </MagneticButton>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[9px] tracking-[0.4em] uppercase text-[#a8b3cf]/40 mb-6">Navigate</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Work', href: '#portfolio' },
                { label: 'Studio', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Testimonials', href: '#testimonials' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm font-light text-[#a8b3cf]/50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-[9px] tracking-[0.4em] uppercase text-[#a8b3cf]/40 mb-6">Connect</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <div className="text-[9px] text-[#a8b3cf]/30 uppercase tracking-wider mb-1">Email</div>
                <span className="text-sm font-light text-[#a8b3cf]/60">hello@luxframe.studio</span>
              </li>
              <li>
                <div className="text-[9px] text-[#a8b3cf]/30 uppercase tracking-wider mb-1">Studio</div>
                <span className="text-sm font-light text-[#a8b3cf]/60">Los Angeles, CA</span>
              </li>
              <li>
                <div className="text-[9px] text-[#a8b3cf]/30 uppercase tracking-wider mb-1">Hours</div>
                <span className="text-sm font-light text-[#a8b3cf]/60">Mon – Fri, 9AM – 6PM PST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-[#a8b3cf]/20 tracking-widest">
            © {year} LUXFRAME STUDIOS. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-8">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <button
                key={item}
                className="text-[10px] text-[#a8b3cf]/20 hover:text-[#a8b3cf]/50 transition-colors tracking-widest uppercase"
              >
                {item}
              </button>
            ))}
          </div>

          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full" />
            <span className="text-[9px] tracking-[0.3em] text-[#a8b3cf]/30 uppercase">
              Available for projects
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
