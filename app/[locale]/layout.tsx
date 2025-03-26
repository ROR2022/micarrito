import React from 'react'
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import MainNavbar from '@/components/mainLayout/main-navbar';
import MainFooter from '@/components/mainLayout/main-footer';
import CookieConsentBanner from '@/components/cookie-consent';
import { createClient } from "@/utils/supabase/server";

const LayoutLocale = async ({children}: {children: React.ReactNode}) => {
    const locale = await getLocale();
    const supabase = await createClient();
    // Cargar los mensajes para el locale
  let messages;
  let userEmail = null;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
    //console.log('messages:..', messages);
  } catch (error) {
    notFound();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    userEmail = user.email || null;
  }
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <main className="min-h-screen flex flex-col items-center">
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
          <MainNavbar locale={locale} userEmail={userEmail} />

          <div className="flex flex-col gap-20 max-w-5xl p-5">
            {children}            
          </div>

          <MainFooter locale={locale} />
        </div>
         <CookieConsentBanner /> 
      </main>
    </NextIntlClientProvider>
  )
}

export default LayoutLocale;