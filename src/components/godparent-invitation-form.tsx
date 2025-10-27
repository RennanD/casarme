"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Heart, Download, Share2 } from "lucide-react"

const templates = [
  {
    id: "eucalyptus",
    name: "Eucalipto",
    preview:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/31dc819f381d9303bfa7e53f64925ddb-g6nLcWQ2LvStp4t109or0rYlKXIC4C.jpg",
  },
  {
    id: "floral-romantic",
    name: "Floral Romântico",
    preview:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1ce4bfb402e16bed44acf1626f78f5c5-VmYgAOzvpr3jr6EFKBQQD19mHkUUJ8.jpg",
  },
]

const defaultMessages = {
  eucalyptus:
    "Sophia e Augusto\n\nO nosso dia está chegando e junto com ele a certeza de que ao nosso lado estarão pessoas mais que especiais, que marcam a nossa história de alguma forma, seja com boas risadas ou grandes aprendizados. São essas pessoas que queremos sempre ao nosso lado, fazendo parte da nossa história. E queremos vocês ao nosso lado nesse dia tão especial.\n\nACEITAM SER NOSSOS PADRINHOS?\n\nAlicia e Bruno\n08.08.2022",
  "floral-romantic":
    "Jessica e João\n\nSabemos que Deus faz tudo perfeito e para Ele há um tempo determinado para todas as coisas. Por isso, somos gratos a Ele por todos os acontecimentos em nossas vidas e mais ainda por nos permitir ter pessoas especiais como vocês fazendo parte da nossa história.\n\nAceitam ser nossos Padrinhos?\n\n16.03.2019",
}

