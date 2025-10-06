import { Heart, Smartphone, Zap, Video } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Feito para ser compartilhado",
    description: "Seus convidados vão amar receber um convite tão especial",
  },
  {
    icon: Smartphone,
    title: "Perfeito para TikTok e Instagram",
    description: "Formato otimizado para redes sociais e WhatsApp",
  },
  {
    icon: Zap,
    title: "Crie em menos de 5 minutos",
    description: "Interface simples e intuitiva, sem complicação",
  },
  {
    icon: Video,
    title: "Suporte a vídeos curtos e fotos",
    description: "Conte sua história com imagens e vídeos emocionantes",
  },
]

export function WhyChoose() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-[#3E3E3E] mb-16">
          Por que escolher o Amore?
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
