import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'CasarMe - Convites de Casamento Digitais Personalizados'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #FAF3E0 0%, #E8B4B8 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo/Ícone */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#8B9D7F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '20px',
            }}
          >
            <span
              style={{
                fontSize: '40px',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              💍
            </span>
          </div>
          <span
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#2D3748',
            }}
          >
            CasarMe
          </span>
        </div>

        {/* Título principal */}
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: '#2D3748',
            textAlign: 'center',
            margin: '0 0 20px 0',
            lineHeight: 1.1,
          }}
        >
          Convites de Casamento
        </h1>

        {/* Subtítulo */}
        <p
          style={{
            fontSize: '32px',
            color: '#4A5568',
            textAlign: 'center',
            margin: '0 0 40px 0',
            maxWidth: '800px',
            lineHeight: 1.3,
          }}
        >
          Digitais Personalizados
        </p>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '24px' }}>✨</span>
            <span style={{ fontSize: '20px', color: '#4A5568' }}>Templates Elegantes</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '24px' }}>📱</span>
            <span style={{ fontSize: '20px', color: '#4A5568' }}>Fácil Compartilhamento</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '24px' }}>⚡</span>
            <span style={{ fontSize: '20px', color: '#4A5568' }}>Criação Rápida</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
