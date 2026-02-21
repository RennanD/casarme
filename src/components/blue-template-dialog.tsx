"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload } from "lucide-react"
import { useImageUpload } from "@/src/hooks/use-image-upload"
import { getImageUrl } from "@/src/lib/image-url"

interface BlueInviteFormData {
  // Dados do Convite
  brideName: string
  groomName: string
  weddingDate: string
  weddingTime: string
  venueAddress: string
  whatsapp: string
  musicUrl?: string
  // Dados de Cobrança
  email: string
  cpf: string
}

export function BlueTemplateDialog({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<BlueInviteFormData>({
    brideName: "",
    groomName: "",
    weddingDate: "",
    weddingTime: "",
    venueAddress: "",
    whatsapp: "",
    musicUrl: "",
    email: "",
    cpf: "",
  })
  const [termsAccepted, setTermsAccepted] = useState(true)

  // Image states
  const [heroImage, setHeroImage] = useState<any>(null)
  const { uploadImage, isUploading, error, clearError } = useImageUpload()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Formatar CPF automaticamente
    if (name === 'cpf') {
      const numbers = value.replace(/\D/g, '')
      let formatted = numbers

      if (numbers.length <= 11) {
        formatted = numbers
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      }

      setFormData(prev => ({ ...prev, [name]: formatted }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    const result = await uploadImage(file, type)
    if (result) {
      setHeroImage(result)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Salvar dados de cobrança no localStorage para usar no pagamento
      localStorage.setItem('user_cpf', formData.cpf)
      localStorage.setItem('user_email', formData.email)

      // Combinar data e hora
      const weddingDateTime = `${formData.weddingDate}T${formData.weddingTime}:00`

      const response = await fetch("/api/invitations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          brideName: formData.brideName,
          groomName: formData.groomName,
          weddingDate: weddingDateTime,
          weddingTime: formData.weddingTime,
          venueName: "Local da Cerimônia",
          venueAddress: formData.venueAddress,
          welcomeMessage: "Você está convidado para o nosso casamento!",
          whatsapp: formData.whatsapp,
          musicUrl: formData.musicUrl || undefined,
          template: "blue",
          isActive: false,
          cpf: formData.cpf,
          images: {
            hero: heroImage
          }
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao criar convite")
      }

      const data = await response.json()

      // Redirecionar para página de preview/pagamento
      router.push(`/convite/preview/${data.invitationId}`)
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao criar convite. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#08265E]">Criar Convite de Casamento Azul</DialogTitle>
          <DialogDescription>
            Preencha as informações do seu casamento para criar o convite personalizado.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Seção 1: Dados do Convite */}
          <div className="space-y-4">
            <div className="border-b pb-2">
              <h3 className="text-lg font-semibold text-gray-900">Dados do Convite</h3>
              <p className="text-sm text-gray-600">Informações sobre o casamento</p>
            </div>

            {/* Nomes dos Noivos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brideName">
                  Nome da Noiva <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="brideName"
                  name="brideName"
                  type="text"
                  placeholder="Maria"
                  value={formData.brideName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="groomName">
                  Nome do Noivo <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="groomName"
                  name="groomName"
                  type="text"
                  placeholder="João"
                  value={formData.groomName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Foto da Capa */}
            <div className="space-y-2">
              <Label className="block">
                Foto de Capa <span className="text-red-500">*</span>
              </Label>
              <p className="text-xs text-gray-500 mb-2">
                Aparecerá visível no cabeçalho do convite (Recomendado proporção vertical ou quadrada).
              </p>

              {error && (
                <div className="mb-2 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                  {error}
                  <button type="button" onClick={clearError} className="ml-2 underline">Limpar</button>
                </div>
              )}

              <div className="flex items-center gap-4">
                <label htmlFor="heroPhoto" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#08265E] text-[#08265E] rounded-lg hover:bg-blue-50 transition-colors bg-white">
                    {isUploading ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-6 h-6 animate-spin mb-2" />
                        <span className="text-sm">Enviando...</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">Escolher foto</span>
                      </>
                    )}
                  </div>
                  <input
                    id="heroPhoto"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'hero')}
                    className="hidden"
                    disabled={isUploading}
                    required={!heroImage} // Required on initial fill only at least one time
                  />
                </label>

                {heroImage && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                    <img
                      src={getImageUrl(heroImage.filename)}
                      alt="Preview Capa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Data e Hora */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weddingDate">
                  Data do Casamento <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="weddingDate"
                  name="weddingDate"
                  type="date"
                  value={formData.weddingDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weddingTime">
                  Horário <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="weddingTime"
                  name="weddingTime"
                  type="time"
                  value={formData.weddingTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Endereço */}
            <div className="space-y-2">
              <Label htmlFor="venueAddress">
                Endereço da Cerimônia / Recepção <span className="text-red-500">*</span>
              </Label>
              <Input
                id="venueAddress"
                name="venueAddress"
                type="text"
                placeholder="Ex e.g. Rua das Flores, 120"
                value={formData.venueAddress}
                onChange={handleChange}
                required
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-2">
              <Label htmlFor="whatsapp">
                WhatsApp p/ Confirmação (com DDD) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                placeholder="11999999999"
                value={formData.whatsapp}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-gray-500">
                Os convidados enviarão mensagem para este número confirmando presença
              </p>
            </div>

            {/* Música (Opcional) */}
            <div className="space-y-2">
              <Label htmlFor="musicUrl">
                URL da Música de Fundo do YouTube (opcional)
              </Label>
              <Input
                id="musicUrl"
                name="musicUrl"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={formData.musicUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Seção 2: Dados de Cobrança */}
          <div className="space-y-4">
            <div className="border-b pb-2">
              <h3 className="text-lg font-semibold text-gray-900">Dados de Cobrança</h3>
              <p className="text-sm text-gray-600">Informações para processamento do pagamento</p>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                E-mail <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-gray-500">
                Enviaremos o link final do convite para este e-mail após o pagamento
              </p>
            </div>

            {/* CPF */}
            <div className="space-y-2">
              <Label htmlFor="cpf">
                CPF <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cpf"
                name="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleChange}
                maxLength={14}
                required
              />
              <p className="text-xs text-gray-500">
                Apenas para a cobrança e emissão da nota fiscal
              </p>
            </div>

            {/* Termos de Uso */}
            <div className="flex items-start space-x-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#08265E] focus:ring-[#08265E]"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Concordo com os <a href="#" className="underline text-[#08265E]">Termos de Uso</a> e <a href="#" className="underline text-[#08265E]">Política de Privacidade</a>.
              </label>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading || isUploading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#08265E] hover:bg-[#071f4b] text-white"
              disabled={isLoading || isUploading || !heroImage}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando...
                </>
              ) : (
                "Criar Convite"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
