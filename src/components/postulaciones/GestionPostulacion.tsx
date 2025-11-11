"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  FileText,
  Calendar,
  AlertCircle,
  Loader,
  X,
  Zap,
} from "lucide-react";
import { usePostulacion } from "@/src/hooks/erp/usePostulacion";
import { PostulacionType } from "@/src/types/erp/postulacion.types";
import { CompatibilityResponse } from "@/src/types/ml/compatibility.types";
import { PREDICT_CUSTOM_COMPATIBILITY } from "@/src/graphql/queries/ml/compatibility.queries";
import { executeQuery } from "@/src/service/graphql.service";
import Swal from "sweetalert2";

const GestionPostulacion = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("Todos");
  const [selectedPostulacion, setSelectedPostulacion] = useState<PostulacionType | null>(null);
  const [compatibilityData, setCompatibilityData] = useState<CompatibilityResponse | null>(null);
  const [loadingCompatibility, setLoadingCompatibility] = useState(false);

  // Hook para obtener postulaciones reales
  const { postulaciones, loading, error, refetch, eliminarPostulacion } = usePostulacion(15);

  console.log("🔍 GestionPostulacion render", postulaciones);
  const getEstadoColor = (estado: string) => {
    const colores: Record<string, string> = {
      PENDIENTE: "bg-yellow-100 text-yellow-800 border-yellow-300",
      Pendiente: "bg-yellow-100 text-yellow-800 border-yellow-300",
      "En Revisión": "bg-blue-100 text-blue-800 border-blue-300",
      Entrevista: "bg-purple-100 text-purple-800 border-purple-300",
      ENTREVISTA: "bg-purple-100 text-purple-800 border-purple-300",
      Ofertado: "bg-green-100 text-green-800 border-green-300",
      OFERTADO: "bg-green-100 text-green-800 border-green-300",
      Contratado: "bg-emerald-100 text-emerald-800 border-emerald-300",
      CONTRATADO: "bg-emerald-100 text-emerald-800 border-emerald-300",
      Rechazado: "bg-red-100 text-red-800 border-red-300",
      RECHAZADO: "bg-red-100 text-red-800 border-red-300",
    };
    return colores[estado] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const getEstadoIcon = (estado: string) => {
    const estadoUpper = estado.toUpperCase();
    switch (estadoUpper) {
      case "CONTRATADO":
        return <CheckCircle className="w-4 h-4" />;
      case "RECHAZADO":
        return <XCircle className="w-4 h-4" />;
      case "PENDIENTE":
        return <Clock className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const filteredPostulaciones = useMemo(() => {
    return postulaciones.filter((p) => {
      const matchSearch =
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.puestoActual.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.oferta?.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchEstado = filterEstado === "Todos" || p.estado === filterEstado;
      return matchSearch && matchEstado;
    });
  }, [postulaciones, searchTerm, filterEstado]);

  const estadosUnicos = useMemo(() => {
    const estados = new Set(postulaciones.map((p) => p.estado));
    return ["Todos", ...Array.from(estados)];
  }, [postulaciones]);

  const handleDeletePostulacion = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "¿Deseas Eliminar?",
        text: "Si eliminas no podrás recuperarlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, quiero Eliminar!",
      });

      if (result.isConfirmed) {
        await eliminarPostulacion(id);

        Swal.fire({
          title: "¡Eliminado!",
          text: "Postulación eliminada correctamente.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error eliminando postulación:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al eliminar la postulación",
        icon: "error",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDownloadCV = (urlCv: string) => {
    if (urlCv) {
      window.open(urlCv, "_blank");
    }
  };

  /**
   * Obtiene la predicción de compatibilidad cuando se abre el modal
   */
  const fetchCompatibility = async (postulacion: PostulacionType) => {
    try {
      setLoadingCompatibility(true);
      setCompatibilityData(null);

      console.log("🔍 Obteniendo compatibilidad para:", postulacion.nombre);

      const variables = {
        aniosExperiencia: postulacion.aniosExperiencia,
        nivelEducacion: postulacion.nivelEducacion,
        habilidades: postulacion.habilidades,
        idiomas: postulacion.idiomas,
        certificaciones: postulacion.certificaciones || "Sin certificaciones",
        puestoActual: postulacion.puestoActual,
        titulo: postulacion.oferta?.titulo || "Puesto no especificado",
        salario: 5000.0,
        ubicacion: "Santa Cruz de la Sierra",
        requisitos: "Ingeniería en Sistemas",
      };
      console.log("🔍 Obteniendo compatibilidad para:", variables);
      const response = await executeQuery<{ predictCustomCompatibility: CompatibilityResponse }>(
        PREDICT_CUSTOM_COMPATIBILITY,
        variables
      );

      console.log("✅ Compatibilidad obtenida:", response);
      setCompatibilityData(response.predictCustomCompatibility);
    } catch (error) {
      console.error("❌ Error obteniendo compatibilidad:", error);
      setCompatibilityData(null);
    } finally {
      setLoadingCompatibility(false);
    }
  };

  /**
   * Maneja la apertura del modal y carga la compatibilidad
   */
  const handleOpenModal = (postulacion: PostulacionType) => {
    setSelectedPostulacion(postulacion);
    fetchCompatibility(postulacion);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestión de Postulaciones</h1>
            <p className="text-gray-600">Administra y revisa los candidatos del proceso de selección</p>
          </div>
          <button
            onClick={refetch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            Actualizar
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Filtros y Búsqueda */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre, puesto, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {estadosUnicos.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Mostrando <span className="font-semibold">{filteredPostulaciones.length}</span> de{" "}
            <span className="font-semibold">{postulaciones.length}</span> postulaciones
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4 bg-white rounded-xl shadow-lg">
            <Loader className="w-12 h-12 animate-spin text-blue-600" />
            <p className="text-gray-600">Cargando postulaciones...</p>
          </div>
        ) : filteredPostulaciones.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4">No hay postulaciones disponibles</p>
            <button
              onClick={refetch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Intentar nuevamente
            </button>
          </div>
        ) : (
          /* Tabla de Postulaciones */
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Candidato
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Puesto / Oferta
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Experiencia
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPostulaciones.map((postulacion) => (
                    <tr key={postulacion.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">{postulacion.nombre}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Mail className="w-3 h-3" />
                            {postulacion.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {postulacion.telefono}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{postulacion.puestoActual}</div>
                        <div className="text-sm text-gray-500">{postulacion.oferta?.titulo}</div>
                        <div className="text-sm text-gray-500 font-medium">{postulacion.nivelEducacion}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{postulacion.aniosExperiencia} años</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getEstadoColor(
                            postulacion.estado
                          )}`}
                        >
                          {getEstadoIcon(postulacion.estado)}
                          {postulacion.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(postulacion.fechaPostulacion)}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenModal(postulacion)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadCV(postulacion.urlCv)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Descargar CV"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePostulacion(postulacion.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
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

        {/* Modal de Detalles */}
        {selectedPostulacion && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPostulacion(null)}
          >
            <div
              className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPostulacion.nombre}</h2>
                    <p className="text-gray-600 mt-1">{selectedPostulacion.puestoActual}</p>
                  </div>
                  <button onClick={() => setSelectedPostulacion(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Cargar Compatibilidad */}
                {loadingCompatibility && (
                  <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Loader className="w-4 h-4 animate-spin text-blue-600" />
                    <p className="text-sm text-blue-700">Analizando compatibilidad con la oferta...</p>
                  </div>
                )}

                {/* Información de Compatibilidad */}
                {compatibilityData && !loadingCompatibility && (
                  <>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <Zap className="w-5 h-5 text-yellow-500" />
                          Análisis de Compatibilidad
                        </h3>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{compatibilityData.probabilityPercentage}</p>
                          <p className="text-xs text-gray-600">Compatibilidad</p>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <p className="text-sm font-semibold text-gray-800 mb-2">
                          {compatibilityData.compatibilityLevel}
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <p className="text-xs font-semibold text-gray-700 mb-2">📋 Resumen Ejecutivo:</p>
                        <p className="text-xs text-gray-700 whitespace-pre-line">{compatibilityData.summary}</p>
                      </div>

                      <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <p className="text-xs font-semibold text-gray-700 mb-2">💪 Fortalezas:</p>
                        <ul className="space-y-1">
                          {compatibilityData.strengths.map((strength, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                              <span className="text-green-600 mt-1">✓</span>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white rounded-lg p-3 border border-red-100">
                        <p className="text-xs font-semibold text-red-700 mb-2">⚠️ Debilidades:</p>
                        <ul className="space-y-1">
                          {compatibilityData.weaknesses && compatibilityData.weaknesses.length > 0 ? (
                            compatibilityData.weaknesses.map((weakness, idx) => (
                              <li key={idx} className="text-xs text-red-600 flex items-start gap-2">
                                <span className="text-red-500 mt-1">✗</span>
                                {weakness}
                              </li>
                            ))
                          ) : (
                            <li className="text-xs text-gray-600">No hay debilidades identificadas</li>
                          )}
                        </ul>
                      </div>

                      <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <p className="text-xs font-semibold text-gray-700 mb-2">💡 Sugerencias:</p>
                        <ul className="space-y-1">
                          {compatibilityData.suggestions.map((suggestion, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                              <span className="text-blue-600 mt-1">→</span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <p className="text-xs font-semibold text-gray-700 mb-2">🎯 Recomendación:</p>
                        <p className="text-xs text-gray-700 whitespace-pre-line">{compatibilityData.recommendation}</p>
                      </div>
                    </div>

                    {/* Divisor visual */}
                    <div className="border-t-2 border-gray-200 pt-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">📄 Información del Postulante</h3>
                    </div>
                  </>
                )}

                {/* Información de Contacto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">📞 Información de Contacto</h3>
                    <div className="space-y-2">
                      <p className="text-sm flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a href={`mailto:${selectedPostulacion.email}`} className="text-blue-600 hover:underline">
                          {selectedPostulacion.email}
                        </a>
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a href={`tel:${selectedPostulacion.telefono}`} className="text-blue-600 hover:underline">
                          {selectedPostulacion.telefono}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">💼 Información de Postulación</h3>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Oferta:</span> {selectedPostulacion.oferta?.titulo}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Empresa:</span> {selectedPostulacion.oferta?.empresa?.nombre}
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {formatDate(selectedPostulacion.fechaPostulacion)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Experiencia y Educación */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">🎓 Experiencia y Educación</h3>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Experiencia:</span> {selectedPostulacion.aniosExperiencia} años
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Nivel Educativo:</span> {selectedPostulacion.nivelEducacion}
                    </p>
                  </div>
                </div>

                {/* Habilidades */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">🛠️ Habilidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPostulacion.habilidades.split(",").map((hab, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {hab.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Idiomas */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">🌍 Idiomas</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPostulacion.idiomas.split(",").map((idioma, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {idioma.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certificaciones */}
                {selectedPostulacion.certificaciones && selectedPostulacion.certificaciones.trim() !== "" && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">📜 Certificaciones</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPostulacion.certificaciones.split(",").map((cert, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {cert.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estado Actual */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">📊 Estado Actual</h3>
                  <span
                    className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold border ${getEstadoColor(
                      selectedPostulacion.estado
                    )}`}
                  >
                    {getEstadoIcon(selectedPostulacion.estado)}
                    {selectedPostulacion.estado}
                  </span>
                </div>
              </div>

              {/* Acciones */}
              <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0">
                <button
                  onClick={() => handleDownloadCV(selectedPostulacion.urlCv)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Descargar CV
                </button>
                <button
                  onClick={() => setSelectedPostulacion(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionPostulacion;
