import { notFound } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Eye, Copy, Edit } from "lucide-react"
import { prisma } from "@/src/lib/prisma"
import InvitationView from "./invitation-view"
import { GoldenTemplate } from "@/src/components/templates/golden-template/golden-template"

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
  whatsapp?: string
  template: string
  inviteType: string
  email: string
  isActive: boolean
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

interface PageProps {
  params: { slug: string }
  searchParams: { mode?: string }
}

export default async function InvitationPage({ params, searchParams }: PageProps) {
  const { slug } = params
  const mode = searchParams.mode

  // Buscar convite diretamente do banco
  const invitation = await prisma.invitation.findUnique({
    where: { slug },
    include: {
      images: true
    }
  })

  if (!invitation) {
    notFound()
  }

  // Verificar se o convite está ativo
  if (!invitation.isActive) {
    return (
      <div className="min-h-screen bg-[#FAF3E0] flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-[#3E3E3E] mb-4">Convite em processamento</h1>
          <p className="text-[#6B6B6B] mb-6">
            Seu convite está sendo processado. Você receberá um email assim que estiver pronto!
          </p>
          <Button asChild className="bg-[#D4A373] text-white hover:bg-[#C49363]">
            <a href="/">Voltar para home</a>
          </Button>
        </Card>
      </div>
    )
  }

  // Converter Date para string e null para undefined para compatibilidade
  const formattedInvitation = {
    ...invitation,
    weddingDate: invitation.weddingDate.toISOString(),
    groomStory: invitation.groomStory || undefined,
    brideStory: invitation.brideStory || undefined,
    musicUrl: invitation.musicUrl || undefined,
    whatsapp: invitation.whatsapp || undefined
  }


  console.log(`type`, invitation)

  // Renderizar o modelo correto baseado no tipo
  if (invitation.template === 'golden') {
    return (
      <div>
        <GoldenTemplate
          brideName={invitation.brideName}
          groomName={invitation.groomName}
          date={formattedInvitation.weddingDate}
          address={invitation.venueAddress}
          musicUrl={invitation.musicUrl || undefined}
          whatsappNumber={invitation.whatsapp || ""}
        />
      </div>
    )
  }

  return <InvitationView invitation={formattedInvitation as any} />
}

// Adicionar metadados para SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const invitation = await prisma.invitation.findUnique({
    where: { slug: params.slug },
    select: {
      groomName: true,
      brideName: true,
      weddingDate: true,
      venueName: true,
      welcomeMessage: true
    }
  })

  if (!invitation) {
    return {
      title: 'Convite não encontrado',
      description: 'O convite que você está procurando não existe.'
    }
  }

  const weddingDate = new Date(invitation.weddingDate).toLocaleDateString('pt-BR')

  return {
    title: `Convite de Casamento - ${invitation.groomName} & ${invitation.brideName}`,
    description: `Você está convidado para o casamento de ${invitation.groomName} & ${invitation.brideName} em ${weddingDate} no ${invitation.venueName}. ${invitation.welcomeMessage}`,
    openGraph: {
      title: `Convite de Casamento - ${invitation.groomName} & ${invitation.brideName}`,
      description: `Você está convidado para o casamento de ${invitation.groomName} & ${invitation.brideName} em ${weddingDate} no ${invitation.venueName}.`,
      type: 'website',
    },
  }
}
