import { Navbar } from "@/src/components/navbar"
import { Hero } from "@/src/components/hero"
import { HowItWorks } from "@/src/components/how-it-works"
import { Templates } from "@/src/components/templates"
import { WhyChoose } from "@/src/components/why-choose"
import { Testimonials } from "@/src/components/testimonials"
import { FinalCTA } from "@/src/components/final-cta"
import { Footer } from "@/src/components/footer"

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
