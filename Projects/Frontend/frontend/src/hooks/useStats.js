import { useState, useEffect } from 'react';
import jobService from '../services/jobService';

const useStats = () => {
  const [stats, setStats] = useState(null);
  const [byIndustry, setByIndustry] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const [statsData, industryData, timelineData] = await Promise.all([
          jobService.getStats(),
          jobService.getStatsByIndustry(),
          jobService.getTimeline(),
        ]);
        setStats(statsData);
        setByIndustry(industryData);
        setTimeline(timelineData);
      } catch (err) {
        setError(err.response?.data?.detail || 'Error al cargar las métricas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, byIndustry, timeline, loading, error };
};

export default useStats;
