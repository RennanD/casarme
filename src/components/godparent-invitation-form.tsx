"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Label } from "@/src/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Heart, Sparkles, Download, Share2 } from "lucide-react"

const templates = [
  {
    id: "elegant",
    name: "Elegante",
    colors: {
      bg: "bg-gradient-to-br from-[#FAF3E0] to-[#F5E6D3]",
      accent: "text-[#D4A373]",
      border: "border-[#D4A373]",
    },
  },
  {
    id: "romantic",
    name: "Romântico",
    colors: {
      bg: "bg-gradient-to-br from-[#FFF5F7] to-[#FFE5EC]",
      accent: "text-[#E8B4BC]",
      border: "border-[#E8B4BC]",
    },
  },
  {
    id: "modern",
    name: "Moderno",
    colors: {
      bg: "bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF]",
      accent: "text-[#6C757D]",
      border: "border-[#6C757D]",
    },
  },
  {
    id: "floral",
    name: "Floral",
    colors: {
      bg: "bg-gradient-to-br from-[#F0F8F0] to-[#E8F5E8]",
      accent: "text-[#7CB342]",
      border: "border-[#7CB342]",
    },
  },
]

const defaultMessages = {
  elegant:
    "Querido(a) [Nome],\n\nSeria uma honra ter você ao nosso lado como padrinho/madrinha no dia mais especial das nossas vidas. Sua presença e apoio significam muito para nós.\n\nCom carinho,\n[Seus nomes]",
  romantic:
    "Querido(a) [Nome],\n\nVocê é uma pessoa muito especial em nossas vidas e não poderíamos imaginar nosso casamento sem você ao nosso lado. Aceita ser nosso padrinho/madrinha?\n\nCom todo amor,\n[Seus nomes]",
  modern:
    "[Nome],\n\nQueremos você com a gente nesse momento tão importante! Aceita ser nosso padrinho/madrinha de casamento?\n\nContamos com você!\n[Seus nomes]",
  floral:
    "Querido(a) [Nome],\n\nComo uma flor que embeleza um jardim, você embeleza nossas vidas. Seria uma alegria ter você como padrinho/madrinha no nosso casamento.\n\nCom carinho,\n[Seus nomes]",
}

export function GodparentInvitationForm() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [godparentName, setGodparentName] = useState("")
  const [message, setMessage] = useState(defaultMessages.elegant)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [email, setEmail] = useState("")

  const handleTemplateChange = (template: (typeof templates)[0]) => {
    setSelectedTemplate(template)
    setMessage(defaultMessages[template.id as keyof typeof defaultMessages])
  }

  const handleCreate = () => {
    if (!godparentName.trim() || !message.trim()) {
      alert("Por favor, preencha o nome e a mensagem")
      return
    }
    setShowEmailModal(true)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would send the email to your backend
    console.log("Email submitted:", email)
    alert("Convite criado com sucesso! Em breve você receberá o link por email.")
    setShowEmailModal(false)
  }

  return (
    <section className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-serif text-2xl md:text-3xl text-[#3E3E3E] mb-6">Crie Seu Convite</h2>

            {/* Template Selection */}
            <div className="mb-6">
              <Label className="text-base font-semibold text-[#3E3E3E] mb-3 block">Escolha o Modelo</Label>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateChange(template)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedTemplate.id === template.id
                        ? `${template.colors.border} bg-opacity-10`
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className={`w-full h-20 rounded-lg ${template.colors.bg} mb-2`} />
                    <p className="text-sm font-medium text-[#3E3E3E]">{template.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Godparent Name */}
            <div className="mb-6">
              <Label htmlFor="godparent-name" className="text-base font-semibold text-[#3E3E3E] mb-2 block">
                Nome do Padrinho/Madrinha
              </Label>
              <Input
                id="godparent-name"
                placeholder="Ex: Maria Silva"
                value={godparentName}
                onChange={(e) => setGodparentName(e.target.value)}
                className="text-base"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <Label htmlFor="message" className="text-base font-semibold text-[#3E3E3E] mb-2 block">
                Mensagem Personalizada
              </Label>
              <Textarea
                id="message"
                placeholder="Escreva uma mensagem especial..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                className="text-base resize-none"
              />
              <p className="text-sm text-[#3E3E3E]/60 mt-2">
                Dica: Use [Nome] para personalizar automaticamente com o nome do padrinho/madrinha
              </p>
            </div>

            {/* Create Button */}
            <Button
              onClick={handleCreate}
              size="lg"
              className="w-full bg-[#D4A373] hover:bg-[#C4935F] text-white font-semibold text-lg"
            >
              <Heart className="w-5 h-5 mr-2" />
              Criar Convite
            </Button>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-[#3E3E3E]">Preview</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Invitation Preview */}
              <div
                className={`${selectedTemplate.colors.bg} rounded-xl p-8 min-h-[500px] flex flex-col items-center justify-center text-center relative overflow-hidden`}
              >
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4">
                  <Heart className={`w-6 h-6 ${selectedTemplate.colors.accent} opacity-20`} />
                </div>
                <div className="absolute top-4 right-4">
                  <Sparkles className={`w-6 h-6 ${selectedTemplate.colors.accent} opacity-20`} />
                </div>
                <div className="absolute bottom-4 left-4">
                  <Sparkles className={`w-6 h-6 ${selectedTemplate.colors.accent} opacity-20`} />
                </div>
                <div className="absolute bottom-4 right-4">
                  <Heart className={`w-6 h-6 ${selectedTemplate.colors.accent} opacity-20`} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <Heart className={`w-12 h-12 ${selectedTemplate.colors.accent} mx-auto mb-6`} />

                  <h3 className={`font-serif text-2xl ${selectedTemplate.colors.accent} mb-6`}>Convite Especial</h3>

                  {godparentName && <p className="text-xl font-semibold text-[#3E3E3E] mb-6">{godparentName}</p>}

                  <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 mb-6">
                    <p className="text-[#3E3E3E] whitespace-pre-line text-left leading-relaxed">
                      {message.replace("[Nome]", godparentName || "[Nome]")}
                    </p>
                  </div>

                  <div className={`w-16 h-1 ${selectedTemplate.colors.bg} mx-auto opacity-50`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Quase lá!</DialogTitle>
            <DialogDescription>
              Digite seu email para receber o link do convite e poder compartilhar com seu padrinho/madrinha.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#D4A373] hover:bg-[#C4935F]">
              Receber Convite
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
