import { MapPin, Clock, Heart, Smartphone } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "Localização interativa do casamento",
    description: "Botão direto para abrir o local do casamento no Google Maps. Facilite para seus convidados encontrarem o local da cerimônia",
  },
  {
    icon: Clock,
    title: "Contagem regressiva personalizada",
    description: "Contador regressivo até o grande dia com design personalizado (disponível no Plano Pro)",
  },
  {
    icon: Heart,
    title: "Confirmação de presença via WhatsApp",
    description: "Seus convidados confirmam presença diretamente no convite digital, integrado com WhatsApp",
  },
  {
    icon: Smartphone,
    title: "Convite 100% responsivo",
    description: "Perfeito em qualquer dispositivo móvel ou desktop, otimizado para compartilhar nas redes sociais",
  },
]

export function WhyChoose() {
  return (
    <section id="por-que-escolher" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-[#3E3E3E] mb-16">
          Por que escolher o CasarMe para seu Convite de Casamento Digital?
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
