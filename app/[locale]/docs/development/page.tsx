import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function DevelopmentPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.development' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{content('title')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('overview')}</h2>
        <p className="leading-7">
          MarketFlex is built with modern development practices in mind, focusing on 
          performance, maintainability, and developer experience. This section covers the 
          development tools, practices, and workflows used in MarketFlex, along with 
          guides for extending and customizing the platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-semibold mb-2">{t('apiReference')}</h2>
          <p className="mb-4">
            Complete documentation of all API endpoints, request methods, parameters, 
            and response formats to help you interact with the MarketFlex backend.
          </p>
          <Link 
            href={`/${locale}/docs/development/api-reference`} 
            className="text-primary hover:underline"
          >
            Explore API Reference →
          </Link>
        </div>

        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-semibold mb-2">{t('hooks')}</h2>
          <p className="mb-4">
            Discover the custom React hooks included in MarketFlex, which provide 
            reusable logic for common operations like data fetching, form handling, and authentication.
          </p>
          <Link 
            href={`/${locale}/docs/development/hooks`} 
            className="text-primary hover:underline"
          >
            Explore Hooks →
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('developmentEnvironment')}</h2>
        <p className="leading-7">
          Setting up the right development environment is crucial for efficient work with MarketFlex.
        </p>

        <h3 className="text-xl font-semibold">Required Tools</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Node.js:</strong> Version 18.x or higher</li>
          <li><strong>npm:</strong> Version 9.x or higher (or yarn/pnpm)</li>
          <li><strong>Git:</strong> For version control</li>
          <li><strong>Code Editor:</strong> VS Code recommended with extensions for TypeScript, Tailwind CSS, and ESLint</li>
          <li><strong>Supabase CLI:</strong> For working with the database locally</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">Local Development</h3>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`# Clone the repository
git clone https://github.com/yourusername/marketflex.git
cd marketflex

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start the development server
npm run dev`}</code>
        </pre>
        <p className="text-sm mt-2 text-muted-foreground">
          The development server will run on <code>http://localhost:3000</code> by default.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('projectStructure')}</h2>
        <p className="leading-7">
          MarketFlex follows a well-organized project structure based on Next.js app router:
        </p>
        
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`marketflex/
├── app/                  # Main application code
│   ├── [locale]/         # Localized routes
│   ├── api/              # API routes
│   └── global.css        # Global styles
├── components/           # Reusable UI components
│   ├── ui/               # Basic UI components
│   ├── forms/            # Form-related components
│   └── layout/           # Layout components
├── lib/                  # Utility functions and shared logic
│   ├── supabase/         # Supabase client and utilities
│   ├── mercadopago/      # MercadoPago integration
│   ├── validation/       # Form validation schemas
│   └── utils/            # General utilities
├── hooks/                # Custom React hooks
├── messages/             # Translation messages
├── public/               # Static assets
└── types/                # TypeScript type definitions`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('bestPractices')}</h2>
        <p className="leading-7">
          When developing with MarketFlex, follow these best practices to ensure code quality and maintainability:
        </p>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Code Style and Formatting</h3>
          <ul className="list-disc pl-6">
            <li>Follow the project&apos;s ESLint and Prettier configurations</li>
            <li>Use TypeScript for type safety</li>
            <li>Document functions and components with JSDoc comments</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Component Structure</h3>
          <ul className="list-disc pl-6">
            <li>Create small, focused components with a single responsibility</li>
            <li>Use server components where possible for improved performance</li>
            <li>Client components should be kept lightweight</li>
            <li>Minimize prop drilling by using context or hooks for shared state</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">State Management</h3>
          <ul className="list-disc pl-6">
            <li>Use React Query for server state management</li>
            <li>Use React Context for global UI state</li>
            <li>Keep component state as local as possible</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Performance</h3>
          <ul className="list-disc pl-6">
            <li>Implement proper data fetching strategies with caching</li>
            <li>Optimize images using Next.js Image component</li>
            <li>Implement code splitting where appropriate</li>
            <li>Monitor bundle size</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('extendingMarketFlex')}</h2>
        <p className="leading-7">
          MarketFlex is designed to be extended in various ways:
        </p>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Adding New Pages</h3>
          <p className="leading-7">
            Create new pages by adding files in the app directory structure:
          </p>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`// app/[locale]/your-new-page/page.tsx
export default function YourNewPage() {
  return (
    <div>
      <h1>Your New Page</h1>
      {/* Your content here */}
    </div>
  );
}`}</code>
          </pre>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Adding API Endpoints</h3>
          <p className="leading-7">
            Create new API endpoints in the app/api directory:
          </p>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`// app/api/your-endpoint/route.ts
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.from('your_table').select('*');
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const body = await request.json();
  // Process the request...
  return NextResponse.json({ success: true });
}`}</code>
          </pre>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Creating Custom Hooks</h3>
          <p className="leading-7">
            Add new hooks in the hooks directory:
          </p>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
            <code>{`// hooks/useCustomHook.ts
import { useState, useEffect } from 'react';

export function useCustomHook(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    // Your effect logic
  }, []);
  
  const updateValue = (newValue: string) => {
    setValue(newValue);
  };
  
  return { value, updateValue };
}`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('testing')}</h2>
        <p className="leading-7">
          MarketFlex includes a testing setup using Jest and React Testing Library.
        </p>

        <h3 className="text-xl font-semibold">Running Tests</h3>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage`}</code>
        </pre>

        <h3 className="text-xl font-semibold mt-4">Writing Tests</h3>
        <p className="leading-7">
          Test files are placed next to the code they test with a <code>.test.ts</code> or <code>.test.tsx</code> extension.
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// components/ui/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('applies the correct className', () => {
    render(<Button variant="primary">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('bg-primary');
  });
});`}</code>
        </pre>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/customization/styling`} className="text-primary hover:underline">
          ← {t('styling')}
        </Link>
        <Link href={`/${locale}/docs/development/api-reference`} className="text-primary hover:underline">
          {t('apiReference')} →
        </Link>
      </div>
    </div>
  );
} 