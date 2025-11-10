"use client";

import type React from "react";

import { useState } from "react";
import { X, Upload, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

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
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="top-0 gradient-primary flex items-center justify-between p-8 rounded-t-2xl">
          <div className="flex-1">
            <h2 className="text-3xl font-bold">{offer.titulo}</h2>
            <p className="mt-2 font-medium">{offer.empresa.nombre}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-surface-secondary border-b-2 border-border">
          <div className="space-y-2">
            <p className="text-xs text-text-tertiary font-bold uppercase tracking-wider">Salario</p>
            <p className="text-2xl font-bold text-primary">${offer.salario.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-text-tertiary font-bold uppercase tracking-wider">Ubicación</p>
            <p className="text-2xl font-bold text-primary">{offer.ubicacion}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-text-tertiary font-bold uppercase tracking-wider">Contacto</p>
            <p className="text-lg font-semibold break-all">{offer.empresa.correo}</p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Offer Details */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-primary mb-3">Descripción de la Oferta</h3>
              <p className="text-text-secondary leading-relaxed">{offer.descripcion}</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-primary mb-3">Requisitos</h3>
              <p className="text-text-secondary leading-relaxed">{offer.requisitos}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 border-t-2 border-border pt-8">
            <div>
              <label className="block text-sm font-bold text-primary mb-3 uppercase tracking-wide">
                Nombre Completo *
              </label>
              <Input
                type="text"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="py-3 px-4 bg-surface border-2 border-border hover:border-accent transition-smooth focus:border-primary focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-primary mb-3 uppercase tracking-wide">Email *</label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="py-3 px-4 bg-surface border-2 border-border hover:border-accent transition-smooth focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-3 uppercase tracking-wide">Teléfono *</label>
                <Input
                  type="tel"
                  placeholder="+591 7 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="py-3 px-4 bg-surface border-2 border-border hover:border-accent transition-smooth focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-3 uppercase tracking-wide">
                Carta de Presentación
              </label>
              <Textarea
                placeholder="Cuéntanos por qué eres un buen candidato para esta posición..."
                value={formData.coverLetter}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    coverLetter: e.target.value,
                  }))
                }
                className="py-3 px-4 bg-surface border-2 border-border hover:border-accent transition-smooth focus:border-primary focus:outline-none"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-3 uppercase tracking-wide">
                Curriculum Vitae (CV) *
              </label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent hover:bg-accent/2 transition-smooth cursor-pointer group">
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
                <label htmlFor="cv-upload" className="cursor-pointer block">
                  {cvFile ? (
                    <>
                      <CheckCircle className="w-10 h-10 mx-auto mb-3 text-success" />
                      <p className="text-sm font-bold text-success">{cvFile.name}</p>
                      <p className="text-xs text-text-tertiary mt-1">Cambiar archivo</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 mx-auto mb-3 text-text-secondary group-hover:text-accent transition-smooth" />
                      <p className="text-sm font-semibold text-primary">Haz clic para subir tu CV</p>
                      <p className="text-xs text-text-tertiary mt-2">PDF, DOC o DOCX (máx. 5MB)</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t-2 border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-surface border-2 border-border text-primary hover:bg-surface-secondary hover:border-accent font-semibold py-3 rounded-lg transition-smooth"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !cvFile}
                className="flex-1 from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-bold py-3 rounded-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
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
