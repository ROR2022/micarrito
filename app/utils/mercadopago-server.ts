import { MercadoPagoConfig, Payment, Preference, PreApproval } from 'mercadopago';

// Verificamos que las variables de entorno estén disponibles
if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
  throw new Error('MERCADOPAGO_ACCESS_TOKEN is not defined');
}

// Configuración de MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export interface CreatePreferencePayload {
  items: Array<{
    id: string;
    title: string;
    description: string;
    quantity: number;
    currency_id: string;
    unit_price: number;
  }>;
  payer?: {
    email: string;
    name?: string;
    identification?: {
      type: string;
      number: string;
    };
  };
  back_urls?: {
    success: string;
    failure: string;
    pending: string;
  };
  auto_return?: string;
  external_reference: string;
  notification_url?: string;
}

export interface CreateSubscriptionPayload {
  preapproval_plan_id?: string;
  reason: string;
  external_reference: string;
  payer_email: string;
  auto_recurring: {
    frequency: number;
    frequency_type: string;
    transaction_amount: number;
    currency_id: string;
  };
  back_url: string;
  status?: string;
}

// Crear preferencia de pago
export const createPreference = async (data: CreatePreferencePayload) => {
  try {
    // Configurar URLs de retorno si no están especificadas
    if (!data.back_urls) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      data.back_urls = {
        success: `${baseUrl}/checkout/success`,
        failure: `${baseUrl}/checkout/failure`,
        pending: `${baseUrl}/checkout/pending`,
      };
    }

    // Configurar URL de notificaciones si no está especificada
    if (!data.notification_url && process.env.MERCADOPAGO_WEBHOOK_URL) {
      data.notification_url = process.env.MERCADOPAGO_WEBHOOK_URL;
    }

    // Crear preferencia
    const preference = new Preference(client);
    const response = await preference.create({ body: data });

    return {
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
    };
  } catch (error) {
    console.error('Error creating preference:', error);
    throw error;
  }
};

// Obtener información de un pago
export const getPaymentInfo = async (paymentId: string) => {
  try {
    const payment = new Payment(client);
    return await payment.get({ id: paymentId });
  } catch (error) {
    console.error('Error getting payment info:', error);
    throw error;
  }
};

// Crear suscripción
export const createSubscription = async (data: CreateSubscriptionPayload) => {
  console.log('mercadopago-server DATA create subscription:...', data);
  /**
  
  mercadopago-server DATA create subscription:... {
  reason: 'Vendedor Básico',
  external_reference: '719fa422-3032-41b2-a0ec-0f78b33ced5e',
  payer_email: 'hernandeleonardo846@gmail.com',
  auto_recurring: {
    frequency: 1,
    frequency_type: 'months',
    transaction_amount: 19.99,
    currency_id: 'USD'
  },
  back_url: 'https://5530-2806-104e-b-1dd6-7df1-4026-c9d7-943.ngrok-free.app/checkout/success'
}


   */
  try {
    const subscription = await new PreApproval(client).create({
      body: {
        back_url: data.back_url || 'http://localhost:3000',
        reason: data.reason,
        payer_email: data.payer_email,
        status: 'pending',
        auto_recurring: {
          frequency: data.auto_recurring.frequency,
          frequency_type: data.auto_recurring.frequency_type,
          transaction_amount: data.auto_recurring.transaction_amount,
          currency_id: data.auto_recurring.currency_id,
        },
      },
    });
    if (!subscription) {
      console.error('Error mercadopago-server create subscription:...', subscription);
      throw new Error(`Failed to create subscription: ${JSON.stringify(subscription)}`);
    }

    //console.log('mercadopago-server create subscription:...', subscription);
    return subscription;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};
export const createSubscriptionOld = async (data: CreateSubscriptionPayload) => {
  try {
    // URL base para las notificaciones y redirects
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Crear la suscripción
    const subscription = await fetch('https://api.mercadopago.com/preapproval', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        preapproval_plan_id: data.preapproval_plan_id,
        reason: data.reason,
        external_reference: data.external_reference,
        payer_email: data.payer_email,
        back_url: data.back_url || `${baseUrl}/subscription/callback`,
        status: data.status || 'pending',
        notification_url:
          process.env.MERCADOPAGO_WEBHOOK_URL || `${baseUrl}/api/webhooks/mercadopago`,
      }),
    });

    if (!subscription.ok) {
      const errorData = await subscription.json();
      throw new Error(`Failed to create subscription: ${JSON.stringify(errorData)}`);
    }

    return await subscription.json();
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

// Obtener información de una suscripción
export const getSubscriptionInfo = async (subscriptionId: string) => {
  try {
    const response = await fetch(`https://api.mercadopago.com/preapproval/${subscriptionId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to get subscription info: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting subscription info:', error);
    throw error;
  }
};

// Cancelar una suscripción
export const cancelSubscription = async (subscriptionId: string) => {
  try {
    const response = await fetch(`https://api.mercadopago.com/preapproval/${subscriptionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        status: 'cancelled',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to cancel subscription: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw error;
  }
};
