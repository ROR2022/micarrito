export interface TransactionDetail {
  id: string;
  external_reference: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    quantity: number;
    unit_price: number;
    currency_id: string;
  }>;
  mercado_pago_id: string | null;
  seller_id: string;
  profiles?: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
} 