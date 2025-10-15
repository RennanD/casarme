import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Privacidade - CasarMe | Convites de Casamento Digital',
  description: 'Política de privacidade da plataforma CasarMe. Saiba como protegemos seus dados pessoais e informações do seu casamento.',
}

export default function PoliticaDePrivacidade() {
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
          Política de Privacidade
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-[#6B6B6B] text-lg mb-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              1. Informações que Coletamos
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Para fornecer nossos serviços de convites de casamento digital, coletamos as seguintes informações:
            </p>
            <ul className="list-disc list-inside text-[#6B6B6B] leading-relaxed ml-4">
              <li><strong>Dados do Casal:</strong> Nomes, data do casamento, local do evento</li>
              <li><strong>Informações de Contato:</strong> Email, número de WhatsApp</li>
              <li><strong>Conteúdo Personalizado:</strong> Fotos, textos, histórias do casal</li>
              <li><strong>Dados de Uso:</strong> Como você interage com nossa plataforma</li>
              <li><strong>Informações Técnicas:</strong> Endereço IP, tipo de navegador, dispositivo</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              2. Como Utilizamos suas Informações
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Utilizamos seus dados para:
            </p>
            <ul className="list-disc list-inside text-[#6B6B6B] leading-relaxed ml-4">
              <li>Criar e personalizar seu convite de casamento digital</li>
              <li>Fornecer suporte técnico e atendimento ao cliente</li>
              <li>Processar pagamentos de forma segura</li>
              <li>Melhorar nossos serviços e funcionalidades</li>
              <li>Enviar comunicações importantes sobre seu convite</li>
              <li>Cumprir obrigações legais e regulamentares</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              3. Compartilhamento de Informações
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:
            </p>
            <ul className="list-disc list-inside text-[#6B6B6B] leading-relaxed ml-4">
              <li><strong>Prestadores de Serviços:</strong> Processadores de pagamento, serviços de hospedagem</li>
              <li><strong>Integrações:</strong> WhatsApp (para confirmação de presença), Google Maps (para localização)</li>
              <li><strong>YouTube:</strong> Para reprodução de música de fundo</li>
              <li><strong>Obrigação Legal:</strong> Quando exigido por lei ou autoridades competentes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              4. Segurança dos Dados
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Implementamos medidas de segurança robustas para proteger suas informações:
            </p>
            <ul className="list-disc list-inside text-[#6B6B6B] leading-relaxed ml-4">
              <li>Criptografia SSL/TLS para transmissão de dados</li>
              <li>Armazenamento seguro em servidores confiáveis</li>
              <li>Controle de acesso restrito aos dados</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backup regular dos dados</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              5. Seus Direitos (LGPD)
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
            </p>
            <ul className="list-disc list-inside text-[#6B6B6B] leading-relaxed ml-4">
              <li><strong>Acesso:</strong> Solicitar informações sobre seus dados</li>
              <li><strong>Correção:</strong> Corrigir dados incompletos ou incorretos</li>
              <li><strong>Exclusão:</strong> Solicitar a exclusão de seus dados</li>
              <li><strong>Portabilidade:</strong> Transferir seus dados para outro serviço</li>
              <li><strong>Revogação:</strong> Retirar o consentimento a qualquer momento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              6. Retenção de Dados
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Mantemos seus dados pelo tempo necessário para:
            </p>
            <ul className="list-disc list-inside text-[#6B6B6B] leading-relaxed ml-4">
              <li>Fornecer os serviços contratados</li>
              <li>Cumprir obrigações legais e regulamentares</li>
              <li>Resolver disputas e fazer cumprir acordos</li>
              <li>Dados de convites são mantidos por 2 anos após o evento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              7. Cookies e Tecnologias Similares
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Utilizamos cookies para:
            </p>
            <ul className="list-disc list-inside text-[#6B6B6B] leading-relaxed ml-4">
              <li>Melhorar a experiência do usuário</li>
              <li>Analisar o uso da plataforma</li>
              <li>Personalizar conteúdo</li>
              <li>Garantir a segurança da plataforma</li>
            </ul>
            <p className="text-[#6B6B6B] leading-relaxed mt-4">
              Você pode gerenciar as preferências de cookies através das configurações do seu navegador.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              8. Menores de Idade
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Nossos serviços são direcionados a pessoas com 18 anos ou mais. Não coletamos intencionalmente dados de menores de idade.
              Se tomarmos conhecimento de que coletamos dados de um menor, tomaremos medidas para excluir essas informações.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              9. Alterações nesta Política
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas através do email cadastrado ou por meio de aviso em nossa plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-4">
              10. Contato
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
            </p>
            <ul className="list-disc list-inside text-[#6B6B6B] leading-relaxed ml-4">
              <li>Email: privacidade@casarme.com.br</li>
              <li>Email geral: contato@casarme.com.br</li>
              <li>Resposta em até 15 dias úteis</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
