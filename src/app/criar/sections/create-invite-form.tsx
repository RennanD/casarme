"use client"

import type React from "react"
import { Check } from "lucide-react"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Upload, Sparkles, X } from "lucide-react"
import { useImageUpload } from "@/src/hooks/use-image-upload"
import { getImageUrl } from "@/src/lib/image-url"

const templates = [
  {
    id: "garden",
    name: "Garden",
    plan: "basic",
    price: "R$ 25,90",
    color: "#8B9D7F",
    description: "Design botânico com tons de verde oliva",
    features: [
      "Design botânico elegante",
      "1 foto de capa",
      "Localização no mapa",
    ],
  },
  {
    id: "romantic",
    name: "Romântico",
    plan: "pro",
    price: "R$ 39,90",
    color: "#E8B4B8",
    description: "Estilo romântico com flores e tons rosados",
    features: [
      "Design romântico com flores",
      "Fotos individuais + galeria",
      "História do casal",
      "Música de fundo",
      "Countdown + localização",
    ],
  },
  {
    id: "modern",
    name: "Modern",
    plan: "pro",
    price: "R$ 39,90",
    color: "#1A1A2E",
    description: "Design moderno e minimalista com slideshow",
    features: [
      "Design moderno sofisticado",
      "Slideshow com múltiplas fotos",
      "Fotos individuais + galeria",
      "História do casal",
      "Música de fundo",
    ],
  },
]

interface CreateInviteFormProps {
  onEmailSubmit: (email: string, formData: any) => void
  selectedTemplateId?: string | null
}

