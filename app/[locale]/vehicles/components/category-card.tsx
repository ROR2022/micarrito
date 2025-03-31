"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    count: number;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <Link href={`/${locale}/vehicles/category/${category.slug}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="relative h-40">
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Badge className="absolute top-3 right-3">
            {category.count} vehículos
          </Badge>
        </div>
        <CardContent className="p-5">
          <h3 className="font-bold text-xl mb-2">{category.name}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {category.description}
          </p>
          <div className="flex items-center text-sm text-primary font-medium">
            <span className="mr-1">Explorar</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 