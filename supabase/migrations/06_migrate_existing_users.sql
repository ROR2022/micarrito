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

-- Comentario explicativo
COMMENT ON TABLE public.profiles IS 'Tabla que contiene información extendida de los usuarios';

-- Crear política de seguridad para que los usuarios solo puedan ver su propio perfil
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Asegurar que existen las políticas correctas
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Usuarios pueden ver su propio perfil'
    ) THEN
        CREATE POLICY "Usuarios pueden ver su propio perfil" 
        ON public.profiles FOR SELECT
        USING (auth.uid() = id);
    END IF;

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