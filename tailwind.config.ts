import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'lux-black': '#020409',
        'lux-navy': '#060d1f',
        'lux-blue': '#0a1628',
        'lux-electric': '#1a6bff',
        'lux-cyan': '#00d4ff',
        'lux-purple': '#6b21ff',
        'lux-silver': '#a8b3cf',
        'lux-glow': '#4d9fff',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'grain': 'grain 0.5s steps(2) infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, 2%)' },
          '30%': { transform: 'translate(-1%, 4%)' },
          '40%': { transform: 'translate(4%, -1%)' },
          '50%': { transform: 'translate(-3%, 3%)' },
          '60%': { transform: 'translate(2%, -4%)' },
          '70%': { transform: 'translate(-4%, 2%)' },
          '80%': { transform: 'translate(3%, -2%)' },
          '90%': { transform: 'translate(-2%, 4%)' },
        },
      },
      backgroundImage: {
        'cinematic-gradient': 'linear-gradient(135deg, #020409 0%, #060d1f 30%, #0a1628 60%, #020409 100%)',
        'electric-gradient': 'linear-gradient(135deg, #1a6bff 0%, #6b21ff 50%, #00d4ff 100%)',
        'glow-radial': 'radial-gradient(ellipse at center, rgba(26,107,255,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}

export default config
