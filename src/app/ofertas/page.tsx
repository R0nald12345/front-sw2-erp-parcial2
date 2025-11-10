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
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header Mejorado */}
      <div className="bg-linear-to-r from-blue-600 via-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-8 h-8" />
            <span className="text-sm font-semibold tracking-widest opacity-90">
              OPORTUNIDADES LABORALES
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-3 text-pretty">
            Encuentra tu próxima oportunidad
          </h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Explora{" "}
            <span className="font-bold text-blue-100">{ofertas.length}</span>{" "}
            ofertas de empleo exclusivas y únete a equipos innovadores en tecnología
          </p>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Buscador */}
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Busca por puesto, empresa o ubicación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 w-full bg-white border-2 border-gray-200 hover:border-blue-400 rounded-2xl transition-all duration-300 focus:border-blue-500 focus:outline-none text-base text-gray-900 shadow-lg"
            />
          </div>
        </div>

        {/* Sección de Ofertas */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Ofertas disponibles</h2>
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
              {filteredOffers.length}
            </span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 bg-white rounded-2xl shadow-lg">
              <Loader className="w-12 h-12 animate-spin text-blue-600" />
              <p className="text-gray-600">Cargando ofertas...</p>
            </div>
          ) : filteredOffers.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredOffers.map((offer) => (
                <JobOffersCard
                  key={offer.id}
                  offer={offer}
                  onApply={() => handleOpenOffer(offer)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border-2 border-gray-200 rounded-2xl shadow-lg">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-600 text-lg mb-6">
                No encontramos ofertas que coincidan con tu búsqueda
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  refetch();
                }}
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Ver todas las ofertas
              </button>
            </div>
          )}
        </div>

        {/* Sección de Mis Postulaciones */}
        {userApplications.length > 0 && (
          <div className="border-t-2 border-gray-200 pt-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900">
              <span className="w-1.5 h-8 bg-linear-to-b from-blue-600 to-purple-600 rounded-full"></span>
              Mis Postulaciones
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {userApplications.map((app, idx) => {
                const offer = ofertas.find((o) => o.id === app.offerId);
                return (
                  <div
                    key={idx}
                    className="p-6 bg-white border-2 border-gray-200 rounded-2xl hover:shadow-2xl hover:border-blue-400 transition-all duration-300 group hover:scale-105"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-lg">
                          {app.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {app.email}
                        </p>
                      </div>
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                        ✓ Enviada
                      </span>
                    </div>
                    <div className="mt-5 pt-5 border-t-2 border-gray-100">
                      <p className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wider">
                        Oferta:
                      </p>
                      <p className="font-bold text-blue-600 text-base">
                        {offer?.titulo}
                      </p>
                      <p className="text-xs text-gray-600 mt-3">
                        💼 {offer?.empresa?.nombre}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
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
          <div className="mt-16 text-center py-12 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-gray-600 text-lg">
              Aún no has enviado ninguna postulación
            </p>
            <p className="text-gray-500 text-sm mt-2">
              ¡Empieza a aplicar a las ofertas que te interesen!
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