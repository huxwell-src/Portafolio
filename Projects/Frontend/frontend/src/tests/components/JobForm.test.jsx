import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import JobForm from '../../components/JobForm';

describe('JobForm', () => {
  it('Muestra errores de validación si los campos están vacíos', () => {
    const onSubmit = vi.fn();
    render(<JobForm onSubmit={onSubmit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /CREAR POSTULACIÓN/i }));
    
    expect(screen.getByText(/EMPRESA REQUERIDA/i)).toBeInTheDocument();
    expect(screen.getByText(/CARGO REQUERIDO/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('Llama a onSubmit con los datos correctos si el formulario es válido', () => {
    const onSubmit = vi.fn();
    render(<JobForm onSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/EMPRESA/i), { target: { value: 'Google' } });
    fireEvent.change(screen.getByLabelText(/CARGO/i), { target: { value: 'Frontend' } });
    
    fireEvent.click(screen.getByRole('button', { name: /CREAR POSTULACIÓN/i }));
    
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      company: 'Google',
      position: 'Frontend',
      status: 'applied'
    }));
  });
});
