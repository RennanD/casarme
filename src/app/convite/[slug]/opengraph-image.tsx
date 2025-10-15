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
      venueName: true,
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
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '800px',
            padding: '40px',
          }}
        >
          {/* Couple names */}
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              color: '#3E3E3E',
              margin: '0 0 20px 0',
              lineHeight: '1.1',
            }}
          >
            {invitation.groomName} & {invitation.brideName}
          </h1>

          {/* Wedding date */}
          <div
            style={{
              fontSize: '28px',
              color: '#6B6B6B',
              marginBottom: '20px',
              fontWeight: '500',
            }}
          >
            {weddingDate}
          </div>

          {/* Venue */}
          <div
            style={{
              fontSize: '20px',
              color: '#3E3E3E',
              marginBottom: '40px',
              fontWeight: '400',
            }}
          >
            {invitation.venueName}
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: '16px',
              color: '#6B6B6B',
              fontWeight: '500',
            }}
          >
            Criado com CasarMe
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
