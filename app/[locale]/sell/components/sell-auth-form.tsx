"use client";

import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { AlertCircle, Check, Upload } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';

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
  // ... otros modelos
};

// Generate years from 2010 to current year
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2009 }, (_, i) => (2010 + i).toString());

// Schemas de validación para cada paso
const infoSchema = z.object({
  brand: z.string({
    required_error: "La marca es obligatoria",
  }),
  model: z.string({
    required_error: "El modelo es obligatorio",
  }),
  year: z.string({
    required_error: "El año es obligatorio",
  }),
  mileage: z.string().refine(
    (val) => !isNaN(parseInt(val)) && parseInt(val) >= 0 && parseInt(val) <= 300000,
    { message: "El kilometraje debe ser un número entre 0 y 300,000" }
  ),
  price: z.string().refine(
    (val) => !isNaN(parseInt(val)) && parseInt(val) > 0,
    { message: "El precio debe ser un número mayor a 0" }
  ),
  condition: z.enum(['new', 'excellent', 'good', 'fair']),
  transmission: z.enum(['automatic', 'manual']),
  color: z.string().min(1, {
    message: "El color es obligatorio",
  }),
  fuelType: z.enum(['gasoline', 'diesel', 'electric', 'hybrid']),
  description: z.string().min(50, {
    message: "La descripción debe tener al menos 50 caracteres",
  }).max(500, {
    message: "La descripción no debe exceder 500 caracteres",
  }),
  negotiable: z.boolean(),
});

const photosSchema = z.object({
  mainPhoto: z.string().optional(),
  additionalPhotos: z.array(z.string()).optional(),
});

const contactFormSchema = z.object({
  phone: z.string().min(10, {
    message: "El teléfono debe tener al menos 10 dígitos",
  }),
  location: z.string().min(1, {
    message: "La ubicación es obligatoria",
  }),
  preferredContactMethod: z.enum(['phone', 'email', 'both']),
  availableTimes: z.string().min(1, {
    message: "Indique su disponibilidad",
  }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Debe aceptar los términos y condiciones"
  }),
});

type InfoFormValues = z.infer<typeof infoSchema>;
type PhotosFormValues = z.infer<typeof photosSchema>;
type ContactFormSchema = z.infer<typeof contactFormSchema>;

