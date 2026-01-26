export type InventoryTransactionType = "in" | "out" | "adjust";

export type InventoryTransaction = {
  id: number;
  inventory_item_id: number;
  user_id: number | null;
  type: InventoryTransactionType;
  quantity: number;
  note: string | null;
  created_at: string;
  updated_at: string;
};
