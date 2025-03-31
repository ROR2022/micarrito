"use client"

import { Shield, Clock, DollarSign, CheckSquare, Award, Settings } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Garantía Certificada",
      description: "Todos nuestros vehículos pasan por una rigurosa inspección de 240 puntos y cuentan con garantía mecánica de hasta 3 meses."
    },
    {
      icon: <CheckSquare className="h-10 w-10 text-primary" />,
      title: "Proceso Simplificado",
      description: "Compra tu auto en menos de 48 horas, con papeles en regla y trámites incluidos, sin complicaciones ni sorpresas."
    },
    {
      icon: <DollarSign className="h-10 w-10 text-primary" />,
      title: "Financiamiento Flexible",
      description: "Múltiples opciones de financiamiento con aprobación rápida, meses sin intereses y planes personalizados a tu medida."
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Prueba de Manejo",
      description: "Agenda una cita en cualquiera de nuestras sucursales o solicita que llevemos el auto a tu domicilio para probarlo."
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Transparencia Total",
      description: "Conoce el historial completo del vehículo, reportes de accidentes y servicios previos antes de comprarlo."
    },
    {
      icon: <Settings className="h-10 w-10 text-primary" />,
      title: "Servicio Post-Venta",
      description: "Nuestro servicio no termina con la compra. Contamos con asistencia técnica y mantenimiento preferencial para clientes."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 w-fit gap-2 border border-primary/20">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Por qué elegirnos
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Experiencia superior en compra de autos</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl">
            Nos diferenciamos por ofrecer el mejor servicio, garantía y transparencia en cada paso del proceso de compra.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-start space-y-4 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow bg-background"
            >
              <div className="p-3 rounded-full bg-primary/10">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="container px-4 md:px-6 mt-20">
        <div className="relative overflow-hidden rounded-lg border shadow-md bg-background p-6 md:p-10">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 bg-primary/10 rounded-full blur-3xl opacity-70" />
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Certificación de Excelencia</h3>
              <p className="mb-6 text-muted-foreground">
                Nuestro riguroso proceso de inspección garantiza que solo los mejores vehículos lleguen a ti. Revisamos cada detalle del motor, carrocería, interiores y sistemas electrónicos.
              </p>
              
              <ul className="space-y-3">
                {[
                  "240 puntos de inspección", 
                  "Historial vehicular verificado", 
                  "Kilometraje certificado", 
                  "Sin reporte de robo"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-video md:aspect-square bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="h-24 w-24 text-primary/20" />
              </div>
              {/* Aquí podrías colocar una imagen real del proceso de certificación */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 