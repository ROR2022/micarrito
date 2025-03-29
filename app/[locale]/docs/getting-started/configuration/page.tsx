import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function ConfigurationPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.configuration' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{t('configuration')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('supabaseSetup')}</h2>
        <p className="leading-7">
          Supabase is the backbone of MarketFlex, providing authentication, database, and storage services. Follow these steps to set up your Supabase project:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Create a new project in your Supabase dashboard</li>
          <li>Set up authentication providers (email/password, social logins)</li>
          <li>Apply the database migration scripts included in the <code>supabase/migrations</code> folder</li>
          <li>Set up storage buckets for product images and user avatars</li>
          <li>Configure Row Level Security (RLS) policies for your tables</li>
        </ol>
        <p className="leading-7">
          Detailed instructions for each step can be found in our Supabase integration guide.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('mercadopagoSetup')}</h2>
        <p className="leading-7">
          MercadoPago is used for payment processing. To configure it:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Register for a MercadoPago developer account</li>
          <li>Create an application to obtain your API keys</li>
          <li>Configure webhooks to point to your application&apos;s webhook endpoint</li>
          <li>Set up your accepted payment methods and currencies</li>
          <li>If using subscription plans, create them in the MercadoPago dashboard</li>
        </ol>
        <p className="leading-7">
          Make sure to update your environment variables with the MercadoPago credentials.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('appSettings')}</h2>
        <p className="leading-7">
          Configure your MarketFlex application settings:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Marketplace Name:</strong> Update the application name in the configuration file</li>
          <li><strong>Supported Languages:</strong> Add or remove languages in the i18n configuration</li>
          <li><strong>Theme Customization:</strong> Modify the theme variables in the tailwind config</li>
          <li><strong>SEO Settings:</strong> Update metadata in the layout files</li>
          <li><strong>Email Templates:</strong> Customize email templates in the email directory</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('customizationOptions')}</h2>
        <p className="leading-7">
          MarketFlex can be customized to fit your specific marketplace needs:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Dynamic Fields:</strong> Configure custom fields for your listings in the admin dashboard</li>
          <li><strong>Commission Settings:</strong> Set your commission rates in the admin dashboard</li>
          <li><strong>Homepage Layout:</strong> Modify the landing page components to highlight your marketplace&apos;s features</li>
          <li><strong>Legal Documents:</strong> Update the terms of service, privacy policy, and other legal pages</li>
          <li><strong>Email Notifications:</strong> Configure which events trigger email notifications</li>
        </ul>
        <p className="leading-7">
          For more advanced customizations, you can modify the codebase directly. See our development guide for best practices.
        </p>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/getting-started/installation`} className="text-primary hover:underline">
          ← {t('installation')}
        </Link>
        <Link href={`/${locale}/docs/architecture`} className="text-primary hover:underline">
          {t('architecture')} →
        </Link>
      </div>
    </div>
  );
} 