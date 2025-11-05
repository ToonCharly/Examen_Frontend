// src/api/auth.js

import axios from 'axios';

// Asegúrate de que esta URL sea correcta. Si estás usando 'localhost', debería funcionar.
const API_URL = 'http://localhost:3000/api/auth'; 

/**
 * Función para iniciar sesión.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<object>} El objeto de respuesta con los datos del usuario/token.
 */
export const login = async (email, password) => {
  try {
    console.log('Enviando solicitud a API...');
    
    // Usamos la ruta /login que es común para la autenticación
    const response = await axios.post(`${API_URL}/login`, { email, password });
    
    console.log('Respuesta de la API:', response);
    
    // Si la autenticación es exitosa, se suele recibir un token
    const userData = response.data;
    
    // 💡 IMPORTANTE: Guardar el token de autenticación en localStorage
    if (userData && userData.token) {
        localStorage.setItem('authToken', userData.token);
    }
    
    return userData;

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    
    // Manejo de errores más amigable
    const errorMessage = error.response && error.response.data && error.response.data.error 
                         ? error.response.data.error 
                         : 'Error desconocido al iniciar sesión. Verifique credenciales.';
                         
    throw new Error(errorMessage);
  }
};

// ... Puedes añadir una función para logout aquí
export const logout = () => {
    localStorage.removeItem('authToken');
    // Redirigir al login (manejar en el componente)
};

// ... Puedes añadir una función para verificar si está logueado aquí
export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
};