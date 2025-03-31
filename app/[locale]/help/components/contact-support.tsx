"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare } from "lucide-react";

export function ContactSupport() {
  const t = useTranslations("Help");
  const params = useParams();
  const locale = params.locale as string;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="h-full">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Mail className="h-10 w-10 text-primary mb-4" />
          <CardTitle className="text-lg mb-2">{t("contactByEmail")}</CardTitle>
          <CardDescription className="mb-4">{t("contactByEmailDesc")}</CardDescription>
          <Button asChild className="mt-auto w-full">
            <Link href={`/${locale}/contact`}>
              {t("sendEmail")}
            </Link>
          </Button>
        </CardContent>
      </Card>
      
      <Card className="h-full">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Phone className="h-10 w-10 text-primary mb-4" />
          <CardTitle className="text-lg mb-2">{t("contactByPhone")}</CardTitle>
          <CardDescription className="mb-4">{t("contactByPhoneDesc")}</CardDescription>
          <Button variant="outline" asChild className="mt-auto w-full">
            <a href="tel:+525512345678">
              {t("callUs")}
            </a>
          </Button>
        </CardContent>
      </Card>
      
      <Card className="h-full">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <MessageSquare className="h-10 w-10 text-primary mb-4" />
          <CardTitle className="text-lg mb-2">{t("contactByChat")}</CardTitle>
          <CardDescription className="mb-4">{t("contactByChatDesc")}</CardDescription>
          <Button variant="outline" className="mt-auto w-full">
            {t("startChat")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 