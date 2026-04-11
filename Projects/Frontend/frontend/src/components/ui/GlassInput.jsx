import React from 'react';

const GlassInput = ({ label, error, className = '', id, ...props }) => {
  const inputId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined);
  return (
    <div className={`w-full ${className}`}>
      {label && <label htmlFor={inputId} className="input-label">{label}</label>}
      <input
        id={inputId}
        className={`glass-input ${error ? 'error' : ''}`}
        {...props}
      />
      {error && (
        <span className="font-mono text-[10px] text-rejected-color mt-1 block uppercase">
          {error}
        </span>
      )}
    </div>
  );
};

export const GlassSelect = ({ label, error, options = [], className = '', id, ...props }) => {
  const selectId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined);
  return (
    <div className={`w-full ${className}`}>
      {label && <label htmlFor={selectId} className="input-label">{label}</label>}
      <select
        id={selectId}
        className={`glass-input appearance-none ${error ? 'error' : ''}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="font-mono text-[10px] text-rejected-color mt-1 block uppercase">
          {error}
        </span>
      )}
    </div>
  );
};

export default GlassInput;
