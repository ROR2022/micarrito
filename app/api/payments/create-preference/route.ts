import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createPreference } from '@/app/utils/mercadopago-server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    // Inicializar el cliente de Supabase (await necesario)
    const supabase = await createClient();
    const { items, payer } = await request.json();
    
    // Verificar que la solicitud incluye ítems
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Se requiere al menos un ítem para crear un pago' },
        { status: 400 }
      );
    }

    // Verificar autenticación
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Debe estar autenticado para crear un pago' },
        { status: 401 }
      );
    }

    // Generar referencia externa única para esta transacción
    const externalReference = uuidv4();
    
    // Preparar payload para MercadoPago
    const preferenceData = {
      items,
      payer: payer || {
        email: session.user.email || '',
      },
      external_reference: externalReference,
    };

    // Crear preferencia en MercadoPago
    const preference = await createPreference(preferenceData);

    // Calcular monto total de la transacción
    const totalAmount = items.reduce(
      (sum, item) => sum + item.unit_price * item.quantity,
      0
    );

    // Registrar la transacción en la base de datos
    const { data: transaction, error } = await supabase
      .from('transactions')
      .insert({
        user_id: session.user.id,
        external_reference: externalReference,
        amount: totalAmount,
        currency: items[0].currency_id || 'ARS',
        status: 'pending',
        items,
      })
      .select()
      .single();

    if (error) {
      console.error('Error al registrar la transacción:', error);
      return NextResponse.json(
        { error: 'Error al registrar la transacción' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      preference_id: preference.id,
      init_point: preference.init_point,
      sandbox_init_point: preference.sandbox_init_point,
      transaction_id: transaction.id,
      external_reference: externalReference,
    });
  } catch (error) {
    console.error('Error al crear preferencia de pago:', error);
    return NextResponse.json(
      { error: 'Error al crear preferencia de pago' },
      { status: 500 }
    );
  }
} 