"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, AlertTriangle } from "lucide-react";

export default function SubscriptionCallbackPage() {
  const searchParams = useSearchParams();
  const t = useTranslations("Subscriptions");
  const { toast } = useToast();
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  
  // Extraer los parámetros de la URL
  const externalReference = searchParams.get("external_reference");
  const paymentStatus = searchParams.get("status");
  
  const isSuccess = paymentStatus === "approved" || paymentStatus === "authorized";

  useEffect(() => {
    // Notificar al usuario sobre el resultado de la suscripción
    if (isSuccess) {
      toast({
        title: t("successTitle"),
        description: t("successDescription"),
      });
    } else {
      toast({
        variant: "destructive",
        title: t("failureTitle"),
        description: t("failureDescription"),
      });
    }

    // Obtener detalles de la suscripción desde el backend
    if (externalReference) {
      const getSubscriptionDetails = async () => {
        try {
          const response = await fetch(`/api/subscriptions/status?external_reference=${externalReference}`);
          if (response.ok) {
            const data = await response.json();
            setSubscriptionId(data.id);
            setStatus(data.status);
          }
        } catch (error) {
          console.error("Error al obtener detalles de la suscripción:", error);
        }
      };

      getSubscriptionDetails();
    }
  }, [externalReference, isSuccess, t, toast]);

  return (
    <div className="container max-w-md py-12">
      <Card>
        <CardHeader className="text-center">
          <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
            {isSuccess ? (
              <Check className="h-6 w-6 text-green-600" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-red-600" />
            )}
          </div>
          <CardTitle>
            {isSuccess ? t("successTitle") : t("failureTitle")}
          </CardTitle>
          <CardDescription>
            {isSuccess ? t("successDescription") : t("failureDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {subscriptionId && (
            <p className="text-center text-sm text-muted-foreground">
              {t("subscriptionId")}: {subscriptionId}
            </p>
          )}
          {status && (
            <p className="text-center text-sm text-muted-foreground">
              {t("status")}: {t(`status.${status}`)}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/dashboard/subscriptions">{t("backToDashboard")}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 