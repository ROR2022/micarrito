-- Script consolidado para gestión de perfiles de usuario
-- Este script asegura que:
-- 1. La tabla profiles existe y tiene la estructura correcta
-- 2. Se crea un trigger para generar perfiles automáticamente con nuevos usuarios 
-- 3. Los usuarios existentes que no tienen perfil son migrados
-- 4. Se establecen las políticas de seguridad adecuadas

-- Asegurar que la tabla profiles tiene todos los campos necesarios
DO $$
BEGIN
    -- Añadir email si no existe
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'email'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN email TEXT;
    END IF;
END $$;

-- Crear índice para búsquedas rápidas por email
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);

-- Función para generar perfiles automáticamente con nuevos usuarios
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Extraer el email del usuario antes del @ para usarlo como nombre
  -- Esto es temporal, el usuario puede actualizar su perfil después
  INSERT INTO public.profiles (id, email, first_name, last_name, avatar_url, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    split_part(NEW.email, '@', 1), -- Nombre basado en la parte del email antes del @
    '', -- Apellido vacío inicialmente
    '', -- Sin avatar inicialmente
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para ejecutar la función cuando se crea un nuevo usuario
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Actualizar perfiles existentes con información de auth.users
UPDATE public.profiles p
SET 
    first_name = COALESCE(p.first_name, split_part(u.email, '@', 1)),
    email = COALESCE(p.email, u.email)
FROM auth.users u
WHERE p.id = u.id AND (p.first_name IS NULL OR p.email IS NULL);

-- Migrar usuarios existentes que no tienen perfiles
INSERT INTO public.profiles (id, email, first_name, last_name, avatar_url, updated_at)
SELECT 
    u.id,
    u.email,
    split_part(u.email, '@', 1), -- Usar la parte antes del @ como nombre
    '', -- Apellido vacío
    '', -- Sin avatar
    NOW() -- Timestamp actual
FROM 
    auth.users u
LEFT JOIN 
    public.profiles p ON u.id = p.id
WHERE 
    p.id IS NULL; -- Solo para usuarios que no tienen perfil

-- Crear política de seguridad para que los usuarios solo puedan ver su propio perfil
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Asegurar que existen las políticas correctas
DO $$
BEGIN
    -- Política para ver perfiles
    IF NOT EXISTS (
        SELECT FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Usuarios pueden ver su propio perfil'
    ) THEN
        CREATE POLICY "Usuarios pueden ver su propio perfil" 
        ON public.profiles FOR SELECT
        USING (auth.uid() = id);
    END IF;

    -- Política para actualizar perfiles
    IF NOT EXISTS (
        SELECT FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Usuarios pueden actualizar su propio perfil'
    ) THEN
        CREATE POLICY "Usuarios pueden actualizar su propio perfil" 
        ON public.profiles FOR UPDATE
        USING (auth.uid() = id);
    END IF;
END $$;

-- Comentarios explicativos
COMMENT ON FUNCTION public.handle_new_user() IS 'Crea automáticamente un registro en la tabla de perfiles cuando se registra un nuevo usuario';
COMMENT ON TABLE public.profiles IS 'Tabla que contiene información extendida de los usuarios'; 