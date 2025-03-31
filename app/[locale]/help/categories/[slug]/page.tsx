import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
//import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { helpCategories, helpArticles } from '@/data/help-content';
import { CategoryArticles } from '../components/category-articles';
import { HelpSearch } from '../../components/help-search';

interface HelpCategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* export async function generateMetadata({
  params,
}: HelpCategoryPageProps): Promise<Metadata> {
  const category = helpCategories.find((c) => c.slug === params.slug);

  if (!category) {
    return {
      title: 'Categoría no encontrada - Centro de Ayuda - Mi Carrito',
      description: 'La categoría que buscas no existe en nuestro centro de ayuda.',
    };
  }

  return {
    title: `${category.name} - Centro de Ayuda - Mi Carrito`,
    description: category.description,
  };
}
 */

export default async function HelpCategoryPage({ params }: HelpCategoryPageProps) {
  const t = await getTranslations('Help');
  const { slug } = await params;
  const category = helpCategories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Filtrar artículos por categoría
  const categoryArticles = helpArticles.filter(article => article.category === category.slug);

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/help" className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToHelp')}
        </Link>
        
        <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
        <p className="text-muted-foreground mb-8">{category.description}</p>
      </div>

      {/* Buscador específico de categoría */}
      <div className="mb-8">
        <HelpSearch />
      </div>

      {/* Lista de artículos */}
      {categoryArticles.length > 0 ? (
        <CategoryArticles articles={categoryArticles} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('noCategoryArticles')}</p>
        </div>
      )}
    </div>
  );
} 