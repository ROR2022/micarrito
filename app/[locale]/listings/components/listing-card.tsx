"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Car, Calendar, Activity, DollarSign, Shield } from "lucide-react";
import Link from "next/link";

interface VehicleListingCardProps {
  id: string;
  title: string;
  description?: string;
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

export function ListingCard({ 
  id,
  title, 
  price, 
  imageUrl, 
  year, 
  brand, 
  model, 
  mileage, 
  transmission,
  certified = false,
  financeable = false,
  fuelType
}: VehicleListingCardProps) {
  const monthlyPayment = Math.round(price / 60); // Cálculo simple de pago mensual a 60 meses

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-all duration-300 group">
      <CardHeader className="p-0">
        <div className="relative aspect-[16/9] w-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center rounded-t-lg">
              <Car className="h-12 w-12 text-muted-foreground/50" />
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {certified && (
              <Badge variant="default" className="bg-green-600 hover:bg-green-700 flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Certificado
              </Badge>
            )}
            {financeable && (
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-primary text-primary hover:bg-background flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                Financiable
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-primary">{brand}</span>
          <span className="font-bold text-xl">${price.toLocaleString()}</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{model} {year}</h3>
        
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{year}</span>
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground">
            <Activity className="h-4 w-4" />
            <span>{mileage?.toLocaleString()} km</span>
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground">
            <Car className="h-4 w-4" />
            <span>{transmission}</span>
          </div>
          
          {fuelType && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <svg 
                className="h-4 w-4" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 20V5C4 4.45 4.196 3.979 4.588 3.587C4.98 3.195 5.45 2.999 6 3H13C13.55 2.999 14.021 3.195 14.413 3.587C14.805 3.979 15.001 4.45 15 5V20H4Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M15 8H17C17.55 8 18.021 8.196 18.413 8.588C18.805 8.98 19.001 9.45 19 10V16.5C19 16.9 19.15 17.225 19.45 17.475C19.75 17.725 20.1 17.85 20.5 17.85C20.9 17.85 21.25 17.725 21.55 17.475C21.85 17.225 22 16.9 22 16.5V10L19 7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 7H12" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span>{fuelType}</span>
            </div>
          )}
        </div>
        
        <div className="mt-3 text-sm text-muted-foreground">
          <span>Desde </span>
          <span className="font-semibold text-primary">${monthlyPayment.toLocaleString()}/mes</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Link href={`/listings/${id}`} className="w-full">
            Detalles
          </Link>
        </Button>
        <Button size="sm" className="flex-1">
          <Link href={`/listings/${id}/test-drive`} className="w-full">
            Agendar prueba
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 