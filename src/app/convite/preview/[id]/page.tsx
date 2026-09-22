import { notFound } from "next/navigation"
import { prisma } from "@/src/lib/prisma"
import { GoldenTemplate } from "@/src/components/templates/golden-template/golden-template"
import { BlueTemplate } from "@/src/components/templates/blue-template"
import { getImageUrl } from "@/src/lib/image-url"
import { Button } from "@/components/ui/button"
import { CreditCard, CheckCircle2, Mail } from "lucide-react"
import { WatermarkedPreview } from "@/src/components/watermarked-preview"
import { PaymentButton } from "@/src/components/payment-button"
import { getInviteProduct, INTERACTIVE_INVITE_PRODUCTS } from "@/src/lib/invite-products"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

async function getInvitation(id: string) {
  try {
    const invitation = await prisma.invitation.findUnique({
      where: { id },
      include: {
        images: true
      }
    })
    return invitation
  } catch (error) {
    console.error("Erro ao buscar convite:", error)
    return null
  }
}

export default async function PreviewPage(props: PageProps) {
  const { id } = await props.params;
  const invitation = await getInvitation(id)

  if (!invitation) {
    notFound()
  }

  const product =
    getInviteProduct(invitation.template) ?? INTERACTIVE_INVITE_PRODUCTS.golden

  // Combinar data e hora para o formato ISO
  const weddingDateTime = new Date(invitation.weddingDate).toISOString()

  // Obter imagem de capa (se existir)
  const heroImage = invitation.images?.find((img: any) => img.type === 'hero')
  const heroPhotoUrl = heroImage ? getImageUrl(heroImage.filename) : "/placeholder.svg?height=800&width=600"

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12">
          {/* Preview do Convite */}
          <div id="preview" className="lg:sticky lg:top-8 lg:self-start">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Prévia do seu Convite
            </h2>
            {/* Adicionando scale, opacity e blur para deixar menos visível antes de pagar */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden scale-[0.65] origin-top opacity-75 blur-[1px] pointer-events-none transition-all duration-500">
              <WatermarkedPreview>
                {invitation.template === "golden" ? (
                  <GoldenTemplate
                    brideName={invitation.brideName}
                    groomName={invitation.groomName}
                    date={weddingDateTime}
                    address={invitation.venueAddress}
                    musicUrl={invitation.musicUrl || undefined}
                    whatsappNumber={invitation.whatsapp || ""}
                  />
                ) : invitation.template === "blue" ? (
                  <BlueTemplate
                    brideName={invitation.brideName}
                    groomName={invitation.groomName}
                    date={weddingDateTime}
                    address={invitation.venueAddress}
                    musicUrl={invitation.musicUrl || undefined}
                    whatsappNumber={invitation.whatsapp || ""}
                    thumbnail={heroPhotoUrl}
                  />
                ) : (
                  <div className="p-10 text-center">Modelo não suportado na prévia</div>
                )}
              </WatermarkedPreview>
            </div>
          </div>

          {/* Informações de Pagamento */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Finalize seu Convite de Casamento
              </h1>
              <p className="text-lg text-gray-600">
                Seu convite está quase pronto! Complete o pagamento para ativar e receber o link por e-mail.
              </p>
            </div>

            {/* Status do Convite */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1">
                    Aguardando Pagamento
                  </h3>
                  <p className="text-sm text-amber-700">
                    Após a confirmação do pagamento, enviaremos o link do convite para{" "}
                    <span className="font-semibold">{invitation.email}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Resumo do Pedido */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Resumo do Pedido
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {product.productName}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {invitation.brideName} & {invitation.groomName}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{product.displayPrice}</p>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Localização interativa com Google Maps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Confirmação de presença via WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Música de fundo personalizada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Acesso imediato ao convite</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Link permanente para compartilhar</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{product.displayPrice}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-2xl" style={{ color: product.accentColor }}>{product.displayPrice}</span>
                </div>
              </div>



              {/* Botão de Pagamento */}
              <div className="space-y-3 mt-6">
                <PaymentButton invitationId={invitation.id} />
              </div>


              <p className="text-xs text-gray-500 text-center mt-4">
                Pagamento seguro processado via AbacatePay
              </p>
            </div>

            {/* Informações Adicionais */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-2">
                📧 O que acontece depois do pagamento?
              </h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>✓ Você receberá um e-mail com o link do convite</li>
                <li>✓ O convite ficará disponível permanentemente</li>
                <li>✓ Você poderá compartilhar o link com seus convidados</li>
                <li>✓ Os convidados poderão confirmar presença via WhatsApp</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
