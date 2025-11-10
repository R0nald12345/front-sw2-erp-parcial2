"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { MapPin, DollarSign, Calendar, Users } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";

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
    <Card className="flex flex-col h-full hover:shadow-xl hover:border-primary/30 transition-all duration-300 group overflow-hidden">
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border p-6">
        <div className="flex justify-between items-start gap-3 mb-2">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {offer.titulo}
            </h3>
            <p className="text-sm text-muted-foreground mt-2">{offer.empresa.nombre}</p>
          </div>
          <Badge variant="secondary" className="whitespace-nowrap">
            {offer.empresa.rubro}
          </Badge>
        </div>
      </div>

      <CardContent className="flex-1 space-y-4 p-6">
        <p className="text-sm text-foreground leading-relaxed">{offer.descripcion}</p>

        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
            <DollarSign className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-semibold">Salario</p>
              <p className="font-bold text-primary">${offer.salario.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
            <MapPin className="w-5 h-5 text-secondary flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-semibold">Ubicación</p>
              <p className="font-medium">{offer.ubicacion}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
            <Calendar className="w-5 h-5 text-accent flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-semibold">Publicado</p>
              <p className="font-medium">{new Date(offer.fechaPublicacion).toLocaleDateString("es-ES")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
            <Users className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-semibold">Candidatos</p>
              <p className="font-bold">{applicationsCount}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground font-semibold uppercase mb-2">Requisitos Clave</p>
          <p className="text-sm text-foreground leading-relaxed">{offer.requisitos}</p>
        </div>
      </CardContent>

      <div className="p-6 border-t border-border bg-muted/30">
        <Button
          onClick={onApply}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          Ver oferta y postularme
        </Button>
      </div>
    </Card>
  );
}
