import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Github, Linkedin, Facebook } from 'lucide-react';

export default function MainFooter({locale}:{locale: string}) {
    const t = useTranslations('Footer');
    
    return (
        <footer className="border-t bg-background">
            <div className="container py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand/Logo Section */}
                    <div className="space-y-4">
                        <Link href={`/${locale}`} className="flex items-center">
                            <span className="font-bold text-xl">MarketFlex</span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            {t('description')}
                        </p>
                    </div>
                    
                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-sm">{t('quickLinks')}</h3>
                        <nav className="flex flex-col space-y-2" aria-label={t('quickLinksAriaLabel')}>
                            <Link href={`/${locale}/listings`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {t('listings')}
                            </Link>
                            <Link href={`/${locale}/about`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {t('about')}
                            </Link>
                            <Link href={`/${locale}/contact`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {t('contact')}
                            </Link>
                        </nav>
                    </div>
                    
                    {/* Legal Section */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-sm">{t('legal')}</h3>
                        <nav className="flex flex-col space-y-2" aria-label={t('legalAriaLabel')}>
                            <Link href={`/${locale}/privacy`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {t('privacy')}
                            </Link>
                            <Link href={`/${locale}/terms`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {t('terms')}
                            </Link>
                            <Link href={`/${locale}/cookies`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {t('cookies')}
                            </Link>
                        </nav>
                    </div>
                    
                    {/* Social Media */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-sm">{t('followUs')}</h3>
                        <div className="flex space-x-4">
                            <Link href="https://github.com/ROR2022" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="https://www.facebook.com/ramiro.ocampo.191843/" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="https://www.linkedin.com/in/ramiro-ocampo-5a661b1a7/" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            
                        </div>
                    </div>
                </div>
                
                {/* Copyright Section */}
                <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} MarketFlex. {t('allRightsReserved')}
                    </p>
                    <p className="text-sm text-muted-foreground mt-4 md:mt-0">
                        {t('madeWith')} <span className="text-primary">❤</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}