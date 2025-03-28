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
    WHERE id = auth.uid() AND 
    auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin')
  )
);

-- 5. Los administradores pueden editar todos los perfiles
CREATE POLICY "Administradores pueden editar todos los perfiles" 
ON public.profiles FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() AND 
    auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin')
  )
);

-- Disparador para asegurar que user_id siempre sea igual a id (primary key)
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