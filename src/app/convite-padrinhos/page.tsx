import { Navbar } from "@/src/components/navbar"
import { Footer } from "@/src/components/footer"
import { GodparentInvitationForm } from "@/src/components/godparent-invitation-form"
import type { Metadata } from "next"
import { Heart, Sparkles, Gift } from "lucide-react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"

export const metadata: Metadata = {
  title: "Convite de Casamento para Padrinhos Grátis - Crie Online | CasarMe",
  description:
    "Crie convites de casamento para padrinhos grátis! Modelos personalizados e emocionantes para convidar seus padrinhos de forma especial. Faça online em minutos.",
  keywords:
    "convite de casamento padrinhos, convite padrinhos casamento, como convidar padrinhos de casamento, convite para ser padrinho, convite madrinha casamento, convite padrinhos grátis, modelo convite padrinhos",
  openGraph: {
    title: "Convite de Casamento para Padrinhos Grátis - Crie Online",
    description:
      "Crie convites personalizados para convidar seus padrinhos de casamento de forma especial e emocionante. Grátis e online!",
    type: "website",
  },
}

export default function ConvitePadrinhosPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen bg-gradient-to-b from-[#FAF3E0] to-white">
        <div className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-[#D4A373]/10 text-[#D4A373] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Totalmente Gratuito
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#3E3E3E] mb-6 text-balance">
                Convite de Casamento para Padrinhos
              </h1>

              <p className="text-lg md:text-xl text-[#3E3E3E]/80 mb-8 text-pretty leading-relaxed max-w-3xl mx-auto">
                Convide seus padrinhos de casamento de forma especial e emocionante! Crie convites personalizados grátis
                com mensagens afetivas que vão tornar esse momento ainda mais memorável.
              </p>

              <div className="flex flex-wrap gap-6 justify-center text-sm text-[#3E3E3E]/70">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#D4A373]" />
                  <span>Modelos Emocionantes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D4A373]" />
                  <span>100% Personalizável</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-[#D4A373]" />
                  <span>Totalmente Grátis</span>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Content Section */}
          <section className="container mx-auto px-4 mb-12">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="font-serif text-2xl md:text-3xl text-[#3E3E3E] mb-4">
                Como Convidar Padrinhos de Casamento?
              </h2>
              <p className="text-[#3E3E3E]/80 mb-4 leading-relaxed">
                Convidar padrinhos de casamento é um momento especial que merece atenção. Os padrinhos são pessoas
                importantes que estarão ao seu lado neste dia único, e o convite deve refletir o carinho e a importância
                que eles têm na sua vida.
              </p>
              <p className="text-[#3E3E3E]/80 leading-relaxed">
                Com nossos modelos de convite para padrinhos, você pode criar um convite personalizado e emocionante em
                minutos. Escolha o modelo que mais combina com você, adicione uma mensagem especial e o nome do padrinho
                ou madrinha, e pronto! Seu convite estará pronto para ser compartilhado.
              </p>
            </div>
          </section>

          {/* Main Form */}
          <GodparentInvitationForm />

          {/* CTA Card for Wedding Invitation */}
          <section className="container mx-auto px-4 mt-16">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#D4A373] to-[#C4935F] rounded-3xl p-8 md:p-12 text-center shadow-xl">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Próximo Passo
              </div>

              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Agora Crie Seu Convite de Casamento Completo
              </h2>

              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto text-pretty">
                Já convidou seus padrinhos? Que tal criar um convite de casamento digital completo e interativo para
                todos os seus convidados? Com mapa, confirmação de presença e muito mais!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#D4A373] hover:bg-white/90 font-semibold text-lg px-8"
                >
                  <Link href="/criar">Criar Convite de Casamento</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8 bg-transparent"
                >
                  <Link href="/#templates">Ver Modelos</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* FAQ Section for SEO */}
          <section className="container mx-auto px-4 mt-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl text-[#3E3E3E] mb-8 text-center">
                Perguntas Frequentes sobre Convites para Padrinhos
              </h2>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-lg text-[#3E3E3E] mb-2">
                    O que escrever no convite para padrinhos de casamento?
                  </h3>
                  <p className="text-[#3E3E3E]/80 leading-relaxed">
                    Escreva uma mensagem sincera e afetiva, expressando o quanto essa pessoa é especial para você e o
                    quanto seria importante tê-la como padrinho ou madrinha no seu casamento. Seja autêntico e demonstre
                    seu carinho.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-lg text-[#3E3E3E] mb-2">
                    Quando convidar os padrinhos de casamento?
                  </h3>
                  <p className="text-[#3E3E3E]/80 leading-relaxed">
                    O ideal é convidar os padrinhos logo após definir a data do casamento, geralmente de 6 a 12 meses
                    antes da cerimônia. Isso dá tempo para que eles se organizem e participem dos preparativos.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-lg text-[#3E3E3E] mb-2">
                    É grátis mesmo criar o convite para padrinhos?
                  </h3>
                  <p className="text-[#3E3E3E]/80 leading-relaxed">
                    Sim! A criação de convites para padrinhos é 100% gratuita. Você pode criar quantos convites quiser,
                    personalizar com suas mensagens e compartilhar sem nenhum custo.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
