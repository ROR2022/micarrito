"use client"

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
//import { useLocale } from 'next-intl';
//import { Metadata } from 'next';
import { useLocale } from 'next-intl';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';

/* export async function generateMetadata({
  params
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Docs' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
} */

  //eslint-disable-next-line
  type TFunction = (key: string) => string;

interface DocNavItem {
  title: string;
  href: string;
  items?: DocNavItem[];
}

// Componente del Sidebar para evitar duplicación de código
function DocSidebar({ 
  docNavItems, 
  onLinkClick 
}: { 
  docNavItems: DocNavItem[], 
  onLinkClick?: () => void 
}) {
  const locale = useLocale();
  return (
    <div className="h-full w-full overflow-y-auto rounded-lg border bg-background shadow-sm">
      <div className="p-4">
        <Link 
          href={`/${locale}/docs`} 
          className="flex items-center space-x-2"
          onClick={onLinkClick}
        >
          <span className="font-bold">MarketFlex</span>
          <span className="text-sm text-muted-foreground">Docs</span>
        </Link>
      </div>
      <nav className="flex flex-col gap-2 p-4 pt-0">
        {docNavItems.map((item) => (
          <div key={item.href} className="flex flex-col gap-1">
            <Link
              href={item.href}
              className="text-sm font-medium hover:underline"
              onClick={onLinkClick}
            >
              {item.title}
            </Link>
            {item.items?.length && (
              <div className="ml-4 flex flex-col gap-1">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                    onClick={onLinkClick}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

// Función asíncrona para obtener datos del servidor
async function getServerData(locale: string, t: TFunction) {
  //const locale = useLocale();
  //const t = useTranslations({ locale, namespace: 'Docs' });
  
  const docNavItems: DocNavItem[] = [
    {
      title: t('nav.gettingStarted'),
      href: `/${locale}/docs/getting-started`,
      items: [
        {
          title: t('nav.installation'),
          href: `/${locale}/docs/getting-started/installation`,
        },
        {
          title: t('nav.configuration'),
          href: `/${locale}/docs/getting-started/configuration`,
        },
      ],
    },
    {
      title: t('nav.architecture'),
      href: `/${locale}/docs/architecture`,
      items: [
        {
          title: t('nav.database'),
          href: `/${locale}/docs/architecture/database`,
        },
        {
          title: t('nav.components'),
          href: `/${locale}/docs/architecture/components`,
        },
      ],
    },
    {
      title: t('nav.customization'),
      href: `/${locale}/docs/customization`,
      items: [
        {
          title: t('nav.dynamicFields'),
          href: `/${locale}/docs/customization/dynamic-fields`,
        },
        {
          title: t('nav.styling'),
          href: `/${locale}/docs/customization/styling`,
        },
      ],
    },
    {
      title: t('nav.development'),
      href: `/${locale}/docs/development`,
      items: [
        {
          title: t('nav.apiReference'),
          href: `/${locale}/docs/development/api-reference`,
        },
        {
          title: t('nav.hooks'),
          href: `/${locale}/docs/development/hooks`,
        },
      ],
    },
    {
      title: t('nav.integrations'),
      href: `/${locale}/docs/integrations`,
      items: [
        {
          title: t('nav.mercadopago'),
          href: `/${locale}/docs/integrations/mercadopago`,
        },
        {
          title: t('nav.supabase'),
          href: `/${locale}/docs/integrations/supabase`,
        },
      ],
    },
    {
      title: t('nav.deployment'),
      href: `/${locale}/docs/deployment`,
    },
    {
      title: t('nav.faq'),
      href: `/${locale}/docs/faq`,
    },
  ];

  return { docNavItems, locale };
}

export default function DocsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  const t = useTranslations('Docs');
  const [serverData, setServerData] = useState<{ docNavItems: DocNavItem[] } | null>(null);
  // Estado para controlar la apertura/cierre del Sheet
  const [open, setOpen] = useState(false);
  
  // Cargar datos del servidor
  useEffect(() => {
    getServerData(locale, t).then(setServerData);
  }, [locale, t]);

  // Si no hay datos, mostrar un placeholder
  if (!serverData) {
    return <div className="container flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const { docNavItems } = serverData;

  // Función para cerrar el sidebar
  const handleCloseSidebar = () => {
    setOpen(false);
  };

  return (
    <div 
      style={{maxWidth: '90vw'}}
      className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
    >
      {/* Desktop Sidebar - Oculto en móvil */}
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <div className="h-full py-6 pr-6 lg:py-8">
          <DocSidebar docNavItems={docNavItems} />
        </div>
      </aside>

      {/* Mobile Sidebar Toggle Button y Sheet - Visible solo en móvil */}
      <div className="fixed bottom-4 right-4 z-40 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" className="rounded-full shadow-lg">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open Navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85%] sm:w-[350px] pt-12">
            <SheetTitle className="sr-only">Documentation Navigation</SheetTitle>
            <SheetDescription className="sr-only">
              Documentation sections and links to navigate through MarketFlex documentation
            </SheetDescription>
            <DocSidebar 
              docNavItems={docNavItems} 
              onLinkClick={handleCloseSidebar} 
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <main className="py-6 lg:py-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {children}
        </div>
      </main>
    </div>
  );
} 