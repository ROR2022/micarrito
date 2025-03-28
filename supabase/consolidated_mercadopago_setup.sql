-- ********************************************
-- SCRIPT DE CONFIGURACIÓN COMPLETO PARA MERCADOPAGO
-- ********************************************

-- Habilitar las extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ********************************************
-- TABLA DE PERFILES
-- ********************************************

-- Crear tabla para perfiles de usuario
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  avatar_url VARCHAR(512),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas comunes
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Proteger tabla con RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas para perfiles:
-- 1. Los usuarios pueden ver sus propios perfiles
CREATE POLICY "Usuarios pueden ver sus propios perfiles" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

-- 2. Los usuarios pueden editar sus propios perfiles
CREATE POLICY "Usuarios pueden editar sus propios perfiles" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- 3. Inserción de perfiles solo se permite desde funciones de sistema
CREATE POLICY "Inserción controlada de perfiles" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 4. Los administradores pueden ver todos los perfiles
CREATE POLICY "Administradores pueden ver todos los perfiles" 
ON public.profiles FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    JOIN public.profiles ON auth.users.id = public.profiles.user_id 
    WHERE auth.users.id = auth.uid() AND public.profiles.role = 'admin'
  )
);

-- 5. Los administradores pueden editar todos los perfiles
CREATE POLICY "Administradores pueden editar todos los perfiles" 
ON public.profiles FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    JOIN public.profiles ON auth.users.id = public.profiles.user_id 
    WHERE auth.users.id = auth.uid() AND public.profiles.role = 'admin'
  )
);

-- ********************************************
-- TABLAS DE TRANSACCIONES Y SUSCRIPCIONES
-- ********************************************

-- Crear tabla para transacciones
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  external_reference VARCHAR(255) NOT NULL UNIQUE,
  mercado_pago_id VARCHAR(255),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'ARS',
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  items JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para búsquedas comunes
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON public.transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_mercado_pago_id ON public.transactions(mercado_pago_id);

-- Proteger tabla con RLS (Row Level Security)
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Políticas para transacciones:
-- 1. Los usuarios pueden ver sus propias transacciones
CREATE POLICY "Usuarios pueden ver sus propias transacciones" 
ON public.transactions FOR SELECT 
USING (auth.uid() = user_id);

-- 2. Sólo funciones de servidor o administradores pueden insertar o modificar transacciones
CREATE POLICY "Funciones de servidor/admin pueden insertar transacciones" 
ON public.transactions FOR INSERT 
WITH CHECK (
  -- Esta política permite operaciones de inserción desde la API
  -- Se debe verificar la autenticación en la API antes de insertar
  auth.uid() = user_id OR 
  EXISTS (
    SELECT 1 FROM auth.users 
    JOIN public.profiles ON auth.users.id = public.profiles.user_id 
    WHERE auth.users.id = auth.uid() AND public.profiles.role = 'admin'
  )
);

CREATE POLICY "Funciones de servidor/admin pueden actualizar transacciones" 
ON public.transactions FOR UPDATE 
USING (
  auth.uid() = user_id OR 
  EXISTS (
    SELECT 1 FROM auth.users 
    JOIN public.profiles ON auth.users.id = public.profiles.user_id 
    WHERE auth.users.id = auth.uid() AND public.profiles.role = 'admin'
  )
);

-- Crear tabla para planes de suscripción
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  currency_id VARCHAR(3) DEFAULT 'ARS',
  frequency INTEGER DEFAULT 1,
  frequency_type VARCHAR(10) DEFAULT 'months',
  features JSONB,
  mercado_pago_plan_id VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Acceso público a planes de suscripción (son públicos pero solo admins pueden editarlos)
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquiera puede ver planes activos" 
ON public.subscription_plans FOR SELECT 
USING (is_active = TRUE);

CREATE POLICY "Solo admins pueden modificar planes" 
ON public.subscription_plans 
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    JOIN public.profiles ON auth.users.id = public.profiles.user_id 
    WHERE auth.users.id = auth.uid() AND public.profiles.role = 'admin'
  )
);

