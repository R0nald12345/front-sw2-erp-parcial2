"use client"

import { useState, useEffect } from "react";
//import Swal from "sweetalert2";
import { EmpresaType, CreateEmpresaInput } from "@/src/types/erp/empresa.types";

interface FormEmpresaProps {
  empresa?: EmpresaType | null;
  onSubmit: (data: CreateEmpresaInput) => Promise<void>;
  onCancel: () => void;
}

const FormEmpresa = ({ empresa, onSubmit, onCancel }: FormEmpresaProps) => {
  const [formData, setFormData] = useState<CreateEmpresaInput>({
    nombre: "",
    correo: "",
    rubro: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Llenar formulario si es edición
  useEffect(() => {
    if (empresa) {
      setFormData({
        nombre: empresa.nombre,
        correo: empresa.correo,
        rubro: empresa.rubro,
      });
    }
  }, [empresa]);

  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es requerido";
    } else if (!formData.correo.includes("@")) {
      newErrors.correo = "Correo inválido";
    }

    if (!formData.rubro.trim()) {
      newErrors.rubro = "El rubro es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
    } catch (error) {
      console.error("Error en handleSubmit:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-6">
          {empresa ? "✏️ Editar Empresa" : "🆕 Nueva Empresa"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Nombre */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Tech Solutions S.A."
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.nombre
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
            )}
          </div>

          {/* Campo Correo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correo *
            </label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="contacto@empresa.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.correo
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.correo && (
              <p className="text-red-500 text-sm mt-1">{errors.correo}</p>
            )}
          </div>

          {/* Campo Rubro */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rubro *
            </label>
            <input
              type="text"
              name="rubro"
              value={formData.rubro}
              onChange={handleChange}
              placeholder="Ej: Tecnología, Finanzas, etc."
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.rubro
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.rubro && (
              <p className="text-red-500 text-sm mt-1">{errors.rubro}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Guardando...
                </>
              ) : (
                <>
                  {empresa ? "Actualizar" : "Crear"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEmpresa;