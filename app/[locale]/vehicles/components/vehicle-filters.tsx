"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter as FilterIcon } from "lucide-react";

export function VehicleFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Estado para los filtros
  const [priceRange, setPriceRange] = useState<number[]>([150000, 600000]);
  const [yearRange, setYearRange] = useState<number[]>([2019, 2023]);
  const [mileageRange, setMileageRange] = useState<number[]>([0, 50000]);
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  // Función para aplicar los filtros
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());
    params.set("minYear", yearRange[0].toString());
    params.set("maxYear", yearRange[1].toString());
    params.set("minMileage", mileageRange[0].toString());
    params.set("maxMileage", mileageRange[1].toString());
    
    if (brand) params.set("brand", brand);
    else params.delete("brand");
    
    if (model) params.set("model", model);
    else params.delete("model");
    
    if (searchTerm) params.set("search", searchTerm);
    else params.delete("search");
    
    router.push(`${pathname}?${params.toString()}`);
  };
  
  const resetFilters = () => {
    setPriceRange([150000, 600000]);
    setYearRange([2019, 2023]);
    setMileageRange([0, 50000]);
    setBrand("");
    setModel("");
    setSearchTerm("");
    router.push(pathname);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar vehículos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-primary text-primary-foreground" : ""}
        >
          <FilterIcon className="h-4 w-4" />
        </Button>
        <Button onClick={applyFilters}>Buscar</Button>
      </div>
      
      {showFilters && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Filtrar por</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label>Marca</Label>
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las marcas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas las marcas</SelectItem>
                  <SelectItem value="Toyota">Toyota</SelectItem>
                  <SelectItem value="Nissan">Nissan</SelectItem>
                  <SelectItem value="Honda">Honda</SelectItem>
                  <SelectItem value="Volkswagen">Volkswagen</SelectItem>
                  <SelectItem value="Ford">Ford</SelectItem>
                  <SelectItem value="Chevrolet">Chevrolet</SelectItem>
                  <SelectItem value="Mazda">Mazda</SelectItem>
                  <SelectItem value="Kia">Kia</SelectItem>
                  <SelectItem value="Hyundai">Hyundai</SelectItem>
                  <SelectItem value="BMW">BMW</SelectItem>
                  <SelectItem value="Mercedes">Mercedes</SelectItem>
                  <SelectItem value="Audi">Audi</SelectItem>
                  <SelectItem value="Tesla">Tesla</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label>Modelo</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los modelos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los modelos</SelectItem>
                  <SelectItem value="Corolla">Corolla</SelectItem>
                  <SelectItem value="Civic">Civic</SelectItem>
                  <SelectItem value="Jetta">Jetta</SelectItem>
                  <SelectItem value="Focus">Focus</SelectItem>
                  <SelectItem value="Versa">Versa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label>Precio</Label>
                <span className="text-sm text-muted-foreground">
                  ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                </span>
              </div>
              <Slider
                defaultValue={priceRange}
                min={150000}
                max={1000000}
                step={10000}
                onValueChange={setPriceRange}
              />
            </div>
            
            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label>Año</Label>
                <span className="text-sm text-muted-foreground">
                  {yearRange[0]} - {yearRange[1]}
                </span>
              </div>
              <Slider
                defaultValue={yearRange}
                min={2015}
                max={2023}
                step={1}
                onValueChange={setYearRange}
              />
            </div>
            
            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label>Kilometraje</Label>
                <span className="text-sm text-muted-foreground">
                  {mileageRange[0].toLocaleString()} - {mileageRange[1].toLocaleString()} km
                </span>
              </div>
              <Slider
                defaultValue={mileageRange}
                min={0}
                max={100000}
                step={1000}
                onValueChange={setMileageRange}
              />
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={resetFilters}>Restablecer</Button>
              <Button onClick={applyFilters}>Aplicar filtros</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 