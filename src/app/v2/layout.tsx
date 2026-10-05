import type { Metadata } from 'next'
import { Inter, Playfair_Display, Rouge_Script } from 'next/font/google'

import { cn } from '@/src/shared/lib/cn'

import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const rougeScript = Rouge_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-rouge-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CasarMe v2',
  robots: {
    index: false,
    follow: false,
  },
}

export default function V2Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={cn(
        playfair.variable,
        inter.variable,
        rougeScript.variable,
        'min-h-screen bg-background font-sans text-foreground antialiased',
      )}
    >
      {children}
    </div>
  )
}
