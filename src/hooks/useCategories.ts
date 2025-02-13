import { useState, useCallback } from 'react';
import { useApi } from '@/hooks/useApi';

interface Category {
  _id: string;
  name: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { apiCall } = useApi();

  const fetchCategories = useCallback(async () => {
    const data = await apiCall("/api/categories");
    if (data) setCategories(data);
  }, [apiCall]);

  const addCategory = useCallback(async (data: { name: string }) => {
    const result = await apiCall("/api/categories", "POST", data);
    if (result) {
      setCategories(prev => [...prev, result]);
      return result;
    }
    return null;
  }, [apiCall]);

  const deleteCategory = useCallback(async (id: string) => {
    const result = await apiCall(`/api/categories/${id}`, "DELETE");
    if (result) {
      setCategories(prev => prev.filter(cat => cat._id !== id));
      return true;
    }
    return false;
  }, [apiCall]);

  return { categories, fetchCategories, addCategory, deleteCategory };
}