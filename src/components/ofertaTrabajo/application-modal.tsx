"use client";

import { useState } from "react";
import { X, Upload, Loader } from "lucide-react";
import Swal from "sweetalert2";

interface Offer {
  id: string;
  titulo: string;
  descripcion: string;
  salario?: number;
  ubicacion: string;
  empresa?: {
    nombre: string;
    correo: string;
  };
}

interface ApplicationModalProps {
  offer: Offer;
  onClose: () => void;
  onSubmit: (formData: {
    name: string;
    email: string;
    phone: string;
    cv: File | null;
  }) => void;
}

export function ApplicationModal({
  offer,
  onClose,
  onSubmit,
}: ApplicationModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    cv: null as File | null,
  });
  const [cvFileName, setCvFileName] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea PDF
      if (!file.type.includes("pdf")) {
        Swal.fire({
          title: "Error",
          text: "Solo se aceptan archivos PDF",
          icon: "error",
        });
        return;
      }

      // Validar tamaño máximo (5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: "Error",
          text: "El archivo no debe superar 5MB",
          icon: "error",
        });
        return;
      }

      setFormData((prev) => ({
        ...prev,
        cv: file,
      }));
      setCvFileName(file.name);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Swal.fire({
        title: "Error",
        text: "Por favor ingresa tu nombre",
        icon: "error",
      });
      return false;
    }

    if (!formData.email.trim()) {
      Swal.fire({
        title: "Error",
        text: "Por favor ingresa tu email",
        icon: "error",
      });
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      Swal.fire({
        title: "Error",
        text: "Por favor ingresa un email válido",
        icon: "error",
      });
      return false;
    }

    if (!formData.phone.trim()) {
      Swal.fire({
        title: "Error",
        text: "Por favor ingresa tu teléfono",
        icon: "error",
      });
      return false;
    }

    if (!formData.cv) {
      Swal.fire({
        title: "Error",
        text: "Por favor adjunta tu CV en PDF",
        icon: "error",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simular delay

      onSubmit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        cv: formData.cv,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al enviar tu postulación",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-surface rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-border">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary to-accent p-6 flex items-center justify-between border-b-2 border-border">
          <div>
            <h2 className="text-2xl font-bold text-white">{offer.titulo}</h2>
            <p className="text-white/80 text-sm">{offer.empresa?.nombre}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Nombre Completo *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Tu nombre completo"
              className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Teléfono *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+591 70000000"
              className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          {/* CV */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Adjuntar CV (PDF) *
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="cv-input"
              />
              <label
                htmlFor="cv-input"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-background border-2 border-dashed border-border rounded-lg hover:border-accent cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5 text-accent" />
                <span className="text-sm text-text-secondary">
                  {cvFileName || "Selecciona tu CV"}
                </span>
              </label>
            </div>
            <p className="text-xs text-text-tertiary mt-2">
              Máximo 5MB | Solo PDF
            </p>
          </div>

          {/* Mensaje */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Mensaje (Opcional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Cuéntanos por qué te interesa esta posición..."
              rows={4}
              className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg focus:border-accent focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Detalles de la Oferta */}
          <div className="bg-background border-2 border-border rounded-lg p-4 space-y-2">
            <p className="text-xs font-semibold text-text-tertiary uppercase">
              Detalles de la Oferta
            </p>
            {offer.salario && (
              <p className="text-sm">
                <span className="text-text-tertiary">Salario: </span>
                <span className="font-semibold text-primary">
                  ${offer.salario.toLocaleString("es-ES")}
                </span>
              </p>
            )}
            <p className="text-sm">
              <span className="text-text-tertiary">Ubicación: </span>
              <span className="font-semibold text-primary">{offer.ubicacion}</span>
            </p>
            <p className="text-sm">
              <span className="text-text-tertiary">Contacto: </span>
              <span className="font-semibold text-primary text-xs break-all">
                {offer.empresa?.correo}
              </span>
            </p>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-background border-2 border-border rounded-lg font-semibold text-text-primary hover:bg-border transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Postulación"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}