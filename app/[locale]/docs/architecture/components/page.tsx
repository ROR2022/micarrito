import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function ComponentsArchitecturePage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.components' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{content('title')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('overview')}</h2>
        <p className="leading-7">
          MarketFlex is built with a component-based architecture, using React and Next.js as its foundation. 
          The component system is designed to be modular, reusable, and customizable, allowing developers to 
          easily extend and modify the marketplace functionality.
        </p>
        <p className="leading-7">
          The component architecture follows these key principles:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Modularity:</strong> Components are self-contained and reusable</li>
          <li><strong>Composition:</strong> Complex UIs are built by composing smaller components</li>
          <li><strong>Separation of concerns:</strong> Components are focused on specific responsibilities</li>
          <li><strong>Consistency:</strong> Common design patterns are applied across all components</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('uiComponents')}</h2>
        <p className="leading-7">
          MarketFlex uses shadcn/ui as its component library foundation, which provides a set of 
          accessible, customizable UI components built on top of Radix UI and styled with Tailwind CSS.
        </p>
        <p className="leading-7">
          The main UI components include:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Button</h3>
            <p className="text-sm mb-2">Interactive button elements with various states and variants.</p>
            <p className="text-xs text-muted-foreground">Import: <code>@/components/ui/button</code></p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Card</h3>
            <p className="text-sm mb-2">Container for content with header, content, and footer components.</p>
            <p className="text-xs text-muted-foreground">Import: <code>@/components/ui/card</code></p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Dialog</h3>
            <p className="text-sm mb-2">Modal dialogs for important interactions and confirmations.</p>
            <p className="text-xs text-muted-foreground">Import: <code>@/components/ui/dialog</code></p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Input</h3>
            <p className="text-sm mb-2">Form input elements for text and numeric data entry.</p>
            <p className="text-xs text-muted-foreground">Import: <code>@/components/ui/input</code></p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Dropdown Menu</h3>
            <p className="text-sm mb-2">Contextual menus for actions and navigation options.</p>
            <p className="text-xs text-muted-foreground">Import: <code>@/components/ui/dropdown-menu</code></p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Toast</h3>
            <p className="text-sm mb-2">Non-intrusive notifications for user feedback.</p>
            <p className="text-xs text-muted-foreground">Import: <code>@/components/ui/toast</code></p>
          </div>
        </div>
        <p className="leading-7">
          These components are customized to match the MarketFlex design system and can be further styled 
          to suit specific marketplace requirements.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('layoutComponents')}</h2>
        <p className="leading-7">
          Layout components define the structure and organization of the marketplace pages:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Header:</strong> The main navigation bar with logo, search, user menu, and navigation links.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/layout/header.tsx</code></p>
          </li>
          <li>
            <strong>Footer:</strong> The site footer with links, copyright information, and additional navigational elements.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/layout/footer.tsx</code></p>
          </li>
          <li>
            <strong>Sidebar:</strong> Used in admin and user dashboards for secondary navigation.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/layout/sidebar.tsx</code></p>
          </li>
          <li>
            <strong>Container:</strong> Responsive container for content with consistent margins.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/layout/container.tsx</code></p>
          </li>
          <li>
            <strong>PageHeader:</strong> Consistent header for all pages with title, description, and actions.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/layout/page-header.tsx</code></p>
          </li>
          <li>
            <strong>Grid:</strong> Responsive grid layouts for listings and card displays.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/layout/grid.tsx</code></p>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('formComponents')}</h2>
        <p className="leading-7">
          Form components handle user input with validation and accessibility features:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Form:</strong> Base form component with validation using React Hook Form and Zod.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/ui/form.tsx</code></p>
          </li>
          <li>
            <strong>FormField:</strong> Reusable field components with labels, validation, and error handling.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/ui/form.tsx</code></p>
          </li>
          <li>
            <strong>Select:</strong> Dropdown selection components for choosing from a list of options.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/ui/select.tsx</code></p>
          </li>
          <li>
            <strong>Checkbox:</strong> Binary selection components for boolean values.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/ui/checkbox.tsx</code></p>
          </li>
          <li>
            <strong>ImageUpload:</strong> Specialized component for uploading and previewing images.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/forms/image-upload.tsx</code></p>
          </li>
          <li>
            <strong>DynamicForm:</strong> Component for rendering dynamic form fields based on JSON schema.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/forms/dynamic-form.tsx</code></p>
          </li>
        </ul>
        <p className="leading-7">
          The form components use React Hook Form for state management and Zod for schema validation,
          providing a robust solution for handling form data.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('dataComponents')}</h2>
        <p className="leading-7">
          Data display components present information in structured, accessible formats:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>DataTable:</strong> Powerful table component with sorting, filtering, and pagination.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/ui/data-table</code></p>
          </li>
          <li>
            <strong>Card:</strong> Flexible card component for displaying content in a contained format.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/ui/card.tsx</code></p>
          </li>
          <li>
            <strong>Stat:</strong> Component for displaying key metrics and statistics.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/dashboard/stat.tsx</code></p>
          </li>
          <li>
            <strong>Chart:</strong> Data visualization components using Recharts.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/dashboard/charts</code></p>
          </li>
          <li>
            <strong>Badge:</strong> Small status indicator for labels and categories.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/ui/badge.tsx</code></p>
          </li>
          <li>
            <strong>Avatar:</strong> User profile image display with fallback initials.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/ui/avatar.tsx</code></p>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('marketplaceComponents')}</h2>
        <p className="leading-7">
          MarketFlex includes specialized components for marketplace functionality:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>ListingCard:</strong> Card component for displaying marketplace listings with image, title, price, and actions.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/listings/listing-card.tsx</code></p>
          </li>
          <li>
            <strong>ListingForm:</strong> Form for creating and editing listings with support for custom fields.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/listings/listing-form.tsx</code></p>
          </li>
          <li>
            <strong>CategorySelector:</strong> Hierarchical category selection component.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/listings/category-selector.tsx</code></p>
          </li>
          <li>
            <strong>SearchBar:</strong> Advanced search component with filters and suggestions.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/search/search-bar.tsx</code></p>
          </li>
          <li>
            <strong>MessageThread:</strong> Conversation component for buyer-seller communication.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/messages/message-thread.tsx</code></p>
          </li>
          <li>
            <strong>CheckoutForm:</strong> Secure payment form integrated with MercadoPago.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/checkout/checkout-form.tsx</code></p>
          </li>
          <li>
            <strong>SubscriptionCard:</strong> Displays subscription plan options for sellers.
            <p className="text-xs text-muted-foreground mt-1">Location: <code>@/components/subscriptions/subscription-card.tsx</code></p>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('stateManagement')}</h2>
        <p className="leading-7">
          MarketFlex manages state using a combination of approaches:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>React Context:</strong> Used for global state such as user authentication, theme, and locale.
            <p className="text-xs text-muted-foreground mt-1">Example: <code>@/contexts/auth-context.tsx</code></p>
          </li>
          <li>
            <strong>React Query:</strong> For server state management, data fetching, caching, and synchronization.
            <p className="text-xs text-muted-foreground mt-1">Example: <code>@/lib/queries/use-listings.ts</code></p>
          </li>
          <li>
            <strong>Form State:</strong> Managed with React Hook Form for controlled form inputs and validation.
            <p className="text-xs text-muted-foreground mt-1">Example: <code>@/components/forms/listing-form.tsx</code></p>
          </li>
          <li>
            <strong>URL State:</strong> Used for search parameters, filters, and pagination.
            <p className="text-xs text-muted-foreground mt-1">Example: <code>@/app/[locale]/listings/page.tsx</code></p>
          </li>
          <li>
            <strong>Local Component State:</strong> useState for component-specific state.
            <p className="text-xs text-muted-foreground mt-1">Example: Used throughout various components</p>
          </li>
        </ul>
        <p className="leading-7">
          This multi-layered approach ensures that state is managed at the appropriate level,
          improving performance and maintainability.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('bestPractices')}</h2>
        <p className="leading-7">
          When working with MarketFlex components, follow these best practices:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Component Composition:</strong> Prefer composition over inheritance when building complex UIs.
            <p className="text-xs text-muted-foreground mt-1">Example: Compose small, focused components rather than creating large monolithic ones.</p>
          </li>
          <li>
            <strong>Reuse Existing Components:</strong> Use and extend existing components before creating new ones.
            <p className="text-xs text-muted-foreground mt-1">Example: Extend the ListingCard component for a specialized display rather than creating a new implementation.</p>
          </li>
          <li>
            <strong>Consistent Props API:</strong> Maintain consistent naming and structure for component props.
            <p className="text-xs text-muted-foreground mt-1">Example: Use <code>onSubmit</code> for form submission handlers across all form components.</p>
          </li>
          <li>
            <strong>Responsive Design:</strong> Ensure all components work well on different screen sizes.
            <p className="text-xs text-muted-foreground mt-1">Example: Use Tailwind CSS breakpoints consistently for responsive layouts.</p>
          </li>
          <li>
            <strong>Accessibility:</strong> Follow WCAG guidelines for all interactive components.
            <p className="text-xs text-muted-foreground mt-1">Example: Ensure proper ARIA attributes, keyboard navigation, and color contrast.</p>
          </li>
          <li>
            <strong>Performance:</strong> Memoize expensive components and optimize renders.
            <p className="text-xs text-muted-foreground mt-1">Example: Use React.memo, useMemo, and useCallback appropriately to prevent unnecessary re-renders.</p>
          </li>
          <li>
            <strong>Type Safety:</strong> Use TypeScript interfaces for component props and state.
            <p className="text-xs text-muted-foreground mt-1">Example: Define and export interfaces for all component props for better development experience.</p>
          </li>
        </ul>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/architecture/database`} className="text-primary hover:underline">
          ← {t('database')}
        </Link>
        <Link href={`/${locale}/docs/customization`} className="text-primary hover:underline">
          {t('customization')} →
        </Link>
      </div>
    </div>
  );
} 