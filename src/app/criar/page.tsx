import { Metadata } from "next"
import CreateInvitationClient from "./create-invitation-client"

export const metadata: Metadata = {
  title: "Criar Convite de Casamento - CasarMe",
  description: "Personalize seu convite de casamento único com templates elegantes. Upload de fotos, personalização completa e compartilhamento fácil.",
  keywords: "criar convite de casamento, personalizar convite, template de casamento, convite digital",
  openGraph: {
    title: "Criar Convite de Casamento - CasarMe",
    description: "Personalize seu convite de casamento único com templates elegantes. Upload de fotos, personalização completa e compartilhamento fácil.",
    type: "website",
    url: "https://casarme.com.br/criar",
    siteName: "CasarMe",
    images: [
      {
        url: "/criar/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Criar Convite de Casamento - CasarMe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Criar Convite de Casamento - CasarMe",
    description: "Personalize seu convite de casamento único com templates elegantes. Upload de fotos, personalização completa e compartilhamento fácil.",
    images: ["/criar/opengraph-image"],
  },
}

interface PageProps {
  searchParams: { template?: string }
}

export default function CreatePage({ searchParams }: PageProps) {
  return <CreateInvitationClient selectedTemplateId={searchParams.template} />
}