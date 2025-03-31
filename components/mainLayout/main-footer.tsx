import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Linkedin, Facebook, Instagram, Twitter, Car, MapPin, Phone, Mail, Clock, ShieldCheck, Award, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MainFooter({locale}:{locale: string}) {
    const t = useTranslations('Footer');
    const commonT = useTranslations('Common');
    const navT = useTranslations('MainNavbar');
    
    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container py-12">
                {/* Newsletter Section */}
                <div className="mb-12 p-6 rounded-lg border bg-card shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div>
                            <h3 className="text-xl font-bold mb-2">{t('newsletter.title')}</h3>
                            <p className="text-muted-foreground">{t('newsletter.description')}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input 
                                type="email" 
                                placeholder={t('newsletter.placeholder')} 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                            />
                            <Button className="whitespace-nowrap">{t('newsletter.button')}</Button>
                        </div>
                    </div>
                </div>
                
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand/Logo Section */}
                    <div className="space-y-4">
                        <Link href={`/${locale}`} className="flex items-center gap-2">
                            <Car className="h-6 w-6 text-primary" />
                            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">{commonT('appTitle')}</span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            {t('description')}
                        </p>
                        <div className="flex flex-col space-y-2 mt-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>{t('contactInfo.address')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>{t('contactInfo.phone')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>{t('contactInfo.email')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>{t('contactInfo.hours')}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-medium">{t('quickLinks')}</h3>
                        <nav className="grid grid-cols-1 gap-2" aria-label={t('quickLinksAriaLabel')}>
                            <Link href={`/${locale}/listings`} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                                <Car className="h-4 w-4" />
                                {t('listings')}
                            </Link>
                            <Link href={`/${locale}/sell`} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                                <Truck className="h-4 w-4" />
                                {t('sell')}
                            </Link>
                            <Link href={`/${locale}/financing`} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4" />
                                {t('financing')}
                            </Link>
                            <Link href={`/${locale}/about`} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                {t('about')}
                            </Link>
                            <Link href={`/${locale}/blog`} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                {t('blog')}
                            </Link>
                            <Link href={`/${locale}/contact`} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                {t('contact')}
                            </Link>
                        </nav>
                    </div>
                    
                    {/* Categorías de Vehículos */}
                    <div className="space-y-4">
                        <h3 className="font-medium">{t('categories')}</h3>
                        <nav className="grid grid-cols-1 gap-2">
                            <Link href={`/${locale}/listings?category=sedan`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {navT('sedan')}
                            </Link>
                            <Link href={`/${locale}/listings?category=suv`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {navT('suv')}
                            </Link>
                            <Link href={`/${locale}/listings?category=hatchback`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {navT('hatchback')}
                            </Link>
                            <Link href={`/${locale}/listings?category=pickup`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {navT('pickup')}
                            </Link>
                            <Link href={`/${locale}/listings?category=luxury`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {t('luxury')}
                            </Link>
                            <Link href={`/${locale}/listings?category=electric`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {t('electric')}
                            </Link>
                        </nav>
                    </div>
                    
                    {/* Legal Section and Social Media */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-medium mb-4">{t('legal')}</h3>
                            <nav className="grid grid-cols-1 gap-2" aria-label={t('legalAriaLabel')}>
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
                        
                        <div>
                            <h3 className="font-medium mb-4">{t('followUs')}</h3>
                            <div className="flex space-x-4">
                                <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                                    <Facebook className="h-5 w-5" />
                                </Link>
                                <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                                    <Instagram className="h-5 w-5" />
                                </Link>
                                <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                                    <Twitter className="h-5 w-5" />
                                </Link>
                                <Link href="https://linkedin.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                                    <Linkedin className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                        
                        {/* Payment Methods */}
                        <div>
                            <h3 className="font-medium mb-4">{t('paymentMethods')}</h3>
                            <div className="flex flex-wrap gap-2">
                                <div className="h-8 w-12 bg-muted/30 rounded flex items-center justify-center text-xs text-muted-foreground">Visa</div>
                                <div className="h-8 w-12 bg-muted/30 rounded flex items-center justify-center text-xs text-muted-foreground">MC</div>
                                <div className="h-8 w-12 bg-muted/30 rounded flex items-center justify-center text-xs text-muted-foreground">Amex</div>
                                <div className="h-8 w-12 bg-muted/30 rounded flex items-center justify-center text-xs text-muted-foreground">PayPal</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Trust badges */}
                <div className="border-t mt-8 pt-8 mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="flex flex-col items-center">
                            <ShieldCheck className="h-8 w-8 text-primary mb-2" />
                            <h4 className="text-sm font-medium">{t('trustBadges.verifiedCars.title')}</h4>
                            <p className="text-xs text-muted-foreground">{t('trustBadges.verifiedCars.description')}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Award className="h-8 w-8 text-primary mb-2" />
                            <h4 className="text-sm font-medium">{t('trustBadges.warranty.title')}</h4>
                            <p className="text-xs text-muted-foreground">{t('trustBadges.warranty.description')}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Truck className="h-8 w-8 text-primary mb-2" />
                            <h4 className="text-sm font-medium">{t('trustBadges.delivery.title')}</h4>
                            <p className="text-xs text-muted-foreground">{t('trustBadges.delivery.description')}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Car className="h-8 w-8 text-primary mb-2" />
                            <h4 className="text-sm font-medium">{t('trustBadges.inventory.title')}</h4>
                            <p className="text-xs text-muted-foreground">{t('trustBadges.inventory.description')}</p>
                        </div>
                    </div>
                </div>
                
                {/* Copyright Section */}
                <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} {commonT('appTitle')}. {t('allRightsReserved')}
                    </p>
                    <p className="text-sm text-muted-foreground mt-4 md:mt-0">
                        {t('madeWith')} <span className="text-primary">❤</span> CDMX, México
                    </p>
                </div>
            </div>
        </footer>
    );
}