// src/hooks/useInventoryForm.ts
import { useState } from "react";

type AddInventoryParams = {
  sku: string;
  name: string;
  quantity: number;
  isActive: boolean;
};

export function useInventoryForm(
  onAddItem: (params: AddInventoryParams) => Promise<void>,
  onClose: () => void,
) {
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const resetForm = () => {
    setSku("");
    setName("");
    setQuantity(0);
    setIsActive(true);
  };

  const submit = async () => {
    await onAddItem({
      sku,
      name,
      quantity,
      isActive,
    });

    resetForm();
    onClose();
  };

  return {
    // values
    sku,
    name,
    quantity,
    isActive,

    // setters
    setSku,
    setName,
    setQuantity,
    setIsActive,

    // actions
    submit,
  };
}
