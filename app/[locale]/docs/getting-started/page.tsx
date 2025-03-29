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
    title: `${t('nav.gettingStarted')} - ${t('metadata.title')}`,
    description: t('metadata.description'),
  };
} */

export default async function GettingStartedPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{t('gettingStarted')}</h1>
      
      <p className="leading-7">
        Welcome to the MarketFlex documentation! This section will help you get started with 
        MarketFlex, a complete boilerplate for developers who want to create customized marketplaces 
        with minimal programming effort.
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Prerequisites</h2>
        <p className="leading-7">
          Before you begin, make sure you have the following installed:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Node.js (v18 or later)</li>
          <li>npm or yarn</li>
          <li>Git</li>
          <li>A Supabase account</li>
          <li>A MercadoPago account (for payment processing)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Quick Start</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <div>
              <p className="font-medium">Clone the repository:</p>
              <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
                <code>git clone https://github.com/yourusername/marketflex.git</code>
              </pre>
            </div>
          </li>
          <li>
            <div>
              <p className="font-medium">Navigate to the project directory:</p>
              <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
                <code>cd marketflex</code>
              </pre>
            </div>
          </li>
          <li>
            <div>
              <p className="font-medium">Install dependencies:</p>
              <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
                <code>npm install</code>
              </pre>
              <p className="text-sm text-muted-foreground mt-2">or with yarn:</p>
              <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
                <code>yarn install</code>
              </pre>
            </div>
          </li>
          <li>
            <div>
              <p className="font-medium">Set up environment variables:</p>
              <p className="text-sm text-muted-foreground mt-2">
                Copy the .env.example file to .env.local and update it with your credentials.
              </p>
              <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
                <code>cp .env.example .env.local</code>
              </pre>
            </div>
          </li>
          <li>
            <div>
              <p className="font-medium">Run the development server:</p>
              <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
                <code>npm run dev</code>
              </pre>
              <p className="text-sm text-muted-foreground mt-2">or with yarn:</p>
              <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
                <code>yarn dev</code>
              </pre>
            </div>
          </li>
        </ol>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
        <p className="leading-7">
          Now that you have MarketFlex running locally, you can:
        </p>
        <ul className="space-y-2">
          <li>
            <Link href={`/${locale}/docs/getting-started/installation`} className="text-primary hover:underline">
              → Read the detailed installation guide
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/docs/getting-started/configuration`} className="text-primary hover:underline">
              → Configure the application
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/docs/architecture`} className="text-primary hover:underline">
              → Learn about the architecture
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/docs/customization`} className="text-primary hover:underline">
              → Start customizing for your needs
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
} 