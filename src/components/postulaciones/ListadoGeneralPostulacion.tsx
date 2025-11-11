"use client";

import { useState } from "react";
import { usePostulacion } from "@/src/hooks/erp/usePostulacion";
import { FaEdit, FaTrash, FaEye, FaBriefcase, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const ListadoGeneralPostulacion = () => {
  const { postulaciones, loading, error, eliminarPostulacion, refetch } = usePostulacion();
  const [searchTerm, setSearchTerm] = useState("");

  console.log("🫨🫨", postulaciones);

  const postulacionesFiltradas = postulaciones.filter(
    (postulacion) =>
      postulacion.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      postulacion.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      postulacion.estado?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string, nombre: string) => {
    try {
      const result = await Swal.fire({
        title: "¿Deseas eliminar?",
        text: `Eliminarás la postulación de: ${nombre}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await eliminarPostulacion(id);
        await Swal.fire({
          title: "¡Eliminado!",
          text: "Postulación eliminada correctamente.",
          icon: "success",
          timer: 2000,
        });
        await refetch();
      }
    } catch (err) {
      console.error("Error al eliminar:", err);
      await Swal.fire({
        title: "Error",
        text: "Error al eliminar la postulación",
        icon: "error",
      });
    }
  };

  const handleEdit = (id: string) => {
    console.log("✏️ Editar postulación:", id);
    // Aquí implementar lógica de edición
  };

  const handleView = async (postulacion: any) => {
    try {
      await Swal.fire({
        title: postulacion.nombre,
        html: `
          <div class="text-left space-y-2">
            <p><strong>Email:</strong> ${postulacion.email}</p>
            <p><strong>Teléfono:</strong> ${postulacion.telefono || "N/A"}</p>
            <p><strong>Años de experiencia:</strong> ${postulacion.aniosExperiencia || "N/A"}</p>
            <p><strong>Nivel de Educación:</strong> ${postulacion.nivelEducacion || "N/A"}</p>
            <p><strong>Habilidades:</strong> ${postulacion.habilidades || "N/A"}</p>
            <p><strong>Estado:</strong> ${postulacion.estado}</p>
            ${
              postulacion.urlCv
                ? `<p><strong>CV:</strong> <a href="${postulacion.urlCv}" target="_blank" class="text-blue-600">Ver CV</a></p>`
                : ""
            }
          </div>
        `,
        icon: "info",
        confirmButtonText: "Cerrar",
      });
    } catch (err) {
      console.error("Error al ver postulación:", err);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="spinner-modern"></div>
        <span className="ml-3 text-gray-600 font-medium">Cargando postulaciones...</span>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="mx-4 md:mx-6 mb-6">
        <div className="alert-error">
          <span className="font-semibold">Error al cargar postulaciones</span>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (postulacionesFiltradas.length === 0) {
    return (
      <div className="mx-4 md:mx-6 mb-6">
        <div className="card-modern p-8 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h4 className="text-xl font-semibold text-gray-700 mb-2">No hay postulaciones</h4>
          <p className="text-gray-600">
            {searchTerm
              ? `No se encontraron postulaciones con "${searchTerm}"`
              : "Aún no hay postulaciones para mostrar"}
          </p>
        </div>
      </div>
    );
  }

  const getEstadoBadgeColor = (estado: string) => {
    switch (estado?.toLowerCase()) {
      case "aceptada":
      case "aprobada":
        return "bg-gradient-success";
      case "rechazada":
      case "descartada":
        return "bg-gradient-danger";
      case "en revisión":
      case "pendiente":
        return "bg-gradient-warning";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      {/* Desktop Table View */}
      {postulacionesFiltradas.length > 0 && (
        <div className="hidden md:block mx-4 md:mx-6 mb-6">
          <div className="card-modern overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-primary border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Experiencia</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Educación</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {postulacionesFiltradas.map((postulacion, index) => (
                  <tr
                    key={postulacion.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } border-b border-gray-200 hover:bg-blue-50 transition-colors`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{postulacion.nombre}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{postulacion.email || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{postulacion.aniosExperiencia || 0} años</td>
                    <td className="px-6 py-4">
                      <span
                        className={`${getEstadoBadgeColor(
                          postulacion.estado
                        )} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                      >
                        {postulacion.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {postulacion.nivelEducacion || "No especificada"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleView(postulacion)}
                          className="btn-outline-small"
                          title="Ver detalles"
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(postulacion.id)}
                          className="btn-outline-small text-blue-600 hover:text-blue-700"
                          title="Editar"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(postulacion.id, postulacion.nombre)}
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
      {postulacionesFiltradas.length > 0 && (
        <div className="md:hidden mx-4 mb-6 space-y-4">
          {postulacionesFiltradas.map((postulacion) => (
            <div key={postulacion.id} className="card-modern p-4">
              <div className="mb-4">
                <h4 className="font-semibold text-lg text-gray-900">{postulacion.nombre}</h4>
                <p className="text-sm text-gray-600 mt-1">{postulacion.email || "N/A"}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1">
                    <FaBriefcase size={12} /> Experiencia
                  </p>
                  <p className="text-sm font-medium text-gray-900">{postulacion.aniosExperiencia || 0} años</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Educación</p>
                  <p className="text-sm font-medium text-gray-900">{postulacion.nivelEducacion || "N/A"}</p>
                </div>
              </div>

              <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Estado</p>
                <span
                  className={`${getEstadoBadgeColor(
                    postulacion.estado
                  )} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                >
                  {postulacion.estado}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleView(postulacion)}
                  className="flex-1 btn-primary-small"
                  title="Ver detalles"
                >
                  <FaEye size={14} className="mr-2" />
                  Ver
                </button>
                <button
                  onClick={() => handleEdit(postulacion.id)}
                  className="flex-1 btn-secondary-small"
                  title="Editar"
                >
                  <FaEdit size={14} className="mr-2" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(postulacion.id, postulacion.nombre)}
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

export default ListadoGeneralPostulacion;
