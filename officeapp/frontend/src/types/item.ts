export type InventoryItem = {
  id: number;
  sku: string | null;
  name: string;
  quantity: number;
  is_active: boolean | number; // backendが1/0で返す可能性あるので一旦これでOK
  created_at: string;
  updated_at: string;
};
