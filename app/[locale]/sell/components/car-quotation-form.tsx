"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Mock data for vehicle brands and models
const carBrands = [
  { id: 'toyota', name: 'Toyota' },
  { id: 'honda', name: 'Honda' },
  { id: 'nissan', name: 'Nissan' },
  { id: 'ford', name: 'Ford' },
  { id: 'chevrolet', name: 'Chevrolet' },
  { id: 'volkswagen', name: 'Volkswagen' },
  { id: 'mazda', name: 'Mazda' },
  { id: 'mercedes', name: 'Mercedes-Benz' },
  { id: 'bmw', name: 'BMW' },
  { id: 'audi', name: 'Audi' },
];

const carModels: Record<string, Array<{ id: string; name: string }>> = {
  toyota: [
    { id: 'corolla', name: 'Corolla' },
    { id: 'camry', name: 'Camry' },
    { id: 'rav4', name: 'RAV4' },
    { id: 'highlander', name: 'Highlander' },
  ],
  honda: [
    { id: 'civic', name: 'Civic' },
    { id: 'accord', name: 'Accord' },
    { id: 'crv', name: 'CR-V' },
    { id: 'pilot', name: 'Pilot' },
  ],
  nissan: [
    { id: 'sentra', name: 'Sentra' },
    { id: 'altima', name: 'Altima' },
    { id: 'rogue', name: 'Rogue' },
    { id: 'pathfinder', name: 'Pathfinder' },
  ],
  ford: [
    { id: 'focus', name: 'Focus' },
    { id: 'fusion', name: 'Fusion' },
    { id: 'escape', name: 'Escape' },
    { id: 'explorer', name: 'Explorer' },
  ],
  chevrolet: [
    { id: 'cruze', name: 'Cruze' },
    { id: 'malibu', name: 'Malibu' },
    { id: 'equinox', name: 'Equinox' },
    { id: 'tahoe', name: 'Tahoe' },
  ],
  volkswagen: [
    { id: 'jetta', name: 'Jetta' },
    { id: 'passat', name: 'Passat' },
    { id: 'tiguan', name: 'Tiguan' },
    { id: 'atlas', name: 'Atlas' },
  ],
  mazda: [
    { id: 'mazda3', name: 'Mazda3' },
    { id: 'mazda6', name: 'Mazda6' },
    { id: 'cx5', name: 'CX-5' },
    { id: 'cx9', name: 'CX-9' },
  ],
  mercedes: [
    { id: 'aclass', name: 'A-Class' },
    { id: 'cclass', name: 'C-Class' },
    { id: 'eclass', name: 'E-Class' },
    { id: 'glc', name: 'GLC' },
  ],
  bmw: [
    { id: 'series1', name: 'Series 1' },
    { id: 'series3', name: 'Series 3' },
    { id: 'series5', name: 'Series 5' },
    { id: 'x3', name: 'X3' },
  ],
  audi: [
    { id: 'a3', name: 'A3' },
    { id: 'a4', name: 'A4' },
    { id: 'a6', name: 'A6' },
    { id: 'q5', name: 'Q5' },
  ],
};

// Generate years from 2010 to current year
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2009 }, (_, i) => (2010 + i).toString());

// Define form schema
const formSchema = z.object({
  brand: z.string({
    required_error: "Por favor selecciona una marca",
  }),
  model: z.string({
    required_error: "Por favor selecciona un modelo",
  }),
  year: z.string({
    required_error: "Por favor selecciona un año",
  }),
  mileage: z.string().refine(
    (val) => !isNaN(parseInt(val)) && parseInt(val) >= 0 && parseInt(val) <= 300000,
    { message: "El kilometraje debe ser un número entre 0 y 300,000" }
  ),
  email: z.string().email({ message: "Email inválido" }).optional(),
  phone: z.string().min(10, { message: "El teléfono debe tener al menos 10 dígitos" }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function CarQuotationForm({ requireAuth = false }: { requireAuth?: boolean }) {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quotationResult, setQuotationResult] = useState<{ min: number; max: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: '',
      model: '',
      year: '',
      mileage: '',
      email: '',
      phone: '',
    },
  });

  // Handle brand change to update model options
  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    form.setValue('model', ''); // Reset model when brand changes
  };

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log form values (removing this would cause linter error for unused parameter)
      console.log('Form submitted with values:', values);
      
      // Create a random price range for demonstration
      const basePrice = Math.floor(Math.random() * 500000) + 100000;
      const minPrice = Math.floor(basePrice * 0.9);
      const maxPrice = Math.floor(basePrice * 1.1);
      
      setQuotationResult({ min: minPrice, max: maxPrice });
      
      // If authentication is required, redirect to sign-in
      if (requireAuth) {
        router.push('/auth/sign-in');
      }
    } catch (error) {
      setErrorMessage('Ha ocurrido un error al procesar tu solicitud. Por favor intenta nuevamente.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cotiza tu vehículo</CardTitle>
        <CardDescription>
          Ingresa los datos de tu auto para recibir una cotización aproximada
        </CardDescription>
      </CardHeader>
      <CardContent>
        {errorMessage && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {quotationResult ? (
          <div className="text-center py-6">
            <h3 className="text-2xl font-bold mb-2">Tu auto tiene un valor estimado de:</h3>
            <div className="text-3xl font-bold text-primary mb-4">
              ${quotationResult.min.toLocaleString()} - ${quotationResult.max.toLocaleString()}
            </div>
            <p className="text-muted-foreground mb-6">
              Esta es una cotización aproximada basada en los datos proporcionados. 
              Para una valoración precisa, necesitamos realizar una inspección.
            </p>
            <div className="space-y-3">
              <Button 
                className="w-full" 
                onClick={() => requireAuth ? router.push('/auth/sign-in') : setQuotationResult(null)}
              >
                {requireAuth ? 'Iniciar sesión para continuar' : 'Obtener otra cotización'}
              </Button>
              {!requireAuth && (
                <Button variant="outline" className="w-full" onClick={() => router.push('/auth/sign-in')}>
                  Iniciar sesión para continuar
                </Button>
              )}
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marca</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleBrandChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una marca" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {carBrands.map((brand) => (
                            <SelectItem key={brand.id} value={brand.id}>
                              {brand.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modelo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!selectedBrand}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un modelo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedBrand && carModels[selectedBrand]?.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Año</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un año" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mileage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kilometraje</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ej. 45000"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Ingresa el kilometraje actual en kilómetros
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Para recibir tu cotización por correo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Ej. 5512345678"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Para contactarte sobre tu cotización
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Calculando...' : 'Obtener cotización'}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
} 