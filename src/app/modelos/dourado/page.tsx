import { GoldenTemplate } from "@/src/components/templates/golden-template/golden-template"
import { Button } from "@/components/ui/button"
import { MapPin, MessageCircle, Music, Zap, CreditCard } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import goldenTemplateImage from "@/src/assets/dourado-thumb.png"
import { Navbar } from "@/src/components/navbar"
import { GoldenTemplateDialog } from "@/src/components/golden-template-dialog"


export const metadata = {
  title: "Convite de Casamento Aquarela Casal - Modelo Dourado | Casarme",
  description: "Crie um convite de casamento único com esta arte em aquarela. Edite facilmente online e envie para seus convidados por redes sociais ou imprima.",
}



export default function GoldenTemplatePage() {
  return (
    <div className="bg-[#FAF3E0]/20">

      <header>
        <Navbar />
      </header>

      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 pt-32 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Convite de Casamento Dourado, digital e interativo
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Crie um convite de casamento único com este design moderno. Personalize online e envie para
          seus convidados por redes sociais ou imprima.
        </p>
      </div>

      {/* Template Preview */}
      <div className="max-w-lg mx-auto px-4 mb-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-hidden rounded-md">
            <Image
              src={goldenTemplateImage}
              alt="Convite de Casamento Aquarela Casal - Modelo Dourado"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-3">
              <MapPin className="w-8 h-8 text-[#D4A373]" />
            </div>
            <p className="text-sm font-semibold text-gray-700">Localização interativa</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-3">
              <MessageCircle className="w-8 h-8 text-[#D4A373]" />
            </div>
            <p className="text-sm font-semibold text-gray-700">Confirmação via WhatsApp</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-3">
              <Music className="w-8 h-8 text-[#D4A373]" />
            </div>
            <p className="text-sm font-semibold text-gray-700">Música de fundo</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-3">
              <Zap className="w-8 h-8 text-[#D4A373]" />
            </div>
            <p className="text-sm font-semibold text-gray-700">Acesso imediato ao convite</p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="max-w-4xl mx-auto px-4 mb-12 text-center">
        <GoldenTemplateDialog>
          <Button
            className="bg-[#D4A373] hover:bg-[#C49363] text-white text-lg px-10 py-7 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold whitespace-nowrap"
          >
            Criar meu convite de casamento
          </Button>
        </GoldenTemplateDialog>
      </div>

      {/* Product Information */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Digital Product Badge */}
          <div className="inline-block bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-6">
            Produto Digital
          </div>

          {/* Product Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Edite e Baixe Milhares de Artes Prontas
          </h2>

          {/* Product Description */}
          <div className="prose prose-lg max-w-none mb-8 text-gray-700">
            <p>
              Anuncie o seu grande dia com um toque de romance e arte! Este convite de casamento digital apresenta um
              lindo design em dourado. Personalize tudo online de forma rápida e fácil.
              Adicione os nomes dos noivos, a data, o horário e o local da cerimônia.
            </p>
            <p className="mt-4">
              Você também pode adicionar música de fundo, localização interativa e confirmação via WhatsApp.
            </p>
          </div>

          {/* Pricing Section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Pagamento Único • Sem assinaturas</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">R$25,90</span>
                </div>

                {/* Payment Methods */}
                <div className="mt-4 flex items-center gap-3 flex-wrap">
                  <CreditCard className="w-6 h-6 text-gray-400" />
                  Cartão de Crédito e PIX
                </div>
              </div>

              <GoldenTemplateDialog>
                <Button
                  className="bg-[#D4A373] hover:bg-[#C49363] text-white text-lg px-10 py-7 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold whitespace-nowrap"
                >
                  Criar Convite
                </Button>
              </GoldenTemplateDialog>
            </div>
          </div>

          {/* Creator Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4A373] to-[#947644] rounded-full flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <div>
                <p className="font-semibold text-gray-900">Criado por Casarme</p>
                <p className="text-sm text-gray-600">+1.000 vendas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
