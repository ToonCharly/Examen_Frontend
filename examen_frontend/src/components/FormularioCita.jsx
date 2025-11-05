import React, { useState, useEffect } from 'react';
import { createAppointment, updateAppointment } from '../api/appointments';

const FormularioCita = ({ onCitaCreada, citaSeleccionada, onLimpiar }) => {
  const [paciente, setPaciente] = useState('');
  const [medico, setMedico] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (citaSeleccionada) {
      setPaciente(citaSeleccionada.paciente);
      setMedico(citaSeleccionada.medico);
      setFecha(citaSeleccionada.fecha);
      setHora(citaSeleccionada.hora);
    } else {
      setPaciente('');
      setMedico('');
      setFecha('');
      setHora('');
    }
  }, [citaSeleccionada]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const citaData = { paciente, medico, fecha, hora };

    try {
      if (citaSeleccionada) {
        await updateAppointment(citaSeleccionada.id, citaData);
      } else {
        await createAppointment(citaData);
      }

      onCitaCreada?.();
      onLimpiar?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        {citaSeleccionada ? '✏️ Editar Cita' : '➕ Agendar Nueva Cita'}
      </h3>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre del Paciente
          </label>
          <input
            type="text"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Médico Asignado
          </label>
          <input
            type="text"
            value={medico}
            onChange={(e) => setMedico(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Fecha
            </label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Hora
            </label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 px-4 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            {loading ? 'Guardando...' : citaSeleccionada ? 'Actualizar' : 'Guardar'}
          </button>
          {citaSeleccionada && (
            <button
              type="button"
              onClick={onLimpiar}
              className="flex-1 py-2 px-4 rounded-md text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-100"
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormularioCita;
