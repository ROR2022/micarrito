import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, DollarSign, Calendar } from 'lucide-react';
import Image from 'next/image';
import { CarQuotationForm } from './components/car-quotation-form';

export default function SellPage() {
  return (
    <div className="py-10">
      <Container>
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">Vende tu auto de forma rápida y segura</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Obtén una cotización instantánea y vende tu auto sin complicaciones en pocos pasos. Proceso transparente y pago garantizado.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="#quotation-form">
                  Cotizar mi auto <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-it-works">
                  Cómo funciona
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
              <Image 
                src="/images/newProduct.png" 
                alt="Vende tu auto"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">¿Por qué vender con nosotros?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Proceso Seguro</CardTitle>
                <CardDescription>
                  Garantizamos un proceso seguro y transparente, sin intermediarios ni riesgos.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <DollarSign className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Mejor Precio</CardTitle>
                <CardDescription>
                  Utilizamos algoritmos avanzados para ofrecerte el mejor precio por tu vehículo.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Calendar className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Rápido y Eficiente</CardTitle>
                <CardDescription>
                  Completamos todo el proceso en pocos días, sin trámites complicados.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* How it Works Section */}
        <div id="how-it-works" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">¿Cómo funciona?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">1</div>
                <CardTitle>Cotiza tu auto</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Ingresa los datos de tu vehículo y recibe una cotización inicial al instante.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">2</div>
                <CardTitle>Agenda una inspección</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Si te interesa la oferta, agenda una inspección física de tu vehículo.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">3</div>
                <CardTitle>Recibe la oferta final</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Después de la inspección, recibirás una oferta final basada en el estado real del vehículo.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">4</div>
                <CardTitle>Recibe tu pago</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Una vez aceptada la oferta, nos encargamos de los trámites y recibes tu pago de forma segura.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quotation Form */}
        <div id="quotation-form" className="mb-16">
          <CarQuotationForm />
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Preguntas frecuentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué autos compramos?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Compramos vehículos a partir del año 2010, con menos de 110,000 km y en buen estado general.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cómo se determina el precio?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Utilizamos un algoritmo que analiza el mercado, condición, kilometraje y características específicas de tu auto.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué documentos necesito?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Necesitarás la factura original, tarjeta de circulación, verificaciones y tenencias pagadas.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Cuánto tarda el proceso?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Todo el proceso puede completarse en tan solo 24-48 horas, dependiendo de la disponibilidad para la inspección.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-muted p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">¿Listo para vender tu auto?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Cotiza tu auto ahora y recibe una oferta en minutos. Sin compromisos y completamente gratis.
          </p>
          <Button size="lg" asChild>
            <Link href="#quotation-form">
              Cotizar mi auto
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
} 