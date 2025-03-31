import React from 'react';
import { Container } from '@/components/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createClient } from '@/utils/supabase/server';
import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { SellAuthForm } from '../components/sell-auth-form';

export default async function SellAuthPage() {
  // Verificar si el usuario está autenticado
  const locale = await getLocale();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Si no está autenticado, redirigir a la página de inicio de sesión
  if (!user) {
    redirect(`/${locale}/auth/sign-in?redirectTo=/${locale}/sell/auth`);
  }

  return (
    <div className="py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Vender mi vehículo</h1>
          <p className="text-muted-foreground">
            Complete los siguientes datos para publicar su vehículo. Entre más detalles proporcione, más rápido será el proceso.
          </p>
        </div>

        <Tabs defaultValue="info" className="mb-12">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="info">Información del vehículo</TabsTrigger>
            <TabsTrigger value="photos">Fotos</TabsTrigger>
            <TabsTrigger value="contact">Contacto y disponibilidad</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <SellAuthForm step="info" />
          </TabsContent>
          <TabsContent value="photos">
            <SellAuthForm step="photos" />
          </TabsContent>
          <TabsContent value="contact">
            <SellAuthForm step="contact" />
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
} 