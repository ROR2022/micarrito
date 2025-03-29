import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function HooksPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.hooks' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{content('title')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('overview')}</h2>
        <p className="leading-7">
          MarketFlex includes a collection of custom React hooks to simplify common tasks and
          provide consistent patterns for data fetching, form handling, authentication, and other 
          functionality. All hooks are located in the <code>hooks/</code> directory.
        </p>
        <p className="leading-7">
          Using these hooks can significantly reduce boilerplate code and ensure 
          consistent behavior across your application.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('authHooks')}</h2>
        <p className="leading-7">
          Authentication hooks provide easy access to user authentication state and functions.
        </p>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <h3 className="text-xl font-semibold">useAuth</h3>
          <p className="leading-7">
            Hook for managing user authentication state and functions.
          </p>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Usage</h4>
            <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-xs">
              <code>{`import { useAuth } from '@/hooks/useAuth';

// In your component
function ProfilePage() {
  const { user, isLoading, isAuthenticated, signIn, signOut } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}`}</code>
            </pre>
          </div>

          <div className="space-y-2 mt-4">
            <h4 className="font-semibold text-sm">Returns</h4>
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Property</th>
                  <th className="border border-border p-2 text-left">Type</th>
                  <th className="border border-border p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2 font-medium">user</td>
                  <td className="border border-border p-2"><code>User | null</code></td>
                  <td className="border border-border p-2">Current user object or null if not authenticated</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-medium">isLoading</td>
                  <td className="border border-border p-2"><code>boolean</code></td>
                  <td className="border border-border p-2">True while checking authentication state</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-medium">isAuthenticated</td>
                  <td className="border border-border p-2"><code>boolean</code></td>
                  <td className="border border-border p-2">True if user is authenticated</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-medium">signIn</td>
                  <td className="border border-border p-2"><code>Function</code></td>
                  <td className="border border-border p-2">Authenticate user with email and password</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-medium">signOut</td>
                  <td className="border border-border p-2"><code>Function</code></td>
                  <td className="border border-border p-2">Log out the current user</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <h3 className="text-xl font-semibold">useUser</h3>
          <p className="leading-7">
            Hook for accessing the current user profile data.
          </p>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Usage</h4>
            <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-xs">
              <code>{`import { useUser } from '@/hooks/useUser';

// In your component
function UserProfile() {
  const { user, isLoading, error, updateProfile } = useUser();
  
  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error loading profile: {error.message}</div>;
  
  const handleUpdateBio = (newBio) => {
    updateProfile({ bio: newBio });
  };
  
  return (
    <div>
      <h1>{user.username}</h1>
      <p>{user.bio || 'No bio yet'}</p>
      <button onClick={() => handleUpdateBio('New bio')}>Update Bio</button>
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('dataHooks')}</h2>
        <p className="leading-7">
          Data hooks provide simplified access to database operations and state management.
        </p>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <h3 className="text-xl font-semibold">useListings</h3>
          <p className="leading-7">
            Hook for fetching and managing listings data.
          </p>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Usage</h4>
            <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-xs">
              <code>{`import { useListings } from '@/hooks/useListings';

// In your component
function ListingsPage() {
  const { 
    listings, 
    isLoading, 
    error, 
    fetchNextPage, 
    hasNextPage,
    filters,
    setFilters
  } = useListings({
    category: 'automotive',
    limit: 10
  });
  
  // Apply a filter
  const applyPriceFilter = (min, max) => {
    setFilters(prev => ({
      ...prev,
      price_min: min,
      price_max: max
    }));
  };
  
  if (isLoading) return <div>Loading listings...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <div className="filters">
        <button onClick={() => applyPriceFilter(0, 1000)}>Under $1000</button>
      </div>
      
      <div className="listings-grid">
        {listings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
      
      {hasNextPage && (
        <button onClick={fetchNextPage}>Load More</button>
      )}
    </div>
  );
}`}</code>
            </pre>
          </div>

          <div className="space-y-2 mt-4">
            <h4 className="font-semibold text-sm">Parameters</h4>
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Parameter</th>
                  <th className="border border-border p-2 text-left">Type</th>
                  <th className="border border-border p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2 font-medium">options</td>
                  <td className="border border-border p-2"><code>Object</code></td>
                  <td className="border border-border p-2">Initial filter and pagination options</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-medium">options.category</td>
                  <td className="border border-border p-2"><code>string</code></td>
                  <td className="border border-border p-2">Filter by category</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-medium">options.limit</td>
                  <td className="border border-border p-2"><code>number</code></td>
                  <td className="border border-border p-2">Number of items per page</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-medium">options.search</td>
                  <td className="border border-border p-2"><code>string</code></td>
                  <td className="border border-border p-2">Search term</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <h3 className="text-xl font-semibold">useTransactions</h3>
          <p className="leading-7">
            Hook for managing user transactions.
          </p>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Usage</h4>
            <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-xs">
              <code>{`import { useTransactions } from '@/hooks/useTransactions';

function TransactionsHistory() {
  const { 
    transactions, 
    isLoading, 
    error,
    createTransaction
  } = useTransactions();
  
  if (isLoading) return <div>Loading transaction history...</div>;
  
  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map(tx => (
          <li key={tx.id}>
            {tx.listing.title} - {tx.amount} {tx.currency} - {tx.status}
          </li>
        ))}
      </ul>
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('uiHooks')}</h2>
        <p className="leading-7">
          UI hooks provide utilities for managing UI state and interactions.
        </p>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <h3 className="text-xl font-semibold">useMediaQuery</h3>
          <p className="leading-7">
            Hook for responsive design based on media queries.
          </p>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Usage</h4>
            <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-xs">
              <code>{`import { useMediaQuery } from '@/hooks/useMediaQuery';

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  
  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {!isMobile && !isTablet && <DesktopView />}
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <h3 className="text-xl font-semibold">useLocalStorage</h3>
          <p className="leading-7">
            Hook for persisting state in localStorage.
          </p>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Usage</h4>
            <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-xs">
              <code>{`import { useLocalStorage } from '@/hooks/useLocalStorage';

function PreferencesComponent() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [recentSearches, setRecentSearches] = useLocalStorage('recent-searches', []);
  
  const addSearch = (search) => {
    setRecentSearches(prev => [search, ...prev.slice(0, 4)]);
  };
  
  return (
    <div>
      <select 
        value={theme} 
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      
      <div>
        <h3>Recent Searches</h3>
        <ul>
          {recentSearches.map((search, i) => (
            <li key={i}>{search}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('formHooks')}</h2>
        <p className="leading-7">
          Form hooks simplify form handling, validation, and submission.
        </p>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <h3 className="text-xl font-semibold">useForm</h3>
          <p className="leading-7">
            Hook for form handling with validation.
          </p>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Usage</h4>
            <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-xs">
              <code>{`import { useForm } from '@/hooks/useForm';
import { z } from 'zod';

// Define validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

function ContactForm() {
  const { 
    values, 
    errors, 
    touched,
    handleChange, 
    handleBlur,
    handleSubmit,
    isSubmitting
  } = useForm({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: contactSchema,
    onSubmit: async (values) => {
      // Submit form
      await submitContactForm(values);
    }
  });
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.name && errors.name && (
          <div className="error">{errors.name}</div>
        )}
      </div>
      
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && (
          <div className="error">{errors.email}</div>
        )}
      </div>
      
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.message && errors.message && (
          <div className="error">{errors.message}</div>
        )}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('integrationsHooks')}</h2>
        <p className="leading-7">
          Integration hooks provide interfaces to external services like MercadoPago.
        </p>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <h3 className="text-xl font-semibold">useMercadoPago</h3>
          <p className="leading-7">
            Hook for MercadoPago payment processing.
          </p>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Usage</h4>
            <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-xs">
              <code>{`import { useMercadoPago } from '@/hooks/useMercadoPago';

function CheckoutComponent({ listingId, price }) {
  const { 
    createPayment, 
    createSubscription,
    isLoading, 
    error 
  } = useMercadoPago();
  
  const handleBuyNow = async () => {
    const result = await createPayment({
      listing_id: listingId,
      payment_method: 'credit_card'
    });
    
    if (result.success) {
      // Redirect to payment URL
      window.location.href = result.payment_url;
    }
  };
  
  return (
    <div>
      <h2>Checkout</h2>
      <p>Price: ${'{price}'}</p>
      <button onClick={handleBuyNow} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Buy Now'}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('creatingCustomHooks')}</h2>
        <p className="leading-7">
          You can create your own custom hooks to extend MarketFlex&apos;s functionality. Here&apos;s a guide to creating
          custom hooks:
        </p>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Best Practices</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name your hooks with the <code>use</code> prefix (React convention)</li>
            <li>Keep hooks focused on a single concern</li>
            <li>Use TypeScript for proper type definitions</li>
            <li>Add JSDoc comments for documentation</li>
            <li>Place your custom hooks in the <code>hooks/</code> directory</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Example Custom Hook</h3>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-xs">
            <code>{`// hooks/useDebounce.ts

import { useState, useEffect } from 'react';

/**
 * Hook that debounces a value, only updating after a specified delay
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    // Update debounced value after delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    // Cancel the timeout if value changes or component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage Example:
// const debouncedSearchTerm = useDebounce(searchTerm, 500);`}</code>
          </pre>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/development/api-reference`} className="text-primary hover:underline">
          ← {t('apiReference')}
        </Link>
        <Link href={`/${locale}/docs/integrations`} className="text-primary hover:underline">
          {t('integrations')} →
        </Link>
      </div>
    </div>
  );
} 