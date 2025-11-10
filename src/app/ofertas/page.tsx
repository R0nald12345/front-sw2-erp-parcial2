"use client";

import { useState } from "react";
import { JobOffersCard } from "../../components/ofertaTrabajo/job-offers-card";
import { ApplicationModal } from "../../components/ofertaTrabajo/application-modal";
import { Search, Briefcase } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useOfertaTrabajo } from "@/src/hooks/erp/useOfertaTrabajo";

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
  {
    id: "3c4e5f6a-7b8c-9d0e-1f2g-3h4i5j6k7l8m",
    titulo: "Especialista en UX/UI Design",
    descripcion: "Diseña interfaces elegantes para plataforma de fintech de última generación",
    salario: 6500,
    ubicacion: "Santa Cruz",
    requisitos: "Figma, Adobe XD, Prototipado, Design Systems",
    fechaPublicacion: "2025-10-28",
    empresa: {
      id: "d03egg5c-8551-42fb-9653-c8145102939b",
      nombre: "TechVision Inc",
      correo: "careers@techvision.com.bo",
      rubro: "FinTech",
    },
    postulaciones: [],
  },
  {
    id: "4d5f6g7h-8i9j-0k1l-2m3n-4o5p6q7r8s9t",
    titulo: "DevOps Engineer",
    descripcion: "Gestiona infraestructura en la nube y automatiza procesos de deployment",
    salario: 7800,
    ubicacion: "La Paz, Bolivia",
    requisitos: "Kubernetes, Docker, AWS, CI/CD pipelines",
    fechaPublicacion: "2025-10-25",
    empresa: {
      id: "e04fhh6d-9662-52fc-0754-d9256213a50c",
      nombre: "CloudNative Solutions",
      correo: "jobs@cloudnative.bo",
      rubro: "Cloud Computing",
    },
    postulaciones: [],
  },
];

export default function OfertasPage() {
  const [selectedOffer, setSelectedOffer] = useState<(typeof mockOffers)[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState<
    Array<{ offerId: string; name: string; email: string; phone: string }>
  >([]);

  const { ofertas } = useOfertaTrabajo();
  console.log("📊 Ofertas:", ofertas);

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

  const filteredOffers = mockOffers.filter(
    (offer) =>
      offer.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userApplications = applications;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="w-8 h-8" />
          <span className="text-sm font-semibold tracking-widest opacity-90">OPORTUNIDADES LABORALES</span>
        </div>
        <h1 className="text-5xl font-bold mb-2 text-pretty">Encuentra tu próxima oportunidad</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          Explora ofertas de empleo exclusivas y únete a equipos innovadores en tecnología
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
            <Input
              type="text"
              placeholder="Busca por puesto, empresa o ubicación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-6 bg-surface border-2 border-border hover:border-accent transition-smooth focus:border-primary focus:outline-none text-base"
            />
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <h2 className="text-3xl font-bold">Ofertas disponibles</h2>
            <span className="bg-accent text-primary px-4 py-2 rounded-full font-semibold text-sm">
              {filteredOffers.length}
            </span>
          </div>

          {filteredOffers.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredOffers.map((offer) => (
                <JobOffersCard key={offer.id} offer={offer} onApply={() => handleOpenOffer(offer)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary text-lg">No encontramos ofertas que coincidan con tu búsqueda</p>
            </div>
          )}
        </div>

        {userApplications.length > 0 && (
          <div className="border-t-2 border-border pt-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="w-1 h-8 bg-accent rounded-full"></span>
              Mis Postulaciones
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {userApplications.map((app, idx) => {
                const offer = mockOffers.find((o) => o.id === app.offerId);
                return (
                  <div
                    key={idx}
                    className="p-6 bg-surface border-2 border-border rounded-xl hover:shadow-lg hover:border-accent transition-smooth group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-primary group-hover:text-primary transition-smooth">
                        {app.name}
                      </h3>
                      <span className="inline-block bg-success/10 text-success px-3 py-1 rounded-full text-xs font-semibold">
                        Enviada
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mb-3">
                      Oferta: <span className="font-semibold text-primary">{offer?.titulo}</span>
                    </p>
                    <p className="text-xs text-text-tertiary">{app.email}</p>
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
