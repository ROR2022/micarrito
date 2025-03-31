import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
//import { Metadata } from 'next';
import { ArrowLeft, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
import Markdown from 'react-markdown';
import { helpArticles } from '@/data/help-content';
import { RelatedArticles } from '../components/related-articles';

interface HelpArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* export async function generateMetadata({
  params,
}: HelpArticlePageProps): Promise<Metadata> {
  const article = helpArticles.find((a) => a.slug === params.slug);

  if (!article) {
    return {
      title: 'Artículo no encontrado - Centro de Ayuda - Mi Carrito',
      description: 'El artículo que buscas no existe en nuestro centro de ayuda.',
    };
  }

  return {
    title: `${article.title} - Centro de Ayuda - Mi Carrito`,
    description: article.excerpt,
  };
} */

export default async function HelpArticlePage({ params }: HelpArticlePageProps) {
  const t = await getTranslations('Help');
  const { slug } = await params;
  const article = helpArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Encontrar artículos relacionados si existen
  const relatedArticles = article.relatedArticles 
    ? helpArticles.filter(a => article.relatedArticles?.includes(a.id))
    : [];

  // Formato de fecha para la última actualización
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/help" className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToHelp')}
        </Link>
        
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <Clock className="h-4 w-4 mr-1" />
          <span>
            {article.lastUpdated 
              ? t('lastUpdated', { date: formatDate(article.lastUpdated) })
              : t('published', { date: formatDate(article.publishedAt) })}
          </span>
        </div>
      </div>

      {/* Contenido del artículo */}
      <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
        <Markdown>{article.content}</Markdown>
      </div>

      {/* ¿Te resultó útil este artículo? */}
      <div className="border-t border-b py-6 mb-8">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">{t('wasHelpful')}</h3>
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent transition-colors">
              <ThumbsUp className="h-5 w-5" />
              {t('yes')}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent transition-colors">
              <ThumbsDown className="h-5 w-5" />
              {t('no')}
            </button>
          </div>
        </div>
      </div>

      {/* Artículos relacionados */}
      {relatedArticles.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">{t('relatedArticles')}</h2>
          <RelatedArticles articles={relatedArticles} />
        </div>
      )}

      {/* ¿Necesitas más ayuda? */}
      <div className="bg-accent/30 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium mb-2">{t('needMoreHelp')}</h3>
        <p className="mb-4 text-muted-foreground">{t('notFoundAnswer')}</p>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {t('contactSupport')}
        </Link>
      </div>
    </div>
  );
} 