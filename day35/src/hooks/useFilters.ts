import { useState } from "react";
import type { Housekeep } from "../types/Housekeep";

export const useFilters = (housekeeps: Housekeep[]) => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [monthFilter, setMonthFilter] = useState<{
    year: number;
    month: number;
  } | null>(null);

  const filtered = housekeeps.filter((h) => {
    const matchCategory = categoryFilter
      ? h.categoryId === categoryFilter
      : true;
    const matchMonth = monthFilter
      ? new Date(h.date).getFullYear() === monthFilter.year &&
        new Date(h.date).getMonth() + 1 === monthFilter.month
      : true;
    return matchCategory && matchMonth;
  });

  return { filtered, setCategoryFilter, setMonthFilter };
};
