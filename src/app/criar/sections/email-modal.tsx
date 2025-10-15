"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Card } from "@/src/components/ui/card"
import { X, Mail } from "lucide-react"

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
  formData: any // Pass the form data
}

export default function EmailModal({ isOpen, onClose, onSubmit, formData }: EmailModalProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    try {
      // Primeiro, criar o convite inativo
      const createResponse = await fetch('/api/invitations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData.formData,
          template: formData.selectedTemplate.id,
          email,
          images: formData.images,
          isActive: false // Convite inativo
        })
      })

      if (!createResponse.ok) {
        throw new Error('Erro ao criar convite')
      }

      const { invitationId } = await createResponse.json()

      // Depois, criar sessão de checkout
      const checkoutResponse = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: formData.selectedTemplate.id,
          customerEmail: email,
          invitationId // ID do convite criado
        })
      })

      const data = await checkoutResponse.json()

      if (!checkoutResponse.ok) {
        throw new Error(data.error || 'Erro ao processar pagamento')
      }

      // Redirecionar para o Stripe Checkout
      window.location.href = data.url
    } catch (error) {
      console.error('Erro no processo:', error)
      alert(error instanceof Error ? error.message : 'Erro ao processar solicitação')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white border-none shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D4A373] rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-serif text-xl font-semibold text-[#3E3E3E]">
                Quase lá!
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-[#6B6B6B] hover:text-[#3E3E3E] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-[#6B6B6B] mb-6">
            Para finalizar a criação do seu convite, precisamos do seu e-mail.
            Você será redirecionado para o pagamento e receberá o link do seu convite por email após a confirmação.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label htmlFor="email" className="text-[#3E3E3E] mb-2 block">
                Seu e-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="border-[#EDE0D4]"
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-[#EDE0D4] text-[#6B6B6B] hover:bg-[#FAF3E0]"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !email}
                className="flex-1 bg-[#D4A373] text-white hover:bg-[#C49363] disabled:opacity-50"
              >
                {isLoading ? "Processando..." : "Pagar e Criar Convite"}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
