// src/view/pages/Dashboard.jsx
import { useState } from "react";
import { CalendarDaysIcon, UserGroupIcon, UserIcon, PlusIcon } from "lucide-react";

export default function Dashboard() {
  const [citas, setCitas] = useState([
    { id: 1, paciente: "María López", medico: "Dr. Ramírez", fecha: "2025-11-05", hora: "10:00", estado: "Programada" },
    { id: 2, paciente: "Juan Pérez", medico: "Dra. Torres", fecha: "2025-11-06", hora: "11:30", estado: "Completada" },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Salud Integral</h2>
        <nav className="flex flex-col space-y-3">
          <a href="#" className="hover:bg-blue-600 rounded p-2">🏠 Inicio</a>
          <a href="#" className="hover:bg-blue-600 rounded p-2">🩺 Citas</a>
          <a href="#" className="hover:bg-blue-600 rounded p-2">👤 Perfil</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Panel de control</h1>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <PlusIcon size={18} /> Nueva cita
          </button>
        </header>

        {/* Summary cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
            <CalendarDaysIcon className="text-blue-700" size={36} />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Citas Programadas</h3>
              <p className="text-2xl font-bold">{citas.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
            <UserGroupIcon className="text-green-600" size={36} />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Pacientes</h3>
              <p className="text-2xl font-bold">28</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
            <UserIcon className="text-yellow-500" size={36} />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Médicos</h3>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </section>

        {/* Tabla de citas */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Citas Médicas</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-50 text-left text-gray-600 uppercase text-sm">
                <th className="p-3">Paciente</th>
                <th className="p-3">Médico</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Hora</th>
                <th className="p-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita) => (
                <tr key={cita.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{cita.paciente}</td>
                  <td className="p-3">{cita.medico}</td>
                  <td className="p-3">{cita.fecha}</td>
                  <td className="p-3">{cita.hora}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        cita.estado === "Programada"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {cita.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
