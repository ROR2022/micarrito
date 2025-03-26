"use client"

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations('Contact');

  return (
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium">{t('email.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('email.value')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium">{t('phone.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('phone.value')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium">{t('address.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('address.value')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>{t('form.title')}</CardTitle>
            <CardDescription>{t('form.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t('form.name')}
                  </label>
                  <Input id="name" placeholder={t('form.namePlaceholder')} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t('form.email')}
                  </label>
                  <Input id="email" type="email" placeholder={t('form.emailPlaceholder')} />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  {t('form.subject')}
                </label>
                <Input id="subject" placeholder={t('form.subjectPlaceholder')} />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {t('form.message')}
                </label>
                <Textarea
                  id="message"
                  placeholder={t('form.messagePlaceholder')}
                  className="min-h-[150px]"
                />
              </div>
              <Button className="w-full">{t('form.submit')}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 