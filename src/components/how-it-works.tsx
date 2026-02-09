import { FileText, Palette, Sparkles } from "lucide-react"

const steps = [
  {
    icon: Palette,
    title: "Escolha seu modelo de luxo",
    description: "Selecione entre nossos designs interativos premium focados em experiência mobile.",
  },
  {
    icon: FileText,
    title: "Preencha seus dados em 2 minutos",
    description: "Nós guiamos você passo a passo. Sem necessidade de habilidades em design ou ferramentas.",
  },
  {
    icon: Sparkles,
    title: "Receba seu link na hora",
    description: "Logo após o pagamento, seu convite interativo está pronto para ser enviado instantaneamente.",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-[#FAF3E0]" aria-labelledby="how-it-works-title">
      <div className="container mx-auto px-4">
        <h2 id="how-it-works-title" className="font-serif text-3xl md:text-4xl font-bold text-center text-[#3E3E3E] mb-16">
          Como Criar seu Convite Digital em 3 Passos Simples
        </h2>
        <ol className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto" role="list" aria-label="Passos para criar convite digital">
          {steps.map((step, index) => (
            <li key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 150}ms` }} role="listitem">
              <article>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FAF3E0] mb-6" aria-hidden="true">
                  <step.icon className="w-10 h-10 text-[#D4A373]" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">{step.title}</h3>
                <p className="text-[#6B6B6B] text-lg leading-relaxed">{step.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
