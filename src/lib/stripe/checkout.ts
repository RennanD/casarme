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
        templateId,
        customerEmail,
        invitationId
      },
      // Configurações específicas para PIX
      payment_method_options: {
        pix: {
          expires_after_seconds: 3600, // 1 hora para pagar o PIX
        },
      },
    });

    return {
      url: session.url,
    };
  } catch (error) {
    console.error("Erro ao criar sessão de checkout:", error);
    throw new Error("Erro ao criar sessão de pagamento");
  }
};
