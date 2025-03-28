"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaymentStatus } from "@/components/payments/payment-status";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Download, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { TransactionDetail } from "./types";

export default function PurchaseDetailClient({
  transaction,
}: {
  transaction: TransactionDetail;
}) {
  const t = useTranslations("Purchases");

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const getSellerName = () => {
    if (!transaction.profiles) return t("unknownSeller");
    
    const firstName = transaction.profiles.first_name || "";
    const lastName = transaction.profiles.last_name || "";
    
    return `${firstName} ${lastName}`.trim() || t("unknownSeller");
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const sellerName = getSellerName();

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/dashboard/purchases">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("backToPurchases")}
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{t("detail.title")}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Información principal de la transacción */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{t("detail.transactionInfo")}</CardTitle>
                <CardDescription>{t("detail.transactionDescription")}</CardDescription>
              </div>
              <PaymentStatus status={transaction.status as any} />
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  {t("detail.reference")}
                </dt>
                <dd className="text-base font-semibold mt-1">
                  {transaction.external_reference}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  {t("detail.mercadoPagoId")}
                </dt>
                <dd className="text-base font-semibold mt-1">
                  {transaction.mercado_pago_id || t("detail.notAvailable")}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  {t("detail.amount")}
                </dt>
                <dd className="text-base font-semibold mt-1">
                  {formatCurrency(transaction.amount, transaction.currency)}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  {t("detail.date")}
                </dt>
                <dd className="text-base font-semibold mt-1">
                  {formatDate(transaction.created_at, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </dd>
              </div>
            </dl>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" className="mr-2">
              <Download className="h-4 w-4 mr-2" />
              {t("detail.downloadReceipt")}
            </Button>
          </CardFooter>
        </Card>

        {/* Información del vendedor */}
        <Card>
          <CardHeader>
            <CardTitle>{t("detail.sellerInfo")}</CardTitle>
            <CardDescription>{t("detail.sellerDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage 
                  src={transaction.profiles?.avatar_url || undefined} 
                  alt={sellerName}
                />
                <AvatarFallback>{getInitials(sellerName)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{sellerName}</p>
                <p className="text-sm text-muted-foreground">
                  {t("detail.seller")}
                </p>
              </div>
            </div>
            <Button size="sm" className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              {t("detail.contactSeller")}
            </Button>
          </CardContent>
        </Card>
        
        {/* Detalles de los artículos */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>{t("detail.itemsInfo")}</CardTitle>
            <CardDescription>{t("detail.itemsDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            {transaction.items && transaction.items.length > 0 ? (
              <div className="space-y-4">
                {transaction.items.map((item, index) => (
                  <div key={index}>
                    {index > 0 && <Separator className="my-4" />}
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p>
                          {formatCurrency(item.unit_price, item.currency_id)} x {item.quantity}
                        </p>
                        <p className="font-bold mt-1">
                          {formatCurrency(item.unit_price * item.quantity, item.currency_id)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Separator className="my-4" />
                
                <div className="flex justify-between items-center">
                  <p className="font-medium">{t("detail.total")}</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                {t("detail.noItemsFound")}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 