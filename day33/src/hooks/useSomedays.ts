import { useEffect, useState } from "react";
import type { Someday } from "../types/Someday";

export const useSomedays = () => {
  // 初期化（LocalStorageから読み込み）
  const [somedays, setSomedays] = useState<Someday[]>(() => {
    const storedSomeday = localStorage.getItem("somedays");
    return storedSomeday ? JSON.parse(storedSomeday) : [];
  });

  // 状態が変わるたびに保存
  useEffect(() => {
    localStorage.setItem("somedays", JSON.stringify(somedays));
  }, [somedays]);

  // 追加
  const addSomeday = (newSomeday: Someday) => {
    setSomedays((prev) => [...prev, newSomeday]);
  };

  // 更新
  const updateSomeday = (updatedSomeday: Someday) => {
    setSomedays((prev) =>
      prev.map((item) =>
        item.id === updatedSomeday.id ? updatedSomeday : item
      )
    );
  };

  const toggleSomeday = (id: string) => {
    setSomedays((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  // 削除
  const deleteSomeday = (id: string) => {
    const ok = window.confirm("このタスクを削除しますか？");
    if (!ok) return;
    setSomedays((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    somedays,
    addSomeday,
    updateSomeday,
    toggleSomeday,
    deleteSomeday,
  };
};
