//import { Metadata } from "next";
//import { getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SalesClient from "./sales-client";
import { Transaction } from "./types";
import { getLocale } from "next-intl/server";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

/* export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Sales" });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}
 */
export default async function SalesPage() {
  const locale = await getLocale();
  
  const supabase = await createClient();
  
  // Verificar autenticación usando getUser() por seguridad
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/${locale}/login`);
  }

  // Obtener las transacciones más recientes para este vendedor
  const { data, error } = await supabase
    .from("transactions")
    .select(`
      id,
      external_reference,
      amount,
      currency,
      status,
      created_at,
      updated_at,
      user_id
    `)
    .eq("seller_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching sales:", error.message);
  }

  // Obtener información de los compradores (users)
  const userIds = (data || []).map(transaction => transaction.user_id).filter(Boolean);
  
  let buyerProfiles: Record<string, Profile> = {};
  if (userIds.length > 0) {
    // Intentar obtener perfiles de la tabla profiles
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, avatar_url')
      .in('id', userIds);
    
    // Crear un mapa de perfiles por ID
    if (profilesData) {
      buyerProfiles = profilesData.reduce<Record<string, Profile>>((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
      }, {});
    }
  }

  // Format transactions to match Transaction type y añadir información de usuarios
  const formattedTransactions: Transaction[] = (data || []).map(transaction => {
    const userId = transaction.user_id as string;
    const buyerProfile = userId && buyerProfiles[userId];
    
    return {
      ...transaction,
      profiles: buyerProfile 
        ? {
            id: buyerProfile.id,
            first_name: buyerProfile.first_name,
            last_name: buyerProfile.last_name,
            avatar_url: buyerProfile.avatar_url
          }
        : undefined
    };
  });

  return <SalesClient transactions={formattedTransactions} />;
} 