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
      
      const response = await fetch('/api/officers');
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch officers');
      }
      
      setBoardHistory(data.data);
    } catch (err) {
      console.error('Error fetching officers:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      
      // Fallback to static data if available
      try {
        const { BoardHistory } = await import('@/data/officerData');
        setBoardHistory(BoardHistory);
        console.log('Fallback to static data');
      } catch (fallbackError) {
        console.error('Fallback failed:', fallbackError);
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