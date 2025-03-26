"use client"

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, Shield, AlertCircle, Handshake, Gavel } from "lucide-react";

export default function TermsPage() {
  const t = useTranslations('Terms');

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
        {/* Introduction section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('introduction.title')}</CardTitle>
            <CardDescription>{t('introduction.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{t('introduction.description')}</p>
          </CardContent>
        </Card>

        {/* Acceptance section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('acceptance.title')}</CardTitle>
            <CardDescription>{t('acceptance.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{t('acceptance.description')}</p>
            <div className="flex items-start space-x-4">
              <FileText className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">{t('acceptance.conditions.title')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('acceptance.conditions.description')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User responsibilities section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('responsibilities.title')}</CardTitle>
            <CardDescription>{t('responsibilities.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{t('responsibilities.description')}</p>
            <div className="grid gap-4 md:grid-cols-2">
              {['account', 'content', 'conduct', 'security'].map((item) => (
                <div key={item} className="flex items-start space-x-2">
                  {item === 'account' && <Scale className="h-5 w-5 text-primary mt-0.5" />}
                  {item === 'content' && <FileText className="h-5 w-5 text-primary mt-0.5" />}
                  {item === 'conduct' && <AlertCircle className="h-5 w-5 text-primary mt-0.5" />}
                  {item === 'security' && <Shield className="h-5 w-5 text-primary mt-0.5" />}
                  <div>
                    <h4 className="font-medium">{t(`responsibilities.items.${item}.title`)}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t(`responsibilities.items.${item}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Intellectual property section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('intellectualProperty.title')}</CardTitle>
            <CardDescription>{t('intellectualProperty.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{t('intellectualProperty.description')}</p>
            <div className="grid gap-4 md:grid-cols-2">
              {['ownership', 'licenses', 'infringement'].map((item) => (
                <div key={item} className="flex items-start space-x-2">
                  <Gavel className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">{t(`intellectualProperty.items.${item}.title`)}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t(`intellectualProperty.items.${item}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Limitation of liability section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('liability.title')}</CardTitle>
            <CardDescription>{t('liability.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{t('liability.description')}</p>
            <div className="flex items-start space-x-4">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">{t('liability.disclaimer.title')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('liability.disclaimer.description')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Changes to terms section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('changes.title')}</CardTitle>
            <CardDescription>{t('changes.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{t('changes.description')}</p>
            <div className="flex items-start space-x-4">
              <Handshake className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">{t('changes.notification.title')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('changes.notification.description')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('contact.title')}</CardTitle>
            <CardDescription>{t('contact.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{t('contact.description')}</p>
            <div className="space-y-2">
              {['email', 'address', 'phone'].map((item) => (
                <p key={item} className="text-sm text-muted-foreground">
                  {t(`contact.details.${item}`)}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 