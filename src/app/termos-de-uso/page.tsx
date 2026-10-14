import { Metadata } from 'next'

import { LegalPageShell } from '@/src/shared/ui/legal-page-shell'

export const metadata: Metadata = {
  title: 'Termos de Uso - CasarMe | Convites de Casamento Digital',
  description: 'Termos de uso da plataforma CasarMe para criação de convites de casamento digitais personalizados.',
}

export default function TermosDeUso() {
  return (
    <LegalPageShell title="Termos de Uso">
          <p className="mb-8 text-lg">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              1. Aceitação dos Termos
            </h2>
            <p className="mb-4 leading-relaxed">
              Ao utilizar a plataforma CasarMe, você concorda em cumprir e estar sujeito aos seguintes termos e condições. Se você não concorda com qualquer parte destes termos, não deve usar nosso serviço.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              2. Descrição do Serviço
            </h2>
            <p className="mb-4 leading-relaxed">
              O CasarMe é uma plataforma online que permite a criação de convites de casamento digitais personalizados, incluindo:
            </p>
            <ul className="ml-4 list-inside list-disc leading-relaxed">
              <li>Templates personalizáveis para convites de casamento</li>
              <li>Integração com mapas para localização do evento</li>
              <li>Sistema de contagem regressiva</li>
              <li>Confirmação de presença via WhatsApp</li>
              <li>Galeria de fotos personalizada</li>
              <li>Música de fundo (YouTube)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              3. Uso Aceitável
            </h2>
            <p className="mb-4 leading-relaxed">
              Você concorda em usar o CasarMe apenas para fins legais e de acordo com estes termos. É proibido:
            </p>
            <ul className="ml-4 list-inside list-disc leading-relaxed">
              <li>Usar o serviço para atividades ilegais ou não autorizadas</li>
              <li>Violar direitos de propriedade intelectual de terceiros</li>
              <li>Transmitir conteúdo ofensivo, difamatório ou inadequado</li>
              <li>Tentar acessar contas de outros usuários</li>
              <li>Interferir no funcionamento normal do serviço</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              4. Propriedade Intelectual
            </h2>
            <p className="mb-4 leading-relaxed">
              Você mantém todos os direitos sobre o conteúdo que criar (fotos, textos, informações pessoais). Ao usar o CasarMe, você nos concede uma licença limitada para:
            </p>
            <ul className="ml-4 list-inside list-disc leading-relaxed">
              <li>Processar e armazenar seu conteúdo para fornecer o serviço</li>
              <li>Exibir seu convite conforme configurado</li>
              <li>Fazer backup e manter a segurança dos dados</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              5. Pagamentos e Reembolsos
            </h2>
            <p className="mb-4 leading-relaxed">
              Os preços dos serviços estão claramente indicados na plataforma. Pagamentos são processados de forma segura através de terceiros confiáveis.
              Reembolsos podem ser solicitados em até 7 dias após a compra, desde que o serviço não tenha sido utilizado.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              6. Limitação de Responsabilidade
            </h2>
            <p className="mb-4 leading-relaxed">
              O CasarMe não se responsabiliza por:
            </p>
            <ul className="ml-4 list-inside list-disc leading-relaxed">
              <li>Interrupções temporárias do serviço</li>
              <li>Perda de dados devido a falhas técnicas</li>
              <li>Uso inadequado da plataforma pelos usuários</li>
              <li>Problemas relacionados a serviços de terceiros (WhatsApp, Google Maps, YouTube)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              7. Modificações dos Termos
            </h2>
            <p className="mb-4 leading-relaxed">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação.
              O uso continuado do serviço constitui aceitação dos novos termos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
              8. Contato
            </h2>
            <p className="mb-4 leading-relaxed">
              Para dúvidas sobre estes termos, entre em contato conosco através do email: contato@casarme.com.br
            </p>
          </section>
    </LegalPageShell>
  )
}
