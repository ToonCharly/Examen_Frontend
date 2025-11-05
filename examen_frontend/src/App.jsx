// src/App.jsx

import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Si NO usas router, no lo importes

// Importa la página principal
import Dashboard from './pages/dashboard'; 

// --- Componente Principal de la Aplicación (Sin Router) ---
function App() {
  return (
    // Simplemente renderizamos el Dashboard directamente
    <Dashboard /> 
  );
}

export default App;

// Si DEBES usar router, usa esta versión, pero no tendrás login:
/*
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
*/