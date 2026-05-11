'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit'
}

export default function MagneticButton({
  children,
  className = '',
  strength = 35,
  onClick,
  href,
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    const inner = innerRef.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(el, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.5,
        ease: 'power2.out',
      })

      if (inner) {
        gsap.to(inner, {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.5,
          ease: 'power2.out',
        })
      }
    }

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
      })
      if (inner) {
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.4)',
        })
      }
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [strength])

  const sharedClass = `magnetic-btn ${className}`

  if (href) {
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={sharedClass}>
        <span ref={innerRef}>{children}</span>
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={sharedClass}
      onClick={onClick}
      type={type}
    >
      <span ref={innerRef}>{children}</span>
    </button>
  )
}
