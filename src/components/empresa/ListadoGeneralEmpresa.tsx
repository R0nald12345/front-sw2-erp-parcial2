"use client"

import { useEmpresa } from "@/src/hooks/erp/useEmpresa";
import { useState, useMemo } from "react";
import ListadoEmpresa from "./ListadoEmpresa";
import HeaderEmpresa from "./HeaderEmpresa";
// import FormEmpresa from "./FormEmpresa";
import Swal from "sweetalert2";
import { EmpresaType, CreateEmpresaInput, UpdateEmpresaInput } from "@/src/types/erp/empresa.types";
import FormEmpresa from "./FormEmpresa";

const ListadoGeneralEmpresa = () => {
  const { empresas, loading, error, eliminarEmpresa, refetch, crearEmpresa, actualizarEmpresa } = useEmpresa();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState<EmpresaType | null>(null);

  // Filtrar empresas por búsqueda
  const empresasFiltradas = useMemo(() => {
    if (searchTerm.trim() === "") return empresas;
    const term = searchTerm.toLowerCase();
    return empresas.filter((empresa) =>
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
    console.log('✏️ Editando empresa:', empresa.id);
    setSelectedEmpresa(empresa);
    setShowForm(true);
  };

  const handleView = async (empresa: EmpresaType) => {
    await Swal.fire({
      title: empresa.nombre,
      html: `
        <div class="text-left space-y-2">
          <p><strong>ID:</strong> ${empresa.id}</p>
          <p><strong>Correo:</strong> ${empresa.correo}</p>
          <p><strong>Rubro:</strong> ${empresa.rubro}</p>
          ${empresa.createdAt ? `<p><strong>Creado:</strong> ${new Date(empresa.createdAt).toLocaleDateString('es-ES')}</p>` : ''}
          ${empresa.updatedAt ? `<p><strong>Actualizado:</strong> ${new Date(empresa.updatedAt).toLocaleDateString('es-ES')}</p>` : ''}
          ${empresa.ofertas && empresa.ofertas.length > 0 ? `<p><strong>Ofertas:</strong> ${empresa.ofertas.length}</p>` : ''}
        </div>
      `,
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  };

  const handleAgregarNuevo = () => {
    console.log('🆕 Crear nueva empresa');
    setSelectedEmpresa(null);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData: CreateEmpresaInput) => {
    try {
      if (selectedEmpresa) {
        // Actualizar empresa existente
        console.log('✏️ Actualizando empresa:', selectedEmpresa.id);
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
        console.log('🆕 Creando nueva empresa');
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
    console.log('❌ Cerrando formulario');
    setShowForm(false);
    setSelectedEmpresa(null);
  };

  if (loading) {
    return (
      <div className="w-full p-6 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando empresas...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeaderEmpresa 
        onSearch={setSearchTerm} 
        onAgregarNuevo={handleAgregarNuevo}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-b-xl mb-4">
          ⚠️ Error: {error}
        </div>
      )}

      {showForm && (
        <FormEmpresa
          empresa={selectedEmpresa}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      )}

      <main className="w-full mt-5 px-4">
        {/* Vista para pantallas grandes */}
        <div className="hidden md:flex flex-col justify-center w-full">
          <ul className="w-full flex bg-white gap-1 mb-3 rounded-xl shadow-lg">
            <li className="font-semibold text-start w-[28%] px-3 py-2">
              Nombre
            </li>
            <li className="font-semibold text-start w-[30%] px-3 py-2">
              Correo
            </li>
            <li className="font-semibold text-center w-[15%] px-3 py-2">
              Rubro
            </li>
            <li className="font-semibold text-center w-[12%] px-3 py-2">
              Ofertas
            </li>
            <li className="font-semibold text-center w-[15%] px-3 py-2">
              Acciones
            </li>
          </ul>

          <section className="mt-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {empresasFiltradas.length > 0 ? (
              empresasFiltradas.map((empresa) => (
                <ListadoEmpresa
                  key={empresa.id}
                  empresa={empresa}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onView={handleView}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 bg-white rounded-xl">
                📭 No hay empresas para mostrar
              </div>
            )}
          </section>
        </div>

        {/* Vista para pantallas pequeñas */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {empresasFiltradas.length > 0 ? (
            empresasFiltradas.map((empresa) => (
              <div key={empresa.id} className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h4 className="font-bold text-lg mb-2">🏢 {empresa.nombre}</h4>
                <p className="text-gray-600 mb-1 text-sm">
                  <strong>Correo:</strong> {empresa.correo}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                  <strong>Rubro:</strong> {empresa.rubro}
                </p>
                {empresa.ofertas && empresa.ofertas.length > 0 && (
                  <p className="text-gray-600 mb-4 text-sm">
                    <strong>Ofertas:</strong> {empresa.ofertas.length}
                  </p>
                )}
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => handleView(empresa)}
                    className="flex-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition text-sm"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => handleEdit(empresa)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(empresa.id)}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 bg-white rounded-xl">
              📭 No hay empresas para mostrar
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ListadoGeneralEmpresa;