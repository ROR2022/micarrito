import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function FAQPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.faq' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{content('title')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('general')}</h2>
        
        <div className="space-y-6">
          {/* General Question 1 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('whatIs')}</h3>
            <p className="leading-7">
              MarketFlex es un boilerplate SaaS para crear marketplaces personalizados utilizando tecnologías modernas como Next.js, Supabase y MercadoPago. Está diseñado para ser flexible y adaptable a diferentes nichos de marketplace, como automotriz, inmobiliario o servicios, sin necesidad de grandes modificaciones en la arquitectura base.
            </p>
          </div>
          
          {/* General Question 2 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('techStack')}</h3>
            <p className="leading-7">
              MarketFlex utiliza las siguientes tecnologías principales:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Next.js</strong>: Framework de React para el frontend y backend</li>
              <li><strong>TypeScript</strong>: Para tipado estático y mejor mantenibilidad</li>
              <li><strong>Supabase</strong>: Plataforma que proporciona autenticación, base de datos PostgreSQL, almacenamiento y realtime subscriptions</li>
              <li><strong>Shadcn/UI</strong>: Componentes de UI accesibles y personalizables</li>
              <li><strong>TailwindCSS</strong>: Framework de CSS utilitario</li>
              <li><strong>MercadoPago</strong>: Para procesamiento de pagos y suscripciones</li>
              <li><strong>next-intl</strong>: Para internacionalización</li>
              <li><strong>next-themes</strong>: Para soporte de temas (claro/oscuro)</li>
            </ul>
          </div>
          
          {/* General Question 3 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('whyUse')}</h3>
            <p className="leading-7">
              MarketFlex ofrece varias ventajas para desarrolladores que quieren crear un marketplace:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Ahorro de tiempo</strong>: No necesitas construir desde cero la arquitectura básica de un marketplace</li>
              <li><strong>Flexibilidad</strong>: Campos dinámicos para diferentes nichos sin modificar el código base</li>
              <li><strong>Integración de pagos</strong>: Implementación completa con MercadoPago para LatAm</li>
              <li><strong>Arquitectura moderna</strong>: Utiliza las mejores prácticas y tecnologías actuales</li>
              <li><strong>Seguridad incorporada</strong>: Políticas RLS de Supabase y manejo seguro de autenticación</li>
              <li><strong>Multilenguaje y multitemas</strong>: Soporte para internacionalización y temas visuales</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('installation')}</h2>
        
        <div className="space-y-6">
          {/* Installation Question 1 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('systemRequirements')}</h3>
            <p className="leading-7">
              Para ejecutar MarketFlex, necesitas:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Node.js 18.x o superior</li>
              <li>npm 8.x o superior (o Yarn/pnpm)</li>
              <li>Cuenta de Supabase</li>
              <li>Cuenta de MercadoPago (para funcionalidades de pago)</li>
              <li>Git</li>
            </ul>
          </div>
          
          {/* Installation Question 2 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('installSteps')}</h3>
            <p className="leading-7">
              Los pasos básicos para instalar y ejecutar MarketFlex son:
            </p>
            <ol className="list-decimal pl-6 space-y-1 mt-2">
              <li>Clona el repositorio: <code>git clone https://github.com/tu-usuario/marketflex.git</code></li>
              <li>Instala las dependencias: <code>npm install</code></li>
              <li>Copia el archivo <code>.env.example</code> a <code>.env.local</code> y configura las variables de entorno</li>
              <li>Ejecuta las migraciones de Supabase</li>
              <li>Inicia el servidor de desarrollo: <code>npm run dev</code></li>
            </ol>
            <p className="leading-7 mt-2">
              Para instrucciones más detalladas, consulta la <Link href={`/${locale}/docs/development`} className="text-primary hover:underline">Guía de Desarrollo</Link>.
            </p>
          </div>
          
          {/* Installation Question 3 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('envVars')}</h3>
            <p className="leading-7">
              Las variables de entorno esenciales que debes configurar son:
            </p>
            <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
              <code>{`# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=your-access-token
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=your-public-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Opcional: Email (Resend)
RESEND_API_KEY=your-resend-api-key`}</code>
            </pre>
            <p className="leading-7 mt-2">
              Consulta la <Link href={`/${locale}/docs/deployment`} className="text-primary hover:underline">Guía de Despliegue</Link> para más detalles sobre las variables en producción.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('customization')}</h2>
        
        <div className="space-y-6">
          {/* Customization Question 1 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('customizeTheme')}</h3>
            <p className="leading-7">
              Para personalizar el tema visual de MarketFlex:
            </p>
            <ol className="list-decimal pl-6 space-y-1 mt-2">
              <li>Modifica los colores en <code>tailwind.config.js</code> para cambiar la paleta general</li>
              <li>Usa <code>next-themes</code> para configurar temas claros/oscuros o personalizados</li>
              <li>Personaliza componentes individuales en la carpeta <code>components/ui</code></li>
              <li>Ajusta estilos globales en <code>app/globals.css</code></li>
            </ol>
            <p className="leading-7 mt-2">
              Para instrucciones detalladas, consulta la <Link href={`/${locale}/docs/customization/styling`} className="text-primary hover:underline">Guía de Estilos</Link>.
            </p>
          </div>
          
          {/* Customization Question 2 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('addNewNiche')}</h3>
            <p className="leading-7">
              Para adaptar MarketFlex a un nuevo nicho (por ejemplo, de inmobiliario a servicios):
            </p>
            <ol className="list-decimal pl-6 space-y-1 mt-2">
              <li>Define nuevas categorías en la base de datos</li>
              <li>Configura campos personalizados para listings en <code>listing_configurations</code></li>
              <li>Adapta los formularios y filtros para utilizar estos campos</li>
              <li>Actualiza los componentes de visualización para mostrar adecuadamente los datos específicos</li>
              <li>Personaliza los flujos de transacción si es necesario</li>
            </ol>
            <p className="leading-7 mt-2">
              MarketFlex utiliza campos <code>JSONB</code> para almacenar datos específicos del nicho, lo que permite añadir campos sin modificar el esquema de la base de datos.
            </p>
          </div>
          
          {/* Customization Question 3 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('changeCurrency')}</h3>
            <p className="leading-7">
              Para cambiar la moneda predeterminada o añadir soporte multi-moneda:
            </p>
            <ol className="list-decimal pl-6 space-y-1 mt-2">
              <li>Actualiza la configuración predeterminada en la tabla <code>configurations</code> de la base de datos</li>
              <li>Modifica las funciones de formateo de precios en <code>lib/utils.ts</code></li>
              <li>Actualiza los formularios para incluir selección de moneda si es necesario</li>
              <li>Configura MercadoPago para aceptar la nueva moneda (asegúrate de que esté soportada)</li>
            </ol>
            <p className="leading-7 mt-2">
              Recuerda que MercadoPago tiene restricciones sobre las monedas aceptadas según el país.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('payment')}</h2>
        
        <div className="space-y-6">
          {/* Payment Question 1 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('mercadopagoAlternative')}</h3>
            <p className="leading-7">
              Sí, puedes reemplazar MercadoPago por otro procesador de pagos como Stripe o PayPal:
            </p>
            <ol className="list-decimal pl-6 space-y-1 mt-2">
              <li>Crea un nuevo adaptador en <code>lib/[tu-procesador]</code> siguiendo el patrón de <code>lib/mercadopago</code></li>
              <li>Implementa funciones equivalentes para crear pagos, suscripciones y verificar webhooks</li>
              <li>Actualiza los hooks y componentes de frontend para usar el nuevo adaptador</li>
              <li>Configura las rutas de webhook para el nuevo procesador</li>
            </ol>
            <p className="leading-7 mt-2">
              La arquitectura modular de MarketFlex facilita el reemplazo de procesadores de pago sin afectar otras partes del sistema.
            </p>
          </div>
          
          {/* Payment Question 2 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('mercadopagoTesting')}</h3>
            <p className="leading-7">
              Para probar pagos con MercadoPago sin realizar transacciones reales:
            </p>
            <ol className="list-decimal pl-6 space-y-1 mt-2">
              <li>Usa el modo sandbox de MercadoPago con credenciales de prueba</li>
              <li>Utiliza las tarjetas de prueba proporcionadas por MercadoPago:
                <ul className="list-disc pl-6 mt-1">
                  <li>Mastercard: 5031 7557 3453 0604</li>
                  <li>Visa: 4509 9535 6623 3704</li>
                  <li>American Express: 3711 803032 57522</li>
                </ul>
              </li>
              <li>Para probar distintos resultados (aprobado, rechazado, pendiente), usa los códigos de seguridad específicos que proporciona MercadoPago en su documentación</li>
              <li>Implementa un webhook de prueba con herramientas como ngrok para recibir notificaciones</li>
            </ol>
            <p className="leading-7 mt-2">
              Consulta la <Link href={`/${locale}/docs/integrations/mercadopago`} className="text-primary hover:underline">documentación de MercadoPago</Link> para más detalles sobre pruebas.
            </p>
          </div>
          
          {/* Payment Question 3 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('commissionModel')}</h3>
            <p className="leading-7">
              Para implementar un modelo de comisiones por transacción:
            </p>
            <ol className="list-decimal pl-6 space-y-1 mt-2">
              <li>Configura el porcentaje de comisión en la tabla <code>configurations</code></li>
              <li>En el controlador de transacciones, calcula la comisión al crear la transacción</li>
              <li>Almacena tanto el valor total como la comisión en la tabla <code>transactions</code></li>
              <li>Implementa lógica para transferir solo el monto neto (después de comisión) al vendedor</li>
              <li>Añade informes financieros para seguimiento de comisiones</li>
            </ol>
            <p className="leading-7 mt-2">
              MarketFlex incluye hooks y utilidades para facilitar el cálculo y seguimiento de comisiones.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('database')}</h2>
        
        <div className="space-y-6">
          {/* Database Question 1 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('migrateExisting')}</h3>
            <p className="leading-7">
              Para migrar datos existentes a MarketFlex:
            </p>
            <ol className="list-decimal pl-6 space-y-1 mt-2">
              <li>Analiza el esquema actual de tu base de datos y mapea campos a las tablas de MarketFlex</li>
              <li>Utiliza herramientas de Supabase para importar datos (como pg_dump/pg_restore o la API REST)</li>
              <li>Escribe scripts de migración personalizados para transformar datos si es necesario</li>
              <li>Migra usuarios y hashes de contraseñas a través de la API de Auth de Supabase</li>
              <li>Actualiza referencias y relaciones entre tablas</li>
            </ol>
            <p className="leading-7 mt-2">
              Es recomendable crear un entorno de prueba para verificar la migración antes de ejecutarla en producción.
            </p>
          </div>
          
          {/* Database Question 2 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('addNewTables')}</h3>
            <p className="leading-7">
              Para añadir nuevas tablas o campos a la base de datos:
            </p>
            <ol className="list-decimal pl-6 space-y-1 mt-2">
              <li>Crea una nueva migración usando la CLI de Supabase: <code>supabase migration new nombre_migracion</code></li>
              <li>Edita el archivo SQL generado en <code>supabase/migrations</code> para añadir tu tabla o campo</li>
              <li>Aplica la migración con <code>supabase db push</code></li>
              <li>Configura políticas RLS para la nueva tabla</li>
              <li>Actualiza los tipos TypeScript en <code>types</code> para reflejar los cambios</li>
            </ol>
            <p className="leading-7 mt-2">
              Para más detalles, consulta la <Link href={`/${locale}/docs/architecture/database`} className="text-primary hover:underline">documentación de la base de datos</Link>.
            </p>
          </div>
          
          {/* Database Question 3 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('dataBackup')}</h3>
            <p className="leading-7">
              Para realizar copias de seguridad de tus datos:
            </p>
            <ol className="list-decimal pl-6 space-y-1 mt-2">
              <li>Usa la funcionalidad de backup automático de Supabase en planes Pro o Enterprise</li>
              <li>Configura backups manuales con pg_dump: <code>pg_dump -h database.server.com -U username -d database_name {'>'} backup.sql</code></li>
              <li>Programa backups automatizados utilizando scripts y tareas programadas</li>
              <li>Implementa estrategias de respaldo para archivos en Supabase Storage</li>
              <li>Almacena copias de seguridad en múltiples ubicaciones (nube, almacenamiento local)</li>
            </ol>
            <p className="leading-7 mt-2">
              Establece una política de retención de backups según tus necesidades (diarios, semanales, mensuales).
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('deployment')}</h2>
        
        <div className="space-y-6">
          {/* Deployment Question 1 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('recommendedHost')}</h3>
            <p className="leading-7">
              Las opciones de hosting recomendadas para MarketFlex son:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Vercel</strong>: Opción ideal por su integración nativa con Next.js, escala automáticamente y ofrece despliegues previsualizables</li>
              <li><strong>Netlify</strong>: Buena alternativa con características similares a Vercel</li>
              <li><strong>AWS Amplify</strong>: Opción dentro del ecosistema de AWS</li>
              <li><strong>VPS (Digital Ocean, AWS, GCP)</strong>: Para mayor control, aunque requiere más configuración</li>
            </ul>
            <p className="leading-7 mt-2">
              Consulta la <Link href={`/${locale}/docs/deployment`} className="text-primary hover:underline">Guía de Despliegue</Link> para instrucciones detalladas.
            </p>
          </div>
          
          {/* Deployment Question 2 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('productionChecklist')}</h3>
            <p className="leading-7">
              Antes de lanzar a producción, verifica estos puntos clave:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Configurar todas las variables de entorno en la plataforma de despliegue</li>
              <li>Asegurar que las políticas RLS están correctamente configuradas en Supabase</li>
              <li>Configurar webhooks de MercadoPago con la URL de producción</li>
              <li>Establecer un dominio personalizado y certificado SSL</li>
              <li>Implementar monitoreo y alertas</li>
              <li>Configurar backups automáticos de la base de datos</li>
              <li>Realizar pruebas de carga y seguridad</li>
              <li>Verificar la configuración SEO y metadatos</li>
            </ul>
          </div>
          
          {/* Deployment Question 3 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('multipleEnvironments')}</h3>
            <p className="leading-7">
              Para manejar múltiples entornos (desarrollo, staging, producción):
            </p>
            <ol className="list-decimal pl-6 space-y-1 mt-2">
              <li>Configura proyectos separados en Supabase para cada entorno</li>
              <li>Usa archivos <code>.env.development</code>, <code>.env.staging</code> y <code>.env.production</code></li>
              <li>En Vercel, configura entornos de preview para ramas específicas (staging, etc.)</li>
              <li>Implementa CI/CD para automatizar despliegues entre entornos</li>
              <li>Usa variables de entorno específicas para cada entorno en tu plataforma de despliegue</li>
            </ol>
            <p className="leading-7 mt-2">
              Next.js tiene soporte nativo para diferentes entornos a través de variables de entorno específicas por entorno.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('troubleshooting')}</h2>
        
        <div className="space-y-6">
          {/* Troubleshooting Question 1 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('commonErrors')}</h3>
            <p className="leading-7">
              Problemas comunes y sus soluciones:
            </p>
            <table className="min-w-full border-collapse border border-border mt-2">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Problema</th>
                  <th className="border border-border p-2 text-left">Solución</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Error de autenticación con Supabase</td>
                  <td className="border border-border p-2">Verifica las credenciales en .env.local y asegúrate de que las políticas RLS estén configuradas correctamente.</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Error 500 en rutas de API</td>
                  <td className="border border-border p-2">Revisa los logs de servidor para identificar el error específico. Probablemente sea un problema con la conexión a Supabase o MercadoPago.</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">No se procesan pagos con MercadoPago</td>
                  <td className="border border-border p-2">Verifica que las credenciales de MercadoPago sean correctas y que estés usando el modo adecuado (sandbox vs producción).</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Error de compilación al desplegar</td>
                  <td className="border border-border p-2">Asegúrate de que todas las dependencias estén correctamente instaladas y que no haya errores de tipado en TypeScript.</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Problemas de estilos o componentes</td>
                  <td className="border border-border p-2">Verifica que TailwindCSS esté correctamente configurado y que los componentes Shadcn/UI estén importados adecuadamente.</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Troubleshooting Question 2 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('debugTips')}</h3>
            <p className="leading-7">
              Consejos para depurar problemas en MarketFlex:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Usa <code>console.log</code> estratégicamente tanto en componentes del cliente como en rutas de API</li>
              <li>Revisa los logs del servidor en la consola donde ejecutas <code>npm run dev</code></li>
              <li>Utiliza React Developer Tools para inspeccionar el estado y props de componentes</li>
              <li>Examina las solicitudes de red en las herramientas de desarrollo del navegador</li>
              <li>Para problemas de base de datos, usa la interfaz de Supabase SQL Editor para probar consultas</li>
              <li>Implementa herramientas como Sentry para monitoreo de errores en producción</li>
            </ul>
          </div>
          
          {/* Troubleshooting Question 3 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('performance')}</h3>
            <p className="leading-7">
              Para mejorar el rendimiento de tu aplicación MarketFlex:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Utiliza generación estática para páginas que no requieren datos dinámicos</li>
              <li>Implementa ISR (Incremental Static Regeneration) para contenido que cambia poco</li>
              <li>Optimiza imágenes con el componente Image de Next.js</li>
              <li>Minimiza el JavaScript del cliente con code splitting</li>
              <li>Añade índices a tablas de base de datos con consultas frecuentes</li>
              <li>Implementa caché para consultas pesadas</li>
              <li>Usa Streaming y Suspense para contenido progresivo</li>
              <li>Monitorea el rendimiento con herramientas como Lighthouse o Vercel Analytics</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('licensing')}</h2>
        
        <div className="space-y-6">
          {/* Licensing Question 1 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{content('licenseType')}</h3>
            <p className="leading-7">
              MarketFlex se distribuye bajo una licencia MIT, lo que significa que puedes:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Usar el código para proyectos personales y comerciales</li>
              <li>Modificar el código según tus necesidades</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/deployment`} className="text-primary hover:underline">
          ← {t('deployment')}
        </Link>
        <div></div>
      </div>
    </div>
  );
} 