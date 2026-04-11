import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { navActiveSpring } from '../motion/variants';

const Navbar = ({ onNewJob }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'DASHBOARD' },
    { to: '/jobs', label: 'MIS POSTULACIONES' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-nav sticky top-0 z-[50] h-[58px] px-6 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--violet)] to-[var(--indigo)] flex items-center justify-center font-display font-extrabold text-white text-sm">
            JT
          </div>
          <span className="font-display font-extrabold text-sm tracking-tight text-text">
            JobTracker
          </span>
        </NavLink>

        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative px-3 py-1.5 font-display font-bold text-[13px] transition-colors ${
                  isActive ? 'text-violet' : 'text-text-muted hover:text-text'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-violet-light rounded-[10px] -z-10"
                      transition={navActiveSpring}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onNewJob}
          className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-violet-light text-violet font-display font-bold text-[12px] rounded-[10px] hover:bg-violet-mid transition-all"
        >
          <span className="text-sm">+</span> NUEVA
        </button>

        <div className="w-[1px] h-4 bg-glass-border mx-1" />

        <div className="flex items-center gap-3">
          <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-pastel-lavender to-pastel-lilac flex items-center justify-center font-display font-bold text-violet text-sm uppercase">
            {user?.username?.charAt(0) || 'U'}
          </div>
          <button 
            onClick={handleLogout}
            className="font-mono text-[10px] text-text-muted hover:text-rejected-color transition-colors uppercase"
          >
            SALIR
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
