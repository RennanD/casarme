import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Termos de Uso - CasarMe | Convites de Casamento Digital',
  description: 'Termos de uso da plataforma CasarMe para criação de convites de casamento digitais personalizados.',
}

export default function TermosDeUso() {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#D4A373] hover:text-[#C49363] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#3E3E3E] mb-8">
          Termos de Uso
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-[#6B6B6B] text-lg mb-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              1. Aceitação dos Termos
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Ao utilizar a plataforma CasarMe, você concorda em cumprir e estar sujeito aos seguintes termos e condições. Se você não concorda com qualquer parte destes termos, não deve usar nosso serviço.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              2. Descrição do Serviço
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              O CasarMe é uma plataforma online que permite a criação de convites de casamento digitais personalizados, incluindo:
            </p>
            <ul className="list-disc list-inside text-[#6B6B6B] leading-relaxed ml-4">
              <li>Templates personalizáveis para convites de casamento</li>
              <li>Integração com mapas para localização do evento</li>
              <li>Sistema de contagem regressiva</li>
              <li>Confirmação de presença via WhatsApp</li>
              <li>Galeria de fotos personalizada</li>
              <li>Música de fundo (YouTube)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              3. Uso Aceitável
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Você concorda em usar o CasarMe apenas para fins legais e de acordo com estes termos. É proibido:
            </p>
            <ul className="list-disc list-inside text-[#6B6B6B] leading-relaxed ml-4">
              <li>Usar o serviço para atividades ilegais ou não autorizadas</li>
              <li>Violar direitos de propriedade intelectual de terceiros</li>
              <li>Transmitir conteúdo ofensivo, difamatório ou inadequado</li>
              <li>Tentar acessar contas de outros usuários</li>
              <li>Interferir no funcionamento normal do serviço</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              4. Propriedade Intelectual
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Você mantém todos os direitos sobre o conteúdo que criar (fotos, textos, informações pessoais). Ao usar o CasarMe, você nos concede uma licença limitada para:
            </p>
            <ul className="list-disc list-inside text-[#6B6B6B] leading-relaxed ml-4">
              <li>Processar e armazenar seu conteúdo para fornecer o serviço</li>
              <li>Exibir seu convite conforme configurado</li>
              <li>Fazer backup e manter a segurança dos dados</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              5. Pagamentos e Reembolsos
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Os preços dos serviços estão claramente indicados na plataforma. Pagamentos são processados de forma segura através de terceiros confiáveis.
              Reembolsos podem ser solicitados em até 7 dias após a compra, desde que o serviço não tenha sido utilizado.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              6. Limitação de Responsabilidade
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              O CasarMe não se responsabiliza por:
            </p>
            <ul className="list-disc list-inside text-[#6B6B6B] leading-relaxed ml-4">
              <li>Interrupções temporárias do serviço</li>
              <li>Perda de dados devido a falhas técnicas</li>
              <li>Uso inadequado da plataforma pelos usuários</li>
              <li>Problemas relacionados a serviços de terceiros (WhatsApp, Google Maps, YouTube)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              7. Modificações dos Termos
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação.
              O uso continuado do serviço constitui aceitação dos novos termos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              8. Contato
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Para dúvidas sobre estes termos, entre em contato conosco através do email: contato@casarme.com.br
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
