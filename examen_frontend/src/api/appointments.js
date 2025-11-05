// src/api/appointments.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/appointments';

// 💡 Configuración de la instancia de Axios con Interceptor
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para incluir el token en cada solicitud
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});


// --- ENDPOINTS CRUD ---

/**
 * GET /api/appointments — Listar todas las citas.
 */
export const getAppointments = async () => {
  try {
    const response = await api.get('/');
    return response.data; // Debería devolver un array de citas
  } catch (error) {
    throw new Error('Error al listar citas: ' + (error.response?.data?.message || 'Error de red.'));
  }
};

/**
 * POST /api/appointments — Crear nueva cita.
 */
export const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/', appointmentData);
    return response.data; // La cita creada
  } catch (error) {
    // El backend realiza validaciones de conflicto
    throw new Error('Error al crear cita: ' + (error.response?.data?.message || 'Conflicto de horario o datos incompletos.'));
  }
};

/**
 * PUT /api/appointments/:id — Actualizar cita.
 */
export const updateAppointment = async (id, appointmentData) => {
  try {
    const response = await api.put(`/${id}`, appointmentData);
    return response.data; // La cita actualizada
  } catch (error) {
    throw new Error('Error al actualizar cita: ' + (error.response?.data?.message || 'Error de red.'));
  }
};

/**
 * POST /api/appointments/:id/cancel — Cancelar cita.
 */
export const cancelAppointment = async (id) => {
  try {
    const response = await api.post(`/${id}/cancel`);
    return response.data; // El resultado de la cancelación
  } catch (error) {
    throw new Error('Error al cancelar cita: ' + (error.response?.data?.message || 'Error de red.'));
  }
};

/**
 * DELETE /api/appointments/:id — Eliminar cita.
 */
export const deleteAppointment = async (id) => {
  try {
    // Si el backend es estricto, puede que no se use DELETE, sino POST /cancel
    // Usamos el endpoint que provees en la documentación.
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar cita: ' + (error.response?.data?.message || 'Error de red.'));
  }
};