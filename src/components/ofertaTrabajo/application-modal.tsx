"use client";

import { useState } from "react";
import { X, Upload, Loader } from "lucide-react";
import Swal from "sweetalert2";

interface Offer {
  id: string; // ofertaId
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
  onSubmit: (formData: { name: string; email: string; phone: string; cv: File | null }) => void;
}

export function ApplicationModal({ offer, onClose, onSubmit }: ApplicationModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    cv: null as File | null,
  });
  const [cvFileName, setCvFileName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

      // Crear FormData para enviar el CV y el ofertaId
      const formDataToSend = new FormData();
      formDataToSend.append("pdf0", formData.cv as File);
      formDataToSend.append("ofertaId", offer.id);

      // Hacer la petición HTTP
      const response = await fetch("https://automatization-n8n-n8n.hnlumc.easypanel.host/webhook/form", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Error al enviar la postulación");
      }

      await new Promise((resolve) => setTimeout(resolve, 500)); // Simular delay

      onSubmit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        cv: formData.cv, // pdf0
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
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header con Gradiente */}
        <div className="sticky top-0 bg-linear-to-r from-blue-600 via-blue-500 to-purple-600 p-8 flex items-start justify-between z-10">
          <div className="flex-1 pr-4">
            <h2 className="text-3xl font-bold text-white mb-2 leading-tight">{offer.titulo}</h2>
            <p className="text-blue-100 font-medium">{offer.empresa?.nombre}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 text-white hover:bg-white/20 rounded-full p-2 transition-all duration-300 hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido Scrolleable */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Grid de Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Nombre Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Juan Pérez García"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="juan@email.com"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+591 70000000"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Adjuntar CV (PDF) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="cv-input" />
                <label
                  htmlFor="cv-input"
                  className={`flex items-center justify-center gap-3 w-full px-6 py-4 bg-linear-to-br from-blue-50 to-purple-50 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
                    cvFileName
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300 hover:border-blue-400 hover:from-blue-100 hover:to-purple-100"
                  }`}
                >
                  <Upload className={`w-6 h-6 ${cvFileName ? "text-green-500" : "text-blue-500"}`} />
                  <div className="text-center">
                    <span className={`text-sm font-semibold ${cvFileName ? "text-green-700" : "text-gray-700"}`}>
                      {cvFileName ? "✓ " + cvFileName : "Selecciona tu CV"}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Máximo 5MB</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Mensaje (Opcional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Cuéntanos por qué te interesa esta posición y qué te hace un buen candidato..."
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-300 resize-none text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Detalles de la Oferta - Card mejorada */}
            <div className="bg-linear-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 space-y-3">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">📋 Detalles de la Oferta</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">💼 Empresa:</span>
                  <span className="font-semibold text-gray-800">{offer.empresa?.nombre}</span>
                </div>
                {offer.salario && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">💰 Salario:</span>
                    <span className="font-bold text-lg text-blue-600">${offer.salario.toLocaleString("es-ES")}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">📍 Ubicación:</span>
                  <span className="font-semibold text-gray-800">{offer.ubicacion}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-600 text-sm">📧 Contacto:</span>
                  <span className="font-semibold text-gray-800 text-right break-all max-w-xs">
                    {offer.empresa?.correo}
                  </span>
                </div>
                <div className="flex justify-between items-start pt-2 border-t border-blue-200">
                  <span className="text-gray-600 text-sm">📝 Descripción:</span>
                  <span className="text-gray-700 text-sm text-right max-w-xs line-clamp-3">{offer.descripcion}</span>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-105"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "✓ Enviar Postulación"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
