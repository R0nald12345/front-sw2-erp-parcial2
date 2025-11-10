"use client";

import { useState, useEffect } from "react";
import { JobOffersCard } from "../../components/ofertaTrabajo/job-offers-card";
import { ApplicationModal } from "../../components/ofertaTrabajo/application-modal";
import { Search, Briefcase, Loader } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useOfertaTrabajo } from "@/src/hooks/erp/useOfertaTrabajo";
import Swal from "sweetalert2";

export default function OfertasPage() {
  const [selectedOffer, setSelectedOffer] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState<
    Array<{ offerId: string; name: string; email: string; phone: string }>
  >([]);

  const { ofertas, loading, error, refetch } = useOfertaTrabajo();

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
      });
    }
  }, [error]);

  const handleOpenOffer = (offer: any) => {
    setSelectedOffer(offer);
  };

  const handleCloseModal = () => {
    setSelectedOffer(null);
  };

  const handleSubmitApplication = async (formData: {
    name: string;
    email: string;
    phone: string;
    cv: File | null;
  }) => {
    if (selectedOffer) {
      try {
        // Aquí puedes agregar la lógica para enviar la postulación al API
        setApplications([
          ...applications,
          {
            offerId: selectedOffer.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
        ]);

        Swal.fire({
          title: "¡Éxito!",
          text: "Tu postulación ha sido enviada correctamente",
          icon: "success",
        });

        setSelectedOffer(null);
      } catch (error) {
        console.error("Error submitting application:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al enviar tu postulación",
          icon: "error",
        });
      }
    }
  };

  // Filtrar ofertas basado en la búsqueda
  const filteredOffers = ofertas.filter(
    (offer) =>
      offer.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.empresa?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener postulaciones del usuario
  const userApplications = applications;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="w-8 h-8" />
          <span className="text-sm font-semibold tracking-widest opacity-90">
            OPORTUNIDADES LABORALES
          </span>
        </div>
        <h1 className="text-5xl font-bold mb-2 text-pretty">
          Encuentra tu próxima oportunidad
        </h1>
        <p className="text-lg opacity-90 max-w-2xl">
          Explora{" "}
          <span className="font-bold text-primary">{ofertas.length}</span>{" "}
          ofertas de empleo exclusivas y únete a equipos innovadores en tecnología
        </p>
      </div>

      {/* Buscador */}
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

        {/* Sección de Ofertas */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <h2 className="text-3xl font-bold">Ofertas disponibles</h2>
            <span className="bg-accent text-primary px-4 py-2 rounded-full font-semibold text-sm">
              {filteredOffers.length}
            </span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader className="w-12 h-12 animate-spin text-primary" />
              <p className="text-text-secondary">Cargando ofertas...</p>
            </div>
          ) : filteredOffers.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredOffers.map((offer) => (
                <JobOffersCard
                  key={offer.id}
                  offer={offer}
                  onApply={() => handleOpenOffer(offer)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-surface border-2 border-border rounded-xl">
              <p className="text-text-secondary text-lg mb-4">
                No encontramos ofertas que coincidan con tu búsqueda
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  refetch();
                }}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Ver todas las ofertas
              </button>
            </div>
          )}
        </div>

        {/* Sección de Mis Postulaciones */}
        {userApplications.length > 0 && (
          <div className="border-t-2 border-border pt-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="w-1 h-8 bg-accent rounded-full"></span>
              Mis Postulaciones
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {userApplications.map((app, idx) => {
                const offer = ofertas.find((o) => o.id === app.offerId);
                return (
                  <div
                    key={idx}
                    className="p-6 bg-surface border-2 border-border rounded-xl hover:shadow-lg hover:border-accent transition-smooth group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-primary group-hover:text-primary transition-smooth">
                          {app.name}
                        </h3>
                        <p className="text-xs text-text-tertiary mt-1">
                          {app.email}
                        </p>
                      </div>
                      <span className="inline-block bg-success/10 text-success px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                        Enviada
                      </span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-text-secondary mb-1">
                        Oferta:
                      </p>
                      <p className="font-semibold text-primary text-sm">
                        {offer?.titulo}
                      </p>
                      <p className="text-xs text-text-tertiary mt-2">
                        💼 {offer?.empresa?.nombre}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        📍 {offer?.ubicacion}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Si no hay postulaciones */}
        {userApplications.length === 0 && !loading && (
          <div className="mt-12 text-center">
            <p className="text-text-secondary text-lg">
              Aún no has enviado ninguna postulación
            </p>
          </div>
        )}
      </div>

      {/* Modal de Postulación */}
      {selectedOffer && (
        <ApplicationModal
          offer={selectedOffer}
          onClose={handleCloseModal}
          onSubmit={handleSubmitApplication}
        />
      )}
    </div>
  );
}