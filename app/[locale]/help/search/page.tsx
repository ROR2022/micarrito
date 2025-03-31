"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { helpArticles } from "@/data/help-content";
import { HelpSearch } from "../components/help-search";
import { CategoryArticles } from "../categories/components/category-articles";
import { HelpArticle } from "@/types/help";

export default function HelpSearchPage() {
  const t = useTranslations("Help");
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [searchResults, setSearchResults] = useState<HelpArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      
      // Simulación de búsqueda - en producción, esto sería una llamada a API
      const results = helpArticles.filter(article => {
        const searchableText = `${article.title} ${article.excerpt} ${article.content} ${article.tags.join(' ')}`.toLowerCase();
        return searchableText.includes(query.toLowerCase());
      });
      
      // Simular retraso de red
      setTimeout(() => {
        setSearchResults(results);
        setIsLoading(false);
      }, 500);
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  }, [query]);
  
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/help" className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToHelp')}
        </Link>
        
        <h1 className="text-3xl font-bold mb-4">
          {query ? t('searchResults', { query }) : t('search')}
        </h1>
      </div>

      {/* Buscador */}
      <div className="mb-8">
        <HelpSearch />
      </div>

      {/* Resultados */}
      <div>
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('searching')}</p>
          </div>
        ) : (
          <>
            {searchResults.length > 0 ? (
              <>
                <div className="mb-4">
                  <p className="text-muted-foreground">
                    {t('resultsFound', { count: searchResults.length })}
                  </p>
                </div>
                <CategoryArticles articles={searchResults} />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="font-medium mb-2">{t('noResultsFound')}</p>
                <p className="text-muted-foreground mb-6">{t('tryAnotherSearch')}</p>
                
                <div className="max-w-md mx-auto p-6 bg-accent/30 rounded-lg">
                  <h3 className="font-medium mb-2">{t('needMoreHelp')}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t('notFoundAnswer')}</p>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {t('contactSupport')}
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 