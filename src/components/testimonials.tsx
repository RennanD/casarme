import { Card } from "@/src/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Ana & Lucas",
    text: "Nossos convidados amaram o convite digital! Parecia um mini site do nosso amor com mapa e contagem regressiva.",
    image: "/happy-couple-wedding-portrait.jpg",
  },
  {
    name: "Mariana & Pedro",
    text: "O convite de casamento digital ficou lindo e foi super fácil de criar. Recomendo demais para outros casais!",
    image: "/smiling-couple-wedding-photo.jpg",
  },
  {
    name: "Julia & Rafael",
    text: "A música de fundo e galeria de fotos no convite deixaram tudo ainda mais especial e emocionante para nossos convidados.",
    image: "/romantic-couple-wedding-celebration.jpg",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-white" aria-labelledby="testimonials-title">
      <div className="container mx-auto px-4">
        <h2 id="testimonials-title" className="font-serif text-3xl md:text-4xl font-bold text-center text-[#3E3E3E] mb-16">
          Depoimentos de Casais que Criaram seus Convites Digitais
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto" role="list" aria-label="Depoimentos de clientes">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              role="listitem"
              className="p-6 bg-[#FAF3E0] border-none shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in rounded-lg"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex gap-1 mb-4" aria-label="5 estrelas" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4A373] text-[#D4A373]" />
                ))}
              </div>
              <blockquote className="text-[#3E3E3E] mb-6 leading-relaxed italic">
                <p>"{testimonial.text}"</p>
              </blockquote>
              <footer className="flex items-center gap-3">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={`Foto de ${testimonial.name}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <cite className="font-serif font-semibold text-[#3E3E3E] not-italic">{testimonial.name}</cite>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
