"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload, Sparkles, X } from "lucide-react"
import Link from "next/link"

const templates = [
  {
    id: "garden",
    name: "Garden",
    plan: "basic",
    color: "#8B9D7F",
    description: "Design botânico com tons de verde oliva",
  },
  {
    id: "romantic",
    name: "Romântico",
    plan: "pro",
    color: "#E8B4B8",
    description: "Estilo romântico com flores e tons rosados",
  },
  {
    id: "modern",
    name: "Modern",
    plan: "pro",
    color: "#1A1A2E",
    description: "Design moderno e minimalista com slideshow",
  },
]

export default function CreateInvitationPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [formData, setFormData] = useState({
    groomName: "",
    brideName: "",
    weddingDate: "",
    weddingTime: "",
    venueName: "",
    venueAddress: "",
    welcomeMessage: "",
    coupleStory: "",
    groomStory: "",
    brideStory: "",
    musicUrl: "",
  })

  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [groomPhotoPreview, setGroomPhotoPreview] = useState<string | null>(null)
  const [bridePhotoPreview, setBridePhotoPreview] = useState<string | null>(null)
  const [heroPhotos, setHeroPhotos] = useState<(string | null)[]>([])
  const [galleryPhotos, setGalleryPhotos] = useState<(string | null)[]>([])

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

  const handleHeroPhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setHeroPhotos((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleGalleryPhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setGalleryPhotos((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeHeroPhoto = (index: number) => {
    setHeroPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const removeGalleryPhoto = (index: number) => {
    setGalleryPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Generate a unique ID for the invitation
    const invitationId = Math.random().toString(36).substring(2, 9)
    // Redirect to the preview page
    window.location.href = `/convite/${invitationId}?preview=true&template=${selectedTemplate.id}`
  }

  const isPro = selectedTemplate.plan === "pro"
  const isModern = selectedTemplate.id === "modern"

  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4A373] hover:text-[#C49363] mb-8">
          <ArrowLeft className="w-5 h-5" />
          Voltar para home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#3E3E3E] mb-4">
              Crie seu Convite Interativo
            </h1>
            <p className="text-[#6B6B6B] text-lg">Preencha os dados abaixo e veja a mágica acontecer</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Template Selection */}
            <Card className="p-8 bg-white border-none shadow-lg mb-8">
              <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-6">Escolha seu Template</h2>

              <div className="grid md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <label key={template.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="template"
                      value={template.id}
                      checked={selectedTemplate.id === template.id}
                      onChange={() => setSelectedTemplate(template)}
                      className="sr-only"
                    />
                    <div
                      className={`border-4 rounded-lg p-6 transition-all ${
                        selectedTemplate.id === template.id
                          ? "border-[#D4A373] shadow-xl scale-[1.02]"
                          : "border-transparent hover:border-[#EDE0D4]"
                      }`}
                    >
                      <div className="w-full h-32 rounded-lg mb-4" style={{ backgroundColor: template.color }} />
                      <h3 className="font-serif font-semibold text-[#3E3E3E] text-lg mb-2">{template.name}</h3>
                      <p className="text-sm text-[#6B6B6B] mb-2">{template.description}</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          template.plan === "pro" ? "bg-[#D4A373] text-white" : "bg-[#EDE0D4] text-[#6B6B6B]"
                        }`}
                      >
                        {template.plan === "pro" ? "Plano Pro" : "Plano Básico"}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </Card>

            {/* Basic Info */}
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

              {/* Hero Photos */}
              <div className="mb-6">
                <Label className="text-[#3E3E3E] mb-2 block">
                  {isModern ? "Fotos da Capa (Slideshow)" : "Foto da Capa"}
                </Label>
                <p className="text-sm text-[#6B6B6B] mb-3">
                  {isModern
                    ? "Adicione múltiplas fotos para criar um slideshow na capa"
                    : "Esta foto aparecerá na seção principal do convite"}
                </p>
                <div className="space-y-4">
                  <label htmlFor="heroPhotos" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 border-2 border-[#D4A373] text-[#D4A373] rounded-lg hover:bg-[#D4A373] hover:text-white transition-colors w-fit">
                      <Upload className="w-5 h-5" />
                      <span>{isModern ? "Adicionar fotos" : "Escolher foto"}</span>
                    </div>
                    <input
                      id="heroPhotos"
                      type="file"
                      accept="image/*"
                      multiple={isModern}
                      onChange={isModern ? handleHeroPhotosUpload : handlePhotoUpload}
                      className="hidden"
                    />
                  </label>

                  {isModern && heroPhotos.length > 0 && (
                    <div className="grid grid-cols-4 gap-4">
                      {heroPhotos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={photo || "/placeholder.svg"}
                            alt={`Hero ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border-2 border-[#EDE0D4]"
                          />
                          <button
                            type="button"
                            onClick={() => removeHeroPhoto(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {!isModern && photoPreview && (
                    <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-[#EDE0D4]">
                      <img
                        src={photoPreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Date and Venue */}
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

            {/* Messages */}
            <Card className="p-8 bg-white border-none shadow-lg mb-8">
              <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-6">Mensagens</h2>

              <div className="mb-6">
                <Label htmlFor="welcomeMessage" className="text-[#3E3E3E] mb-2 block">
                  Mensagem de Boas-vindas
                </Label>
                <Textarea
                  id="welcomeMessage"
                  value={formData.welcomeMessage}
                  onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
                  placeholder="Criamos esse site para compartilhar com vocês os detalhes da organização do nosso casamento..."
                  rows={4}
                  required
                  className="border-[#EDE0D4]"
                />
              </div>

              <div>
                <Label htmlFor="coupleStory" className="text-[#3E3E3E] mb-2 block">
                  História do Casal
                </Label>
                <Textarea
                  id="coupleStory"
                  value={formData.coupleStory}
                  onChange={(e) => setFormData({ ...formData, coupleStory: e.target.value })}
                  placeholder="Nossa história começou em 2017..."
                  rows={6}
                  required
                  className="border-[#EDE0D4]"
                />
              </div>
            </Card>

            {/* Pro Features */}
            {isPro && (
              <>
                <Card className="p-8 bg-white border-none shadow-lg mb-8">
                  <div className="flex items-center gap-2 mb-6">
                    <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E]">Recursos Pro</h2>
                    <span className="px-3 py-1 bg-[#D4A373] text-white text-xs font-semibold rounded-full">PRO</span>
                  </div>

                  {/* Individual Photos and Stories */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="groomPhoto" className="text-[#3E3E3E] mb-2 block">
                        Foto do Noivo
                      </Label>
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

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="groomStory" className="text-[#3E3E3E] mb-2 block">
                        História do Noivo (Opcional)
                      </Label>
                      <Textarea
                        id="groomStory"
                        value={formData.groomStory}
                        onChange={(e) => setFormData({ ...formData, groomStory: e.target.value })}
                        placeholder="Conte um pouco sobre o noivo..."
                        rows={4}
                        className="border-[#EDE0D4]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="brideStory" className="text-[#3E3E3E] mb-2 block">
                        História da Noiva (Opcional)
                      </Label>
                      <Textarea
                        id="brideStory"
                        value={formData.brideStory}
                        onChange={(e) => setFormData({ ...formData, brideStory: e.target.value })}
                        placeholder="Conte um pouco sobre a noiva..."
                        rows={4}
                        className="border-[#EDE0D4]"
                      />
                    </div>
                  </div>

                  {/* Gallery Photos */}
                  <div className="mb-6">
                    <Label className="text-[#3E3E3E] mb-2 block">Galeria de Fotos (Opcional)</Label>
                    <p className="text-sm text-[#6B6B6B] mb-3">
                      Adicione até 6 fotos para criar uma galeria na seção do casal
                    </p>
                    <label htmlFor="galleryPhotos" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 border-2 border-[#D4A373] text-[#D4A373] rounded-lg hover:bg-[#D4A373] hover:text-white transition-colors w-fit">
                        <Upload className="w-5 h-5" />
                        <span>Adicionar fotos</span>
                      </div>
                      <input
                        id="galleryPhotos"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryPhotosUpload}
                        className="hidden"
                      />
                    </label>

                    {galleryPhotos.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {galleryPhotos.slice(0, 6).map((photo, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={photo || "/placeholder.svg"}
                              alt={`Galeria ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border-2 border-[#EDE0D4]"
                            />
                            <button
                              type="button"
                              onClick={() => removeGalleryPhoto(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Music */}
                  <div>
                    <Label htmlFor="musicUrl" className="text-[#3E3E3E] mb-2 block">
                      Música de Fundo (YouTube)
                    </Label>
                    <p className="text-sm text-[#6B6B6B] mb-3">
                      Cole o link de um vídeo do YouTube para adicionar música ao convite
                    </p>
                    <Input
                      id="musicUrl"
                      value={formData.musicUrl}
                      onChange={(e) => setFormData({ ...formData, musicUrl: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="border-[#EDE0D4]"
                    />
                  </div>
                </Card>
              </>
            )}

            <div className="flex justify-center">
              <Button type="submit" size="lg" className="bg-[#D4A373] text-white hover:bg-[#C49363] px-12 py-6 text-lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Criar Convite Interativo
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
