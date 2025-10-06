import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Templates } from "@/components/templates"
import { WhyChoose } from "@/components/why-choose"
import { Pricing } from "@/components/pricing"
import { Testimonials } from "@/components/testimonials"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <Templates />
      <WhyChoose />
      <Pricing />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}
