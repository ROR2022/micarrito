import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function DatabaseArchitecturePage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.database' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{content('title')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('overview')}</h2>
        <p className="leading-7">
          MarketFlex uses Supabase as its primary database solution, which is built on top of PostgreSQL. 
          This provides a robust, scalable, and flexible foundation for storing and managing all marketplace data.
        </p>
        <p className="leading-7">
          The database architecture follows these key principles:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Flexibility:</strong> Schema designed to support various marketplace types</li>
          <li><strong>Security:</strong> Row Level Security (RLS) policies to control data access</li>
          <li><strong>Performance:</strong> Optimized for fast queries with proper indexing</li>
          <li><strong>Scalability:</strong> Designed to handle growth in users, listings, and transactions</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('tableStructure')}</h2>
        <p className="leading-7">
          MarketFlex&apos;s database consists of the following core tables:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2 text-left">Table</th>
                <th className="border border-border p-2 text-left">Description</th>
                <th className="border border-border p-2 text-left">Key Fields</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2 font-medium">users</td>
                <td className="border border-border p-2">User profiles and authentication data</td>
                <td className="border border-border p-2">id, email, username, role, avatar_url</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">listings</td>
                <td className="border border-border p-2">Marketplace listings/products</td>
                <td className="border border-border p-2">id, title, description, price, custom_fields, author_id</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">categories</td>
                <td className="border border-border p-2">Listing categories and hierarchy</td>
                <td className="border border-border p-2">id, name, parent_id, slug</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">transactions</td>
                <td className="border border-border p-2">Payment transactions and orders</td>
                <td className="border border-border p-2">id, buyer_id, listing_id, amount, status</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">messages</td>
                <td className="border border-border p-2">User-to-user communication</td>
                <td className="border border-border p-2">id, sender_id, receiver_id, content, read</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">subscriptions</td>
                <td className="border border-border p-2">Seller subscription plans</td>
                <td className="border border-border p-2">id, user_id, plan_id, status, expires_at</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">subscription_plans</td>
                <td className="border border-border p-2">Available subscription plans</td>
                <td className="border border-border p-2">id, name, price, features, mercadopago_plan_id</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('relationships')}</h2>
        <p className="leading-7">
          The database tables are interconnected through relationships to maintain data integrity:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>One-to-Many:</strong> Users → Listings (one user can have many listings)</li>
          <li><strong>One-to-Many:</strong> Categories → Listings (one category can contain many listings)</li>
          <li><strong>One-to-Many:</strong> Users → Transactions (as buyers)</li>
          <li><strong>Many-to-Many:</strong> Users ↔ Messages (users can send/receive messages)</li>
          <li><strong>One-to-One:</strong> Users → Subscriptions (a user has one active subscription)</li>
          <li><strong>One-to-Many:</strong> Subscription Plans → Subscriptions (a plan can have many subscribers)</li>
        </ul>
        <p className="leading-7">
          These relationships are implemented using foreign keys with proper constraints to ensure data consistency.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('indexing')}</h2>
        <p className="leading-7">
          To ensure optimal performance, MarketFlex implements strategic indexing on frequently queried fields:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>B-tree indexes</strong> on primary and foreign keys</li>
          <li><strong>Full-text search indexes</strong> on listing titles and descriptions</li>
          <li><strong>Composite indexes</strong> for filtered queries (e.g., listings by category and price range)</li>
          <li><strong>GIN indexes</strong> on JSONB fields for efficient querying of custom fields</li>
        </ul>
        <p className="leading-7">
          Additionally, the database is configured with proper query optimization and caching strategies to handle high traffic and complex queries.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('rlsPolicies')}</h2>
        <p className="leading-7">
          MarketFlex uses Supabase&apos;s Row Level Security (RLS) policies to control data access at the database level:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Users:</strong> Users can only read and edit their own profiles</li>
          <li><strong>Listings:</strong> 
            <ul className="list-disc pl-6 mt-2">
              <li>Anyone can read active listings</li>
              <li>Authors can create, update, and delete their own listings</li>
              <li>Admins can moderate all listings</li>
            </ul>
          </li>
          <li><strong>Transactions:</strong> 
            <ul className="list-disc pl-6 mt-2">
              <li>Buyers can read their own purchases</li>
              <li>Sellers can read transactions related to their listings</li>
              <li>Admins can access all transaction data</li>
            </ul>
          </li>
          <li><strong>Messages:</strong> Only senders and recipients can read their conversations</li>
        </ul>
        <p className="leading-7">
          These policies are defined in SQL and automatically enforced by PostgreSQL, adding an essential layer of security.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('customFields')}</h2>
        <p className="leading-7">
          One of MarketFlex&apos;s key features is its support for dynamic custom fields in listings, which is implemented using PostgreSQL&apos;s JSONB data type:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Schema Flexibility:</strong> The <code>custom_fields</code> column in the listings table uses JSONB to store arbitrary structured data</li>
          <li><strong>Field Configurations:</strong> Each category can define its own set of custom fields with validation rules</li>
          <li><strong>Efficient Querying:</strong> GIN indexes allow for efficient filtering based on custom field values</li>
          <li><strong>Data Validation:</strong> Server-side validation ensures that submitted custom fields match the expected schema</li>
        </ul>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-4">
          <code>{`-- Example of a listing with custom fields for a car marketplace
{
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2020,
  "mileage": 35000,
  "fuel_type": "Gasoline",
  "transmission": "Automatic",
  "features": ["Air Conditioning", "Bluetooth", "Backup Camera"]
}`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('migrations')}</h2>
        <p className="leading-7">
          MarketFlex includes a set of database migrations to help you set up and evolve your database schema:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Initial Schema:</strong> Creates the core tables, indexes, and RLS policies</li>
          <li><strong>Seed Data:</strong> Populates the database with initial data like default categories and subscription plans</li>
          <li><strong>Version Control:</strong> Migrations are tracked and applied in order to ensure consistency</li>
          <li><strong>Custom Migrations:</strong> You can create your own migrations to extend the schema for specific needs</li>
        </ul>
        <p className="leading-7">
          Migrations are stored in the <code>supabase/migrations</code> directory and can be applied using Supabase CLI.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('backups')}</h2>
        <p className="leading-7">
          Data protection is critical for any marketplace. MarketFlex recommends the following backup strategies:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Automatic Backups:</strong> Supabase provides daily backups with point-in-time recovery</li>
          <li><strong>Manual Exports:</strong> Use Supabase dashboard or CLI to create on-demand database dumps</li>
          <li><strong>Disaster Recovery:</strong> Guidelines for restoring from backups in case of data loss</li>
          <li><strong>Retention Policy:</strong> Configure backup retention based on your data requirements</li>
        </ul>
        <p className="leading-7">
          For production environments, it&apos;s recommended to implement additional backup strategies specific to your hosting provider.
        </p>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/architecture`} className="text-primary hover:underline">
          ← {t('architecture')}
        </Link>
        <Link href={`/${locale}/docs/architecture/components`} className="text-primary hover:underline">
          {t('components')} →
        </Link>
      </div>
    </div>
  );
} 