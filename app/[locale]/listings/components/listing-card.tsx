"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface ListingCardProps {
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
}

export function ListingCard({ title, description, price, imageUrl, category }: ListingCardProps) {
  const t = useTranslations('Listings');

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center rounded-t-lg">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{category}</span>
          <span className="font-semibold">${price}</span>
        </div>
        <CardTitle className="text-lg mb-2">{title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">{t('viewDetails')}</Button>
      </CardFooter>
    </Card>
  );
} 