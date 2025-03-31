"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";
import { HelpArticle } from "@/types/help";

interface CategoryArticlesProps {
  articles: HelpArticle[];
}

export function CategoryArticles({ articles }: CategoryArticlesProps) {
  const params = useParams();
  const locale = params.locale as string;
  
  if (!articles.length) {
    return null;
  }
  
  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Link key={article.id} href={`/${locale}/help/articles/${article.slug}`}>
          <Card className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start">
                <FileText className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">{article.title}</h3>
                  <CardDescription className="line-clamp-2">
                    {article.excerpt}
                  </CardDescription>
                  <div className="flex items-center mt-2 text-sm text-primary font-medium">
                    <span className="mr-1">Leer más</span>
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