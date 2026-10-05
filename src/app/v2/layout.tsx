import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/src/styles/globals.css'
import { cn } from '@/src/shared/lib/cn'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
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
        geistSans.variable,
        geistMono.variable,
        'min-h-screen bg-background font-sans text-foreground antialiased',
      )}
    >
      {children}
    </div>
  )
}
