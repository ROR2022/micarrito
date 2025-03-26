"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function SettingsPage() {
  return (
    <SettingsClient />
  );
}





function SettingsClient() {
  const t = useTranslations('Dashboard.settings');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('manage')}
        </p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">{t('general')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('notifications')}</TabsTrigger>
          <TabsTrigger value="privacy">{t('privacy')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('generalSettings')}</CardTitle>
              <CardDescription>
                {t('generalDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="language" />
                <Label htmlFor="language">{t('displayEnglish')}</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="marketing" />
                <Label htmlFor="marketing">{t('marketingEmails')}</Label>
              </div>
              
              <Button>
                {t('saveSettings')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('notificationPreferences')}</CardTitle>
              <CardDescription>
                {t('notificationDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="new-message" />
                <Label htmlFor="new-message">{t('newMessageNotif')}</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="listing-updates" />
                <Label htmlFor="listing-updates">{t('listingUpdates')}</Label>
              </div>
              
              <Button>
                {t('savePreferences')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('privacySettings')}</CardTitle>
              <CardDescription>
                {t('privacyDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="profile-visibility" />
                <Label htmlFor="profile-visibility">{t('publicProfile')}</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="activity-tracking" />
                <Label htmlFor="activity-tracking">{t('activityTracking')}</Label>
              </div>
              
              <Button>
                {t('updatePrivacy')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 