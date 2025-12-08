import { useEffect, useState } from "react";
import type { Category } from "../types/Category";

const defaultCategories: Category[] = [
  { id: "food", name: "食費", color: "green.500" },
  { id: "transport", name: "交通費", color: "blue.500" },
  { id: "daily", name: "日用品", color: "orange.500" },
  { id: "entertainment", name: "娯楽", color: "purple.500" },
];

export const useCategory = () => {
  const [categories, setCategories] = useState<Category[]>(() => {
    const stored = localStorage.getItem("categories");
    return stored ? JSON.parse(stored) : defaultCategories;
  });

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addCategory = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return { categories, addCategory, deleteCategory };
};
