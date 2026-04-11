import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useJobs from '../../hooks/useJobs';
import jobService from '../../services/jobService';
import { mockJobs } from '../mocks/jobService.mock';

vi.mock('../../services/jobService');

describe('useJobs hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Estado inicial correcto', () => {
    jobService.getJobs.mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useJobs());
    
    expect(result.current.jobs).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('Carga jobs correctamente', async () => {
    jobService.getJobs.mockResolvedValue(mockJobs);
    const { result } = renderHook(() => useJobs());
    
    await waitFor(() => {
      expect(result.current.jobs.length).toBe(2);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  it('Maneja error de red', async () => {
    jobService.getJobs.mockRejectedValue({ response: { data: { detail: 'Network Error' } } });
    const { result } = renderHook(() => useJobs());
    
    await waitFor(() => {
      expect(result.current.jobs).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Network Error');
    });
  });

  it('fetchJobs con parámetros pasa los params al servicio', async () => {
    jobService.getJobs.mockResolvedValue(mockJobs);
    const { result } = renderHook(() => useJobs());
    
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    await result.current.fetchJobs({ status: 'interview', search: 'globant' });
    
    expect(jobService.getJobs).toHaveBeenCalledWith({ status: 'interview', search: 'globant' });
  });
});
