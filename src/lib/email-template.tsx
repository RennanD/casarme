import { Html, Head, Body, Container, Section, Text, Link, Button, Hr } from '@react-email/components'

interface EmailTemplateProps {
  groomName: string
  brideName: string
  invitationUrl: string
}

export function EmailTemplate({ groomName, brideName, invitationUrl }: EmailTemplateProps) {
  return (
    <Html>
      <Head>
        <title>Seu Convite Interativo Está Pronto!</title>
      </Head>
      <Body style={{
        margin: 0,
        padding: 0,
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#FAF3E0',
        lineHeight: '1.6'
      }}>
        <Container style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          {/* Header */}
          <Section style={{
            backgroundColor: '#D4A373',
            padding: '40px 30px',
            textAlign: 'center'
          }}>
            <Text style={{
              color: '#ffffff',
              fontSize: '28px',
              margin: 0,
              fontFamily: 'Georgia, serif',
              fontWeight: 'bold'
            }}>
              🎉 Seu Convite Está Pronto!
            </Text>
            <Text style={{
              color: '#ffffff',
              fontSize: '16px',
              margin: '10px 0 0 0',
              opacity: 0.9
            }}>
              {groomName} & {brideName}
            </Text>
          </Section>

          {/* Content */}
          <Section style={{ padding: '40px 30px' }}>
            <Text style={{
              color: '#3E3E3E',
              fontSize: '24px',
              margin: '0 0 20px 0',
              fontFamily: 'Georgia, serif',
              fontWeight: 'bold'
            }}>
              Olá! 👋
            </Text>

            <Text style={{
              color: '#6B6B6B',
              fontSize: '16px',
              margin: '0 0 20px 0'
            }}>
              Seu convite interativo foi criado com sucesso! Agora você pode compartilhar
              este link especial com seus familiares e amigos.
            </Text>

            <Section style={{
              backgroundColor: '#FAF3E0',
              padding: '25px',
              borderRadius: '8px',
              margin: '30px 0',
              border: '2px solid #EDE0D4'
            }}>
              <Text style={{
                color: '#3E3E3E',
                fontSize: '18px',
                margin: '0 0 15px 0',
                fontFamily: 'Georgia, serif',
                fontWeight: 'bold'
              }}>
                🔗 Link do seu convite:
              </Text>
              <Link
                href={invitationUrl}
                style={{
                  color: '#D4A373',
                  fontSize: '16px',
                  textDecoration: 'none',
                  wordBreak: 'break-all',
                  display: 'block',
                  padding: '10px',
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  border: '1px solid #EDE0D4'
                }}
              >
                {invitationUrl}
              </Link>
            </Section>

            <Section style={{ margin: '30px 0' }}>
              <Text style={{
                color: '#3E3E3E',
                fontSize: '18px',
                margin: '0 0 15px 0',
                fontFamily: 'Georgia, serif',
                fontWeight: 'bold'
              }}>
                📋 Próximos passos:
              </Text>
              <Text style={{
                color: '#6B6B6B',
                fontSize: '16px',
                margin: '8px 0'
              }}>
                • Compartilhe o link com seus convidados
              </Text>
              <Text style={{
                color: '#6B6B6B',
                fontSize: '16px',
                margin: '8px 0'
              }}>
                • Acompanhe as confirmações de presença
              </Text>
              <Text style={{
                color: '#6B6B6B',
                fontSize: '16px',
                margin: '8px 0'
              }}>
                • Acesse seu convite a qualquer momento
              </Text>
            </Section>

            <Section style={{
              textAlign: 'center',
              margin: '30px 0'
            }}>
              <Button
                href={invitationUrl}
                style={{
                  backgroundColor: '#D4A373',
                  color: '#ffffff',
                  padding: '15px 30px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'inline-block',
                  border: 'none'
                }}
              >
                Ver Meu Convite
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={{
            backgroundColor: '#3E3E3E',
            padding: '30px',
            textAlign: 'center'
          }}>
            <Text style={{
              color: '#ffffff',
              fontSize: '14px',
              margin: '0 0 10px 0'
            }}>
              Criado com ❤️ usando Casarme
            </Text>
            <Text style={{
              color: '#6B6B6B',
              fontSize: '12px',
              margin: 0
            }}>
              Seu convite ficará disponível por tempo ilimitado
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
