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
              fontSize: '80px',
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
              fontSize: '32px',
              color: '#6B6B6B',
              margin: '0',
              textAlign: 'center',
            }}
          >
            de Casamento Digital
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '60px',
            alignItems: 'center',
            marginBottom: '50px',
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
                width: '80px',
                height: '80px',
                backgroundColor: '#D4A373',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '15px',
              }}
            >
              1
            </div>
            <p
              style={{
                fontSize: '20px',
                margin: '0',
                textAlign: 'center',
                fontWeight: '500',
              }}
            >
              Escolha o
              <br />
              Template
            </p>
          </div>

          <div
            style={{
              fontSize: '24px',
              color: '#D4A373',
              fontWeight: 'bold',
            }}
          >
            →
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
                width: '80px',
                height: '80px',
                backgroundColor: '#D4A373',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '15px',
              }}
            >
              2
            </div>
            <p
              style={{
                fontSize: '20px',
                margin: '0',
                textAlign: 'center',
                fontWeight: '500',
              }}
            >
              Personalize
              <br />
              seu Convite
            </p>
          </div>

          <div
            style={{
              fontSize: '24px',
              color: '#D4A373',
              fontWeight: 'bold',
            }}
          >
            →
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
                width: '80px',
                height: '80px',
                backgroundColor: '#D4A373',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '15px',
              }}
            >
              3
            </div>
            <p
              style={{
                fontSize: '20px',
                margin: '0',
                textAlign: 'center',
                fontWeight: '500',
              }}
            >
              Compartilhe
              <br />
              com os Convidados
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            padding: '25px 50px',
            backgroundColor: '#D4A373',
            borderRadius: '15px',
            color: 'white',
            fontSize: '28px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Comece Agora - É Grátis!
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '40px',
            alignItems: 'center',
            marginTop: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#3E3E3E',
              fontSize: '18px',
            }}
          >
            <span style={{ marginRight: '8px' }}>⚡</span>
            Rápido
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#3E3E3E',
              fontSize: '18px',
            }}
          >
            <span style={{ marginRight: '8px' }}>📱</span>
            Responsivo
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#3E3E3E',
              fontSize: '18px',
            }}
          >
            <span style={{ marginRight: '8px' }}>✨</span>
            Elegante
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
