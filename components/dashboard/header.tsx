"use client";

import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  const t = useTranslations('Dashboard.common');

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-xl">{t('dashboard')}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="rounded-md border pl-8 pr-2 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        
      </div>
    </header>
  );
} 