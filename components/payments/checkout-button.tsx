"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface CheckoutButtonProps {
  items: Array<{
    id: string;
    title: string;
    description: string;
    quantity: number;
    currency_id: string;
    unit_price: number;
  }>;
  payer?: {
    email: string;
    name?: string;
  };
  buttonText?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}

export function CheckoutButton({
  items,
  payer,
  buttonText,
  variant = "default",
  className = "",
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const t = useTranslations("Checkout");

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      // Crear preferencia de pago
      const response = await fetch("/api/payments/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          payer,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la preferencia de pago");
      }

      const data = await response.json();

      // Redireccionar al checkout de MercadoPago
      const checkoutUrl = process.env.NODE_ENV === "production" 
        ? data.init_point 
        : data.sandbox_init_point;
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("No se pudo obtener la URL de checkout");
      }

    } catch (error) {
      console.error("Error en el proceso de checkout:", error);
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
      onClick={handleCheckout}
      disabled={isLoading}
      variant={variant}
      className={className}
    >
      {isLoading ? t("processing") : buttonText || t("checkout")}
    </Button>
  );
} 