"use client"

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ChevronDown, Users, Briefcase, Calendar, TrendingUp, CheckCircle, Clock } from 'lucide-react';

const formatNumber = (num:any) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const DashboardReclutamiento = () => {
  const [selectedEmpresa, setSelectedEmpresa] = useState('Todas');
  const [selectedEstado, setSelectedEstado] = useState('Todos');
  const [selectedPeriodo, setSelectedPeriodo] = useState('trimestre');

  // Estadísticas principales
  const stats = {
    totalPostulaciones: 3847,
    entrevistasRealizadas: 892,
    ofertasActivas: 47,
    tasaContratacion: 23.5
  };

  // Empresas para el filtro
  const empresas = ['Todas', 'Tech Solutions S.A.', 'Innovasoft', 'DataCorp', 'Consulting Group', 'StartUp Bolivia'];

  // Estados de postulación
  const estadosPostulacion = ['Todos', 'Pendiente', 'En Revisión', 'Entrevista', 'Ofertado', 'Contratado', 'Rechazado'];

  // Datos para gráfico de postulaciones mensuales
  const postulacionesMensuales = [
    { mes: 'Ene', postulaciones: 320, entrevistas: 78, contratados: 24 },
    { mes: 'Feb', postulaciones: 410, entrevistas: 95, contratados: 31 },
    { mes: 'Mar', postulaciones: 485, entrevistas: 112, contratados: 38 },
    { mes: 'Abr', postulaciones: 520, entrevistas: 125, contratados: 42 },
    { mes: 'May', postulaciones: 590, entrevistas: 148, contratados: 45 },
    { mes: 'Jun', postulaciones: 612, entrevistas: 156, contratados: 52 }
  ];

  // Distribución de estados de postulaciones
  const estadosData = [
    { name: 'Pendiente', value: 28, color: '#F59E0B' },
    { name: 'En Revisión', value: 22, color: '#3B82F6' },
    { name: 'Entrevista', value: 18, color: '#8B5CF6' },
    { name: 'Ofertado', value: 12, color: '#10B981' },
    { name: 'Contratado', value: 15, color: '#059669' },
    { name: 'Rechazado', value: 5, color: '#EF4444' }
  ];

  // Ofertas de trabajo por área
  const ofertasPorArea = [
    { area: 'Tecnología', cantidad: 18, postulantes: 425 },
    { area: 'Ventas', cantidad: 12, postulantes: 298 },
    { area: 'Marketing', cantidad: 8, postulantes: 187 },
    { area: 'Administración', cantidad: 5, postulantes: 143 },
    { area: 'RRHH', cantidad: 4, postulantes: 89 }
  ];

  // Evaluaciones promedio por categoría
  const evaluacionesPromedio = [
    { categoria: 'Técnica', valor: 7.8, fullMark: 10 },
    { categoria: 'Actitud', valor: 8.5, fullMark: 10 },
    { categoria: 'Comunicación', valor: 7.2, fullMark: 10 },
    { categoria: 'Liderazgo', valor: 6.9, fullMark: 10 },
    { categoria: 'Trabajo en Equipo', valor: 8.1, fullMark: 10 }
  ];

  // Tiempo promedio del proceso
  const tiemposProceso = [
    { etapa: 'Revisión CV', dias: 2.5 },
    { etapa: 'Primera Entrevista', dias: 5.3 },
    { etapa: 'Evaluación Técnica', dias: 3.8 },
    { etapa: 'Segunda Entrevista', dias: 4.2 },
    { etapa: 'Oferta', dias: 2.1 }
  ];

  // Fuentes de reclutamiento
  const fuentesReclutamiento = [
    { fuente: 'LinkedIn', postulaciones: 1250, contratados: 89 },
    { fuente: 'Portal Web', postulaciones: 980, contratados: 72 },
    { fuente: 'Referidos', postulaciones: 650, contratados: 98 },
    { fuente: 'Ferias de Empleo', postulaciones: 520, contratados: 45 },
    { fuente: 'Universidades', postulaciones: 447, contratados: 38 }
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard de Reclutamiento</h1>
          <p className="text-gray-600">Sistema de Recursos Humanos - Gestión de Talento</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Postulaciones</h3>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.totalPostulaciones)}</p>
            <p className="text-sm text-green-600 mt-2">↑ 12% vs mes anterior</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Entrevistas Realizadas</h3>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.entrevistasRealizadas)}</p>
            <p className="text-sm text-green-600 mt-2">↑ 8% vs mes anterior</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Ofertas Activas</h3>
              <Briefcase className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.ofertasActivas}</p>
            <p className="text-sm text-blue-600 mt-2">5 publicadas hoy</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Tasa de Contratación</h3>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.tasaContratacion}%</p>
            <p className="text-sm text-green-600 mt-2">↑ 2.3% vs mes anterior</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
            Filtros de Búsqueda
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
              <div className="relative">
                <select
                  value={selectedEmpresa}
                  onChange={(e) => setSelectedEmpresa(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  {empresas.map(empresa => (
                    <option key={empresa} value={empresa}>{empresa}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado de Postulación</label>
              <div className="relative">
                <select
                  value={selectedEstado}
                  onChange={(e) => setSelectedEstado(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  {estadosPostulacion.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Periodo</label>
              <div className="relative">
                <select
                  value={selectedPeriodo}
                  onChange={(e) => setSelectedPeriodo(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="semana">Última Semana</option>
                  <option value="mes">Último Mes</option>
                  <option value="trimestre">Último Trimestre</option>
                  <option value="anio">Último Año</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos Principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Gráfico de Líneas - Evolución Mensual */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Evolución del Proceso de Reclutamiento</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={postulacionesMensuales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="postulaciones" stroke="#3B82F6" strokeWidth={3} name="Postulaciones" />
                <Line type="monotone" dataKey="entrevistas" stroke="#8B5CF6" strokeWidth={3} name="Entrevistas" />
                <Line type="monotone" dataKey="contratados" stroke="#10B981" strokeWidth={3} name="Contratados" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Pastel - Estados */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribución por Estado</h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={estadosData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={(entry) => `${entry.value}%`}
                >
                  {estadosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {estadosData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gráficos Secundarios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Ofertas por Área */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ofertas de Trabajo por Área</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ofertasPorArea}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="area" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="cantidad" fill="#3B82F6" name="Ofertas Activas" />
                <Bar dataKey="postulantes" fill="#8B5CF6" name="Postulantes" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Evaluaciones Promedio - Radar */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Evaluaciones Promedio</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={evaluacionesPromedio}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="categoria" stroke="#6b7280" />
                <PolarRadiusAxis angle={90} domain={[0, 10]} stroke="#6b7280" />
                <Radar name="Calificación" dataKey="valor" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráficos Inferiores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tiempo del Proceso */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Tiempo Promedio por Etapa (días)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={tiemposProceso}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="etapa" type="category" stroke="#6b7280" />
                <Tooltip 
                  formatter={(value) => [`${value} días`, 'Duración']}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="dias" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Fuentes de Reclutamiento */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Efectividad de Fuentes de Reclutamiento</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fuentesReclutamiento}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="fuente" stroke="#6b7280" angle={-15} textAnchor="end" height={80} />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="postulaciones" fill="#3B82F6" name="Postulaciones" />
                <Bar dataKey="contratados" fill="#10B981" name="Contratados" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardReclutamiento;