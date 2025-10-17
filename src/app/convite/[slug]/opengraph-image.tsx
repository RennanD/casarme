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

    // Buscar fotos dos noivos
    const groomPhoto = invitation.images.find(img => img.type === 'groom')
    const bridePhoto = invitation.images.find(img => img.type === 'bride')
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
          {/* Lado esquerdo - Fotos dos noivos */}
          <div
            style={{
              width: '50%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
            }}
          >
            {/* Foto do noivo */}
            {groomPhoto && (
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: '#8B9D7F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  overflow: 'hidden',
                }}
              >
                <span style={{ fontSize: '40px' }}>👨</span>
              </div>
            )}

            <div
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#2D3748',
                textAlign: 'center',
                marginBottom: '10px',
              }}
            >
              {invitation.groomName}
            </div>

            <div
              style={{
                fontSize: '24px',
                color: '#4A5568',
                textAlign: 'center',
                marginBottom: '40px',
              }}
            >
              &
            </div>

            {/* Foto da noiva */}
            {bridePhoto && (
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: '#E8B4B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  overflow: 'hidden',
                }}
              >
                <span style={{ fontSize: '40px' }}>👩</span>
              </div>
            )}

            <div
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#2D3748',
                textAlign: 'center',
              }}
            >
              {invitation.brideName}
            </div>
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
              background: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            {/* Logo CasarMe */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#8B9D7F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                }}
              >
                <span style={{ fontSize: '30px' }}>💍</span>
              </div>
              <span
                style={{
                  fontSize: '36px',
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
                fontSize: '24px',
                color: '#4A5568',
                textAlign: 'center',
                marginBottom: '20px',
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
                fontSize: '20px',
                color: '#4A5568',
                textAlign: 'center',
                marginBottom: '30px',
                maxWidth: '300px',
              }}
            >
              {invitation.venueName}
            </div>

            {/* Mensagem de convite */}
            <div
              style={{
                fontSize: '18px',
                color: '#2D3748',
                textAlign: 'center',
                fontStyle: 'italic',
                maxWidth: '350px',
                lineHeight: 1.4,
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
