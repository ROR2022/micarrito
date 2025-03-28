export interface Transaction {
  id: string;
  external_reference: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
} 