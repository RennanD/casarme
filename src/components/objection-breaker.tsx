"use client"

import { Button } from "@/src/components/ui/button"
import Link from "next/link"

const objections = [
  {
    problem: "Não tenho dinheiro para designer",
    problemDescription: "Designer custa R$ 500+ e demora semanas para entregar seu arquivo",
    solution: "Pague menos de R$ 30 e tenha seu convite pronto HOJE. Sem espera, sem taxas extras!",
  },
  {
    problem: "Não sei usar Canva ou Photoshop",
    problemDescription: "Aprender do zero leva tempo e o resultado nem sempre fica como você sonhou",
    solution: "Esqueça o Canva. No CasarMe é só preencher os campos e seu convite de luxo está pronto!",
  },
  {
    problem: "Tenho pressa para enviar",
    problemDescription: "Preciso enviar os convites agora e não posso esperar dias pela criação",
    solution: "Recebimento imediato. Pagou, recebeu seu link e já pode enviar pelo WhatsApp!",
  },
  {
    problem: "Quero algo que funcione no celular",
    problemDescription: "JPGs estáticos são ruins de ler e não têm mapa ou confirmação",
    solution: "Experiência interativa nativa. Seus convidados confirmam com um clique e abrem o mapa direto!",
  },
]

export function ObjectionBreaker() {
  return (
    <section className="py-24 bg-[#FAF3E0]" aria-labelledby="objection-title">
      <div className="container mx-auto px-4">
        <h2 id="objection-title" className="font-serif text-3xl md:text-4xl font-bold text-center text-[#3E3E3E] mb-16">
          Você Não Precisa Ser Designer para Ter um Convite Lindo!
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto" role="list" aria-label="Objeções comuns e soluções">
          {objections.map((objection, index) => (
            <article key={index} className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in" style={{ animationDelay: `${index * 150}ms` }} role="listitem">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
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
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
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
            </article>
          ))}
        </div>

        {/* CTA Final */}
        <div className="text-center mt-16">
          <h3 className="font-serif text-2xl font-bold text-[#3E3E3E] mb-6">
            Pare de se preocupar com design. Deixe o CasarMe fazer isso por você!
          </h3>
          <Link href="/#templates" aria-label="Ver modelos de convite de casamento digital" className="touch-target">
            <Button
              size="lg"
              className="bg-[#D4A373] hover:bg-[#C49363] text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:focus-visible"
              type="button"
            >
              Criar Meu Convite
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
