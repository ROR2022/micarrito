import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
//import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

/* export async function generateMetadata({
  params
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Docs' });
  return {
    title: `${t('nav.architecture')} - ${t('metadata.title')}`,
    description: t('metadata.description'),
  };
} */

export default async function ArchitecturePage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.architecture' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{t('architecture')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('techStack')}</h2>
        <p className="leading-7">
          MarketFlex is built using modern technologies, focusing on performance, scalability, and developer experience:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Frontend:</strong> Next.js, React, TypeScript, TailwindCSS, Shadcn UI components</li>
          <li><strong>Backend:</strong> Next.js API routes, Supabase Functions</li>
          <li><strong>Database:</strong> PostgreSQL (via Supabase)</li>
          <li><strong>Authentication:</strong> Supabase Auth</li>
          <li><strong>Storage:</strong> Supabase Storage</li>
          <li><strong>Payments:</strong> MercadoPago SDK</li>
          <li><strong>i18n:</strong> next-intl for internationalization</li>
          <li><strong>Deployment:</strong> Vercel, Supabase Cloud</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('appStructure')}</h2>
        <p className="leading-7">
          The application follows a modular structure with clear separation of concerns:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
          <code>{`marketflex/
├── app/                      # Next.js App Router
│   ├── [locale]/             # Internationalized routes
│   │   ├── dashboard/        # Dashboard pages
│   │   ├── listings/         # Listings pages
│   │   ├── checkout/         # Checkout flow
│   │   └── api/              # API endpoints
├── components/               # Reusable React components
│   ├── ui/                   # UI components
│   ├── dashboard/            # Dashboard components
│   ├── landing/              # Landing page components
│   └── payments/             # Payment components
├── lib/                      # Utility functions and services
│   ├── supabase/             # Supabase client and helpers
│   ├── mercadopago/          # MercadoPago integration
│   └── utils/                # General utilities
├── messages/                 # i18n translation files
├── prisma/                   # Database schema (if using Prisma)
├── public/                   # Static assets
└── styles/                   # Global styles`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('keyComponents')}</h2>
        <p className="leading-7">
          MarketFlex is composed of several key components that work together:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>User Authentication System:</strong> Handles user registration, login, and profile management</li>
          <li><strong>Listing Management:</strong> Creates, edits, displays, and searches marketplace listings</li>
          <li><strong>Dynamic Fields Engine:</strong> Configures and renders custom fields for different listing types</li>
          <li><strong>Payment Processing:</strong> Integrates with MercadoPago for secure payments</li>
          <li><strong>Subscription System:</strong> Manages seller subscription plans and recurring payments</li>
          <li><strong>Admin Dashboard:</strong> Provides controls and statistics for marketplace administrators</li>
          <li><strong>Messaging System:</strong> Enables communication between buyers and sellers</li>
          <li><strong>Internationalization:</strong> Supports multiple languages and locales</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('dataFlow')}</h2>
        <p className="leading-7">
          Data flows through the application in the following way:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>User interactions trigger events in the React components</li>
          <li>Events are handled by component logic or custom hooks</li>
          <li>Data fetching and mutations happen through API routes or direct Supabase calls</li>
          <li>Database operations are governed by Row Level Security (RLS) policies</li>
          <li>Results flow back to the components for rendering</li>
          <li>Real-time updates are handled through Supabase&apos;s realtime subscriptions</li>
        </ol>
        <p className="leading-7 mt-4">
          This architecture ensures separation of concerns and maintainable code structure.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('extensionPoints')}</h2>
        <p className="leading-7">
          MarketFlex is designed to be extended in several ways:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Custom Fields:</strong> Add new field types to the dynamic fields engine</li>
          <li><strong>Payment Gateways:</strong> Implement additional payment providers beyond MercadoPago</li>
          <li><strong>Authentication Providers:</strong> Add social login options via Supabase Auth</li>
          <li><strong>Notification Channels:</strong> Extend beyond email to SMS, push notifications, etc.</li>
          <li><strong>Custom Themes:</strong> Create additional theme options beyond the defaults</li>
          <li><strong>Analytics Integration:</strong> Connect with third-party analytics services</li>
        </ul>
        <p className="leading-7 mt-4">
          The modular architecture makes it easy to extend functionality without modifying core components.
        </p>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/getting-started/configuration`} className="text-primary hover:underline">
          ← {t('configuration')}
        </Link>
        <Link href={`/${locale}/docs/customization`} className="text-primary hover:underline">
          {t('customization')} →
        </Link>
      </div>
    </div>
  );
} 