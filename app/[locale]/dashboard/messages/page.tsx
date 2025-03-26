"use client";
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export default function MessagesPage() {
  return (
    <MessagesClient />
  );
}



function MessagesClient() {
  const t = useTranslations('Dashboard.messages');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('manage')}
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('inbox')}</CardTitle>
          <CardDescription>
            {t('recentConversations')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            {t('noMessages')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 