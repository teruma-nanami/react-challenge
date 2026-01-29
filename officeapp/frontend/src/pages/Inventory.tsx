// src/pages/Inventory.tsx
import InventoryView from "../components/inventory/InventoryView";
import { useInventory } from "../hooks/useInventory";

function Inventory() {
  const {
    items,
    loading,
    submitting,
    error,
    isAddModalOpen,
    onOpenAddModal,
    onCloseAddModal,
    addItem,
  } = useInventory();

  return (
    <InventoryView
      items={items}
      loading={loading}
      submitting={submitting}
      error={error}
      isAddModalOpen={isAddModalOpen}
      onOpenAddModal={onOpenAddModal}
      onCloseAddModal={onCloseAddModal}
      onAddItem={addItem}
    />
  );
}

export default Inventory;
