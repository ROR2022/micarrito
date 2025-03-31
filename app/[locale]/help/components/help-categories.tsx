"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Tag, 
  CreditCard, 
  User, 
  Wallet, 
  Wrench, 
  ArrowRight
} from "lucide-react";
import { HelpCategory } from "@/types/help";

const ICON_MAP: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart className="h-6 w-6 text-primary" />,
  Tag: <Tag className="h-6 w-6 text-primary" />,
  CreditCard: <CreditCard className="h-6 w-6 text-primary" />,
  User: <User className="h-6 w-6 text-primary" />,
  Wallet: <Wallet className="h-6 w-6 text-primary" />,
  Wrench: <Wrench className="h-6 w-6 text-primary" />
};

interface HelpCategoriesProps {
  categories: HelpCategory[];
}

export function HelpCategories({ categories }: HelpCategoriesProps) {
  const t = useTranslations("Help");
  const params = useParams();
  const locale = params.locale as string;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/${locale}/help/categories/${category.slug}`}>
          <Card className="h-full transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <div className="mr-4">
                  {ICON_MAP[category.icon]}
                </div>
                <div className="flex-grow">
                  <CardTitle className="text-xl mb-2">{category.name}</CardTitle>
                  <CardDescription className="text-sm mb-4">{category.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center text-sm text-primary font-medium">
                <span className="mr-1">{t("viewCategory")}</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
} 