"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

export function HeroSection() {
  const t = useTranslations("Landing.Hero")
  const [isVisible, setIsVisible] = useState(false)
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true)
  }, [])

  return (
    <section className="relative py-24 overflow-hidden text-base-content">
      {/* Enhanced background with animated gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-20 left-[5%] w-72 h-72 bg-secondary/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div
            className={`flex flex-col justify-center space-y-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 w-fit gap-2 border border-primary/20">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              {t("badge")}
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              {t("title")}
            </h1>

            <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">{t("subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                asChild
                className="group relative overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                <Link href={`/${locale}/signup`} className="flex items-center gap-2">
                  {t("primaryCTA")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-2 hover:bg-secondary/5 transition-all duration-300">
                {t("secondaryCTA")}
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{t("usersCount")}</span>
              <span className="text-primary">{t("usersAction")}</span>
            </div>
          </div>

          <div
            className={`mx-auto lg:mx-0 relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {/* Animated gradient border */}
            <div
              className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary via-secondary to-primary blur-xl opacity-30 animate-gradient-x"
              aria-hidden="true"
            />

            <div className="relative rounded-xl border-2 border-border/50 shadow-2xl bg-background/80 backdrop-blur-sm overflow-hidden">
              {/* Dashboard preview with proper image */}
              <div className="aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/dashboard-preview.svg"
                  alt={t("imageAlt") || "Dashboard Preview"}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full transition-transform hover:scale-105 duration-700"
                  priority
                  unoptimized={true}
                />
              </div>

              {/* Floating UI elements for visual interest */}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border/50 flex items-center gap-2 text-sm font-medium">
                <span className="h-3 w-3 rounded-full bg-green-500" />
                {t("statusText") || "Live Dashboard"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

