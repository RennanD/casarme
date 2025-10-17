import { Navbar } from "@/src/components/navbar"
import { Hero } from "@/src/components/hero"
import { HowItWorks } from "@/src/components/how-it-works"
import { Templates } from "@/src/components/templates"
import { WhyChoose } from "@/src/components/why-choose"
import { Testimonials } from "@/src/components/testimonials"
import { FinalCTA } from "@/src/components/final-cta"
import { Footer } from "@/src/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "CasarMe - Convites de Casamento Digitais Personalizados",
  description: "Crie convites de casamento digitais únicos em minutos. Templates elegantes, personalização completa e compartilhamento fácil. Comece seu grande dia com estilo!",
  keywords: "convite de casamento digital, convite online, casamento, wedding, convite personalizado, templates de casamento",
  openGraph: {
    title: "CasarMe - Convites de Casamento Digitais Personalizados",
    description: "Crie convites de casamento digitais únicos em minutos. Templates elegantes, personalização completa e compartilhamento fácil. Comece seu grande dia com estilo!",
    type: "website",
    url: "https://casarme.com.br",
    siteName: "CasarMe",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CasarMe - Convites de Casamento Digitais Personalizados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CasarMe - Convites de Casamento Digitais Personalizados",
    description: "Crie convites de casamento digitais únicos em minutos. Templates elegantes, personalização completa e compartilhamento fácil.",
    images: ["/opengraph-image"],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Hero />
        <HowItWorks />
        <Templates />
        <WhyChoose />
        <Testimonials />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  )
}
