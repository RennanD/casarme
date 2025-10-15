import { ImageResponse } from 'next/og'
import { prisma } from '@/src/lib/prisma'
import { notFound } from 'next/navigation'

export const runtime = 'edge'
export const alt = 'Convite de Casamento'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const invitation = await prisma.invitation.findUnique({
    where: { slug: params.slug },
    select: {
      groomName: true,
      brideName: true,
      weddingDate: true,
    }
  })

  if (!invitation) {
    notFound()
  }

  const weddingDate = new Date(invitation.weddingDate).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAF3E0',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#3E3E3E',
            margin: '0 0 20px 0',
            textAlign: 'center',
          }}
        >
          {invitation.groomName} & {invitation.brideName}
        </h1>

        <div
          style={{
            fontSize: '24px',
            color: '#6B6B6B',
            marginBottom: '20px',
          }}
        >
          {weddingDate}
        </div>

        <div
          style={{
            fontSize: '16px',
            color: '#6B6B6B',
          }}
        >
          Criado com CasarMe
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}