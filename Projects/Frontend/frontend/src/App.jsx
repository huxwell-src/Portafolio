import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';
import NewJobModal from './components/NewJobModal';
import jobService from './services/jobService';
import { ToastContainer } from './components/ui/Toast';

const AppContent = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCreateJob = async (data) => {
    setModalLoading(true);
    try {
      const newJob = await jobService.createJob(data);
      setShowNewJobModal(false);
      addToast('POSTULACIÓN CREADA CON ÉXITO');
      // Si estamos en dashboard o joblist, esto forzará un refresh si usamos un context o refresh manual
      // En este caso, el usuario puede navegar al detalle o el componente se refrescará al montar
      window.location.href = `/jobs/${newJob.id}`;
    } catch (err) {
      addToast('ERROR AL CREAR LA POSTULACIÓN', 'error');
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Environmental Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />

      {user && <Navbar onNewJob={() => setShowNewJobModal(true)} />}

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard onNewJob={() => setShowNewJobModal(true)} />
              </PrivateRoute>
            } />
            
            <Route path="/jobs" element={
              <PrivateRoute>
                <JobList onNewJob={() => setShowNewJobModal(true)} />
              </PrivateRoute>
            } />
            
            <Route path="/jobs/:id" element={
              <PrivateRoute>
                <JobDetail />
              </PrivateRoute>
            } />

            {/* Redirigir cualquier otra ruta al Dashboard o Login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      <NewJobModal
        isOpen={showNewJobModal}
        onClose={() => setShowNewJobModal(false)}
        onSubmit={handleCreateJob}
        loading={modalLoading}
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
