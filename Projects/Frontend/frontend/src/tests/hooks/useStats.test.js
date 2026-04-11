import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useStats from '../../hooks/useStats';
import jobService from '../../services/jobService';
import { mockStats } from '../mocks/jobService.mock';

vi.mock('../../services/jobService');

describe('useStats hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Llama a los 3 endpoints en paralelo', async () => {
    jobService.getStats.mockResolvedValue(mockStats);
    jobService.getStatsByIndustry.mockResolvedValue([]);
    jobService.getTimeline.mockResolvedValue([]);
    
    const { result } = renderHook(() => useStats());
    
    await waitFor(() => {
      expect(jobService.getStats).toHaveBeenCalledTimes(1);
      expect(jobService.getStatsByIndustry).toHaveBeenCalledTimes(1);
      expect(jobService.getTimeline).toHaveBeenCalledTimes(1);
    });
  });

  it('Retorna los datos correctamente', async () => {
    jobService.getStats.mockResolvedValue(mockStats);
    jobService.getStatsByIndustry.mockResolvedValue([{ industry: 'Tech', count: 5 }]);
    jobService.getTimeline.mockResolvedValue([{ week: 1, count: 2 }]);
    
    const { result } = renderHook(() => useStats());
    
    await waitFor(() => {
      expect(result.current.stats.total).toBe(2);
      expect(result.current.stats.response_rate).toBe(50.0);
      expect(result.current.byIndustry).toHaveLength(1);
      expect(result.current.timeline).toHaveLength(1);
      expect(result.current.loading).toBe(false);
    });
  });

  it('loading es true mientras carga', () => {
    jobService.getStats.mockImplementation(() => new Promise(() => {}));
    jobService.getStatsByIndustry.mockImplementation(() => new Promise(() => {}));
    jobService.getTimeline.mockImplementation(() => new Promise(() => {}));
    
    const { result } = renderHook(() => useStats());
    
    expect(result.current.loading).toBe(true);
  });
});
