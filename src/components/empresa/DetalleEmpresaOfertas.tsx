"use client";

import { useOfertasEmpresa } from "@/src/hooks/erp/useOfertasEmpresa";
import { EmpresaType, OfertaTrabajoType } from "@/src/types/erp/oferta-trabajo.types";
import { useState } from "react";
import FormOfertaTrabajo from "../ofertaTrabajo/FormOfertaTrabajo";
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";

interface DetalleEmpresaOfertasProps {
  empresa: EmpresaType;
  onBack: () => void;
}

const DetalleEmpresaOfertas = ({ empresa, onBack }: DetalleEmpresaOfertasProps) => {
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
      {/* Header */}
      <div className="bg-gradient-primary text-white px-4 md:px-6 py-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
          >
            <FaArrowLeft size={18} />
            <span className="font-medium">Volver</span>
          </button>
        </div>
        <h1 className="text-3xl font-bold">🏢 {empresa.nombre}</h1>
        <p className="text-white/80 mt-2">
          {empresa.rubro} • {empresa.correo}
        </p>
      </div>

      {/* Botón Agregar */}
      <div className="px-4 md:px-6 mb-6">
        <button onClick={handleAgregarOferta} className="btn-primary flex items-center gap-2">
          <FaPlus size={18} />
          Nueva Oferta de Trabajo
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
        <div className="alert-error mx-4 md:mx-6 mb-6">
          <span className="font-semibold">Error al cargar</span>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      <main className="w-full px-4 md:px-6">
        {/* Empty State */}
        {ofertas.length === 0 && (
          <div className="mx-4 md:mx-6 mb-6">
            <div className="card-modern p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">No hay ofertas de trabajo</h4>
              <p className="text-gray-600 mb-6">Esta empresa aún no tiene ofertas publicadas</p>
              <button onClick={handleAgregarOferta} className="btn-primary inline-flex items-center gap-2">
                <FaPlus size={16} />
                Crear Primera Oferta
              </button>
            </div>
          </div>
        )}

        {/* Desktop Table View */}
        {ofertas.length > 0 && (
          <div className="hidden md:block mx-4 md:mx-6 mb-6">
            <div className="card-modern overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-primary border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Posición</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Ubicación</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Salario (Bs.)</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Publicado</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ofertas.map((oferta, index) => (
                    <tr
                      key={oferta.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } border-b border-gray-200 hover:bg-blue-50 transition-colors`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{oferta.titulo}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{oferta.ubicacion}</td>
                      <td className="px-6 py-4 text-sm font-bold text-green-600 text-center">
                        Bs. {oferta.salario.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(oferta.fechaPublicacion).toLocaleDateString("es-ES")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => handleView(oferta)} className="btn-outline-small" title="Ver oferta">
                            <FaEye size={16} />
                          </button>
                          <button
                            onClick={() => handleEdit(oferta)}
                            className="btn-outline-small text-blue-600 hover:text-blue-700"
                            title="Editar oferta"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(oferta.id)}
                            className="btn-outline-small text-red-600 hover:text-red-700"
                            title="Eliminar oferta"
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
        {ofertas.length > 0 && (
          <div className="md:hidden mx-4 mb-6 space-y-4">
            {ofertas.map((oferta) => (
              <div key={oferta.id} className="card-modern p-4">
                <div className="mb-4">
                  <h4 className="font-semibold text-lg text-gray-900">{oferta.titulo}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(oferta.fechaPublicacion).toLocaleDateString("es-ES")}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Ubicación</p>
                    <p className="text-sm font-medium text-gray-900">{oferta.ubicacion}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Salario</p>
                    <p className="text-sm font-bold text-green-600">Bs. {oferta.salario.toFixed(2)}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{oferta.descripcion}</p>

                <div className="flex gap-2">
                  <button onClick={() => handleView(oferta)} className="flex-1 btn-primary-small" title="Ver oferta">
                    <FaEye size={14} className="mr-2" />
                    Ver
                  </button>
                  <button
                    onClick={() => handleEdit(oferta)}
                    className="flex-1 btn-secondary-small"
                    title="Editar oferta"
                  >
                    <FaEdit size={14} className="mr-2" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(oferta.id)}
                    className="flex-1 btn-danger-small"
                    title="Eliminar oferta"
                  >
                    <FaTrash size={14} className="mr-2" />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default DetalleEmpresaOfertas;
