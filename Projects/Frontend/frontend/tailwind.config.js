/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        white: '#FFFFFF',
        transparent: 'transparent',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        'text-dim': 'var(--text-dim)',
        violet: 'var(--violet)',
        indigo: 'var(--indigo)',
        'glass-border': 'var(--glass-border)',
        'glass-border-hover': 'var(--glass-border-hover)',
        'violet-glow': 'var(--violet-glow)',
        'violet-light': 'var(--violet-light)',
        'violet-mid': 'var(--violet-mid)',
        'rejected-color': 'var(--rejected-color)',
        'rejected-light': 'var(--rejected-light)',
        'rejected-border': 'var(--rejected-border)',
      },
      borderRadius: {
        'card': '20px',
        'modal': '24px',
        'input': '12px',
        'badge': '8px',
      },
      boxShadow: {
        glass: 'var(--glass-shadow)',
        'glass-hover': 'var(--glass-shadow-hover)',
      },
    },
  },
  plugins: [],
}
