import { Navbar } from "@/src/components/navbar"
import { HeroWithImage } from "@/src/components/hero-with-image"
import { ObjectionBreaker } from "@/src/components/objection-breaker"
import { HowItWorks } from "@/src/components/how-it-works"
import { Templates } from "@/src/components/templates"
import { WhyChoose } from "@/src/components/why-choose"
import { Testimonials } from "@/src/components/testimonials"
import { FinalCTA } from "@/src/components/final-cta"
import { Footer } from "@/src/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Convite de Casamento Digital - Crie em 3 Cliques | CasarMe",
  description: "Crie seu convite de casamento digital personalizado em 3 cliques! Templates elegantes, mapa interativo, confirmação WhatsApp.",
  keywords: "convite de casamento digital, convite online casamento, criar convite digital, convite personalizado casamento, convite digital barato, templates convite casamento, convite casamento 3 cliques, convite digital menos 20 reais",
  openGraph: {
    title: "Convite de Casamento Digital - Crie em 3 Cliques | CasarMe",
    description: "Crie seu convite de casamento digital personalizado em 3 cliques! Templates elegantes, mapa interativo, confirmação WhatsApp.",
    type: "website",
    url: "https://casarme.site",
    siteName: "CasarMe",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Convite de Casamento Digital - Crie em 3 Cliques | CasarMe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convite de Casamento Digital - Crie em 3 Cliques | Por menos de R$ 20",
    description: "Crie seu convite de casamento digital personalizado em 3 cliques! Templates elegantes, mapa interativo, confirmação WhatsApp. Por menos de R$ 20 - Sem mensalidade.",
    images: ["/opengraph-image"],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <HeroWithImage />
        <ObjectionBreaker />
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
