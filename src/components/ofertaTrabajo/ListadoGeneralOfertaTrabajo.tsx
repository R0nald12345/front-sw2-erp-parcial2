"use client"

import { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

// Tipo para la oferta de trabajo
interface OfertaTrabajo {
  id: string;
  titulo: string;
  empresa: string;
  ubicacion: string;
  tipo: 'Tiempo Completo' | 'Tiempo Parcial' | 'Contrato' | 'Freelance';
  salario?: string;
  descripcion?: string;
  fechaPublicacion?: string;
  estado: 'Activa' | 'Cerrada';
}

// Datos de ejemplo
const OFERTAS_EJEMPLO: OfertaTrabajo[] = [
  {
    id: '1',
    titulo: 'Desarrollador Full Stack',
    empresa: 'Tech Solutions',
    ubicacion: 'La Paz',
    tipo: 'Tiempo Completo',
    salario: '$2000 - $3000',
    estado: 'Activa',
    descripcion: 'Buscamos desarrollador con experiencia en React y Node.js'
  },
  {
    id: '2',
    titulo: 'Diseñador UX/UI',
    empresa: 'Creative Agency',
    ubicacion: 'Cochabamba',
    tipo: 'Contrato',
    salario: '$1500 - $2500',
    estado: 'Activa',
    descripcion: 'Diseña interfaces intuitivas y atractivas'
  },
];

const ListadoGeneralOfertaTrabajo = () => {
  const [ofertas, setOfertas] = useState<OfertaTrabajo[]>(OFERTAS_EJEMPLO);
  const [searchTerm, setSearchTerm] = useState("");

  const ofertasFiltradas = ofertas.filter(oferta =>
    oferta.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    oferta.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    oferta.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('¿Eliminar esta oferta?')) {
      setOfertas(ofertas.filter(o => o.id !== id));
    }
  };

  const getTipoBadgeColor = (tipo: string) => {
    switch(tipo) {
      case 'Tiempo Completo': return 'bg-gradient-success';
      case 'Tiempo Parcial': return 'bg-gradient-warning';
      case 'Contrato': return 'bg-gradient-primary';
      case 'Freelance': return 'text-purple-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      {/* Empty State */}
      {ofertasFiltradas.length === 0 && (
        <div className="mx-4 md:mx-6 mb-6">
          <div className="card-modern p-8 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h4 className="text-xl font-semibold text-gray-700 mb-2">No hay ofertas</h4>
            <p className="text-gray-600">
              {searchTerm 
                ? `No se encontraron ofertas con "${searchTerm}"` 
                : 'Comienza publicando una nueva oferta de trabajo'}
            </p>
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      {ofertasFiltradas.length > 0 && (
        <div className="hidden md:block mx-4 md:mx-6 mb-6">
          <div className="card-modern overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-primary border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Título</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Empresa</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Ubicación</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tipo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Salario</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ofertasFiltradas.map((oferta, index) => (
                  <tr
                    key={oferta.id}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } border-b border-gray-200 hover:bg-blue-50 transition-colors`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {oferta.titulo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{oferta.empresa}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                      <FaMapMarkerAlt size={14} className="text-red-500" />
                      {oferta.ubicacion}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`${getTipoBadgeColor(oferta.tipo)} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                        {oferta.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">
                      {oferta.salario || 'No especificado'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className="btn-outline-small"
                          title="Ver detalles"
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          className="btn-outline-small text-blue-600 hover:text-blue-700"
                          title="Editar"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(oferta.id)}
                          className="btn-outline-small text-red-600 hover:text-red-700"
                          title="Eliminar"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile Card View */}
      {ofertasFiltradas.length > 0 && (
        <div className="md:hidden mx-4 mb-6 space-y-4">
          {ofertasFiltradas.map((oferta) => (
            <div key={oferta.id} className="card-modern p-4">
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-lg text-gray-900">{oferta.titulo}</h4>
                  <span className={`${getTipoBadgeColor(oferta.tipo)} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
                    {oferta.tipo}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{oferta.empresa}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1">
                    <FaMapMarkerAlt size={12} /> Ubicación
                  </p>
                  <p className="text-sm font-medium text-gray-900">{oferta.ubicacion}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Salario</p>
                  <p className="text-sm font-medium text-green-600">{oferta.salario || '-'}</p>
                </div>
              </div>

              {oferta.descripcion && (
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-xs text-gray-600 line-clamp-2">{oferta.descripcion}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  className="flex-1 btn-primary-small"
                  title="Ver detalles"
                >
                  <FaEye size={14} className="mr-2" />
                  Ver
                </button>
                <button
                  className="flex-1 btn-secondary-small"
                  title="Editar"
                >
                  <FaEdit size={14} className="mr-2" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(oferta.id)}
                  className="flex-1 btn-danger-small"
                  title="Eliminar"
                >
                  <FaTrash size={14} className="mr-2" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ListadoGeneralOfertaTrabajo;
