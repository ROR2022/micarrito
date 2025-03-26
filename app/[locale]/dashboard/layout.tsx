
import React from 'react'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { Sidebar } from '@/components/dashboard/sidebar';
import DashboardClient from './dashboard-client';

export default async function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const locale = await getLocale();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect(`/${locale}/sign-in`);
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <DashboardClient>
        {children}
      </DashboardClient>
    </div>
  )
}



