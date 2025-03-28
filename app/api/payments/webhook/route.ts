import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { verifyWebhookSignature } from '@/lib/mercadopago/client';
import { MercadoPagoWebhookPayload } from '@/lib/mercadopago/types';

export async function POST(request: NextRequest) {
  try {
    // Obtener la carga útil del webhook
    const payload = await request.json() as MercadoPagoWebhookPayload;
    
    // Verificar la firma (en producción, esto debería ser más robusto)
    const signature = request.headers.get('x-signature') || '';
    if (!verifyWebhookSignature(payload, signature)) {
      return NextResponse.json({ error: 'Firma inválida' }, { status: 401 });
    }
    
    // Procesar el evento según su tipo
    if (payload.type === 'payment') {
      await handlePaymentEvent(payload);
    } else if (payload.type === 'subscription') {
      await handleSubscriptionEvent(payload);
    } else {
      console.log(`Tipo de evento no manejado: ${payload.type}`);
    }
    
    // MercadoPago espera un status 200 para considerar la notificación como recibida
    return NextResponse.json({ status: 'ok' });
    
  } catch (error) {
    console.error('Error al procesar webhook de MercadoPago:', error);
    // Aún retornamos 200 para evitar reintentos innecesarios
    return NextResponse.json({ status: 'error', message: 'Error interno del servidor' });
  }
}

/**
 * Maneja eventos relacionados con pagos
 */
async function handlePaymentEvent(payload: MercadoPagoWebhookPayload) {
  try {
    const supabase = await createClient();
    
    // Obtener detalles del pago de MercadoPago
    // En una implementación real, llamaríamos a la API de MercadoPago para obtener los detalles
    // Por ahora, simplemente simulamos una actualización basada en el ID
    const paymentId = payload.data.id;
    
    // Buscar la transacción en nuestra base de datos
    const { data: transactions } = await supabase
      .from('transactions')
      .select('*')
      .eq('mercado_pago_id', paymentId)
      .maybeSingle();
    
    if (!transactions) {
      console.error(`No se encontró transacción para el pago ${paymentId}`);
      return;
    }
    
    // Actualizar el estado de la transacción
    await supabase
      .from('transactions')
      .update({
        status: 'completed', // En una implementación real, verificaríamos el estado real
        updated_at: new Date().toISOString()
      })
      .eq('mercado_pago_id', paymentId);
    
    console.log(`Transacción ${transactions.external_reference} actualizada a 'completed'`);
    
  } catch (error) {
    console.error('Error al manejar evento de pago:', error);
  }
}

/**
 * Maneja eventos relacionados con suscripciones
 */
async function handleSubscriptionEvent(payload: MercadoPagoWebhookPayload) {
  try {
    const supabase = await createClient();
    
    // Obtener detalles de la suscripción de MercadoPago
    // En una implementación real, llamaríamos a la API de MercadoPago para obtener los detalles
    const subscriptionId = payload.data.id;
    
    // Buscar la suscripción en nuestra base de datos
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('mercado_pago_id', subscriptionId)
      .maybeSingle();
    
    if (!subscription) {
      console.error(`No se encontró suscripción para el ID ${subscriptionId}`);
      return;
    }
    
    // Actualizar el estado de la suscripción (en una implementación real, verificaríamos el estado real)
    await supabase
      .from('subscriptions')
      .update({
        status: 'active', // O el estado real obtenido de MercadoPago
        updated_at: new Date().toISOString()
      })
      .eq('mercado_pago_id', subscriptionId);
    
    // Actualizar el rol del usuario si es necesario (por ejemplo, a un rol premium)
    if (subscription.user_id) {
      // Aquí podríamos actualizar los metadatos del usuario si fuera necesario
    }
    
    console.log(`Suscripción ${subscriptionId} actualizada a 'active'`);
    
  } catch (error) {
    console.error('Error al manejar evento de suscripción:', error);
  }
} 