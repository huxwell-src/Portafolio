import React, { useState } from 'react';
import GlassInput, { GlassSelect } from './ui/GlassInput';
import Btn from './ui/Btn';

const JobForm = ({ initialData = {}, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    company: initialData.company || '',
    position: initialData.position || '',
    industry: initialData.industry || '',
    job_url: initialData.job_url || '',
    applied_date: initialData.applied_date || new Date().toISOString().split('T')[0],
    status: initialData.status || 'applied',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.company) newErrors.company = 'EMPRESA REQUERIDA';
    if (!formData.position) newErrors.position = 'CARGO REQUERIDO';
    if (formData.job_url && !formData.job_url.startsWith('http')) {
      newErrors.job_url = 'URL NO VÁLIDA';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const statusOptions = [
    { value: 'applied', label: 'POSTULADO' },
    { value: 'interview', label: 'ENTREVISTA' },
    { value: 'technical', label: 'PRUEBA TÉCNICA' },
    { value: 'offer', label: 'OFERTA' },
    { value: 'rejected', label: 'RECHAZADO' },
    { value: 'discarded', label: 'DESCARTADO' },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <GlassInput
          label="EMPRESA"
          name="company"
          value={formData.company}
          onChange={handleChange}
          error={errors.company}
          placeholder="Ej: Globant"
        />
        <GlassInput
          label="CARGO"
          name="position"
          value={formData.position}
          onChange={handleChange}
          error={errors.position}
          placeholder="Ej: Senior Frontend"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <GlassInput
          label="INDUSTRIA / RUBRO"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          placeholder="Ej: Fintech"
        />
        <GlassInput
          label="URL DE OFERTA"
          name="job_url"
          value={formData.job_url}
          onChange={handleChange}
          error={errors.job_url}
          placeholder="https://..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <GlassInput
          label="FECHA DE POSTULACIÓN"
          name="applied_date"
          type="date"
          value={formData.applied_date}
          onChange={handleChange}
          required
        />
        <GlassSelect
          label="ESTADO INICIAL"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={statusOptions}
          required
        />
      </div>

      <div className="flex justify-end mt-4">
        <Btn type="submit" loading={loading} className="w-full sm:w-auto">
          {initialData.id ? 'GUARDAR CAMBIOS' : 'CREAR POSTULACIÓN'}
        </Btn>
      </div>
    </form>
  );
};

export default JobForm;
