import React, { Suspense } from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "sonner"
import GoogleTagManagerScripts from "@/src/lib/analytics"

const playfair = {
  variable: "--font-playfair",
}

const inter = {
  variable: "--font-inter",
}

export const metadata: Metadata = {
  title: "CasarMe - Convites de Casamento Online",
  description:
    "Crie seu convite de casamento online com fotos e vídeos. Rápido, elegante e perfeito para compartilhar com quem você ama.",
  keywords: ["convite de casamento online", "convite de casamento digital", "convite de casamento interativo"],
  generator: "v0.app",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://casarme.vercel.app'),
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
      {children}
      <Toaster position="top-right" />
      <Suspense>
        <GoogleTagManagerScripts />
      </Suspense>
    </>
  )
}
