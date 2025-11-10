"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { MapPin, DollarSign, Users, ArrowRight } from "lucide-react";

interface Offer {
  id: string;
  titulo: string;
  descripcion: string;
  salario: number;
  ubicacion: string;
  requisitos: string;
  fechaPublicacion: string;
  empresa: {
    nombre: string;
    rubro: string;
  };
  postulaciones: Array<{ id: string; nombre: string; estado: string }>;
}

interface JobOffersCardProps {
  offer: Offer;
  onApply: () => void;
}

export function JobOffersCard({ offer, onApply }: JobOffersCardProps) {
  const applicationsCount = offer.postulaciones.length;

  return (
    <Card className="flex flex-col h-full border-2 border-border hover:border-accent hover:shadow-2xl transition-smooth group bg-surface overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary-light"></div>

      <CardHeader className="pb-2">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <CardTitle className="text-lg font-bold text-primary group-hover:text-primary transition-smooth">
                {offer.titulo}
              </CardTitle>
              <p className="text-xs text-text-secondary mt-1 font-medium">{offer.empresa.nombre}</p>
            </div>
            <span className="inline-block bg-accent/10 text-primary px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap">
              {offer.empresa.rubro}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 pb-3">
        <p className="text-xs text-text-secondary leading-snug line-clamp-1">{offer.descripcion}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 bg-surface-secondary rounded-lg hover:bg-accent/5 transition-smooth">
            <DollarSign className="w-4 h-4 text-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-primary">${offer.salario.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-2 p-2 bg-surface-secondary rounded-lg hover:bg-accent/5 transition-smooth">
            <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
            <span className="text-xs text-text-secondary">{offer.ubicacion}</span>
          </div>

          <div className="flex items-center gap-2 p-2 bg-surface-secondary rounded-lg hover:bg-accent/5 transition-smooth">
            <Users className="w-4 h-4 text-accent flex-shrink-0" />
            <span className="text-xs text-text-secondary">
              <span className="font-semibold text-primary">{applicationsCount}</span> postulaciones
            </span>
          </div>
        </div>

        <div className="pt-2 border-t-2 border-border">
          <p className="text-xs text-text-tertiary font-bold mb-1 uppercase tracking-wide">Requisitos:</p>
          <p className="text-xs text-text-secondary leading-snug line-clamp-1">{offer.requisitos}</p>
        </div>
      </CardContent>

      <div className="p-3 border-t-2 border-border">
        <Button
          onClick={onApply}
          className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 group/btn transition-smooth text-sm"
        >
          Ver oferta y postularme
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Card>
  );
}
