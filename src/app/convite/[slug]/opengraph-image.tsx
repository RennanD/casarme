import { ImageResponse } from 'next/og'
import { prisma } from '@/src/lib/prisma'

export const runtime = 'edge'

export const alt = 'Convite de Casamento - CasarMe'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  try {
    // Buscar dados do convite
    const invitation = await prisma.invitation.findUnique({
      where: { slug: params.slug },
      include: { images: true }
    })

    if (!invitation) {
      // Fallback para convite não encontrado
      return new ImageResponse(
        (
          <div
            style={{
              background: 'linear-gradient(135deg, #8B9D7F 0%, #E8B4B8 100%)',
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
                fontSize: '64px',
                fontWeight: 'bold',
                color: '#2D3748',
                textAlign: 'center',
                margin: '0 0 20px 0',
              }}
            >
              Convite de Casamento
            </h1>
            <p
              style={{
                fontSize: '32px',
                color: '#4A5568',
                textAlign: 'center',
              }}
            >
              Criado com CasarMe
            </p>
          </div>
        ),
        { ...size }
      )
    }

    // Buscar foto do hero
    const heroPhoto = invitation.images.find(img => img.type === 'hero')

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #FAF3E0 0%, #E8B4B8 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {/* Lado esquerdo - Foto do hero */}
          <div
            style={{
              width: '50%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
            }}
          >
            {heroPhoto ? (
              <div
                style={{
                  width: '300px',
                  height: '300px',
                  borderRadius: '20px',
                  background: '#8B9D7F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                }}
              >
                <span style={{ fontSize: '80px' }}>💑</span>
              </div>
            ) : (
              <div
                style={{
                  width: '300px',
                  height: '300px',
                  borderRadius: '20px',
                  background: '#8B9D7F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                }}
              >
                <span style={{ fontSize: '80px' }}>💑</span>
              </div>
            )}
          </div>

          {/* Lado direito - Informações do casamento */}
          <div
            style={{
              width: '50%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              background: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            {/* Nomes do casal */}
            <div
              style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#2D3748',
                textAlign: 'center',
                marginBottom: '10px',
              }}
            >
              {invitation.groomName} & {invitation.brideName}
            </div>

            {/* Logo CasarMe */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#8B9D7F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                }}
              >
                <span style={{ fontSize: '24px' }}>💍</span>
              </div>
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#2D3748',
                }}
              >
                CasarMe
              </span>
            </div>

            {/* Data do casamento */}
            <div
              style={{
                fontSize: '28px',
                color: '#4A5568',
                textAlign: 'center',
                marginBottom: '20px',
                fontWeight: '600',
              }}
            >
              {new Date(invitation.weddingDate).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>

            {/* Local */}
            <div
              style={{
                fontSize: '22px',
                color: '#4A5568',
                textAlign: 'center',
                marginBottom: '30px',
                maxWidth: '400px',
                fontWeight: '500',
              }}
            >
              {invitation.venueName}
            </div>

            {/* Mensagem de convite */}
            <div
              style={{
                fontSize: '20px',
                color: '#2D3748',
                textAlign: 'center',
                fontStyle: 'italic',
                maxWidth: '400px',
                lineHeight: 1.4,
                fontWeight: '500',
              }}
            >
              {invitation.welcomeMessage}
            </div>
          </div>
        </div>
      ),
      { ...size }
    )
  } catch (error) {
    console.error('Erro ao gerar imagem OG do convite:', error)

    // Fallback em caso de erro
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #8B9D7F 0%, #E8B4B8 100%)',
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
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#2D3748',
              textAlign: 'center',
              margin: '0 0 20px 0',
            }}
          >
            Convite de Casamento
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#4A5568',
              textAlign: 'center',
            }}
          >
            Criado com CasarMe
          </p>
        </div>
      ),
      { ...size }
    )
  }
}
