-- Función que se ejecutará con el trigger
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
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Comentario explicativo
COMMENT ON FUNCTION public.handle_new_user() IS 'Crea automáticamente un registro en la tabla de perfiles cuando se registra un nuevo usuario'; 