export function GodparentInvitationForm() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [message, setMessage] = useState(defaultMessages["eucalyptus"])
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

    if (selectedTemplate.id === "eucalyptus") {
      return (
        <div
          className="relative w-full aspect-[3/4] bg-white rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden"
          style={{
            boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
            background: "linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)",
          }}
        >
          {/* Paper texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Eucalyptus watercolor leaves at top */}
          <div className="absolute top-0 left-0 w-full h-48 opacity-70">
            <svg viewBox="0 0 400 180" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <defs>
                <filter id="watercolor-eucalyptus">
                  <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" />
                  <feColorMatrix values="0 0 0 0 0.4 0 0 0 0 0.5 0 0 0 0 0.45 0 0 0 0.3 0" />
                </filter>
                <linearGradient id="leaf-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6B8E7F" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#8BA888" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#A8C5A0" stopOpacity="0.25" />
                </linearGradient>
              </defs>

              {/* Eucalyptus branches cascading from top */}
              <g opacity="0.6">
                {/* Left branch */}
                <ellipse cx="80" cy="30" rx="25" ry="12" fill="url(#leaf-gradient)" transform="rotate(-25 80 30)" />
                <ellipse cx="95" cy="50" rx="28" ry="14" fill="url(#leaf-gradient)" transform="rotate(-20 95 50)" />
                <ellipse cx="75" cy="70" rx="22" ry="11" fill="url(#leaf-gradient)" transform="rotate(-30 75 70)" />
                <ellipse cx="90" cy="90" rx="26" ry="13" fill="url(#leaf-gradient)" transform="rotate(-15 90 90)" />
                <ellipse cx="70" cy="110" rx="24" ry="12" fill="url(#leaf-gradient)" transform="rotate(-25 70 110)" />

                {/* Center-left branch */}
                <ellipse cx="150" cy="20" rx="30" ry="15" fill="url(#leaf-gradient)" transform="rotate(-10 150 20)" />
                <ellipse cx="140" cy="45" rx="26" ry="13" fill="url(#leaf-gradient)" transform="rotate(-15 140 45)" />
                <ellipse cx="155" cy="70" rx="28" ry="14" fill="url(#leaf-gradient)" transform="rotate(-5 155 70)" />
                <ellipse cx="145" cy="95" rx="25" ry="12" fill="url(#leaf-gradient)" transform="rotate(-12 145 95)" />

                {/* Center branch */}
                <ellipse cx="200" cy="25" rx="32" ry="16" fill="url(#leaf-gradient)" transform="rotate(0 200 25)" />
                <ellipse cx="195" cy="55" rx="29" ry="14" fill="url(#leaf-gradient)" transform="rotate(-5 195 55)" />
                <ellipse cx="205" cy="85" rx="27" ry="13" fill="url(#leaf-gradient)" transform="rotate(5 205 85)" />
                <ellipse cx="200" cy="115" rx="30" ry="15" fill="url(#leaf-gradient)" transform="rotate(0 200 115)" />

                {/* Center-right branch */}
                <ellipse cx="250" cy="20" rx="30" ry="15" fill="url(#leaf-gradient)" transform="rotate(10 250 20)" />
                <ellipse cx="260" cy="45" rx="26" ry="13" fill="url(#leaf-gradient)" transform="rotate(15 260 45)" />
                <ellipse cx="245" cy="70" rx="28" ry="14" fill="url(#leaf-gradient)" transform="rotate(5 245 70)" />
                <ellipse cx="255" cy="95" rx="25" ry="12" fill="url(#leaf-gradient)" transform="rotate(12 255 95)" />

                {/* Right branch */}
                <ellipse cx="320" cy="30" rx="25" ry="12" fill="url(#leaf-gradient)" transform="rotate(25 320 30)" />
                <ellipse cx="305" cy="50" rx="28" ry="14" fill="url(#leaf-gradient)" transform="rotate(20 305 50)" />
                <ellipse cx="325" cy="70" rx="22" ry="11" fill="url(#leaf-gradient)" transform="rotate(30 325 70)" />
                <ellipse cx="310" cy="90" rx="26" ry="13" fill="url(#leaf-gradient)" transform="rotate(15 310 90)" />
                <ellipse cx="330" cy="110" rx="24" ry="12" fill="url(#leaf-gradient)" transform="rotate(25 330 110)" />
              </g>

              {/* Stems */}
              <path
                d="M 80,20 Q 85,60 70,120"
                stroke="#6B8E7F"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
                strokeLinecap="round"
              />
              <path
                d="M 150,15 Q 145,55 145,100"
                stroke="#6B8E7F"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
                strokeLinecap="round"
              />
              <path
                d="M 200,20 Q 200,60 200,120"
                stroke="#6B8E7F"
                strokeWidth="2.5"
                fill="none"
                opacity="0.35"
                strokeLinecap="round"
              />
              <path
                d="M 250,15 Q 255,55 255,100"
                stroke="#6B8E7F"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
                strokeLinecap="round"
              />
              <path
                d="M 320,20 Q 315,60 330,120"
                stroke="#6B8E7F"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Content - dynamically render message lines */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-12 text-center">
            <div className="space-y-3 max-w-md">
              {lines.map((line, index) => {
                if (!line.trim()) return <div key={index} className="h-2" />

                // First line - couple names in elegant script
                if (index === 0) {
                  return (
                    <h2 key={index} className="font-serif text-4xl text-[#6B8E7F] italic mb-4">
                      {line}
                    </h2>
                  )
                }

                // "ACEITAM SER NOSSOS PADRINHOS?" in bold
                if (line.includes("ACEITAM") || line.includes("PADRINHOS?")) {
                  return (
                    <p key={index} className="font-serif text-xl font-bold text-[#3E3E3E] tracking-wide mt-6 mb-4">
                      {line}
                    </p>
                  )
                }

                // Godparent names in script
                if (index === lines.length - 2) {
                  return (
                    <p key={index} className="font-serif text-2xl text-[#6B8E7F] italic mt-4">
                      {line}
                    </p>
                  )
                }

                // Date
                if (index === lines.length - 1) {
                  return (
                    <p key={index} className="font-serif text-base text-[#3E3E3E]">
                      {line}
                    </p>
                  )
                }

                // Body text
                return (
                  <p key={index} className="font-serif text-sm leading-relaxed text-[#3E3E3E]">
                    {line}
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

    if (selectedTemplate.id === "floral-romantic") {
      return (
        <div
          className="relative w-full aspect-[3/4] bg-white rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden"
          style={{
            boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
            background: "linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)",
          }}
        >
          {/* Paper texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Floral wreath at top with couple names */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-48">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <filter id="watercolor-floral">
                  <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" />
                  <feColorMatrix values="0 0 0 0 0.7 0 0 0 0 0.4 0 0 0 0 0.5 0 0 0 0.35 0" />
                </filter>
              </defs>

              {/* Wreath circle */}
              <circle cx="100" cy="100" r="85" fill="none" stroke="#B8869C" strokeWidth="1" opacity="0.2" />

              {/* Roses and flowers around the wreath */}
              <g opacity="0.6">
                {/* Top flowers */}
                <ellipse
                  cx="100"
                  cy="20"
                  rx="15"
                  ry="18"
                  fill="#C97B9E"
                  opacity="0.5"
                  filter="url(#watercolor-floral)"
                />
                <ellipse
                  cx="85"
                  cy="25"
                  rx="12"
                  ry="14"
                  fill="#D89BB0"
                  opacity="0.4"
                  filter="url(#watercolor-floral)"
                />
                <ellipse
                  cx="115"
                  cy="25"
                  rx="12"
                  ry="14"
                  fill="#D89BB0"
                  opacity="0.4"
                  filter="url(#watercolor-floral)"
                />

                {/* Right side flowers */}
                <ellipse
                  cx="170"
                  cy="70"
                  rx="16"
                  ry="19"
                  fill="#C97B9E"
                  opacity="0.5"
                  filter="url(#watercolor-floral)"
                  transform="rotate(30 170 70)"
                />
                <ellipse
                  cx="180"
                  cy="100"
                  rx="14"
                  ry="16"
                  fill="#D89BB0"
                  opacity="0.4"
                  filter="url(#watercolor-floral)"
                  transform="rotate(45 180 100)"
                />

                {/* Bottom flowers */}
                <ellipse
                  cx="100"
                  cy="180"
                  rx="15"
                  ry="18"
                  fill="#C97B9E"
                  opacity="0.5"
                  filter="url(#watercolor-floral)"
                />
                <ellipse
                  cx="85"
                  cy="175"
                  rx="12"
                  ry="14"
                  fill="#D89BB0"
                  opacity="0.4"
                  filter="url(#watercolor-floral)"
                />
                <ellipse
                  cx="115"
                  cy="175"
                  rx="12"
                  ry="14"
                  fill="#D89BB0"
                  opacity="0.4"
                  filter="url(#watercolor-floral)"
                />

                {/* Left side flowers */}
                <ellipse
                  cx="30"
                  cy="70"
                  rx="16"
                  ry="19"
                  fill="#C97B9E"
                  opacity="0.5"
                  filter="url(#watercolor-floral)"
                  transform="rotate(-30 30 70)"
                />
                <ellipse
                  cx="20"
                  cy="100"
                  rx="14"
                  ry="16"
                  fill="#D89BB0"
                  opacity="0.4"
                  filter="url(#watercolor-floral)"
                  transform="rotate(-45 20 100)"
                />

                {/* Additional small flowers */}
                <ellipse
                  cx="130"
                  cy="40"
                  rx="8"
                  ry="10"
                  fill="#E5B3C5"
                  opacity="0.35"
                  filter="url(#watercolor-floral)"
                />
                <ellipse
                  cx="70"
                  cy="40"
                  rx="8"
                  ry="10"
                  fill="#E5B3C5"
                  opacity="0.35"
                  filter="url(#watercolor-floral)"
                />
                <ellipse
                  cx="150"
                  cy="130"
                  rx="8"
                  ry="10"
                  fill="#E5B3C5"
                  opacity="0.35"
                  filter="url(#watercolor-floral)"
                />
                <ellipse
                  cx="50"
                  cy="130"
                  rx="8"
                  ry="10"
                  fill="#E5B3C5"
                  opacity="0.35"
                  filter="url(#watercolor-floral)"
                />
              </g>
            </svg>

            {/* Couple names in center of wreath */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-serif text-3xl text-[#C97B9E] italic text-center leading-tight">
                {lines[0] || "Jessica\ne João"}
              </p>
            </div>
          </div>

          {/* Bottom left corner flowers */}
          <div className="absolute bottom-0 left-0 w-32 h-32 opacity-60">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <ellipse cx="30" cy="90" rx="20" ry="24" fill="#C97B9E" opacity="0.5" filter="url(#watercolor-floral)" />
              <ellipse cx="50" cy="95" rx="16" ry="19" fill="#D89BB0" opacity="0.4" filter="url(#watercolor-floral)" />
              <ellipse
                cx="25"
                cy="105"
                rx="14"
                ry="17"
                fill="#E5B3C5"
                opacity="0.35"
                filter="url(#watercolor-floral)"
              />
              <ellipse cx="45" cy="110" rx="12" ry="14" fill="#D89BB0" opacity="0.4" filter="url(#watercolor-floral)" />
            </svg>
          </div>

          {/* Bottom right corner flowers */}
          <div className="absolute bottom-0 right-0 w-32 h-32 opacity-60 scale-x-[-1]">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <ellipse cx="30" cy="90" rx="20" ry="24" fill="#C97B9E" opacity="0.5" filter="url(#watercolor-floral)" />
              <ellipse cx="50" cy="95" rx="16" ry="19" fill="#D89BB0" opacity="0.4" filter="url(#watercolor-floral)" />
              <ellipse
                cx="25"
                cy="105"
                rx="14"
                ry="17"
                fill="#E5B3C5"
                opacity="0.35"
                filter="url(#watercolor-floral)"
              />
              <ellipse cx="45" cy="110" rx="12" ry="14" fill="#D89BB0" opacity="0.4" filter="url(#watercolor-floral)" />
            </svg>
          </div>

          {/* Content - dynamically render message lines with handwritten style */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 pt-56 pb-12 text-center">
            <div className="space-y-3 max-w-md">
              {lines.slice(1).map((line, index) => {
                if (!line.trim()) return <div key={index} className="h-2" />

                // "Aceitam ser nossos Padrinhos?" in bold script
                if (line.includes("Aceitam") || line.includes("Padrinhos")) {
                  return (
                    <p key={index} className="font-serif text-2xl font-bold text-[#3E3E3E] italic mt-6 mb-4">
                      {line}
                    </p>
                  )
                }

                // Date
                if (line.match(/\d{2}\.\d{2}\.\d{4}/)) {
                  return (
                    <p key={index} className="font-serif text-base text-[#3E3E3E] mt-4">
                      {line}
                    </p>
                  )
                }

                // Body text in handwritten style
                return (
                  <p key={index} className="text-sm leading-relaxed text-[#3E3E3E]" style={{ fontFamily: "cursive" }}>
                    {line}
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

    return null
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
                    className={`p-3 rounded-xl border-2 transition-all flex items-center gap-4 ${
                      selectedTemplate.id === template.id
                        ? "border-[#D4A373] bg-[#D4A373]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={template.preview || "/placeholder.svg"}
                      alt={template.name}
                      className="w-20 h-28 object-cover rounded-lg shadow-md"
                    />
                    <p className="text-base font-medium text-[#3E3E3E]">{template.name}</p>
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
                placeholder="Escreva uma mensagem especial..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={12}
                className="text-base resize-none font-serif"
              />
              <p className="text-sm text-[#3E3E3E]/60 mt-2">
                Personalize a mensagem com os nomes, data e detalhes. As alterações aparecem em tempo real no preview.
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
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 min-h-[600px] flex items-center justify-center">
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
