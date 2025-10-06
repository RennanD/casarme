import { Upload, Palette, Share2 } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Envie suas fotos e vídeos",
    description: "Faça upload das suas melhores memórias juntos",
  },
  {
    icon: Palette,
    title: "Escolha um template",
    description: "Selecione entre nossos designs elegantes",
  },
  {
    icon: Share2,
    title: "Compartilhe com seus convidados",
    description: "Envie por WhatsApp, Instagram ou TikTok",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-[#3E3E3E] mb-16">Como Funciona</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FAF3E0] mb-6">
                <step.icon className="w-10 h-10 text-[#D4A373]" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">{step.title}</h3>
              <p className="text-[#6B6B6B] text-lg leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
