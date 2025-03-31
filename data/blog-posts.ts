import { BlogPost, BlogCategory, BlogAuthor } from '@/types/blog';

export const blogCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Financiamiento',
    slug: 'financiamiento',
    description: 'Artículos sobre opciones de financiamiento para la compra de autos'
  },
  {
    id: '2',
    name: 'Mantenimiento',
    slug: 'mantenimiento',
    description: 'Guías y consejos para el mantenimiento de tu vehículo'
  },
  {
    id: '3',
    name: 'Tendencias',
    slug: 'tendencias',
    description: 'Las últimas tendencias en el mercado automotriz'
  },
  {
    id: '4',
    name: 'Consejos',
    slug: 'consejos',
    description: 'Consejos útiles para compradores y vendedores de autos'
  }
];

export const blogAuthors: BlogAuthor[] = [
  {
    id: '1',
    name: 'Carlos Ramírez',
    avatar: '/images/blog/authors/carlos.jpg',
    bio: 'Experto en finanzas automotrices con más de 10 años de experiencia',
    role: 'Especialista en Financiamiento'
  },
  {
    id: '2',
    name: 'Ana Martínez',
    avatar: '/images/blog/authors/ana.jpg',
    bio: 'Mecánica certificada y experta en mantenimiento preventivo',
    role: 'Especialista en Mantenimiento'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Cómo financiar tu primer auto: Guía completa 2024',
    slug: 'como-financiar-tu-primer-auto',
    excerpt: 'Aprende todo lo que necesitas saber sobre el financiamiento de autos, desde requisitos hasta consejos para obtener la mejor tasa.',
    content: `
      # Cómo financiar tu primer auto: Guía completa 2024

      La compra de tu primer auto es un momento emocionante, pero también puede ser abrumador. En esta guía completa, te ayudaremos a entender todo lo que necesitas saber sobre el financiamiento de autos.

      ## Requisitos básicos

      Antes de solicitar un préstamo, necesitarás:

      - Identificación oficial
      - Comprobante de domicilio
      - Comprobante de ingresos
      - Historial crediticio

      ## Tipos de financiamiento

      1. **Financiamiento directo**
      2. **Financiamiento a través del concesionario**
      3. **Crédito personal**

      [Contenido completo del artículo...]
    `,
    featuredImage: '/images/blog/financiamiento-auto.jpg',
    author: {
      name: 'Carlos Ramírez',
      avatar: '/images/blog/authors/carlos.jpg'
    },
    category: 'Financiamiento',
    tags: ['financiamiento', 'primer auto', 'préstamos', 'crédito'],
    publishedAt: '2024-03-31',
    readingTime: '8 min'
  },
  {
    id: '2',
    title: '¿Qué revisar antes de comprar un auto usado?',
    slug: 'que-revisar-auto-usado',
    excerpt: 'Una guía detallada sobre los puntos clave que debes revisar antes de comprar un auto usado para evitar sorpresas desagradables.',
    content: `
      # ¿Qué revisar antes de comprar un auto usado?

      Comprar un auto usado puede ser una excelente opción para ahorrar dinero, pero requiere una inspección cuidadosa. Te guiamos paso a paso.

      ## Inspección exterior

      - Estado de la carrocería
      - Desgaste de llantas
      - Condición de la pintura

      ## Inspección mecánica

      - Motor y transmisión
      - Sistema de frenos
      - Suspensión

      [Contenido completo del artículo...]
    `,
    featuredImage: '/images/blog/auto-usado.jpg',
    author: {
      name: 'Ana Martínez',
      avatar: '/images/blog/authors/ana.jpg'
    },
    category: 'Consejos',
    tags: ['autos usados', 'inspección', 'compra', 'consejos'],
    publishedAt: '2024-03-30',
    readingTime: '6 min'
  },
  {
    id: '3',
    title: 'Los 5 modelos más vendidos en México este año',
    slug: 'modelos-mas-vendidos-mexico',
    excerpt: 'Descubre cuáles son los modelos de autos que están dominando el mercado mexicano en 2024 y por qué son tan populares.',
    content: `
      # Los 5 modelos más vendidos en México este año

      El mercado automotriz mexicano continúa evolucionando. Te presentamos los modelos que están liderando las ventas.

      ## 1. Nissan Versa

      - Precio accesible
      - Excelente rendimiento de combustible
      - Espacio interior generoso

      ## 2. Toyota Corolla

      - Confiabilidad probada
      - Mantenimiento económico
      - Tecnología avanzada

      [Contenido completo del artículo...]
    `,
    featuredImage: '/images/blog/modelos-populares.jpg',
    author: {
      name: 'Carlos Ramírez',
      avatar: '/images/blog/authors/carlos.jpg'
    },
    category: 'Tendencias',
    tags: ['tendencias', 'ventas', 'mercado', 'modelos'],
    publishedAt: '2024-03-29',
    readingTime: '5 min'
  }
]; 