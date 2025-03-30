//import { Metadata } from "next";
//import { getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SubscriptionsClient from "./subscriptions-client";
import { getLocale } from "next-intl/server";

/* type Props = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "DashboardSubscriptions" });
  return {
    title: t("title"),
    description: t("description"),
  };
}
 */
export default async function SubscriptionsPage() {
  const locale = await getLocale();
  const supabase = await createClient();
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/${locale}/login?returnTo=/dashboard/subscriptions`);
  }
  //console.log('user.id:..', user.id);
  //recuperar todas las suscripciones existentes
  /* const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single();

  console.log('subscription:..', subscription); */

  // Fetch user's active subscription if exists
   const { data: subscription } = await supabase
    .from("subscriptions")
    .select(`
      *,
      subscription_plans (*)
    `)
    .eq("user_id", user.id)
    .single(); 

  // Fetch subscription plans
  const { data: plans } = await supabase
    .from("subscription_plans")
    .select("*")
    .eq("active", true)
    .order("price", { ascending: true });

  // Fetch user's subscription history
  const { data: history } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .eq("type", "subscription")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <SubscriptionsClient
      subscription={subscription || null}
      plans={plans || []}
      history={history || []}
      locale={locale}
    />
  );
} 