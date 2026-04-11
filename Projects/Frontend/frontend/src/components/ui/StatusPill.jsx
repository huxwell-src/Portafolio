import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pillSwap } from '../../motion/variants';

const STATUS_MAP = {
  applied: { label: 'POSTULADO', color: 'var(--applied-color)', light: 'var(--applied-light)', border: 'var(--applied-border)' },
  interview: { label: 'ENTREVISTA', color: 'var(--interview-color)', light: 'var(--interview-light)', border: 'var(--interview-border)' },
  technical: { label: 'PRUEBA TÉCNICA', color: 'var(--technical-color)', light: 'var(--technical-light)', border: 'var(--technical-border)' },
  offer: { label: 'OFERTA', color: 'var(--offer-color)', light: 'var(--offer-light)', border: 'var(--offer-border)' },
  rejected: { label: 'RECHAZADO', color: 'var(--rejected-color)', light: 'var(--rejected-light)', border: 'var(--rejected-border)' },
  discarded: { label: 'DESCARTADO', color: 'var(--discarded-color)', light: 'var(--discarded-light)', border: 'var(--discarded-border)' },
};

const StatusPill = ({ status }) => {
  const config = STATUS_MAP[status] || STATUS_MAP.applied;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        variants={pillSwap}
        initial="initial"
        animate="animate"
        exit="exit"
        data-testid="status-pill"
        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-badge border font-mono text-[9px] font-medium uppercase tracking-wider"
        style={{
          backgroundColor: config.light,
          borderColor: config.border,
          color: config.color,
        }}
      >
        <span 
          className="w-1.5 h-1.5 rounded-full" 
          style={{ backgroundColor: config.color }} 
        />
        {config.label}
      </motion.div>
    </AnimatePresence>
  );
};

export default StatusPill;
