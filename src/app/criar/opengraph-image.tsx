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
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#3E3E3E',
            margin: '0 0 20px 0',
            textAlign: 'center',
          }}
        >
          Crie seu Convite
        </h1>
        <p
          style={{
            fontSize: '20px',
            color: '#6B6B6B',
            margin: '0',
            textAlign: 'center',
          }}
        >
          de Casamento Digital
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}