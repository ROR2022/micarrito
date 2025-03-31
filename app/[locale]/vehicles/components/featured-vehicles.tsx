"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, Fuel, Zap } from "lucide-react";
import { BsSpeedometer2 as Speedometer } from "react-icons/bs";

// Interfaces para los vehículos
interface BaseVehicle {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
  brand: string;
  model: string;
  mileage: number;
  transmission: string;
  fuelType: string;
  condition: string;
  category: string;
}

interface DealVehicle extends BaseVehicle {
  oldPrice: number;
}

// Datos de muestra para vehículos destacados
const mockVehicles = {
  latest: [
    {
      id: "l1",
      title: "Toyota Corolla 2023",
      description: "Sedán compacto con excelente rendimiento de combustible",
      price: 320000,
      imageUrl: "/images/newProduct.png",
      year: 2023,
      brand: "Toyota",
      model: "Corolla",
      mileage: 0,
      transmission: "automático",
      fuelType: "Gasolina",
      condition: "new",
      category: "sedan"
    },
    {
      id: "l2",
      title: "Nissan Kicks 2023",
      description: "SUV compacto con tecnología de vanguardia",
      price: 425000,
      imageUrl: "/images/newProduct.png",
      year: 2023,
      brand: "Nissan",
      model: "Kicks",
      mileage: 0,
      transmission: "automático",
      fuelType: "Gasolina",
      condition: "new",
      category: "suv"
    },
    {
      id: "l3",
      title: "Honda Civic 2022",
      description: "Elegante y deportivo con características premium",
      price: 390000,
      imageUrl: "/images/newProduct.png",
      year: 2022,
      brand: "Honda",
      model: "Civic",
      mileage: 10000,
      transmission: "manual",
      fuelType: "Gasolina",
      condition: "used",
      category: "sedan"
    },
    {
      id: "l4",
      title: "Volkswagen Jetta 2022",
      description: "Combinación perfecta de confort y estilo",
      price: 350000,
      imageUrl: "/images/newProduct.png",
      year: 2022,
      brand: "Volkswagen",
      model: "Jetta",
      mileage: 15000,
      transmission: "automático",
      fuelType: "Gasolina",
      condition: "used",
      category: "sedan"
    }
  ] as BaseVehicle[],
  popular: [
    {
      id: "p1",
      title: "Mazda CX-5 2021",
      description: "SUV con diseño premium y excelente manejo",
      price: 480000,
      imageUrl: "/images/newProduct.png",
      year: 2021,
      brand: "Mazda",
      model: "CX-5",
      mileage: 25000,
      transmission: "automático",
      fuelType: "Gasolina",
      condition: "used",
      category: "suv"
    },
    {
      id: "p2",
      title: "Nissan Versa 2022",
      description: "Económico y espacioso para la ciudad",
      price: 245000,
      imageUrl: "/images/newProduct.png",
      year: 2022,
      brand: "Nissan",
      model: "Versa",
      mileage: 18000,
      transmission: "automático",
      fuelType: "Gasolina",
      condition: "used",
      category: "sedan"
    },
    {
      id: "p3",
      title: "Toyota RAV4 2021",
      description: "SUV familiar con amplio espacio y confiabilidad",
      price: 520000,
      imageUrl: "/images/newProduct.png",
      year: 2021,
      brand: "Toyota",
      model: "RAV4",
      mileage: 30000,
      transmission: "automático",
      fuelType: "Híbrido",
      condition: "used",
      category: "suv"
    },
    {
      id: "p4",
      title: "Honda CR-V 2022",
      description: "SUV versátil con tecnología avanzada",
      price: 495000,
      imageUrl: "/images/newProduct.png",
      year: 2022,
      brand: "Honda",
      model: "CR-V",
      mileage: 22000,
      transmission: "automático",
      fuelType: "Gasolina",
      condition: "used",
      category: "suv"
    }
  ] as BaseVehicle[],
  deals: [
    {
      id: "d1",
      title: "Ford Focus 2020",
      description: "Hatchback con gran rendimiento y buen precio",
      price: 229000,
      oldPrice: 250000,
      imageUrl: "/images/newProduct.png",
      year: 2020,
      brand: "Ford",
      model: "Focus",
      mileage: 45000,
      transmission: "manual",
      fuelType: "Gasolina",
      condition: "used",
      category: "hatchback"
    },
    {
      id: "d2",
      title: "Chevrolet Aveo 2021",
      description: "Compacto ideal para la ciudad con bajo consumo",
      price: 195000,
      oldPrice: 215000,
      imageUrl: "/images/newProduct.png",
      year: 2021,
      brand: "Chevrolet",
      model: "Aveo",
      mileage: 32000,
      transmission: "manual",
      fuelType: "Gasolina",
      condition: "used",
      category: "sedan"
    },
    {
      id: "d3",
      title: "Volkswagen Tiguan 2019",
      description: "SUV espacioso con mecánica confiable",
      price: 365000,
      oldPrice: 399000,
      imageUrl: "/images/newProduct.png",
      year: 2019,
      brand: "Volkswagen",
      model: "Tiguan",
      mileage: 55000,
      transmission: "automático",
      fuelType: "Gasolina",
      condition: "used",
      category: "suv"
    },
    {
      id: "d4",
      title: "Toyota Yaris 2020",
      description: "Hatchback compacto con excelente economía de combustible",
      price: 210000,
      oldPrice: 230000,
      imageUrl: "/images/newProduct.png",
      year: 2020,
      brand: "Toyota",
      model: "Yaris",
      mileage: 38000,
      transmission: "automático",
      fuelType: "Gasolina",
      condition: "used",
      category: "hatchback"
    }
  ] as DealVehicle[]
};

