//import { Metadata } from "next";
//import { getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";
import { redirect, notFound } from "next/navigation";
import SaleDetailClient from "./sale-detail-client";
import { TransactionDetail } from "./types";

type PageProps = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};
/* export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Sales" });

  return {
    title: t("detail.pageTitle"),
    description: t("detail.pageDescription"),
  };
} */

export default async function SaleDetailPage(props: PageProps) {
  const { params } =  props;
  const { locale, id } = await params;
  const supabase = await createClient();
  
  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/${locale}/login`);
  }

  // Obtener detalles de la transacción
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
      mercado_pago_id,
      profiles:user_id (
        id, 
        first_name, 
        last_name, 
        avatar_url
      )
    `)
    .eq("id", id)
    .eq("seller_id", user.id)
    .single();

  if (error || !data) {
    console.error("Error fetching sale details:", error?.message);
    notFound();
  }

  // Format transaction to match the TransactionDetail type
  const transaction: TransactionDetail = {
    ...data,
    profiles: Array.isArray(data.profiles) && data.profiles.length > 0
      ? {
          id: data.profiles[0].id,
          first_name: data.profiles[0].first_name,
          last_name: data.profiles[0].last_name,
          avatar_url: data.profiles[0].avatar_url
        }
      : undefined
  };

  return <SaleDetailClient transaction={transaction} />;
} 