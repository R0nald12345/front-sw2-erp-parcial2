"use client";

import { useState } from "react";
import { JobOffersCard } from "../../components/job-offers-card";
import { ApplicationModal } from "../../components/application-modal";
import { Badge } from "../../components/ui/badge";
import { Briefcase, TrendingUp } from "lucide-react";

const mockOffers = [
  {
    id: "59f1c0c3-fcf6-483d-86ba-1cee74363434",
    titulo: "Desarrollador Full Stack",
    descripcion: "Buscamos desarrollador con experiencia en Spring Boot y React",
    salario: 5000,
    ubicacion: "La Paz, Bolivia",
    requisitos: "Java, Spring Boot, React, PostgreSQL",
    fechaPublicacion: "2025-11-01",
    empresa: {
      id: "c02dff4b-7550-42fb-9653-c8145102939b",
      nombre: "BioTech La Paz",
      correo: "info@biotech17622105151.com.bo",
      rubro: "Blockchain",
    },
    postulaciones: [
      {
        id: "2748b952-3390-4fe2-9872-a6fcc5774585",
        nombre: "Joseph Benitez Arroyo",
        estado: "PENDIENTE",
      },
    ],
  },
  {
    id: "0f73f3aa-15fe-4ea1-9cec-0ba8755f2174",
    titulo: "Ingeniero de Software",
    descripcion: "Implementación de soluciones de software escalables y eficientes para diversos sectores",
    salario: 9090.52,
    ubicacion: "Cochabamba",
    requisitos: "Experiencia en cloud computing, microservicios y arquitecturas distribuidas modernas",
    fechaPublicacion: "2024-04-05",
    empresa: {
      id: "c02dff4b-7550-42fb-9653-c8145102939b",
      nombre: "BioTech La Paz",
      correo: "info@biotech17622105151.com.bo",
      rubro: "Blockchain",
    },
    postulaciones: [
      {
        id: "20c90efa-5ff8-4797-9e6f-3d9390b10472",
        nombre: "Mauricio Alejandro Sánchez Soto",
        estado: "Aceptada",
      },
      {
        id: "c9cf22c2-aef6-4942-93ba-c78aae13f0ce",
        nombre: "Gladys Carmen Ticona Chura",
        estado: "Aceptada",
      },
    ],
  },
];

export default function OfertasPage() {
  const [selectedOffer, setSelectedOffer] = useState<(typeof mockOffers)[0] | null>(null);
  const [applications, setApplications] = useState<
    Array<{ offerId: string; name: string; email: string; phone: string }>
  >([]);

  const handleOpenOffer = (offer: (typeof mockOffers)[0]) => {
    setSelectedOffer(offer);
  };

  const handleCloseModal = () => {
    setSelectedOffer(null);
  };

  const handleSubmitApplication = (formData: { name: string; email: string; phone: string; cv: File | null }) => {
    if (selectedOffer) {
      setApplications([
        ...applications,
        {
          offerId: selectedOffer.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      ]);
      setSelectedOffer(null);
    }
  };

  const userApplications = applications;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary-foreground/20 rounded-lg">
              <Briefcase className="w-8 h-8" />
            </div>
            <span className="text-sm font-semibold tracking-wider uppercase opacity-90">Oportunidades</span>
          </div>
          <h1 className="text-5xl font-bold mb-2">Ofertas de Empleo</h1>
          <p className="text-lg opacity-90">Descubre las mejores oportunidades laborales en el mercado</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Total Ofertas</p>
                <p className="text-3xl font-bold text-primary">{mockOffers.length}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Postulaciones</p>
                <p className="text-3xl font-bold text-secondary">{applications.length}</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Briefcase className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Total de Candidatos</p>
                <p className="text-3xl font-bold text-accent">
                  {mockOffers.reduce((acc, offer) => acc + offer.postulaciones.length, 0)}
                </p>
              </div>
              <div className="p-3 bg-accent/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Ofertas */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Ofertas Disponibles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockOffers.map((offer) => (
              <JobOffersCard key={offer.id} offer={offer} onApply={() => handleOpenOffer(offer)} />
            ))}
          </div>
        </div>

        {/* Postulaciones */}
        {userApplications.length > 0 && (
          <div className="border-t border-border pt-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Briefcase className="w-5 h-5 text-accent" />
              </div>
              Mis Postulaciones ({userApplications.length})
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {userApplications.map((app, idx) => {
                const offer = mockOffers.find((o) => o.id === app.offerId);
                return (
                  <div
                    key={idx}
                    className="p-6 border border-border rounded-lg bg-card hover:shadow-lg transition-all duration-300 hover:border-primary/30"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg">{app.name}</h3>
                      <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 border-0">Enviada</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Puesto: <span className="font-medium text-foreground">{offer?.titulo}</span>
                    </p>
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="text-primary font-medium">{app.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Teléfono:</span>
                        <span className="font-medium">{app.phone}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {selectedOffer && (
        <ApplicationModal offer={selectedOffer} onClose={handleCloseModal} onSubmit={handleSubmitApplication} />
      )}
    </div>
  );
}
