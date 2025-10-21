import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Crie seu convite de casamento de forma simples - CasarMe'
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
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Layout similar ao Hero - Grid com texto à esquerda e imagem à direita */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0 60px',
          }}
        >
          {/* Lado esquerdo - Texto */}
          <div
            style={{
              flex: '1',
              maxWidth: '600px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
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
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                }}
              >
                <span style={{ fontSize: '30px' }}>🧡</span>
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

            {/* Título principal */}
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#2D3748',
                margin: '0 0 20px 0',
                lineHeight: 1.1,
              }}
            >
              Crie seu convite de casamento de forma simples
            </h1>

            {/* Descrição */}
            <p
              style={{
                fontSize: '24px',
                color: '#4A5568',
                margin: '0 0 30px 0',
                lineHeight: 1.3,
              }}
            >
              Crie seu convite personalizado de casamento em 3 cliques. Templates elegantes, mapa interativo e confirmação via WhatsApp incluídos.
            </p>

            {/* Botão CTA */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#D4A373',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '25px',
                fontSize: '20px',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(212, 163, 115, 0.3)',
              }}
            >
              Criar Meu Convite
            </div>
          </div>

          {/* Lado direito - Mockup dos celulares */}
          <div
            style={{
              flex: '1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '20px',
                transform: 'rotate(3deg)',
              }}
            >
              {/* Celular 1 */}
              <div
                style={{
                  width: '120px',
                  height: '240px',
                  background: '#000',
                  display: 'flex',
                  borderRadius: '20px',
                  padding: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'white',
                    borderRadius: '15px',
                    padding: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Header do convite */}
                  <div
                    style={{
                      textAlign: 'center',
                      marginBottom: '15px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        background: '#8B9D7F',
                        borderRadius: '50%',
                        margin: '0 auto 10px',
                        display: 'flex',
                      }}
                    />
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#2D3748',
                        marginBottom: '5px',
                        display: 'flex',
                      }}
                    >
                      Rennan & Barbara
                    </div>
                    <div
                      style={{
                        fontSize: '10px',
                        color: '#4A5568',
                        display: 'flex',
                      }}
                    >
                      16 de julho de 2026
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div
                    style={{
                      flex: 1,
                      borderTop: '1px solid #E2E8F0',
                      paddingTop: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '9px',
                        fontWeight: 'bold',
                        color: '#2D3748',
                        marginBottom: '5px',
                        display: 'flex',
                      }}
                    >
                      Boas-vindas
                    </div>
                    <div
                      style={{
                        fontSize: '8px',
                        color: '#4A5568',
                        lineHeight: 1.3,
                        display: 'flex',
                      }}
                    >
                      Celebre conosco o início de uma nova jornada...
                    </div>
                  </div>
                </div>
              </div>

              {/* Celular 2 */}
              <div
                style={{
                  width: '120px',
                  height: '240px',
                  background: '#000',
                  display: 'flex',
                  borderRadius: '20px',
                  padding: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  transform: 'rotate(-3deg)',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'white',
                    borderRadius: '15px',
                    padding: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Header do convite */}
                  <div
                    style={{
                      textAlign: 'center',
                      marginBottom: '15px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        background: '#E8B4B8',
                        borderRadius: '50%',
                        margin: '0 auto 10px',
                        display: 'flex',
                      }}
                    />
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#2D3748',
                        marginBottom: '5px',
                        display: 'flex',
                      }}
                    >
                      Pedro & Ana
                    </div>
                    <div
                      style={{
                        fontSize: '10px',
                        color: '#4A5568',
                        display: 'flex',
                      }}
                    >
                      15 de novembro de 2025
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div
                    style={{
                      flex: 1,
                      borderTop: '1px solid #E2E8F0',
                      paddingTop: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '9px',
                        fontWeight: 'bold',
                        color: '#2D3748',
                        marginBottom: '5px',
                        display: 'flex',
                      }}
                    >
                      O Casal
                    </div>
                    <div
                      style={{
                        fontSize: '8px',
                        color: '#4A5568',
                        lineHeight: 1.3,
                        display: 'flex',
                      }}
                    >
                      Nos conhecemos em uma viagem...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
