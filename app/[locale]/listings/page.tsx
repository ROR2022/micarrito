"use client"

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ListingGrid } from "./components/listing-grid";
import { ListingFilters } from "./components/listing-filters";
import { ListingSearch } from "./components/listing-search";

// Mock data - This will be replaced with Supabase data later
const mockListings = [
  {
    id: "1",
    title: "Professional Photography Services",
    description: "High-quality photography services for events, portraits, and commercial projects.",
    price: 150,
    imageUrl: "/images/newProduct.png",
    category: "Services"
  },
  {
    id: "2",
    title: "Vintage Camera Collection",
    description: "A collection of well-maintained vintage cameras from the 1950s to 1970s.",
    price: 1200,
    imageUrl: "/images/newProduct.png",
    category: "Electronics"
  },
  {
    id: "3",
    title: "Vintage Camera Collection",
    description: "A collection of well-maintained vintage cameras from the 1950s to 1970s.",
    price: 1200,
    imageUrl: "/images/newProduct.png",
    category: "Electronics"
  }
  // Add more mock listings as needed
];

export default function ListingsPage() {
  const t = useTranslations("Listings");
  const [listings, setListings] = useState(mockListings);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement Supabase search
      // For now, we'll just filter the mock data
      const filteredListings = mockListings.filter(listing =>
        listing.title.toLowerCase().includes(query.toLowerCase()) ||
        listing.description.toLowerCase().includes(query.toLowerCase())
      );
      setListings(filteredListings);
    } catch (error) {
      console.error("Error searching listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="mb-8">
        <ListingSearch onSearch={handleSearch} isLoading={isLoading} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <ListingFilters />
        </div>
        <div className="md:col-span-3">
          <ListingGrid listings={listings} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
} 