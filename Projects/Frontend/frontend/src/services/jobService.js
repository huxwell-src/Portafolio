import api from './api';

const jobService = {
  getJobs: async (params = {}) => {
    const response = await api.get('/jobs/', { params });
    return response.data;
  },

  getJob: async (id) => {
    const response = await api.get(`/jobs/${id}/`);
    return response.data;
  },

  createJob: async (data) => {
    const response = await api.post('/jobs/', data);
    return response.data;
  },

  updateJob: async (id, data) => {
    const response = await api.put(`/jobs/${id}/`, data);
    return response.data;
  },

  patchJob: async (id, data) => {
    const response = await api.patch(`/jobs/${id}/`, data);
    return response.data;
  },

  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}/`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/jobs/stats/');
    return response.data;
  },

  getStatsByIndustry: async () => {
    const response = await api.get('/jobs/stats/by-industry/');
    return response.data;
  },

  getTimeline: async () => {
    const response = await api.get('/jobs/stats/timeline/');
    return response.data;
  },

  getPredict: async (id) => {
    const response = await api.get(`/jobs/${id}/predict/`);
    return response.data;
  },

  exportCsv: async () => {
    const response = await api.get('/jobs/export/csv/', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'jobs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return response.data;
  },

  addNote: async (jobId, content) => {
    const response = await api.post(`/jobs/${jobId}/notes/`, { content });
    return response.data;
  },

  deleteNote: async (jobId, noteId) => {
    const response = await api.delete(`/jobs/${jobId}/notes/${noteId}/`);
    return response.data;
  }
};

export default jobService;
