import React from 'react'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

const layoutDashboard = async ({ children }: { children: React.ReactNode }) => {
  const locale = await getLocale();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/${locale}/sign-in`);
  }
  return (
    <div>
      
      {children}
    </div>
  )
}

export default layoutDashboard;
