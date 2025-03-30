"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/client";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  active: boolean;
}

interface Subscription {
  id: string;
  user_id: string;
  subscription_plan_id: string;
  status: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  subscription_plans: SubscriptionPlan;
}

interface Transaction {
  id: string;
  created_at: string;
  user_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
  description: string;
  type: string;
}

interface SubscriptionsClientProps {
  subscription: Subscription | null;
  plans: SubscriptionPlan[];
  history: Transaction[];
  locale: string;
}

export default function SubscriptionsClient({
  subscription,
  plans,
  history,
  locale
}: SubscriptionsClientProps) {
  const t = useTranslations("DashboardSubscriptions");
  const router = useRouter();
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "MXN",
    }).format(amount);
  };

  const handleCancelSubscription = async () => {
    if (!subscription) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Update subscription
      const { error: updateError } = await supabase
        .from("subscriptions")
        .update({ 
          cancel_at_period_end: true,
          updated_at: new Date().toISOString()
        })
        .eq("id", subscription.id);
        
      if (updateError) throw new Error(updateError.message);
      
      setSuccess(t("cancelSuccess"));
      setCancelConfirm(false);
      
      // Refresh data
      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : t("cancelError"));
    } finally {
      setLoading(false);
    }
  };
  
  const handleReactivateSubscription = async () => {
    if (!subscription) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Update subscription
      const { error: updateError } = await supabase
        .from("subscriptions")
        .update({ 
          cancel_at_period_end: false,
          updated_at: new Date().toISOString()
        })
        .eq("id", subscription.id);
        
      if (updateError) throw new Error(updateError.message);
      
      setSuccess(t("reactivateSuccess"));
      
      // Refresh data
      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : t("reactivateError"));
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      
      {/* Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t("subscriptionStatus")}</CardTitle>
            <CardDescription>
              {t("subscriptionStatusDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {subscription ? (
              <div className="space-y-6">
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-muted-foreground">
                    {t("currentPlan")}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-medium">
                      {subscription.subscription_plans.name}
                    </span>
                    <Badge variant={subscription.cancel_at_period_end ? "destructive" : "default"}>
                      {subscription.cancel_at_period_end 
                        ? t("willCancel") 
                        : t("active")}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-muted-foreground">
                      {t("price")}
                    </div>
                    <div>
                      {formatCurrency(
                        subscription.subscription_plans.price,
                        subscription.subscription_plans.currency
                      )}
                      <span className="text-sm text-muted-foreground ml-1">
                        / {t("month")}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {subscription.cancel_at_period_end 
                        ? t("endsOn") 
                        : t("renewsOn")}
                    </div>
                    <div>
                      {formatDate(subscription.current_period_end)}
                    </div>
                  </div>
                </div>
                
                {subscription.cancel_at_period_end ? (
                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertTitle>{t("subscriptionCanceled")}</AlertTitle>
                    <AlertDescription>
                      {t("subscriptionCanceledDescription")}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertTitle>{t("subscriptionActive")}</AlertTitle>
                    <AlertDescription>
                      {t("subscriptionActiveDescription")}
                    </AlertDescription>
                  </Alert>
                )}
                
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{t("error")}</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                {success && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertTitle>{t("success")}</AlertTitle>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}
              </div>
            ) : (
              <div className="py-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{t("noSubscription")}</AlertTitle>
                  <AlertDescription>
                    {t("noSubscriptionDescription")}
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            {subscription ? (
              subscription.cancel_at_period_end ? (
                <Button
                  onClick={handleReactivateSubscription}
                  disabled={loading}
                  className="w-full sm:w-auto"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      {t("processing")}
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      {t("reactivateSubscription")}
                    </>
                  )}
                </Button>
              ) : cancelConfirm ? (
                <>
                  <Button
                    variant="destructive"
                    onClick={handleCancelSubscription}
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        {t("processing")}
                      </>
                    ) : (
                      t("confirmCancel")
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCancelConfirm(false)}
                    className="w-full sm:w-auto"
                  >
                    {t("keepSubscription")}
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setCancelConfirm(true)}
                  className="w-full sm:w-auto"
                >
                  {t("cancelSubscription")}
                </Button>
              )
            ) : (
              <Button
                asChild
                className="w-full sm:w-auto"
              >
                <Link href={`/${locale}/subscriptions`}>
                  {t("browseSubscriptions")}
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t("benefits")}</CardTitle>
            <CardDescription>
              {t("benefitsDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {subscription ? (
              <ul className="space-y-2">
                {subscription.subscription_plans.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-4 text-center text-muted-foreground">
                {t("noBenefits")}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Billing History */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">{t("billingHistory")}</h2>
        <Card>
          <CardContent className="p-0">
            {history.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("date")}</TableHead>
                    <TableHead>{t("description")}</TableHead>
                    <TableHead>{t("amount")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {formatDate(transaction.created_at)}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "default"
                              : transaction.status === "failed"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-6 text-center text-muted-foreground">
                {t("noTransactions")}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Available Plans */}
      {(!subscription || subscription.cancel_at_period_end) && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{t("availablePlans")}</h2>
            <Button
              asChild
              variant="outline"
              size="sm"
            >
              <Link href={`/${locale}/subscriptions`}>
                {t("viewAllPlans")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.slice(0, 3).map((plan) => (
              <Card key={plan.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <p className="text-2xl font-bold">
                      {formatCurrency(plan.price, plan.currency)}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        / {t("month")}
                      </span>
                    </p>
                  </div>
                  
                  <Separator className="mb-4" />
                  
                  <ul className="space-y-2 mb-6">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 3 && (
                      <li className="text-sm text-muted-foreground pl-6">
                        +{plan.features.length - 3} {t("moreFeatures")}
                      </li>
                    )}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={
                      subscription && subscription.subscription_plans.id === plan.id
                      ? "outline"
                      : "default"
                    }
                    asChild
                  >
                    <Link href={`/${locale}/checkout/subscription/${plan.id}?interval=monthly`}>
                      {subscription && subscription.subscription_plans.id === plan.id
                        ? t("currentPlanButton")
                        : t("selectPlan")}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 