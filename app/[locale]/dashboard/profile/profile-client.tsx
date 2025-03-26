"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';


export default function ProfileClient({ user }: { user: any }) {
    const t = useTranslations('Dashboard.profile');
    
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
            <CardTitle>{t('personalInfo')}</CardTitle>
            <CardDescription>
              {t('updatePersonal')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input id="email" defaultValue={user?.email} disabled />
              <p className="text-xs text-muted-foreground">
                {t('emailHelp')}
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="name">{t('fullName')}</Label>
              <Input id="name" placeholder={t('fullNamePlaceholder')} />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">{t('phone')}</Label>
              <Input id="phone" placeholder={t('phonePlaceholder')} />
            </div>
            
            <Button>
              {t('saveChanges')}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('password')}</CardTitle>
            <CardDescription>
              {t('updatePassword')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">{t('currentPassword')}</Label>
              <Input id="current-password" type="password" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new-password">{t('newPassword')}</Label>
              <Input id="new-password" type="password" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">{t('confirmPassword')}</Label>
              <Input id="confirm-password" type="password" />
            </div>
            
            <Button>
              {t('updatePasswordBtn')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  } 