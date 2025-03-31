"use client"

import { Button } from "@/components/ui/button"
//import { useTranslations } from "next-intl"
import Link from "next/link"
//import Image from "next/image"
import { Search, CheckCircle, Shield } from "lucide-react"
//import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
//import { Input } from "@/components/ui/input"
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function HeroSection() {
  //const t = useTranslations("Landing.Hero")
  const params = useParams();
  const locale = params.locale as string;
  //const repoUrl = process.env.NEXT_PUBLIC_REPO_URL;
  //const [isVisible, setIsVisible] = useState(false)

  //useEffect(() => {
    // Trigger animations after component mounts
    //setIsVisible(true)
  //}, [])

  return (
    <section className="relative bg-background overflow-hidden">
      {/* Background pattern/gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-primary/10 rounded-l-[50px] transform translate-x-1/3 pointer-events-none" />
      
      <div className="container relative px-4 py-16 md:py-24 lg:py-32 md:px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Content */}
        <div className="w-full lg:w-1/2 space-y-6 z-10">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Marketplace de autos verificados
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Encuentra tu auto ideal con garantía de confianza
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Miles de vehículos verificados por expertos, con financiamiento a tu medida y garantía mecánica incluida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" asChild className="gap-2 text-base px-8 py-6">
              <Link href={`/${locale}/listings`}>
                <Search className="h-5 w-5" />
                Explorar vehículos
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="gap-2 text-base border-2 px-8 py-6">
              <Link href={`/${locale}/sell`}>
                Vender mi auto
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">+5,000 autos disponibles</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Garantía de 3 meses</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Financiamiento</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Inspección de 240 puntos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Prueba de manejo</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Devolución 7 días</span>
            </div>
          </div>
        </div>
        
        {/* Image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden shadow-2xl">
            {/* Uncomment and add your image when available */}
            {/* <img 
              src="/images/hero-car.jpg" 
              alt="Autos verificados" 
              className="w-full h-full object-cover" 
            /> */}
            
            {/* Placeholder content - replace with actual image */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary/20 to-muted">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute w-3/4 h-1/2 bg-white/10 backdrop-blur-sm rounded-xl transform -rotate-6 border border-white/20" />
                <div className="absolute w-3/4 h-1/2 bg-primary/10 backdrop-blur-sm rounded-xl transform rotate-3 border border-primary/20" />
                <span className="relative text-2xl font-bold text-foreground/70">Mi Carrito</span>
              </div>
            </div>
            
            {/* Trust badges */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-background rounded-lg p-4 shadow-lg border flex items-center gap-6 w-5/6 justify-center">
              <div className="text-center">
                <div className="font-bold text-2xl text-primary">4.8</div>
                <div className="text-xs text-muted-foreground">★★★★★</div>
                <div className="text-xs">1200+ reseñas</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="flex flex-col items-center">
                <div className="text-sm font-medium">Transacciones</div>
                <div className="font-bold text-xl">+10,000</div>
              </div>
              <div className="h-12 w-px bg-border hidden md:block"></div>
              <div className="hidden md:block text-center">
                <div className="text-sm font-medium">Financiamiento</div>
                <div className="font-bold text-lg">Aprobación 24h</div>
              </div>
            </div>
          </div>
          
          {/* Quick search form over the image */}
          <div className="absolute top-6 right-6 z-10 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-[300px] hidden md:block">
            <h3 className="font-medium mb-2">Búsqueda rápida</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <select className="w-full p-2 bg-background border rounded-md text-sm">
                    <option>Marca</option>
                    <option>Toyota</option>
                    <option>Honda</option>
                    <option>Nissan</option>
                  </select>
                </div>
                <div>
                  <select className="w-full p-2 bg-background border rounded-md text-sm">
                    <option>Modelo</option>
                    <option>Corolla</option>
                    <option>Civic</option>
                    <option>Versa</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <select className="w-full p-2 bg-background border rounded-md text-sm">
                    <option>Año desde</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                  </select>
                </div>
                <div>
                  <select className="w-full p-2 bg-background border rounded-md text-sm">
                    <option>Precio hasta</option>
                    <option>$250,000</option>
                    <option>$400,000</option>
                    <option>$600,000</option>
                  </select>
                </div>
              </div>
              <Button size="sm" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

