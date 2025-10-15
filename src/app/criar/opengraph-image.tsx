import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Criar Convite de Casamento - CasarMe'
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
        {/* Main title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '50px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#3E3E3E',
              margin: '0 0 20px 0',
              textAlign: 'center',
              lineHeight: '1.1',
            }}
          >
            Crie seu Convite
          </h1>
          <p
            style={{
              fontSize: '28px',
              color: '#6B6B6B',
              margin: '0',
              textAlign: 'center',
            }}
          >
            de Casamento Digital
          </p>
        </div>

        {/* CTA */}
        <div
          style={{
            padding: '25px 50px',
            backgroundColor: '#D4A373',
            borderRadius: '15px',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Comece Agora - É Grátis!
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}