interface FeaturedVehiclesProps {
  type: "latest" | "popular" | "deals";
}

export function FeaturedVehicles({ type }: FeaturedVehiclesProps) {
  const params = useParams();
  const locale = params.locale as string;
  
  const vehicles = mockVehicles[type];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {vehicles.map((vehicle) => (
        <Link key={vehicle.id} href={`/${locale}/vehicles/${vehicle.id}`}>
          <Card className="overflow-hidden h-full hover:shadow-md transition-all">
            <div className="relative h-48">
              <Image
                src={vehicle.imageUrl}
                alt={vehicle.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              {vehicle.condition === "new" && (
                <Badge variant="secondary" className="absolute top-3 left-3 bg-green-100 text-green-800 hover:bg-green-100">
                  Nuevo
                </Badge>
              )}
              {type === "deals" && (
                <Badge variant="destructive" className="absolute top-3 right-3">
                  Oferta
                </Badge>
              )}
            </div>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <CardTitle className="text-lg">{vehicle.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {vehicle.description}
                  </CardDescription>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-y-2 mt-3 text-sm">
                <div className="flex items-center w-1/2">
                  <Car className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{vehicle.year}</span>
                </div>
                <div className="flex items-center w-1/2">
                  <Speedometer className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{vehicle.mileage.toLocaleString()} km</span>
                </div>
                <div className="flex items-center w-1/2">
                  <Zap className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{vehicle.transmission}</span>
                </div>
                <div className="flex items-center w-1/2">
                  <Fuel className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{vehicle.fuelType}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-4 flex items-center justify-between">
              <div>
                {type === "deals" && (vehicle as DealVehicle).oldPrice && (
                  <span className="text-sm line-through text-muted-foreground mr-2">
                    ${(vehicle as DealVehicle).oldPrice.toLocaleString()}
                  </span>
                )}
                <span className="font-bold text-xl">
                  ${vehicle.price.toLocaleString()}
                </span>
              </div>
              <Button variant="ghost" size="sm">
                Ver detalles
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
} 