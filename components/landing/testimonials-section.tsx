"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const t = useTranslations("Landing.Testimonials");
  const testimonials = t.raw("testimonials");
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  // Function to handle scrolling on mobile
  const scrollToTestimonial = (index: number) => {
    setActiveIndex(index);
    if (scrollRef.current) {
      const cards = scrollRef.current.querySelectorAll(".testimonial-card");
      if (cards[index]) {
        cards[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  // Function to handle next/prev navigation
  const handleNavigation = (direction: "next" | "prev") => {
    const newIndex =
      direction === "next"
        ? Math.min(activeIndex + 1, testimonials.length - 1)
        : Math.max(activeIndex - 1, 0);
    scrollToTestimonial(newIndex);
  };

  // Generate random rating between 4 and 5 stars
  const getRandomRating = () => Math.floor(Math.random() * 2) + 4;

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
            {t("badge") || "Customer Stories"}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {t("title")}
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            {t("subtitle")}
          </p>
        </div>

        {/* Featured testimonial - larger and more prominent */}
        <div className="mb-16 max-w-4xl mx-auto">
          <Card className="overflow-hidden border-2 border-primary/10 shadow-xl bg-gradient-to-br from-background to-primary/5">
            <CardContent className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-background shadow-xl flex-shrink-0">
                  <Image
                    src={`/placeholder.svg?height=128&width=128&text=${testimonials[0]?.author?.split(" ")[0] || "User"}`}
                    alt={testimonials[0]?.author || "Featured testimonial"}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg border-2 border-background">
                    <Quote className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5 mr-1",
                          i < 5
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted",
                        )}
                      />
                    ))}
                  </div>

                  <p className="text-xl md:text-2xl font-medium italic mb-6">
                    &ldquo;
                    {testimonials[0]?.quote ||
                      "This product has completely transformed how we work."}
                    &rdquo;
                  </p>

                  <div className="flex items-center">
                    <div>
                      <h4 className="font-bold text-lg">
                        {testimonials[0]?.author || "Jane Smith"}
                      </h4>
                      <p className="text-muted-foreground">
                        {testimonials[0]?.role || "CEO, Company"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile navigation controls */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleNavigation("prev")}
            disabled={activeIndex === 0}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex space-x-1">
            {testimonials
              .slice(1)
              .map(
                (
                  _: { quote: string; author: string; role: string },
                  idx: number,
                ) => (
                  <button
                    key={idx}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      activeIndex === idx ? "bg-primary w-4" : "bg-muted",
                    )}
                    onClick={() => scrollToTestimonial(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ),
              )}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handleNavigation("next")}
            disabled={activeIndex === testimonials.length - 1}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Scrollable testimonials for mobile, grid for desktop */}
        <div
          ref={scrollRef}
          className="flex md:grid gap-6 md:gap-8 md:grid-cols-3 overflow-x-auto pb-8 md:pb-0 snap-x snap-mandatory md:overflow-visible scrollbar-hide"
        >
          {testimonials
            .slice(1)
            .map(
              (
                testimonial: { quote: string; author: string; role: string },
                index: number,
              ) => {
                const rating = getRandomRating();
                return (
                  <Card
                    key={index}
                    className={cn(
                      "testimonial-card min-w-[85%] sm:min-w-[350px] md:min-w-0 overflow-hidden border shadow-md h-full snap-center transition-all duration-300 hover:shadow-lg",
                      activeIndex === index
                        ? "border-primary/50 bg-primary/5"
                        : "bg-card",
                    )}
                  >
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4 mr-1",
                                  i < rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-muted",
                                )}
                              />
                            ))}
                          </div>
                          <Quote className="h-6 w-6 text-primary/40" />
                        </div>

                        <p className="flex-1 mb-6 text-foreground/90">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>

                        <div className="flex items-center mt-auto pt-4 border-t border-border/50">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-background shadow-sm">
                            <Image
                              src={`/placeholder.svg?height=48&width=48&text=${testimonial.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}`}
                              alt={testimonial.author}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              {testimonial.author}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              },
            )}
        </div>

        {/* Trusted by logos section */}
        <div className="mt-20 pt-10 border-t border-border/30">
          <h3 className="text-center text-lg font-medium mb-8 text-muted-foreground">
            {t("trustedBy") || "Trusted by innovative companies worldwide"}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {companyLogos.map((company, i) => (
              <div key={i} className="flex justify-center">
                <div className="relative h-12 w-full opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 flex items-center justify-center group">
                  <TempLogoCompany />
                  {/* <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    width={120}
                    height={40}
                    className="object-contain max-h-10"
                  /> */}
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
