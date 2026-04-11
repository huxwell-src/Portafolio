import { useState, useEffect, useCallback } from 'react';
import jobService from '../services/jobService';

const useJobs = (initialParams = {}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async (params = initialParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobService.getJobs(params);
      setJobs(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al cargar las postulaciones');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, loading, error, fetchJobs };
};

export default useJobs;
