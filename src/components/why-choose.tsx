import { Sparkles, DollarSign, MapPin, Heart } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Criação em 3 cliques - Sem complicação",
    description: "Não precisa ser designer. Templates prontos, você só personaliza. Sem curso, sem frustração!",
  },
  {
    icon: DollarSign,
    title: "Por menos de R$ 20 - Mais barato que impresso",
    description: "Sem mensalidade, pague uma vez só. Mais econômico que convites tradicionais e muito mais funcional",
  },
  {
    icon: MapPin,
    title: "MAPA INTERATIVO incluído - Seus convidados encontram fácil",
    description: "Botão direto para abrir o local no Google Maps. Seus convidados chegam sem erro",
  },
  {
    icon: Heart,
    title: "Confirmação via WhatsApp - Organize sua lista automaticamente",
    description: "Seus convidados confirmam presença diretamente no convite. Lista organizada automaticamente",
  },
]

export function WhyChoose() {
  return (
    <section id="por-que-escolher" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-[#3E3E3E] mb-16">
          Por que Mais de 500 Casais Escolheram o CasarMe?
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-6 p-6 rounded-2xl hover:bg-[#FAF3E0] transition-colors duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-[#EDE0D4] flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-[#D4A373]" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#3E3E3E] mb-2">{feature.title}</h3>
                <p className="text-[#6B6B6B] leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
