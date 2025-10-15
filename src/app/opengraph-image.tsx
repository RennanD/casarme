import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'CasarMe - Convites de Casamento Digitais'
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
        {/* Logo/Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#3E3E3E',
              margin: '0',
              textAlign: 'center',
              lineHeight: '1.1',
            }}
          >
            CasarMe
          </h1>
          <p
            style={{
              fontSize: '24px',
              color: '#6B6B6B',
              margin: '10px 0 0 0',
              textAlign: 'center',
            }}
          >
            Convites de Casamento Digitais
          </p>
        </div>

        {/* CTA */}
        <div
          style={{
            padding: '20px 40px',
            backgroundColor: '#D4A373',
            borderRadius: '12px',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          Crie seu convite em minutos
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}