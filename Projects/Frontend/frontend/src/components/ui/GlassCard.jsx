import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      className={`glass-card ${className}`}
      whileHover={hover ? { translateY: -4 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
