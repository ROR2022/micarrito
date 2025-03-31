"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";
import { HelpArticle } from "@/types/help";

interface FeaturedArticlesProps {
  articles: HelpArticle[];
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  const t = useTranslations("Help");
  const params = useParams();
  const locale = params.locale as string;
  
  if (!articles.length) {
    return null;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {articles.map((article) => (
        <Link key={article.id} href={`/${locale}/help/articles/${article.slug}`}>
          <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-grow">
                  <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                  <CardDescription className="text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </CardDescription>
                  <div className="flex items-center text-sm text-primary font-medium">
                    <span className="mr-1">{t("readMore")}</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
} 