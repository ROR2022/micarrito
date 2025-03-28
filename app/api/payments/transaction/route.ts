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
        { error: 'Se requiere una external_reference para consultar la transacción' },
        { status: 400 }
      );
    }

    // Verificar autenticación
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Debe estar autenticado para consultar una transacción' },
        { status: 401 }
      );
    }

    // Obtener la transacción desde Supabase
    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('external_reference', externalReference)
      .single();

    if (error) {
      console.error('Error al obtener la transacción:', error);
      return NextResponse.json(
        { error: 'Error al obtener la transacción' },
        { status: 500 }
      );
    }

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transacción no encontrada' },
        { status: 404 }
      );
    }

    // Verificar que el usuario actual es el dueño de la transacción
    if (transaction.user_id !== session.user.id) {
      return NextResponse.json(
        { error: 'No tiene permiso para ver esta transacción' },
        { status: 403 }
      );
    }

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error al consultar la transacción:', error);
    return NextResponse.json(
      { error: 'Error al consultar la transacción' },
      { status: 500 }
    );
  }
} 