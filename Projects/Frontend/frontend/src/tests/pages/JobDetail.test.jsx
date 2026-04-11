import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../utils';
import JobDetail from '../../pages/JobDetail';
import jobService from '../../services/jobService';
import { mockJobs, mockPredict } from '../mocks/jobService.mock';
import { Routes, Route } from 'react-router-dom';

vi.mock('../../services/jobService');

const renderJobDetail = (id = "1") => {
  return renderWithProviders(
    <Routes>
      <Route path="/jobs/:id" element={<JobDetail />} />
    </Routes>,
    { route: `/jobs/${id}` }
  );
};

describe('JobDetail Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Muestra los datos del job', async () => {
    jobService.getJob.mockResolvedValue(mockJobs[0]);
    jobService.getPredict.mockResolvedValue(mockPredict);
    
    renderJobDetail("1");
    
    const company = await screen.findByTestId('job-company');
    expect(company).toHaveTextContent(/Globant/i);
    
    expect(screen.getByTestId('job-position')).toHaveTextContent(/Senior Frontend Developer/i);
    expect(screen.getByText(/Fintech/i)).toBeInTheDocument();
  });

  it('Muestra la predicción con score y label', async () => {
    jobService.getJob.mockResolvedValue(mockJobs[0]);
    jobService.getPredict.mockResolvedValue(mockPredict);
    
    renderJobDetail("1");
    
    await waitFor(() => {
      expect(screen.getByText(/70%/i)).toBeInTheDocument();
      expect(screen.getByText(/Buenas chances/i)).toBeInTheDocument();
      expect(screen.getByText(/Tienes notas registradas/i)).toBeInTheDocument();
    });
  });

  it('Muestra el historial de cambios de estado', async () => {
    jobService.getJob.mockResolvedValue(mockJobs[0]);
    jobService.getPredict.mockResolvedValue(mockPredict);
    
    renderJobDetail("1");
    
    await waitFor(() => {
      // Globant mock tiene 2 entradas en history
      expect(screen.getAllByTestId('history-item').length).toBe(2);
    });
  });

  it('Cambio de estado llama a patchJob con el nuevo estado', async () => {
    jobService.getJob.mockResolvedValue(mockJobs[0]);
    jobService.getPredict.mockResolvedValue(mockPredict);
    jobService.patchJob.mockResolvedValue({ ...mockJobs[0], status: 'technical' });
    
    renderJobDetail("1");
    
    await waitFor(() => screen.getByLabelText(/ACTUALIZAR ESTADO/i));
    
    const statusSelect = screen.getByLabelText(/ACTUALIZAR ESTADO/i);
    fireEvent.change(statusSelect, { target: { value: 'technical' } });
    
    expect(jobService.patchJob).toHaveBeenCalledWith("1", { status: 'technical' });
  });

  it('Agregar nota llama a addNote con el contenido correcto', async () => {
    jobService.getJob.mockResolvedValue(mockJobs[0]);
    jobService.getPredict.mockResolvedValue(mockPredict);
    jobService.addNote.mockResolvedValue({ id: 99, content: 'Nota de prueba', created_at: new Date().toISOString() });
    
    renderJobDetail("1");
    
    await waitFor(() => screen.getByPlaceholderText(/Agrega una nota/i));
    
    const noteInput = screen.getByPlaceholderText(/Agrega una nota/i);
    fireEvent.change(noteInput, { target: { value: 'Hablar con el recruiter' } });
    fireEvent.click(screen.getByRole('button', { name: /AGREGAR/i }));
    
    expect(jobService.addNote).toHaveBeenCalledWith("1", 'Hablar con el recruiter');
  });

  it('Eliminar job abre el ConfirmModal', async () => {
    jobService.getJob.mockResolvedValue(mockJobs[0]);
    jobService.getPredict.mockResolvedValue(mockPredict);
    
    renderJobDetail("1");
    
    await waitFor(() => screen.getByRole('button', { name: /ELIMINAR POSTULACIÓN/i }));
    
    fireEvent.click(screen.getByRole('button', { name: /ELIMINAR POSTULACIÓN/i }));
    
    expect(screen.getByText(/¿ESTÁS SEGURO DE QUE DESEAS ELIMINAR/i)).toBeInTheDocument();
  });

  it('Confirmar eliminación llama a deleteJob', async () => {
    jobService.getJob.mockResolvedValue(mockJobs[0]);
    jobService.getPredict.mockResolvedValue(mockPredict);
    jobService.deleteJob.mockResolvedValue({});
    
    renderJobDetail("1");
    
    await waitFor(() => screen.getByRole('button', { name: /ELIMINAR POSTULACIÓN/i }));
    
    fireEvent.click(screen.getByRole('button', { name: /ELIMINAR POSTULACIÓN/i }));
    fireEvent.click(screen.getByRole('button', { name: /CONFIRMAR/i }));
    
    expect(jobService.deleteJob).toHaveBeenCalledWith("1");
  });
});
