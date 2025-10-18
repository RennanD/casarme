"use client"

import { Button } from "@/src/components/ui/button"
import Link from "next/link"

const objections = [
  {
    problem: "Não tenho dinheiro para designer",
    problemDescription: "Designer custa R$ 500+ e demora semanas para entregar",
    solution: "Por menos de R$ 20 e pronto em minutos. Sem espera, sem complicação!",
  },
  {
    problem: "Não sei usar Canva/Photoshop",
    problemDescription: "Canva é confuso, Photoshop é caro e difícil de aprender",
    solution: "3 cliques e pronto - Sem curso, sem complicação, sem frustração!",
  },
  {
    problem: "Não tenho tempo para criar",
    problemDescription: "Criar do zero leva horas e horas de trabalho",
    solution: "Templates prontos, você só personaliza. Pronto em menos de 5 minutos!",
  },
  {
    problem: "Não sei o que colocar no convite",
    problemDescription: "Fico perdido com tantas opções e não sei por onde começar",
    solution: "Te guia passo a passo, sem erro. Só preencher os campos!",
  },
]

export function ObjectionBreaker() {
  return (
    <section className="py-24 bg-[#FAF3E0]">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-[#3E3E3E] mb-16">
          Você Não Precisa Ser Designer para Ter um Convite Lindo!
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {objections.map((objection, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">❌</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#3E3E3E] mb-2">
                    "{objection.problem}"
                  </h3>
                  <p className="text-[#6B6B6B]">
                    {objection.problemDescription}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#3E3E3E] mb-2">
                    Solução CasarMe:
                  </h4>
                  <p className="text-[#6B6B6B]">
                    {objection.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Final */}
        <div className="text-center mt-16">
          <h3 className="font-serif text-2xl font-bold text-[#3E3E3E] mb-6">
            Pare de se preocupar com design. Deixe o CasarMe fazer isso por você!
          </h3>
          <Link href="/criar">
            <Button
              size="lg"
              className="bg-[#D4A373] hover:bg-[#C49363] text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Criar Meu Convite
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