-- Crear tabla para suscripciones de usuarios
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.subscription_plans(id),
  external_reference VARCHAR(255) NOT NULL UNIQUE,
  mercado_pago_id VARCHAR(255),
  preapproval_plan_id VARCHAR(255),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'ARS',
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para búsquedas comunes
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_mercado_pago_id ON public.subscriptions(mercado_pago_id);

-- Proteger tabla con RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Políticas para suscripciones:
-- 1. Los usuarios pueden ver sus propias suscripciones
CREATE POLICY "Usuarios pueden ver sus propias suscripciones" 
ON public.subscriptions FOR SELECT 
USING (auth.uid() = user_id);

-- 2. Sólo funciones de servidor o administradores pueden insertar o modificar suscripciones
CREATE POLICY "Funciones de servidor/admin pueden insertar suscripciones" 
ON public.subscriptions FOR INSERT 
WITH CHECK (
  auth.uid() = user_id OR 
  EXISTS (
    SELECT 1 FROM auth.users 
    JOIN public.profiles ON auth.users.id = public.profiles.user_id 
    WHERE auth.users.id = auth.uid() AND public.profiles.role = 'admin'
  )
);

CREATE POLICY "Funciones de servidor/admin pueden actualizar suscripciones" 
ON public.subscriptions FOR UPDATE 
USING (
  auth.uid() = user_id OR 
  EXISTS (
    SELECT 1 FROM auth.users 
    JOIN public.profiles ON auth.users.id = public.profiles.user_id 
    WHERE auth.users.id = auth.uid() AND public.profiles.role = 'admin'
  )
);

-- ********************************************
-- TRIGGERS Y FUNCIONES
-- ********************************************

-- Disparador para asegurar que user_id siempre sea igual a id (primary key) en profiles
CREATE OR REPLACE FUNCTION public.ensure_profile_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id := NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_ensure_profile_user_id
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.ensure_profile_user_id();

-- Función para actualizar automáticamente los timestamps de updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar a la tabla de transacciones
CREATE TRIGGER set_updated_at_transactions
BEFORE UPDATE ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Aplicar a la tabla de subscripciones
CREATE TRIGGER set_updated_at_subscriptions
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Aplicar a la tabla de planes de suscripción
CREATE TRIGGER set_updated_at_subscription_plans
BEFORE UPDATE ON public.subscription_plans
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Aplicar a la tabla de perfiles
CREATE TRIGGER set_updated_at_profiles
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ********************************************
-- DATOS INICIALES
-- ********************************************

-- Datos de ejemplo para planes de suscripción
INSERT INTO public.subscription_plans (name, description, price, currency_id, frequency, frequency_type, features, mercado_pago_plan_id, is_active)
VALUES 
  ('Vendedor Básico', 'Plan básico para vendedores con funcionalidades limitadas', 9.99, 'USD', 1, 'months', '["5 listings activos", "Soporte por email", "Estadísticas básicas"]', NULL, TRUE),
  ('Vendedor Premium', 'Plan premium con funcionalidades avanzadas', 19.99, 'USD', 1, 'months', '["20 listings activos", "Listings destacados", "Soporte prioritario", "Estadísticas avanzadas"]', NULL, TRUE),
  ('Empresa', 'Plan empresarial con todas las funcionalidades', 49.99, 'USD', 1, 'months', '["Listings ilimitados", "Soporte 24/7", "API acceso", "Reportes personalizados", "Integraciones avanzadas"]', NULL, TRUE);

-- ********************************************
-- CONFIGURACIÓN PARA CREAR PERFILES AUTOMÁTICAMENTE
-- ********************************************

-- Función para crear un perfil automáticamente cuando se registra un nuevo usuario
CREATE OR REPLACE FUNCTION public.create_profile_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, user_id, role)
  VALUES (NEW.id, NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para invocar la función cuando se crea un nuevo usuario
DROP TRIGGER IF EXISTS create_profile_trigger ON auth.users;
CREATE TRIGGER create_profile_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.create_profile_for_user(); 


-------------------------------------------------------
-- Agregar columna seller_id a la tabla transactions
ALTER TABLE public.transactions 
ADD COLUMN seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

---------------------------------------------------------------------
-- Política para vendedores para ver sus ventas
CREATE POLICY "Vendedores pueden ver sus ventas" 
ON public.transactions FOR SELECT 
USING (auth.uid() = seller_id);