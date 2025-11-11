"use client";

import { useRouter } from "next/navigation";
import { useOfertasEmpresa } from "@/src/hooks/erp/useOfertasEmpresa";
import { EmpresaType, OfertaTrabajoType } from "@/src/types/erp/oferta-trabajo.types";
import { useState } from "react";
import FormOfertaTrabajo from "../ofertaTrabajo/FormOfertaTrabajo";
import {
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaDollarSign,
  FaBriefcase,
  FaCalendar,
  FaGraduationCap,
  FaChartBar,
} from "react-icons/fa";
import Swal from "sweetalert2";

interface DetalleEmpresaOfertasProps {
  empresa: EmpresaType;
  onBack: () => void;
}

const DetalleEmpresaOfertas = ({ empresa, onBack }: DetalleEmpresaOfertasProps) => {
  console.log("DetalleEmpresaOfertas: ", empresa);
  const router = useRouter();
  const { ofertas, loading, error, eliminarOfertaTrabajo, crearOfertaTrabajo, actualizarOfertaTrabajo } =
    useOfertasEmpresa(empresa.id);
  const [showForm, setShowForm] = useState(false);
  const [selectedOferta, setSelectedOferta] = useState<OfertaTrabajoType | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "¿Deseas eliminar?",
        text: "¡Si eliminas no podrás recuperarlo!",
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
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      await Swal.fire({
        title: "Error",
        text: "Error al eliminar la oferta",
        icon: "error",
      });
    }
  };

  const handleEdit = (oferta: OfertaTrabajoType) => {
    console.log("✏️ Editando oferta:", oferta.id);
    setSelectedOferta(oferta);
    setShowForm(true);
  };

  const handleView = async (oferta: OfertaTrabajoType) => {
    await Swal.fire({
      title: oferta.titulo,
      html: `
        <div class="text-left space-y-3">
          <div>
            <p class="text-xs text-gray-500 uppercase tracking-wide font-semibold">Descripción</p>
            <p class="text-sm text-gray-900">${oferta.descripcion}</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-wide font-semibold">Salario</p>
              <p class="text-sm font-bold text-green-600">Bs. ${oferta.salario.toFixed(2)}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-wide font-semibold">Ubicación</p>
              <p class="text-sm font-medium text-gray-900">${oferta.ubicacion}</p>
            </div>
          </div>
          <div>
            <p class="text-xs text-gray-500 uppercase tracking-wide font-semibold">Requisitos</p>
            <p class="text-sm text-gray-900">${oferta.requisitos}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 uppercase tracking-wide font-semibold">Fecha de Publicación</p>
            <p class="text-sm text-gray-900">${new Date(oferta.fechaPublicacion).toLocaleDateString("es-ES")}</p>
          </div>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Cerrar",
      width: "600px",
    });
  };

  const handleAgregarOferta = () => {
    console.log("🆕 Crear nueva oferta");
    setSelectedOferta(null);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData: {
    titulo: string;
    descripcion: string;
    salario: number;
    ubicacion: string;
    requisitos: string;
    fechaPublicacion: string;
    empresaId: string;
  }) => {
    try {
      if (selectedOferta) {
        // Actualizar oferta existente
        console.log("✏️ Actualizando oferta:", selectedOferta.id);
        await actualizarOfertaTrabajo({
          id: selectedOferta.id,
          ...formData,
        });

        await Swal.fire({
          title: "¡Actualizado!",
          text: "Oferta actualizada correctamente.",
          icon: "success",
          timer: 2000,
        });
      } else {
        // Crear nueva oferta
        console.log("🆕 Creando nueva oferta");
        await crearOfertaTrabajo(formData);

        await Swal.fire({
          title: "¡Creado!",
          text: "Oferta creada correctamente.",
          icon: "success",
          timer: 2000,
        });
      }

      setShowForm(false);
      setSelectedOferta(null);
    } catch (error) {
      console.error("Error en handleFormSubmit:", error);
      await Swal.fire({
        title: "Error",
        text: error instanceof Error ? error.message : "Error al guardar la oferta",
        icon: "error",
      });
    }
  };

  const handleFormClose = () => {
    console.log("❌ Cerrando formulario");
    setShowForm(false);
    setSelectedOferta(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="spinner-modern"></div>
        <span className="ml-3 text-gray-600 font-medium">Cargando ofertas...</span>
      </div>
    );
  }

  return (
    <>
      {/* Header Moderno */}
      <div className="relative overflow-hidden bg-linear-to-r from-blue-600 via-blue-500 to-purple-600 text-white">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative z-10 px-6 md:px-12 py-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <FaArrowLeft size={18} />
              <span className="font-medium">Volver</span>
            </button>
            <div className="text-sm font-semibold px-4 py-2 bg-white/20 rounded-full backdrop-blur-md">
              {ofertas.length} {ofertas.length === 1 ? "Oferta" : "Ofertas"} Disponibles
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-linear-to-br from-purple-300 to-blue-300 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              🏢
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{empresa.nombre}</h1>
              <p className="text-white/90 mt-2 flex flex-wrap gap-4">
                <span className="flex items-center gap-1">
                  <FaBriefcase size={14} />
                  {empresa.rubro}
                </span>
                <span className="text-white/70">•</span>
                <span className="flex items-center gap-1 truncate">{empresa.correo}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botón Agregar */}
      <div className="bg-linear-to-b from-blue-50 to-white px-6 md:px-12 py-6 flex gap-3 flex-wrap">
        <button
          onClick={handleAgregarOferta}
          className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <FaPlus size={18} />
          Nueva Oferta de Trabajo
        </button>
        <button
          onClick={() => router.push(`/dashboard/empresa/${empresa.id}/kpi`)}
          className="inline-flex items-center gap-2 bg-linear-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <FaChartBar size={18} />
          Ver KPIs y Analítica
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <FormOfertaTrabajo
          oferta={selectedOferta}
          empresaId={empresa.id}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      )}

      {/* Error */}
      {error && (
        <div className="mx-6 md:mx-12 mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <p className="text-red-800 font-semibold">Error al cargar</p>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
      )}

      <main className="bg-linear-to-b from-blue-50 via-white to-purple-50 min-h-screen px-6 md:px-12 py-8">
        {/* Empty State */}
        {ofertas.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center max-w-md">
              <div className="text-8xl mb-6 animate-bounce">📭</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">No hay ofertas de trabajo</h4>
              <p className="text-gray-600 mb-8">
                Esta empresa aún no tiene ofertas publicadas. ¡Sé el primero en crear una!
              </p>
              <button
                onClick={handleAgregarOferta}
                className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <FaPlus size={18} />
                Crear Primera Oferta
              </button>
            </div>
          </div>
        )}

        {/* Cards View - Todos los dispositivos */}
        {ofertas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ofertas.map((oferta) => (
              <div
                key={oferta.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                {/* Gradiente en la parte superior */}
                <div className="h-2 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600"></div>

                {/* Contenido */}
                <div className="p-6">
                  {/* Categoría */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-3">
                    <FaBriefcase size={12} />
                    {oferta.ubicacion}
                  </div>

                  {/* Título */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {oferta.titulo}
                  </h3>

                  {/* Descripción */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{oferta.descripcion}</p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border-b border-gray-200">
                    {/* Salario */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-1">
                        <FaDollarSign size={14} className="text-green-600" />
                        SALARIO
                      </div>
                      <p className="text-lg font-bold text-green-600">Bs. {oferta.salario.toFixed(2)}</p>
                    </div>

                    {/* Fecha */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-1">
                        <FaCalendar size={14} className="text-purple-600" />
                        PUBLICADO
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(oferta.fechaPublicacion).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Requisitos Preview */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-2">
                      <FaGraduationCap size={14} className="text-orange-600" />
                      REQUISITOS
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{oferta.requisitos}</p>
                  </div>

                  {/* Botones de Acción */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(oferta)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white px-3 py-2 rounded-lg font-semibold transition-all duration-300 text-sm hover:shadow-md hover:scale-105 active:scale-95"
                      title="Ver oferta"
                    >
                      <FaEye size={14} />
                      Ver
                    </button>
                    <button
                      onClick={() => handleEdit(oferta)}
                      className="flex-1 flex items-center justify-center gap-2 bg-purple-100 hover:bg-purple-600 text-purple-600 hover:text-white px-3 py-2 rounded-lg font-semibold transition-all duration-300 text-sm hover:shadow-md hover:scale-105 active:scale-95"
                      title="Editar oferta"
                    >
                      <FaEdit size={14} />
                      Editar
                    </button>
                  </div>

                  {/* Botón Eliminar más prominente */}
                  <button
                    onClick={() => handleDelete(oferta.id)}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2.5 rounded-lg font-semibold transition-all duration-300 text-sm hover:shadow-lg hover:scale-105 active:scale-95 mt-3 border-2 border-red-600 hover:border-red-700"
                    title="Eliminar oferta"
                  >
                    <FaTrash size={16} />
                    Eliminar Oferta
                  </button>
                </div>

                {/* Esquina decorativa */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-linear-to-br from-blue-600/10 to-purple-600/10 rounded-bl-2xl"></div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default DetalleEmpresaOfertas;
