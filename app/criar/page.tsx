"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload, Sparkles } from "lucide-react"
import Link from "next/link"
import { TemplatePreview } from "@/components/template-preview"
import { InvitationLivePreview } from "@/components/invitation-live-preview"

const templates = [
  { id: "garden", name: "Garden", color: "#8B9D7F" },
  { id: "romantico", name: "Romântico", color: "#E8B4B8" },
  { id: "blacktie", name: "Black Tie", color: "#2C3E50" },
  { id: "minimalista", name: "Minimalista", color: "#9B8B7E" },
]

export default function CreateInvitationPage() {
  const [formData, setFormData] = useState({
    groomName: "",
    brideName: "",
    weddingDate: "",
    weddingTime: "",
    venueName: "",
    venueAddress: "",
    welcomeMessage: "",
    coupleStory: "",
    template: "garden",
  })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [groomPhotoPreview, setGroomPhotoPreview] = useState<string | null>(null)
  const [bridePhotoPreview, setBridePhotoPreview] = useState<string | null>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGroomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setGroomPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBridePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBridePhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Generate a unique ID for the invitation
    const invitationId = Math.random().toString(36).substring(2, 9)
    // Redirect to the preview page
    window.location.href = `/convite/${invitationId}?preview=true`
  }

  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4A373] hover:text-[#C49363] mb-8">
          <ArrowLeft className="w-5 h-5" />
          Voltar para home
        </Link>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#3E3E3E] mb-4">
              Crie seu Convite Interativo
            </h1>
            <p className="text-[#6B6B6B] text-lg">Preencha os dados abaixo e veja a mágica acontecer</p>
          </div>

          <div className="grid lg:grid-cols-[1fr,400px] gap-8">
            <div>
              <form onSubmit={handleSubmit}>
                <Card className="p-8 bg-white border-none shadow-lg mb-8">
                  <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-6">Escolha seu Template</h2>
                  <p className="text-[#6B6B6B] mb-6">
                    Selecione o estilo que mais combina com o seu casamento. Cada template tem seu próprio design e
                    paleta de cores.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {templates.map((template) => (
                      <label key={template.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="template"
                          value={template.id}
                          checked={formData.template === template.id}
                          onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                          className="sr-only"
                        />
                        <div
                          className={`border-4 rounded-lg overflow-hidden transition-all ${
                            formData.template === template.id
                              ? "border-[#D4A373] shadow-xl scale-[1.02]"
                              : "border-transparent hover:border-[#EDE0D4]"
                          }`}
                        >
                          <TemplatePreview
                            variant={template.id as "garden" | "romantico" | "blacktie" | "minimalista"}
                          />
                          <div className="p-4 bg-[#FAF3E0] text-center">
                            <span className="font-serif font-semibold text-[#3E3E3E] text-lg">{template.name}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </Card>

                <Card className="p-8 bg-white border-none shadow-lg mb-8">
                  <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-6">Dados do Casal</h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="groomName" className="text-[#3E3E3E] mb-2 block">
                        Nome do Noivo
                      </Label>
                      <Input
                        id="groomName"
                        value={formData.groomName}
                        onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                        placeholder="João Silva"
                        required
                        className="border-[#EDE0D4]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="brideName" className="text-[#3E3E3E] mb-2 block">
                        Nome da Noiva
                      </Label>
                      <Input
                        id="brideName"
                        value={formData.brideName}
                        onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                        placeholder="Maria Santos"
                        required
                        className="border-[#EDE0D4]"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="photo" className="text-[#3E3E3E] mb-2 block">
                      Foto do Casal (Hero)
                    </Label>
                    <p className="text-sm text-[#6B6B6B] mb-3">Esta foto aparecerá na seção principal do convite</p>
                    <div className="flex items-center gap-4">
                      <label htmlFor="photo" className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 border-2 border-[#D4A373] text-[#D4A373] rounded-lg hover:bg-[#D4A373] hover:text-white transition-colors">
                          <Upload className="w-5 h-5" />
                          <span>Escolher foto</span>
                        </div>
                        <input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                      {photoPreview && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-[#EDE0D4]">
                          <img
                            src={photoPreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="groomPhoto" className="text-[#3E3E3E] mb-2 block">
                        Foto do Noivo
                      </Label>
                      <p className="text-sm text-[#6B6B6B] mb-3">Para a seção "O Casal"</p>
                      <div className="flex items-center gap-4">
                        <label htmlFor="groomPhoto" className="cursor-pointer">
                          <div className="flex items-center gap-2 px-4 py-2 border-2 border-[#D4A373] text-[#D4A373] rounded-lg hover:bg-[#D4A373] hover:text-white transition-colors text-sm">
                            <Upload className="w-4 h-4" />
                            <span>Escolher</span>
                          </div>
                          <input
                            id="groomPhoto"
                            type="file"
                            accept="image/*"
                            onChange={handleGroomPhotoUpload}
                            className="hidden"
                          />
                        </label>
                        {groomPhotoPreview && (
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#EDE0D4]">
                            <img
                              src={groomPhotoPreview || "/placeholder.svg"}
                              alt="Preview Noivo"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bridePhoto" className="text-[#3E3E3E] mb-2 block">
                        Foto da Noiva
                      </Label>
                      <p className="text-sm text-[#6B6B6B] mb-3">Para a seção "O Casal"</p>
                      <div className="flex items-center gap-4">
                        <label htmlFor="bridePhoto" className="cursor-pointer">
                          <div className="flex items-center gap-2 px-4 py-2 border-2 border-[#D4A373] text-[#D4A373] rounded-lg hover:bg-[#D4A373] hover:text-white transition-colors text-sm">
                            <Upload className="w-4 h-4" />
                            <span>Escolher</span>
                          </div>
                          <input
                            id="bridePhoto"
                            type="file"
                            accept="image/*"
                            onChange={handleBridePhotoUpload}
                            className="hidden"
                          />
                        </label>
                        {bridePhotoPreview && (
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#EDE0D4]">
                            <img
                              src={bridePhotoPreview || "/placeholder.svg"}
                              alt="Preview Noiva"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 bg-white border-none shadow-lg mb-8">
                  <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-6">Data e Local</h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="weddingDate" className="text-[#3E3E3E] mb-2 block">
                        Data do Casamento
                      </Label>
                      <Input
                        id="weddingDate"
                        type="date"
                        value={formData.weddingDate}
                        onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                        required
                        className="border-[#EDE0D4]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weddingTime" className="text-[#3E3E3E] mb-2 block">
                        Horário
                      </Label>
                      <Input
                        id="weddingTime"
                        type="time"
                        value={formData.weddingTime}
                        onChange={(e) => setFormData({ ...formData, weddingTime: e.target.value })}
                        required
                        className="border-[#EDE0D4]"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="venueName" className="text-[#3E3E3E] mb-2 block">
                      Nome do Local
                    </Label>
                    <Input
                      id="venueName"
                      value={formData.venueName}
                      onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                      placeholder="Espaço Jardim das Flores"
                      required
                      className="border-[#EDE0D4]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="venueAddress" className="text-[#3E3E3E] mb-2 block">
                      Endereço Completo
                    </Label>
                    <Input
                      id="venueAddress"
                      value={formData.venueAddress}
                      onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                      placeholder="Rua das Flores, 123 - Centro, São Paulo - SP"
                      required
                      className="border-[#EDE0D4]"
                    />
                  </div>
                </Card>

                <Card className="p-8 bg-white border-none shadow-lg mb-8">
                  <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-6">Mensagens Personalizadas</h2>

                  <div className="mb-6">
                    <Label htmlFor="welcomeMessage" className="text-[#3E3E3E] mb-2 block">
                      Mensagem de Boas-vindas
                    </Label>
                    <p className="text-sm text-[#6B6B6B] mb-3">
                      Esta mensagem aparecerá logo após o countdown, dando as boas-vindas aos convidados
                    </p>
                    <Textarea
                      id="welcomeMessage"
                      value={formData.welcomeMessage}
                      onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
                      placeholder="Criamos esse site para compartilhar com vocês os detalhes da organização do nosso casamento. Estamos muito felizes e contamos com a presença de todos no nosso grande dia!"
                      rows={4}
                      required
                      className="border-[#EDE0D4]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="coupleStory" className="text-[#3E3E3E] mb-2 block">
                      História do Casal
                    </Label>
                    <p className="text-sm text-[#6B6B6B] mb-3">
                      Conte a história de vocês! Como se conheceram, momentos especiais, etc.
                    </p>
                    <Textarea
                      id="coupleStory"
                      value={formData.coupleStory}
                      onChange={(e) => setFormData({ ...formData, coupleStory: e.target.value })}
                      placeholder="Nossa história começou em 2017, no Jardim Botânico, em um dia comum que se tornou inesquecível..."
                      rows={6}
                      required
                      className="border-[#EDE0D4]"
                    />
                  </div>
                </Card>

                <div className="flex justify-center lg:justify-start">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-[#D4A373] text-white hover:bg-[#C49363] px-12 py-6 text-lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Criar Convite Interativo
                  </Button>
                </div>
              </form>
            </div>

            <div className="lg:sticky lg:top-8 lg:self-start">
              <div className="mb-4">
                <h3 className="font-serif text-xl font-semibold text-[#3E3E3E] mb-2">Preview do Convite</h3>
                <p className="text-sm text-[#6B6B6B]">Veja como seu convite está ficando em tempo real</p>
              </div>
              <InvitationLivePreview
                variant={formData.template as "garden" | "romantico" | "blacktie" | "minimalista"}
                data={formData}
                photoPreview={photoPreview}
                groomPhotoPreview={groomPhotoPreview}
                bridePhotoPreview={bridePhotoPreview}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
