import { ImageResponse } from 'next/og'
import { prisma } from '@/src/lib/prisma'

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
          background: 'linear-gradient(135deg, #FAF3E0 0%, #D4A373 100%)',
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
              fontSize: '72px',
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
              fontSize: '28px',
              color: '#6B6B6B',
              margin: '10px 0 0 0',
              textAlign: 'center',
            }}
          >
            Convites de Casamento Digitais
          </p>
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '40px',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#3E3E3E',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '10px',
              }}
            >
              💍
            </div>
            <p
              style={{
                fontSize: '18px',
                margin: '0',
                textAlign: 'center',
              }}
            >
              Templates
              <br />
              Elegantes
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#3E3E3E',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '10px',
              }}
            >
              📱
            </div>
            <p
              style={{
                fontSize: '18px',
                margin: '0',
                textAlign: 'center',
              }}
            >
              Fácil
              <br />
              Compartilhamento
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#3E3E3E',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '10px',
              }}
            >
              ✨
            </div>
            <p
              style={{
                fontSize: '18px',
                margin: '0',
                textAlign: 'center',
              }}
            >
              Personalização
              <br />
              Completa
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: '40px',
            padding: '20px 40px',
            backgroundColor: '#D4A373',
            borderRadius: '12px',
            color: 'white',
            fontSize: '24px',
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
