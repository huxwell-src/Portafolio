import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { pageVariants } from '../motion/variants';
import GlassCard from '../components/ui/GlassCard';
import GlassInput from '../components/ui/GlassInput';
import Btn from '../components/ui/Btn';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setLoading(true);
    setError('');
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Credenciales inválidas. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center p-6"
    >
      <GlassCard className="w-full max-w-[420px] p-10" hover={false}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet to-indigo flex items-center justify-center font-display font-extrabold text-white text-lg mb-4">
            JT
          </div>
          <h1 className="text-2xl font-extrabold text-text tracking-tight">
            BIENVENIDO DE <span className="text-violet">NUEVO</span>
          </h1>
          <p className="font-mono text-[10px] text-text-muted mt-2 uppercase tracking-widest">
            Ingresa para gestionar tus postulaciones
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <GlassInput
            label="USUARIO"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tu nombre de usuario"
            required
            autoComplete="username"
          />
          <GlassInput
            label="CONTRASEÑA"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />

          {error && (
            <div className="p-3 rounded-lg bg-rejected-light border border-rejected-border font-mono text-[10px] text-rejected-color uppercase text-center">
              {error}
            </div>
          )}

          <Btn type="submit" loading={loading} className="w-full">
            INICIAR SESIÓN
          </Btn>
        </form>

        <div className="mt-8 pt-8 border-t border-glass-border text-center">
          <p className="font-mono text-[11px] text-text-muted">
            ¿NO TIENES CUENTA?{' '}
            <Link to="/register" className="text-violet font-bold hover:underline">
              REGÍSTRATE AQUÍ
            </Link>
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default Login;
