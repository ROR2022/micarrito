"use client"
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

export function CtaSection() {
  const t = useTranslations('Landing.CTA');
  const params = useParams();
  const locale = params.locale as string;
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background pointer-events-none" aria-hidden="true" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t('title')}</h2>
          <p className="mt-4 text-muted-foreground md:text-xl">{t('subtitle')}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" asChild>
              <Link href={`/${locale}/signup`}>{t('primaryCTA')}</Link>
            </Button>
            <Button variant="outline" size="lg">
              {t('secondaryCTA')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 