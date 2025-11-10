"use client";

import type React from "react";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";

interface Offer {
  id: string;
  titulo: string;
  descripcion: string;
  salario: number;
  ubicacion: string;
  requisitos: string;
  empresa: {
    nombre: string;
    correo: string;
  };
}

interface ApplicationModalProps {
  offer: Offer;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; phone: string; cv: File | null }) => void;
}

export function ApplicationModal({ offer, onClose, onSubmit }: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onSubmit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        cv: cvFile,
      });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-primary via-primary/95 to-secondary text-primary-foreground p-6 border-b border-primary/20">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="inline-block mb-3 px-3 py-1 bg-primary-foreground/20 rounded-lg">
                <p className="text-xs font-semibold uppercase tracking-wider opacity-90">Nueva Postulación</p>
              </div>
              <h2 className="text-3xl font-bold">{offer.titulo}</h2>
              <p className="text-sm opacity-90 mt-2">{offer.empresa.nombre}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary-foreground/20 rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-muted/50 border-b border-border">
          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Salario</p>
            <p className="text-2xl font-bold text-primary">${offer.salario.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Ubicación</p>
            <p className="text-lg font-bold">{offer.ubicacion}</p>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Contacto</p>
            <p className="text-sm font-medium text-primary break-all">{offer.empresa.correo}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Detalles de la oferta */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                Descripción del Puesto
              </h3>
              <p className="text-foreground leading-relaxed">{offer.descripcion}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <div className="w-1 h-6 bg-secondary rounded-full"></div>
                Requisitos
              </h3>
              <p className="text-foreground leading-relaxed">{offer.requisitos}</p>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6 pt-6 border-t border-border">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <div className="w-1 h-6 bg-accent rounded-full"></div>
              Tu Información
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Nombre Completo
                  <span className="text-destructive ml-1">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Juan Pérez García"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  className="h-10 border-border focus:ring-primary/30"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">
                    Email
                    <span className="text-destructive ml-1">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                    className="h-10 border-border focus:ring-primary/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">
                    Teléfono
                    <span className="text-destructive ml-1">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="+591 7 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    required
                    className="h-10 border-border focus:ring-primary/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Carta de Presentación</label>
                <Textarea
                  placeholder="Cuéntanos por qué eres un excelente candidato para esta posición..."
                  value={formData.coverLetter}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      coverLetter: e.target.value,
                    }))
                  }
                  rows={4}
                  className="border-border focus:ring-primary/30 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Curriculum Vitae (CV)
                  <span className="text-destructive ml-1">*</span>
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer hover:border-primary/50">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="cv-upload"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setCvFile(e.target.files[0]);
                      }
                    }}
                    required
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      {cvFile ? cvFile.name : "Haz clic para subir tu CV"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">PDF, DOC o DOCX (máx. 5MB)</p>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-border hover:bg-muted text-foreground bg-transparent"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !cvFile}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                {isSubmitting ? "Enviando..." : "Enviar Postulación"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
