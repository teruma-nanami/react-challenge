import { useEffect, useState } from "react";
import type { Habit } from "../types/Habit";

export const useHabits = () => {
  // 初期化（LocalStorageから読み込み）
  const [habits, setHabits] = useState<Habit[]>(() => {
    const storedHabit = localStorage.getItem("habits");
    return storedHabit ? JSON.parse(storedHabit) : [];
  });

  // 状態が変わるたびに保存
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // 追加
  const addHabit = (newHabit: Habit) => {
    setHabits((prev) => [...prev, newHabit]);
  };

  // 更新
  const updateHabit = (updatedHabit: Habit) => {
    setHabits((prev) =>
      prev.map((habit) => (habit.id === updatedHabit.id ? updatedHabit : habit))
    );
  };

  // 削除
  const deleteHabit = (habitId: string) => {
    const ok = window.confirm("このタスクを削除しますか？");
    if (!ok) return;
    setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
  };

  return {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
  };
};
