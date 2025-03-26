'use client'

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PlanFeature {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export function PricingSection() {
  const t = useTranslations('Landing.Pricing');
  const [billingCycle, setBillingCycle] = useState("monthly");
  
  const plans: PlanFeature[] = [
    {
      name: t('basic.title'),
      price: billingCycle === "monthly" ? t('basic.price') : "$470",
      period: t('basic.period'),
      description: t('basic.description'),
      features: t.raw('basic.features'),
      cta: t('basic.cta'),
      popular: false
    },
    {
      name: t('pro.title'),
      price: billingCycle === "monthly" ? t('pro.price') : "$950",
      period: t('pro.period'),
      description: t('pro.description'),
      features: t.raw('pro.features'),
      cta: t('pro.cta'),
      popular: true
    },
    {
      name: t('enterprise.title'),
      price: billingCycle === "monthly" ? t('enterprise.price') : "$2,390",
      period: t('enterprise.period'),
      description: t('enterprise.description'),
      features: t.raw('enterprise.features'),
      cta: t('enterprise.cta'),
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t('title')}</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">{t('subtitle')}</p>
          
          <div className="hidden items-center space-x-2 bg-muted p-1 rounded-lg mt-6 ">
            <Button 
              variant={billingCycle === "monthly" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setBillingCycle("monthly")}
            >
              {t('monthly')}
            </Button>
            <Button 
              variant={billingCycle === "yearly" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setBillingCycle("yearly")}
            >
              {t('yearly')}
              <span className="ml-1.5 py-0.5 px-1.5 text-xs rounded-full bg-primary/10 text-primary">
                {t('savePercent')}
              </span>
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col rounded-lg border p-8 ${
                plan.popular ? "border-primary shadow-lg" : "shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  {t('pro.popular')}
                </div>
              )}
              
              <div className="py-4">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </div>
              
              <div className="flex items-baseline mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="ml-1 text-muted-foreground">{plan.period}</span>
              </div>
              
              <ul className="space-y-3 mt-6 flex-1">
                {plan.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={plan.popular ? "default" : "outline"} 
                className="mt-8"
                size="lg"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 