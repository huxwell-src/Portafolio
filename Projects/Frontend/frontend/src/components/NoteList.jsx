import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { listContainer, listItem } from '../motion/variants';
import GlassCard from './ui/GlassCard';
import EmptyState from './ui/EmptyState';

const NoteList = ({ notes = [], onDelete, loadingId = null }) => {
  if (notes.length === 0) {
    return (
      <EmptyState
        icon="✎"
        title="SIN NOTAS AÚN"
        description="Agrega contexto, contactos o próximos pasos."
        className="py-12"
      />
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <motion.div
      variants={listContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-3"
    >
      <AnimatePresence>
        {notes.map((note) => (
          <motion.div 
            key={note.id} 
            variants={listItem}
            layout
            exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
          >
            <GlassCard 
              className="p-4 flex justify-between items-start" 
              hover={false}
            >
              <div className="flex-1 pr-4">
                <p className="font-mono text-[13px] text-text mb-2">
                  {note.content}
                </p>
                <span className="font-mono text-[9px] text-text-dim uppercase">
                  {formatDate(note.created_at)}
                </span>
              </div>
              <button
                onClick={() => onDelete(note.id)}
                className="text-text-dim hover:text-rejected-color transition-colors p-1"
                disabled={loadingId === note.id}
              >
                {loadingId === note.id ? (
                   <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                   </svg>
                ) : (
                  <span className="font-mono text-xs">×</span>
                )}
              </button>
            </GlassCard>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default NoteList;
