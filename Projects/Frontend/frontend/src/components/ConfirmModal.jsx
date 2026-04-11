import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { overlayVariants, modalVariants } from '../motion/variants';
import Btn from './ui/Btn';

const ConfirmModal = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  message, 
  title = "CONFIRMAR ACCIÓN",
  confirmLabel = "CONFIRMAR",
  cancelLabel = "CANCELAR",
  loading = false 
}) => {
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
            onClick={onCancel}
          />
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="glass-modal w-full max-w-[420px] p-8 z-10"
          >
            <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted mb-4">
              {title}
            </h3>
            <p className="font-display font-bold text-lg text-text mb-8 leading-tight">
              {message}
            </p>
            <div className="flex gap-3">
              <Btn 
                variant="ghost" 
                className="flex-1" 
                onClick={onCancel}
                disabled={loading}
              >
                {cancelLabel}
              </Btn>
              <Btn 
                variant="destructive" 
                className="flex-1" 
                onClick={onConfirm}
                loading={loading}
              >
                {confirmLabel}
              </Btn>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
