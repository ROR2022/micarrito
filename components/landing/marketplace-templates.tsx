"use client"

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Car, Truck, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useRef } from "react";

export function MarketplaceTemplates() {
  const params = useParams();
  const locale = params.locale as string;
  const [activeCategory, setActiveCategory] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const carCategories = [
    {
      id: "sedan",
      icon: <Car className="h-5 w-5" />,
      title: "Sedán",
      description: "Autos de 4 puertas con cajuela independiente, ideales para uso familiar y urbano.",
      count: 1248,
      priceRange: "$180,000 - $650,000",
      image: "/images/sedan.jpg",
      features: ["Eficiente en combustible", "Fácil manejo", "Ideal para ciudad"]
    },
    {
      id: "suv",
      icon: <Truck className="h-5 w-5" />,
      title: "SUV",
      description: "Vehículos deportivos utilitarios, perfectos para terrenos variados y mayor capacidad.",
      count: 976,
      priceRange: "$250,000 - $950,000",
      image: "/images/suv.jpg",
      features: ["Mayor altura", "Espacio interior amplio", "Capacidad todo terreno"]
    },
    {
      id: "hatchback",
      icon: <Car className="h-5 w-5" />,
      title: "Hatchback",
      description: "Compactos y versátiles, con portón trasero y gran eficiencia en combustible.",
      count: 843,
      priceRange: "$160,000 - $450,000",
      image: "/images/hatchback.jpg",
      features: ["Compacto", "Fácil estacionamiento", "Gran ahorro de combustible"]
    },
    {
      id: "pickup",
      icon: <Truck className="h-5 w-5" />,
      title: "Pickup",
      description: "Vehículos utilitarios con área de carga abierta, ideales para trabajo y aventura.",
      count: 625,
      priceRange: "$280,000 - $850,000",
      image: "/images/pickup.jpg",
      features: ["Alta capacidad de carga", "Potencia y torque", "Versatilidad"]
    },
    {
      id: "minivan",
      icon: <Car className="h-5 w-5" />,
      title: "Minivan",
      description: "Amplios vehículos familiares con gran capacidad de pasajeros y comodidades.",
      count: 317,
      priceRange: "$320,000 - $750,000",
      image: "/images/minivan.jpg",
      features: ["Espacio para 7+ pasajeros", "Puertas deslizantes", "Confort familiar"]
    }
  ];

  const scrollNext = () => {
    if (activeCategory < carCategories.length - 1) {
      setActiveCategory(activeCategory + 1);
      scrollToCategory(activeCategory + 1);
    }
  };

  const scrollPrev = () => {
    if (activeCategory > 0) {
      setActiveCategory(activeCategory - 1);
      scrollToCategory(activeCategory - 1);
    }
  };

  const scrollToCategory = (index: number) => {
    const container = containerRef.current;
    if (container) {
      const categoryElements = container.querySelectorAll('.category-card');
      if (categoryElements[index]) {
        categoryElements[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };
  
  const handleCategorySelect = (index: number) => {
    setActiveCategory(index);
    scrollToCategory(index);
  };

  return (
    <section className="py-16 md:py-20 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 w-fit gap-2 border border-primary/20">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Categorías
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Encuentra por Categoría</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Explora nuestra amplia selección de vehículos por tipo y encuentra el que mejor se adapte a tus necesidades.
          </p>
        </div>
        
        {/* Carrusel de Categorías */}
        <div className="relative mt-12">
          <div className="overflow-hidden">
            <div 
              ref={containerRef}
              className="flex space-x-4 py-4 overflow-x-auto no-scrollbar snap-x snap-mandatory"
              style={{ scrollBehavior: 'smooth' }}
              role="tablist"
              aria-label="Categorías de vehículos"
            >
              {carCategories.map((category, index) => (
                <button 
                  key={category.id} 
                  className={`category-card flex-none w-60 sm:w-72 snap-center rounded-xl overflow-hidden border shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${activeCategory === index ? 'ring-2 ring-primary' : 'opacity-80 hover:opacity-100'}`}
                  onClick={() => handleCategorySelect(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCategorySelect(index);
                    }
                  }}
                  role="tab"
                  aria-selected={activeCategory === index}
                  aria-controls={`panel-${category.id}`}
                  id={`tab-${category.id}`}
                  tabIndex={activeCategory === index ? 0 : -1}
                >
                  <div className="aspect-[4/3] bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {category.icon && (
                        React.cloneElement(category.icon, { 
                          className: "h-12 w-12 text-primary/40" 
                        })
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">{category.title}</h3>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {category.count}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Botones de navegación */}
          <button 
            onClick={scrollPrev}
            disabled={activeCategory === 0}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-background rounded-full p-2 shadow-md border disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Anterior categoría"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={scrollNext}
            disabled={activeCategory === carCategories.length - 1}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-background rounded-full p-2 shadow-md border disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Siguiente categoría"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        {/* Detalle de la categoría seleccionada */}
        {carCategories.map((category, index) => (
          <div 
            key={category.id}
            id={`panel-${category.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${category.id}`}
            className={`mt-8 bg-background rounded-xl overflow-hidden border shadow-md ${activeCategory === index ? 'block' : 'hidden'}`}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  {category.icon}
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Disponibles</h4>
                    <p className="text-xl font-bold">{category.count} vehículos</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Rango de precios</h4>
                    <p className="text-xl font-bold">{category.priceRange}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2 text-sm text-muted-foreground">Características:</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {category.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button asChild className="w-full sm:w-auto">
                  <Link href={`/${locale}/listings?category=${category.id}`}>
                    Ver {category.title}s disponibles
                  </Link>
                </Button>
              </div>
              
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-background/20 via-transparent to-primary/20 z-10" />
                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground relative">
                  {/* Si tienes las imágenes, descomenta esto: */}
                  {/* 
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  */}
                  
                  {/* Elimina este div cuando tengas imágenes reales */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Car className="h-20 w-20 text-muted-foreground/20" />
                    <p className="absolute mt-24 text-muted-foreground">{category.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="mt-8 text-center">
          <Button variant="outline" asChild className="border-2">
            <Link href={`/${locale}/listings`}>
              Ver todas las categorías
            </Link>
          </Button>
        </div>
      </div>
      
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </section>
  );
} 