"use client";

import { useEmpresa } from "@/src/hooks/erp/useEmpresa";
import { useState, useMemo } from "react";
import HeaderEmpresa from "./HeaderEmpresa";
// import FormEmpresa from "./FormEmpresa";
import Swal from "sweetalert2";
import { EmpresaType, CreateEmpresaInput, UpdateEmpresaInput } from "@/src/types/erp/empresa.types";
import FormEmpresa from "./FormEmpresa";
import DetalleEmpresaOfertas from "./DetalleEmpresaOfertas";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const ListadoGeneralEmpresa = () => {
  const { empresas, loading, error, eliminarEmpresa, refetch, crearEmpresa, actualizarEmpresa } = useEmpresa();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState<EmpresaType | null>(null);
  const [vistaDetalle, setVistaDetalle] = useState<EmpresaType | null>(null);

  // Filtrar empresas por búsqueda
  const empresasFiltradas = useMemo(() => {
    if (searchTerm.trim() === "") return empresas;
    const term = searchTerm.toLowerCase();
    return empresas.filter(
      (empresa) =>
        empresa.nombre.toLowerCase().includes(term) ||
        empresa.correo.toLowerCase().includes(term) ||
        empresa.rubro.toLowerCase().includes(term)
    );
  }, [empresas, searchTerm]);

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
        await eliminarEmpresa(id);
        await Swal.fire({
          title: "¡Eliminado!",
          text: "Empresa eliminada correctamente.",
          icon: "success",
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      await Swal.fire({
        title: "Error",
        text: "Error al eliminar la empresa",
        icon: "error",
      });
    }
  };

  const handleEdit = (empresa: EmpresaType) => {
    console.log("✏️ Editando empresa:", empresa.id);
    setSelectedEmpresa(empresa);
    setShowForm(true);
  };

  const handleView = async (empresa: EmpresaType) => {
    console.log("👁️ Abriendo detalle de empresa:", empresa.id);
    setVistaDetalle(empresa);
  };

  const handleAgregarNuevo = () => {
    console.log("🆕 Crear nueva empresa");
    setSelectedEmpresa(null);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData: CreateEmpresaInput) => {
    try {
      if (selectedEmpresa) {
        // Actualizar empresa existente
        console.log("✏️ Actualizando empresa:", selectedEmpresa.id);
        await actualizarEmpresa({
          id: selectedEmpresa.id,
          ...formData,
        } as UpdateEmpresaInput);

        await Swal.fire({
          title: "¡Actualizado!",
          text: "Empresa actualizada correctamente.",
          icon: "success",
          timer: 2000,
        });
      } else {
        // Crear nueva empresa
        console.log("🆕 Creando nueva empresa");
        await crearEmpresa(formData);

        await Swal.fire({
          title: "¡Creado!",
          text: "Empresa creada correctamente.",
          icon: "success",
          timer: 2000,
        });
      }

      setShowForm(false);
      setSelectedEmpresa(null);
      await refetch();
    } catch (error) {
      console.error("Error en handleFormSubmit:", error);
      await Swal.fire({
        title: "Error",
        text: error instanceof Error ? error.message : "Error al guardar la empresa",
        icon: "error",
      });
    }
  };

  const handleFormClose = () => {
    console.log("❌ Cerrando formulario");
    setShowForm(false);
    setSelectedEmpresa(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="spinner-modern"></div>
        <span className="ml-3 text-gray-600 font-medium">Cargando empresas...</span>
      </div>
    );
  }

  // Si hay una empresa en vista detalle, mostrar el componente de detalle
  if (vistaDetalle) {
    return <DetalleEmpresaOfertas empresa={vistaDetalle} onBack={() => setVistaDetalle(null)} />;
  }

  return (
    <>
      <HeaderEmpresa onSearch={setSearchTerm} onAgregarNuevo={handleAgregarNuevo} />

      {error && (
        <div className="alert-error mx-4 md:mx-6 mb-6">
          <span className="font-semibold">Error al cargar</span>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {showForm && <FormEmpresa empresa={selectedEmpresa} onSubmit={handleFormSubmit} onCancel={handleFormClose} />}

      <main className="w-full mt-5 px-4">
        {/* Empty State */}
        {empresasFiltradas.length === 0 && (
          <div className="mx-4 md:mx-6 mb-6">
            <div className="card-modern p-8 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">No hay empresas</h4>
              <p className="text-gray-600">
                {searchTerm ? `No se encontraron empresas con "${searchTerm}"` : "Comienza agregando una nueva empresa"}
              </p>
            </div>
          </div>
        )}

        {/* Desktop Table View */}
        {empresasFiltradas.length > 0 && (
          <div className="hidden md:block mx-4 md:mx-6 mb-6">
            <div className="card-modern overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-primary border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Empresa</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Correo</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Rubro</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Ofertas</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {empresasFiltradas.map((empresa, index) => (
                    <tr
                      key={empresa.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } border-b border-gray-200 hover:bg-blue-50 transition-colors`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{empresa.nombre}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{empresa.correo}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{empresa.rubro}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">{empresa.ofertas?.length || 0}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => handleView(empresa)} className="btn-outline-small" title="Ver empresa">
                            <FaEye size={16} />
                          </button>
                          <button
                            onClick={() => handleEdit(empresa)}
                            className="btn-outline-small text-blue-600 hover:text-blue-700"
                            title="Editar empresa"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(empresa.id)}
                            className="btn-outline-small text-red-600 hover:text-red-700"
                            title="Eliminar empresa"
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
        {empresasFiltradas.length > 0 && (
          <div className="md:hidden mx-4 mb-6 space-y-4">
            {empresasFiltradas.map((empresa) => (
              <div key={empresa.id} className="card-modern p-4">
                <div className="mb-4">
                  <h4 className="font-semibold text-lg text-gray-900">🏢 {empresa.nombre}</h4>
                  <p className="text-sm text-gray-600 mt-1">{empresa.correo}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Rubro</p>
                    <p className="text-sm font-medium text-gray-900">{empresa.rubro}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Ofertas</p>
                    <p className="text-sm font-medium text-gray-900">{empresa.ofertas?.length || 0}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => handleView(empresa)} className="flex-1 btn-primary-small" title="Ver empresa">
                    <FaEye size={14} className="mr-2" />
                    Ver
                  </button>
                  <button
                    onClick={() => handleEdit(empresa)}
                    className="flex-1 btn-secondary-small"
                    title="Editar empresa"
                  >
                    <FaEdit size={14} className="mr-2" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(empresa.id)}
                    className="flex-1 btn-danger-small"
                    title="Eliminar empresa"
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

export default ListadoGeneralEmpresa;
