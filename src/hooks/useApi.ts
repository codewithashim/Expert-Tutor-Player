
import { useState, useCallback } from 'react';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiCall = useCallback(async (url: string, method: string = 'GET', body: Record<string, unknown> | null = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      });
      if (!response.ok) throw new Error('API call failed');
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
      return null;
    }
  }, []);

  return { apiCall, loading, error };
}