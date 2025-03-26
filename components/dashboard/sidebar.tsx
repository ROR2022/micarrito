"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Home, Package2, MessageCircle, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  active: boolean;
}

const SidebarItem = ({ href, icon, title, active }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all',
        active ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
      )}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
};

export function Sidebar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Dashboard.common');

  const navItems = [
    {
      href: `/${locale}/dashboard`,
      icon: <Home className="h-4 w-4" />,
      title: t('dashboard'),
    },
    {
      href: `/${locale}/dashboard/listings`,
      icon: <Package2 className="h-4 w-4" />,
      title: t('listings'),
    },
    {
      href: `/${locale}/dashboard/messages`,
      icon: <MessageCircle className="h-4 w-4" />,
      title: t('messages'),
    },
    {
      href: `/${locale}/dashboard/profile`,
      icon: <User className="h-4 w-4" />,
      title: t('profile'),
    },
    {
      href: `/${locale}/dashboard/settings`,
      icon: <Settings className="h-4 w-4" />,
      title: t('settings'),
    },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-background p-4">
      <div className="flex h-14 items-center border-b px-2 font-semibold">
        MarketFlex
      </div>
      <nav className="flex-1 space-y-2 py-4">
        {navItems.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            title={item.title}
            active={pathname === item.href}
          />
        ))}
      </nav>
      <div className="hidden border-t pt-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-medium">{t('profile')}</p>
          </div>
        </div>
      </div>
    </aside>
  );
} 