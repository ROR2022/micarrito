"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency_id: string;
  frequency: number;
  frequency_type: string;
  features: string[];
  is_active: boolean;
}

interface Subscription {
  id: string;
  status: string;
  current_period_end: string;
  subscription_plan_id: string;
  subscription_plans: SubscriptionPlan;
}

interface SubscriptionPlansClientProps {
  plans: SubscriptionPlan[];
  currentSubscription: Subscription | null;
  isAuthenticated: boolean;
  locale: string;
}

export default function SubscriptionPlansClient({
  plans,
  currentSubscription,
  isAuthenticated,
  locale
}: SubscriptionPlansClientProps) {
  const t = useTranslations("Subscriptions");
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');

  const formatCurrency = (price: number, currency: string = 'USD') => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || 'USD',
      }).format(price);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: 'USD',
      }).format(price);
    }
  };

  const calculateYearlyPrice = (monthlyPrice: number) => {
    // 20% discount for yearly plans
    return monthlyPrice * 12 * 0.8;
  };

  return (
    <div className="container py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t("subtitle")}
        </p>
        
        {currentSubscription && (
          <div className="mt-6 inline-flex items-center gap-2 bg-muted p-3 rounded-lg">
            <Badge variant="secondary">{t("currentPlan")}</Badge>
            <span className="font-medium">{currentSubscription.subscription_plans.name}</span>
            <span className="text-muted-foreground">
              {t("renewsOn")} {formatDate(currentSubscription.current_period_end)}
            </span>
            <Link href={`/${locale}/dashboard/subscriptions`}>
              <Button variant="outline" size="sm">{t("managePlan")}</Button>
            </Link>
          </div>
        )}
        
        <div className="mt-8 flex justify-center gap-4" style={{display: 'none'}}>
          <div className="bg-muted inline-flex p-1 rounded-lg">
            <Button
              variant={billingInterval === 'monthly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingInterval('monthly')}
            >
              {t("monthly")}
            </Button>
            <Button
              variant={billingInterval === 'yearly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingInterval('yearly')}
            >
              {t("yearly")} 
              <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
                {t("savePercent")}
              </Badge>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const price = billingInterval === 'yearly' 
            ? calculateYearlyPrice(plan.price) 
            : plan.price;
            
          const isCurrentPlan = currentSubscription?.subscription_plan_id === plan.id;
          
          return (
            <Card 
              key={plan.id} 
              className={`flex flex-col ${plan.name === 'Pro' ? 'border-primary shadow-lg' : ''}`}
            >
              {plan.name === 'Pro' && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    {t("mostPopular")}
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <p className="text-4xl font-bold">
                    {formatCurrency(price, plan.currency_id)}
                  </p>
                  <p className="text-muted-foreground">
                    {billingInterval === 'monthly' ? t("perMonth") : t("perYear")}
                  </p>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isAuthenticated ? (
                  isCurrentPlan ? (
                    <Button className="w-full" variant="outline">
                      {t("currentPlanButton")}
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      variant={plan.name === 'Pro' ? 'default' : 'outline'}
                      asChild
                    >
                      <Link href={`/${locale}/checkout/subscription/${plan.id}?interval=${billingInterval}`}>
                        {t("subscribeCTA")}
                      </Link>
                    </Button>
                  )
                ) : (
                  <Button 
                    className="w-full" 
                    variant={plan.name === 'Pro' ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href={`/${locale}/sign-in?returnTo=/subscriptions`}>
                      {t("loginToSubscribe")}
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">{t("faqTitle")}</h2>
        <div className="max-w-3xl mx-auto text-left space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">{t("faq.question1")}</h3>
            <p className="text-muted-foreground">{t("faq.answer1")}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">{t("faq.question2")}</h3>
            <p className="text-muted-foreground">{t("faq.answer2")}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">{t("faq.question3")}</h3>
            <p className="text-muted-foreground">{t("faq.answer3")}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 