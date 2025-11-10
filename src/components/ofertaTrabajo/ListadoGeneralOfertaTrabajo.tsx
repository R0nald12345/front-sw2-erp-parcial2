"use client"

import { useState } from "react";
import { useOfertaTrabajo } from "@/src/hooks/erp/useOfertaTrabajo";
import { FaEdit, FaTrash, FaEye, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ListadoGeneralOfertaTrabajo = () => {
  const { ofertas, loading, error, eliminarOfertaTrabajo, refetch } = useOfertaTrabajo();
  const [searchTerm, setSearchTerm] = useState("");

  const ofertasFiltradas = ofertas.filter(oferta =>
    oferta.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    oferta.empresa?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    oferta.ubicacion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string, titulo: string) => {
    try {
      const result = await Swal.fire({
        title: "¿Deseas eliminar?",
        text: `Eliminarás la oferta: ${titulo}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await eliminarOfertaTrabajo(id);
        await Swal.fire({
          title: "¡Eliminado!",
          text: "Oferta eliminada correctamente.",
          icon: "success",
          timer: 2000,
        });
        await refetch();
      }
    } catch (err) {
      console.error("Error al eliminar:", err);
      await Swal.fire({
        title: "Error",
        text: "Error al eliminar la oferta",
        icon: "error",
      });
    }
  };

  const handleEdit = (id: string) => {
    console.log('✏️ Editar oferta:', id);
    // Aquí implementar lógica de edición
  };

  const handleView = async (id: string) => {
    try {
      // Aquí puedes obtener detalles de la oferta si lo necesitas
      await Swal.fire({
        title: "Detalles de Oferta",
        html: `<p>Oferta ID: ${id}</p>`,
        icon: "info",
        confirmButtonText: "Cerrar",
      });
    } catch (err) {
      console.error("Error al ver oferta:", err);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="spinner-modern"></div>
        <span className="ml-3 text-gray-600 font-medium">Cargando ofertas...</span>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="mx-4 md:mx-6 mb-6">
        <div className="alert-error">
          <span className="font-semibold">Error al cargar ofertas</span>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (ofertasFiltradas.length === 0) {
    return (
      <div className="mx-4 md:mx-6 mb-6">
        <div className="card-modern p-8 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h4 className="text-xl font-semibold text-gray-700 mb-2">No hay ofertas</h4>
          <p className="text-gray-600">
            {searchTerm 
              ? `No se encontraron ofertas con "${searchTerm}"` 
              : 'Comienza publicando una nueva oferta de trabajo'}
          </p>
        </div>
      </div>
    );
  }

  const getTipoBadgeColor = (tipo: string) => {
    switch(tipo) {
      case 'Tiempo Completo': return 'bg-gradient-success';
      case 'Tiempo Parcial': return 'bg-gradient-warning';
      case 'Contrato': return 'bg-gradient-primary';
      case 'Freelance': return 'text-purple-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      {/* Desktop Table View */}
      {ofertasFiltradas.length > 0 && (
        <div className="hidden md:block mx-4 md:mx-6 mb-6">
          <div className="card-modern overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-primary border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Título</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Empresa</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Ubicación</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Salario</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ofertasFiltradas.map((oferta, index) => (
                  <tr
                    key={oferta.id}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } border-b border-gray-200 hover:bg-blue-50 transition-colors`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {oferta.titulo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{oferta.empresa?.nombre || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                      <FaMapMarkerAlt size={14} className="text-red-500" />
                      {oferta.ubicacion || 'No especificada'}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">
                      ${oferta.salario || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleView(oferta.id)}
                          className="btn-outline-small"
                          title="Ver detalles"
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(oferta.id)}
                          className="btn-outline-small text-blue-600 hover:text-blue-700"
                          title="Editar"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(oferta.id, oferta.titulo)}
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
      {ofertasFiltradas.length > 0 && (
        <div className="md:hidden mx-4 mb-6 space-y-4">
          {ofertasFiltradas.map((oferta) => (
            <div key={oferta.id} className="card-modern p-4">
              <div className="mb-4">
                <h4 className="font-semibold text-lg text-gray-900">{oferta.titulo}</h4>
                <p className="text-sm text-gray-600 mt-1">{oferta.empresa?.nombre || 'N/A'}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1">
                    <FaMapMarkerAlt size={12} /> Ubicación
                  </p>
                  <p className="text-sm font-medium text-gray-900">{oferta.ubicacion || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Salario</p>
                  <p className="text-sm font-medium text-green-600">${oferta.salario || 'N/A'}</p>
                </div>
              </div>

              {oferta.descripcion && (
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-xs text-gray-600 line-clamp-2">{oferta.descripcion}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => handleView(oferta.id)}
                  className="flex-1 btn-primary-small"
                  title="Ver detalles"
                >
                  <FaEye size={14} className="mr-2" />
                  Ver
                </button>
                <button
                  onClick={() => handleEdit(oferta.id)}
                  className="flex-1 btn-secondary-small"
                  title="Editar"
                >
                  <FaEdit size={14} className="mr-2" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(oferta.id, oferta.titulo)}
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

export default ListadoGeneralOfertaTrabajo;
