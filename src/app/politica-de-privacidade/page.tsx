import { Metadata } from 'next'

import { LegalPageShell } from '@/src/shared/ui/legal-page-shell'

export const metadata: Metadata = {
  title: 'Política de Privacidade - CasarMe | Convites de Casamento Digital',
  description: 'Política de privacidade da plataforma CasarMe. Saiba como protegemos seus dados pessoais e informações do seu casamento.',
}

export default function PoliticaDePrivacidade() {
  return (
    <LegalPageShell title="Política de Privacidade">
          <p className="mb-8 text-lg">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              1. Informações que Coletamos
            </h2>
            <p className="mb-4 leading-relaxed">
              Para fornecer nossos serviços de convites de casamento digital, coletamos as seguintes informações:
            </p>
            <ul className="ml-4 list-inside list-disc leading-relaxed">
              <li><strong>Dados do Casal:</strong> Nomes, data do casamento, local do evento</li>
              <li><strong>Informações de Contato:</strong> Email, número de WhatsApp</li>
              <li><strong>Conteúdo Personalizado:</strong> Fotos, textos, histórias do casal</li>
              <li><strong>Dados de Uso:</strong> Como você interage com nossa plataforma</li>
              <li><strong>Informações Técnicas:</strong> Endereço IP, tipo de navegador, dispositivo</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              2. Como Utilizamos suas Informações
            </h2>
            <p className="mb-4 leading-relaxed">
              Utilizamos seus dados para:
            </p>
            <ul className="ml-4 list-inside list-disc leading-relaxed">
              <li>Criar e personalizar seu convite de casamento digital</li>
              <li>Fornecer suporte técnico e atendimento ao cliente</li>
              <li>Processar pagamentos de forma segura</li>
              <li>Melhorar nossos serviços e funcionalidades</li>
              <li>Enviar comunicações importantes sobre seu convite</li>
              <li>Cumprir obrigações legais e regulamentares</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              3. Compartilhamento de Informações
            </h2>
            <p className="mb-4 leading-relaxed">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:
            </p>
            <ul className="ml-4 list-inside list-disc leading-relaxed">
              <li><strong>Prestadores de Serviços:</strong> Processadores de pagamento, serviços de hospedagem</li>
              <li><strong>Integrações:</strong> WhatsApp (para confirmação de presença), Google Maps (para localização)</li>
              <li><strong>YouTube:</strong> Para reprodução de música de fundo</li>
              <li><strong>Obrigação Legal:</strong> Quando exigido por lei ou autoridades competentes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              4. Segurança dos Dados
            </h2>
            <p className="mb-4 leading-relaxed">
              Implementamos medidas de segurança robustas para proteger suas informações:
            </p>
            <ul className="ml-4 list-inside list-disc leading-relaxed">
              <li>Criptografia SSL/TLS para transmissão de dados</li>
              <li>Armazenamento seguro em servidores confiáveis</li>
              <li>Controle de acesso restrito aos dados</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backup regular dos dados</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              5. Seus Direitos (LGPD)
            </h2>
            <p className="mb-4 leading-relaxed">
              Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
            </p>
            <ul className="ml-4 list-inside list-disc leading-relaxed">
              <li><strong>Acesso:</strong> Solicitar informações sobre seus dados</li>
              <li><strong>Correção:</strong> Corrigir dados incompletos ou incorretos</li>
              <li><strong>Exclusão:</strong> Solicitar a exclusão de seus dados</li>
              <li><strong>Portabilidade:</strong> Transferir seus dados para outro serviço</li>
              <li><strong>Revogação:</strong> Retirar o consentimento a qualquer momento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              6. Retenção de Dados
            </h2>
            <p className="mb-4 leading-relaxed">
              Mantemos seus dados pelo tempo necessário para:
            </p>
            <ul className="ml-4 list-inside list-disc leading-relaxed">
              <li>Fornecer os serviços contratados</li>
              <li>Cumprir obrigações legais e regulamentares</li>
              <li>Resolver disputas e fazer cumprir acordos</li>
              <li>Dados de convites são mantidos por 2 anos após o evento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              7. Cookies e Tecnologias Similares
            </h2>
            <p className="mb-4 leading-relaxed">
              Utilizamos cookies para:
            </p>
            <ul className="ml-4 list-inside list-disc leading-relaxed">
              <li>Melhorar a experiência do usuário</li>
              <li>Analisar o uso da plataforma</li>
              <li>Personalizar conteúdo</li>
              <li>Garantir a segurança da plataforma</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              Você pode gerenciar as preferências de cookies através das configurações do seu navegador.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              8. Menores de Idade
            </h2>
            <p className="mb-4 leading-relaxed">
              Nossos serviços são direcionados a pessoas com 18 anos ou mais. Não coletamos intencionalmente dados de menores de idade.
              Se tomarmos conhecimento de que coletamos dados de um menor, tomaremos medidas para excluir essas informações.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              9. Alterações nesta Política
            </h2>
            <p className="mb-4 leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas através do email cadastrado ou por meio de aviso em nossa plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              10. Contato
            </h2>
            <p className="mb-4 leading-relaxed">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
            </p>
            <ul className="ml-4 list-inside list-disc leading-relaxed">
              <li>Email: privacidade@casarme.com.br</li>
              <li>Email geral: contato@casarme.com.br</li>
              <li>Resposta em até 15 dias úteis</li>
            </ul>
          </section>
    </LegalPageShell>
  )
}
