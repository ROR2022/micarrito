# MarketFlex

<p align="center">
  <img src="public/images/logoMarketFlex.png" alt="MarketFlex Logo" width="200" />
</p>

<p align="center">
  <strong>Un boilerplate SaaS flexible para crear marketplaces personalizados</strong>
</p>

<p align="center">
  <a href="#características"><strong>Características</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#instalación"><strong>Instalación</strong></a> ·
  <a href="#uso"><strong>Uso</strong></a> ·
  <a href="#personalización"><strong>Personalización</strong></a> ·
  <a href="#tecnologías"><strong>Tecnologías</strong></a> ·
  <a href="#contribuir"><strong>Contribuir</strong></a>
</p>

## 🌟 Introducción

MarketFlex es un boilerplate SaaS completo diseñado para lanzar rápidamente marketplaces personalizados para diversos nichos (automotriz, inmobiliario, servicios, etc.) sin necesidad de modificar el código base. Ofrece un enfoque "configura, no codifiques", permitiéndote adaptar campos, categorías y flujos de trabajo mediante configuración.

Ideal para emprendedores, desarrolladores y empresas que necesitan implementar un marketplace profesional y escalable en tiempo récord.

## ✨ Características

### Estructura Adaptable
- **Listados Dinámicos**: Define campos personalizados según tu nicho sin modificar el código
- **Búsqueda Avanzada**: Filtrado y ordenamiento inteligente adaptado a los campos personalizados
- **Multilenguaje**: Soporte para español, inglés y fácilmente extensible a otros idiomas
- **Multidivisa**: Configura precios en diferentes monedas (USD, ARS, MXN, etc.)

### Experiencia de Usuario
- **Diseño Responsivo**: Optimizado para dispositivos móviles y escritorio
- **Temas Personalizables**: Modos claro/oscuro y personalización de colores
- **Interfaz Intuitiva**: Navegación fluida y accesible (WCAG 2.1)

### Monetización
- **Suscripciones**: Planes para vendedores mediante integración con MercadoPago
- **Comisiones por Transacción**: Configura porcentajes flexibles por cada venta
- **Listings Premium**: Opciones de promoción y destacados

### Pagos y Seguridad
- **Integración con MercadoPago**: Procesa pagos con múltiples métodos (tarjetas, transferencias, efectivo)
- **Webhooks Configurados**: Notificaciones automáticas de pagos y suscripciones
- **RLS de Supabase**: Políticas de seguridad robustas a nivel de base de datos

### Funcionalidades Clave
- **Mensajería Interna**: Comunicación directa entre compradores y vendedores
- **Panel de Administración**: Gestión centralizada de usuarios, listings y configuraciones
- **Autenticación Segura**: Email/contraseña y proveedores sociales (Google, GitHub)

## 🔍 Demo

Puedes explorar una demostración completa en [marketflex.vercel.app](https://marketflex.vercel.app)

- **Credenciales de prueba**:
  - Comprador: buyer@example.com / password123
  - Vendedor: seller@example.com / password123
  - Admin: admin@example.com / password123

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+ y npm/yarn/pnpm
- Una cuenta en [Supabase](https://supabase.com)
- Una cuenta en [MercadoPago](https://www.mercadopago.com.ar) (para procesamiento de pagos)

### Instalación Local

1. Clona el repositorio
   ```bash
   git clone https://github.com/tuusuario/marketflex.git
   cd marketflex
   ```

2. Instala dependencias
   ```bash
   npm install
   # o yarn install
   # o pnpm install
   ```

3. Configura las variables de entorno
   ```bash
   cp .env.example .env.local
   ```
   
   Edita `.env.local` con tus credenciales:
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
   NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=tu_clave_publica_de_mercado_pago
   MERCADOPAGO_ACCESS_TOKEN=tu_token_de_acceso_de_mercado_pago
   ```

4. Inicializa la base de datos
   ```bash
   npm run db:setup
   # o yarn db:setup
   # o pnpm db:setup
   ```

5. Inicia el servidor de desarrollo
   ```bash
   npm run dev
   # o yarn dev
   # o pnpm dev
   ```

6. Visita [http://localhost:3000](http://localhost:3000) para ver tu aplicación

### Despliegue a Producción

**Opción 1: Despliegue a Vercel**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftuusuario%2Fmarketflex)

**Opción 2: Despliegue Manual**

1. Configura tu proyecto en Supabase
2. Configura MercadoPago para producción
3. Despliega usando tu proveedor preferido (Vercel, Netlify, etc.)
4. Configura las variables de entorno en tu proveedor

## 📋 Uso

### Configuración Básica

1. **Configuración del Marketplace**: Accede al panel de administración en `/dashboard/admin` y configura los parámetros básicos:
   - Nombre del marketplace
   - Categorías y campos personalizados
   - Comisiones y precios de suscripción

2. **Personalización Visual**: Ajusta colores, logos y temas desde la sección "Apariencia"

3. **Configuración de Pagos**: Conecta tu cuenta de MercadoPago en la sección "Pagos"

### Creación de Campos Personalizados

1. En el panel de administración, ve a "Configuración" > "Campos Personalizados"
2. Selecciona una categoría (ej. "Automóviles")
3. Agrega campos como:
   ```json
   {
     "marca": {"type": "string", "required": true},
     "modelo": {"type": "string", "required": true},
     "año": {"type": "number", "required": true},
     "kilometraje": {"type": "number", "required": true},
     "combustible": {"type": "select", "options": ["Gasolina", "Diesel", "Eléctrico", "Híbrido"]}
   }
   ```

## 🔧 Personalización

### Campos Dinámicos

Los campos dinámicos permiten adaptar MarketFlex a cualquier nicho sin modificar el código. Estos se definen en la tabla `listing_configurations` y se utilizan automáticamente en los formularios de creación/edición de listings.

### Temas y Estilo

MarketFlex utiliza Tailwind CSS y Shadcn/UI para estilizar la aplicación:

1. Modifica `tailwind.config.ts` para ajustar colores, fuentes y más
2. Personaliza componentes en `components/ui/`
3. Edita los estilos globales en `app/globals.css`

### Integración de Pagos

MarketFlex está preconfigurado para MercadoPago, pero puedes agregar otros procesadores:

1. Implementa el adaptador correspondiente en `app/api/payments/`
2. Actualiza la configuración en el panel de administración

## 🛠️ Tecnologías

- **Frontend y Backend**: [Next.js 15](https://nextjs.org/) con App Router
- **Base de Datos y Autenticación**: [Supabase](https://supabase.com)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com) y [Shadcn/UI](https://ui.shadcn.com)
- **Procesamiento de Pagos**: [MercadoPago](https://www.mercadopago.com)
- **Internacionalización**: [next-intl](https://next-intl-docs.vercel.app/)
- **Formularios**: [React Hook Form](https://react-hook-form.com/) con [Zod](https://zod.dev/)
- **Email**: [Resend](https://resend.com)

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor, lee nuestra [guía de contribución](CONTRIBUTING.md) antes de enviar PRs.

1. Haz fork del proyecto
2. Crea tu rama de funcionalidad (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add amazing feature'`)
4. Sube la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 💬 Soporte

¿Tienes preguntas o necesitas ayuda?
- Abre un [issue](https://github.com/tuusuario/marketflex/issues/new)
- Contacta por email: support@marketflex.app

---

<p align="center">
  Desarrollado con ❤️ por el equipo de MarketFlex
</p>
