import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function ApiReferencePage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.apiReference' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{content('title')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('apiOverview')}</h2>
        <p className="leading-7">
          MarketFlex provides a comprehensive set of API endpoints built on Next.js API routes.
          These endpoints allow you to interact with the backend services, database, 
          and integrations like MercadoPago. All API routes are located in the <code>app/api</code> directory.
        </p>
        <p className="leading-7">
          Key API categories include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Authentication:</strong> User registration, login, and session management</li>
          <li><strong>Listings:</strong> Create, read, update, and delete marketplace listings</li>
          <li><strong>Transactions:</strong> Payment processing and transaction management</li>
          <li><strong>Messaging:</strong> User-to-user messaging system</li>
          <li><strong>Subscriptions:</strong> Subscription plan management</li>
          <li><strong>Webhooks:</strong> Handlers for external service events</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('authentication')}</h2>
        <p className="leading-7">
          Authentication endpoints handle user registration, login, and session management.
        </p>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <div className="flex items-center">
            <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-500 text-white mr-2">POST</span>
            <span className="font-mono text-sm">/api/auth/register</span>
          </div>
          <p className="text-sm">Register a new user account</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Request Body</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "email": "user@example.com",
  "password": "securePassword123",
  "username": "username"
}`}</code>
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Response (200 OK)</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username"
  }
}`}</code>
            </pre>
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <div className="flex items-center">
            <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-500 text-white mr-2">POST</span>
            <span className="font-mono text-sm">/api/auth/login</span>
          </div>
          <p className="text-sm">Authenticate a user and create a session</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Request Body</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "email": "user@example.com",
  "password": "securePassword123"
}`}</code>
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Response (200 OK)</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "buyer"
  }
}`}</code>
            </pre>
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <div className="flex items-center">
            <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-500 text-white mr-2">POST</span>
            <span className="font-mono text-sm">/api/auth/logout</span>
          </div>
          <p className="text-sm">Log out a user and destroy the session</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Response (200 OK)</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "success": true
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('listings')}</h2>
        <p className="leading-7">
          Listing endpoints allow management of marketplace listings.
        </p>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <div className="flex items-center">
            <span className="px-2 py-1 text-xs font-semibold rounded bg-green-500 text-white mr-2">GET</span>
            <span className="font-mono text-sm">/api/listings</span>
          </div>
          <p className="text-sm">Retrieve a list of listings with optional filtering and pagination</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Query Parameters</h4>
            <ul className="text-sm space-y-1">
              <li><code>page</code>: Page number (default: 1)</li>
              <li><code>limit</code>: Items per page (default: 10)</li>
              <li><code>category</code>: Filter by category</li>
              <li><code>search</code>: Search term for listing title/description</li>
              <li><code>min_price</code>: Minimum price filter</li>
              <li><code>max_price</code>: Maximum price filter</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Response (200 OK)</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "data": [
    {
      "id": "uuid",
      "title": "Listing Title",
      "description": "Listing description...",
      "price": 100,
      "currency": "USD",
      "author_id": "user_uuid",
      "category": "category_name",
      "custom_fields": { ... },
      "created_at": "timestamp"
    },
    // more listings...
  ],
  "pagination": {
    "total": 50,
    "pages": 5,
    "current_page": 1,
    "limit": 10
  }
}`}</code>
            </pre>
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <div className="flex items-center">
            <span className="px-2 py-1 text-xs font-semibold rounded bg-green-500 text-white mr-2">GET</span>
            <span className="font-mono text-sm">/api/listings/[id]</span>
          </div>
          <p className="text-sm">Retrieve a specific listing by ID</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Path Parameters</h4>
            <ul className="text-sm space-y-1">
              <li><code>id</code>: Listing UUID</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Response (200 OK)</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "data": {
    "id": "uuid",
    "title": "Listing Title",
    "description": "Detailed listing description...",
    "price": 100,
    "currency": "USD",
    "author_id": "user_uuid",
    "category": "category_name",
    "custom_fields": {
      "color": "red",
      "size": "medium",
      // other custom fields based on category
    },
    "status": "active",
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "author": {
      "username": "seller_username",
      "rating": 4.8
    }
  }
}`}</code>
            </pre>
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <div className="flex items-center">
            <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-500 text-white mr-2">POST</span>
            <span className="font-mono text-sm">/api/listings</span>
          </div>
          <p className="text-sm">Create a new listing (requires authentication)</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Request Body</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "title": "New Listing Title",
  "description": "Detailed description of the listing",
  "price": 199.99,
  "currency": "USD",
  "category": "category_name",
  "custom_fields": {
    // Fields depending on category
    "brand": "Example Brand",
    "condition": "New"
  }
}`}</code>
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Response (201 Created)</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "success": true,
  "data": {
    "id": "newly_created_uuid",
    "title": "New Listing Title",
    // other fields...
  }
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('transactions')}</h2>
        <p className="leading-7">
          Transaction endpoints handle payment processing and transaction management.
        </p>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <div className="flex items-center">
            <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-500 text-white mr-2">POST</span>
            <span className="font-mono text-sm">/api/transactions</span>
          </div>
          <p className="text-sm">Create a new transaction (requires authentication)</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Request Body</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "listing_id": "listing_uuid",
  "payment_method": "credit_card"
}`}</code>
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Response (201 Created)</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "transaction_id": "transaction_uuid",
  "status": "pending",
  "payment_url": "https://mercadopago.com/checkout/12345",
  "amount": 199.99,
  "currency": "USD"
}`}</code>
            </pre>
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <div className="flex items-center">
            <span className="px-2 py-1 text-xs font-semibold rounded bg-green-500 text-white mr-2">GET</span>
            <span className="font-mono text-sm">/api/transactions/[id]</span>
          </div>
          <p className="text-sm">Get transaction details (requires authentication as buyer or seller)</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Path Parameters</h4>
            <ul className="text-sm space-y-1">
              <li><code>id</code>: Transaction UUID</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Response (200 OK)</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "id": "transaction_uuid",
  "listing_id": "listing_uuid",
  "buyer_id": "user_uuid",
  "seller_id": "seller_uuid",
  "amount": 199.99,
  "currency": "USD",
  "status": "completed",
  "payment_method": "credit_card",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('webhooks')}</h2>
        <p className="leading-7">
          Webhook endpoints receive notifications from external services like MercadoPago.
        </p>

        <div className="border rounded-lg p-6 space-y-4 mt-4">
          <div className="flex items-center">
            <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-500 text-white mr-2">POST</span>
            <span className="font-mono text-sm">/api/webhooks/mercadopago</span>
          </div>
          <p className="text-sm">Receive payment notifications from MercadoPago</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Request Body (example of payment notification)</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "action": "payment.created",
  "api_version": "v1",
  "data": {
    "id": "payment_id"
  },
  "date_created": "2023-08-01T12:00:00Z",
  "id": "webhook_id",
  "live_mode": true,
  "type": "payment"
}`}</code>
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Response (200 OK)</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "success": true
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('errorHandling')}</h2>
        <p className="leading-7">
          All API endpoints use consistent error handling. Errors are returned with appropriate
          HTTP status codes and descriptive messages.
        </p>

        <h3 className="text-xl font-semibold">Common Error Responses</h3>
        <div className="space-y-4 mt-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">400 Bad Request</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "error": "Invalid request parameters",
  "details": {
    "price": "Price must be a positive number"
  }
}`}</code>
            </pre>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">401 Unauthorized</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "error": "Authentication required"
}`}</code>
            </pre>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">403 Forbidden</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "error": "You do not have permission to access this resource"
}`}</code>
            </pre>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">404 Not Found</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "error": "Resource not found"
}`}</code>
            </pre>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">500 Internal Server Error</h4>
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs">
              <code>{`{
  "error": "Internal server error",
  "request_id": "uuid" // For tracking the error
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('authentication')}</h2>
        <p className="leading-7">
          Most API endpoints require authentication. MarketFlex uses JWT-based authentication
          provided by Supabase Auth. To authenticate API requests:
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Log in using the <code>/api/auth/login</code> endpoint or through the Supabase Auth UI.
          </li>
          <li>
            The session cookie will be automatically included in subsequent requests.
          </li>
          <li>
            For programmatic API usage, include the JWT token in the Authorization header:
            <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs mt-2">
              <code>Authorization: Bearer YOUR_JWT_TOKEN</code>
            </pre>
          </li>
        </ol>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('rateLimiting')}</h2>
        <p className="leading-7">
          To prevent abuse, API endpoints implement rate limiting. The default limits are:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>60 requests per minute for authenticated users</li>
          <li>20 requests per minute for unauthenticated users</li>
        </ul>

        <p className="leading-7">
          When rate limits are exceeded, the API will respond with a 429 Too Many Requests status code:
        </p>
        <pre className="bg-secondary p-3 rounded-md overflow-x-auto text-xs mt-2">
          <code>{`{
  "error": "Rate limit exceeded",
  "retry_after": 30 // Seconds until the limit resets
}`}</code>
        </pre>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/development`} className="text-primary hover:underline">
          ← {t('development')}
        </Link>
        <Link href={`/${locale}/docs/development/hooks`} className="text-primary hover:underline">
          {t('hooks')} →
        </Link>
      </div>
    </div>
  );
} 