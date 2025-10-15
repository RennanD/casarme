import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CasarMe - Crie Convites de Casamento Interativos",
  description:
    "Crie convites de casamento digitais e interativos com templates elegantes. Countdown, confirmação de presença, localização no mapa e muito mais.",
  keywords: ["convite de casamento", "convite digital", "site de casamento", "convite interativo", "casamento online"],
  authors: [{ name: "CasarMe" }],
  creator: "CasarMe",
  publisher: "CasarMe",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://casarme.com"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "CasarMe - Crie Convites de Casamento Interativos",
    description:
      "Crie convites de casamento digitais e interativos com templates elegantes. Countdown, confirmação de presença, localização no mapa e muito mais.",
    siteName: "CasarMe",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CasarMe - Convites de Casamento Interativos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CasarMe - Crie Convites de Casamento Interativos",
    description: "Crie convites de casamento digitais e interativos com templates elegantes.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
