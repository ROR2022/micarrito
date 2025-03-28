import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const externalReference = searchParams.get('external_reference');
    
    // Verificar que se proporciona una referencia externa
    if (!externalReference) {
      return NextResponse.json(
        { error: 'Se requiere una external_reference para consultar la suscripción' },
        { status: 400 }
      );
    }

    // Verificar autenticación
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Debe estar autenticado para consultar una suscripción' },
        { status: 401 }
      );
    }

    // Obtener la suscripción desde Supabase
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*, subscription_plans(name, features)')
      .eq('external_reference', externalReference)
      .single();

    if (error) {
      console.error('Error al obtener la suscripción:', error);
      return NextResponse.json(
        { error: 'Error al obtener la suscripción' },
        { status: 500 }
      );
    }

    if (!subscription) {
      return NextResponse.json(
        { error: 'Suscripción no encontrada' },
        { status: 404 }
      );
    }

    // Verificar que el usuario actual es el dueño de la suscripción
    if (subscription.user_id !== session.user.id) {
      return NextResponse.json(
        { error: 'No tiene permiso para ver esta suscripción' },
        { status: 403 }
      );
    }

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Error al consultar la suscripción:', error);
    return NextResponse.json(
      { error: 'Error al consultar la suscripción' },
      { status: 500 }
    );
  }
} 