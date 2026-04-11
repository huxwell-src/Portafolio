import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { overlayVariants, modalVariants } from '../motion/variants';
import JobForm from './JobForm';

const NewJobModal = ({ isOpen, onClose, onSubmit, loading = false }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 bg-[#0F0F23]/45 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="glass-modal w-full max-w-[580px] p-8 z-10 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-1 block">
                  NUEVA POSTULACIÓN
                </span>
                <h2 className="font-display font-extrabold text-2xl text-text leading-tight">
                  EL SIGUIENTE PASO <span className="text-violet">EMPIEZA AQUÍ</span>
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="text-text-dim hover:text-rejected-color transition-colors p-1"
                disabled={loading}
              >
                <span className="font-mono text-2xl">×</span>
              </button>
            </div>

            <JobForm onSubmit={onSubmit} loading={loading} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewJobModal;
