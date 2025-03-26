"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ListingsPage() {
  return (
    <ListingsClient />
  );
}



function ListingsClient() {
  const t = useTranslations('Dashboard.listings');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('createNew')}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('allListings')}</CardTitle>
          <CardDescription>
            {t('manageListings')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            {t('noListings')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 