import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

/**
 * Helper para renderizar componentes con todos los providers necesarios
 */
export function renderWithProviders(ui, { route = '/', authValue = null } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider mockValue={authValue}>
        {ui}
      </AuthProvider>
    </MemoryRouter>
  );
}
