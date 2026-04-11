import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../utils';
import JobList from '../../pages/JobList';
import useJobs from '../../hooks/useJobs';
import jobService from '../../services/jobService';
import { mockJobs } from '../mocks/jobService.mock';

vi.mock('../../hooks/useJobs');
vi.mock('../../services/jobService');

describe('JobList Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Renderiza la lista de jobs', () => {
    useJobs.mockReturnValue({ jobs: mockJobs, loading: false, error: null, fetchJobs: vi.fn() });
    renderWithProviders(<JobList onNewJob={vi.fn()} />);
    
    expect(screen.getByText(/Globant/i)).toBeInTheDocument();
    expect(screen.getByText(/Mercado Libre/i)).toBeInTheDocument();
    // 2 JobCards
    expect(screen.getAllByTestId('status-pill').length).toBe(2);
  });

  it('Muestra skeletons mientras carga', () => {
    useJobs.mockReturnValue({ jobs: [], loading: true, error: null, fetchJobs: vi.fn() });
    renderWithProviders(<JobList onNewJob={vi.fn()} />);
    
    expect(screen.getAllByTestId('skeleton-card').length).toBeGreaterThan(0);
    expect(screen.queryByText(/Globant/i)).toBeNull();
  });

  it('Filtro por estado llama al servicio con el parámetro correcto', async () => {
    const fetchJobsMock = vi.fn();
    useJobs.mockReturnValue({ jobs: mockJobs, loading: false, error: null, fetchJobs: fetchJobsMock });
    renderWithProviders(<JobList onNewJob={vi.fn()} />);
    
    // Seleccionar "ENTREVISTA" en el select
    // El select tiene el label implícito por su nombre o podemos buscarlo por su valor inicial
    const statusSelect = screen.getByRole('combobox', { name: /ESTADO/i });
    fireEvent.change(statusSelect, { target: { value: 'interview' } });
    
    expect(fetchJobsMock).toHaveBeenCalledWith({ search: '', status: 'interview', industry: '' });
  });

  it('Buscador llama al servicio después del debounce', async () => {
    const fetchJobsMock = vi.fn();
    useJobs.mockReturnValue({ jobs: mockJobs, loading: false, error: null, fetchJobs: fetchJobsMock });
    renderWithProviders(<JobList onNewJob={vi.fn()} />);
    
    const searchInput = screen.getByPlaceholderText(/BUSCAR POR EMPRESA O CARGO/i);
    fireEvent.change(searchInput, { target: { value: 'globant' } });
    
    // Inmediatamente no debería llamarse
    expect(fetchJobsMock).not.toHaveBeenCalledWith(expect.objectContaining({ search: 'globant' }));
    
    // Avanzar el tiempo 350ms (debounce es 300ms)
    vi.advanceTimersByTime(350);
    
    expect(fetchJobsMock).toHaveBeenCalledWith({ search: 'globant', status: '', industry: '' });
  });

  it('EmptyState cuando filtros no retornan resultados', () => {
    useJobs.mockReturnValue({ jobs: [], loading: false, error: null, fetchJobs: vi.fn() });
    renderWithProviders(<JobList onNewJob={vi.fn()} />);
    
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByText(/HISTORIAL VACÍO/i)).toBeInTheDocument();
  });

  it('Filtros combinados (estado + búsqueda) se envían juntos', async () => {
    const fetchJobsMock = vi.fn();
    useJobs.mockReturnValue({ jobs: mockJobs, loading: false, error: null, fetchJobs: fetchJobsMock });
    renderWithProviders(<JobList onNewJob={vi.fn()} />);
    
    // 1. Cambiar estado (inmediato)
    const statusSelect = screen.getByRole('combobox', { name: /ESTADO/i });
    fireEvent.change(statusSelect, { target: { value: 'interview' } });
    
    // 2. Cambiar búsqueda (debounced)
    const searchInput = screen.getByPlaceholderText(/BUSCAR POR EMPRESA O CARGO/i);
    fireEvent.change(searchInput, { target: { value: 'globant' } });
    
    vi.advanceTimersByTime(350);
    
    expect(fetchJobsMock).toHaveBeenCalledWith({ search: 'globant', status: 'interview', industry: '' });
  });
});
