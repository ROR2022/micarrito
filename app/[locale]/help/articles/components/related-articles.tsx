"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { HelpArticle } from "@/types/help";

interface RelatedArticlesProps {
  articles: HelpArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  const params = useParams();
  const locale = params.locale as string;
  
  if (!articles.length) {
    return null;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {articles.map((article) => (
        <Link key={article.id} href={`/${locale}/help/articles/${article.slug}`}>
          <Card className="h-full hover:border-primary/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span className="font-medium text-sm">{article.title}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
} 