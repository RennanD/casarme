import { Button } from "@/components/ui/button"
import { MapPin, MessageCircle, Music, Zap, CreditCard, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import blueTemplateImage from "@/src/assets/images/thumbs/blue/2.png" // Placeholder or use correct thumbnail if exists
import { BlueTemplateDialog } from "@/src/components/blue-template-dialog"

export const metadata = {
  title: "Convite de Casamento Floral - Modelo Azul | Casarme",
  description: "Crie um convite de casamento único com esta arte em tons azuis. Edite facilmente online e envie para seus convidados por redes sociais.",
}

export default function BlueTemplatePage() {
  return (
    <div className="bg-[#FAF3E0]/20">

      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-[#D4A373] fill-current" />
              <span className="font-serif text-2xl text-[#3E3E3E]" style={{ fontFamily: "Playfair Display" }}>
                CasarMe
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 pt-32 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#08265E] mb-4">
          Convite de Casamento Azul, digital e interativo
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Crie um convite de casamento único com este design clássico e floral. Personalize online e envie para
          seus convidados por redes sociais ou imprima.
        </p>
      </div>

      {/* Template Preview */}
      <div className="max-w-lg mx-auto px-4 mb-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#08265E]/10 flex items-center justify-center p-8 bg-gradient-to-br from-white to-blue-50/30">
          <div className="overflow-hidden rounded-md relative w-full h-96 flex items-center justify-center">
            <Image
              src={blueTemplateImage}
              alt="Convite de Casamento Floral - Modelo Azul"

              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-3">
              <MapPin className="w-8 h-8 text-[#08265E]" />
            </div>
            <p className="text-sm font-semibold text-gray-700">Localização interativa</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-3">
              <MessageCircle className="w-8 h-8 text-[#08265E]" />
            </div>
            <p className="text-sm font-semibold text-gray-700">Confirmação via WhatsApp</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-3">
              <Music className="w-8 h-8 text-[#08265E]" />
            </div>
            <p className="text-sm font-semibold text-gray-700">Música de fundo</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-3">
              <Zap className="w-8 h-8 text-[#08265E]" />
            </div>
            <p className="text-sm font-semibold text-gray-700">Acesso imediato ao convite</p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="max-w-4xl mx-auto px-4 mb-12 text-center">
        <BlueTemplateDialog>
          <Button
            className="bg-[#08265E] hover:bg-[#061B44] text-white text-lg px-10 py-7 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold whitespace-nowrap"
          >
            Criar meu convite de casamento
          </Button>
        </BlueTemplateDialog>
      </div>

      {/* Product Information */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-[#08265E]/10">
          {/* Digital Product Badge */}
          <div className="inline-block bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-6">
            Produto Digital
          </div>

          {/* Product Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Edite e Compartilhe sua Alegria
          </h2>

          {/* Product Description */}
          <div className="prose prose-lg max-w-none mb-8 text-gray-700">
            <p>
              Anuncie o seu grande dia com um toque de romance e arte! Este convite de casamento digital apresenta um
              lindo design em tons de azul e florais sutis. Personalize tudo online de forma rápida e fácil.
              Adicione os nomes dos noivos, a data, o horário e inclua a sua foto exclusiva do casal.
            </p>
            <p className="mt-4">
              Você também pode adicionar música de fundo, localização interativa no mapa e a confirmação via WhatsApp diretamente pelo número que escolher.
            </p>
          </div>

          {/* Pricing Section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Pagamento Único • Sem assinaturas</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-[#08265E]">R$30,90</span>
                </div>

                {/* Payment Methods */}
                <div className="mt-4 flex items-center gap-3 flex-wrap">
                  <CreditCard className="w-6 h-6 text-gray-400" />
                  Cartão de Crédito e PIX
                </div>
              </div>

              <BlueTemplateDialog>
                <Button
                  className="bg-[#08265E] hover:bg-[#061B44] text-white text-lg px-10 py-7 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold whitespace-nowrap"
                >
                  Criar Convite
                </Button>
              </BlueTemplateDialog>
            </div>
          </div>

          {/* Creator Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#08265E] to-[#1a4da6] rounded-full flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <div>
                <p className="font-semibold text-gray-900">Criado por Casarme</p>
                <p className="text-sm text-gray-600">Modelos Exclusivos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
