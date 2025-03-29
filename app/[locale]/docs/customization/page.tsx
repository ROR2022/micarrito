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
    title: `${t('nav.customization')} - ${t('metadata.title')}`,
    description: t('metadata.description'),
  };
} */

export default async function CustomizationPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.customization' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{content('title')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('overview')}</h2>
        <p className="leading-7">
          MarketFlex is designed with customization in mind, allowing developers to adapt the platform 
          to their specific marketplace needs. The customization options range from simple styling changes 
          to complex dynamic fields and behavior modifications.
        </p>

        <p className="leading-7">
          The customization architecture follows these key principles:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Non-invasive:</strong> Customizations can be applied without modifying core code</li>
          <li><strong>Composable:</strong> Different customizations can be combined without conflicts</li>
          <li><strong>Type-safe:</strong> Leverages TypeScript to ensure customizations remain valid</li>
          <li><strong>Maintainable:</strong> Clear patterns for adding customizations that survive updates</li>
        </ul>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-semibold mb-2">{t('dynamicFields')}</h2>
          <p className="mb-4">
            Learn how to customize the data model with dynamic fields that adapt to different 
            listing types and marketplace requirements.
          </p>
          <Link 
            href={`/${locale}/docs/customization/dynamic-fields`} 
            className="text-primary hover:underline"
          >
            Explore Dynamic Fields →
          </Link>
        </div>

        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-semibold mb-2">{t('styling')}</h2>
          <p className="mb-4">
            Discover how to customize the visual appearance of your marketplace using 
            theme configuration, CSS overrides, and component styling.
          </p>
          <Link 
            href={`/${locale}/docs/customization/styling`} 
            className="text-primary hover:underline"
          >
            Explore Styling →
          </Link>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <h2 className="text-2xl font-bold tracking-tight">{content('commonCustomizations')}</h2>
        <p className="leading-7">
          Here are some of the most common customization scenarios:
        </p>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Branding Customization</h3>
            <p className="text-sm">
              Customize logos, colors, typography, and brand elements to match your marketplace identity.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Listing Structure Customization</h3>
            <p className="text-sm">
              Define custom fields and attributes for different listing types, such as real estate, automotive, or services.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Layout Customization</h3>
            <p className="text-sm">
              Modify page layouts, navigation structure, and content organization to suit your marketplace flow.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Workflow Customization</h3>
            <p className="text-sm">
              Adapt user journeys for listing creation, checkout processes, and user interactions.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('bestPractices')}</h2>
        <p className="leading-7">
          When customizing MarketFlex, follow these best practices:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Keep core files intact:</strong> Avoid modifying core files directly; instead, use the provided extension points.
          </li>
          <li>
            <strong>Version control your customizations:</strong> Track your customizations separately to make future updates easier.
          </li>
          <li>
            <strong>Test thoroughly:</strong> Ensure your customizations work across different devices and browsers.
          </li>
          <li>
            <strong>Document your changes:</strong> Maintain documentation of your customizations for future reference.
          </li>
          <li>
            <strong>Consider upgrade compatibility:</strong> Design customizations to be resilient to future MarketFlex updates.
          </li>
        </ul>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/architecture/components`} className="text-primary hover:underline">
          ← {t('components')}
        </Link>
        <Link href={`/${locale}/docs/customization/dynamic-fields`} className="text-primary hover:underline">
          {t('dynamicFields')} →
        </Link>
      </div>
    </div>
  );
} 