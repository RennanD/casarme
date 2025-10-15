"use client"

import { CheckCircle, Mail, ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4A373] hover:text-[#C49363] mb-8">
          <ArrowLeft className="w-5 h-5" />
          Voltar para home
        </Link>

        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-[#D4A373] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#3E3E3E] mb-4">
              Convite Criado com Sucesso!
            </h1>
            <p className="text-[#6B6B6B] text-lg">
              Seu convite interativo foi criado e enviado para o seu e-mail
            </p>
          </div>

          <Card className="p-8 bg-white border-none shadow-lg mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-[#D4A373]" />
              <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E]">
                O que acontece agora?
              </h2>
            </div>

            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#D4A373] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-semibold">1</span>
                </div>
                <div>
                  <p className="text-[#3E3E3E] font-medium">Verifique seu e-mail</p>
                  <p className="text-[#6B6B6B] text-sm">
                    Enviamos o link do seu convite interativo para o e-mail informado
                  </p>
                  <p className="text-[#D4A373] text-sm font-medium mt-1">
                    ⚠️ Importante: Verifique também sua caixa de spam/lixo eletrônico
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#D4A373] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-semibold">2</span>
                </div>
                <div>
                  <p className="text-[#3E3E3E] font-medium">Compartilhe com os convidados</p>
                  <p className="text-[#6B6B6B] text-sm">
                    Envie o link para seus familiares e amigos
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#D4A373] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-semibold">3</span>
                </div>
                <div>
                  <p className="text-[#3E3E3E] font-medium">Acompanhe as confirmações</p>
                  <p className="text-[#6B6B6B] text-sm">
                    Veja quem confirmou presença diretamente no seu convite
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-yellow-50 border-yellow-200 border-2 mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Mail className="w-5 h-5 text-yellow-600" />
              <h3 className="font-serif text-xl font-semibold text-yellow-800">
                Não recebeu o e-mail?
              </h3>
            </div>
            <div className="text-yellow-700 text-sm space-y-2">
              <p>• Verifique sua <strong>caixa de spam</strong> ou lixo eletrônico</p>
              <p>• Procure por e-mails de <strong>noreply@casarme.com.br</strong></p>
              <p>• Adicione nosso e-mail aos seus contatos para evitar filtros</p>
              <p>• O e-mail pode demorar alguns minutos para chegar</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-[#D4A373] to-[#C49363] text-white border-none shadow-lg mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="w-5 h-5" />
              <h3 className="font-serif text-xl font-semibold">
                Dica Especial
              </h3>
            </div>
            <p className="text-sm opacity-90">
              Seu convite ficará disponível por tempo ilimitado. Você pode acessá-lo a qualquer momento
              através do link enviado por e-mail.
            </p>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#D4A373] text-white hover:bg-[#C49363] px-8 py-3">
              <Link href="/">
                Criar Outro Convite
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-white px-8 py-3">
              <Link href="/">
                Ver Templates
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
