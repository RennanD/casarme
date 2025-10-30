"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Textarea } from "@/src/components/ui/textarea"
import { Label } from "@/src/components/ui/label"
import { Input } from "@/src/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Heart, Download, Share2 } from "lucide-react"

const templates = [
  {
    id: "garden",
    name: "Garden",
    preview: "/godparent/garden.jpg",
  },
  {
    id: "romantic",
    name: "Romântico",
    preview: "/godparent/romantic.jpg",
  },
  {
    id: "blue",
    name: "Azul",
    preview: "/godparent/blue.jpg",
  },
]

const defaultMessages = {
  garden:
    "Sophia e Augusto\n\nO nosso dia está chegando e junto com ele a certeza de que ao nosso lado estarão pessoas mais que especiais, que marcam a nossa história de alguma forma, seja com boas risadas ou grandes aprendizados. São essas pessoas que queremos sempre ao nosso lado, fazendo parte da nossa história.\n\nACEITAM SER NOSSOS PADRINHOS?\n\nAlicia e Bruno\n08.08.2022",
  romantic:
    "Jessica e João\n\nSabemos que Deus faz tudo perfeito e para Ele há um tempo determinado para todas as coisas. Por isso, somos gratos a Ele por todos os acontecimentos em nossas vidas e mais ainda por nos permitir ter pessoas especiais como vocês fazendo parte da nossa história.\n\nAceitam ser nossos Padrinhos?\n\n16.03.2019",
  blue:
    "Marina e Pedro\n\nQueremos celebrar este momento com quem sempre esteve ao nosso lado, torcendo por nós e nos apoiando em cada etapa.\n\nACEITAM SER NOSSOS PADRINHOS?\n\nCamila e Renato\n22.11.2025",
}

export function GodparentInvitationForm() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [message, setMessage] = useState(defaultMessages.garden)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [email, setEmail] = useState("")

  const handleTemplateChange = (template: (typeof templates)[0]) => {
    setSelectedTemplate(template)
    setMessage(defaultMessages[template.id as keyof typeof defaultMessages])
  }

  const handleCreate = () => {
    if (!message.trim()) {
      alert("Por favor, preencha a mensagem")
      return
    }
    setShowEmailModal(true)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email submitted:", email)
    alert("Convite criado com sucesso! Em breve você receberá o link por email.")
    setShowEmailModal(false)
  }

  const renderPreview = () => {
    const lines = message.split("\n")

    // Image background templates from public/godparent
    return (
      <div
        className="relative w-full aspect-[3/4] rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden"
        style={{
          backgroundImage: `url(${selectedTemplate.preview})`,
          backgroundSize: "115% auto",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-10 text-center">
          <div className="space-y-2 max-w-sm mx-auto">
            {lines.map((line, index) => {
              if (!line.trim()) return <div key={index} className="h-2" />

              if (index === 0) {
                return (
                  <h2 key={index} className="font-script text-5xl text-[#2F2F2F] italic tracking-wide mb-3">
                    {line}
                  </h2>
                )
              }

              if (line.toLowerCase().includes("padrinh")) {
                return (
                  <p key={index} className="font-script text-3xl text-[#2F2F2F] tracking-wide mt-5 mb-2">
                    {line}
                  </p>
                )
              }

              if (index === lines.length - 2) {
                return (
                  <p key={index} className="font-script text-3xl text-[#2F2F2F] italic mt-3">
                    {line}
                  </p>
                )
              }

              if (index === lines.length - 1) {
                return (
                  <p key={index} className="font-script text-base text-[#444444]">
                    {line}
                  </p>
                )
              }

              return (
                <p key={index} className="font-script text-base leading-relaxed text-[#2F2F2F]">
                  {line}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    )
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
              <div className="grid grid-cols-1 gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateChange(template)}
                    className={`p-4 rounded-lg border-2 transition-all ${selectedTemplate.id === template.id
                      ? "border-[#D4A373] bg-[#D4A373]/10"
                      : "border-gray-200 hover:border-[#D4A373]/50"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={template.preview}
                        alt={template.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="text-left">
                        <h3 className="font-semibold text-[#3E3E3E]">{template.name}</h3>
                        <p className="text-sm text-[#6B6B6B]">Clique para visualizar</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <Label htmlFor="message" className="text-base font-semibold text-[#3E3E3E] mb-2 block">
                Mensagem Personalizada
              </Label>
              <Textarea
                id="message"
                placeholder="Digite sua mensagem personalizada..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[200px] text-base"
              />
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
                <h3 className="font-semibold text-lg text-[#3E3E3E]">Preview em Tempo Real</h3>
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
              <div className="bg-gradient-to-br font-serif from-gray-50 to-gray-100 rounded-xl min-h-[600px] flex items-center justify-center">
                {renderPreview()}
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
              Digite seu email para receber o link do convite e poder compartilhar com seus padrinhos.
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
