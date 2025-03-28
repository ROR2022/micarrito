"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface SubscriptionButtonProps {
  planId: string;
  buttonText?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  backUrl?: string;
}

export function SubscriptionButton({
  planId,
  buttonText,
  variant = "default",
  className = "",
  backUrl,
}: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const t = useTranslations("Subscriptions");

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);

      // Crear suscripción
      const response = await fetch("/api/subscriptions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan_id: planId,
          back_url: backUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la suscripción");
      }

      const data = await response.json();

      // Redireccionar a MercadoPago para completar la suscripción
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error("No se pudo obtener la URL de suscripción");
      }

    } catch (error) {
      console.error("Error en el proceso de suscripción:", error);
      toast({
        variant: "destructive",
        title: t("errorTitle"),
        description: t("errorDescription"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={isLoading}
      variant={variant}
      className={className}
    >
      {isLoading ? t("processing") : buttonText || t("subscribe")}
    </Button>
  );
} 