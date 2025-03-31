"use client";

import { ListingCard } from "./listing-card";
import { useTranslations } from "next-intl";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  year: number;
  brand: string;
  model: string;
  mileage: number;
  transmission: "manual" | "automático";
  certified?: boolean;
  financeable?: boolean;
  fuelType?: string;
}

interface ListingGridProps {
  listings: Listing[];
  isLoading?: boolean;
}

export function ListingGrid({ listings, isLoading = false }: ListingGridProps) {
  const t = useTranslations("Listings");

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{t("loading")}</p>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{t("noListings")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          id={listing.id}
          title={listing.title}
          description={listing.description}
          price={listing.price}
          imageUrl={listing.imageUrl}
          year={listing.year}
          brand={listing.brand}
          model={listing.model}
          mileage={listing.mileage}
          transmission={listing.transmission}
          certified={listing.certified}
          financeable={listing.financeable}
          fuelType={listing.fuelType}
        />
      ))}
    </div>
  );
} 