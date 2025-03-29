import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function SupabaseIntegrationPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.supabase' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{content('title')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('overview')}</h2>
        <p className="leading-7">
          MarketFlex utiliza Supabase como plataforma backend principal, proporcionando servicios de 
          base de datos PostgreSQL, autenticación, almacenamiento y funciones serverless. La integración 
          con Supabase permite un desarrollo rápido y seguro de las funcionalidades principales del marketplace.
        </p>
        <p className="leading-7">
          Esta documentación cubre los aspectos clave de la integración con Supabase en MarketFlex y 
          cómo personalizarla según tus necesidades.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('prerequisites')}</h2>
        <p className="leading-7">
          Para utilizar la integración con Supabase, necesitas:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Una cuenta de Supabase (puedes crear una en <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">supabase.com</a>)</li>
          <li>Un proyecto de Supabase (puedes crear uno desde el dashboard)</li>
          <li>Las credenciales de API de Supabase (URL y llaves anónimas/de servicio)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('configuration')}</h2>
        
        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Configuración de variables de entorno</h3>
          <p className="leading-7">
            Para conectar MarketFlex con tu proyecto de Supabase, configura las siguientes variables 
            en tu archivo <code>.env.local</code>:
          </p>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`# Configuración de Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('authentication')}</h2>
        <p className="leading-7">
          MarketFlex utiliza el sistema de autenticación de Supabase para gestionar usuarios, 
          sesiones y permisos. La integración incluye:
        </p>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Funcionalidades implementadas</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Registro y autenticación de usuarios (email/password)</li>
            <li>Inicio de sesión con proveedores sociales (Google, Facebook, etc.)</li>
            <li>Gestión de sesiones con Next.js (server-side y client-side)</li>
            <li>Recuperación de contraseñas</li>
            <li>Roles de usuario (administrador, vendedor, comprador)</li>
          </ul>
        </div>

        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Uso del cliente de autenticación</h3>
          <p className="leading-7">
            MarketFlex proporciona utilidades para interactuar con la autenticación de Supabase:
          </p>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`// Ejemplo de autenticación en el servidor (Route Handlers)
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  
  return Response.json({ user: data.user });
}`}</code>
          </pre>
          
          <p className="leading-7 mt-4">
            También puedes usar el hook <code>useAuth</code> del cliente para manejar la autenticación 
            en componentes React:
          </p>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();
  
  useEffect(() => {
    // Verificar sesión actual
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
      setIsLoading(false);
      
      // Escuchar cambios de autenticación
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user || null);
        }
      );
      
      return () => {
        authListener?.subscription.unsubscribe();
      };
    };
    
    checkUser();
  }, [supabase]);
  
  // Funciones de autenticación
  const signIn = (email, password) => 
    supabase.auth.signInWithPassword({ email, password });
    
  const signUp = (email, password) => 
    supabase.auth.signUp({ email, password });
    
  const signOut = () => supabase.auth.signOut();
  
  return { user, isLoading, signIn, signUp, signOut };
}`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('database')}</h2>
        <p className="leading-7">
          MarketFlex utiliza la base de datos PostgreSQL de Supabase para almacenar todos los datos 
          del marketplace. La estructura de la base de datos incluye:
        </p>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Modelo de datos principal</h3>
          <p className="leading-7">
            Las principales tablas y relaciones implementadas son:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>users</strong> - Perfiles de usuario (extendiendo la tabla auth.users)</li>
            <li><strong>listings</strong> - Anuncios y productos publicados</li>
            <li><strong>categories</strong> - Categorías para organizar los anuncios</li>
            <li><strong>transactions</strong> - Registro de transacciones</li>
            <li><strong>messages</strong> - Sistema de mensajería entre usuarios</li>
            <li><strong>subscription_plans</strong> - Planes de suscripción disponibles</li>
            <li><strong>subscriptions</strong> - Suscripciones activas de los usuarios</li>
          </ul>
        </div>

        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Uso del cliente de base de datos</h3>
          <p className="leading-7">
            MarketFlex proporciona utilidades para interactuar con la base de datos de Supabase:
          </p>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`// Ejemplo de consulta a la base de datos (con seguridad RLS)
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// En un componente o hook
const supabase = createClientComponentClient();

// Obtener listados con filtros
const fetchListings = async (filters) => {
  let query = supabase
    .from('listings')
    .select('*, categories(*), users!listings_author_id_fkey(username)');
  
  // Aplicar filtros
  if (filters.category) {
    query = query.eq('category_id', filters.category);
  }
  
  if (filters.search) {
    query = query.ilike('title', \`%\${filters.search}%\`);
  }
  
  // Paginación
  if (filters.limit) {
    query = query.limit(filters.limit);
  }
  
  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }
  
  const { data, error } = await query;
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
};`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('storage')}</h2>
        <p className="leading-7">
          MarketFlex utiliza el servicio de almacenamiento de Supabase para gestionar archivos como 
          imágenes de perfil, fotografías de productos y otros recursos:
        </p>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Uso del servicio de almacenamiento</h3>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`// Ejemplo de carga de una imagen
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const uploadListingImage = async (file, listingId) => {
  const supabase = createClientComponentClient();
  const fileExt = file.name.split('.').pop();
  const fileName = \`\${listingId}/\${Math.random().\toString(36).substring(7)}.\${fileExt}\`;
  
  const { data, error } = await supabase.storage
    .from('listings')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) {
    throw new Error('Error al cargar la imagen');
  }
  
  // Obtener la URL pública
  const { data: publicUrl } = supabase.storage
    .from('listings')
    .getPublicUrl(fileName);
    
  return publicUrl;
};`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('security')}</h2>
        <p className="leading-7">
          La seguridad en MarketFlex se implementa principalmente a través de las políticas de 
          Row Level Security (RLS) de Supabase:
        </p>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Políticas RLS implementadas</h3>
          <p className="leading-7">
            Algunas de las políticas RLS implementadas:
          </p>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`-- Ejemplo de políticas RLS para la tabla listings

-- Todos pueden ver los listings activos
CREATE POLICY "Listings públicos visibles para todos" ON listings
FOR SELECT USING (status = 'active');

-- Los usuarios solo pueden crear listings propios
CREATE POLICY "Los usuarios pueden crear sus propios listings" ON listings
FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Los usuarios solo pueden actualizar sus propios listings
CREATE POLICY "Los usuarios pueden actualizar sus propios listings" ON listings
FOR UPDATE USING (auth.uid() = author_id);

-- Los usuarios solo pueden eliminar sus propios listings
CREATE POLICY "Los usuarios pueden eliminar sus propios listings" ON listings
FOR DELETE USING (auth.uid() = author_id);

-- Los administradores pueden hacer todo
CREATE POLICY "Los administradores pueden gestionar todos los listings" ON listings
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('migrations')}</h2>
        <p className="leading-7">
          MarketFlex incluye un sistema de migraciones para gestionar el esquema de la base de datos:
        </p>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Estructura de migraciones</h3>
          <p className="leading-7">
            Las migraciones se encuentran en la carpeta <code>supabase/migrations</code> y siguen 
            el formato de Supabase CLI:
          </p>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`-- Ejemplo de archivo de migración (20230101000000_initial_schema.sql)

