import { useState, useCallback } from 'react';
import { useApi } from '@/hooks/useApi';

interface Subcategory {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
  };
}

export function useSubcategories() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const { apiCall } = useApi();

  const fetchSubcategories = useCallback(async () => {
    const data = await apiCall("/api/subcategories");
    if (data) setSubcategories(data);
  }, [apiCall]);

  const addSubcategory = useCallback(async (data: { name: string; category: string }) => {
    const result = await apiCall("/api/subcategories", "POST", data);
    if (result) {
      setSubcategories(prev => [...prev, result]);
      return result;
    }
    return null;
  }, [apiCall]);

  const deleteSubcategory = useCallback(async (id: string) => {
    const result = await apiCall(`/api/subcategories/${id}`, "DELETE");
    if (result) {
      setSubcategories(prev => prev?.filter(sub => sub?._id !== id));
      return true;
    }
    return false;
  }, [apiCall]);

  return { subcategories, fetchSubcategories, addSubcategory, deleteSubcategory };
}