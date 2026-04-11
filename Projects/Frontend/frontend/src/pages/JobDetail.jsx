import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import jobService from '../services/jobService';
import { pageVariants, listContainer, listItem, fadeVariants } from '../motion/variants';
import GlassCard from '../components/ui/GlassCard';
import StatusBadge from '../components/StatusBadge';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import ConfirmModal from '../components/ConfirmModal';
import Btn from '../components/ui/Btn';
import { GlassSelect } from '../components/ui/GlassInput';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [noteLoading, setNoteLoading] = useState(false);
  const [noteDeleteLoadingId, setNoteDeleteLoadingId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobData, predictionData] = await Promise.all([
        jobService.getJob(id),
        jobService.getPredict(id),
      ]);
      setJob(jobData);
      setPrediction(predictionData);
    } catch (err) {
      setError('No se pudo cargar la información de la postulación.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const updatedJob = await jobService.patchJob(id, { status: newStatus });
      setJob(updatedJob);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleAddNote = async (content) => {
    setNoteLoading(true);
    try {
      const newNote = await jobService.addNote(id, content);
      setJob(prev => ({ ...prev, notes: [newNote, ...prev.notes] }));
    } finally {
      setNoteLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    setNoteDeleteLoadingId(noteId);
    try {
      await jobService.deleteNote(id, noteId);
      setJob(prev => ({ ...prev, notes: prev.notes.filter(n => n.id !== noteId) }));
    } finally {
      setNoteDeleteLoadingId(null);
    }
  };

  const handleDeleteJob = async () => {
    try {
      await jobService.deleteJob(id);
      navigate('/jobs');
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  if (loading) {
    return (
      <div className="p-10 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 rounded-xl bg-violet animate-pulse mb-4" />
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest animate-pulse">
          CARGANDO DETALLE...
        </p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="p-10 text-center">
        <p className="text-rejected-color font-mono text-xs uppercase mb-4">{error || 'Postulación no encontrada'}</p>
        <Btn variant="ghost" onClick={() => navigate('/jobs')}>VOLVER A MIS POSTULACIONES</Btn>
      </div>
    );
  }

  const statusOptions = [
    { value: 'applied', label: 'POSTULADO' },
    { value: 'interview', label: 'ENTREVISTA' },
    { value: 'technical', label: 'PRUEBA TÉCNICA' },
    { value: 'offer', label: 'OFERTA' },
    { value: 'rejected', label: 'RECHAZADO' },
    { value: 'discarded', label: 'DESCARTADO' },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-6 md:p-10 max-w-7xl mx-auto"
    >
      <header className="mb-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <StatusBadge status={job.status} />
            <span className="font-mono text-[10px] text-text-dim uppercase tracking-wider">
              {new Date(job.applied_date).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-text leading-tight mb-2" data-testid="job-company">
            {job.company}
          </h1>
          <p className="font-display text-xl font-bold text-violet mb-4" data-testid="job-position">
            {job.position}
          </p>
          {job.industry && (
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-text-dim" />
              <span className="font-mono text-xs text-text-muted uppercase tracking-tight">
                {job.industry}
              </span>
            </div>
          )}
          {job.job_url && (
            <a 
              href={job.job_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-violet transition-colors uppercase font-bold"
            >
              VER OFERTA ORIGINAL <span className="text-lg">↗</span>
            </a>
          )}
        </div>
        <div className="flex flex-col gap-4 w-full md:w-auto min-w-[200px]">
          <GlassSelect
            label="ACTUALIZAR ESTADO"
            value={job.status}
            onChange={handleStatusChange}
            options={statusOptions}
          />
          <Btn variant="destructive" onClick={() => setIsDeleting(true)} className="w-full">
            ELIMINAR POSTULACIÓN
          </Btn>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="flex flex-col gap-8">
          {/* Predicción */}
          {prediction && (
            <GlassCard className="p-8 border-l-4" style={{ borderLeftColor: 'var(--violet)' }}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-1 block">
                    ANÁLISIS DE IA
                  </span>
                  <h2 className="font-display font-extrabold text-2xl text-text">
                    {prediction.label}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] uppercase text-text-muted mb-1 block">SCORE</span>
                  <span className="font-display font-extrabold text-3xl text-violet">{prediction.score}%</span>
                </div>
              </div>
              
              <div className="w-full h-2 bg-violet-light rounded-full overflow-hidden mb-8">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${prediction.score}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-violet to-indigo"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {prediction.tips?.map((tip, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="text-violet font-bold font-mono text-sm">💡</span>
                    <p className="font-mono text-xs text-text-muted leading-relaxed">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Historial */}
          <section>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted mb-6">
              LÍNEA DE TIEMPO
            </h3>
            <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-violet-light">
              <div className="flex flex-col gap-8">
                {job.history?.map((entry, idx) => (
                  <div key={idx} className="relative" data-testid="history-item">
                    <div className="absolute -left-10 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-violet z-10" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-text-muted uppercase">
                          CAMBIO A
                        </span>
                        <StatusBadge status={entry.to_status} />
                      </div>
                      <span className="font-mono text-[10px] text-text-dim uppercase">
                        {new Date(entry.changed_at).toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Notas Sidebar */}
        <aside className="flex flex-col gap-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
              NOTAS Y SEGUIMIENTO
            </h3>
            <span className="font-mono text-[10px] text-violet font-bold">
              {job.notes?.length || 0}
            </span>
          </div>
          
          <NoteForm onSubmit={handleAddNote} loading={noteLoading} />
          
          <div className="mt-2">
            <NoteList 
              notes={job.notes} 
              onDelete={handleDeleteNote} 
              loadingId={noteDeleteLoadingId} 
            />
          </div>
        </aside>
      </div>

      <ConfirmModal
        isOpen={isDeleting}
        onCancel={() => setIsDeleting(false)}
        onConfirm={handleDeleteJob}
        message="¿ESTÁS SEGURO DE QUE DESEAS ELIMINAR ESTA POSTULACIÓN? ESTA ACCIÓN NO SE PUEDE DESHACER."
      />
    </motion.div>
  );
};

export default JobDetail;
