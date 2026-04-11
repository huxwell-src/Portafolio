import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { pageVariants } from '../motion/variants';
import GlassCard from '../components/ui/GlassCard';
import GlassInput from '../components/ui/GlassInput';
import Btn from '../components/ui/Btn';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('LAS CONTRASEÑAS NO COINCIDEN');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate('/login');
    } catch (err) {
      setError('ERROR AL REGISTRAR. INTENTA CON OTRO USUARIO.');
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
            NUEVA <span className="text-violet">CUENTA</span>
          </h1>
          <p className="font-mono text-[10px] text-text-muted mt-2 uppercase tracking-widest">
            Empieza a traquear tu éxito hoy
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <GlassInput
            label="USUARIO"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Tu nombre de usuario"
            required
            autoComplete="username"
          />
          <GlassInput
            label="EMAIL"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            required
            autoComplete="email"
          />
          <GlassInput
            label="CONTRASEÑA"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            autoComplete="new-password"
          />
          <GlassInput
            label="CONFIRMAR CONTRASEÑA"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
            autoComplete="new-password"
          />

          {error && (
            <div className="p-3 rounded-lg bg-rejected-light border border-rejected-border font-mono text-[10px] text-rejected-color uppercase text-center">
              {error}
            </div>
          )}

          <Btn type="submit" loading={loading} className="w-full">
            CREAR CUENTA
          </Btn>
        </form>

        <div className="mt-8 pt-8 border-t border-glass-border text-center">
          <p className="font-mono text-[11px] text-text-muted">
            ¿YA TIENES CUENTA?{' '}
            <Link to="/login" className="text-violet font-bold hover:underline">
              INICIA SESIÓN
            </Link>
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default Register;
