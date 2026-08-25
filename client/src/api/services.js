import apiClient from './apiClient';

// Profile
export const profileAPI = {
  get: () => apiClient.get('/profile'),
  update: (data) => apiClient.put('/profile', data),
  uploadResume: (formData) => apiClient.put('/profile/resume', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  uploadImage: (formData) => apiClient.put('/profile/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

// Journey
export const journeyAPI = {
  getAll: () => apiClient.get('/journey'),
  create: (data) => apiClient.post('/journey', data),
  update: (id, data) => apiClient.put(`/journey/${id}`, data),
  delete: (id) => apiClient.delete(`/journey/${id}`),
};

// Skills
export const skillsAPI = {
  getAll: () => apiClient.get('/skills'),
  create: (data) => apiClient.post('/skills', data),
  update: (id, data) => apiClient.put(`/skills/${id}`, data),
  delete: (id) => apiClient.delete(`/skills/${id}`),
};

// Projects
export const projectsAPI = {
  getAll: (params) => apiClient.get('/projects', { params }),
  getBySlug: (slug) => apiClient.get(`/projects/${slug}`),
  create: (data) => apiClient.post('/projects', data),
  update: (id, data) => apiClient.put(`/projects/${id}`, data),
  delete: (id) => apiClient.delete(`/projects/${id}`),
  uploadImages: (id, formData) => apiClient.put(`/projects/${id}/images`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

// Experience
export const experienceAPI = {
  getAll: () => apiClient.get('/experience'),
  create: (data) => apiClient.post('/experience', data),
  update: (id, data) => apiClient.put(`/experience/${id}`, data),
  delete: (id) => apiClient.delete(`/experience/${id}`),
};

// Education
export const educationAPI = {
  getAll: () => apiClient.get('/education'),
  create: (data) => apiClient.post('/education', data),
  update: (id, data) => apiClient.put(`/education/${id}`, data),
  delete: (id) => apiClient.delete(`/education/${id}`),
};

// Certifications
export const certificationsAPI = {
  getAll: () => apiClient.get('/certifications'),
  create: (data) => apiClient.post('/certifications', data),
  update: (id, data) => apiClient.put(`/certifications/${id}`, data),
  delete: (id) => apiClient.delete(`/certifications/${id}`),
  uploadImage: (id, formData) => apiClient.put(`/certifications/${id}/image`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

// Contact
export const contactAPI = {
  submit: (data) => apiClient.post('/contact', data),
  getAll: (params) => apiClient.get('/contact', { params }),
  update: (id, data) => apiClient.put(`/contact/${id}`, data),
  delete: (id) => apiClient.delete(`/contact/${id}`),
};

// Settings
export const settingsAPI = {
  get: () => apiClient.get('/settings'),
  update: (data) => apiClient.put('/settings', data),
  getDashboard: () => apiClient.get('/settings/dashboard'),
};
