import { Navbar } from "@/src/components/navbar"
import { HeroWithImage } from "@/src/components/hero-with-image"
import { ObjectionBreaker } from "@/src/components/objection-breaker"
import { HowItWorks } from "@/src/components/how-it-works"
import { Templates } from "@/src/components/templates"
import { WhatsAppConfirmation } from "@/src/components/whatsapp-confirmation"
import { WhyChoose } from "@/src/components/why-choose"
import { Testimonials } from "@/src/components/testimonials"
import { FinalCTA } from "@/src/components/final-cta"
import { Footer } from "@/src/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Convite de Casamento Digital Interativo | Pronto em 5 Minutos",
  description: "Crie seu convite de casamento digital premium em menos de 5 minutos. Sem Canva, sem designers e sem mensalidade. Link interativo com RSVP via WhatsApp e Mapa.",
  keywords: "convite de casamento digital, convite interativo casamento, criar convite online, convite digital whatsapp, rsvp whatsapp casamento, convite de casamento barato e rápido, convite digital sem canva, convite luxo digital",
  twitter: {
    card: "summary_large_image",
    title: "Convite de Casamento Digital Interativo | Pronto em 5 Minutos",
    description: "Crie agora seu convite interativo. Rápido, fácil e profissional. Por menos de R$ 30 - Pagamento Único.",
    images: ["/opengraph-image"],
  },
}

export default function Home() {
  return (
    <>
      {/* Skip Links for Keyboard Navigation */}
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <a href="#navigation" className="skip-link">
        Pular para a navegação
      </a>

      <header>
        <Navbar />
      </header>
      <main id="main-content" className="min-h-screen">
        <div className="pt-16">
          <HeroWithImage />
          <ObjectionBreaker />
          <Templates />
          <HowItWorks />
          <WhatsAppConfirmation />
          <WhyChoose />
          <Testimonials />
          <FinalCTA />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
