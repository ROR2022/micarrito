//este es el hook de autenticación para el admin
//lo unico que hace es verificar si el usuario es administrador devuelve true o false

import { createClient } from "@/utils/supabase/server";
//import { useQuery } from "@tanstack/react-query";


export const useAuth = async () => {
  const supabase = await createClient();
  //extraer el role del usuario actual desde la tabla de profiles
  const { data: { user } } = await supabase.auth.getUser();
  const userEmail = user?.email || null;
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('email', userEmail)
    .single();
  

  const isAdmin = profile?.role === 'admin';

  return { isAdmin };

  
};