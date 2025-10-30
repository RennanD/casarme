import { Navbar } from "@/src/components/navbar"
import { Footer } from "@/src/components/footer"
import type { Metadata } from "next"
import { Heart, Download, Sparkles, Gift, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"

export const metadata: Metadata = {
  title: "Convite de Padrinhos Baixado com Sucesso | CasarMe",
  description:
    "Seu convite de padrinhos foi baixado! Agora crie seu convite de casamento completo e interativo para todos os seus convidados.",
}

export default function GodparentThankYouPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen bg-gradient-to-b from-[#FAF3E0] to-white">
        <div className="pt-24 pb-16">
          {/* Success Section */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <CheckCircle className="w-4 h-4" />
                Download Concluído
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#3E3E3E] mb-6 text-balance">
                Convite de Padrinhos Baixado!
              </h1>

              <p className="text-lg md:text-xl text-[#3E3E3E]/80 mb-8 text-pretty leading-relaxed max-w-3xl mx-auto">
                Perfeito! Seu convite de padrinhos foi baixado com sucesso. Agora que você já convidou seus padrinhos,
                que tal criar um convite de casamento completo e interativo para todos os seus convidados?
              </p>

              <div className="flex flex-wrap gap-6 justify-center text-sm text-[#3E3E3E]/70 mb-12">
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-[#D4A373]" />
                  <span>Download Realizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#D4A373]" />
                  <span>Padrinhos Convidados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D4A373]" />
                  <span>Próximo: Convite Completo</span>
                </div>
              </div>

              {/* CTA Card */}
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#D4A373] to-[#C4935F] rounded-3xl p-8 md:p-12 text-center shadow-xl">
                <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Gift className="w-4 h-4" />
                  Próximo Passo
                </div>

                <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                  Crie Seu Convite de Casamento Completo
                </h2>

                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto text-pretty">
                  Agora que seus padrinhos já foram convidados, crie um convite de casamento digital completo
                  com mapa interativo, confirmação de presença, galeria de fotos e muito mais!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-[#D4A373] hover:bg-white/90 font-semibold text-lg px-8"
                  >
                    <Link href="/criar?utm_source=godparent&utm_medium=thank_you">Criar Convite de Casamento</Link>
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
            </div>
          </section>

          {/* Features Section */}
          <section className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl text-[#3E3E3E] mb-8 text-center">
                O que você pode criar no convite completo?
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="w-12 h-12 bg-[#D4A373]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-[#D4A373]" />
                  </div>
                  <h3 className="font-semibold text-lg text-[#3E3E3E] mb-2">Mensagem Personalizada</h3>
                  <p className="text-[#3E3E3E]/80 text-sm">
                    Conte sua história de amor e personalize cada detalhe do convite.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="w-12 h-12 bg-[#D4A373]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-6 h-6 text-[#D4A373]" />
                  </div>
                  <h3 className="font-semibold text-lg text-[#3E3E3E] mb-2">Mapa Interativo</h3>
                  <p className="text-[#3E3E3E]/80 text-sm">
                    Inclua localização do casamento com mapa integrado do Google.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="w-12 h-12 bg-[#D4A373]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-[#D4A373]" />
                  </div>
                  <h3 className="font-semibold text-lg text-[#3E3E3E] mb-2">Confirmação de Presença</h3>
                  <p className="text-[#3E3E3E]/80 text-sm">
                    Receba confirmações automaticamente via WhatsApp.
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
