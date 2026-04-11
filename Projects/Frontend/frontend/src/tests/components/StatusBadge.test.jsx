import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from '../../components/StatusBadge';

describe('StatusBadge', () => {
  it('Renderiza el texto correcto por estado', () => {
    render(<StatusBadge status="interview" />);
    expect(screen.getByText(/ENTREVISTA/i)).toBeInTheDocument();
  });

  it('Renderiza los 6 estados sin errores', () => {
    const states = ['applied', 'interview', 'technical', 'offer', 'rejected', 'discarded'];
    states.forEach(status => {
      const { unmount } = render(<StatusBadge status={status} />);
      expect(screen.getByTestId('status-pill')).toBeDefined();
      unmount();
    });
  });

  it('Aplica color correcto según estado', () => {
    render(<StatusBadge status="offer" />);
    const pill = screen.getByText(/OFERTA/i);
    // Verificamos que el estilo inline tenga el color de offer
    expect(pill).toHaveStyle({ color: 'var(--offer-color)' });
  });

  it('Estado inválido no rompe el componente', () => {
    render(<StatusBadge status="non_existent" />);
    // Debería caer en el fallback (POSTULADO)
    expect(screen.getByText(/POSTULADO/i)).toBeInTheDocument();
  });
});
