import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import StatusBadge from './StatusBadge';
import { cardHoverReveal } from '../motion/variants';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const statusColors = {
    applied: 'var(--applied-color)',
    interview: 'var(--interview-color)',
    technical: 'var(--technical-color)',
    offer: 'var(--offer-color)',
    rejected: 'var(--rejected-color)',
    discarded: 'var(--discarded-color)',
  };

  return (
    <GlassCard 
      className="p-5 flex flex-col h-full group relative overflow-hidden cursor-pointer"
      style={{ borderTop: `2px solid ${statusColors[job.status] || 'transparent'}` }}
      onClick={() => navigate(`/jobs/${job.id}`)}
    >
      <div className="flex justify-between items-start mb-4">
        <StatusBadge status={job.status} />
        <span className="font-mono text-[9px] text-text-dim uppercase">
          {formatDate(job.applied_date)}
        </span>
      </div>

      <h3 className="font-display font-bold text-sm text-text mb-1 leading-tight group-hover:text-violet transition-colors">
        {job.company}
      </h3>
      
      <p className="font-display text-[13px] text-text-muted font-medium mb-3">
        {job.position}
      </p>

      {job.industry && (
        <div className="mt-auto flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-text-dim" />
          <span className="font-mono text-[11px] text-text-muted uppercase tracking-tight">
            {job.industry}
          </span>
        </div>
      )}

      <motion.div 
        variants={cardHoverReveal}
        initial="initial"
        whileHover="hover"
        className="absolute bottom-5 right-5 font-mono text-[10px] text-violet uppercase font-bold flex items-center gap-1"
      >
        ver detalle <span className="text-xs">→</span>
      </motion.div>
    </GlassCard>
  );
};

export default JobCard;
