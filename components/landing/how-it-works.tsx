"use client"

import { Button } from "@/components/ui/button";
import { SearchCheck, CarFront, ShieldCheck, CreditCard, Car, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export function HowItWorks() {
  const params = useParams();
  const locale = params.locale as string;
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  
  const buyingSteps = [
    {
      icon: <SearchCheck className="h-12 w-12 text-primary" />,
      title: "Explora y filtra",
      description: "Navega por miles de vehículos certificados y utiliza nuestros filtros avanzados para encontrar el que más se ajuste a tus necesidades y presupuesto."
    },
    {
      icon: <CarFront className="h-12 w-12 text-primary" />,
      title: "Agenda una prueba",
      description: "Selecciona los vehículos que te interesan y agenda una prueba de manejo en una de nuestras ubicaciones o solicita que llevemos el auto a tu domicilio."
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-primary" />,
      title: "Revisa la certificación",
      description: "Cada vehículo viene con un reporte detallado de la inspección de 240 puntos y su historial completo para que tomes una decisión informada."
    },
    {
      icon: <CreditCard className="h-12 w-12 text-primary" />,
      title: "Financia o paga",
      description: "Elige entre varias opciones de pago: de contado, con financiamiento bancario o a través de nuestros planes flexibles con aprobación en 24 horas."
    },
    {
      icon: <ThumbsUp className="h-12 w-12 text-primary" />,
      title: "Recibe tu auto",
      description: "Completa el papeleo en línea y recibe tu vehículo donde prefieras, con garantía de satisfacción por 7 días o te devolvemos tu dinero."
    }
  ];
  
  const sellingSteps = [
    {
      icon: <Car className="h-12 w-12 text-primary" />,
      title: "Registra tu vehículo",
      description: "Ingresa los datos básicos de tu auto y obtén una valoración preliminar instantánea basada en el mercado actual."
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-primary" />,
      title: "Inspección gratuita",
      description: "Agendamos una inspección profesional sin costo donde evaluamos tu vehículo y definimos el precio final de compra."
    },
    {
      icon: <CreditCard className="h-12 w-12 text-primary" />,
      title: "Recibe una oferta",
      description: "Te presentamos una oferta competitiva y transparente basada en el estado real de tu vehículo y la demanda del mercado."
    },
    {
      icon: <ThumbsUp className="h-12 w-12 text-primary" />,
      title: "Cierra la venta",
      description: "Si aceptas nuestra oferta, nos encargamos de todo el papeleo y te pagamos en menos de 24 horas mediante transferencia bancaria."
    }
  ];

  const activeSteps = activeTab === 'buy' ? buyingSteps : sellingSteps;

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 w-fit gap-2 border border-primary/20">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Proceso simplificado
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Cómo funciona</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Un proceso transparente y sin complicaciones para comprar o vender tu vehículo con total confianza.
          </p>
        </div>
        
        {/* Tabs de compra/venta */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-muted rounded-lg p-1" role="tablist">
            <button 
              className={`px-8 py-2 rounded-md font-medium transition-colors ${activeTab === 'buy' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/70'}`}
              onClick={() => setActiveTab('buy')}
              role="tab"
              id="tab-buy"
              tabIndex={0}
            >
              Comprar
            </button>
            <button 
              className={`px-8 py-2 rounded-md font-medium transition-colors ${activeTab === 'sell' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/70'}`}
              onClick={() => setActiveTab('sell')}
              role="tab"
              id="tab-sell"
              tabIndex={0}
            >
              Vender
            </button>
          </div>
        </div>
        
        {/* Pasos para comprar o vender */}
        <div className="space-y-12" role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
          {/* Barra de progreso */}
          <div className="relative hidden md:block">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2" 
              style={{ width: `${(activeTab === 'buy' ? 2 : 2) / 4 * 100}%` }}
            />
            <div className="relative flex justify-between">
              {activeSteps.map((_, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-center w-10 h-10 rounded-full z-10 
                    ${index <= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                  `}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
          
          {/* Pasos detallados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {activeSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-primary/10 rounded-full blur-lg opacity-70" />
                  <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-primary/10">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
          
          {/* Ventajas */}
          {activeTab === 'buy' && (
            <div className="bg-muted/20 rounded-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">15 min</div>
                <p className="font-medium">Proceso de aplicación online</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">24 h</div>
                <p className="font-medium">Aprobación de financiamiento</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">48 h</div>
                <p className="font-medium">Entrega a domicilio</p>
              </div>
            </div>
          )}
          
          {activeTab === 'sell' && (
            <div className="bg-muted/20 rounded-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">Gratis</div>
                <p className="font-medium">Inspección profesional</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">24 h</div>
                <p className="font-medium">Pago garantizado</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">0</div>
                <p className="font-medium">Trámites para ti</p>
              </div>
            </div>
          )}
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <Button size="lg" asChild className="px-8">
            <Link href={`/${locale}/${activeTab === 'buy' ? 'listings' : 'sell'}`}>
              {activeTab === 'buy' ? 'Explora vehículos disponibles' : 'Vende tu auto ahora'}
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            {activeTab === 'buy' 
              ? 'Sin compromiso. 7 días de garantía de devolución.' 
              : 'Sin costo de inspección. La mejor oferta garantizada.'}
          </p>
        </div>
      </div>
    </section>
  );
} 