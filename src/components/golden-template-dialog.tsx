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
import { Loader2 } from "lucide-react"

interface GoldenInviteFormData {
  email: string
  brideName: string
  groomName: string
  weddingDate: string
  weddingTime: string
  venueAddress: string
  whatsapp: string
  musicUrl?: string
}

export function GoldenTemplateDialog({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<GoldenInviteFormData>({
    email: "",
    brideName: "",
    groomName: "",
    weddingDate: "",
    weddingTime: "",
    venueAddress: "",
    whatsapp: "",
    musicUrl: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
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
          template: "golden",
          isActive: false,
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
          <DialogTitle className="text-2xl">Criar Convite de Casamento Dourado</DialogTitle>
          <DialogDescription>
            Preencha as informações do seu casamento para criar o convite personalizado.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
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
              Enviaremos o link do convite para este e-mail após o pagamento
            </p>
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
              Endereço do Local <span className="text-red-500">*</span>
            </Label>
            <Input
              id="venueAddress"
              name="venueAddress"
              type="text"
              placeholder="Rua Exemplo, 123 - Bairro, Cidade - UF"
              value={formData.venueAddress}
              onChange={handleChange}
              required
            />
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <Label htmlFor="whatsapp">
              WhatsApp (com DDD) <span className="text-red-500">*</span>
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
              Será usado para os convidados confirmarem presença
            </p>
          </div>

          {/* Música (Opcional) */}
          <div className="space-y-2">
            <Label htmlFor="musicUrl">
              URL da Música de Fundo (opcional)
            </Label>
            <Input
              id="musicUrl"
              name="musicUrl"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={formData.musicUrl}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500">
              Cole o link do YouTube da música que deseja tocar no convite
            </p>
          </div>

          {/* Botão de Submit */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#D4A373] hover:bg-[#C49363]"
              disabled={isLoading}
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

export const GoldenTemplateDialogTrigger = DialogTrigger
