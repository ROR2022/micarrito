"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function CheckoutFailurePage() {
  const t = useTranslations("Checkout");
  const { toast } = useToast();
  
  useEffect(() => {
    // Notificar al usuario sobre el fallo en el pago
    toast({
      variant: "destructive",
      title: t("failureTitle"),
      description: t("failureDescription"),
    });
  }, [t, toast]);

  return (
    <div className="container max-w-md py-12">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle>{t("failureTitle")}</CardTitle>
          <CardDescription>{t("failureDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            {t("tryAgainMessage")}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant="outline">
            <Link href="/dashboard">{t("backToDashboard")}</Link>
          </Button>
          <Button asChild>
            <Link href="/checkout">{t("tryAgain")}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 