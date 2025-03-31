import { getTranslations } from 'next-intl/server';
//import Link from 'next/link';
import { Metadata } from 'next';
import { HelpSearch } from './components/help-search';
import { HelpCategories } from './components/help-categories';
import { FeaturedArticles } from './components/featured-articles';
import { ContactSupport } from './components/contact-support';
import { helpCategories, helpArticles } from '@/data/help-content';

export const metadata: Metadata = {
  title: 'Centro de Ayuda - Mi Carrito',
  description: 'Encuentra respuestas a todas tus preguntas sobre Mi Carrito',
};

export default async function HelpPage() {
  const t = await getTranslations('Help');
  
  // Obtener artículos destacados
  const featuredArticles = helpArticles.filter(article => article.featured);
  
  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>
      
      {/* Buscador */}
      <div className="mb-12">
        <HelpSearch />
      </div>
      
      {/* Categorías de ayuda */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t('categoriesTitle')}</h2>
        <HelpCategories categories={helpCategories} />
      </div>
      
      {/* Artículos destacados */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t('featuredArticlesTitle')}</h2>
        <FeaturedArticles articles={featuredArticles} />
      </div>
      
      {/* Contacto y soporte */}
      <div>
        <h2 className="text-2xl font-bold mb-6">{t('needMoreHelpTitle')}</h2>
        <ContactSupport />
      </div>
    </div>
  );
} 