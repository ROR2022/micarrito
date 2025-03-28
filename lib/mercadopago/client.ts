import mercadopago from 'mercadopago';
import {
  MercadoPagoPreferenceRequest,
  MercadoPagoPreferenceResponse,
  MercadoPagoSubscriptionRequest,
  MercadoPagoSubscriptionResponse,
  MercadoPagoWebhookPayload
} from './types';

// Inicializamos MercadoPago una vez
export function initMercadoPago(): void {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  
  if (!accessToken) {
    throw new Error('MERCADOPAGO_ACCESS_TOKEN no está definido en las variables de entorno');
  }
  
  // La nueva forma de configurar MercadoPago
   new mercadopago({
    accessToken: accessToken
  });
}

// Inicializar al importar
try {
  initMercadoPago();
} catch (error) {
  console.error('Error al inicializar MercadoPago:', error);
  // No lanzamos el error para permitir que la aplicación arranque
  // incluso si las credenciales de MercadoPago no están configuradas
}

/**
 * Crea una preferencia de pago único en MercadoPago
 */
export async function createPreference(
  preferenceData: MercadoPagoPreferenceRequest
): Promise<MercadoPagoPreferenceResponse> {
  try {
    // Asegurarse que el notification_url esté configurado si no viene en la solicitud
    if (!preferenceData.notification_url) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      preferenceData.notification_url = `${baseUrl}/api/payments/webhook`;
    }
    
    const response = await (mercadopago as any).preferences.create(preferenceData);
    
    return {
      id: response.body.id,
      init_point: response.body.init_point,
      sandbox_init_point: response.body.sandbox_init_point
    };
  } catch (error) {
    console.error('Error al crear preferencia en MercadoPago:', error);
    throw new Error(`Error al crear preferencia: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
}

/**
 * Crea una suscripción en MercadoPago
 */
export async function createSubscription(
  subscriptionData: MercadoPagoSubscriptionRequest
): Promise<MercadoPagoSubscriptionResponse> {
  try {
    // Asegurarse que el notification_url esté configurado si no viene en la solicitud
    if (!subscriptionData.notification_url) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      subscriptionData.notification_url = `${baseUrl}/api/payments/webhook`;
    }
    
    const response = await (mercadopago as any).preapproval.create(subscriptionData);
    
    return {
      id: response.body.id,
      init_point: response.body.init_point,
      sandbox_init_point: response.body.sandbox_init_point,
      status: response.body.status,
      preapproval_plan_id: response.body.preapproval_plan_id
    };
  } catch (error) {
    console.error('Error al crear suscripción en MercadoPago:', error);
    throw new Error(`Error al crear suscripción: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
}

/**
 * Verifica que la firma del webhook sea válida
 * En una implementación real, deberías verificar la firma criptográfica
 */
export function verifyWebhookSignature(
  // Ignoramos por ahora los parámetros
  // eslint-disable-next-line no-unused-vars
  payload: MercadoPagoWebhookPayload,
  // eslint-disable-next-line no-unused-vars
  signature: string
): boolean {
  // Por ahora, asumimos que es válida para el desarrollo inicial
  return true;
} 