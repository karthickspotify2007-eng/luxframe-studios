'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)
  const animFrameRef = useRef<number>()

  useEffect(() => {
    // Canvas 2D particles — optional, gracefully skipped if unavailable
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const particles: Array<{
          x: number; y: number; vx: number; vy: number
          size: number; opacity: number; color: string; life: number
        }> = []

        const colors = ['#1a6bff', '#00d4ff', '#6b21ff', '#ffffff']

        for (let i = 0; i < 120; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.6 + 0.1,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: Math.random(),
          })
        }

        const drawParticles = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          particles.forEach((p) => {
            p.x += p.vx
            p.y += p.vy
            p.life += 0.005
            if (p.x < 0) p.x = canvas.width
            if (p.x > canvas.width) p.x = 0
            if (p.y < 0) p.y = canvas.height
            if (p.y > canvas.height) p.y = 0
            const pulse = Math.sin(p.life * Math.PI * 2) * 0.3 + 0.7
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2)
            ctx.fillStyle = p.color
            ctx.globalAlpha = p.opacity * pulse
            ctx.fill()
            ctx.globalAlpha = 1
          })
          animFrameRef.current = requestAnimationFrame(drawParticles)
        }

        drawParticles()
      }
    }

    // Progress animation — uses setInterval (works in background/headless tabs)
    const duration = 2800
    const startTime = Date.now()

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const raw = Math.min(elapsed / duration, 1)
      const eased = raw < 0.5
        ? 2 * raw * raw
        : 1 - Math.pow(-2 * raw + 2, 2) / 2
      const val = Math.floor(eased * 100)
      progressRef.current = val
      setProgress(val)

      if (raw >= 1) {
        clearInterval(progressInterval)
        // CSS transition exit — no rAF dependency
        setTimeout(() => {
          setExiting(true)
          setTimeout(() => {
            setVisible(false)
            onComplete()
          }, 900)
        }, 300)
      }
    }, 16)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  if (!visible) return null

  return (
    <AnimatePresence>
      <div
        ref={containerRef}
        className="fixed inset-0 z-[99999] bg-lux-black flex flex-col items-center justify-center"
        style={{
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'scale(1.02)' : 'scale(1)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Particle canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Radial glow */}
        <div className="absolute inset-0 bg-glow-radial opacity-60 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-16">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-3"
          >
            {/* Logo mark */}
            <div className="relative w-20 h-20">
              <motion.div
                className="absolute inset-0 border border-[#1a6bff]/40 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-2 border border-[#00d4ff]/30 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#1a6bff] to-[#00d4ff] rounded-sm"
                    animate={{ rotate: [0, 45, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute inset-1 bg-lux-black rounded-sm"
                    animate={{ rotate: [0, -45, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#00d4ff] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, letterSpacing: '0.8em' }}
                animate={{ opacity: 1, letterSpacing: '0.4em' }}
                transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs font-light text-[#a8b3cf] uppercase tracking-[0.4em]"
              >
                LUXFRAME STUDIOS
              </motion.p>
            </div>
          </motion.div>

          {/* Waveform animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-[3px] h-12"
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-[2px] bg-gradient-to-t from-[#1a6bff] to-[#00d4ff] rounded-full"
                animate={{
                  scaleY: [0.2, 1, 0.2],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.2 + Math.random() * 0.8,
                  repeat: Infinity,
                  delay: i * 0.04,
                  ease: 'easeInOut',
                }}
                style={{ height: '100%', transformOrigin: 'center' }}
              />
            ))}
          </motion.div>

          {/* Progress section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col items-center gap-6 w-80"
          >
            {/* Percentage */}
            <div className="flex items-baseline gap-1">
              <span
                className="text-6xl font-thin tabular-nums gradient-text"
                style={{ minWidth: '3ch', textAlign: 'right' }}
              >
                {progress}
              </span>
              <span className="text-xl font-thin text-[#a8b3cf]">%</span>
            </div>

            {/* Loading bar */}
            <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 loading-bar"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
              {/* Shimmer */}
              <motion.div
                className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ['-100%', '600%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
              />
            </div>

            <motion.p
              className="text-[10px] tracking-[0.3em] text-[#a8b3cf]/50 uppercase"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Crafting your experience
            </motion.p>
          </motion.div>
        </div>

        {/* Corner decorators */}
        {[
          'top-8 left-8',
          'top-8 right-8',
          'bottom-8 left-8',
          'bottom-8 right-8',
        ].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos} w-12 h-12`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
          >
            <div className={`absolute ${i % 2 === 0 ? 'left-0' : 'right-0'} top-0 w-8 h-[1px] bg-[#1a6bff]`} />
            <div className={`absolute ${i % 2 === 0 ? 'left-0' : 'right-0'} top-0 w-[1px] h-8 bg-[#1a6bff]`} />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  )
}
