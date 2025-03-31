export interface HelpCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface HelpArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  relatedArticles?: string[];
  tags: string[];
  publishedAt: string;
  lastUpdated?: string;
  helpfulRating?: number;
  featured?: boolean;
}

export interface HelpCategoryWithArticles extends HelpCategory {
  articles: HelpArticle[];
} 