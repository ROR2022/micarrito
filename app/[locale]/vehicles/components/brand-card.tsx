"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface BrandCardProps {
  brand: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string;
    count: number;
  };
}

export function BrandCard({ brand }: BrandCardProps) {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <Link href={`/${locale}/vehicles/brand/${brand.slug}`}>
      <Card className="h-full hover:shadow-sm transition-all border-transparent hover:border-primary/20">
        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
          <div className="relative h-16 w-full mb-2">
            <Image
              src={brand.logoUrl}
              alt={brand.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="text-center">
            <h3 className="font-medium text-sm mb-1">{brand.name}</h3>
            <p className="text-xs text-muted-foreground">{brand.count} vehículos</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 