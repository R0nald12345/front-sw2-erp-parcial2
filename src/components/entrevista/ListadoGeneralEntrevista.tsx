'use client';

import { useState } from 'react';
import { useEntrevista } from '@/src/hooks/erp/useEntrevista';
import { FaEdit, FaTrash, FaEye, FaCalendar, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ListadoGeneralEntrevista = () => {
  const { entrevistas, loading, error, eliminarEntrevista, refetch } = useEntrevista();
  const [searchTerm, setSearchTerm] = useState('');

  const entrevistasFiltradas = entrevistas.filter(entrevista =>
    entrevista.entrevistador?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: '¿Deseas eliminar?',
        text: 'Eliminarás esta entrevista',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        await eliminarEntrevista(id);
        await Swal.fire({
          title: '¡Eliminado!',
          text: 'Entrevista eliminada correctamente.',
          icon: 'success',
          timer: 2000,
        });
        await refetch();
      }
    } catch (err) {
      console.error('Error al eliminar:', err);
      await Swal.fire({
        title: 'Error',
        text: 'Error al eliminar la entrevista',
        icon: 'error',
      });
    }
  };

  const handleEdit = (id: string) => {
    console.log('✏️ Editar entrevista:', id);
  };

  const handleView = async (entrevista: any) => {
    try {
      const fechaFormato = new Date(entrevista.fecha).toLocaleDateString('es-ES');
      await Swal.fire({
        title: 'Detalles de Entrevista',
        html: `
          <div class="text-left space-y-2">
            <p><strong>Fecha:</strong> ${fechaFormato}</p>
            <p><strong>Entrevistador:</strong> ${entrevista.entrevistador || 'N/A'}</p>
          </div>
        `,
        icon: 'info',
        confirmButtonText: 'Cerrar',
      });
    } catch (err) {
      console.error('Error al ver entrevista:', err);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="spinner-modern"></div>
        <span className="ml-3 text-gray-600 font-medium">Cargando entrevistas...</span>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="mx-4 md:mx-6 mb-6">
        <div className="alert-error">
          <span className="font-semibold">Error al cargar entrevistas</span>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (entrevistasFiltradas.length === 0) {
    return (
      <div className="mx-4 md:mx-6 mb-6">
        <div className="card-modern p-8 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h4 className="text-xl font-semibold text-gray-700 mb-2">No hay entrevistas</h4>
          <p className="text-gray-600">
            {searchTerm
              ? `No se encontraron entrevistas con "${searchTerm}"`
              : 'Aún no hay entrevistas programadas'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      {entrevistasFiltradas.length > 0 && (
        <div className="hidden md:block mx-4 md:mx-6 mb-6">
          <div className="card-modern overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-primary border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Fecha</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Entrevistador</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {entrevistasFiltradas.map((entrevista, index) => (
                  <tr
                    key={entrevista.id}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } border-b border-gray-200 hover:bg-blue-50 transition-colors`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-2">
                      <FaCalendar size={14} className="text-blue-500" />
                      {new Date(entrevista.fecha).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                      <FaUser size={14} className="text-purple-500" />
                      {entrevista.entrevistador || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleView(entrevista)}
                          className="btn-outline-small"
                          title="Ver detalles"
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(entrevista.id)}
                          className="btn-outline-small text-blue-600 hover:text-blue-700"
                          title="Editar"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(entrevista.id)}
                          className="btn-outline-small text-red-600 hover:text-red-700"
                          title="Eliminar"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile Card View */}
      {entrevistasFiltradas.length > 0 && (
        <div className="md:hidden mx-4 mb-6 space-y-4">
          {entrevistasFiltradas.map((entrevista) => (
            <div key={entrevista.id} className="card-modern p-4">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FaCalendar size={14} className="text-blue-500" />
                    <p className="font-semibold text-lg text-gray-900">
                      {new Date(entrevista.fecha).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUser size={12} className="text-purple-500" />
                    <p className="text-sm text-gray-600">{entrevista.entrevistador || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Fecha</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(entrevista.fecha).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Entrevistador</p>
                  <p className="text-sm font-medium text-gray-900">{entrevista.entrevistador || 'N/A'}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleView(entrevista)}
                  className="flex-1 btn-primary-small"
                  title="Ver detalles"
                >
                  <FaEye size={14} className="mr-2" />
                  Ver
                </button>
                <button
                  onClick={() => handleEdit(entrevista.id)}
                  className="flex-1 btn-secondary-small"
                  title="Editar"
                >
                  <FaEdit size={14} className="mr-2" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(entrevista.id)}
                  className="flex-1 btn-danger-small"
                  title="Eliminar"
                >
                  <FaTrash size={14} className="mr-2" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ListadoGeneralEntrevista;
