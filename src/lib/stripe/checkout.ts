import { stripe } from "./stripe-client";
import { STRIPE_PRODUCTS } from "../stripe-products";

type CreateInvitationCheckoutSession = {
  templateId: string;
  customerEmail: string;
  invitationId: string; // ID do convite já criado
};

export const createInvitationCheckoutSession = async ({
  templateId,
  customerEmail,
  invitationId
}: CreateInvitationCheckoutSession) => {
  try {
    const product = STRIPE_PRODUCTS[templateId as keyof typeof STRIPE_PRODUCTS];

    if (!product) {
      throw new Error(`Template ${templateId} não encontrado`);
    }

    // Validar que invitationId foi fornecido
    if (!invitationId) {
      throw new Error('invitationId é obrigatório para criar sessão de checkout');
    }

    console.log('Criando sessão de checkout com:', {
      templateId,
      customerEmail,
      invitationId
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Cartão e PIX
      mode: "payment", // Pagamento único (não recorrente)
      customer_email: customerEmail,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/criar/obrigado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/criar?template=${templateId}`,
      line_items: [
        {
          price: product.priceId,
          quantity: 1,
        },
      ],
      metadata: {
        templateId: String(templateId),
        customerEmail: String(customerEmail),
        invitationId: String(invitationId), // Garantir que é string
      },
      // Configurações específicas para PIX
      payment_method_options: {
        pix: {
          expires_after_seconds: 3600, // 1 hora para pagar o PIX
        },
      },
    });

    // Log para verificar se a sessão foi criada com os metadados corretos
    console.log('✅ Sessão de checkout criada:', {
      sessionId: session.id,
      url: session.url,
      metadata: session.metadata,
      invitationId: session.metadata.invitationId
    });

    return {
      url: session.url,
      sessionId: session.id, // Retornar também o ID da sessão para debug
    };
  } catch (error) {
    console.error("Erro ao criar sessão de checkout:", error);
    throw new Error("Erro ao criar sessão de pagamento");
  }
};
