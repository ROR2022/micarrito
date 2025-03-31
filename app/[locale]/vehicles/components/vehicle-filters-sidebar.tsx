"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
//import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Datos de muestra para filtros
const brandOptions = [
  { id: "toyota", label: "Toyota" },
  { id: "nissan", label: "Nissan" },
  { id: "honda", label: "Honda" },
  { id: "volkswagen", label: "Volkswagen" },
  { id: "chevrolet", label: "Chevrolet" },
  { id: "ford", label: "Ford" },
  { id: "mazda", label: "Mazda" },
  { id: "bmw", label: "BMW" },
  { id: "mercedes", label: "Mercedes-Benz" },
  { id: "audi", label: "Audi" }
];

const transmissionOptions = [
  { id: "automatic", label: "Automático" },
  { id: "manual", label: "Manual" }
];

const fuelTypeOptions = [
  { id: "gasoline", label: "Gasolina" },
  { id: "diesel", label: "Diésel" },
  { id: "hybrid", label: "Híbrido" },
  { id: "electric", label: "Eléctrico" },
  { id: "gas", label: "Gas LP" }
];

const conditionOptions = [
  { id: "new", label: "Nuevo" },
  { id: "used", label: "Usado" },
  { id: "certified", label: "Certificado" }
];

const colorOptions = [
  { id: "white", label: "Blanco" },
  { id: "black", label: "Negro" },
  { id: "silver", label: "Plata" },
  { id: "gray", label: "Gris" },
  { id: "red", label: "Rojo" },
  { id: "blue", label: "Azul" },
  { id: "green", label: "Verde" },
  { id: "brown", label: "Café" },
  { id: "yellow", label: "Amarillo" },
  { id: "orange", label: "Naranja" }
];

interface VehicleFiltersSidebarProps {
  initialFilters: {
    brand: string[];
    model: string[];
    year_min: string;
    year_max: string;
    price_min: string;
    price_max: string;
    mileage_min: string;
    mileage_max: string;
    transmission: string[];
    fuel_type: string[];
    condition: string[];
    color: string[];
  };
}

