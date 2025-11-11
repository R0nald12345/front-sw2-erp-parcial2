"use client";

import { useState, useEffect } from "react";
import { OfertaTrabajoType } from "@/src/types/erp/oferta-trabajo.types";

interface FormOfertaTrabajoProps {
  oferta?: OfertaTrabajoType | null;
  empresaId: string;
  onSubmit: (data: {
    titulo: string;
    descripcion: string;
    salario: number;
    ubicacion: string;
    requisitos: string;
    fechaPublicacion: string;
    empresaId: string;
  }) => Promise<void>;
  onCancel: () => void;
}

const FormOfertaTrabajo = ({ oferta, empresaId, onSubmit, onCancel }: FormOfertaTrabajoProps) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    salario: 0,
    ubicacion: "",
    requisitos: "",
    fechaPublicacion: new Date().toISOString().split("T")[0],
    empresaId: empresaId,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Llenar formulario si es edición
  useEffect(() => {
    if (oferta) {
      setFormData({
        titulo: oferta.titulo,
        descripcion: oferta.descripcion,
        salario: oferta.salario,
        ubicacion: oferta.ubicacion,
        requisitos: oferta.requisitos,
        fechaPublicacion: oferta.fechaPublicacion,
        empresaId: empresaId,
      });
    }
  }, [oferta, empresaId]);

  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es requerido";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es requerida";
    }

    if (formData.salario <= 0) {
      newErrors.salario = "El salario debe ser mayor a 0";
    }

    if (!formData.ubicacion.trim()) {
      newErrors.ubicacion = "La ubicación es requerida";
    }

    if (!formData.requisitos.trim()) {
      newErrors.requisitos = "Los requisitos son requeridos";
    }

    if (!formData.fechaPublicacion) {
      newErrors.fechaPublicacion = "La fecha de publicación es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "salario" ? parseFloat(value) || 0 : value,
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="card-modern max-w-lg w-full p-6 animate-fade-in-up my-4">
        <h2 className="text-xl font-bold text-gradient mb-4">{oferta ? "✏️ Editar Oferta" : "🆕 Nueva Oferta"}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Campo Título */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Título de la Posición *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ej: Desarrollador Full Stack"
              className={`input-modern w-full text-sm ${errors.titulo ? "border-red-500 ring-red-500" : ""}`}
              disabled={loading}
            />
            {errors.titulo && <p className="text-red-500 text-xs mt-1 font-medium">{errors.titulo}</p>}
          </div>

          {/* Campo Descripción */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Descripción *</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe el puesto..."
              rows={3}
              className={`input-modern w-full text-sm resize-none ${
                errors.descripcion ? "border-red-500 ring-red-500" : ""
              }`}
              disabled={loading}
            />
            {errors.descripcion && <p className="text-red-500 text-xs mt-1 font-medium">{errors.descripcion}</p>}
          </div>

          {/* Grid: Salario y Ubicación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Campo Salario */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Salario (Bs.) *</label>
              <input
                type="number"
                name="salario"
                value={formData.salario}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={`input-modern w-full text-sm ${errors.salario ? "border-red-500 ring-red-500" : ""}`}
                disabled={loading}
              />
              {errors.salario && <p className="text-red-500 text-xs mt-1 font-medium">{errors.salario}</p>}
            </div>

            {/* Campo Ubicación */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Ubicación *</label>
              <input
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                placeholder="Ej: Santa Cruz"
                className={`input-modern w-full text-sm ${errors.ubicacion ? "border-red-500 ring-red-500" : ""}`}
                disabled={loading}
              />
              {errors.ubicacion && <p className="text-red-500 text-xs mt-1 font-medium">{errors.ubicacion}</p>}
            </div>
          </div>

          {/* Campo Requisitos */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Requisitos *</label>
            <textarea
              name="requisitos"
              value={formData.requisitos}
              onChange={handleChange}
              placeholder="Lista requisitos, experiencias..."
              rows={2}
              className={`input-modern w-full text-sm resize-none ${
                errors.requisitos ? "border-red-500 ring-red-500" : ""
              }`}
              disabled={loading}
            />
            {errors.requisitos && <p className="text-red-500 text-xs mt-1 font-medium">{errors.requisitos}</p>}
          </div>

          {/* Campo Fecha de Publicación */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Fecha de Publicación *</label>
            <input
              type="date"
              name="fechaPublicacion"
              value={formData.fechaPublicacion}
              onChange={handleChange}
              className={`input-modern w-full text-sm ${errors.fechaPublicacion ? "border-red-500 ring-red-500" : ""}`}
              disabled={loading}
            />
            {errors.fechaPublicacion && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.fechaPublicacion}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-2 mt-5 pt-3 border-t border-gray-200">
            <button type="button" onClick={onCancel} disabled={loading} className="btn-secondary flex-1 text-sm py-2">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-2"
            >
              {loading ? (
                <>
                  <div className="spinner-small"></div>
                  Guardando...
                </>
              ) : (
                <>{oferta ? "✏️ Actualizar" : "🆕 Crear"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormOfertaTrabajo;
