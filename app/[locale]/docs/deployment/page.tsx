import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function DeploymentPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.deployment' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{content('title')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('overview')}</h2>
        <p className="leading-7">
          MarketFlex está diseñado para ser desplegado fácilmente en servicios modernos de hospedaje, 
          especialmente Vercel, que ofrece un excelente soporte para aplicaciones Next.js. Esta guía 
          te ayudará a desplegar tu marketplace personalizado en un entorno de producción de manera 
          segura y eficiente.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('prerequisites')}</h2>
        <p className="leading-7">
          Antes de comenzar el proceso de despliegue, asegúrate de tener configurado lo siguiente:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Una cuenta en <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Vercel</a> (o en tu plataforma de despliegue preferida)</li>
          <li>Un proyecto configurado en <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Supabase</a> con las tablas y políticas necesarias</li>
          <li>Una cuenta de <a href="https://mercadopago.com.ar/developers" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MercadoPago</a> con las credenciales de API</li>
          <li>Un repositorio Git con tu versión personalizada de MarketFlex</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('preparingForDeployment')}</h2>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Configuración de entorno</h3>
          <p className="leading-7">
            Asegúrate de tener un archivo <code>.env.example</code> que liste todas las variables de entorno 
            requeridas sin valores sensibles. Las variables críticas incluyen:
          </p>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=

# URL de la aplicación
NEXT_PUBLIC_APP_URL=

# Configuración de correo (Resend)
RESEND_API_KEY=`}</code>
          </pre>
        </div>
        
        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Preparación del código</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Verifica que el archivo <code>next.config.js</code> esté correctamente configurado para producción</li>
            <li>Ejecuta <code>npm run build</code> localmente para asegurarte de que no hay errores de compilación</li>
            <li>Asegúrate de que todas las dependencias estén correctamente declaradas en <code>package.json</code></li>
            <li>Revisa que las rutas de API estén correctamente configuradas para producción</li>
          </ol>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('deployingToVercel')}</h2>
        <p className="leading-7">
          Vercel es la plataforma recomendada para desplegar MarketFlex debido a su excelente integración con Next.js.
        </p>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Proceso de despliegue</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Crea una cuenta o inicia sesión en <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Vercel</a></li>
            <li>Haz clic en &quot;New Project&quot; y selecciona tu repositorio de Git</li>
            <li>Si tu repositorio no aparece, puede que necesites importarlo o dar acceso a Vercel</li>
            <li>Configura tu proyecto:
              <ul className="list-disc pl-6 mt-2">
                <li>Framework Preset: <strong>Next.js</strong></li>
                <li>Root Directory: <strong>./</strong> (si tu proyecto está en la raíz)</li>
                <li>Build Command: <strong>next build</strong> (o tu comando personalizado)</li>
                <li>Output Directory: <strong>.next</strong> (predeterminado para Next.js)</li>
              </ul>
            </li>
            <li>En la sección &quot;Environment Variables&quot;, añade todas las variables de entorno necesarias</li>
            <li>Haz clic en &quot;Deploy&quot; para iniciar el despliegue</li>
          </ol>
        </div>
        
        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Configuración de dominio personalizado</h3>
          <p className="leading-7">
            Una vez desplegado, puedes configurar un dominio personalizado para tu marketplace:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>En el dashboard de Vercel, ve a tu proyecto y selecciona &quot;Settings&quot; → &quot;Domains&quot;</li>
            <li>Ingresa tu dominio personalizado y haz clic en &quot;Add&quot;</li>
            <li>Sigue las instrucciones para configurar los registros DNS adecuados</li>
            <li>Vercel proporcionará automáticamente un certificado SSL para tu dominio</li>
            <li>Actualiza la variable <code>NEXT_PUBLIC_APP_URL</code> con tu nuevo dominio</li>
          </ol>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('deployingToOtherPlatforms')}</h2>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Netlify</h3>
          <p className="leading-7">
            Netlify también ofrece buen soporte para aplicaciones Next.js:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Crea una cuenta en <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Netlify</a></li>
            <li>Haz clic en &quot;New site from Git&quot; y selecciona tu repositorio</li>
            <li>Configura las opciones de construcción:
              <ul className="list-disc pl-6 mt-2">
                <li>Build command: <code>next build</code></li>
                <li>Publish directory: <code>.next</code></li>
              </ul>
            </li>
            <li>Configura las variables de entorno necesarias</li>
            <li>Haz clic en &quot;Deploy site&quot;</li>
          </ol>
        </div>
        
        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Despliegue manual (VPS/Servidor propio)</h3>
          <p className="leading-7">
            Para servidores autogestionados, necesitarás configurar el entorno manualmente:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Instala Node.js (versión recomendada: 18.x o superior)</li>
            <li>Clona tu repositorio en el servidor</li>
            <li>Crea un archivo <code>.env.local</code> con todas las variables necesarias</li>
            <li>Ejecuta <code>npm install</code> para instalar las dependencias</li>
            <li>Ejecuta <code>npm run build</code> para construir la aplicación</li>
            <li>Para producción, se recomienda usar PM2 o un servicio similar:
              <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
                <code>{`# Instalar PM2
