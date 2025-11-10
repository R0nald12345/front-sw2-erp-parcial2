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
    <div className="group h-full bg-surface border-2 border-border rounded-2xl p-6 hover:shadow-xl hover:border-accent transition-all duration-300 flex flex-col">
      {/* Header de la Empresa */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-1">
              {offer.empresa?.rubro || "No especificado"}
            </p>
            <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
              {offer.titulo}
            </h3>
          </div>
        </div>
        <p className="text-sm font-medium text-text-secondary">
          {offer.empresa?.nombre || "Empresa desconocida"}
        </p>
      </div>

      {/* Descripción */}
      <p className="text-sm text-text-secondary mb-4 line-clamp-3">
        {offer.descripcion}
      </p>

      {/* Información Principal */}
      <div className="space-y-3 mb-6 flex-grow">
        {/* Ubicación */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
          <span className="text-sm text-text-secondary">{offer.ubicacion}</span>
        </div>

        {/* Salario */}
        {offer.salario && (
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-primary">
              ${offer.salario.toLocaleString("es-ES")}
            </span>
          </div>
        )}

        {/* Requisitos */}
        <div className="flex items-start gap-2">
          <Briefcase className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
          <span className="text-sm text-text-secondary line-clamp-2">
            {offer.requisitos}
          </span>
        </div>

        {/* Postulaciones */}
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-accent flex-shrink-0" />
          <span className="text-sm text-text-secondary">
            {postulacionesCount}{" "}
            <span className="text-text-tertiary">
              {postulacionesCount === 1 ? "postulación" : "postulaciones"}
            </span>
          </span>
        </div>

        {/* Fecha de Publicación */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-accent flex-shrink-0" />
          <span className="text-sm text-text-tertiary">{fechaFormato}</span>
        </div>
      </div>

      {/* Email de Contacto */}
      <div className="mb-4 p-3 bg-background rounded-lg">
        <p className="text-xs text-text-tertiary mb-1">Contacto:</p>
        <p className="text-sm font-medium text-primary break-all">
          {offer.empresa?.correo || "No disponible"}
        </p>
      </div>

      {/* Botón de Postulación */}
      <button
        onClick={onApply}
        className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        Postularme Ahora
      </button>
    </div>
  );
}