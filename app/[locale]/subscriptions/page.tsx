//import { Metadata } from "next";
//import { getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";
import SubscriptionPlansClient from "./subscription-plans-client";
import { getLocale } from "next-intl/server";

/* export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Subscriptions" });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}
 */

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency_id: string;
  frequency: number;
  frequency_type: string;
  features: string[];
  is_active: boolean;
}

interface Subscription {
  id: string;
  status: string;
  current_period_end: string;
  subscription_plan_id: string;
  subscription_plans: SubscriptionPlan;
}

export default async function SubscriptionPlansPage() {
  const locale = await getLocale();
  const supabase = await createClient();
  
  // Obtener los planes de suscripción disponibles
  const { data: plans, error } = await supabase
    .from("subscription_plans")
    .select("*")
    .eq("is_active", true)
    .order("price", { ascending: true });

  if (error) {
    console.error("Error fetching subscription plans:", error.message);
  }

  // Obtener el usuario actual para verificar si ya tiene suscripción
  const { data: { user } } = await supabase.auth.getUser();
  
  // Si el usuario está autenticado, verificar si tiene alguna suscripción activa
  let currentSubscription = null;
  if (user) {
    // Primero obtener la suscripción
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select(`
        id,
        status,
        current_period_end,
        subscription_plan_id
      `)
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    if (subscription) {
      // Luego obtener el plan de suscripción
      const { data: plan } = await supabase
        .from("subscription_plans")
        .select(`
          id,
          name,
          description,
          price,
          currency_id,
          frequency,
          frequency_type,
          features,
          is_active
        `)
        .eq("id", subscription.subscription_plan_id)
        .single();

      if (plan) {
        currentSubscription = {
          ...subscription,
          subscription_plans: plan
        } as Subscription;
      }
    }
  }

  return (
    <SubscriptionPlansClient 
      plans={plans || []} 
      currentSubscription={currentSubscription} 
      isAuthenticated={!!user}
      locale={locale}
    />
  );
} 