export function VehicleFiltersSidebar({ initialFilters }: VehicleFiltersSidebarProps) {
  const t = useTranslations("Vehicles.filters");
  const router = useRouter();
  //const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState(initialFilters);
  
  // Función para aplicar filtros
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    // Añadir solo los filtros con valores
    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach(v => params.append(key, v));
      } else if (typeof value === 'string' && value) {
        params.append(key, value);
      }
    }
    
    // Navegar a la URL con los filtros aplicados
    router.push(`/vehicles/all?${params.toString()}`);
  };
  
  // Actualizar filtros de tipo checkbox
  const updateCheckboxFilter = (filterName: string, value: string, checked: boolean) => {
    setFilters(prev => {
      const currentValues = [...(prev[filterName as keyof typeof prev] as string[])];
      if (checked) {
        if (!currentValues.includes(value)) {
          return { ...prev, [filterName]: [...currentValues, value] };
        }
      } else {
        return { ...prev, [filterName]: currentValues.filter(v => v !== value) };
      }
      return prev;
    });
  };
  
  // Actualizar filtros de tipo input
  const updateInputFilter = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };
  
  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={["brand", "price", "year", "transmission"]}>
        {/* Marcas */}
        <AccordionItem value="brand">
          <AccordionTrigger>{t('brand')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {brandOptions.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={filters.brand.includes(brand.id)}
                    onCheckedChange={(checked) => updateCheckboxFilter('brand', brand.id, !!checked)}
                  />
                  <Label htmlFor={`brand-${brand.id}`} className="text-sm cursor-pointer">
                    {brand.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Precio */}
        <AccordionItem value="price">
          <AccordionTrigger>{t('price')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="price_min" className="text-xs">
                    {t('minPrice')}
                  </Label>
                  <Input
                    id="price_min"
                    type="number"
                    placeholder="$"
                    value={filters.price_min}
                    onChange={(e) => updateInputFilter('price_min', e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="price_max" className="text-xs">
                    {t('maxPrice')}
                  </Label>
                  <Input
                    id="price_max"
                    type="number"
                    placeholder="$"
                    value={filters.price_max}
                    onChange={(e) => updateInputFilter('price_max', e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
              {/* Precios predefinidos */}
              <div className="flex flex-wrap gap-1 text-xs">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => {
                    updateInputFilter('price_min', '');
                    updateInputFilter('price_max', '250000');
                  }}
                >
                  {t('under')} $250k
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => {
                    updateInputFilter('price_min', '250000');
                    updateInputFilter('price_max', '400000');
                  }}
                >
                  $250k - $400k
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => {
                    updateInputFilter('price_min', '400000');
                    updateInputFilter('price_max', '');
                  }}
                >
                  {t('over')} $400k
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Año */}
        <AccordionItem value="year">
          <AccordionTrigger>{t('year')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="year_min" className="text-xs">
                    {t('minYear')}
                  </Label>
                  <Input
                    id="year_min"
                    type="number"
                    placeholder={t('from')}
                    value={filters.year_min}
                    onChange={(e) => updateInputFilter('year_min', e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="year_max" className="text-xs">
                    {t('maxYear')}
                  </Label>
                  <Input
                    id="year_max"
                    type="number"
                    placeholder={t('to')}
                    value={filters.year_max}
                    onChange={(e) => updateInputFilter('year_max', e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
              {/* Años predefinidos */}
              <div className="flex flex-wrap gap-1 text-xs">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => {
                    updateInputFilter('year_min', '2020');
                    updateInputFilter('year_max', '');
                  }}
                >
                  {t('newerThan')} 2020
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => {
                    updateInputFilter('year_min', '2015');
                    updateInputFilter('year_max', '2019');
                  }}
                >
                  2015 - 2019
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => {
                    updateInputFilter('year_min', '');
                    updateInputFilter('year_max', '2014');
                  }}
                >
                  {t('olderThan')} 2015
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Kilometraje */}
        <AccordionItem value="mileage">
          <AccordionTrigger>{t('mileage')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="mileage_min" className="text-xs">
                    {t('minMileage')}
                  </Label>
                  <Input
                    id="mileage_min"
                    type="number"
                    placeholder="km"
                    value={filters.mileage_min}
                    onChange={(e) => updateInputFilter('mileage_min', e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="mileage_max" className="text-xs">
                    {t('maxMileage')}
                  </Label>
                  <Input
                    id="mileage_max"
                    type="number"
                    placeholder="km"
                    value={filters.mileage_max}
                    onChange={(e) => updateInputFilter('mileage_max', e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
              {/* Kilometraje predefinido */}
              <div className="flex flex-wrap gap-1 text-xs">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => {
                    updateInputFilter('mileage_min', '');
                    updateInputFilter('mileage_max', '30000');
                  }}
                >
                  {t('under')} 30,000 km
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => {
                    updateInputFilter('mileage_min', '');
                    updateInputFilter('mileage_max', '80000');
                  }}
                >
                  {t('under')} 80,000 km
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Transmisión */}
        <AccordionItem value="transmission">
          <AccordionTrigger>{t('transmission')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {transmissionOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`transmission-${option.id}`}
                    checked={filters.transmission.includes(option.id)}
                    onCheckedChange={(checked) => updateCheckboxFilter('transmission', option.id, !!checked)}
                  />
                  <Label htmlFor={`transmission-${option.id}`} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Combustible */}
        <AccordionItem value="fuel_type">
          <AccordionTrigger>{t('fuelType')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {fuelTypeOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`fuel-${option.id}`}
                    checked={filters.fuel_type.includes(option.id)}
                    onCheckedChange={(checked) => updateCheckboxFilter('fuel_type', option.id, !!checked)}
                  />
                  <Label htmlFor={`fuel-${option.id}`} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Condición */}
        <AccordionItem value="condition">
          <AccordionTrigger>{t('condition')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {conditionOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`condition-${option.id}`}
                    checked={filters.condition.includes(option.id)}
                    onCheckedChange={(checked) => updateCheckboxFilter('condition', option.id, !!checked)}
                  />
                  <Label htmlFor={`condition-${option.id}`} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Color */}
        <AccordionItem value="color">
          <AccordionTrigger>{t('color')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {colorOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${option.id}`}
                    checked={filters.color.includes(option.id)}
                    onCheckedChange={(checked) => updateCheckboxFilter('color', option.id, !!checked)}
                  />
                  <Label htmlFor={`color-${option.id}`} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button className="w-full" onClick={applyFilters}>
        {t('applyFilters')}
      </Button>
    </div>
  );
} 