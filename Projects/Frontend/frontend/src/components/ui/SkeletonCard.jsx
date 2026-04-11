import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard = ({ variant = 'job', className = '' }) => {
  const isStat = variant === 'stat';

  return (
    <div 
      className={`glass-card p-5 overflow-hidden ${isStat ? 'h-[140px]' : 'h-[160px]'} ${className}`}
      data-testid="skeleton-card"
    >
      <div className="flex flex-col h-full gap-3">
        {isStat ? (
          <>
            <div className="w-1/3 h-3 bg-violet/10 rounded-full shimmer" />
            <div className="w-2/3 h-10 bg-violet/15 rounded-xl shimmer" />
            <div className="w-1/2 h-3 bg-violet/10 rounded-full shimmer" />
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <div className="w-24 h-5 bg-violet/15 rounded-badge shimmer" />
              <div className="w-16 h-3 bg-violet/10 rounded-full shimmer" />
            </div>
            <div className="w-3/4 h-6 bg-violet/20 rounded-lg shimmer mt-2" />
            <div className="w-1/2 h-4 bg-violet/10 rounded-lg shimmer" />
            <div className="mt-auto flex justify-between">
              <div className="w-20 h-3 bg-violet/10 rounded-full shimmer" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SkeletonCard;
