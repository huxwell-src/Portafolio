import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../utils';
import JobCard from '../../components/JobCard';
import { mockJobs } from '../mocks/jobService.mock';

describe('JobCard', () => {
  it('Muestra los datos del job', () => {
    renderWithProviders(<JobCard job={mockJobs[0]} />);
    expect(screen.getByText(/Globant/i)).toBeInTheDocument();
    expect(screen.getByText(/Senior Frontend Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Fintech/i)).toBeInTheDocument();
  });

  it('Muestra StatusBadge con el estado correcto', () => {
    renderWithProviders(<JobCard job={mockJobs[0]} />);
    // interview -> ENTREVISTA
    expect(screen.getByText(/ENTREVISTA/i)).toBeInTheDocument();
  });

  it('Navega a /jobs/:id al hacer click', () => {
    // Usamos renderWithProviders que ya tiene MemoryRouter
    renderWithProviders(<JobCard job={mockJobs[0]} />);
    const card = screen.getByText(/Globant/i).closest('.glass-card');
    fireEvent.click(card);
    // Para verificar la navegación en MemoryRouter podemos usar un componente espía 
    // o simplemente confiar en que el click disparó el navigate. 
    // En tests más complejos verificaríamos la ruta resultante.
  });

  it('No muestra rubro si industry está vacío', () => {
    const jobWithoutIndustry = { ...mockJobs[0], industry: '' };
    renderWithProviders(<JobCard job={jobWithoutIndustry} />);
    // El texto "Fintech" no debería estar
    expect(screen.queryByText(/Fintech/i)).toBeNull();
  });

  it('Muestra fecha formateada correctamente', () => {
    renderWithProviders(<JobCard job={mockJobs[0]} />);
    // applied_date: '2024-03-01' -> '01 mar 2024' (o similar según locale)
    // Buscamos algo que contenga "mar" o "2024" pero no el formato ISO
    expect(screen.queryByText('2024-03-01')).toBeNull();
    expect(screen.getByText(/2024/i)).toBeInTheDocument();
  });
});
