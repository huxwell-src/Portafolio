import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useJobs from '../hooks/useJobs';
import { pageVariants, listContainer, listItem, fadeVariants } from '../motion/variants';
import JobCard from '../components/JobCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import EmptyState from '../components/ui/EmptyState';
import GlassInput, { GlassSelect } from '../components/ui/GlassInput';
import Btn from '../components/ui/Btn';

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const JobList = ({ onNewJob }) => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    industry: '',
  });

  const { jobs, loading, fetchJobs } = useJobs();

  // Debounced fetch
  const debouncedFetch = useCallback(
    debounce((params) => {
      fetchJobs(params);
    }, 300),
    [fetchJobs]
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    
    // Si es búsqueda, usamos debounce
    if (name === 'search') {
      debouncedFetch(newFilters);
    } else {
      // Para selectores, fetch inmediato
      fetchJobs(newFilters);
    }
  };

  const clearFilters = () => {
    const defaultFilters = { search: '', status: '', industry: '' };
    setFilters(defaultFilters);
    fetchJobs(defaultFilters);
  };

  const statusOptions = [
    { value: '', label: 'TODOS LOS ESTADOS' },
    { value: 'applied', label: 'POSTULADO' },
    { value: 'interview', label: 'ENTREVISTA' },
    { value: 'technical', label: 'PRUEBA TÉCNICA' },
    { value: 'offer', label: 'OFERTA' },
    { value: 'rejected', label: 'RECHAZADO' },
    { value: 'discarded', label: 'DESCARTADO' },
  ];

  const industryOptions = [
    { value: '', label: 'TODAS LAS INDUSTRIAS' },
    ...Array.from(new Set(jobs.map(j => j.industry).filter(Boolean))).map(i => ({ value: i, label: i.toUpperCase() }))
  ];

  const hasActiveFilters = filters.search || filters.status || filters.industry;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-6 md:p-10 max-w-7xl mx-auto"
    >
      <header className="mb-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-2 block">
          MI HISTORIAL
        </span>
        <h1 className="text-text leading-tight mb-8">
          GESTIONA TUS <span className="text-violet">POSTULACIONES</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <GlassInput
            name="search"
            label="BUSCAR"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="BUSCAR POR EMPRESA O CARGO..."
            className="md:col-span-1"
          />
          <GlassSelect
            name="status"
            label="ESTADO"
            value={filters.status}
            onChange={handleFilterChange}
            options={statusOptions}
          />
          <GlassSelect
            name="industry"
            label="INDUSTRIA"
            value={filters.industry}
            onChange={handleFilterChange}
            options={industryOptions}
          />
        </div>
      </header>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            variants={listContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div key={i} variants={listItem}>
                <SkeletonCard variant="job" />
              </motion.div>
            ))}
          </motion.div>
        ) : jobs.length === 0 ? (
          <motion.div key="empty" variants={fadeVariants} initial="initial" animate="animate">
            <EmptyState
              icon={hasActiveFilters ? "!" : "→"}
              title={hasActiveFilters ? "SIN RESULTADOS" : "HISTORIAL VACÍO"}
              description={
                hasActiveFilters 
                  ? "Ninguna postulación coincide con los filtros aplicados." 
                  : "Registra tu primera postulación y empieza a hacer seguimiento."
              }
              actionLabel={hasActiveFilters ? "LIMPIAR FILTROS" : "+ NUEVA POSTULACIÓN"}
              onAction={hasActiveFilters ? clearFilters : onNewJob}
            />
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            variants={listContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {jobs.map((job) => (
              <motion.div key={job.id} variants={listItem}>
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={onNewJob}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-violet text-white shadow-xl shadow-violet-glow flex items-center justify-center text-3xl font-bold hover:scale-110 active:scale-95 transition-all z-40"
      >
        +
      </button>
    </motion.div>
  );
};

export default JobList;
