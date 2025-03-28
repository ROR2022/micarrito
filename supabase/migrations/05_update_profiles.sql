-- Añadir columna de email si no existe
DO $$
BEGIN
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

-- Actualizar perfiles existentes con información de auth.users
UPDATE public.profiles p
SET 
    first_name = COALESCE(p.first_name, split_part(u.email, '@', 1)),
    email = u.email
FROM auth.users u
WHERE p.id = u.id AND p.first_name IS NULL;

-- Comentario explicativo
COMMENT ON TABLE public.profiles IS 'Perfiles de usuario con información personal'; 