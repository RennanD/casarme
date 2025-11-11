import { Html, Head, Body, Container, Section, Text, Link, Button, Hr } from '@react-email/components'

interface AbandonedCartEmailTemplateProps {
  groomName: string
  brideName: string
  checkoutUrl: string
}

export function AbandonedCartEmailTemplate({ 
  groomName, 
  brideName, 
  checkoutUrl 
}: AbandonedCartEmailTemplateProps) {
  return (
    <Html>
      <Head>
        <title>Complete seu convite de casamento - CasarMe</title>
      </Head>
      <Body style={{
        margin: 0,
        padding: 0,
        fontFamily: 'Georgia, serif',
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
            background: 'linear-gradient(135deg, #D4A373 0%, #C4936B 100%)',
            padding: '40px 30px',
            textAlign: 'center'
          }}>
            <Text style={{
              color: '#ffffff',
              fontSize: '32px',
              margin: 0,
              fontFamily: 'Georgia, serif',
              fontWeight: 'bold'
            }}>
              💍 Seu momento especial está quase pronto!
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
              Olá, {groomName} & {brideName}! 👋
            </Text>

            <Text style={{
              color: '#6B6B6B',
              fontSize: '16px',
              margin: '0 0 20px 0',
              lineHeight: '1.8'
            }}>
              Notamos que você começou a criar seu convite de casamento conosco, mas ainda não finalizou a compra. 
              Sabemos que planejar um casamento pode ser corrido, mas não deixe esse momento especial passar! ✨
            </Text>

            <Text style={{
              color: '#6B6B6B',
              fontSize: '16px',
              margin: '0 0 20px 0',
              lineHeight: '1.8'
            }}>
              Seu convite está guardado e esperando por você. Com apenas alguns cliques, você pode finalizar 
              sua compra e ter seu convite interativo pronto para compartilhar com todos os seus convidados! 💌
            </Text>

            <Section style={{
              backgroundColor: '#FAF3E0',
              padding: '30px',
              borderRadius: '8px',
              margin: '30px 0',
              border: '2px solid #EDE0D4',
              textAlign: 'center'
            }}>
              <Text style={{
                color: '#3E3E3E',
                fontSize: '18px',
                margin: '0 0 15px 0',
                fontFamily: 'Georgia, serif',
                fontWeight: 'bold'
              }}>
                🌟 Complete sua compra agora
              </Text>
              <Text style={{
                color: '#6B6B6B',
                fontSize: '14px',
                margin: '0 0 25px 0'
              }}>
                Seu convite está quase pronto. Finalize em menos de 2 minutos!
              </Text>
              <Button
                href={checkoutUrl}
                style={{
                  backgroundColor: '#D4A373',
                  color: '#ffffff',
                  padding: '18px 40px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  display: 'inline-block',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(212, 163, 115, 0.3)'
                }}
              >
                Finalizar Compra Agora
              </Button>
            </Section>

            <Section style={{ margin: '30px 0' }}>
              <Text style={{
                color: '#3E3E3E',
                fontSize: '18px',
                margin: '0 0 15px 0',
                fontFamily: 'Georgia, serif',
                fontWeight: 'bold'
              }}>
                💝 Por que escolher a CasarMe?
              </Text>
              <Text style={{
                color: '#6B6B6B',
                fontSize: '16px',
                margin: '12px 0',
                paddingLeft: '20px',
                position: 'relative'
              }}>
                <span style={{ position: 'absolute', left: 0 }}>✨</span>
                Templates elegantes e personalizáveis
              </Text>
              <Text style={{
                color: '#6B6B6B',
                fontSize: '16px',
                margin: '12px 0',
                paddingLeft: '20px',
                position: 'relative'
              }}>
                <span style={{ position: 'absolute', left: 0 }}>📱</span>
                Confirmação de presença via WhatsApp
              </Text>
              <Text style={{
                color: '#6B6B6B',
                fontSize: '16px',
                margin: '12px 0',
                paddingLeft: '20px',
                position: 'relative'
              }}>
                <span style={{ position: 'absolute', left: 0 }}>🗺️</span>
                Mapa interativo para seus convidados
              </Text>
              <Text style={{
                color: '#6B6B6B',
                fontSize: '16px',
                margin: '12px 0',
                paddingLeft: '20px',
                position: 'relative'
              }}>
                <span style={{ position: 'absolute', left: 0 }}>💌</span>
                Compartilhamento fácil e elegante
              </Text>
            </Section>

            <Hr style={{
              borderColor: '#EDE0D4',
              margin: '30px 0'
            }} />

            <Text style={{
              color: '#6B6B6B',
              fontSize: '14px',
              margin: '20px 0',
              fontStyle: 'italic',
              textAlign: 'center'
            }}>
              "O amor não se vê com os olhos, mas com a alma." - Shakespeare
            </Text>

            <Text style={{
              color: '#6B6B6B',
              fontSize: '14px',
              margin: '20px 0 0 0',
              textAlign: 'center'
            }}>
              Não perca a chance de tornar seu dia ainda mais especial. 
              Seu convite está esperando por você! 💕
            </Text>
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
              Criado com ❤️ pela equipe CasarMe
            </Text>
            <Text style={{
              color: '#6B6B6B',
              fontSize: '12px',
              margin: '10px 0 0 0'
            }}>
              Se tiver alguma dúvida, estamos aqui para ajudar!
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

