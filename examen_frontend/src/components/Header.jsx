// src/components/Header.jsx

import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <h2 className="text-xl font-medium text-gray-700">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Usuario: ClinicaAdmin</span>
        {/* Se puede añadir un icono de perfil aquí */}
      </div>
    </header>
  );
};

export default Header;