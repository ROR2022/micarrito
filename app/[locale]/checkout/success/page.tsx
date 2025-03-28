"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useLocale } from "next-intl";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const t = useTranslations("Checkout");
  const { toast } = useToast();
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const locale = useLocale();
  // Extraer el external_reference de la URL
  const externalReference = searchParams.get("external_reference");

  useEffect(() => {
    // Notificar al usuario sobre el pago exitoso
    toast({
      title: t("successTitle"),
      description: t("successDescription"),
    });

    // Obtener detalles de la transacción desde el backend
    if (externalReference) {
      const getTransactionDetails = async () => {
        try {
          const response = await fetch(`/api/payments/transaction?external_reference=${externalReference}`);
          if (response.ok) {
            const data = await response.json();
            setTransactionId(data.id);
          }
        } catch (error) {
          console.error("Error al obtener detalles de la transacción:", error);
        }
      };

      getTransactionDetails();
    }
  }, [externalReference, t, toast]);

  return (
    <div className="container max-w-md py-12">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>{t("successTitle")}</CardTitle>
          <CardDescription>{t("successDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {transactionId && (
            <p className="text-center text-sm text-muted-foreground">
              {t("transactionId")}: {transactionId}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant="outline">
            <Link href={`/${locale}/dashboard`}>{t("backToDashboard")}</Link>
          </Button>
          <Button asChild>
            <Link href={`/${locale}/listings`}>{t("continueShopping")}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 