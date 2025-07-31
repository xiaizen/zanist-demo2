import { useState, useEffect } from 'react';
import { analyticsService, AnalyticsData } from '../services/analyticsService';

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await analyticsService.getDashboardAnalytics();
        setAnalytics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await analyticsService.getDashboardAnalytics();
      setAnalytics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  return {
    analytics,
    loading,
    error,
    refetch
  };
};