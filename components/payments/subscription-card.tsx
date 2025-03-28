"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/mercadopago/utils";
import { useTranslations } from "next-intl";
import { MercadoPagoSubscriptionResponse } from "@/lib/mercadopago/types";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency_id: string;
  features: string[];
  mercado_pago_plan_id: string;
}

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  isActive?: boolean;
  className?: string;
}

export function SubscriptionCard({ plan, isActive = false, className = "" }: SubscriptionCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("Subscriptions");

  const handleSubscribe = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      // Llamar a nuestra API para crear una suscripción
      const response = await fetch("/api/payments/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan_id: plan.id,
          reason: `Suscripción a ${plan.name}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al crear suscripción: ${response.status}`);
      }

      // Obtener la suscripción creada
      const subscription = await response.json() as MercadoPagoSubscriptionResponse;
      
      // Determinar si usar la URL de sandbox o producción
      const redirectUrl = process.env.NODE_ENV === "production" 
        ? subscription.init_point 
        : subscription.sandbox_init_point;
      
      // Redirigir al usuario a la página de suscripción de MercadoPago
      window.location.href = redirectUrl;
      
    } catch (error) {
      console.error("Error al suscribirse:", error);
      alert(t("errorProcessingSubscription"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`flex flex-col ${className}`}>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="text-3xl font-bold mb-4">
          {formatPrice(plan.price, plan.currency_id)}/{t("month")}
        </div>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubscribe} 
          disabled={isLoading || isActive} 
          className="w-full"
          variant={isActive ? "outline" : "default"}
        >
          {isActive ? t("currentPlan") : isLoading ? t("processing") : t("subscribe")}
        </Button>
      </CardFooter>
    </Card>
  );
} 