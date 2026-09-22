
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { AbacatePay, CreateBillingData } from '@/src/lib/abacatepay';
import { getInviteProduct, getAbacateProductId, type InteractiveInviteTemplate } from '@/src/lib/invite-products';

const abacatePay = new AbacatePay({
  apiKey: process.env.ABACATEPAY_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { invitationId, cpf } = body;

    if (!invitationId) {
      return NextResponse.json({ error: 'Invitation ID is required' }, { status: 400 });
    }

    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
    });

    if (!invitation) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
    }

    // Check if invitation is already paid
    if (invitation.paymentStatus === 'paid' && invitation.isActive) {
      return NextResponse.json({ error: 'Invitation already paid' }, { status: 400 });
    }

    // Check if there is already a billingUrl (optional, maybe we want to create a new one if expired)
    // For now, let's always create a new one or return existing if valid?
    // AbacatePay billings might expire. simpler to create a new one for now.

    const product = getInviteProduct(invitation.template)

    if (!product) {
      return NextResponse.json(
        { error: 'Unsupported invitation template for billing' },
        { status: 400 }
      )
    }

    const abacateProductId = getAbacateProductId(invitation.template as InteractiveInviteTemplate)

    const billingData: CreateBillingData = {
      frequency: 'ONE_TIME',
      methods: ['PIX'],
      products: [
        {
          externalId: abacateProductId,
          name: product.productName,
          description: 'Convite digital personalizado para casamento',
          quantity: 1,
          price: product.priceCents,
        },
      ],
      returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/convite/preview/${invitationId}`,
      completionUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/criar/obrigado`,
      customer: {
        name: `${invitation.brideName} & ${invitation.groomName}`,
        email: invitation.email,
        cellphone: invitation.whatsapp || '',
        taxId: invitation.cpf || cpf || '000.000.000-00', // Prioritize DB CPF, then body, then default
      },
      externalId: invitationId,
      metadata: {
        invitationId: invitationId,
        template: invitation.template,
      },
    };

    const billing = await abacatePay.createBilling(billingData);



    if (!billing || !billing.data) {
      console.error('Invalid AbacatePay response structure:', billing);
      return NextResponse.json({ error: 'Invalid response from payment provider' }, { status: 500 });
    }

    // Save billingId to invitation
    await prisma.invitation.update({
      where: { id: invitationId },
      data: {
        billingId: billing.data.id,
        billingUrl: billing.data.url,
      },
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: billing.data.url,
      billingId: billing.data.id,
    });

  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Missing environment variable:')) {
      console.error('Billing configuration error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error('Error creating billing:', error);
    return NextResponse.json({ error: 'Failed to create billing' }, { status: 500 });
  }
}
