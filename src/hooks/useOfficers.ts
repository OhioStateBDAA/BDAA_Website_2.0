import { useState, useEffect } from 'react';
import { YearBoard } from '@/types/events';

interface UseOfficersResult {
  boardHistory: YearBoard[];
  currentBoard: YearBoard | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useOfficers(): UseOfficersResult {
  const [boardHistory, setBoardHistory] = useState<YearBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOfficers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch from API first
      const response = await fetch('/api/officers');

      if (response.ok) {
        const data = await response.json();

        if (data.success && data.data) {
          setBoardHistory(data.data);
          return; // Success, exit early
        }
      }

      // If API fails, fall back to static data
      throw new Error('API failed, using fallback data');

    } catch (err) {
      // Silently fall back to static data (this is expected when Airtable isn't configured)
      try {
        const { BoardHistory } = await import('@/data/officerData');
        setBoardHistory(BoardHistory);
        setError(null); // Clear any previous errors
      } catch (fallbackError) {
        console.error('Fallback to static data failed:', fallbackError);
        setError('Failed to load officer data from both API and fallback sources');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  return {
    boardHistory,
    currentBoard: boardHistory[0] || null,
    loading,
    error,
    refetch: fetchOfficers,
  };
}