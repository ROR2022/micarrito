"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CreditCard, ExternalLink } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { v4 as uuidv4 } from 'uuid';

// Define interfaces for our data structure
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
  user_id: string;
  subscription_plan_id: string;
  status: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

interface CheckoutSubscriptionClientProps {
  plan: SubscriptionPlan;
  price: number;
  interval: string;
  locale: string;
  existingSubscription: Subscription | null;
  userId: string;
}

export default function CheckoutSubscriptionClient({
  plan,
  price,
  interval,
  locale,
  existingSubscription,
  userId
}: CheckoutSubscriptionClientProps) {
  const t = useTranslations("Checkout");
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "USD",
      }).format(amount);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    }
  };

  // Procesar la suscripción con MercadoPago
  async function processSubscription() {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Generar un ID único para esta transacción
      const externalReference = uuidv4();
      
      // Crear una entrada de suscripción pendiente
      const { error: subscriptionError } = await supabase
        .from("subscriptions")
        .insert({
          user_id: userId,
          subscription_plan_id: plan.id,
          status: "pending",
          external_reference: externalReference,
          interval: interval,
          amount: price,
          currency: plan.currency_id,
          created_at: new Date(),
        });

      if (subscriptionError) {
        console.error('Error al crear la suscripción:', subscriptionError);
        throw new Error(subscriptionError.message);
      }

      // Llamar a nuestra API para crear la suscripción en MercadoPago
      const response = await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_id: plan.id,
          price: price,
          interval: interval,
          external_reference: externalReference,
          currency_id: plan.currency_id,
          frequency: interval === 'yearly' ? 12 : 1,
          frequency_type: 'months',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create subscription');
      }

      const data = await response.json();
      
      // Redirigir al usuario a la página de pago de MercadoPago
      window.location.href = data.init_point;
      
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsProcessing(false);
    }
  }

  // If user already has an active subscription
  if (existingSubscription) {
    return (
      <div className="container py-10 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{t("alreadySubscribed")}</CardTitle>
            <CardDescription>
              {t("alreadySubscribedDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t("activeSubscriptionAlert")}</AlertTitle>
              <AlertDescription>
                {t("visitDashboardToManage")}
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => router.push(`/${locale}/dashboard/subscriptions`)}
              className="w-full"
            >
              {t("goToDashboard")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("subscriptionCheckout")}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("checkoutTitle")}</CardTitle>
              <CardDescription>
                {t("checkoutDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{t("errorTitle")}</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="text-center py-4">
                <Button 
                  onClick={processSubscription}
                  disabled={isProcessing}
                  size="lg"
                  className="w-full"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  {isProcessing ? t("processing") : t("payWithMercadoPago")}
                </Button>
                
                <p className="text-sm text-muted-foreground mt-4">
                  {t("redirectToMercadoPago")} <ExternalLink className="inline-block h-3 w-3" />
                </p>
                
                <Alert className="mt-6 bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                  <AlertTitle>{t("securePayment")}</AlertTitle>
                  <AlertDescription>
                    {t("securePaymentDescription")}
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t("orderSummary")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">{plan.name}</span>
                  <span>{formatCurrency(price, plan.currency_id)}</span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <span>
                    {interval === "yearly" 
                      ? t("billedAnnually") 
                      : t("billedMonthly")}
                  </span>
                  <br />
                  <span>
                    {interval === "yearly" 
                      ? `(${formatCurrency(price / 12, plan.currency_id)} / ${t("month")})` 
                      : ""}
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold">
                  <span>{t("total")}</span>
                  <span>{formatCurrency(price, plan.currency_id)}</span>
                </div>
                
                {interval === "yearly" && (
                  <div className="text-sm text-green-600 font-medium text-right">
                    {t("youSave")} {formatCurrency(plan.price * 12 * 0.2, plan.currency_id)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 