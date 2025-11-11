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
  onSubmit: (formData: { cv: File | null }) => void;
}

export function ApplicationModal({ offer, onClose, onSubmit }: ApplicationModalProps) {
  const [loading, setLoading] = useState(false);
  const [cv, setCv] = useState<File | null>(null);
  const [cvFileName, setCvFileName] = useState("");

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

      setCv(file);
      setCvFileName(file.name);
    }
  };

  const validateForm = () => {
    if (!cv) {
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
      formDataToSend.append("pdf0", cv as File);
      formDataToSend.append("ofertaId", offer.id);

      // Hacer la petición HTTP
      // const response = await fetch("https://automatization-n8n-n8n.hnlumc.easypanel.host/webhook-test/form", {
      //   method: "POST",
      //   body: formDataToSend,
      // });
      const response = await fetch("https://automatization-n8n-n8n.hnlumc.easypanel.host/webhook/form", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Error al enviar la postulación");
      }

      await new Promise((resolve) => setTimeout(resolve, 500)); // Simular delay

      Swal.fire({
        title: "¡Éxito!",
        text: "Tu postulación ha sido enviada correctamente",
        icon: "success",
      });

      onSubmit({
        cv: cv,
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
            {/* Información importante del CV */}
            <div className="bg-linear-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6">
              <p className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-3">
                ⚠️ Información importante
              </p>
              <div className="space-y-2 text-sm text-amber-900">
                <p className="font-semibold">Tu CV debe contener los siguientes datos:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    📝 <strong>Nombre</strong> completo
                  </li>
                  <li>
                    📧 <strong>Email</strong> de contacto
                  </li>
                  <li>
                    📱 <strong>Teléfono</strong> de contacto
                  </li>
                  <li>
                    💼 <strong>Puesto actual</strong> (si aplica)
                  </li>
                  <li>
                    ⏰ <strong>Años de experiencia</strong>
                  </li>
                  <li>
                    🎓 <strong>Nivel de educación</strong>
                  </li>
                  <li>
                    🛠️ <strong>Habilidades</strong> profesionales
                  </li>
                  <li>
                    🌐 <strong>Idiomas</strong> que dominas
                  </li>
                  <li>
                    🏆 <strong>Certificaciones</strong> relevantes
                  </li>
                </ul>
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
                  className={`flex items-center justify-center gap-3 w-full px-6 py-6 bg-linear-to-br from-blue-50 to-purple-50 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
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
