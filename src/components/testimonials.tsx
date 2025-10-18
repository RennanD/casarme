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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-[#3E3E3E] mb-16">
          Depoimentos de Casais que Criaram seus Convites Digitais
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 bg-[#FAF3E0] border-none shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4A373] text-[#D4A373]" />
                ))}
              </div>
              <p className="text-[#3E3E3E] mb-6 leading-relaxed italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="font-serif font-semibold text-[#3E3E3E]">{testimonial.name}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
