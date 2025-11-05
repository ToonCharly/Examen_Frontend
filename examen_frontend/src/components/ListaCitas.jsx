import React, { useEffect, useState } from 'react';
import { getAppointments, deleteAppointment, cancelAppointment } from '../api/appointments';

const ListaCitas = ({ refrescar, onEditar }) => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarCitas = async () => {
    try {
      setLoading(true);
      const data = await getAppointments();
      setCitas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = async (id) => {
    if (!window.confirm('¿Seguro que deseas cancelar esta cita?')) return;
    try {
      await cancelAppointment(id);
      cargarCitas(); // 🔄 refresca lista
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar definitivamente esta cita?')) return;
    try {
      await deleteAppointment(id);
      cargarCitas();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    cargarCitas();
  }, [refrescar]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">📋 Lista de Citas</h3>

      {loading ? (
        <p className="text-gray-600">Cargando citas...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : citas.length === 0 ? (
        <p className="text-gray-600">No hay citas registradas.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {citas.map((cita) => (
            <li key={cita.id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">
                  {cita.paciente} con {cita.medico}
                </p>
                <p className="text-sm text-gray-500">
                  📅 {cita.fecha} — 🕒 {cita.hora}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEditar(cita)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleCancelar(cita.id)}
                  className="px-3 py-1 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleEliminar(cita.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaCitas;
