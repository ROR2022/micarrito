"use client"

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Database, Share2, Eye, Trash2 } from "lucide-react";

export default function PrivacyPage() {
  const t = useTranslations('Privacy');

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

        {/* Data collection section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dataCollection.title')}</CardTitle>
            <CardDescription>{t('dataCollection.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {['personal', 'usage', 'technical'].map((type) => (
              <div key={type} className="flex items-start space-x-4">
                <div className="mt-1">
                  {type === 'personal' && <Database className="h-5 w-5 text-primary" />}
                  {type === 'usage' && <Share2 className="h-5 w-5 text-primary" />}
                  {type === 'technical' && <Lock className="h-5 w-5 text-primary" />}
                </div>
                <div>
                  <h3 className="font-medium">{t(`dataCollection.types.${type}.title`)}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`dataCollection.types.${type}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Data usage section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dataUsage.title')}</CardTitle>
            <CardDescription>{t('dataUsage.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{t('dataUsage.description')}</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {['service', 'improvement', 'communication', 'security'].map((item) => (
                <li key={item}>{t(`dataUsage.purposes.${item}`)}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Data protection section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dataProtection.title')}</CardTitle>
            <CardDescription>{t('dataProtection.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{t('dataProtection.description')}</p>
            <div className="grid gap-4 md:grid-cols-2">
              {['encryption', 'access', 'backup', 'compliance'].map((item) => (
                <div key={item} className="flex items-start space-x-2">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">{t(`dataProtection.measures.${item}.title`)}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t(`dataProtection.measures.${item}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User rights section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('userRights.title')}</CardTitle>
            <CardDescription>{t('userRights.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{t('userRights.description')}</p>
            <div className="grid gap-4 md:grid-cols-2">
              {['access', 'correction', 'deletion', 'portability'].map((item) => (
                <div key={item} className="flex items-start space-x-2">
                  {item === 'access' && <Eye className="h-5 w-5 text-primary mt-0.5" />}
                  {item === 'correction' && <Share2 className="h-5 w-5 text-primary mt-0.5" />}
                  {item === 'deletion' && <Trash2 className="h-5 w-5 text-primary mt-0.5" />}
                  {item === 'portability' && <Database className="h-5 w-5 text-primary mt-0.5" />}
                  <div>
                    <h4 className="font-medium">{t(`userRights.rights.${item}.title`)}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t(`userRights.rights.${item}.description`)}
                    </p>
                  </div>
                </div>
              ))}
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