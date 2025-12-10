import { useEffect, useState } from "react";
import type { Income } from "../types/Income";

export const useIncome = () => {
  const [incomes, setIncomes] = useState<Income[]>(() => {
    const stored = localStorage.getItem("incomes");
    return stored ? JSON.parse(stored) : [];
  });

  // incomes が変わるたびに localStorage に保存
  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [incomes]);

  const addIncome = (newIncome: Income) => {
    setIncomes((prev) => [...prev, newIncome]);
  };

  const editIncome = (updatedIncome: Income) => {
    setIncomes((prev) =>
      prev.map((i) => (i.id === updatedIncome.id ? updatedIncome : i))
    );
  };

  const deleteIncome = (id: string) => {
    if (!confirm("本当に削除しますか？")) return;
    setIncomes((prev) => prev.filter((i) => i.id !== id));
  };

  return { incomes, addIncome, editIncome, deleteIncome };
};
