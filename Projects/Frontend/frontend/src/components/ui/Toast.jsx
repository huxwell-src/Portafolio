import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toastVariants } from '../../motion/variants';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <motion.div
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`fixed top-6 right-6 z-[999] glass-card px-5 py-3.5 border-l-[3px] shadow-lg max-w-[320px] ${
        type === 'error' ? 'border-l-rejected-color' : 'border-l-violet'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-text-muted select-none">
          {type === 'error' ? '!' : '✓'}
        </span>
        <p className="font-mono text-xs text-text leading-tight">
          {message}
        </p>
      </div>
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-0 right-0 p-6 pointer-events-none z-[999]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
