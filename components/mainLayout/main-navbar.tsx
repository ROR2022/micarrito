'use client';

import { useTranslations } from 'next-intl';
import LanguageSelectorNextIntl from '../language-selector-next-intl';
import { ThemeSwitcher } from '../theme-switcher';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOutAction } from '@/app/actions';

export default function MainNavbar({
  locale,
  userEmail,
}: {
  locale: string;
  userEmail: string | null;
}) {
  const t = useTranslations('MainNavbar');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //si userEmail es distinto a null, significa que el usuario está autenticado

  //es importante que el locale se aplique a todas las rutas de los links
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo / Brand Name */}
        <div className="flex items-center gap-2">
          <Link href={`/${locale}`} className="flex items-center space-x-2" aria-label={t('home')}>
            <span className="font-bold text-xl">MarketFlex</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6" aria-label={t('mainNavigation')}>
          <Link
            href={`/${locale}/listings`}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('listings')}
          </Link>
          <Link
            href={`/${locale}/subscriptions`}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('subscriptions')}
          </Link>
          {!userEmail && <>
            <Link
            href={`/${locale}/about`}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('about')}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('contact')}
          </Link>
          </>}
          
          {userEmail && (
            <Link
              href={`/${locale}/dashboard`}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t('dashboard')}
            </Link>
          )}
        </nav>

        {/* Actions Group */}
        <div className="flex items-center gap-4">
          {/* Language Selector with improved styling */}
          <div className="hidden lg:flex">
            <LanguageSelectorNextIntl />
          </div>

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Authentication */}
          {userEmail ? (
            <div className="hidden lg:flex items-center gap-4">
              Hey, {userEmail}!
              <form action={signOutAction}>
                <Button type="submit" variant={'outline'}>
                  Sign out
                </Button>
              </form>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/${locale}/sign-in`}>{t('login')}</Link>
              </Button>
              <Button size="sm" asChild>
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
              className="px-2 py-1 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('listings')}
            </Link>
            <Link
              href={`/${locale}/subscriptions`}
              className="px-2 py-1 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('subscriptions')}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="px-2 py-1 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('about')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="px-2 py-1 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('contact')}
            </Link>
            {userEmail && (
              <Link
                href={`/${locale}/dashboard`}
                className="px-2 py-1 text-sm font-medium rounded-md hover:bg-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('dashboard')}
              </Link>
            )}
            <div className="pt-2 lg:hidden">
              <LanguageSelectorNextIntl />
            </div>
            {userEmail ? (
            <div className="flex flex-col items-center gap-4">
              Hey, {userEmail}!
              <form action={signOutAction}>
                <Button type="submit" variant={'outline'}>
                  Sign out
                </Button>
              </form>
            </div>
          ) : (
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" asChild>
                <Link href={`/${locale}/sign-in`} onClick={() => setIsMenuOpen(false)}>
                  {t('login')}
                </Link>
              </Button>
              <Button asChild>
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