npm install -g pm2

# Iniciar la aplicación
pm2 start npm --name "marketflex" -- start

# Configurar para iniciar automáticamente al reiniciar
pm2 startup
pm2 save`}</code>
              </pre>
            </li>
            <li>Configura un servidor web (como Nginx) como proxy inverso</li>
          </ol>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('postDeploymentTasks')}</h2>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Configuración de webhooks</h3>
          <p className="leading-7">
            Después del despliegue, configura los webhooks para MercadoPago con tu URL de producción:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Accede al panel de desarrolladores de MercadoPago</li>
            <li>Configura la URL de webhook: <code>https://tu-dominio.com/api/webhooks/mercadopago</code></li>
            <li>Selecciona los eventos relevantes para tu aplicación</li>
          </ol>
        </div>
        
        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Verificación de funcionalidad</h3>
          <p className="leading-7">
            Después del despliegue, realiza pruebas completas del sistema:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Registro e inicio de sesión de usuarios</li>
            <li>Creación y consulta de listings</li>
            <li>Procesamiento de pagos con tarjetas de prueba</li>
            <li>Envío y recepción de mensajes entre usuarios</li>
            <li>Flujos de suscripción para vendedores</li>
            <li>Panel de administración y funciones de moderación</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('deploymentStrategy')}</h2>
        <p className="leading-7">
          Para un despliegue continuo y eficiente, considera implementar la siguiente estrategia:
        </p>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Entornos múltiples</h3>
          <p className="leading-7">
            Configura diferentes entornos para separar el desarrollo, las pruebas y la producción:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Desarrollo</strong>: Para trabajar localmente</li>
            <li><strong>Staging</strong>: Para probar cambios antes de publicarlos</li>
            <li><strong>Producción</strong>: El entorno público para usuarios finales</li>
          </ul>
          <p className="leading-7 mt-2">
            En Vercel, puedes configurar Preview Deployments para cada rama de tu repositorio.
          </p>
        </div>
        
        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Integración continua</h3>
          <p className="leading-7">
            Implementa pruebas automatizadas y despliegue continuo:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Configura GitHub Actions o similar para ejecutar pruebas en cada push</li>
            <li>Utiliza la integración de Vercel con GitHub para despliegues automáticos</li>
            <li>Implementa un sistema de revisión de código antes de permitir fusiones a main</li>
          </ol>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('monitoring')}</h2>
        <p className="leading-7">
          Mantén tu aplicación en producción funcionando sin problemas con estas herramientas de monitoreo:
        </p>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Herramientas recomendadas</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Vercel Analytics</strong>: Métricas de rendimiento y uso</li>
            <li><strong>Sentry</strong>: Monitoreo de errores y problemas en tiempo real</li>
            <li><strong>Uptime Robot</strong>: Monitoreo de disponibilidad y alertas</li>
            <li><strong>LogRocket</strong>: Grabación de sesiones para depuración</li>
          </ul>
        </div>
        
        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Configuración de alertas</h3>
          <p className="leading-7">
            Configura alertas para ser notificado cuando surjan problemas:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Alertas de caída del servidor o tiempos de respuesta lentos</li>
            <li>Notificaciones de errores frecuentes o críticos</li>
            <li>Alertas de uso de recursos (base de datos, almacenamiento)</li>
            <li>Monitoreo de transacciones fallidas</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('scaling')}</h2>
        <p className="leading-7">
          A medida que tu marketplace crezca, necesitarás escalar tu infraestructura:
        </p>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Escalado con Vercel</h3>
          <p className="leading-7">
            Vercel escala automáticamente tu aplicación, pero hay optimizaciones que puedes hacer:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Utiliza el plan Team o Enterprise para mayor capacidad y rendimiento</li>
            <li>Configura Edge Functions para reducir la latencia global</li>
            <li>Implementa estrategias de caché para contenido estático y API</li>
            <li>Configura Serverless Function Regions para optimizar según tu audiencia</li>
          </ul>
        </div>
        
        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Escalado de Supabase</h3>
          <p className="leading-7">
            Para manejar un mayor volumen de usuarios y datos:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Actualiza a un plan Pro o Enterprise de Supabase</li>
            <li>Optimiza consultas y añade índices para tablas con alto volumen</li>
            <li>Implementa estrategias de caché para consultas frecuentes</li>
            <li>Monitorea el rendimiento de la base de datos y ajusta según sea necesario</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('troubleshooting')}</h2>
        <p className="leading-7">
          Soluciones para problemas comunes de despliegue:
        </p>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Problemas comunes y soluciones</h3>
          <table className="min-w-full border-collapse border border-border mt-2">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2 text-left">Problema</th>
                <th className="border border-border p-2 text-left">Posible solución</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2">Error de construcción en Vercel</td>
                <td className="border border-border p-2">Verifica los logs de construcción, asegúrate de que todas las dependencias estén correctamente instaladas y las variables de entorno configuradas.</td>
              </tr>
              <tr>
                <td className="border border-border p-2">Problemas de conexión con Supabase</td>
                <td className="border border-border p-2">Verifica que las credenciales sean correctas y que las IP de Vercel no estén bloqueadas.</td>
              </tr>
              <tr>
                <td className="border border-border p-2">Webhooks de MercadoPago no funcionan</td>
                <td className="border border-border p-2">Asegúrate de que la URL sea accesible públicamente y que NEXT_PUBLIC_APP_URL esté configurado correctamente.</td>
              </tr>
              <tr>
                <td className="border border-border p-2">Error 500 en rutas de API</td>
                <td className="border border-border p-2">Revisa los logs de función serverless en Vercel y asegúrate de manejar adecuadamente las excepciones.</td>
              </tr>
              <tr>
                <td className="border border-border p-2">Problemas de rendimiento</td>
                <td className="border border-border p-2">Utiliza herramientas como Lighthouse y Vercel Analytics para identificar cuellos de botella.</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Depuración en producción</h3>
          <p className="leading-7">
            Para solucionar problemas en un entorno de producción:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Usa el panel de Vercel para ver logs de funciones serverless</li>
            <li>Implementa logging detallado para transacciones críticas</li>
            <li>Utiliza Sentry o herramientas similares para rastrear errores</li>
            <li>Configura un entorno de staging que refleje producción para reproducir problemas</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('securityInProduction')}</h2>
        <p className="leading-7">
          Recomendaciones para mantener tu aplicación segura en producción:
        </p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>HTTP Strict Transport Security (HSTS)</strong>: Asegúrate de que todas las conexiones usen HTTPS</li>
          <li><strong>Content Security Policy (CSP)</strong>: Configura encabezados para prevenir XSS</li>
          <li><strong>RLS en Supabase</strong>: Verifica que todas las tablas tengan políticas RLS adecuadas</li>
          <li><strong>Rotación de secretos</strong>: Cambia periódicamente tokens y claves de API</li>
          <li><strong>Actualizaciones regulares</strong>: Mantén todas las dependencias actualizadas</li>
          <li><strong>Backups</strong>: Configura backups regulares de tus datos en Supabase</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('bestPractices')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Configura un proceso de CI/CD para automatizar pruebas y despliegues</li>
          <li>Utiliza ramas de características (feature branches) y entornos de previsualización</li>
          <li>Implementa monitoreo desde el primer día de producción</li>
          <li>Documenta el proceso de despliegue para tu equipo</li>
          <li>Establece un plan de recuperación ante desastres</li>
          <li>Configura un proceso de revisión de código antes de fusionar con main</li>
          <li>Mantén separados los entornos de desarrollo y producción</li>
        </ul>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/integrations/supabase`} className="text-primary hover:underline">
          ← {t('supabase')}
        </Link>
        <Link href={`/${locale}/docs/faq`} className="text-primary hover:underline">
          {t('faq')} →
        </Link>
      </div>
    </div>
  );
} 