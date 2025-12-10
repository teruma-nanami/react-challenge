import { useEffect, useState } from "react";
import type { Housekeep } from "../types/Housekeep";

export const useHousekeep = () => {
  const [housekeeps, setHousekeeps] = useState<Housekeep[]>(() => {
    const initialHousekeeps = localStorage.getItem("housekeeps");
    return initialHousekeeps ? JSON.parse(initialHousekeeps) : [];
  });

  useEffect(() => {
    localStorage.setItem("housekeeps", JSON.stringify(housekeeps));
  }, [housekeeps]);

  const addHousekeep = (newHousekeep: Housekeep) => {
    setHousekeeps((prev) => [...prev, newHousekeep]);
  };

  const editHousekeep = (updatedHousekeep: Housekeep) => {
    setHousekeeps((prev) =>
      prev.map((housekeep) =>
        housekeep.id === updatedHousekeep.id ? updatedHousekeep : housekeep
      )
    );
  };
  const deleteHousekeep = (id: string) => {
    if (!confirm("本当に削除しますか？")) return;
    setHousekeeps(housekeeps.filter((housekeep) => housekeep.id !== id));
  };
  return { housekeeps, addHousekeep, editHousekeep, deleteHousekeep };
};
