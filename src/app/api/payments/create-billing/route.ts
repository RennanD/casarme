
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { AbacatePay, CreateBillingData } from '@/src/lib/abacatepay';

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

    const billingData: CreateBillingData = {
      frequency: 'ONE_TIME',
      methods: ['PIX', 'CARD'],
      products: [
        {
          externalId: process.env.ABACATEPAY_API_GOLDEN_INVITE_PRODUCT || 'golden-template',
          name: 'Convite de Casamento - Modelo Dourado',
          description: 'Convite digital personalizado para casamento',
          quantity: 1,
          price: 2590, // R$ 25,90
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
        template: 'golden',
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
    console.error('Error creating billing:', error);
    return NextResponse.json({ error: 'Failed to create billing' }, { status: 500 });
  }
}
