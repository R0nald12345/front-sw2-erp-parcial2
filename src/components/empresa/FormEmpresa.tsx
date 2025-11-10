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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card-modern max-w-md w-full p-8 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gradient mb-6">
          {empresa ? "✏️ Editar Empresa" : "🆕 Nueva Empresa"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo Nombre */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre Empresa *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Tech Solutions S.A."
              className={`input-modern w-full ${
                errors.nombre ? "border-red-500 ring-red-500" : ""
              }`}
              disabled={loading}
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-2 font-medium">{errors.nombre}</p>
            )}
          </div>

          {/* Campo Correo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correo Electrónico *
            </label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="contacto@empresa.com"
              className={`input-modern w-full ${
                errors.correo ? "border-red-500 ring-red-500" : ""
              }`}
              disabled={loading}
            />
            {errors.correo && (
              <p className="text-red-500 text-sm mt-2 font-medium">{errors.correo}</p>
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
              className={`input-modern w-full ${
                errors.rubro ? "border-red-500 ring-red-500" : ""
              }`}
              disabled={loading}
            />
            {errors.rubro && (
              <p className="text-red-500 text-sm mt-2 font-medium">{errors.rubro}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-3 mt-8 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="spinner-small"></div>
                  Guardando...
                </>
              ) : (
                <>
                  {empresa ? "✏️ Actualizar" : "🆕 Crear"}
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