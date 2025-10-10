import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

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
  return <>{children}</>
}
