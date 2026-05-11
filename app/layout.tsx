import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LUXFRAME STUDIOS — Cinematic Photography & Film',
  description: 'Award-winning luxury photography and cinematic film studio. We craft visual stories that transcend reality.',
  keywords: 'luxury photography, cinematic film, photo studio, visual storytelling, commercial photography',
  openGraph: {
    title: 'LUXFRAME STUDIOS',
    description: 'Cinematic Photography & Film Studio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUXFRAME STUDIOS',
    description: 'Cinematic Photography & Film Studio',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-lux-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
