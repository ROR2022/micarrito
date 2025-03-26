"use client"

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

export default function CookiesPage() {
  const t = useTranslations('Cookies');

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {t('title')}
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          {t('subtitle')}
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {/* What are cookies section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('whatAreCookies.title')}</CardTitle>
            <CardDescription>{t('whatAreCookies.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{t('whatAreCookies.description')}</p>
          </CardContent>
        </Card>

        {/* Types of cookies section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('types.title')}</CardTitle>
            <CardDescription>{t('types.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {['essential', 'analytics', 'functional', 'marketing'].map((type) => (
              <div key={type} className="flex items-start space-x-4">
                <div className="mt-1">
                  {t.raw(`types.${type}.required`) ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{t(`types.${type}.title`)}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`types.${type}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* How we use cookies section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('usage.title')}</CardTitle>
            <CardDescription>{t('usage.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{t('usage.description')}</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {['improve', 'analyze', 'personalize', 'remember'].map((item) => (
                <li key={item}>{t(`usage.items.${item}`)}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Cookie management section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('management.title')}</CardTitle>
            <CardDescription>{t('management.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{t('management.description')}</p>
            <div className="space-y-2">
              {['browser', 'preferences', 'thirdParty'].map((item) => (
                <p key={item} className="text-sm text-muted-foreground">
                  {t(`management.options.${item}`)}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 