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
    title: "Nissan Sentra 2020",
    description: "Sedán en excelentes condiciones con poco kilometraje",
    price: 245000,
    imageUrl: "/images/newProduct.png",
    year: 2020,
    brand: "Nissan",
    model: "Sentra",
    mileage: 45000,
    transmission: "automático" as const,
    certified: true,
    financeable: true,
    fuelType: "Gasolina"
  },
  {
    id: "2",
    title: "Honda Civic 2019",
    description: "Deportivo en perfectas condiciones, único dueño",
    price: 280000,
    imageUrl: "/images/newProduct.png",
    year: 2019,
    brand: "Honda",
    model: "Civic",
    mileage: 62000,
    transmission: "manual" as const,
    certified: true,
    financeable: true,
    fuelType: "Gasolina"
  },
  {
    id: "3",
    title: "Toyota RAV4 2021",
    description: "SUV espaciosa con todas las características premium",
    price: 390000,
    imageUrl: "/images/newProduct.png",
    year: 2021,
    brand: "Toyota",
    model: "RAV4",
    mileage: 28000,
    transmission: "automático" as const,
    certified: false,
    financeable: true,
    fuelType: "Híbrido"
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