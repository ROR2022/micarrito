export interface Transaction {
  id: string;
  external_reference: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
  items: any[];
  seller_id: string;
  profiles?: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
} 