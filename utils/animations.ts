import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function revealText(
  elements: Element[] | NodeList,
  options: gsap.TweenVars = {}
) {
  return gsap.fromTo(
    elements,
    { y: '110%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.08,
      ...options,
    }
  )
}

export function createScrollReveal(
  trigger: string | Element,
  animation: gsap.TweenVars,
  scrollOptions: ScrollTrigger.Vars = {}
) {
  return gsap.fromTo(
    trigger,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
        ...scrollOptions,
      },
      ...animation,
    }
  )
}

export function parallaxLayer(
  element: string | Element,
  speed = 0.5
) {
  return gsap.to(element, {
    yPercent: -100 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

export function magneticEffect(
  element: HTMLElement,
  strength = 40
) {
  const handleMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(element, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  element.addEventListener('mousemove', handleMove)
  element.addEventListener('mouseleave', handleLeave)

  return () => {
    element.removeEventListener('mousemove', handleMove)
    element.removeEventListener('mouseleave', handleLeave)
  }
}

export function splitTextIntoLines(text: string): string[] {
  return text.split('\n').filter(Boolean)
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}
