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
      welcomeMessage: true,
      template: true,
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
          background: 'linear-gradient(135deg, #FAF3E0 0%, #D4A373 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            fontSize: '40px',
            color: '#D4A373',
            opacity: 0.3,
          }}
        >
          💍
        </div>
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '40px',
            color: '#D4A373',
            opacity: 0.3,
          }}
        >
          💐
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            fontSize: '40px',
            color: '#D4A373',
            opacity: 0.3,
          }}
        >
          🌹
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            fontSize: '40px',
            color: '#D4A373',
            opacity: 0.3,
          }}
        >
          ✨
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '900px',
            padding: '40px',
          }}
        >
          {/* Couple names */}
          <h1
            style={{
              fontSize: '64px',
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
              fontSize: '32px',
              color: '#6B6B6B',
              marginBottom: '30px',
              fontWeight: '500',
            }}
          >
            {weddingDate}
          </div>

          {/* Venue */}
          <div
            style={{
              fontSize: '24px',
              color: '#3E3E3E',
              marginBottom: '30px',
              fontWeight: '400',
            }}
          >
            📍 {invitation.venueName}
          </div>

          {/* Welcome message */}
          {invitation.welcomeMessage && (
            <div
              style={{
                fontSize: '20px',
                color: '#6B6B6B',
                marginBottom: '40px',
                fontStyle: 'italic',
                maxWidth: '800px',
                lineHeight: '1.4',
              }}
            >
              "{invitation.welcomeMessage}"
            </div>
          )}

          {/* Template badge */}
          <div
            style={{
              padding: '12px 24px',
              backgroundColor: '#D4A373',
              color: 'white',
              borderRadius: '25px',
              fontSize: '18px',
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}
          >
            Template {invitation.template}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '16px',
            color: '#6B6B6B',
            fontWeight: '500',
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
