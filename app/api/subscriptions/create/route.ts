import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createSubscription } from '@/app/utils/mercadopago-server';
//import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Verificar autenticación
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Obtener datos del cuerpo de la solicitud
    const data = await request.json();
    const { 
      plan_id, 
      price, 
      interval, 
      external_reference, 
      currency_id,
      frequency,
      frequency_type 
    } = data;

    // Validar datos
    if (!plan_id || !price || !external_reference || !currency_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Obtener información del usuario para el email
    const { data: profile } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', user.id)
      .single();

    const email = profile?.email || user.email;
    
    if (!email) {
      return NextResponse.json({ error: 'User email not found' }, { status: 400 });
    }

    // Obtener detalles del plan
    const { data: plan } = await supabase
      .from('subscription_plans')
      .select('name, description')
      .eq('id', plan_id)
      .single();

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    // Crear una preferencia de suscripción en MercadoPago
    const subscriptionData = {
      reason: plan.name,
      external_reference: external_reference,
      payer_email: email,
      auto_recurring: {
        frequency: frequency || (interval === 'yearly' ? 12 : 1),
        frequency_type: frequency_type || 'months',
        transaction_amount: price,
        currency_id: currency_id
      },
      back_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    };

    // Llamar a la función de MercadoPago
    const mpResponse = await createSubscription(subscriptionData);

    // Actualizar la suscripción en la base de datos con el ID de MercadoPago
    await supabase
      .from('subscriptions')
      .update({
        mercado_pago_id: mpResponse.id,
        updated_at: new Date().toISOString()
      })
      .eq('external_reference', external_reference);

    // Devolver los datos necesarios para redireccionar al usuario
    return NextResponse.json({
      id: mpResponse.id,
      init_point: mpResponse.init_point,
      external_reference: external_reference
    });

  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 