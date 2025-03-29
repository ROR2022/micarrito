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
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
} */

export default async function DocsPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.index' });

  // Define the documentation sections
  const docSections = [
    {
      title: t('quickStartGuide'),
      description: "Learn how to install, configure and run MarketFlex",
      href: `/${locale}/docs/getting-started`,
      icon: "📚"
    },
    {
      title: t('architectureOverview'),
      description: "Understand the project structure and key components",
      href: `/${locale}/docs/architecture`,
      icon: "🏗️"
    },
    {
      title: t('customizationOptions'),
      description: "Learn how to adapt MarketFlex to your specific needs",
      href: `/${locale}/docs/customization`,
      icon: "🎨"
    },
    {
      title: t('developmentGuide'),
      description: "Guidelines for extending and modifying the codebase",
      href: `/${locale}/docs/development`,
      icon: "💻"
    },
    {
      title: t('integrationsGuide'),
      description: "Detailed information about integrations with external services",
      href: `/${locale}/docs/integrations`,
      icon: "🔌"
    },
    {
      title: t('deploymentGuide'),
      description: "Learn how to deploy your marketplace to production",
      href: `/${locale}/docs/deployment`,
      icon: "🚀"
    },
    {
      title: t('frequentlyAskedQuestions'),
      description: "Common questions and answers about MarketFlex",
      href: `/${locale}/docs/faq`,
      icon: "❓"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{t('forDevelopers')}</h2>
        <p className="leading-7 mb-6">
          {t('introduction')}
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2">
        {docSections.map((section) => (
          <Link 
            key={section.href} 
            href={section.href}
            className="block p-6 border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex gap-3 items-start">
              <span className="text-2xl">{section.icon}</span>
              <div>
                <h3 className="font-medium mb-1">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 