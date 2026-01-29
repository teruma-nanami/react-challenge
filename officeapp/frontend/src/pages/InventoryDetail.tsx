// src/pages/InventoryDetail.tsx
import { useParams, useNavigate } from "react-router-dom";

import InventoryDetailView from "../components/inventory/InventoryDetailView";
import { useInventoryDetail } from "../hooks/useInventoryDetail";

function InventoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const itemId = Number(id);

  const {
    // data
    item,
    transactions,
    isActive,

    // ui state
    loading,
    submitting,
    error,

    // tx form
    txType,
    txQuantity,
    txNote,

    // setters
    setTxType,
    setTxQuantity,
    setTxNote,

    // actions
    createTransaction,
    toggleActive,
    deleteItem,
  } = useInventoryDetail(itemId);

  const handleDelete = async () => {
    await deleteItem();
    navigate("/inventory");
  };

  return (
    <InventoryDetailView
      item={item}
      transactions={transactions}
      loading={loading}
      submitting={submitting}
      error={error}
      isActive={isActive}
      txType={txType}
      txQuantity={txQuantity}
      txNote={txNote}
      onChangeTxType={setTxType}
      onChangeTxQuantity={setTxQuantity}
      onChangeTxNote={setTxNote}
      onCreateTransaction={createTransaction}
      onToggleActive={toggleActive}
      onDeleteItem={handleDelete}
    />
  );
}

export default InventoryDetail;
