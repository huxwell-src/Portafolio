import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../utils';
import Dashboard from '../../pages/Dashboard';
import useStats from '../../hooks/useStats';
import jobService from '../../services/jobService';
import { mockStats } from '../mocks/jobService.mock';

vi.mock('../../hooks/useStats');
vi.mock('../../services/jobService');

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Muestra las 4 métricas principales', async () => {
    useStats.mockReturnValue({ stats: mockStats, timeline: [], loading: false, error: null });
    renderWithProviders(<Dashboard onNewJob={vi.fn()} />);
    
    // El valor de total es 2. Esperamos a que la animación llegue a 2.
    expect(await screen.findByText(/2/i)).toBeInTheDocument(); 
    // El valor de response_rate es 50.0. Esperamos a que la animación llegue a 50.0%.
    expect(await screen.findByText(/50.0%/i)).toBeInTheDocument(); 
    expect(screen.getAllByText(/POSTULACIONES/i).length).toBeGreaterThan(0);
  });

  it('Muestra estado de carga mientras carga los datos', () => {
    useStats.mockReturnValue({ stats: null, timeline: [], loading: true, error: null });
    renderWithProviders(<Dashboard onNewJob={vi.fn()} />);
    
    // Debería mostrar 4 SkeletonCards
    expect(screen.getAllByTestId('skeleton-card').length).toBe(4);
    // Pero ningún StatCard real
    expect(screen.queryByText('50.0%')).toBeNull();
  });

  it('Muestra EmptyState cuando no hay postulaciones', () => {
    useStats.mockReturnValue({ 
      stats: { total: 0, by_status: {}, response_rate: 0, applied_last_7_days: 0 }, 
      timeline: [], 
      loading: false, 
      error: null 
    });
    renderWithProviders(<Dashboard onNewJob={vi.fn()} />);
    
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByText(/TU BÚSQUEDA EMPIEZA AQUÍ/i)).toBeInTheDocument();
  });

  it('El botón "+ NUEVA POSTULACIÓN" llama a onNewJob', () => {
    const onNewJob = vi.fn();
    useStats.mockReturnValue({ stats: mockStats, timeline: [], loading: false, error: null });
    renderWithProviders(<Dashboard onNewJob={onNewJob} />);
    
    fireEvent.click(screen.getByText(/\+ NUEVA POSTULACIÓN/i));
    expect(onNewJob).toHaveBeenCalled();
  });

  it('El botón "EXPORTAR CSV" llama a exportCsv()', () => {
    useStats.mockReturnValue({ stats: mockStats, timeline: [], loading: false, error: null });
    jobService.exportCsv.mockResolvedValue(new Blob());
    renderWithProviders(<Dashboard onNewJob={vi.fn()} />);
    
    fireEvent.click(screen.getByText(/EXPORTAR CSV/i));
    expect(jobService.exportCsv).toHaveBeenCalled();
  });
});
