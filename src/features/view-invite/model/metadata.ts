type InvitationMetadataSource = {
  groomName: string
  brideName: string
  weddingDate: Date
  venueName: string
  welcomeMessage: string
}

export function buildInviteMetadata(invitation: InvitationMetadataSource) {
  const weddingDate = invitation.weddingDate.toLocaleDateString('pt-BR')

  return {
    title: `Convite de Casamento - ${invitation.groomName} & ${invitation.brideName}`,
    description: `Você está convidado para o casamento de ${invitation.groomName} & ${invitation.brideName} em ${weddingDate} no ${invitation.venueName}. ${invitation.welcomeMessage}`,
    openGraph: {
      title: `Convite de Casamento - ${invitation.groomName} & ${invitation.brideName}`,
      description: `Você está convidado para o casamento de ${invitation.groomName} & ${invitation.brideName} em ${weddingDate} no ${invitation.venueName}.`,
      type: 'website' as const,
    },
  }
}
