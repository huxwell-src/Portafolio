import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import GlassCard from './ui/GlassCard';

const StatCard = ({ title, value, subtitle, color = 'violet' }) => {
  const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;
  const isPercentage = typeof value === 'string' && value.includes('%');
  
  const springValue = useSpring(0, { stiffness: 80, damping: 20 });
  const displayValue = useTransform(springValue, (latest) => 
    isPercentage ? `${latest.toFixed(1)}%` : Math.round(latest).toString()
  );

  const [currentValue, setCurrentValue] = useState("0");

  useEffect(() => {
    springValue.set(numericValue);
  }, [numericValue, springValue]);

  useEffect(() => {
    return displayValue.onChange((v) => setCurrentValue(v));
  }, [displayValue]);

  const colorGradients = {
    violet: 'from-[var(--violet)] to-[var(--indigo)]',
    blue: 'from-[#0284C7] to-[#0EA5E9]',
    orange: 'from-[#D97706] to-[#F59E0B]',
    green: 'from-[#059669] to-[#10B981]',
  };

  return (
    <GlassCard className="flex flex-col p-5 min-w-[140px] flex-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted mb-2">
        {title}
      </span>
      <div className={`metric-value bg-gradient-to-r ${colorGradients[color] || colorGradients.violet}`}>
        {currentValue}
      </div>
      {subtitle && (
        <span className="font-mono text-[10px] text-text-dim mt-1">
          {subtitle}
        </span>
      )}
    </GlassCard>
  );
};

export default StatCard;
