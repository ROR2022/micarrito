//import { Metadata } from "next";
//import { getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PurchasesClient from "./purchases-client";
import { Transaction } from "./types";
import { getLocale } from "next-intl/server";

/* export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale: params.locale, namespace: "Purchases" });
  
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
} */

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

export default async function PurchasesPage() {
  const locale = await getLocale();

  const supabase = await createClient();
  
  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return redirect(`/${locale}/sign-in`);
  }

  // Obtener las últimas transacciones del usuario como comprador
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
      items,
      seller_id
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("dashboard/purchases/page.tsx Error fetching transactions:", error);
  }

  // Obtener información de los vendedores
  const sellerIds = (data || []).map(transaction => transaction.seller_id).filter(Boolean);
  
  let sellerProfiles: Record<string, Profile> = {};
  if (sellerIds.length > 0) {
    // Intentar obtener perfiles de la tabla profiles
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, avatar_url')
      .in('id', sellerIds);
    
    // Crear un mapa de perfiles por ID
    if (profilesData) {
      sellerProfiles = profilesData.reduce<Record<string, Profile>>((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
      }, {});
    }
  }

  // Format transactions to match the Transaction type
  const formattedTransactions: Transaction[] = (data || []).map(transaction => {
    const sellerId = transaction.seller_id as string;
    const sellerProfile = sellerId && sellerProfiles[sellerId];
    
    return {
      ...transaction,
      profiles: sellerProfile 
        ? {
            id: sellerProfile.id,
            first_name: sellerProfile.first_name,
            last_name: sellerProfile.last_name,
            avatar_url: sellerProfile.avatar_url
          }
        : undefined
    };
  });

  return (
    <PurchasesClient transactions={formattedTransactions} />
  );
} 