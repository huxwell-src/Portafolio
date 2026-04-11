import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from '../../components/ConfirmModal';

describe('ConfirmModal', () => {
  it('No renderiza nada cuando isOpen es false', () => {
    const { queryByText } = render(
      <ConfirmModal 
        isOpen={false} 
        message="¿ELIMINAR?" 
        onConfirm={vi.fn()} 
        onCancel={vi.fn()} 
      />
    );
    expect(queryByText(/¿ELIMINAR\?/i)).toBeNull();
  });

  it('Renderiza el mensaje cuando isOpen es true', () => {
    render(
      <ConfirmModal 
        isOpen={true} 
        message="¿ELIMINAR ESTA POSTULACIÓN?" 
        onConfirm={vi.fn()} 
        onCancel={vi.fn()} 
      />
    );
    expect(screen.getByText(/¿ELIMINAR ESTA POSTULACIÓN\?/i)).toBeInTheDocument();
  });

  it('Llama onConfirm al hacer click en confirmar', () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmModal 
        isOpen={true} 
        message="?" 
        onConfirm={onConfirm} 
        onCancel={vi.fn()} 
      />
    );
    // El botón de confirmación tiene el texto "CONFIRMAR" por defecto
    fireEvent.click(screen.getByRole('button', { name: /CONFIRMAR/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('Llama onCancel al hacer click en cancelar', () => {
    const onCancel = vi.fn();
    render(
      <ConfirmModal 
        isOpen={true} 
        message="?" 
        onConfirm={vi.fn()} 
        onCancel={onCancel} 
      />
    );
    // El botón de cancelar tiene el texto "CANCELAR" por defecto
    fireEvent.click(screen.getByRole('button', { name: /CANCELAR/i }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('onConfirm NO se llama al hacer click en cancelar', () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(
      <ConfirmModal 
        isOpen={true} 
        message="?" 
        onConfirm={onConfirm} 
        onCancel={onCancel} 
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /CANCELAR/i }));
    expect(onConfirm).toHaveBeenCalledTimes(0);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
