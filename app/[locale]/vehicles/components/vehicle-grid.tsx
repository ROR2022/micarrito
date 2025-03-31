"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, Fuel, Clock, Zap } from "lucide-react";

// Datos de muestra para la lista de vehículos
const mockAllVehicles = [
  {
    id: "v1",
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
    condition: "new"
  },
  {
    id: "v2",
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
    condition: "new"
  },
  {
    id: "v3",
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
    condition: "used"
  },
  {
    id: "v4",
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
    condition: "used"
  },
  {
    id: "v5",
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
    condition: "used"
  },
  {
    id: "v6",
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
    condition: "used"
  },
  {
    id: "v7",
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
    condition: "used"
  },
  {
    id: "v8",
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
    condition: "used"
  },
  {
    id: "v9",
    title: "Ford Focus 2020",
    description: "Hatchback con gran rendimiento y buen precio",
    price: 229000,
    imageUrl: "/images/newProduct.png",
    year: 2020,
    brand: "Ford",
    model: "Focus",
    mileage: 45000,
    transmission: "manual",
    fuelType: "Gasolina",
    condition: "used"
  },
  {
    id: "v10",
    title: "Chevrolet Aveo 2021",
    description: "Compacto ideal para la ciudad con bajo consumo",
    price: 195000,
    imageUrl: "/images/newProduct.png",
    year: 2021,
    brand: "Chevrolet",
    model: "Aveo",
    mileage: 32000,
    transmission: "manual",
    fuelType: "Gasolina",
    condition: "used"
  },
  {
    id: "v11",
    title: "Volkswagen Tiguan 2019",
    description: "SUV espacioso con mecánica confiable",
    price: 365000,
    imageUrl: "/images/newProduct.png",
    year: 2019,
    brand: "Volkswagen",
    model: "Tiguan",
    mileage: 55000,
    transmission: "automático",
    fuelType: "Gasolina",
    condition: "used"
  },
  {
    id: "v12",
    title: "Toyota Yaris 2020",
    description: "Hatchback compacto con excelente economía de combustible",
    price: 210000,
    imageUrl: "/images/newProduct.png",
    year: 2020,
    brand: "Toyota",
    model: "Yaris",
    mileage: 38000,
    transmission: "automático",
    fuelType: "Gasolina",
    condition: "used"
  },
  {
    id: "v13",
    title: "Kia Sportage 2020",
    description: "SUV con excelente relación calidad-precio",
    price: 340000,
    imageUrl: "/images/newProduct.png",
    year: 2020,
    brand: "Kia",
    model: "Sportage",
    mileage: 42000,
    transmission: "automático",
    fuelType: "Gasolina",
    condition: "used"
  },
  {
    id: "v14",
    title: "Hyundai Tucson 2021",
    description: "SUV con diseño moderno y tecnología avanzada",
    price: 410000,
    imageUrl: "/images/newProduct.png",
    year: 2021,
    brand: "Hyundai",
    model: "Tucson",
    mileage: 28000,
    transmission: "automático",
    fuelType: "Gasolina",
    condition: "used"
  },
  {
    id: "v15",
    title: "BMW X1 2019",
    description: "SUV premium con acabados de lujo",
    price: 560000,
    imageUrl: "/images/newProduct.png",
    year: 2019,
    brand: "BMW",
    model: "X1",
    mileage: 35000,
    transmission: "automático",
    fuelType: "Gasolina",
    condition: "used"
  },
  {
    id: "v16",
    title: "Mercedes-Benz Clase A 2020",
    description: "Sedán compacto con interior lujoso y tecnología de punta",
    price: 610000,
    imageUrl: "/images/newProduct.png",
    year: 2020,
    brand: "Mercedes",
    model: "Clase A",
    mileage: 30000,
    transmission: "automático",
    fuelType: "Gasolina",
    condition: "used"
  },
  {
    id: "v17",
    title: "Audi A3 2021",
    description: "Sedán compacto premium con excelente manejo",
    price: 580000,
    imageUrl: "/images/newProduct.png",
    year: 2021,
    brand: "Audi",
    model: "A3",
    mileage: 22000,
    transmission: "automático",
    fuelType: "Gasolina",
    condition: "used"
  },
  {
    id: "v18",
    title: "Mazda 3 2022",
    description: "Sedán deportivo con diseño elegante y gran dinamismo",
    price: 375000,
    imageUrl: "/images/newProduct.png",
    year: 2022,
    brand: "Mazda",
    model: "3",
    mileage: 15000,
    transmission: "automático",
    fuelType: "Gasolina",
    condition: "used"
  },
  {
    id: "v19",
    title: "Tesla Model 3 2022",
    description: "Vehículo eléctrico de alto rendimiento con tecnología de punta",
    price: 980000,
    imageUrl: "/images/newProduct.png",
    year: 2022,
    brand: "Tesla",
    model: "Model 3",
    mileage: 8000,
    transmission: "automático",
    fuelType: "Eléctrico",
    condition: "used"
  },
  {
    id: "v20",
    title: "Ford Ranger 2021",
    description: "Pickup con capacidad todoterreno y excelente capacidad de carga",
    price: 520000,
    imageUrl: "/images/newProduct.png",
    year: 2021,
    brand: "Ford",
    model: "Ranger",
    mileage: 28000,
    transmission: "automático",
    fuelType: "Diésel",
    condition: "used"
  },
  {
    id: "v21",
    title: "Toyota Hilux 2022",
    description: "Pickup robusta y confiable para trabajo y aventura",
    price: 580000,
    imageUrl: "/images/newProduct.png",
    year: 2022,
    brand: "Toyota",
    model: "Hilux",
    mileage: 20000,
    transmission: "manual",
    fuelType: "Diésel",
    condition: "used"
  },
  {
    id: "v22",
    title: "Chevrolet Spark 2021",
    description: "Ciudad compacto ideal para la ciudad con bajo consumo",
    price: 165000,
    imageUrl: "/images/newProduct.png",
    year: 2021,
    brand: "Chevrolet",
    model: "Spark",
    mileage: 25000,
    transmission: "manual",
    fuelType: "Gasolina",
    condition: "used"
  },
  {
    id: "v23",
    title: "Nissan X-Trail 2020",
    description: "SUV versátil con excelente espacio interior y confort",
    price: 420000,
    imageUrl: "/images/newProduct.png",
    year: 2020,
    brand: "Nissan",
    model: "X-Trail",
    mileage: 38000,
    transmission: "automático",
    fuelType: "Gasolina",
    condition: "used"
  },
  {
    id: "v24",
    title: "Honda HR-V 2022",
    description: "SUV compacto con gran versatilidad interior",
    price: 405000,
    imageUrl: "/images/newProduct.png",
    year: 2022,
    brand: "Honda",
    model: "HR-V",
    mileage: 18000,
    transmission: "automático",
    fuelType: "Gasolina",
    condition: "used"
  }
];

export function VehicleGrid() {
  const params = useParams();
  //const searchParams = useSearchParams();
  const locale = params.locale as string;
  
  // En un escenario real, aquí se filtraría basado en los searchParams
  // Por ahora, simplemente mostramos todos los vehículos de muestra
  const vehicles = mockAllVehicles;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <Link key={vehicle.id} href={`/${locale}/vehicles/${vehicle.id}`}>
          <Card className="overflow-hidden h-full hover:shadow-md transition-all">
            <div className="relative h-48">
              <Image
                src={vehicle.imageUrl}
                alt={vehicle.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {vehicle.condition === "new" && (
                <Badge variant="secondary" className="absolute top-3 left-3 bg-green-100 text-green-800 hover:bg-green-100">
                  Nuevo
                </Badge>
              )}
              {vehicle.condition === "certified" && (
                <Badge variant="outline" className="absolute top-3 left-3 bg-blue-100 text-blue-800 hover:bg-blue-100">
                  Certificado
                </Badge>
              )}
              <Badge className="absolute top-3 right-3">${vehicle.price.toLocaleString()}</Badge>
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
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
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
            <CardFooter className="pt-2 pb-4">
              <Button variant="ghost" size="sm" className="ml-auto">
                Ver detalles
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
} 