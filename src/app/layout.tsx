import React, { Suspense } from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "sonner"
import GoogleTagManagerScripts from "@/src/lib/analytics"
import { StructuredData } from "@/src/components/structured-data"

const playfair = {
  variable: "--font-playfair",
}

const inter = {
  variable: "--font-inter",
}

export const metadata: Metadata = {
  title: "Criar Convite de Casamento Digital - CasarMe | Templates Elegantes",
  description:
    "Crie seu convite de casamento digital personalizado em 3 cliques! Templates elegantes, mapa interativo, confirmação WhatsApp. Por menos de R$ 20 - Sem mensalidade.",
  keywords: [
    "criar convite de casamento",
    "convite de casamento digital",
    "convite de casamento online",
    "convite digital casamento",
    "templates convite casamento",
    "convite casamento personalizado",
    "convite digital barato",
    "convite casamento 3 cliques",
    "convite digital menos 20 reais",
    "criar convite digital",
    "convite online casamento",
    "convite personalizado casamento"
  ],
  authors: [{ name: "CasarMe" }],
  creator: "CasarMe",
  publisher: "CasarMe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://casarme.site'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://casarme.site',
    siteName: 'CasarMe',
    title: 'Criar Convite de Casamento Digital - CasarMe',
    description: 'Crie seu convite de casamento digital personalizado em 3 cliques! Templates elegantes, mapa interativo, confirmação WhatsApp.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Criar Convite de Casamento Digital - CasarMe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Criar Convite de Casamento Digital - CasarMe',
    description: 'Crie seu convite de casamento digital personalizado em 3 cliques! Templates elegantes, mapa interativo, confirmação WhatsApp.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' }
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
    <html lang="pt-BR">
      <body className={`font-sans ${playfair.variable} ${inter.variable} antialiased`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}

function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData />
      {children}
      <Toaster position="top-right" />
      <Suspense>
        <GoogleTagManagerScripts />
      </Suspense>
    </>
  )
}
