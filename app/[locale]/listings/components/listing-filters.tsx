"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export function ListingFilters() {
  const t = useTranslations('Listings');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('filters')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Placeholder para filtros */}
          <p className="text-sm text-muted-foreground">
            {t('filtersComingSoon')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 