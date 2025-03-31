'use client';

import { useTranslations } from 'next-intl';
import LanguageSelectorNextIntl from '../language-selector-next-intl';
import { ThemeSwitcher } from '../theme-switcher';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Car, DollarSign, Search, Heart, Bell, UserCircle, ShieldCheck, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOutAction } from '@/app/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MainNavbar({
  locale,
  userEmail,
}: {
  locale: string;
  userEmail: string | null;
}) {
  const t = useTranslations('MainNavbar');
  const commonT = useTranslations('Common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //si userEmail es distinto a null, significa que el usuario está autenticado

  //es importante que el locale se aplique a todas las rutas de los links
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo / Brand Name */}
        <div className="flex items-center gap-2">
          <Link href={`/${locale}`} className="flex items-center space-x-2" aria-label={t('home')}>
            <Car className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">{commonT('appTitle')}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6" aria-label={t('mainNavigation')}>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1">
              <Car className="h-4 w-4" /> {t('buy')}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={`/${locale}/listings`}>
                  {t('allVehicles')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/${locale}/listings?category=sedan`}>
                  {t('sedan')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/${locale}/listings?category=suv`}>
                  {t('suv')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/${locale}/listings?category=hatchback`}>
                  {t('hatchback')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/${locale}/listings?category=pickup`}>
                  {t('pickup')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/${locale}/listings/search`}>
                  <Search className="h-4 w-4 mr-2" /> {t('advancedSearch')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link
            href={`/${locale}/sell`}
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <DollarSign className="h-4 w-4" /> {t('sell')}
          </Link>
          
          <Link
            href={`/${locale}/financing`}
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <ShieldCheck className="h-4 w-4" /> {t('financing')}
          </Link>
          
          <Link
            href={`/${locale}/help`}
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <HelpCircle className="h-4 w-4" /> {t('help')}
          </Link>
          
          {userEmail && (
            <Link
              href={`/${locale}/dashboard`}
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
            >
              <UserCircle className="h-4 w-4" /> {t('myAccount')}
            </Link>
          )}
        </nav>

        {/* Actions Group */}
        <div className="flex items-center gap-4">
          {/* Search Icon for mobile */}
          <Button variant="ghost" size="icon" className="lg:hidden" asChild>
            <Link href={`/${locale}/listings/search`}>
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          
          {/* Favorites - Only visible when logged in */}
          {userEmail && (
            <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
              <Link href={`/${locale}/favorites`}>
                <Heart className="h-5 w-5" />
              </Link>
            </Button>
          )}
          
          {/* Notifications - Only visible when logged in */}
          {userEmail && (
            <Button variant="ghost" size="icon" className="hidden sm:flex relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
          )}

          {/* Language Selector with improved styling  oculto para la version basica de la app*/}
          <div className="hidden">
            <LanguageSelectorNextIntl />
          </div>

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Authentication */}
          {userEmail ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full border-2 border-primary/20">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/${locale}/dashboard`}>{t('dashboard')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/${locale}/profile`}>{t('profile')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/${locale}/favorites`}>{t('favorites')}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action={signOutAction} className="w-full">
                    <Button type="submit" variant="ghost" className="w-full justify-start px-2 h-8">
                      {t('signOut')}
                    </Button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-full px-4" asChild>
                <Link href={`/${locale}/sign-in`}>{t('login')}</Link>
              </Button>
              <Button size="sm" className="rounded-full px-4" asChild>
                <Link href={`/${locale}/sign-up`}>{t('signup')}</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="container lg:hidden py-4">
          <nav className="flex flex-col space-y-4">
            <Link
              href={`/${locale}/listings`}
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Car className="h-4 w-4" /> {t('allVehicles')}
            </Link>
            <Link
              href={`/${locale}/sell`}
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <DollarSign className="h-4 w-4" /> {t('sellMyCar')}
            </Link>
            <Link
              href={`/${locale}/financing`}
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShieldCheck className="h-4 w-4" /> {t('financing')}
            </Link>
            <Link
              href={`/${locale}/help`}
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <HelpCircle className="h-4 w-4" /> {t('helpCenter')}
            </Link>
            {userEmail && (
              <Link
                href={`/${locale}/dashboard`}
                className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserCircle className="h-4 w-4" /> {t('myAccount')}
              </Link>
            )}
            
            {/* Separator */}
            <div className="border-t my-2"></div>
            
            {/* Additional links */}
            <Link
              href={`/${locale}/about`}
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('about')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('contact')}
            </Link>
            
            {/* Language selector oculto para la version basica de la app*/}
            <div className="px-4 py-2 hidden">
              <LanguageSelectorNextIntl />
            </div>
            
            {/* Authentication for mobile */}
            {userEmail ? (
              <div className="flex flex-col space-y-2 px-4 py-2">
                <div className="text-sm font-medium">Hola, {userEmail}!</div>
                <form action={signOutAction} className="w-full">
                  <Button type="submit" variant="outline" className="w-full">
                    {t('signOut')}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="pt-2 flex flex-col space-y-2 px-4">
                <Button variant="outline" asChild className="w-full">
                  <Link href={`/${locale}/sign-in`} onClick={() => setIsMenuOpen(false)}>
                    {t('login')}
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href={`/${locale}/sign-up`} onClick={() => setIsMenuOpen(false)}>
                    {t('signup')}
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}


