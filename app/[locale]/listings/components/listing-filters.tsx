"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { Calendar, Car, DollarSign, Activity, Filter, RefreshCw } from "lucide-react";

export function ListingFilters() {
  // Estados para los filtros
  const [priceRange, setPriceRange] = useState<[number, number]>([100000, 1000000]);
  const [yearRange, setYearRange] = useState<[number, number]>([2010, 2024]);
  const [mileageRange, setMileageRange] = useState<[number, number]>([0, 150000]);
  
  // Datos mock para las opciones de filtro
  const brands = [
    "Todas", "Toyota", "Honda", "Nissan", "Volkswagen", "Chevrolet", 
    "Ford", "Mazda", "BMW", "Mercedes-Benz", "Audi"
  ];
  
  const bodyTypes = [
    { id: "sedan", label: "Sedán" },
    { id: "suv", label: "SUV" },
    { id: "hatchback", label: "Hatchback" },
    { id: "pickup", label: "Pickup" },
    { id: "minivan", label: "Minivan" },
    { id: "coupe", label: "Coupé" },
    { id: "convertible", label: "Convertible" }
  ];
  
  const transmissions = [
    { id: "all", label: "Todas" },
    { id: "automatic", label: "Automático" },
    { id: "manual", label: "Manual" }
  ];
  
  const fuelTypes = [
    { id: "all", label: "Todos" },
    { id: "gasoline", label: "Gasolina" },
    { id: "diesel", label: "Diesel" },
    { id: "hybrid", label: "Híbrido" },
    { id: "electric", label: "Eléctrico" }
  ];
  
  const certifications = [
    { id: "certified", label: "Certificado" },
    { id: "warranty", label: "Con garantía" },
    { id: "financeable", label: "Financiable" },
    { id: "service_history", label: "Historial de servicio" }
  ];

  // Formateadores para mostrar valores en rangos
  const formatPrice = (value: number) => `$${value.toLocaleString()}`;
  const formatMileage = (value: number) => `${value.toLocaleString()} km`;
  
  // Manejadores de eventos
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };
  
  const handleYearChange = (values: number[]) => {
    setYearRange([values[0], values[1]]);
  };
  
  const handleMileageChange = (values: number[]) => {
    setMileageRange([values[0], values[1]]);
  };
  
  const handleReset = () => {
    setPriceRange([100000, 1000000]);
    setYearRange([2010, 2024]);
    setMileageRange([0, 150000]);
    // Aquí resetearías los demás filtros también
  };
  
  return (
    <Card className="sticky top-4">
      <CardHeader className="border-b bg-muted/40">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
          <Button 
            variant="ghost" 
            onClick={handleReset}
            size="sm"
            className="h-8 gap-1 text-xs"
          >
            <RefreshCw className="h-3 w-3" />
            Reiniciar
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <Accordion type="multiple" defaultValue={["price", "brand", "bodyType", "year"]} className="space-y-2">
          {/* Filtro de Precio */}
          <AccordionItem value="price" className="border-b">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span>Precio</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-1 pb-3 pt-1">
              <div className="space-y-5">
                <div className="flex justify-between items-center text-sm">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
                <Slider
                  defaultValue={[priceRange[0], priceRange[1]]}
                  min={50000}
                  max={2000000}
                  step={10000}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={handlePriceChange}
                  className="mt-6"
                />
                
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="Mínimo"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="text-sm"
                  />
                  <Input
                    type="number"
                    placeholder="Máximo"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="text-sm"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Filtro de Marca */}
          <AccordionItem value="brand" className="border-b">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-primary" />
                <span>Marca</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-1 pb-3 pt-1">
              <Select defaultValue="Todas">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una marca" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="mt-3 max-h-44 overflow-y-auto pr-2 space-y-1">
                {brands.slice(1).map((brand) => (
                  <div key={brand} className="flex items-center space-x-2 py-1">
                    <Checkbox id={`brand-${brand}`} />
                    <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">{brand}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Filtro de Tipo de Carrocería */}
          <AccordionItem value="bodyType" className="border-b">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-primary" />
                <span>Tipo de Vehículo</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-1 pb-3 pt-1">
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {bodyTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2 py-1">
                    <Checkbox id={`bodyType-${type.id}`} />
                    <Label htmlFor={`bodyType-${type.id}`} className="text-sm cursor-pointer">{type.label}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Filtro de Año */}
          <AccordionItem value="year" className="border-b">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Año</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-1 pb-3 pt-1">
              <div className="space-y-5">
                <div className="flex justify-between items-center text-sm">
                  <span>{yearRange[0]}</span>
                  <span>{yearRange[1]}</span>
                </div>
                <Slider
                  defaultValue={[yearRange[0], yearRange[1]]}
                  min={1990}
                  max={2024}
                  step={1}
                  value={[yearRange[0], yearRange[1]]}
                  onValueChange={handleYearChange}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Filtro de Kilometraje */}
          <AccordionItem value="mileage" className="border-b">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <span>Kilometraje</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-1 pb-3 pt-1">
              <div className="space-y-5">
                <div className="flex justify-between items-center text-sm">
                  <span>{formatMileage(mileageRange[0])}</span>
                  <span>{formatMileage(mileageRange[1])}</span>
                </div>
                <Slider
                  defaultValue={[mileageRange[0], mileageRange[1]]}
                  min={0}
                  max={300000}
                  step={5000}
                  value={[mileageRange[0], mileageRange[1]]}
                  onValueChange={handleMileageChange}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Filtro de Transmisión */}
          <AccordionItem value="transmission" className="border-b">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 9L16 5M16 5L12 5M16 5L19 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 19L8 15M8 15L12 15M8 15L5 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.5 17L17.25 17C18.7688 17 20 15.7688 20 14.25L20 14.25C20 12.7312 18.7688 11.5 17.25 11.5L13 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.5 8.5L6.75 8.5C5.23122 8.5 4 9.73122 4 11.25V11.25C4 12.7688 5.23122 14 6.75 14L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Transmisión</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-1 pb-3 pt-1">
              <div className="space-y-1">
                {transmissions.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 py-1">
                    <Checkbox id={`transmission-${item.id}`} />
                    <Label htmlFor={`transmission-${item.id}`} className="text-sm cursor-pointer">{item.label}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Filtro de Combustible */}
          <AccordionItem value="fuel" className="border-b">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 20V5C4 4.45 4.196 3.979 4.588 3.587C4.98 3.195 5.45 2.999 6 3H13C13.55 2.999 14.021 3.195 14.413 3.587C14.805 3.979 15.001 4.45 15 5V20H4Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M15 8H17C17.55 8 18.021 8.196 18.413 8.588C18.805 8.98 19.001 9.45 19 10V16.5C19 16.9 19.15 17.225 19.45 17.475C19.75 17.725 20.1 17.85 20.5 17.85C20.9 17.85 21.25 17.725 21.55 17.475C21.85 17.225 22 16.9 22 16.5V10L19 7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 7H12" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <span>Combustible</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-1 pb-3 pt-1">
              <div className="space-y-1">
                {fuelTypes.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 py-1">
                    <Checkbox id={`fuel-${item.id}`} />
                    <Label htmlFor={`fuel-${item.id}`} className="text-sm cursor-pointer">{item.label}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Filtro de Certificaciones */}
          <AccordionItem value="certifications" className="border-b">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12.75L11.25 15L15 9.75M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Certificaciones</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-1 pb-3 pt-1">
              <div className="space-y-1">
                {certifications.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 py-1">
                    <Checkbox id={`cert-${item.id}`} />
                    <Label htmlFor={`cert-${item.id}`} className="text-sm cursor-pointer">{item.label}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="mt-6">
          <Button className="w-full">Aplicar Filtros</Button>
        </div>
      </CardContent>
    </Card>
  );
} 