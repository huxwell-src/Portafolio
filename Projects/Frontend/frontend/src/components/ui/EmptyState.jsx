import React from 'react';
import GlassCard from './GlassCard';
import Btn from './Btn';

const EmptyState = ({ 
  icon = '→', 
  title, 
  description, 
  actionLabel, 
  onAction,
  className = '' 
}) => {
  return (
    <GlassCard 
      className={`flex flex-col items-center justify-center text-center p-14 ${className}`}
      hover={false}
      data-testid="empty-state"
    >
      <span className="text-5xl mb-6 text-pastel-lavender/60 select-none">
        {icon}
      </span>
      <h3 className="text-lg font-extrabold mb-3 uppercase tracking-tight">
        {title}
      </h3>
      <p className="font-mono text-[11px] text-text-muted mb-8 max-w-[320px]">
        {description}
      </p>
      {actionLabel && (
        <Btn onClick={onAction}>
          {actionLabel}
        </Btn>
      )}
    </GlassCard>
  );
};

export default EmptyState;
