import React from 'react';
import { motion } from 'framer-motion';
import { buttonTap } from '../../motion/variants';

const Btn = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  loading = false, 
  disabled = false,
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary px-6 py-2.5',
    ghost: 'btn-ghost px-6 py-2.5',
    destructive: 'btn-destructive px-6 py-2.5',
  };

  return (
    <motion.button
      className={`${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      whileTap={!disabled && !loading ? buttonTap.whileTap : {}}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2 justify-center">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          CARGANDO...
        </span>
      ) : children}
    </motion.button>
  );
};

export default Btn;
