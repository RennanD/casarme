import React, { Suspense } from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Rouge_Script } from 'next/font/google'
import { Toaster } from 'sonner'

import { InitScript } from '@/src/app/init-script'
import GoogleTagManagerScripts from '@/src/lib/analytics'
import { StructuredData } from '@/src/components/structured-data'
import { ErrorBoundary } from '@/src/components/error-boundary'
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#D4A373',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://casarme.site'),
  title: 'CasarMe — Convites digitais de casamento',
  description:
    'Crie convites de casamento digitais personalizados. Templates elegantes, mapa integrado e confirmação pelo WhatsApp.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={cn(
          playfair.variable,
          inter.variable,
          rougeScript.variable,
          'min-h-screen bg-background font-sans text-foreground antialiased',
        )}
      >
        <InitScript />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}

function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <StructuredData />
      {children}
      <Toaster position="top-right" />
      <Suspense fallback={null}>
        <GoogleTagManagerScripts />
      </Suspense>
    </ErrorBoundary>
  )
}
