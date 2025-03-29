import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function InstallationPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.installation' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{t('installation')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('systemRequirements')}</h2>
        <p className="leading-7">
          Before you begin, make sure you have the following software installed:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Node.js 18.0 or later</li>
          <li>npm 7.0+ or yarn 1.22+</li>
          <li>Git</li>
        </ul>
        <p className="leading-7">
          You will also need:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>A Supabase account (for database and authentication)</li>
          <li>A MercadoPago account (for payment processing)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('installationSteps')}</h2>
        
        <h3 className="text-xl font-semibold">{content('cloneRepository')}</h3>
        <p className="leading-7">
          First, clone the MarketFlex repository to your local machine:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
          <code>{`git clone https://github.com/yourusername/marketflex.git
cd marketflex`}</code>
        </pre>

        <h3 className="text-xl font-semibold mt-4">{content('installDependencies')}</h3>
        <p className="leading-7">
          Install the required dependencies using npm or yarn:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
          <code>{`# Using npm
npm install

# OR using yarn
yarn install`}</code>
        </pre>

        <h3 className="text-xl font-semibold mt-4">{content('envVariables')}</h3>
        <p className="leading-7">
          Create a <code>.env.local</code> file in the root directory of your project. You can use the provided template:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
          <code>{`# Create .env.local from the example file
cp .env.example .env.local

# Now edit .env.local with your actual values`}</code>
        </pre>
        <p className="leading-7">
          Add the following environment variables to your <code>.env.local</code> file:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
          <code>{`# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# MercadoPago Configuration
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=your-mercadopago-public-key
MERCADOPAGO_ACCESS_TOKEN=your-mercadopago-access-token

# Email (optional)
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM=noreply@yourdomain.com`}</code>
        </pre>

        <h3 className="text-xl font-semibold mt-4">{content('runDevServer')}</h3>
        <p className="leading-7">
          Start the development server:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
          <code>{`# Using npm
npm run dev

# OR using yarn
yarn dev`}</code>
        </pre>
        <p className="leading-7">
          Your MarketFlex instance should now be running at <a href="http://localhost:3000" className="text-primary hover:underline">http://localhost:3000</a>
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('verification')}</h2>
        <p className="leading-7">
          To verify that MarketFlex is installed correctly:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Open your browser and navigate to <a href="http://localhost:3000" className="text-primary hover:underline">http://localhost:3000</a></li>
          <li>You should see the MarketFlex homepage</li>
          <li>Try signing up for a new account to verify that authentication is working</li>
          <li>Navigate to the admin dashboard (if you&apos;re an admin user) to confirm admin functionality</li>
        </ol>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('troubleshooting')}</h2>
        <p className="leading-7">
          If you encounter any issues during installation:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Make sure all the environment variables are correctly set</li>
          <li>Check that your Supabase project is properly configured</li>
          <li>Verify that your Node.js version meets the minimum requirements</li>
          <li>Check the console for error messages that might indicate specific problems</li>
        </ul>
        <p className="leading-7">
          For more detailed troubleshooting, refer to our <Link href={`/${locale}/docs/troubleshooting`} className="text-primary hover:underline">Troubleshooting Guide</Link>.
        </p>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/getting-started`} className="text-primary hover:underline">
          ← {t('gettingStarted')}
        </Link>
        <Link href={`/${locale}/docs/getting-started/configuration`} className="text-primary hover:underline">
          {t('configuration')} →
        </Link>
      </div>
    </div>
  );
} 