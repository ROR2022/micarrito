import { HelpArticle, HelpCategory } from '@/types/help';

export const helpCategories: HelpCategory[] = [
  {
    id: '1',
    name: 'Compra de vehículos',
    slug: 'compra',
    description: 'Todo lo que necesitas saber sobre cómo comprar un vehículo',
    icon: 'ShoppingCart'
  },
  {
    id: '2',
    name: 'Venta de vehículos',
    slug: 'venta',
    description: 'Guías para publicar y vender tu auto',
    icon: 'Tag'
  },
  {
    id: '3',
    name: 'Financiamiento',
    slug: 'financiamiento',
    description: 'Información sobre opciones de financiamiento',
    icon: 'CreditCard'
  },
  {
    id: '4',
    name: 'Cuenta y perfil',
    slug: 'cuenta',
    description: 'Gestión de tu cuenta y configuración de perfil',
    icon: 'User'
  },
  {
    id: '5',
    name: 'Pagos y facturación',
    slug: 'pagos',
    description: 'Información sobre métodos de pago y facturación',
    icon: 'Wallet'
  },
  {
    id: '6',
    name: 'Problemas técnicos',
    slug: 'tecnico',
    description: 'Solución a problemas comunes de la plataforma',
    icon: 'Wrench'
  }
];

