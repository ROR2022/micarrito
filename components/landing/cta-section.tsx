"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Car, Sparkles } from "lucide-react";

export function CtaSection() {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Fondos decorativos */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" aria-hidden="true" />
      
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 w-fit gap-2 border border-primary/20">
            <Sparkles className="h-4 w-4" />
            Oportunidad única
          </div>
          
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            El auto de tus sueños está a solo un clic de distancia
          </h2>
          
          <p className="mt-4 text-muted-foreground md:text-xl max-w-2xl">
            Miles de vehículos verificados te esperan. Compra o vende con total seguridad, financiamiento inmediato y garantía incluida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" className="gap-2 px-8" asChild>
              <Link href={`/${locale}/listings`}>
                <Car className="h-5 w-5" />
                Explorar vehículos
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 px-8" asChild>
              <Link href={`/${locale}/sell`}>
                Vender mi auto
              </Link>
            </Button>
          </div>
          
          {/* Beneficios destacados */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full">
            <div className="bg-background/40 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
              <div className="font-bold text-2xl text-primary">7 días</div>
              <div className="text-sm text-muted-foreground">Garantía de devolución</div>
            </div>
            <div className="bg-background/40 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
              <div className="font-bold text-2xl text-primary">+5,000</div>
              <div className="text-sm text-muted-foreground">Autos disponibles</div>
            </div>
            <div className="bg-background/40 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
              <div className="font-bold text-2xl text-primary">24h</div>
              <div className="text-sm text-muted-foreground">Financiamiento aprobado</div>
            </div>
            <div className="bg-background/40 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
              <div className="font-bold text-2xl text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Clientes satisfechos</div>
            </div>
          </div>
          
          {/* Banner de descuento */}
          <div className="mt-16 w-full max-w-2xl bg-primary/10 border border-primary/20 rounded-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full transform translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">¿Primera vez en Mi Carrito?</h3>
              <p className="text-muted-foreground mb-4">
                Obtén un descuento de $5,000 MXN en tu primera compra utilizando el código <span className="font-bold text-primary">BIENVENIDO</span>
              </p>
              <Button size="sm" variant="default" asChild>
                <Link href={`/${locale}/signup`}>
                  Registrarme ahora
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 