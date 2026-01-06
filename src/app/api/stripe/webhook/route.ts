import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/src/lib/stripe/stripe-client";
import { prisma } from "@/src/lib/prisma";
import { generateUniqueSlug } from "@/src/lib/slug";
import { resend } from "@/src/lib/resend";
import { EmailTemplate } from "@/src/lib/email-template";

// Configuração para garantir que o corpo seja mantido como string bruta
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Obter o corpo bruto da requisição como Buffer
    const body = await request.arrayBuffer();
    const bodyString = Buffer.from(body).toString('utf8');
    const signature = request.headers.get('stripe-signature');

    console.log('Webhook recebido:', {
      hasSignature: !!signature,
      bodyLength: bodyString.length,
      bodyStart: bodyString.substring(0, 100) + '...',
      contentType: request.headers.get('content-type')
    });

    if (!signature) {
      console.error('No Stripe signature found');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('STRIPE_WEBHOOK_SECRET not configured');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        bodyString,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      console.error('Body received (first 200 chars):', bodyString.substring(0, 200));
      console.error('Signature received:', signature);
      console.error('Webhook secret configured:', !!process.env.STRIPE_WEBHOOK_SECRET);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log('📥 Evento recebido do Stripe:', event.type);
    console.log('📋 ID do evento:', event.id);

    // Processar pagamento bem-sucedido
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('✅ Evento checkout.session.completed recebido');
      console.log('📊 Dados da sessão:', {
        id: session.id,
        payment_status: session.payment_status,
        payment_intent: session.payment_intent,
        customer_email: session.customer_email,
        metadata: session.metadata
      });

      // IMPORTANTE: Verificar se o pagamento foi realmente concluído
      // O evento checkout.session.completed pode ser disparado antes do pagamento estar completo
      // Mas vamos processar mesmo assim se tiver invitationId, pois podemos verificar depois
      console.log(`📊 Payment status: ${session.payment_status}`);
      
      // Para PIX e alguns métodos, o status pode ser 'unpaid' inicialmente
      // Mas se tiver invitationId, vamos processar de qualquer forma
      if (session.payment_status !== 'paid' && session.payment_status !== 'complete') {
        console.log(`⚠️ Payment status não é 'paid' ou 'complete': ${session.payment_status}`);
        
        // Se não tiver invitationId, não podemos processar
        if (!session.metadata?.invitationId) {
          console.log(`⏳ Sem invitationId. Aguardando payment_intent.succeeded...`);
          return NextResponse.json({ 
            received: true, 
            message: `Payment status is ${session.payment_status}, no invitationId found` 
          });
        }
        
        // Se tiver invitationId, vamos processar mesmo assim
        // O webhook pode ser chamado antes do pagamento estar completo
        console.log(`✅ Tem invitationId, processando mesmo com status ${session.payment_status}`);
      }

      try {
        await handleSuccessfulPayment(session);
        console.log('✅ Pagamento processado com sucesso');
      } catch (error) {
        console.error('❌ Erro ao processar pagamento:', error);
        // Log detalhado do erro
        if (error instanceof Error) {
          console.error('Mensagem de erro:', error.message);
          console.error('Stack trace:', error.stack);
        }
        return NextResponse.json({ 
          error: 'Processing failed',
          message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
      }
    } 
    // Também processar payment_intent.succeeded como fallback
    else if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      console.log('✅ Evento payment_intent.succeeded recebido');
      console.log('📊 Dados do payment intent:', {
        id: paymentIntent.id,
        status: paymentIntent.status,
        metadata: paymentIntent.metadata
      });

      // Buscar sessão de checkout relacionada através dos metadados do payment_intent
      // ou buscar sessões recentes que possam ter este payment_intent
      try {
        let session = null;
        
        // Tentar buscar através de metadados primeiro
        if (paymentIntent.metadata?.checkout_session_id) {
          try {
            session = await stripe.checkout.sessions.retrieve(
              paymentIntent.metadata.checkout_session_id
            );
            console.log('📦 Sessão encontrada via metadados:', session.id);
          } catch (err) {
            console.log('⚠️ Não foi possível buscar sessão via metadados, tentando outra abordagem...');
          }
        }
        
        // Se não encontrou, buscar nas sessões recentes
        if (!session) {
          console.log('🔍 Buscando sessões recentes...');
          const sessions = await stripe.checkout.sessions.list({
            limit: 10, // Buscar as 10 mais recentes
            expand: ['data.payment_intent']
          });
          
          // Encontrar a sessão que tem este payment_intent
          session = sessions.data.find(s => 
            s.payment_intent === paymentIntent.id || 
            (typeof s.payment_intent === 'object' && s.payment_intent?.id === paymentIntent.id)
          );
          
          if (session) {
            console.log('📦 Sessão encontrada nas recentes:', session.id);
          }
        }

        if (session) {
          console.log('📊 Status da sessão encontrada:', {
            id: session.id,
            payment_status: session.payment_status,
            status: session.status,
            metadata: session.metadata
          });
          
          if (session.payment_status === 'paid' || session.payment_status === 'complete') {
            await handleSuccessfulPayment(session);
            console.log('✅ Pagamento processado via payment_intent.succeeded');
          } else {
            console.log(`⏳ Sessão ainda não está paga. Status: ${session.payment_status}`);
          }
        } else {
          console.log('⚠️ Nenhuma sessão de checkout encontrada para este payment_intent');
          console.log('💡 Dica: O evento checkout.session.completed deve processar este pagamento');
        }
      } catch (error) {
        console.error('❌ Erro ao processar payment_intent:', error);
        if (error instanceof Error) {
          console.error('Mensagem:', error.message);
        }
      }
    } 
    else {
      console.log(`ℹ️ Evento ignorado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erro geral no webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleSuccessfulPayment(session: any) {
  console.log('🚀 Iniciando processamento de pagamento bem-sucedido...');
  
  // Log completo da sessão para debug
  console.log('📦 Sessão completa recebida:', {
    id: session.id,
    customer: session.customer,
    customer_email: session.customer_email,
    payment_intent: session.payment_intent,
    payment_status: session.payment_status,
    metadata: session.metadata,
    mode: session.mode,
    status: session.status
  });

  // Verificar se metadata existe
  if (!session.metadata || Object.keys(session.metadata).length === 0) {
    console.error('❌ ERRO CRÍTICO: Sessão não possui metadados!');
    console.error('Sessão completa (primeiros 2000 chars):', JSON.stringify(session, null, 2).substring(0, 2000));
    
    // Tentar buscar a sessão novamente do Stripe para garantir que temos os dados mais recentes
    try {
      console.log('🔄 Tentando buscar sessão novamente do Stripe...');
      const refreshedSession = await stripe.checkout.sessions.retrieve(session.id);
      console.log('📦 Sessão atualizada do Stripe:', {
        id: refreshedSession.id,
        metadata: refreshedSession.metadata,
        payment_status: refreshedSession.payment_status
      });
      
      if (refreshedSession.metadata && Object.keys(refreshedSession.metadata).length > 0) {
        session.metadata = refreshedSession.metadata;
        console.log('✅ Metadados recuperados da sessão atualizada');
      } else {
        throw new Error('Sessão não possui metadados mesmo após atualização');
      }
    } catch (refreshError) {
      console.error('❌ Erro ao atualizar sessão:', refreshError);
      throw new Error('Sessão não possui metadados');
    }
  }

  const {
    templateId,
    customerEmail,
    invitationId
  } = session.metadata || {};

  console.log('📋 Metadados extraídos da sessão:', { 
    templateId, 
    customerEmail, 
    invitationId,
    allMetadata: session.metadata,
    metadataKeys: Object.keys(session.metadata || {})
  });

  if (!invitationId) {
    console.error('❌ ERRO CRÍTICO: ID do convite não encontrado nos metadados da sessão');
    console.error('Metadados disponíveis:', JSON.stringify(session.metadata, null, 2));
    console.error('Tipo dos metadados:', typeof session.metadata);
    console.error('Chaves dos metadados:', Object.keys(session.metadata || {}));
    
    // Tentar buscar por stripeSessionId no banco como fallback
    console.log('🔍 Tentando buscar convite por stripeSessionId como fallback...');
    const invitationBySession = await prisma.invitation.findFirst({
      where: { stripeSessionId: session.id }
    });
    
    if (invitationBySession) {
      console.log('✅ Convite encontrado por stripeSessionId:', invitationBySession.id);
      // Usar este convite e continuar processamento
      const fallbackInvitationId = invitationBySession.id;
      console.log('🔄 Continuando processamento com invitationId do fallback:', fallbackInvitationId);
      // Continuar com o processamento usando o ID encontrado
      return handleSuccessfulPaymentWithInvitationId(session, fallbackInvitationId, customerEmail || session.customer_email);
    }
    
    throw new Error('ID do convite não encontrado nos metadados e não foi possível encontrar por stripeSessionId');
  }

  return handleSuccessfulPaymentWithInvitationId(session, invitationId, customerEmail || session.customer_email);
}

async function handleSuccessfulPaymentWithInvitationId(
  session: any, 
  invitationId: string, 
  customerEmail?: string
) {
  console.log('🔍 Buscando convite no banco de dados:', invitationId);

  // Buscar o convite existente
  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
    include: { images: true }
  });

  if (!invitation) {
    console.error(`❌ ERRO: Convite não encontrado no banco de dados: ${invitationId}`);
    throw new Error(`Convite não encontrado: ${invitationId}`);
  }

  console.log('✅ Convite encontrado no banco:', {
    id: invitation.id,
    slug: invitation.slug,
    groomName: invitation.groomName,
    brideName: invitation.brideName,
    email: invitation.email
  });
  
  console.log('📊 Status atual do convite:', {
    isActive: invitation.isActive,
    paymentStatus: invitation.paymentStatus,
    purchasedAt: invitation.purchasedAt,
    stripeSessionId: invitation.stripeSessionId
  });

  // Verificar se já foi pago (idempotência)
  if (invitation.isActive && invitation.paymentStatus === 'completed') {
    console.log('ℹ️ Convite já foi pago anteriormente. Pulando atualização.');
    console.log('📧 Enviando email novamente para garantir...');
    
    // Mesmo assim, enviar o email novamente
    const invitationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/convite/${invitation.slug}`;
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: [customerEmail || invitation.email],
        subject: `🎉 Seu convite interativo está pronto! - ${invitation.groomName} & ${invitation.brideName}`,
        react: EmailTemplate({
          groomName: invitation.groomName,
          brideName: invitation.brideName,
          invitationUrl
        })
      });
      console.log('✅ Email reenviado com sucesso');
    } catch (emailError) {
      console.error('❌ Erro ao reenviar email:', emailError);
    }
    return;
  }

  console.log('💾 Atualizando convite no banco de dados...');
  
  // Ativar o convite e atualizar dados do Stripe
  try {
    const updatedInvitation = await prisma.invitation.update({
      where: { id: invitationId },
      data: {
        isActive: true,
        stripeCustomerId: session.customer || invitation.stripeCustomerId,
        stripePaymentIntentId: session.payment_intent || invitation.stripePaymentIntentId,
        stripeSessionId: session.id,
        paymentStatus: 'completed',
        purchasedAt: new Date(),
      }
    });

    console.log('✅ Convite ativado e dados de compra salvos:', {
      id: updatedInvitation.id,
      isActive: updatedInvitation.isActive,
      paymentStatus: updatedInvitation.paymentStatus,
      purchasedAt: updatedInvitation.purchasedAt,
      stripeSessionId: updatedInvitation.stripeSessionId
    });

    // Gerar URL do convite usando o slug do convite atualizado
    const invitationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/convite/${updatedInvitation.slug}`;

    console.log('📧 Preparando envio de email de confirmação...');
    console.log('📮 Destinatário:', customerEmail || invitation.email);
    console.log('🔗 URL do convite:', invitationUrl);
    console.log('📝 Variáveis de ambiente:', {
      hasResendFromEmail: !!process.env.RESEND_FROM_EMAIL,
      hasBaseUrl: !!process.env.NEXT_PUBLIC_BASE_URL,
      resendFromEmail: process.env.RESEND_FROM_EMAIL,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL
    });

    // Enviar email de confirmação com o link do convite
    // IMPORTANTE: Não falhar o webhook se o email falhar - o convite já foi ativado
    try {
      console.log('📤 Enviando email via Resend...');
      const emailResult = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: [customerEmail || invitation.email],
        subject: `🎉 Seu convite interativo está pronto! - ${invitation.groomName} & ${invitation.brideName}`,
        react: EmailTemplate({
          groomName: invitation.groomName,
          brideName: invitation.brideName,
          invitationUrl
        })
      });
      console.log('✅ Email de confirmação enviado com sucesso!');
      console.log('📋 Resultado do envio:', JSON.stringify(emailResult, null, 2));
      console.log(`🎉 ✅ Processo completo! Convite ativado e email enviado: ${invitationUrl}`);
    } catch (emailError) {
      console.error('❌ ERRO ao enviar email de confirmação:', emailError);
      if (emailError instanceof Error) {
        console.error('Mensagem de erro:', emailError.message);
        console.error('Stack trace:', emailError.stack);
      }
      // Não falhar o webhook se o email falhar - o convite já foi ativado
      // Logar o erro mas continuar
      console.warn('⚠️ Email não foi enviado, mas o convite foi ativado com sucesso');
      console.log(`🎉 ✅ Convite ativado (email falhou): ${invitationUrl}`);
    }
  } catch (dbError) {
    console.error('❌ ERRO ao atualizar convite no banco:', dbError);
    throw dbError;
  }
}
