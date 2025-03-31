import { Container } from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Clock, Fuel, Zap, ArrowLeft, Share2, Heart, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock de datos de un vehículo específico para demostración
const mockVehicle = {
  id: "v1",
  title: "Toyota Corolla 2023",
  description: "El Toyota Corolla 2023 ofrece un equilibrio perfecto entre estilo, eficiencia y tecnología. Con su diseño moderno y aerodinámico, este sedán compacto no solo es atractivo visualmente, sino que también ofrece un rendimiento de combustible excepcional. El interior espacioso y bien equipado incluye la última tecnología en conectividad y sistemas de seguridad avanzados.",
  price: 320000,
  images: [
    "/images/newProduct.png",
    "/images/newProduct.png",
    "/images/newProduct.png",
    "/images/newProduct.png"
  ],
  year: 2023,
  brand: "Toyota",
  model: "Corolla",
  mileage: 0,
  transmission: "automático",
  fuelType: "Gasolina",
  bodyType: "Sedán",
  color: "Blanco",
  doors: 4,
  condition: "new",
  features: [
    "Pantalla táctil de 8 pulgadas",
    "Android Auto / Apple CarPlay",
    "Cámara de reversa",
    "Control de crucero adaptativo",
    "Sistema de frenado automático de emergencia",
    "Control de estabilidad",
    "7 bolsas de aire",
    "Asientos de tela premium",
    "Llave inteligente con botón de encendido",
    "Clima automático de doble zona"
  ],
  sellerInfo: {
    name: "Agencia Toyota Centro",
    rating: 4.8,
    reviewCount: 156,
    location: "Ciudad de México, México",
    phone: "+52 55 1234 5678"
  }
};

export default async function VehicleDetailPage({ params }: { params: Promise<{ vehicleId: string, locale: string }> }) {
  const { vehicleId, locale } = await params;
  
  // En una aplicación real, aquí buscaríamos el vehículo por ID usando vehicleId
  // Para este ejemplo, usamos el mock y registramos el ID para referencia
  console.log(`Mostrando detalles del vehículo ID: ${vehicleId}`);
  const vehicle = mockVehicle;
  
  return (
    <div className="py-8">
      <Container>
        {/* Botón Regresar y Título */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href={`/${locale}/vehicles`}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Regresar a vehículos
            </Link>
          </Button>
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold">{vehicle.title}</h1>
              <p className="text-muted-foreground">{vehicle.brand} {vehicle.model}, {vehicle.year}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Compartir
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-1" />
                Guardar
              </Button>
            </div>
          </div>
        </div>
        
        {/* Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda - Galería e Información */}
          <div className="lg:col-span-2 space-y-8">
            {/* Galería de Imágenes */}
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden h-96">
                <Image 
                  src={vehicle.images[0]} 
                  alt={vehicle.title}
                  fill
                  className="object-cover"
                />
                {vehicle.condition === "new" && (
                  <Badge variant="secondary" className="absolute top-3 left-3 bg-green-100 text-green-800 hover:bg-green-100">
                    Nuevo
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {vehicle.images.slice(1).map((img, i) => (
                  <div key={i} className="relative rounded-md overflow-hidden h-24">
                    <Image
                      src={img}
                      alt={`${vehicle.title} - imagen ${i+2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pestañas de Información */}
            <Tabs defaultValue="overview">
              <TabsList className="w-full">
                <TabsTrigger value="overview">Visión general</TabsTrigger>
                <TabsTrigger value="features">Características</TabsTrigger>
                <TabsTrigger value="seller">Información del vendedor</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="pt-4">
                <h2 className="text-xl font-semibold mb-2">Descripción</h2>
                <p className="text-gray-700 mb-6">{vehicle.description}</p>
                
                <h2 className="text-xl font-semibold mb-2">Especificaciones</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Marca</span>
                    <span className="font-medium">{vehicle.brand}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Modelo</span>
                    <span className="font-medium">{vehicle.model}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Año</span>
                    <span className="font-medium">{vehicle.year}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Kilometraje</span>
                    <span className="font-medium">{vehicle.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Transmisión</span>
                    <span className="font-medium">{vehicle.transmission}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Combustible</span>
                    <span className="font-medium">{vehicle.fuelType}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Tipo de carrocería</span>
                    <span className="font-medium">{vehicle.bodyType}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Color</span>
                    <span className="font-medium">{vehicle.color}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Puertas</span>
                    <span className="font-medium">{vehicle.doors}</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="features" className="pt-4">
                <h2 className="text-xl font-semibold mb-4">Características y equipamiento</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                  {vehicle.features.map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="seller" className="pt-4">
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-semibold">Información del vendedor</h2>
                  <div className="p-4 border rounded-lg">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium">{vehicle.sellerInfo.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(vehicle.sellerInfo.rating) ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-1">({vehicle.sellerInfo.reviewCount} reseñas)</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        {vehicle.sellerInfo.location}
                      </p>
                    </div>
                    <Button className="w-full mt-4">
                      <Phone className="h-4 w-4 mr-2" />
                      {vehicle.sellerInfo.phone}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Columna Derecha - Precio y acciones */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-card border rounded-lg p-6 shadow-sm">
              <div className="mb-4">
                <div className="text-3xl font-bold text-primary">
                  ${vehicle.price.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Precio de lista</p>
              </div>
              
              <div className="grid grid-cols-2 gap-y-2 mb-6">
                <div className="flex items-center">
                  <Car className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm">{vehicle.year}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm">{vehicle.mileage.toLocaleString()} km</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm">{vehicle.transmission}</span>
                </div>
                <div className="flex items-center">
                  <Fuel className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm">{vehicle.fuelType}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full">Contactar vendedor</Button>
                <Button variant="outline" className="w-full">Programar prueba de manejo</Button>
                <Button variant="secondary" className="w-full">Solicitar financiamiento</Button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  ID del vehículo: {vehicle.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
} 