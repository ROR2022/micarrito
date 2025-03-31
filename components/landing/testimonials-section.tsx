"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star, ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";

// Definición de tipos para los testimonios
interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  initials: string;
  rating: number;
  purchaseDate: string;
  verified: boolean;
  quote: string;
}

// Datos de testimonios de ejemplo
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María García",
    role: "Compró un Honda Civic 2020",
    image: "/images/testimonials/maria.jpg",
    initials: "MG",
    rating: 5,
    purchaseDate: "Enero 2023",
    verified: true,
    quote: "El proceso fue increíblemente sencillo. En menos de una semana ya tenía mi auto nuevo en casa, con todos los trámites listos y la garantía en orden. Definitivamente recomendaría Mi Carrito a cualquiera."
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Vendió un Toyota Corolla 2019",
    image: "/images/testimonials/carlos.jpg",
    initials: "CR",
    rating: 5,
    purchaseDate: "Marzo 2023",
    verified: true,
    quote: "Nunca pensé que vender mi auto sería tan fácil. Recibí una oferta justa, el pago fue rápido y no tuve que ocuparme de ningún trámite. El equipo fue profesional desde el primer contacto."
  },
  {
    id: 3,
    name: "Alejandra Torres",
    role: "Compró un Mazda CX-5 2021",
    image: "/images/testimonials/alejandra.jpg",
    initials: "AT",
    rating: 4,
    purchaseDate: "Mayo 2023",
    verified: true,
    quote: "La financiación que me ofrecieron superó mis expectativas. Tasa competitiva y aprobación rápida. El SUV que compré estaba en perfectas condiciones y el asesor que me atendió fue muy paciente explicándome todas las características."
  },
  {
    id: 4,
    name: "Roberto Méndez",
    role: "Compró un Volkswagen Jetta 2022",
    image: "/images/testimonials/roberto.jpg",
    initials: "RM",
    rating: 5,
    purchaseDate: "Abril 2023",
    verified: true,
    quote: "La prueba de manejo a domicilio hizo toda la diferencia. El auto que elegí estaba impecable y el proceso de financiamiento fue rápido y sin complicaciones. Tres meses después, sigo muy contento con mi compra."
  },
  {
    id: 5,
    name: "Laura Sánchez",
    role: "Vendió un Nissan Sentra 2018",
    image: "/images/testimonials/laura.jpg",
    initials: "LS",
    rating: 5,
    purchaseDate: "Febrero 2023",
    verified: true,
    quote: "Recibí una oferta justa por mi auto y el proceso fue rápido. Me pagaron en 24 horas tal como prometieron y se encargaron de todos los trámites. Una experiencia excepcional de principio a fin."
  }
];

const TempLogoCompany = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
      />
    </svg>
  );
};

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  
  const nextTestimonial = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, []);


  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [activeIndex, nextTestimonial]);

  if (!isMounted) {
    return null;
  }

  

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Renderiza estrellas basado en la calificación
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  // Company logos - replace with actual logos in production
  const companyLogos = [
    { name: "Company 1", logo: <TempLogoCompany /> },
    { name: "Company 2", logo: <TempLogoCompany /> },
    { name: "Company 3", logo: <TempLogoCompany /> },
    { name: "Company 4", logo: <TempLogoCompany /> },
    { name: "Company 5", logo: <TempLogoCompany /> },
    { name: "Company 6", logo: <TempLogoCompany /> },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-muted/20 pointer-events-none" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 w-fit gap-2 border border-primary/20">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Opiniones verificadas
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Lo que nuestros clientes dicen</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Miles de clientes satisfechos confían en nosotros para comprar y vender sus vehículos.
          </p>
        </div>
        
        {/* Badge de confianza */}
        <div className="flex justify-center mb-12">
          <div className="bg-background rounded-full py-2 px-4 shadow-sm border flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Más de 10,000 transacciones exitosas</span>
          </div>
        </div>
        
        {/* Testimonios */}
        <div 
          className="relative mt-12 max-w-4xl mx-auto"
          ref={testimonialsRef}
        >
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-none bg-background p-6 sm:p-8 md:p-10 rounded-xl border"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{testimonial.name}</h3>
                          {testimonial.verified && (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <div className="flex mt-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 relative">
                      <Quote className="h-8 w-8 text-primary/10 absolute -top-1 -left-1" />
                      <blockquote className="text-lg md:text-xl relative z-10 pl-4">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t text-sm text-muted-foreground">
                      <p>Transacción verificada · {testimonial.purchaseDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Controles */}
          <div className="flex justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeIndex ? 'bg-primary' : 'bg-primary/30'
                  }`}
                  aria-label={`Ver testimonio ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="h-10 w-10 rounded-full"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="h-10 w-10 rounded-full"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Estadísticas de clientes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary">98%</div>
            <div className="text-sm text-muted-foreground mt-2">Clientes satisfechos</div>
          </div>
          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary">4.8/5</div>
            <div className="text-sm text-muted-foreground mt-2">Calificación promedio</div>
          </div>
          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary">+10k</div>
            <div className="text-sm text-muted-foreground mt-2">Vehículos vendidos</div>
          </div>
          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary">7 días</div>
            <div className="text-sm text-muted-foreground mt-2">Garantía de devolución</div>
          </div>
        </div>

        {/* Empresas que confían en nosotros */}
        <div className="hidden mt-20 pt-10 border-t border-border/30">
          <h3 className="text-center text-lg font-medium mb-8 text-muted-foreground">
            Empresas que confían en nosotros
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {companyLogos.map((company, i) => (
              <div key={i} className="flex justify-center">
                <div className="relative h-12 w-full opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 flex items-center justify-center group">
                  <TempLogoCompany />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-md transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
