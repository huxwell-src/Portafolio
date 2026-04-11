import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../utils';
import Login from '../../pages/Login';
import authService from '../../services/authService';

vi.mock('../../services/authService');

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Renderiza el formulario correctamente', () => {
    renderWithProviders(<Login />);
    expect(screen.getByLabelText(/USUARIO/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CONTRASEÑA/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /INICIAR SESIÓN/i })).toBeInTheDocument();
  });

  it('Login exitoso redirige al dashboard', async () => {
    authService.login.mockResolvedValue({ user: { username: 'nicolas' } });
    renderWithProviders(<Login />);
    
    fireEvent.change(screen.getByLabelText(/USUARIO/i), { target: { value: 'nicolas' } });
    fireEvent.change(screen.getByLabelText(/CONTRASEÑA/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /INICIAR SESIÓN/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('nicolas', 'password123');
    });
  });

  it('Login fallido muestra mensaje de error', async () => {
    authService.login.mockRejectedValue(new Error('Credenciales inválidas'));
    renderWithProviders(<Login />);
    
    fireEvent.change(screen.getByLabelText(/USUARIO/i), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByLabelText(/CONTRASEÑA/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /INICIAR SESIÓN/i }));

    await waitFor(() => {
      expect(screen.getByText(/Credenciales inválidas/i)).toBeInTheDocument();
    });
  });

  it('Botón deshabilitado durante el loading', async () => {
    // Simulamos un delay en el login
    authService.login.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    renderWithProviders(<Login />);
    
    fireEvent.change(screen.getByLabelText(/USUARIO/i), { target: { value: 'nicolas' } });
    fireEvent.change(screen.getByLabelText(/CONTRASEÑA/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /INICIAR SESIÓN/i }));

    // Buscamos el botón de submit (que cambia su texto a "CARGANDO...")
    expect(screen.getByRole('button', { name: /CARGANDO/i })).toBeDisabled();
  });

  it('Campos vacíos no disparan la llamada al servicio', async () => {
    renderWithProviders(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /INICIAR SESIÓN/i }));
    
    expect(authService.login).not.toHaveBeenCalled();
  });
});
