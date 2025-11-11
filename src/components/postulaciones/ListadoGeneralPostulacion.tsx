"use client";

import { useState } from "react";
import { usePostulacion } from "@/src/hooks/erp/usePostulacion";
import { FaEdit, FaTrash, FaEye, FaBriefcase } from "react-icons/fa";
import Swal from "sweetalert2";
import { executeQuery } from "@/src/service/graphql.service";
import { PREDICT_CUSTOM_COMPATIBILITY } from "@/src/graphql/queries/ml/compatibility.queries";
import { PostulacionType } from "@/src/types/erp/postulacion.types";

interface CompatibilityResult {
  predictCustomCompatibility: {
    probabilityPercentage: string;
    compatibilityLevel: string;
    recommendation: string;
    summary: string;
    strengths: string[];
    suggestions: string[];
  };
}

const ListadoGeneralPostulacion = () => {
  const { postulaciones, loading, error, eliminarPostulacion, refetch } = usePostulacion();
  const [searchTerm] = useState("");

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

  const handleView = async (postulacion: PostulacionType) => {
    try {
      // Mostrar modal de carga mientras se obtiene la compatibilidad
      Swal.fire({
        title: postulacion.nombre,
        html: '<div class="flex items-center justify-center"><div class="spinner-modern"></div><span class="ml-3">Calculando compatibilidad...</span></div>',
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      console.log("👁️ Ver postulación:", postulacion);
      // Construir objeto de entrada para la query
      const variables = {
        input: {
          candidateData: {
            aniosExperiencia: postulacion.aniosExperiencia || 0,
            nivelEducacion: postulacion.nivelEducacion || "",
            habilidades: postulacion.habilidades || "",
            idiomas: postulacion.idiomas || "",
            certificaciones: postulacion.certificaciones || "",
            puestoActual: postulacion.puestoActual || "",
          },
          offerData: {
            titulo: postulacion.oferta?.titulo || "",
            salario: 0,
            ubicacion: "",
            requisitos: "",
          },
        },
      };

      console.log("📊 Variables para query de compatibilidad:", variables);

      // Ejecutar la query de compatibilidad
      const result = await executeQuery<CompatibilityResult>(PREDICT_CUSTOM_COMPATIBILITY, variables);

      console.log("✅ Resultado de compatibilidad:", result);

      if (!result?.predictCustomCompatibility) {
        throw new Error("No se recibieron datos de compatibilidad");
      }

      const compatibility = result.predictCustomCompatibility; // Construir HTML para el modal con los resultados
      const compatibilityHtml = `
        <div class="text-left space-y-4 max-h-96 overflow-y-auto">
          <!-- Información Candidato -->
          <div class="pb-4 border-b border-gray-300">
            <h3 class="font-bold text-blue-600 mb-2">📋 Información del Candidato</h3>
            <p class="text-sm"><strong>Email:</strong> ${postulacion.email}</p>
            <p class="text-sm"><strong>Teléfono:</strong> ${postulacion.telefono || "N/A"}</p>
            <p class="text-sm"><strong>Años de experiencia:</strong> ${postulacion.aniosExperiencia || "N/A"}</p>
            <p class="text-sm"><strong>Nivel de Educación:</strong> ${postulacion.nivelEducacion || "N/A"}</p>
            <p class="text-sm"><strong>Puesto Actual:</strong> ${postulacion.puestoActual || "N/A"}</p>
            <p class="text-sm"><strong>Habilidades:</strong> ${postulacion.habilidades || "N/A"}</p>
            <p class="text-sm"><strong>Idiomas:</strong> ${postulacion.idiomas || "N/A"}</p>
            ${
              postulacion.urlCv
                ? `<p class="text-sm"><strong>CV:</strong> <a href="${postulacion.urlCv}" target="_blank" class="text-blue-600 hover:underline">Ver CV</a></p>`
                : ""
            }
          </div>

          <!-- Oferta de Trabajo -->
          <div class="pb-4 border-b border-gray-300">
            <h3 class="font-bold text-blue-600 mb-2">💼 Oferta de Trabajo</h3>
            <p class="text-sm"><strong>Posición:</strong> ${postulacion.oferta?.titulo || "N/A"}</p>
            <p class="text-sm"><strong>Empresa:</strong> ${postulacion.oferta?.empresa?.nombre || "N/A"}</p>
          </div>

          <!-- Resultados de Compatibilidad -->
          <div class="pb-4 border-b border-gray-300 bg-blue-50 p-3 rounded">
            <h3 class="font-bold text-blue-700 mb-3">🎯 Análisis de Compatibilidad</h3>
            <p class="text-xl font-bold text-blue-600 mb-2">${compatibility.probabilityPercentage}</p>
            <p class="text-sm font-semibold text-blue-700 mb-3">${compatibility.compatibilityLevel}</p>
            <p class="text-sm whitespace-pre-wrap">${compatibility.summary}</p>
          </div>

          <!-- Fortalezas -->
          <div class="pb-4 border-b border-gray-300">
            <h3 class="font-bold text-green-600 mb-2">✅ Fortalezas</h3>
            <ul class="text-sm space-y-1">
              ${compatibility.strengths.map((strength: string) => `<li class="ml-4">• ${strength}</li>`).join("")}
            </ul>
          </div>

          <!-- Recomendaciones -->
          <div class="pb-4">
            <h3 class="font-bold text-orange-600 mb-2">💡 Recomendaciones</h3>
            <p class="text-sm whitespace-pre-wrap">${compatibility.recommendation}</p>
            ${
              compatibility.suggestions.length > 0
                ? `
              <div class="mt-3 pt-3 border-t border-gray-300">
                <h4 class="font-semibold text-sm mb-2">Sugerencias:</h4>
                <ul class="text-sm space-y-1">
                  ${compatibility.suggestions
                    .map((suggestion: string) => `<li class="ml-4">• ${suggestion}</li>`)
                    .join("")}
                </ul>
              </div>
            `
                : ""
            }
          </div>
        </div>
      `;

      // Mostrar modal con resultados
      await Swal.fire({
        title: postulacion.nombre,
        html: compatibilityHtml,
        icon: "info",
        confirmButtonText: "Cerrar",
        width: "700px",
      });
    } catch (err) {
      console.error("Error al ver postulación:", err);
      await Swal.fire({
        title: "Error",
        text: "Error al calcular la compatibilidad",
        icon: "error",
      });
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
