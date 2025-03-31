"use client";

import React from 'react';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Calculator, CreditCard, FileText, ShieldCheck, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function FinancingPage() {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "¡Notificación de prueba!",
      description: "Este es un ejemplo de cómo funcionan las notificaciones en la aplicación.",
      duration: 5000,
    });
  };

  return (
    <div className="py-10">
      <Container>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Financiamiento Vehicular</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Opciones flexibles para financiar tu próximo vehículo con pagos accesibles y tasas competitivas
          </p>
          <Button variant="outline" onClick={showToast} className="mt-4">
            Probar Notificación
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                <CardTitle>Calculadora de Financiamiento</CardTitle>
              </div>
              <CardDescription>
                Calcula tu cuota mensual y simula diferentes plazos de financiamiento
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">
                Nuestra calculadora te permite personalizar el plazo, tasa y monto de enganche para encontrar el plan perfecto para tu presupuesto.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/financing/calculator" className="w-full">
                <Button className="w-full">Usar Calculadora</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <CardTitle>Planes de Financiamiento</CardTitle>
              </div>
              <CardDescription>
                Conoce nuestros planes especiales y promociones
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">
                Ofrecemos distintos planes según tus necesidades: financiamiento tradicional, leasing, renting, y más opciones para autos nuevos y seminuevos.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/financing/plans" className="w-full">
                <Button variant="outline" className="w-full">Ver Planes</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Requisitos y Documentación</CardTitle>
              </div>
              <CardDescription>
                Información sobre el proceso de solicitud
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">
                Consulta los documentos necesarios y requisitos para aplicar a un financiamiento. Preparamos una lista detallada para facilitar tu proceso.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/financing/requirements" className="w-full">
                <Button variant="outline" className="w-full">Ver Requisitos</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <CardTitle>Seguros de Auto</CardTitle>
              </div>
              <CardDescription>
                Protege tu inversión con seguros especializados
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">
                Complementa tu financiamiento con seguros que protegen tu vehículo y te dan tranquilidad. Ofrecemos distintas coberturas según tus necesidades.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/financing/insurance" className="w-full">
                <Button variant="outline" className="w-full">Ver Opciones</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                <CardTitle>Preguntas Frecuentes</CardTitle>
              </div>
              <CardDescription>
                Resolvemos tus dudas sobre financiamiento
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">
                Encuentra respuestas a las preguntas más comunes sobre el proceso de financiamiento, aprobaciones, plazos y más.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/financing/faq" className="w-full">
                <Button variant="outline" className="w-full">Ver FAQ</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <CardTitle>Pre-aprobación en línea</CardTitle>
              </div>
              <CardDescription>
                Obtén una pre-aprobación rápida sin compromiso
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">
                Completa un formulario simple y recibe una respuesta preliminar sobre tu capacidad de financiamiento en minutos.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/financing/pre-approval" className="w-full">
                <Button className="w-full">Solicitar Pre-aprobación</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </Container>
    </div>
  );
} 