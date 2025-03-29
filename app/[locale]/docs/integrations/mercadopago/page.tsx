import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function MercadoPagoIntegrationPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.mercadopago' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{content('title')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('overview')}</h2>
        <p className="leading-7">
          MarketFlex incluye una integración completa con MercadoPago, la plataforma de pagos líder en Latinoamérica.
          Esta integración te permite procesar pagos y suscripciones, gestionar reembolsos y recibir notificaciones 
          de eventos de pago a través de webhooks.
        </p>
        <p className="leading-7">
          La integración está implementada mediante un patrón de adaptador que facilita modificar su comportamiento
          o reemplazarla por otro procesador de pagos si es necesario.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('prerequisites')}</h2>
        <p className="leading-7">
          Para utilizar la integración con MercadoPago, necesitas:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Una cuenta de MercadoPago (puedes crear una en <a href="https://www.mercadopago.com.ar/developers" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mercadopago.com</a>)</li>
          <li>Credenciales de API de MercadoPago (Access Token)</li>
          <li>Configurar las variables de entorno necesarias</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('configuration')}</h2>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Obteniendo credenciales</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Inicia sesión en tu cuenta de MercadoPago</li>
            <li>Ve a la sección de Desarrolladores</li>
            <li>Crea una aplicación para obtener las credenciales</li>
            <li>Copia el Access Token (asegúrate de usar el token de producción para entornos de producción y el token de prueba para desarrollo)</li>
          </ol>
        </div>

        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Configuración de variables de entorno</h3>
          <p className="leading-7">
            Configura las siguientes variables en tu archivo <code>.env.local</code>:
          </p>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`# Configuración de MercadoPago
MERCADOPAGO_ACCESS_TOKEN=TEST-1234567890abcdef1234567890abcdef
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=TEST-abcdef1234567890abcdef1234
NEXT_PUBLIC_APP_URL=http://localhost:3000  # URL base para webhooks`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('implementation')}</h2>
        <p className="leading-7">
          La integración con MercadoPago está implementada en el directorio <code>lib/mercadopago</code>
          y consiste en los siguientes archivos:
        </p>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Estructura de archivos</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><code>client.ts</code> - Cliente principal con métodos para crear preferencias y suscripciones</li>
            <li><code>types.ts</code> - Interfaces TypeScript para todos los objetos de MercadoPago</li>
            <li><code>utils.ts</code> - Funciones de utilidad para formatear datos</li>
          </ul>
        </div>

        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Inicialización del cliente</h3>
          <p className="leading-7">
            El cliente de MercadoPago se inicializa automáticamente al importar el módulo:
          </p>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`// lib/mercadopago/client.ts
import mercadopago from 'mercadopago';
import { /* ... tipos importados ... */ } from './types';

export function initMercadoPago(): void {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  
  if (!accessToken) {
    throw new Error('MERCADOPAGO_ACCESS_TOKEN no está definido en las variables de entorno');
  }
  
  new mercadopago({
    accessToken: accessToken
  });
}

// Inicializar al importar
try {
  initMercadoPago();
} catch (error) {
  console.error('Error al inicializar MercadoPago:', error);
}
`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('processingPayments')}</h2>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Creación de preferencias de pago</h3>
          <p className="leading-7">
            Para procesar un pago único, se crea una preferencia de pago con los detalles de la transacción:
          </p>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`// Ejemplo de uso en un controlador de API
import { createPreference } from '@/lib/mercadopago/client';

export async function POST(request: Request) {
  const body = await request.json();
  const { items, buyerId } = body;
  
  try {
    const preference = await createPreference({
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.price,
        currency_id: 'ARS', // o la moneda correspondiente
        description: item.description
      })),
      payer: {
        email: 'comprador@email.com'
      },
      back_urls: {
        success: \`\${process.env.NEXT_PUBLIC_APP_URL}/checkout/success\`,
        failure: \`\${process.env.NEXT_PUBLIC_APP_URL}/checkout/failure\`,
        pending: \`\${process.env.NEXT_PUBLIC_APP_URL}/checkout/pending\`
      },
      auto_return: 'approved',
      external_reference: \`order_\${Date.now()}\`
    });
    
    return Response.json({ 
      success: true, 
      preference_id: preference.id,
      checkout_url: preference.init_point
    });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Error al crear preferencia de pago' 
    }, { status: 500 });
  }
}`}</code>
          </pre>
        </div>

        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Integración del Checkout en el frontend</h3>
          <p className="leading-7">
            En el frontend, puedes utilizar el hook <code>useMercadoPago</code> para crear y procesar pagos:
          </p>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`// Componente de checkout
import { useMercadoPago } from '@/hooks/useMercadoPago';

function CheckoutComponent({ items }) {
  const { createPayment, isLoading, error } = useMercadoPago();
  
  const handleCheckout = async () => {
    const result = await createPayment({
      items,
      redirectToCheckout: true // Redireccionar automáticamente al checkout de MercadoPago
    });
    
    if (!result.success) {
      // Manejar el error
      console.error('Error al crear el pago:', result.error);
    }
  };
  
  return (
    <div>
      <h2>Resumen de la compra</h2>
      {/* Mostrar items */}
      <button 
        onClick={handleCheckout} 
        disabled={isLoading}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        {isLoading ? 'Procesando...' : 'Pagar ahora'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('subscriptions')}</h2>
        <p className="leading-7">
          MarketFlex también permite crear y gestionar suscripciones recurrentes con MercadoPago:
        </p>
        
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// Crear una suscripción
import { createSubscription } from '@/lib/mercadopago/client';

export async function POST(request: Request) {
  const body = await request.json();
  const { planId, userId, email } = body;
  
  try {
    const subscription = await createSubscription({
      preapproval_plan_id: planId,
      reason: 'Suscripción Premium',
      external_reference: \`user_\${userId}\`,
      payer_email: email,
      auto_recurring: {
        frequency: 1,
        frequency_type: 'months',
        transaction_amount: 999.99, // Monto en la moneda configurada
        currency_id: 'ARS'
      },
      back_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/subscriptions/callback\`
    });
    
    return Response.json({ 
      success: true, 
      subscription_id: subscription.id,
      init_point: subscription.init_point
    });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Error al crear suscripción' 
    }, { status: 500 });
  }
}`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('webhooks')}</h2>
        <p className="leading-7">
          Los webhooks permiten recibir notificaciones en tiempo real sobre eventos de pago, como pagos aprobados, 
          rechazados o cancelados. MarketFlex incluye un controlador de webhook para MercadoPago:
        </p>
        
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// app/api/webhooks/mercadopago/route.ts
import { verifyWebhookSignature } from '@/lib/mercadopago/client';
import { MercadoPagoWebhookPayload } from '@/lib/mercadopago/types';

