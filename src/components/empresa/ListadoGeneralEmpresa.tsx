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

      <main className="w-full mt-5">
        {/* Empty State */}
        {empresasFiltradas.length === 0 && (
          <div className="mx-6 mb-6">
            <div className="card-modern p-8 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">No hay empresas</h4>
              <p className="text-gray-600">
                {searchTerm ? `No se encontraron empresas con "${searchTerm}"` : "Comienza agregando una nueva empresa"}
              </p>
            </div>
          </div>
        )}

        {/* Table View - SIEMPRE VISIBLE CON ACCIONES */}
        {empresasFiltradas.length > 0 && (
          <div className="mx-6 mb-6">
            <div className="card-modern" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: "1200px", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#2563eb", borderBottom: "1px solid #e5e7eb" }}>
                    <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "white" }}>
                      Empresa
                    </th>
                    <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "white" }}>
                      Correo
                    </th>
                    <th style={{ padding: "16px 24px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "white" }}>
                      Rubro
                    </th>
                    <th style={{ padding: "16px 24px", textAlign: "center", fontSize: "14px", fontWeight: "600", color: "white" }}>
                      Ofertas
                    </th>
                    <th style={{ padding: "16px 24px", textAlign: "center", fontSize: "14px", fontWeight: "600", color: "white" }}>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {empresasFiltradas.map((empresa, index) => (
                    <tr
                      key={empresa.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb",
                        borderBottom: "1px solid #e5e7eb",
                        transition: "background-color 0.3s"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eff6ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#ffffff" : "#f9fafb")}
                    >
                      <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "500", color: "#111827" }}>
                        {empresa.nombre}
                      </td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", color: "#4b5563" }}>
                        {empresa.correo}
                      </td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", color: "#4b5563" }}>
                        {empresa.rubro}
                      </td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", color: "#4b5563", textAlign: "center" }}>
                        {empresa.ofertas?.length || 0}
                      </td>
                      <td style={{ padding: "16px 24px", textAlign: "center" }}>
                        <div style={{ display: "flex", justifyContent: "center", gap: "12px", alignItems: "center" }}>
                          <button
                            onClick={() => handleView(empresa)}
                            style={{
                              border: "1px solid #d1d5db",
                              backgroundColor: "#ffffff",
                              padding: "8px 10px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#f3f4f6";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "#ffffff";
                            }}
                            title="Ver empresa"
                          >
                            <FaEye size={16} color="#4b5563" />
                          </button>
                          <button
                            onClick={() => handleEdit(empresa)}
                            style={{
                              border: "1px solid #d1d5db",
                              backgroundColor: "#ffffff",
                              padding: "8px 10px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#dbeafe";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "#ffffff";
                            }}
                            title="Editar empresa"
                          >
                            <FaEdit size={16} color="#2563eb" />
                          </button>
                          <button
                            onClick={() => handleDelete(empresa.id)}
                            style={{
                              border: "1px solid #d1d5db",
                              backgroundColor: "#ffffff",
                              padding: "8px 10px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#fee2e2";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "#ffffff";
                            }}
                            title="Eliminar empresa"
                          >
                            <FaTrash size={16} color="#dc2626" />
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
      </main>
    </>
  );
};

export default ListadoGeneralEmpresa;
