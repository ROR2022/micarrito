"use client";

import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

type PaymentStatusType = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded' | 'disputed' | 'charged_back';
type SubscriptionStatusType = 'pending' | 'active' | 'paused' | 'cancelled';

interface PaymentStatusProps {
  status: PaymentStatusType | SubscriptionStatusType;
  type?: 'payment' | 'subscription';
}

export function PaymentStatus({ status, type = 'payment' }: PaymentStatusProps) {
  const t = useTranslations('Payments');
  
  // Determinar la variante del badge según el estado
  const getVariant = () => {
    switch (status) {
      case 'completed':
      case 'active':
        return "default";
      case 'pending':
      case 'processing':
        return "secondary";
      case 'cancelled':
      case 'paused':
        return "outline";
      case 'failed':
      case 'disputed':
      case 'charged_back':
      case 'refunded':
        return "destructive";
      default:
        return "secondary";
    }
  };

  // Obtener la traducción correspondiente al estado
  const getStatusText = () => {
    if (type === 'payment') {
      return t(`status.${status}`);
    } else {
      return t(`subscription.${status}`);
    }
  };

  return (
    <Badge variant={getVariant()}>{getStatusText()}</Badge>
  );
} 