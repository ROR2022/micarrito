import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getPaymentInfo, getSubscriptionInfo } from '@/app/utils/mercadopago-server';

/**
 * Procesa las notificaciones de pagos y suscripciones de MercadoPago.
 * Este endpoint recibe notificaciones de MercadoPago cuando se producen cambios en los pagos/suscripciones.
 * Documentación: https://www.mercadopago.com.ar/developers/es/docs/checkout-api/webhooks
 */
export async function POST(request: NextRequest) {
  console.log('⚡ Entrando al endpoint de webhooks de MercadoPago');
  
  try {
    const supabase = await createClient();
    
    // Leer el cuerpo de la notificación
    const payload = await request.json();
    console.log('⚡ Webhook de MercadoPago recibido:', JSON.stringify(payload));

    // Validar el tipo de notificación
    if (!payload?.type || !payload?.data) {
      return NextResponse.json(
        { error: 'Payload inválido' },
        { status: 400 }
      );
    }

    const { type, data } = payload;

    // Procesar según el tipo de notificación
    if (type === 'payment') {
      return await handlePaymentNotification(data.id, supabase);
    } else if (type === 'subscription_preapproval') {
      return await handleSubscriptionNotification(data.id, supabase);
    }

    // Tipo de notificación no soportado
    return NextResponse.json(
      { error: 'Tipo de notificación no soportado' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error procesando webhook de MercadoPago:', error);
    return NextResponse.json(
      { error: 'Error procesando webhook' },
      { status: 500 }
    );
  }
}

/**
 * Procesa una notificación de pago
 */
async function handlePaymentNotification(paymentId: string, supabase: any) {
  // Obtener información del pago desde MercadoPago
  const paymentInfo = await getPaymentInfo(paymentId);
  
  if (!paymentInfo) {
    return NextResponse.json(
      { error: 'No se pudo obtener información del pago' },
      { status: 400 }
    );
  }

  // Extraer la información necesaria
  const externalReference = paymentInfo.external_reference;
  const status = mapPaymentStatus(paymentInfo.status || '');

  // Actualizar la transacción en Supabase
  const { error } = await supabase
    .from('transactions')
    .update({
      status,
      mercado_pago_id: paymentId,
      updated_at: new Date().toISOString()
    })
    .eq('external_reference', externalReference);

  if (error) {
    console.error('Error actualizando transacción:', error);
    return NextResponse.json(
      { error: 'Error actualizando transacción' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

/**
 * Procesa una notificación de suscripción
 */
async function handleSubscriptionNotification(subscriptionId: string, supabase: any) {
  // Obtener información de la suscripción desde MercadoPago
  const subscriptionInfo = await getSubscriptionInfo(subscriptionId);
  
  if (!subscriptionInfo) {
    return NextResponse.json(
      { error: 'No se pudo obtener información de la suscripción' },
      { status: 400 }
    );
  }

  // Extraer la información necesaria
  const externalReference = subscriptionInfo.external_reference;
  const status = mapSubscriptionStatus(subscriptionInfo.status);
  
  // Actualizar la suscripción en Supabase
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status,
      mercado_pago_id: subscriptionId,
      updated_at: new Date().toISOString(),
      start_date: subscriptionInfo.start_date ? new Date(subscriptionInfo.start_date).toISOString() : null,
      end_date: subscriptionInfo.end_date ? new Date(subscriptionInfo.end_date).toISOString() : null
    })
    .eq('external_reference', externalReference);

  if (error) {
    console.error('Error actualizando suscripción:', error);
    return NextResponse.json(
      { error: 'Error actualizando suscripción' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

/**
 * Mapea los estados de pago de MercadoPago a nuestros estados internos
 */
function mapPaymentStatus(mpStatus: string): string {
  const statusMap: Record<string, string> = {
    'approved': 'completed',
    'authorized': 'pending',
    'in_process': 'processing',
    'in_mediation': 'disputed',
    'rejected': 'failed',
    'cancelled': 'cancelled',
    'refunded': 'refunded',
    'charged_back': 'charged_back'
  };

  return statusMap[mpStatus] || 'pending';
}

/**
 * Mapea los estados de suscripción de MercadoPago a nuestros estados internos
 */
function mapSubscriptionStatus(mpStatus: string): string {
  const statusMap: Record<string, string> = {
    'authorized': 'active',
    'paused': 'paused',
    'cancelled': 'cancelled',
    'pending': 'pending'
  };

  return statusMap[mpStatus] || 'pending';
} 