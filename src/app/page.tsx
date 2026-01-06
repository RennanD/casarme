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
  title: "Convite de casamento digital interativo, rápido e sem dor de cabeça | CasarMe",
  description: "Crie seu convite em minutos e receba um link para enviar aos convidados. Simples, com confimação de presença elegante e sem depender de designer.",
  keywords: "convite de casamento digital, convite online casamento, criar convite digital, convite personalizado casamento, convite digital barato, modelos convite casamento, convite casamento 3 cliques, convite digital menos 30 reais",
  twitter: {
    card: "summary_large_image",
    title: "Convite de casamento digital interativo, rápido e sem dor de cabeça | Por menos de R$ 30",
    description: "Crie seu convite em minutos e receba um link para enviar aos convidados. Simples, com confimação de presença elegante e sem depender de designer. Por menos de R$ 30 - Sem mensalidade.",
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
