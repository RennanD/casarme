import React, { Suspense } from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Bad_Script } from "next/font/google"
import { Toaster } from "sonner"
import GoogleTagManagerScripts from "@/src/lib/analytics"
import { StructuredData } from "@/src/components/structured-data"
import { ErrorBoundary } from "@/src/components/error-boundary"
import { InitScript } from "@/src/app/init-script"

const playfair = {
  variable: "--font-playfair",
}

const inter = {
  variable: "--font-inter",
}

const script = Bad_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
  preload: false, // Não bloquear renderização
  fallback: ["serif"], // Fallback imediato
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#D4A373',
};

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
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/* Meta tags críticas para mobile */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`font-sans ${playfair.variable} ${inter.variable} ${script.variable} antialiased`}>
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
      {/* Script de compatibilidade */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Verificação básica de compatibilidade
            (function() {
              try {
                if (typeof Promise === 'undefined' || typeof fetch === 'undefined') {
                  console.warn('Browser compatibility issue detected');
                }
              } catch(e) {
                console.error('Compatibility check failed:', e);
              }
            })();
          `,
        }}
      />
    </ErrorBoundary>
  )
}
