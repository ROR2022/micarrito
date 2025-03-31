"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Users, GitBranch, Shield, Zap } from "lucide-react";
import Image from "next/image";

const stats = [
  {
    icon: <Code2 className="h-6 w-6 text-primary" />,
    value: "1000+",
    label: "Vehículos Listados"
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    value: "5000+",
    label: "Usuarios Activos"
  },
  {
    icon: <GitBranch className="h-6 w-6 text-primary" />,
    value: "50+",
    label: "Concesionarios"
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    value: "99.9%",
    label: "Satisfacción"
  }
];

const technologies = [
  {
    name: "Next.js",
    description: "Plataforma web de alto rendimiento",
    icon: "/tech/nextjs.svg"
  },
  {
    name: "Supabase",
    description: "Base de datos segura y escalable",
    icon: "/tech/supabase.svg"
  },
  {
    name: "MercadoPago",
    description: "Procesador de pagos líder en Latinoamérica",
    icon: "/tech/mercadopago.svg"
  },
  {
    name: "TailwindCSS",
    description: "Diseño moderno y responsivo",
    icon: "/tech/tailwind.svg"
  }
];

export function AboutSection() {
  const t = useTranslations("Landing.About");

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div
        className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 w-fit gap-2 border border-primary/20">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            {t("badge")}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {t("title")}
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            {t("subtitle")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">{t("mission.title")}</h3>
            <p className="text-muted-foreground">{t("mission.description")}</p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">{t("mission.features.performance.title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("mission.features.performance.description")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">{t("mission.features.security.title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("mission.features.security.description")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-primary/10 shadow-xl">
              <Image
                src="/about-preview.svg"
                alt="Mi Carrito - Marketplace de Autos"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center">{t("tech.title")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <Card key={index} className="border-none bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="relative h-12 w-full mb-4 mx-auto">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4 className="font-medium mb-2">{tech.name}</h4>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 