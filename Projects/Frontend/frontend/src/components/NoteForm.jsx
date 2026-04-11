import React, { useState } from 'react';
import GlassInput from './ui/GlassInput';
import Btn from './ui/Btn';

const NoteForm = ({ onSubmit, loading = false }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await onSubmit(content);
      setContent('');
    } catch (err) {
      // Error handled by parent
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <GlassInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Agrega una nota, contacto o próximo paso..."
        className="flex-1"
        disabled={loading}
      />
      <Btn 
        type="submit" 
        loading={loading} 
        disabled={!content.trim()}
        className="px-4 py-2 text-[10px] font-mono"
      >
        AGREGAR
      </Btn>
    </form>
  );
};

export default NoteForm;