-- Creación de tipos enumerados
CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'admin');
CREATE TYPE listing_status AS ENUM ('draft', 'active', 'sold', 'inactive');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Crear tabla users (extiende auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role user_role NOT NULL DEFAULT 'buyer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Crear tabla categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Crear tabla listings
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status listing_status NOT NULL DEFAULT 'draft',
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id),
  custom_fields JSONB DEFAULT '{}'::jsonb,
  location GEOGRAPHY(POINT),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Configurar políticas RLS...`}</code>
          </pre>
        </div>
        
        <div className="space-y-2 mt-4">
          <h3 className="text-xl font-semibold">Ejecutando migraciones</h3>
          <p className="leading-7">
            Las migraciones se ejecutan usando la CLI de Supabase:
          </p>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`# Instalar Supabase CLI
npm install -g supabase

# Vincular proyecto local con proyecto remoto
supabase link --project-ref your-project-ref

# Aplicar migraciones
supabase db push

# Crear nueva migración
supabase migration new nombre_migracion`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('realtime')}</h2>
        <p className="leading-7">
          Supabase ofrece capacidades de tiempo real que MarketFlex utiliza para crear funcionalidades 
          dinámicas como chat en vivo, notificaciones y actualizaciones de estado:
        </p>

        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// Ejemplo de uso de Realtime para un chat
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

function Chat({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const supabase = createClientComponentClient();
  
  useEffect(() => {
    // Cargar mensajes existentes
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
        
      setMessages(data || []);
    };
    
    fetchMessages();
    
    // Suscribirse a nuevos mensajes
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: \`conversation_id=eq.\${conversationId}\` 
        }, 
        (payload) => {
          setMessages(prev => [...prev, payload.new]);
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, supabase]);
  
  // Resto del componente...
}`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('bestPractices')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Utiliza siempre políticas RLS para proteger tus datos</li>
          <li>Estructura las consultas para minimizar el número de peticiones</li>
          <li>Implementa caché para datos frecuentemente accedidos</li>
          <li>Usa funciones serverless para lógica de negocio compleja</li>
          <li>Mantén las migraciones versionadas y bien documentadas</li>
          <li>Configura diferentes entornos (desarrollo, pruebas, producción)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('resources')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Documentación oficial de Supabase</a></li>
          <li><a href="https://supabase.com/docs/guides/auth" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Guía de autenticación de Supabase</a></li>
          <li><a href="https://supabase.com/docs/guides/database" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Guía de base de datos de Supabase</a></li>
          <li><a href="https://supabase.com/docs/guides/storage" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Guía de almacenamiento de Supabase</a></li>
          <li><a href="https://github.com/supabase/auth-helpers" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Auth Helpers para Next.js</a></li>
        </ul>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/integrations/mercadopago`} className="text-primary hover:underline">
          ← {t('mercadopago')}
        </Link>
        <Link href={`/${locale}/docs/deployment`} className="text-primary hover:underline">
          {t('deployment')} →
        </Link>
      </div>
    </div>
  );
} 