"use client"

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ListingsPage() {
  const t = useTranslations('Listings');

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

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for listing cards */}
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>Listings feature will be available soon</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We&apos;re working on implementing the listings feature. Stay tuned for updates!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 