import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function FeaturesPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.features' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{content('title')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('userManagement')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>User Registration and Authentication:</strong> Secure sign-up and login processes with email verification</li>
          <li><strong>User Profiles:</strong> Customizable profiles with avatars, bios, and contact information</li>
          <li><strong>Role-Based Access Control:</strong> Different permissions for buyers, sellers, and administrators</li>
          <li><strong>Social Authentication:</strong> Optional login with Google, GitHub, and other providers</li>
          <li><strong>Password Recovery:</strong> Secure password reset workflows</li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('marketplaceFeatures')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Dynamic Listings:</strong> Customizable fields for different product/service categories</li>
          <li><strong>Advanced Search:</strong> Filtering, sorting, and full-text search capabilities</li>
          <li><strong>Responsive Gallery:</strong> Mobile-friendly image galleries for listings</li>
          <li><strong>Favorites/Wishlist:</strong> Save items for later viewing</li>
          <li><strong>Reviews and Ratings:</strong> User feedback system for listings and sellers</li>
          <li><strong>Map Integration:</strong> Optional location-based features for local marketplaces</li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('sellerTools')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Listing Management:</strong> Create, edit, pause, and delete listings</li>
          <li><strong>Order Management:</strong> Track and fulfill orders</li>
          <li><strong>Sales Analytics:</strong> Basic performance metrics and insights</li>
          <li><strong>Subscription Plans:</strong> Tiered seller plans with different features and limits</li>
          <li><strong>Promotion Tools:</strong> Featured listings and visibility boosters</li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('adminFeatures')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>User Management:</strong> View, edit, and moderate user accounts</li>
          <li><strong>Listing Moderation:</strong> Review and approve/reject listings</li>
          <li><strong>Category Management:</strong> Create and organize marketplace categories</li>
          <li><strong>Platform Settings:</strong> Configure commission rates, currencies, and other global settings</li>
          <li><strong>Dashboard:</strong> Overview of marketplace performance and activity</li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('paymentSystem')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>MercadoPago Integration:</strong> Secure payment processing for Latin American markets</li>
          <li><strong>Multiple Payment Methods:</strong> Credit cards, bank transfers, cash options, and installments</li>
          <li><strong>Subscription Billing:</strong> Recurring payments for seller plans</li>
          <li><strong>Commission Management:</strong> Automatic fee calculation and platform revenue tracking</li>
          <li><strong>Payment Dispute Handling:</strong> Tools for resolving payment issues</li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('communicationTools')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Direct Messaging:</strong> In-app messaging between buyers and sellers</li>
          <li><strong>Email Notifications:</strong> Automated emails for key events and updates</li>
          <li><strong>Notification Center:</strong> Centralized in-app notifications</li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('customization')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Theming System:</strong> Light, dark, and custom color themes</li>
          <li><strong>Logo and Branding:</strong> Easy customization of marketplace identity</li>
          <li><strong>Layout Options:</strong> Configurable homepage layouts and components</li>
          <li><strong>Legal Content:</strong> Customizable terms of service, privacy policy, and other legal documents</li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('internationalization')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Multi-language Support:</strong> Built-in translations for interface elements</li>
          <li><strong>Right-to-Left (RTL) Support:</strong> For languages like Arabic and Hebrew</li>
          <li><strong>Currency Localization:</strong> Display prices in local formats and currencies</li>
          <li><strong>Date and Time Formatting:</strong> Localized date and time displays</li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('technicalFeatures')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Responsive Design:</strong> Mobile-first approach for all screens and devices</li>
          <li><strong>SEO Optimization:</strong> Structured data, meta tags, and SEO-friendly URLs</li>
          <li><strong>Performance Optimization:</strong> Fast loading times and optimized resources</li>
          <li><strong>Security Features:</strong> CSRF protection, content security policies, and data encryption</li>
          <li><strong>Analytics Integration:</strong> Hooks for connecting to analytics platforms</li>
          <li><strong>GDPR Compliance:</strong> Cookie consent, data privacy tools, and user data management</li>
        </ul>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/architecture`} className="text-primary hover:underline">
          ← {t('architecture')}
        </Link>
        <Link href={`/${locale}/docs/customization`} className="text-primary hover:underline">
          {t('customization')} →
        </Link>
      </div>
    </div>
  );
} 