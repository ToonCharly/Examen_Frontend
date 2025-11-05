// src/pages/dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ListaCitas from '../components/ListaCitas';
import FormularioCita from '../components/FormularioCita';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('list');
  const [refrescar, setRefrescar] = useState(0);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  // Navegación entre vistas
  const navigateTo = (view) => {
    setCurrentView(view);
    if (view === 'add') setCitaSeleccionada(null); // limpiar al ir a "nueva cita"
  };

  // Actualiza el título dinámicamente
  const getPageTitle = () => {
    if (currentView === 'add' && citaSeleccionada)
      return 'Editar Cita Médica';
    if (currentView === 'add')
      return 'Agendar Nueva Cita';
    return 'Lista de Citas Médicas';
  };

  // Cuando se crea o actualiza una cita, refresca lista
  const handleCitaGuardada = () => {
    setRefrescar((r) => r + 1);
    setCurrentView('list');
  };

  // Cuando se elige editar una cita
  const handleEditar = (cita) => {
    setCitaSeleccionada(cita);
    setCurrentView('add');
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar navigateTo={navigateTo} currentView={currentView} />

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Área de Contenido */}
        <main className="flex-1 overflow-auto bg-white p-6 w-full">
          {/* Encabezado de la página */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-gray-200">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {getPageTitle()}
              </h1>
              <p className="text-gray-600 mt-2">
                {currentView === 'list'
                  ? 'Gestiona y revisa todas tus citas médicas programadas'
                  : citaSeleccionada
                  ? 'Edita la información de la cita seleccionada'
                  : 'Completa el formulario para agendar una nueva cita médica'}
              </p>
            </div>

            {/* Botones de acción contextuales */}
            <div className="flex gap-3 mt-4 sm:mt-0">
              {currentView === 'list' && (
                <button
                  onClick={() => navigateTo('add')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Nueva Cita
                </button>
              )}

              {currentView === 'add' && (
                <button
                  onClick={() => navigateTo('list')}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Volver a la Lista
                </button>
              )}
            </div>
          </div>

          {/* Contenido dinámico */}
          <div className="w-full">
            {currentView === 'list' && (
              <ListaCitas refrescar={refrescar} onEditar={handleEditar} />
            )}
            {currentView === 'add' && (
              <FormularioCita
                onCitaCreada={handleCitaGuardada}
                citaSeleccionada={citaSeleccionada}
                onLimpiar={() => setCitaSeleccionada(null)}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
