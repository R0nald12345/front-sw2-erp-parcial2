"use client"

import { useState } from 'react';
import { Search, Filter, Download, Eye, Edit, Trash2, CheckCircle, XCircle, Clock, Mail, Phone, FileText, Calendar } from 'lucide-react';

const Postulacion = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('Todos');
  const [selectedPostulacion, setSelectedPostulacion] = useState(null);

  const postulaciones = [
    {
      id: 1,
      nombre: 'Juan Carlos Pérez',
      email: 'juan.perez@email.com',
      telefono: '+591 7123-4567',
      puesto: 'Desarrollador Full Stack',
      empresa: 'Tech Solutions S.A.',
      experiencia: '5 años',
      educacion: 'Ingeniería en Sistemas',
      estado: 'En Revisión',
      fecha: '2024-11-05',
      urlCV: '#',
      habilidades: ['React', 'Node.js', 'MongoDB', 'AWS'],
      idiomas: ['Español', 'Inglés'],
      certificaciones: ['AWS Certified', 'React Advanced']
    },
    {
      id: 2,
      nombre: 'María González',
      email: 'maria.gonzalez@email.com',
      telefono: '+591 7234-5678',
      puesto: 'Diseñadora UX/UI',
      empresa: 'Innovasoft',
      experiencia: '3 años',
      educacion: 'Diseño Gráfico',
      estado: 'Entrevista',
      fecha: '2024-11-04',
      urlCV: '#',
      habilidades: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      idiomas: ['Español', 'Inglés', 'Portugués'],
      certificaciones: ['Google UX Design']
    },
    {
      id: 3,
      nombre: 'Roberto Silva',
      email: 'roberto.silva@email.com',
      telefono: '+591 7345-6789',
      puesto: 'Analista de Datos',
      empresa: 'DataCorp',
      experiencia: '4 años',
      educacion: 'Estadística',
      estado: 'Ofertado',
      fecha: '2024-11-03',
      urlCV: '#',
      habilidades: ['Python', 'SQL', 'Tableau', 'Power BI'],
      idiomas: ['Español', 'Inglés'],
      certificaciones: ['Microsoft Data Analyst', 'Tableau Desktop']
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      telefono: '+591 7456-7890',
      puesto: 'Project Manager',
      empresa: 'Consulting Group',
      experiencia: '6 años',
      educacion: 'Administración de Empresas',
      estado: 'Pendiente',
      fecha: '2024-11-06',
      urlCV: '#',
      habilidades: ['Scrum', 'Agile', 'JIRA', 'MS Project'],
      idiomas: ['Español', 'Inglés', 'Francés'],
      certificaciones: ['PMP', 'Scrum Master']
    },
    {
      id: 5,
      nombre: 'Carlos Ramírez',
      email: 'carlos.ramirez@email.com',
      telefono: '+591 7567-8901',
      puesto: 'Marketing Digital',
      empresa: 'StartUp Bolivia',
      experiencia: '2 años',
      educacion: 'Marketing',
      estado: 'Contratado',
      fecha: '2024-11-01',
      urlCV: '#',
      habilidades: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
      idiomas: ['Español', 'Inglés'],
      certificaciones: ['Google Ads', 'HubSpot Marketing']
    },
    {
      id: 6,
      nombre: 'Laura Torres',
      email: 'laura.torres@email.com',
      telefono: '+591 7678-9012',
      puesto: 'Desarrollador Mobile',
      empresa: 'Tech Solutions S.A.',
      experiencia: '4 años',
      educacion: 'Ingeniería en Sistemas',
      estado: 'Rechazado',
      fecha: '2024-10-30',
      urlCV: '#',
      habilidades: ['React Native', 'Flutter', 'iOS', 'Android'],
      idiomas: ['Español'],
      certificaciones: ['Android Associate Developer']
    }
  ];

  const getEstadoColor = (estado) => {
    const colores = {
      'Pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'En Revisión': 'bg-blue-100 text-blue-800 border-blue-300',
      'Entrevista': 'bg-purple-100 text-purple-800 border-purple-300',
      'Ofertado': 'bg-green-100 text-green-800 border-green-300',
      'Contratado': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'Rechazado': 'bg-red-100 text-red-800 border-red-300'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getEstadoIcon = (estado) => {
    switch(estado) {
      case 'Contratado': return <CheckCircle className="w-4 h-4" />;
      case 'Rechazado': return <XCircle className="w-4 h-4" />;
      case 'Pendiente': return <Clock className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredPostulaciones = postulaciones.filter(p => {
    const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.puesto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEstado = filterEstado === 'Todos' || p.estado === filterEstado;
    return matchSearch && matchEstado;
  });

  const estadosUnicos = ['Todos', ...new Set(postulaciones.map(p => p.estado))];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestión de Postulaciones</h1>
            <p className="text-gray-600">Administra y revisa los candidatos del proceso de selección</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl">
            <Download className="w-5 h-5" />
            Exportar
          </button>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre, puesto o empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {estadosUnicos.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabla de Postulaciones */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Candidato</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Puesto</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Empresa</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Experiencia</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPostulaciones.map((postulacion) => (
                  <tr key={postulacion.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{postulacion.nombre}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Mail className="w-3 h-3" />
                          {postulacion.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {postulacion.telefono}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{postulacion.puesto}</div>
                      <div className="text-sm text-gray-500">{postulacion.educacion}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{postulacion.empresa}</td>
                    <td className="px-6 py-4 text-gray-700">{postulacion.experiencia}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getEstadoColor(postulacion.estado)}`}>
                        {getEstadoIcon(postulacion.estado)}
                        {postulacion.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{postulacion.fecha}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedPostulacion(postulacion)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Editar">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Detalles */}
        {selectedPostulacion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedPostulacion(null)}>
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPostulacion.nombre}</h2>
                    <p className="text-gray-600 mt-1">{selectedPostulacion.puesto}</p>
                  </div>
                  <button onClick={() => setSelectedPostulacion(null)} className="text-gray-400 hover:text-gray-600">
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Información de Contacto</h3>
                    <div className="space-y-2">
                      <p className="text-sm flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {selectedPostulacion.email}
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {selectedPostulacion.telefono}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Información de Postulación</h3>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-medium">Empresa:</span> {selectedPostulacion.empresa}</p>
                      <p className="text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {selectedPostulacion.fecha}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Experiencia y Educación</h3>
                  <p className="text-sm"><span className="font-medium">Experiencia:</span> {selectedPostulacion.experiencia}</p>
                  <p className="text-sm mt-1"><span className="font-medium">Educación:</span> {selectedPostulacion.educacion}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Habilidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPostulacion.habilidades.map((hab, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {hab}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Idiomas</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPostulacion.idiomas.map((idioma, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {idioma}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Certificaciones</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPostulacion.certificaciones.map((cert, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Estado Actual</h3>
                  <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold border ${getEstadoColor(selectedPostulacion.estado)}`}>
                    {getEstadoIcon(selectedPostulacion.estado)}
                    {selectedPostulacion.estado}
                  </span>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  Rechazar
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Programar Entrevista
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Avanzar a siguiente fase
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Postulacion;