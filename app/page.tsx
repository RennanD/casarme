import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Templates } from "@/components/templates"
import { WhyChoose } from "@/components/why-choose"
import { Testimonials } from "@/components/testimonials"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

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
