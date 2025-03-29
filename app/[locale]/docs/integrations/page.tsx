import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function IntegrationsPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.integrations' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{content('title')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('overview')}</h2>
        <p className="leading-7">
          MarketFlex integra servicios externos para proporcionar funcionalidades esenciales como pagos, 
          autenticación y almacenamiento de datos. Estas integraciones están diseñadas para ser modulares
          y personalizables, permitiéndote modificar o reemplazar cualquier integración según tus necesidades.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-semibold mb-2">{t('mercadopago')}</h2>
          <p className="mb-4">
            Integración completa con MercadoPago para procesar pagos y suscripciones en tu marketplace.
            Incluye implementación de preferencias de pago, suscripciones y manejo de webhooks.
          </p>
          <Link 
            href={`/${locale}/docs/integrations/mercadopago`} 
            className="text-primary hover:underline"
          >
            Explorar integración con MercadoPago →
          </Link>
        </div>

        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-semibold mb-2">{t('supabase')}</h2>
          <p className="mb-4">
            Implementación detallada de Supabase para autenticación, base de datos y almacenamiento.
            Incluye configuración de políticas RLS, esquemas de base de datos y manejo de sesiones.
          </p>
          <Link 
            href={`/${locale}/docs/integrations/supabase`} 
            className="text-primary hover:underline"
          >
            Explorar integración con Supabase →
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('implementationStrategy')}</h2>
        <p className="leading-7">
          MarketFlex utiliza un patrón de adaptador para las integraciones externas, lo que facilita:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Cambiar proveedores de servicios con modificaciones mínimas al código de la aplicación</li>
          <li>Personalizar el comportamiento de cada integración</li>
          <li>Probar la aplicación mediante implementaciones simuladas (mocks)</li>
          <li>Agregar nuevas integraciones siguiendo patrones consistentes</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('configurationManagement')}</h2>
        <p className="leading-7">
          La configuración de las integraciones se gestiona mediante variables de entorno y archivos de 
          configuración separados. Esto permite:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Mantener información sensible fuera del código</li>
          <li>Configurar diferentes entornos (desarrollo, pruebas, producción)</li>
          <li>Facilitar la colaboración en equipos sin compartir credenciales</li>
        </ul>
        
        <div className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`# Ejemplo de archivo .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
MERCADOPAGO_ACCESS_TOKEN=your-mercadopago-access-token
# Otras variables de configuración...`}</code>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('extendingIntegrations')}</h2>
        <p className="leading-7">
          Para extender o reemplazar cualquier integración, sigue estos pasos:
        </p>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">1. Identifica los puntos de interacción</h3>
          <p className="leading-7">
            Examina cómo se utiliza la integración actual en el código, especialmente en los hooks y 
            controladores de API.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">2. Implementa un nuevo adaptador</h3>
          <p className="leading-7">
            Crea un nuevo módulo que implemente la misma interfaz que la integración existente.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">3. Actualiza la configuración</h3>
          <p className="leading-7">
            Modifica las variables de entorno y/o archivos de configuración para usar tu nueva implementación.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">4. Prueba exhaustivamente</h3>
          <p className="leading-7">
            Verifica que todos los flujos de trabajo que utilizan la integración sigan funcionando correctamente.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('additionalIntegrations')}</h2>
        <p className="leading-7">
          Aunque MarketFlex viene con integraciones preconfiguradas para MercadoPago y Supabase, 
          su arquitectura permite añadir fácilmente otras integraciones populares:
        </p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Procesadores de pago:</strong> Stripe, PayPal, Wompi</li>
          <li><strong>Almacenamiento:</strong> AWS S3, Google Cloud Storage, Cloudinary</li>
          <li><strong>Autenticación:</strong> Auth0, Firebase Auth, Amazon Cognito</li>
          <li><strong>Análisis:</strong> Google Analytics, Hotjar, Amplitude</li>
          <li><strong>Comunicación:</strong> SendGrid, Twilio, Mailchimp</li>
        </ul>
        
        <p className="leading-7">
          Las guías específicas para implementar estas integraciones adicionales están disponibles para 
          suscriptores del plan Developer y Enterprise.
        </p>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/development/hooks`} className="text-primary hover:underline">
          ← {t('hooks')}
        </Link>
        <Link href={`/${locale}/docs/integrations/mercadopago`} className="text-primary hover:underline">
          {t('mercadopago')} →
        </Link>
      </div>
    </div>
  );
} 