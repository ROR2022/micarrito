import { NextRequest, NextResponse } from 'next/server';
import { createSubscription } from '@/lib/mercadopago/client';
import { MercadoPagoSubscriptionRequest } from '@/lib/mercadopago/types';
import { generateExternalReference } from '@/lib/mercadopago/utils';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    // Verificar si el usuario está autenticado
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'No estás autorizado para realizar esta acción' },
        { status: 401 }
      );
    }

    // Obtener y validar los datos de la solicitud
    const requestData = await request.json();
    
    // Validar datos mínimos necesarios
    if (!requestData.plan_id || !requestData.reason) {
      return NextResponse.json(
        { error: 'Se requiere ID del plan y motivo para crear una suscripción' },
        { status: 400 }
      );
    }
    
    // Crear un ID de referencia único para esta suscripción
    const externalReference = generateExternalReference('SUB');
    
    // Configurar la URL de retorno
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const back_url = `${baseUrl}/dashboard/subscriptions?external_reference=${externalReference}`;
    
    // Obtener detalles del plan desde nuestra base de datos (basado en el plan_id)
    const { data: planData } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', requestData.plan_id)
      .single();
    
    if (!planData) {
      return NextResponse.json(
        { error: 'Plan de suscripción no encontrado' },
        { status: 404 }
      );
    }
    
    // Preparar datos para MercadoPago
    const subscriptionData: MercadoPagoSubscriptionRequest = {
      preapproval_plan_id: planData.mercado_pago_plan_id,
      reason: requestData.reason || `Suscripción a ${planData.name}`,
      payer_email: user.email || 'unknown@email.com',
      auto_recurring: {
        frequency: planData.frequency || 1,
        frequency_type: planData.frequency_type || 'months',
        transaction_amount: planData.price,
        currency_id: planData.currency_id || 'ARS',
      },
      back_url: back_url,
      notification_url: `${baseUrl}/api/payments/webhook`,
    };
    
    // Crear la suscripción en MercadoPago
    const subscription = await createSubscription(subscriptionData);
    
    // Guardar la referencia en la base de datos para seguimiento
    await supabase.from('subscriptions').insert({
      external_reference: externalReference,
      user_id: user.id,
      plan_id: requestData.plan_id,
      amount: planData.price,
      currency: planData.currency_id || 'ARS',
      status: 'pending',
      mercado_pago_id: subscription.id,
      preapproval_plan_id: planData.mercado_pago_plan_id,
    });
    
    // Retornar la suscripción creada
    return NextResponse.json(subscription);
    
  } catch (error) {
    console.error('Error al crear suscripción:', error);
    return NextResponse.json(
      { error: 'Error al crear suscripción', details: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
} 