export async function POST(request: Request) {
  const body: MercadoPagoWebhookPayload = await request.json();
  const signature = request.headers.get('x-signature') || '';
  
  // Verificar la firma del webhook (en producción)
  const isValid = verifyWebhookSignature(body, signature);
  
  if (!isValid) {
    return Response.json({ error: 'Firma inválida' }, { status: 401 });
  }
  
  // Procesar el evento según su tipo
  const { action, type } = body;
  
  if (type === 'payment' && action === 'payment.created') {
    const paymentId = body.data.id;
    
    // Aquí puedes actualizar el estado del pedido en tu base de datos
    // Por ejemplo, marcar un pedido como pagado
    
    console.log(\`Pago creado: \${paymentId}\`);
  }
  
  // Otros tipos de eventos: payment.updated, subscription.created, etc.
  
  // Siempre responder con éxito para que MercadoPago sepa que recibiste la notificación
  return Response.json({ success: true });
}`}</code>
        </pre>
        
        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Configuración de webhooks en MercadoPago</h3>
          <p className="leading-7">
            Para configurar webhooks en tu cuenta de MercadoPago:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Accede al panel de desarrolladores de MercadoPago</li>
            <li>Ve a la sección de Aplicaciones y selecciona tu aplicación</li>
            <li>En la sección de Webhooks, agrega una nueva URL de webhook</li>
            <li>Configura la URL como <code>https://tu-dominio.com/api/webhooks/mercadopago</code></li>
            <li>Selecciona los eventos que deseas recibir (pagos, suscripciones, etc.)</li>
            <li>Guarda la configuración</li>
          </ol>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('testing')}</h2>
        <p className="leading-7">
          MercadoPago proporciona un entorno de pruebas (sandbox) para probar tu integración sin realizar pagos reales:
        </p>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Tarjetas de prueba</h3>
          <p className="leading-7">
            Utiliza estas tarjetas para probar diferentes escenarios de pago:
          </p>
          <table className="min-w-full border-collapse border border-border mt-2">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2 text-left">Tipo</th>
                <th className="border border-border p-2 text-left">Número</th>
                <th className="border border-border p-2 text-left">CVV</th>
                <th className="border border-border p-2 text-left">Fecha Exp.</th>
                <th className="border border-border p-2 text-left">Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2">Mastercard</td>
                <td className="border border-border p-2">5031 7557 3453 0604</td>
                <td className="border border-border p-2">123</td>
                <td className="border border-border p-2">11/25</td>
                <td className="border border-border p-2">Aprobado</td>
              </tr>
              <tr>
                <td className="border border-border p-2">Visa</td>
                <td className="border border-border p-2">4509 9535 6623 3704</td>
                <td className="border border-border p-2">123</td>
                <td className="border border-border p-2">11/25</td>
                <td className="border border-border p-2">Aprobado</td>
              </tr>
              <tr>
                <td className="border border-border p-2">Mastercard</td>
                <td className="border border-border p-2">5031 7557 3453 0604</td>
                <td className="border border-border p-2">123</td>
                <td className="border border-border p-2">11/25</td>
                <td className="border border-border p-2">Pendiente</td>
              </tr>
              <tr>
                <td className="border border-border p-2">Visa</td>
                <td className="border border-border p-2">4509 9535 6623 3704</td>
                <td className="border border-border p-2">123</td>
                <td className="border border-border p-2">11/25</td>
                <td className="border border-border p-2">Rechazado</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Usuarios de prueba</h3>
          <p className="leading-7">
            Para probar escenarios completos, crea usuarios de prueba vendedor y comprador:
          </p>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`// Para crear usuarios de prueba (usando API de MercadoPago)
curl -X POST \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer TEST_YOUR_ACCESS_TOKEN" \\
"https://api.mercadopago.com/users/test_user" \\
-d '{"site_id":"MLA"}'`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('bestPractices')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Implementa un sistema de reintentos para las llamadas a la API de MercadoPago</li>
          <li>Almacena el estado de los pagos en tu base de datos y actualízalos mediante webhooks</li>
          <li>Implementa un mecanismo para reconciliar pagos en caso de problemas de comunicación</li>
          <li>Utiliza referencias externas (external_reference) para asociar los pagos con tus registros</li>
          <li>En producción, verifica siempre las firmas de los webhooks para prevenir fraudes</li>
          <li>Configura un registro detallado de todas las interacciones con MercadoPago para depuración</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('troubleshooting')}</h2>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Problemas comunes</h3>
          <table className="min-w-full border-collapse border border-border mt-2">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2 text-left">Problema</th>
                <th className="border border-border p-2 text-left">Posible solución</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2">Error de autenticación</td>
                <td className="border border-border p-2">Verifica que el Access Token sea válido y tenga los permisos correctos</td>
              </tr>
              <tr>
                <td className="border border-border p-2">No se reciben notificaciones webhook</td>
                <td className="border border-border p-2">Asegúrate de que la URL de webhook sea accesible públicamente y esté configurada correctamente</td>
              </tr>
              <tr>
                <td className="border border-border p-2">Error al crear preferencia</td>
                <td className="border border-border p-2">Verifica que todos los campos requeridos estén completos y que los montos sean válidos</td>
              </tr>
              <tr>
                <td className="border border-border p-2">No funciona en producción</td>
                <td className="border border-border p-2">Asegúrate de estar usando el Access Token de producción, no el de pruebas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('resources')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><a href="https://www.mercadopago.com.ar/developers/es/docs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Documentación oficial de MercadoPago</a></li>
          <li><a href="https://www.mercadopago.com.ar/developers/es/docs/checkout-api/landing" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">API de Checkout de MercadoPago</a></li>
          <li><a href="https://www.mercadopago.com.ar/developers/es/docs/subscriptions/landing" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">API de Suscripciones</a></li>
          <li><a href="https://www.mercadopago.com.ar/developers/es/docs/notifications/webhooks" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Documentación de Webhooks</a></li>
        </ul>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/integrations`} className="text-primary hover:underline">
          ← {t('integrations')}
        </Link>
        <Link href={`/${locale}/docs/integrations/supabase`} className="text-primary hover:underline">
          {t('supabase')} →
        </Link>
      </div>
    </div>
  );
} 