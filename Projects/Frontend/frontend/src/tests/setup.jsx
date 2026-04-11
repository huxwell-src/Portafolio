import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Limpieza automática después de cada test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock de ResizeObserver que usa Recharts
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock de framer-motion para evitar problemas con animaciones en tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  const React = await import('react');
  
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
      button: ({ children, ...props }) => <button {...props}>{children}</button>,
      span: ({ children, ...props }) => <span {...props}>{children}</span>,
      nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
      header: ({ children, ...props }) => <header {...props}>{children}</header>,
      section: ({ children, ...props }) => <section {...props}>{children}</section>,
      article: ({ children, ...props }) => <article {...props}>{children}</article>,
      h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
      h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
      h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
      p: ({ children, ...props }) => <p {...props}>{children}</p>,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
    useSpring: (value) => {
      const [v, setV] = React.useState(value);
      return {
        get: () => v,
        set: (newV) => setV(newV),
        onChange: (cb) => {
          cb(v);
          return () => {};
        },
        on: (event, cb) => {
          if (event === 'change') cb(v);
          return () => {};
        }
      };
    },
    useTransform: (value, transformer) => {
      return {
        get: () => transformer(value.get()),
        onChange: (cb) => {
          cb(transformer(value.get()));
          return () => {};
        },
        on: (event, cb) => {
          if (event === 'change') cb(transformer(value.get()));
          return () => {};
        }
      };
    },
  };
});

// Mock de window.URL.createObjectURL para export CSV
window.URL.createObjectURL = vi.fn();
window.URL.revokeObjectURL = vi.fn();
