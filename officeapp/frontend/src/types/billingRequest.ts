export type BillingRequest = {
  id: number;
  user_id: number;
  title: string;
  amount: number;
  reason: string;
  approved_by: number | null;
  created_at: string;
};
