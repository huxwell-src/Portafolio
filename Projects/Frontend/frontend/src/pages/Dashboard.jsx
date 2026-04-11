import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useStats from '../hooks/useStats';
import { pageVariants, listContainer, listItem, fadeVariants } from '../motion/variants';
import StatCard from '../components/StatCard';
import FunnelChart from '../components/FunnelChart';
import TimelineChart from '../components/TimelineChart';
import SkeletonCard from '../components/ui/SkeletonCard';
import EmptyState from '../components/ui/EmptyState';
import Btn from '../components/ui/Btn';
import jobService from '../services/jobService';

const Dashboard = ({ onNewJob }) => {
  const { stats, timeline, loading, error } = useStats();
  const navigate = useNavigate();

  const handleExport = async () => {
    try {
      await jobService.exportCsv();
    } catch (err) {
      console.error('Error exporting CSV:', err);
    }
  };

  if (error) {
    return (
      <div className="p-10 text-center">
        <p className="text-rejected-color font-mono text-xs uppercase">{error}</p>
      </div>
    );
  }

  const isEmpty = !loading && stats?.total === 0;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-6 md:p-10 max-w-7xl mx-auto"
    >
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-2 block">
            RESUMEN DE ACTIVIDAD
          </span>
          <h1 className="text-text leading-tight">
            TU BÚSQUEDA <span className="text-violet">EN CIFRAS</span>
          </h1>
        </div>
        <div className="flex gap-3">
          <Btn variant="ghost" onClick={handleExport} disabled={isEmpty}>
            EXPORTAR CSV
          </Btn>
          <Btn onClick={onNewJob}>
            + NUEVA POSTULACIÓN
          </Btn>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            variants={listContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div key={i} variants={listItem}>
                <SkeletonCard variant="stat" />
              </motion.div>
            ))}
          </motion.div>
        ) : isEmpty ? (
          <motion.div key="empty" variants={fadeVariants} initial="initial" animate="animate">
            <EmptyState
              icon="→"
              title="TU BÚSQUEDA EMPIEZA AQUÍ"
              description="Aún no tienes postulaciones registradas. Cada oportunidad cuenta."
              actionLabel="+ Agregar primera postulación"
              onAction={onNewJob}
              className="mb-10"
            />
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            variants={listContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              <motion.div variants={listItem}>
                <StatCard 
                  title="TOTAL POSTULACIONES" 
                  value={stats.total} 
                  color="violet" 
                />
              </motion.div>
              <motion.div variants={listItem}>
                <StatCard 
                  title="TASA DE RESPUESTA" 
                  value={`${stats.response_rate}%`} 
                  color="blue"
                  subtitle="Basado en entrevistas"
                />
              </motion.div>
              <motion.div variants={listItem}>
                <StatCard 
                  title="ENTREVISTAS ACTIVAS" 
                  value={stats.by_status?.interview || 0} 
                  color="orange" 
                />
              </motion.div>
              <motion.div variants={listItem}>
                <StatCard 
                  title="ÚLTIMOS 7 DÍAS" 
                  value={stats.applied_last_7_days} 
                  color="green" 
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <motion.div variants={listItem}>
                <FunnelChart data={stats.by_status} />
              </motion.div>
              <motion.div variants={listItem}>
                <TimelineChart data={timeline} />
              </motion.div>
            </div>

            <motion.div variants={listItem} className="flex justify-center">
              <Btn variant="ghost" onClick={() => navigate('/jobs')} className="font-bold">
                VER TODAS LAS POSTULACIONES →
              </Btn>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;
