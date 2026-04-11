import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatCard from '../../components/StatCard';

describe('StatCard', () => {
  it('Muestra título y valor', async () => {
    render(<StatCard title="TOTAL" value={24} />);
    expect(screen.getByText(/TOTAL/i)).toBeInTheDocument();
    // En este componente usamos framer-motion useSpring, 
    // por lo que el valor inicial podría ser 0 y animar.
    // Usamos findByText para esperar a que la animación llegue al valor final
    expect(await screen.findByText(/24/i)).toBeInTheDocument();
  });

  it('Muestra subtexto cuando se pasa la prop', () => {
    render(<StatCard title="RESPUESTA" value="41.7%" subtitle="últimos 30 días" />);
    expect(screen.getByText(/últimos 30 días/i)).toBeInTheDocument();
  });

  it('No muestra subtexto cuando no se pasa la prop', () => {
    const { queryByText } = render(<StatCard title="TOTAL" value={5} />);
    // Buscamos cualquier elemento que no sea el título o el valor
    // En nuestro componente, el subtexto es un span con font-mono
    const subtitleElement = queryByText(/últimos/i);
    expect(subtitleElement).toBeNull();
  });

  it('Valor 0 se renderiza correctamente (no como falsy)', async () => {
    render(<StatCard title="OFERTAS" value={0} />);
    expect(await screen.findByText(/0/i)).toBeInTheDocument();
  });
});