export default function CreateInviteForm({ onEmailSubmit, selectedTemplateId }: CreateInviteFormProps) {
  // Find the selected template or default to first one
  const getInitialTemplate = () => {
    if (selectedTemplateId) {
      const template = templates.find(t => t.id === selectedTemplateId)
      return template || templates[0]
    }
    return templates[0]
  }

  const [selectedTemplate, setSelectedTemplate] = useState(getInitialTemplate())
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

  // Image states
  const [heroImage, setHeroImage] = useState<any>(null)
  const [groomImage, setGroomImage] = useState<any>(null)
  const [brideImage, setBrideImage] = useState<any>(null)
  const [heroImages, setHeroImages] = useState<any[]>([])
  const [galleryImages, setGalleryImages] = useState<any[]>([])

  const { uploadImage, isUploading, error, clearError } = useImageUpload()

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    console.log('📸 Image upload triggered:', { type, files: e.target.files?.length })

    const file = e.target.files?.[0]
    if (!file) {
      console.log('❌ No file selected')
      return
    }

    console.log('📁 File selected:', {
      name: file.name,
      size: file.size,
      type: file.type
    })

    const result = await uploadImage(file, type)
    console.log('📤 Upload result:', result)

    if (result) {
      console.log('✅ Upload successful, updating state for type:', type)
      switch (type) {
        case 'hero':
          setHeroImage(result)
          break
        case 'groom':
          setGroomImage(result)
          break
        case 'bride':
          setBrideImage(result)
          break
        case 'hero_slideshow':
          setHeroImages(prev => [...prev, result])
          break
        case 'gallery':
          setGalleryImages(prev => [...prev, result])
          break
      }
    } else {
      console.log('❌ Upload failed, no result returned')
    }
  }

  const handleMultipleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    console.log('📸 Multiple image upload triggered:', { type, files: e.target.files?.length })

    const files = Array.from(e.target.files || [])
    console.log('📁 Files selected:', files.map(f => ({ name: f.name, size: f.size, type: f.type })))

    for (const file of files) {
      console.log('📤 Uploading file:', file.name)
      const result = await uploadImage(file, type)
      console.log('📤 Upload result for', file.name, ':', result)

      if (result) {
        console.log('✅ Upload successful for', file.name, ', updating state')
        if (type === 'hero_slideshow') {
          setHeroImages(prev => [...prev, result])
        } else if (type === 'gallery') {
          setGalleryImages(prev => [...prev, result])
        }
      } else {
        console.log('❌ Upload failed for', file.name)
      }
    }
  }

  const removeImage = (index: number, type: 'hero_slideshow' | 'gallery') => {
    if (type === 'hero_slideshow') {
      setHeroImages(prev => prev.filter((_, i) => i !== index))
    } else {
      setGalleryImages(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEmailSubmit("", {
      selectedTemplate,
      formData,
      images: {
        hero: heroImage,
        groom: groomImage,
        bride: brideImage,
        heroSlideshow: heroImages,
        gallery: galleryImages
      }
    })
  }

  const isPro = selectedTemplate.plan === "pro"
  const isModern = selectedTemplate.id === "modern"

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#3E3E3E] mb-4">
          Crie seu Convite Interativo
        </h1>
        <p className="text-[#6B6B6B] text-lg">Preencha os dados abaixo e veja a mágica acontecer</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

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
                  className={`border-4 rounded-lg p-6 transition-all ${selectedTemplate.id === template.id
                    ? "border-[#D4A373] shadow-xl scale-[1.02]"
                    : "border-transparent hover:border-[#EDE0D4]"
                    }`}
                >
                  <div className="w-full h-32 rounded-lg mb-4" style={{ backgroundColor: template.color }} />
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif font-semibold text-[#3E3E3E] text-lg">{template.name}</h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${template.plan === "pro" ? "bg-[#D4A373] text-white" : "bg-[#8B9D7F] text-white"
                        }`}
                    >
                      {template.plan === "pro" ? "Pro" : "Básico"}
                    </span>
                  </div>
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-[#D4A373]">{template.price}</span>
                  </div>
                  <p className="text-sm text-[#6B6B6B] mb-3">{template.description}</p>
                  <ul className="space-y-1.5">
                    {template.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#6B6B6B]">
                        <Check className="w-3 h-3 text-[#D4A373] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
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

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="text-red-600">❌</div>
                  <div className="text-red-800 text-sm">
                    <strong>Erro no upload:</strong> {error}
                  </div>
                  <button
                    onClick={clearError}
                    className="ml-auto text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
            <div className="space-y-4">
              {/* Loading Indicator */}
              {isUploading && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-blue-800 text-sm">Enviando imagem...</span>
                </div>
              )}

              <label htmlFor="heroPhotos" className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 border-2 border-[#D4A373] text-[#D4A373] rounded-lg hover:bg-[#D4A373] hover:text-white transition-colors w-fit">
                  <Upload className="w-5 h-5" />
                  <span>
                    {isUploading ? "Enviando..." : (isModern ? "Adicionar fotos" : "Escolher foto")}
                  </span>
                </div>
                <input
                  id="heroPhotos"
                  type="file"
                  accept="image/*"
                  multiple={isModern}
                  onChange={(e) => isModern ? handleMultipleImageUpload(e, 'hero_slideshow') : handleImageUpload(e, 'hero')}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>

              {isModern && heroImages.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {heroImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={getImageUrl(image.filename)}
                        alt={`Hero ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-[#EDE0D4]"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index, 'hero_slideshow')}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {!isModern && heroImage && (
                <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-[#EDE0D4]">
                  <img
                    src={getImageUrl(heroImage.filename)}
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
                        <span>{isUploading ? "Enviando..." : "Escolher"}</span>
                      </div>
                      <input
                        id="groomPhoto"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'groom')}
                        className="hidden"
                        disabled={isUploading}
                      />
                    </label>
                    {groomImage && (
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#EDE0D4]">
                        <img
                          src={getImageUrl(groomImage.filename)}
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
                        <span>{isUploading ? "Enviando..." : "Escolher"}</span>
                      </div>
                      <input
                        id="bridePhoto"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'bride')}
                        className="hidden"
                        disabled={isUploading}
                      />
                    </label>
                    {brideImage && (
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#EDE0D4]">
                        <img
                          src={getImageUrl(brideImage.filename)}
                          alt="Preview Noiva"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
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
                    <span>{isUploading ? "Enviando..." : "Adicionar fotos"}</span>
                  </div>
                  <input
                    id="galleryPhotos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleMultipleImageUpload(e, 'gallery')}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>

                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {galleryImages.slice(0, 6).map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={getImageUrl(image.filename)}
                          alt={`Galeria ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-[#EDE0D4]"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index, 'gallery')}
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
  )
}
