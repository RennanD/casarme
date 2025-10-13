"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Share2, Edit, Eye, Copy, Check } from "lucide-react"
import { toast } from "sonner"
import InvitationView from "./invitation-view"

interface Invitation {
  id: string
  slug: string
  groomName: string
  brideName: string
  weddingDate: string
  weddingTime: string
  venueName: string
  venueAddress: string
  welcomeMessage: string
  coupleStory: string
  groomStory?: string
  brideStory?: string
  musicUrl?: string
  template: string
  email: string
  images: Array<{
    id: string
    filename: string
    originalName: string
    width: number
    height: number
    size: number
    type: string
  }>
}

export default function InvitationPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const mode = searchParams.get('mode')
  const [invitation, setInvitation] = useState<Invitation | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const response = await fetch(`/api/invitations/${slug}`)
        if (response.ok) {
          const data = await response.json()
          setInvitation(data.invitation)
        } else {
          toast.error("Convite não encontrado")
        }
      } catch (error) {
        console.error("Error fetching invitation:", error)
        toast.error("Erro ao carregar convite")
      } finally {
        setLoading(false)
      }
    }

    fetchInvitation()
  }, [slug])

  const copyToClipboard = async () => {
    const url = `${window.location.origin}/convite/${slug}/view`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success("Link copiado para a área de transferência!")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("Erro ao copiar link")
    }
  }

  const shareInvitation = async () => {
    const url = `${window.location.origin}/convite/${slug}/view`
    const text = `Você está convidado para o casamento de ${invitation?.groomName} & ${invitation?.brideName}!`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Convite de Casamento - ${invitation?.groomName} & ${invitation?.brideName}`,
          text,
          url
        })
      } catch (error) {
        console.log("Share cancelled")
      }
    } else {
      copyToClipboard()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF3E0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4A373] mx-auto mb-4"></div>
          <p className="text-[#6B6B6B]">Carregando convite...</p>
        </div>
      </div>
    )
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-[#FAF3E0] flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-[#3E3E3E] mb-4">Convite não encontrado</h1>
          <p className="text-[#6B6B6B] mb-6">O convite que você está procurando não existe ou foi removido.</p>
          <Button asChild className="bg-[#D4A373] text-white hover:bg-[#C49363]">
            <a href="/">Voltar para home</a>
          </Button>
        </Card>
      </div>
    )
  }

  // Se não for modo owner, mostrar a visualização pública
  if (mode !== 'owner') {
    return <InvitationView invitation={invitation} />
  }

  // Se for modo owner, mostrar o painel de controle
  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Card className="p-6 bg-white border-none shadow-lg mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-2xl font-bold text-[#3E3E3E] mb-2">
                  Seu Convite Interativo
                </h1>
                <p className="text-[#6B6B6B]">
                  {invitation.groomName} & {invitation.brideName}
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={shareInvitation}
                  className="border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
                <Button
                  variant="outline"
                  onClick={copyToClipboard}
                  className="border-[#8B9D7F] text-[#8B9D7F] hover:bg-[#8B9D7F] hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar Link
                    </>
                  )}
                </Button>
                <Button
                  asChild
                  className="bg-[#D4A373] text-white hover:bg-[#C49363]"
                >
                  <a href={`/convite/${slug}`} target="_blank" rel="noopener noreferrer">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Convite
                  </a>
                </Button>
              </div>
            </div>
          </Card>

          {/* Invitation Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white border-none shadow-lg">
              <h2 className="font-serif text-xl font-semibold text-[#3E3E3E] mb-4">
                Informações do Casamento
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-[#3E3E3E]">Casal:</span>
                  <p className="text-[#6B6B6B]">{invitation.groomName} & {invitation.brideName}</p>
                </div>
                <div>
                  <span className="font-medium text-[#3E3E3E]">Data:</span>
                  <p className="text-[#6B6B6B]">
                    {new Date(invitation.weddingDate).toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-[#3E3E3E]">Horário:</span>
                  <p className="text-[#6B6B6B]">{invitation.weddingTime}</p>
                </div>
                <div>
                  <span className="font-medium text-[#3E3E3E]">Local:</span>
                  <p className="text-[#6B6B6B]">{invitation.venueName}</p>
                  <p className="text-[#6B6B6B] text-sm">{invitation.venueAddress}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border-none shadow-lg">
              <h2 className="font-serif text-xl font-semibold text-[#3E3E3E] mb-4">
                Configurações do Convite
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-[#3E3E3E]">Template:</span>
                  <p className="text-[#6B6B6B] capitalize">{invitation.template}</p>
                </div>
                <div>
                  <span className="font-medium text-[#3E3E3E]">E-mail:</span>
                  <p className="text-[#6B6B6B]">{invitation.email}</p>
                </div>
                <div>
                  <span className="font-medium text-[#3E3E3E]">Fotos:</span>
                  <p className="text-[#6B6B6B]">{invitation.images.length} foto(s) adicionada(s)</p>
                </div>
                {invitation.musicUrl && (
                  <div>
                    <span className="font-medium text-[#3E3E3E]">Música:</span>
                    <p className="text-[#6B6B6B]">Configurada</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Preview Link */}
          <Card className="p-6 bg-white border-none shadow-lg mt-6">
            <h2 className="font-serif text-xl font-semibold text-[#3E3E3E] mb-4">
              Link do Convite
            </h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={`${window.location.origin}/convite/${slug}/view`}
                readOnly
                className="flex-1 px-3 py-2 border border-[#EDE0D4] rounded-lg bg-[#FAF3E0] text-[#6B6B6B]"
              />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-white"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-sm text-[#6B6B6B] mt-2">
              Compartilhe este link com seus convidados para que eles possam ver o convite.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