export const helpArticles: HelpArticle[] = [
  {
    id: '1',
    title: '¿Cómo funciona el proceso de compra?',
    slug: 'proceso-compra',
    excerpt: 'Guía paso a paso del proceso de compra de un vehículo en Mi Carrito.',
    content: `
# ¿Cómo funciona el proceso de compra?

El proceso de compra en Mi Carrito está diseñado para ser sencillo, transparente y seguro. A continuación encontrarás una guía paso a paso:

## 1. Explora y encuentra tu vehículo ideal

- Navega por nuestro catálogo de vehículos
- Utiliza los filtros para refinar tu búsqueda por marca, modelo, año, precio, etc.
- Guarda tus vehículos favoritos para comparar después

## 2. Reserva y prueba de manejo

- Cuando encuentres un vehículo que te interese, puedes reservarlo sin costo
- Agenda una prueba de manejo en uno de nuestros centros o a domicilio

## 3. Opciones de pago y financiamiento

- Decide si deseas pagar al contado o mediante financiamiento
- Si eliges financiamiento, completa la solicitud en línea
- Recibirás una respuesta sobre tu solicitud en menos de 24 horas

## 4. Firma digital y documentación

- Firma los documentos de compra digitalmente desde nuestra plataforma
- Todos los documentos legales se generan automáticamente

## 5. Entrega o recogida

- Elige si deseas recoger tu vehículo en nuestro centro
- O solicita la entrega a domicilio (disponible en ciertas áreas)

## 6. Garantía y post-venta

- Tu vehículo incluye garantía de 3 meses
- Si encuentras algún problema, nuestro equipo de post-venta está disponible
    `,
    category: 'compra',
    relatedArticles: ['2', '3', '7'],
    tags: ['compra', 'proceso', 'financiamiento', 'prueba'],
    publishedAt: '2024-03-01',
    lastUpdated: '2024-03-20',
    featured: true
  },
  {
    id: '2',
    title: '¿Cómo reservo una prueba de manejo?',
    slug: 'reservar-prueba-manejo',
    excerpt: 'Instrucciones para agendar una prueba de manejo del vehículo que te interesa.',
    content: `
# ¿Cómo reservo una prueba de manejo?

Probar un vehículo antes de comprarlo es una parte esencial del proceso. Te explicamos cómo agendar tu prueba de manejo:

## Desde la página del vehículo

1. Navega hasta la página del vehículo que te interesa
2. Haz clic en el botón "Agendar prueba de manejo"
3. Selecciona la fecha y hora que te convenga
4. Completa tus datos de contacto
5. Confirma tu reserva

## Desde tu cuenta

1. Inicia sesión en tu cuenta
2. Ve a "Mis favoritos" o "Vehículos guardados"
3. Selecciona el vehículo que quieres probar
4. Haz clic en "Agendar prueba de manejo"
5. Sigue el proceso de reserva

## Importante

- La prueba de manejo dura aproximadamente 45 minutos
- Debes presentar una identificación oficial vigente
- Puedes cancelar o reprogramar hasta 24 horas antes

## Prueba a domicilio

En algunas zonas, ofrecemos el servicio de prueba a domicilio:

1. Durante el proceso de reserva, selecciona la opción "Prueba a domicilio"
2. Ingresa tu dirección y verifica la disponibilidad
3. Un asesor te contactará para confirmar los detalles
    `,
    category: 'compra',
    relatedArticles: ['1', '3'],
    tags: ['prueba', 'manejo', 'reservación', 'cita'],
    publishedAt: '2024-03-02'
  },
  {
    id: '3',
    title: '¿Qué opciones de financiamiento ofrecen?',
    slug: 'opciones-financiamiento',
    excerpt: 'Conoce los planes de financiamiento disponibles para la compra de tu vehículo.',
    content: `
# ¿Qué opciones de financiamiento ofrecen?

En Mi Carrito, entendemos que cada cliente tiene necesidades financieras diferentes. Por eso, ofrecemos diversas opciones de financiamiento:

## Financiamiento tradicional

- **Plazos:** 12, 24, 36, 48 o 60 meses
- **Enganche:** Desde 10% hasta 50% del valor del vehículo
- **Tasas:** Desde 10.9% anual, dependiendo del historial crediticio
- **Requisitos:** Identificación oficial, comprobante de domicilio, comprobante de ingresos

## Financiamiento sin enganche

- **Plazos:** 24, 36 o 48 meses
- **Tasa:** Desde 14.9% anual
- **Requisitos adicionales:** Historial crediticio excelente, antigüedad laboral mínima de 2 años

## Financiamiento para emprendedores

- **Plazos:** 12, 24 o 36 meses
- **Enganche:** Desde 20% del valor del vehículo
- **Documentación específica:** Acta constitutiva, declaraciones fiscales, estados de cuenta

## Proceso de solicitud

1. Selecciona tu vehículo y haz clic en "Solicitar financiamiento"
2. Completa el formulario de pre-calificación
3. Recibe respuesta preliminar en minutos
4. Sube la documentación requerida
5. Recibe la aprobación final en menos de 24 horas
    `,
    category: 'financiamiento',
    relatedArticles: ['1', '7'],
    tags: ['financiamiento', 'crédito', 'préstamo', 'opciones de pago'],
    publishedAt: '2024-03-05',
    featured: true
  },
  {
    id: '4',
    title: '¿Cómo vendo mi auto en la plataforma?',
    slug: 'vender-auto',
    excerpt: 'Aprende cómo publicar y vender tu vehículo en Mi Carrito de manera fácil y segura.',
    content: `
# ¿Cómo vendo mi auto en la plataforma?

Vender tu auto en Mi Carrito es un proceso sencillo y seguro. Te guiamos paso a paso:

## 1. Valoración inicial

- Completa el formulario en línea con los datos de tu auto
- Recibirás una valoración preliminar en minutos
- Esta valoración es gratuita y sin compromiso

## 2. Inspección del vehículo

- Agenda una cita para la inspección técnica
- Nuestros técnicos realizarán una revisión de 240 puntos
- La inspección es gratuita y toma aproximadamente 1 hora

## 3. Oferta formal

- Después de la inspección, recibirás una oferta formal
- La oferta tiene validez de 7 días
- Sin presiones ni compromisos

## 4. Aceptación y documentación

- Si aceptas la oferta, prepararemos los documentos necesarios
- Necesitarás presentar: factura original, tarjeta de circulación, identificación oficial
- Te asesoramos en todo el proceso legal

## 5. Pago seguro

- Recibirás el pago mediante transferencia bancaria
- El pago se realiza en menos de 24 horas después de completar el papeleo
- Sin cargos ocultos ni comisiones

## 6. Entrega del vehículo

- Coordina la entrega del vehículo en uno de nuestros centros
- O solicita el servicio de recogida a domicilio (sujeto a disponibilidad)
    `,
    category: 'venta',
    relatedArticles: ['5', '6'],
    tags: ['venta', 'publicación', 'valoración', 'inspección'],
    publishedAt: '2024-03-10',
    featured: true
  },
  {
    id: '5',
    title: 'Cómo crear y gestionar tu cuenta',
    slug: 'crear-cuenta',
    excerpt: 'Guía para registrarte, iniciar sesión y configurar tu perfil en Mi Carrito.',
    content: `
# Cómo crear y gestionar tu cuenta

Una cuenta en Mi Carrito te permite acceder a todas las funcionalidades de la plataforma. Aquí te explicamos cómo crearla y gestionarla:

## Creación de cuenta

1. Haz clic en "Registrarse" en la esquina superior derecha
2. Ingresa tu correo electrónico o regístrate con Google/Facebook
3. Crea una contraseña segura
4. Acepta los términos y condiciones
5. Verifica tu cuenta a través del enlace enviado a tu correo

## Configuración de perfil

1. Inicia sesión en tu cuenta
2. Haz clic en tu nombre o avatar en la esquina superior derecha
3. Selecciona "Perfil" del menú desplegable
4. Completa tu información personal:
   - Datos de contacto
   - Foto de perfil
   - Preferencias de contacto

## Seguridad de la cuenta

- Activar la autenticación de dos factores (2FA)
- Cambiar contraseña regularmente
- Revisar los inicios de sesión recientes

## Gestión de notificaciones

Personaliza qué notificaciones quieres recibir:
- Notificaciones por correo electrónico
- Notificaciones push
- SMS
- Alertas de nuevos vehículos
    `,
    category: 'cuenta',
    relatedArticles: ['8'],
    tags: ['cuenta', 'perfil', 'registro', 'configuración'],
    publishedAt: '2024-03-12'
  }
]; 