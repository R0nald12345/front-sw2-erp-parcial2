"use client";

import { MapPin, DollarSign, Briefcase, Users, Calendar } from "lucide-react";

interface Offer {
  id: string;
  titulo: string;
  descripcion: string;
  salario?: number;
  ubicacion: string;
  requisitos: string;
  fechaPublicacion: string;
  empresa?: {
    id: string;
    nombre: string;
    correo: string;
    rubro: string;
  };
  postulaciones?: Array<{
    id: string;
    nombre: string;
    estado: string;
  }>;
}

interface JobOffersCardProps {
  offer: Offer;
  onApply: () => void;
}

export function JobOffersCard({ offer, onApply }: JobOffersCardProps) {
  const postulacionesCount = offer.postulaciones?.length || 0;
  const fechaFormato = new Date(offer.fechaPublicacion).toLocaleDateString(
    "es-ES",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div className="group h-full bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-blue-400 transition-all duration-300 flex flex-col hover:scale-105 transform">
      {/* Header Gradiente */}
      <div className="bg-linear-to-r from-blue-600 via-blue-500 to-purple-600 px-6 py-5">
        <p className="text-xs font-bold text-blue-100 uppercase tracking-widest mb-2">
          {offer.empresa?.rubro || "Sector"}
        </p>
        <h3 className="text-xl font-bold text-white mb-1 leading-tight">
          {offer.titulo}
        </h3>
        <p className="text-blue-100 font-medium text-sm">
          {offer.empresa?.nombre || "Empresa desconocida"}
        </p>
      </div>

      {/* Descripción */}
      <div className="px-6 pt-5">
        <p className="text-sm text-gray-600 mb-5 line-clamp-2 leading-relaxed">
          {offer.descripcion}
        </p>
      </div>

      {/* Información Principal */}
      <div className="px-6 space-y-4 mb-6 grow">
        {/* Ubicación */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 rounded-lg p-2.5">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold">Ubicación</p>
            <span className="text-sm font-medium text-gray-800">{offer.ubicacion}</span>
          </div>
        </div>

        {/* Salario */}
        {offer.salario && (
          <div className="flex items-center gap-3">
            <div className="bg-green-100 rounded-lg p-2.5">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">Salario</p>
              <span className="text-sm font-bold text-green-600">
                ${offer.salario.toLocaleString("es-ES")}
              </span>
            </div>
          </div>
        )}

        {/* Requisitos */}
        <div className="flex items-start gap-3">
          <div className="bg-purple-100 rounded-lg p-2.5 mt-0.5">
            <Briefcase className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-semibold">Requisitos</p>
            <span className="text-sm text-gray-700 line-clamp-2">
              {offer.requisitos}
            </span>
          </div>
        </div>

        {/* Postulaciones y Fecha */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
            <Users className="w-4 h-4 text-orange-500" />
            <div>
              <p className="text-xs text-gray-500 font-semibold">Aplicantes</p>
              <span className="text-sm font-bold text-gray-800">
                {postulacionesCount}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
            <Calendar className="w-4 h-4 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500 font-semibold">Publicado</p>
              <span className="text-xs font-medium text-gray-800">{fechaFormato}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Email de Contacto */}
      <div className="mx-6 mb-5 p-4 bg-linear-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl">
        <p className="text-xs text-blue-700 font-bold mb-2 uppercase tracking-wider">📧 Contacto</p>
        <p className="text-sm font-semibold text-gray-800 break-all">
          {offer.empresa?.correo || "No disponible"}
        </p>
      </div>

      {/* Botón de Postulación */}
      <button
        onClick={onApply}
        className="m-6 mt-0 w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <span>✨</span> Postularme Ahora
      </button>
    </div>
  );
}