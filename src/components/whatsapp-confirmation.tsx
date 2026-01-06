"use client"

import { MessageCircle, CheckCircle2, Users, Calendar } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"

export function WhatsAppConfirmation() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-[#FAF3E0] to-[#F5E6D3] text-[#3E3E3E]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4A373]/20 rounded-full mb-6">
              <MessageCircle className="w-8 h-8 text-[#D4A373]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#3E3E3E]">
              Confirmação de Presença via WhatsApp
            </h2>
            <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mx-auto">
              Facilite o fechamento do seu buffet e tenha controle total dos convidados confirmados
            </p>
          </div>

          {/* Problem Statement */}
          <div className="bg-white rounded-2xl p-6 md:p-8 mb-8 border border-[#D4A373]/20 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#D4A373]/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-[#D4A373]" />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl mb-3 text-[#3E3E3E]">A Dor Real do Planejamento</h3>
                <p className="text-[#6B6B6B] leading-relaxed text-lg">
                  Você já passou pela dificuldade de fechar o buffet sem saber quantos convidados realmente vão comparecer? 
                  Com a confirmação de presença integrada via WhatsApp, você tem controle total e pode fechar o buffet com 
                  segurança, sabendo exatamente quantas pessoas estarão presentes no seu grande dia.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-[#D4A373]/20 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-[#D4A373]" />
                <h4 className="font-semibold text-lg text-[#3E3E3E]">Controle Total</h4>
              </div>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">
                Receba todas as confirmações diretamente no seu WhatsApp, organizadas e fáceis de contar
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-[#D4A373]/20 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 flex-shrink-0 text-[#D4A373]" />
                <h4 className="font-semibold text-lg text-[#3E3E3E]">Fechamento Seguro</h4>
              </div>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">
                Feche o buffet com confiança, sabendo exatamente quantos convidados confirmaram presença
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-[#D4A373]/20 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 flex-shrink-0 text-[#D4A373]" />
                <h4 className="font-semibold text-lg text-[#3E3E3E]">Simples e Rápido</h4>
              </div>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">
                Seus convidados confirmam com um clique, sem complicação ou necessidade de apps extras
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-[#6B6B6B] mb-6 text-lg">
              Todos os nossos modelos incluem confirmação de presença via WhatsApp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#D4A373] text-white hover:bg-[#C49363] font-semibold text-lg px-8"
              >
                <Link href="/#templates">Ver Modelos</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373]/10 font-semibold text-lg px-8 bg-transparent"
              >
                <Link href="/#templates">Criar Meu Convite</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

