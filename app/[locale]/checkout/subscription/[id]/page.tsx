//import { Metadata } from "next";
//import { getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";
import { redirect, notFound } from "next/navigation";
import CheckoutSubscriptionClient from "./checkout-subscription-client";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
  searchParams: Promise<{
    interval: string;
  }>;
};

 /* export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Checkout" });
  return {
    title: t("subscriptionTitle"),
    description: t("subscriptionDescription"),
  };
} */ 

export default async function CheckoutSubscriptionPage(props: Props) {
  const { params, searchParams } = props;
  const { locale, id } = await params;
  const { interval } = await searchParams;
  const supabase = await createClient();
  
  //console.log('⚡ Entrando al endpoint de checkout de suscripción...');
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/${locale}/login?returnTo=/checkout/subscription/${id}?interval=${interval}`);
  }
  //console.log('⚡ Usuario autenticado:', user);
  // Fetch subscription plan details
  const { data: plan, error } = await supabase
    .from("subscription_plans")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !plan) {
    console.error('⚡ Error al obtener el plan CheckoutSubscriptionPage:', error);
    notFound();
  }
  //console.log('⚡ Plan encontrado:', plan);

  // Check if user already has an active subscription
  const { data: existingSubscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .single();

  //console.log('⚡ Suscripción existente:', existingSubscription);

  // Determine the price based on the interval
  const price = interval === "yearly" 
    ? Math.round(plan.price * 12 * 0.8) // 20% discount
    : plan.price;

  //console.log('⚡ Precio calculado:', price);

    

   return (
    <CheckoutSubscriptionClient
      plan={plan}
      price={price}
      interval={interval || "monthly"}
      locale={locale}
      existingSubscription={existingSubscription || null}
      userId={user.id}
    />
  ); 
} 