export function SellAuthForm({ 
  step
}: { 
  step: 'info' | 'photos' | 'contact';
}) {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const router = useRouter();

  // Form para la información básica del vehículo
  const infoForm = useForm<InfoFormValues>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      brand: '',
      model: '',
      year: '',
      mileage: '',
      price: '',
      condition: 'good',
      transmission: 'automatic',
      color: '',
      fuelType: 'gasoline',
      description: '',
      negotiable: true,
    },
  });

  // Form para las fotos
  const photosForm = useForm<PhotosFormValues>({
    resolver: zodResolver(photosSchema),
    defaultValues: {
      mainPhoto: '',
      additionalPhotos: [],
    }
  });

  // Form para la información de contacto
  const contactForm = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      phone: '',
      location: '',
      preferredContactMethod: 'both',
      availableTimes: '',
      acceptTerms: false,
    }
  });

  // Handle brand change to update model options
  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    infoForm.setValue('model', ''); // Reset model when brand changes
  };

  // Handle info form submission
  const onInfoSubmit = async (data: InfoFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Vehicle info submitted:', data);
      setSuccessMessage('Información del vehículo guardada correctamente');
      
      // Cambiar a la pestaña de fotos
      document.querySelector('[data-value="photos"]')?.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
    } catch (error) {
      setErrorMessage('Error al guardar la información. Por favor intente nuevamente.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle photos form submission
  const onPhotosSubmit = async (data: PhotosFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Vehicle photos submitted:', data);
      setSuccessMessage('Fotos del vehículo guardadas correctamente');
      
      // Cambiar a la pestaña de contacto
      document.querySelector('[data-value="contact"]')?.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
    } catch (error) {
      setErrorMessage('Error al guardar las fotos. Por favor intente nuevamente.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle contact form submission
  const onContactSubmit = async (data: ContactFormSchema) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Contact info submitted:', data);
      setSuccessMessage('¡Su vehículo ha sido publicado correctamente!');
      
      // Redirigir al dashboard después de 2 segundos
      setTimeout(() => {
        router.push('/dashboard/listings');
      }, 2000);
    } catch (error) {
      setErrorMessage('Error al publicar el vehículo. Por favor intente nuevamente.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulación de carga de fotos
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simular carga de archivo
      const reader = new FileReader();
      reader.onload = () => {
        if (field === 'mainPhoto') {
          photosForm.setValue('mainPhoto', reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Renderizar el formulario según el paso
  const renderForm = () => {
    switch (step) {
      case 'info':
        return (
          <Form {...infoForm}>
            <form onSubmit={infoForm.handleSubmit(onInfoSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={infoForm.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marca *</FormLabel>
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
                  control={infoForm.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modelo *</FormLabel>
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
                  control={infoForm.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Año *</FormLabel>
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
                  control={infoForm.control}
                  name="mileage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kilometraje *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ej. 45000"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Kilometraje actual en KM
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={infoForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ej. 250000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={infoForm.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej. Rojo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={infoForm.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condición *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona la condición" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="new">Nuevo</SelectItem>
                          <SelectItem value="excellent">Excelente</SelectItem>
                          <SelectItem value="good">Bueno</SelectItem>
                          <SelectItem value="fair">Regular</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={infoForm.control}
                  name="transmission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transmisión *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo de transmisión" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="automatic">Automática</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={infoForm.control}
                name="fuelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de combustible *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo de combustible" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="gasoline">Gasolina</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="electric">Eléctrico</SelectItem>
                        <SelectItem value="hybrid">Híbrido</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={infoForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe tu vehículo. Incluye características especiales, historia del vehículo, razón de venta, etc."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Mínimo 50 caracteres, máximo 500
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={infoForm.control}
                name="negotiable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Precio negociable</FormLabel>
                      <FormDescription>
                        Permite que los compradores potenciales negocien el precio
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : 'Guardar y continuar'}
              </Button>
            </form>
          </Form>
        );

      case 'photos':
        return (
          <Form {...photosForm}>
            <form onSubmit={photosForm.handleSubmit(onPhotosSubmit)} className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Foto principal</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Esta será la imagen destacada de tu anuncio
                    </p>
                    
                    <div className="flex items-center justify-center w-full">
                      <label 
                        htmlFor="main-photo-upload"
                        className={cn(
                          "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer",
                          "hover:bg-muted/50 transition-colors",
                          photosForm.watch('mainPhoto') ? "border-primary" : "border-border"
                        )}
                      >
                        {photosForm.watch('mainPhoto') ? (
                          <Image
                            src={photosForm.watch('mainPhoto') || ''} 
                            alt="Vista previa" 
                            className="h-full w-full object-contain"
                            width={500}
                            height={300}
                            unoptimized={true}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                            </p>
                            <p className="text-xs text-muted-foreground">
                              SVG, PNG, JPG o GIF (MAX. 2MB)
                            </p>
                          </div>
                        )}
                        <input
                          id="main-photo-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'mainPhoto')}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Fotos adicionales</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Añade hasta 8 fotos adicionales de tu vehículo (interior, exterior, detalles)
                    </p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {[...Array(8)].map((_, index) => (
                        <div key={index} className="relative aspect-square">
                          <label 
                            htmlFor={`photo-upload-${index}`}
                            className={cn(
                              "flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer",
                              "hover:bg-muted/50 transition-colors",
                              "border-border"
                            )}
                          >
                            <div className="flex flex-col items-center justify-center">
                              <Upload className="w-6 h-6 mb-2 text-muted-foreground" />
                              <p className="text-xs text-muted-foreground">
                                Foto {index + 1}
                              </p>
                            </div>
                            <input
                              id={`photo-upload-${index}`}
                              type="file"
                              className="hidden"
                              accept="image/*"
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : 'Guardar y continuar'}
              </Button>
            </form>
          </Form>
        );

      case 'contact':
        return (
          <Form {...contactForm}>
            <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={contactForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono de contacto *</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Ej. 5512345678"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Para que los interesados puedan contactarte
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={contactForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ubicación *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej. Ciudad de México"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Lugar donde se encuentra el vehículo
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={contactForm.control}
                  name="preferredContactMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Método de contacto preferido *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="phone" />
                            <Label htmlFor="phone">Teléfono</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="email" />
                            <Label htmlFor="email">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="both" id="both" />
                            <Label htmlFor="both">Ambos</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={contactForm.control}
                  name="availableTimes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Disponibilidad para mostrar el vehículo *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ej. Lunes a viernes de 9am a 6pm, fines de semana todo el día"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={contactForm.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <div className="mt-1">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Acepto los términos y condiciones *
                      </FormLabel>
                      <FormDescription>
                        Al publicar este anuncio, confirmo que la información proporcionada es verdadera 
                        y acepto los términos de servicio y política de privacidad.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Publicando...' : 'Publicar vehículo'}
              </Button>
            </form>
          </Form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert variant="default" className="bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-700">Éxito</AlertTitle>
          <AlertDescription className="text-green-600">{successMessage}</AlertDescription>
        </Alert>
      )}

      {renderForm()}
    </div>
  );
} 