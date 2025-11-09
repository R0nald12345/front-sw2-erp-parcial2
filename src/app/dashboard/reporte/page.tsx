"use client"

import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';
import { Download, Calendar, TrendingUp, TrendingDown, Users, Briefcase, Award, Clock, Filter, FileText } from 'lucide-react';

const ReportesAvanzados = () => {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('trimestre');
  const [reporteActivo, setReporteActivo] = useState('general');

  // Datos para Funnel de Conversión
  const funnelData = [
    { etapa: 'Postulaciones', cantidad: 3847, porcentaje: 100 },
    { etapa: 'CV Revisados', cantidad: 2156, porcentaje: 56 },
    { etapa: 'Entrevistas', cantidad: 892, porcentaje: 23 },
    { etapa: 'Pruebas Técnicas', cantidad: 445, porcentaje: 12 },
    { etapa: 'Ofertas', cantidad: 178, porcentaje: 5 },
    { etapa: 'Contratados', cantidad: 134, porcentaje: 3.5 }
  ];

  // Tiempo de Contratación por Puesto
  const tiempoContratacionData = [
    { puesto: 'Desarrollador', dias: 28, meta: 30 },
    { puesto: 'Diseñador', dias: 22, meta: 25 },
    { puesto: 'PM', dias: 35, meta: 30 },
    { puesto: 'Analista', dias: 24, meta: 25 },
    { puesto: 'Marketing', dias: 19, meta: 20 }
  ];

  // Tasa de Retención
  const retencionData = [
    { mes: 'Ene', retencion: 95, rotacion: 5 },
    { mes: 'Feb', retencion: 94, rotacion: 6 },
    { mes: 'Mar', retencion: 96, rotacion: 4 },
    { mes: 'Abr', retencion: 93, rotacion: 7 },
    { mes: 'May', retencion: 95, rotacion: 5 },
    { mes: 'Jun', retencion: 97, rotacion: 3 }
  ];

  // Calidad de Contratación
  const calidadContratacionData = [
    { categoria: 'Desempeño', valor: 8.5, fullMark: 10 },
    { categoria: 'Retención', valor: 9.2, fullMark: 10 },
    { categoria: 'Cultural Fit', valor: 8.8, fullMark: 10 },
    { categoria: 'Productividad', valor: 8.3, fullMark: 10 },
    { categoria: 'Satisfacción', valor: 9.0, fullMark: 10 }
  ];

  // Costo por Contratación
  const costoPorArea = [
    { area: 'Tecnología', costo: 4500, contratados: 45 },
    { area: 'Ventas', costo: 3200, contratados: 38 },
    { area: 'Marketing', costo: 2800, contratados: 22 },
    { area: 'Administración', costo: 2500, contratados: 18 },
    { area: 'RRHH', costo: 2300, contratados: 11 }
  ];

  // Diversidad de Candidatos
  const diversidadData = [
    { name: 'Mujeres', value: 45, color: '#8B5CF6' },
    { name: 'Hombres', value: 55, color: '#3B82F6' }
  ];

  // Satisfacción del Candidato
  const satisfaccionData = [
    { mes: 'Ene', puntaje: 8.2 },
    { mes: 'Feb', puntaje: 8.5 },
    { mes: 'Mar', puntaje: 8.8 },
    { mes: 'Abr', puntaje: 8.4 },
    { mes: 'May', puntaje: 9.0 },
    { mes: 'Jun', puntaje: 8.9 }
  ];

  // Fuentes más Efectivas
  const fuentesEfectividadData = [
    { fuente: 'LinkedIn', aplicaciones: 1250, contratados: 89, tasa: 7.1 },
    { fuente: 'Referidos', aplicaciones: 650, contratados: 98, tasa: 15.1 },
    { fuente: 'Portal Web', aplicaciones: 980, contratados: 72, tasa: 7.3 },
    { fuente: 'Ferias', aplicaciones: 520, contratados: 45, tasa: 8.7 },
    { fuente: 'Universidades', aplicaciones: 447, contratados: 38, tasa: 8.5 }
  ];

  const reportes = [
    { id: 'general', nombre: 'Vista General', icon: TrendingUp },
    { id: 'conversiones', nombre: 'Análisis de Conversión', icon: Users },
    { id: 'tiempos', nombre: 'Tiempos y Eficiencia', icon: Clock },
    { id: 'calidad', nombre: 'Calidad de Contratación', icon: Award },
    { id: 'costos', nombre: 'Análisis de Costos', icon: FileText }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Reportes e Informes</h1>
            <p className="text-gray-600">Análisis avanzado del proceso de reclutamiento</p>
          </div>
          <div className="flex gap-3">
            <select
              value={periodoSeleccionado}
              onChange={(e) => setPeriodoSeleccionado(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="mes">Último Mes</option>
              <option value="trimestre">Último Trimestre</option>
              <option value="semestre">Último Semestre</option>
              <option value="anio">Último Año</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl">
              <Download className="w-5 h-5" />
              Exportar PDF
            </button>
          </div>
        </div>

        {/* Navegación de Reportes */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="flex gap-2 overflow-x-auto">
            {reportes.map(reporte => {
              const Icon = reporte.icon;
              return (
                <button
                  key={reporte.id}
                  onClick={() => setReporteActivo(reporte.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    reporteActivo === reporte.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {reporte.nombre}
                </button>
              );
            })}
          </div>
        </div>

        {/* KPIs Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Tasa de Conversión</h3>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">3.5%</p>
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +0.8% vs periodo anterior
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Tiempo Promedio</h3>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">26 días</p>
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              -3 días vs periodo anterior
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Calidad Promedio</h3>
              <Award className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">8.7/10</p>
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +0.3 puntos vs periodo anterior
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Costo Promedio</h3>
              <FileText className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">$3,260</p>
            <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +5% vs periodo anterior
            </p>
          </div>
        </div>

        {/* Contenido Dinámico según Reporte Activo */}
        {reporteActivo === 'general' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Funnel de Conversión */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Funnel de Conversión</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={funnelData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" />
                  <YAxis dataKey="etapa" type="category" stroke="#6b7280" width={120} />
                  <Tooltip />
                  <Bar dataKey="cantidad" fill="#3B82F6">
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Tasa de Retención */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tasa de Retención vs Rotación</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={retencionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="mes" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="retencion" stroke="#10B981" strokeWidth={3} name="Retención %" />
                  <Line type="monotone" dataKey="rotacion" stroke="#EF4444" strokeWidth={3} name="Rotación %" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Diversidad */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Diversidad de Género</h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={diversidadData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                  >
                    {diversidadData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Satisfacción del Candidato */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Satisfacción del Candidato</h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={satisfaccionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="mes" stroke="#6b7280" />
                  <YAxis domain={[0, 10]} stroke="#6b7280" />
                  <Tooltip />
                  <Area type="monotone" dataKey="puntaje" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {reporteActivo === 'conversiones' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Efectividad de Fuentes de Reclutamiento</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={fuentesEfectividadData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="fuente" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="aplicaciones" fill="#3B82F6" name="Aplicaciones" />
                  <Bar dataKey="contratados" fill="#10B981" name="Contratados" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tasa de Conversión por Fuente</h3>
              <div className="space-y-4">
                {fuentesEfectividadData.map((fuente, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">{fuente.fuente}</span>
                      <span className="text-2xl font-bold text-blue-600">{fuente.tasa}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${fuente.tasa * 6}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>{fuente.aplicaciones} aplicaciones</span>
                      <span>{fuente.contratados} contratados</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {reporteActivo === 'tiempos' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tiempo de Contratación por Puesto</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={tiempoContratacionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="puesto" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="dias" fill="#3B82F6" name="Días Reales" />
                  <Bar dataKey="meta" fill="#10B981" name="Meta (días)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {reporteActivo === 'calidad' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Indicadores de Calidad</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={calidadContratacionData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="categoria" stroke="#6b7280" />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} stroke="#6b7280" />
                  <Radar name="Calificación" dataKey="valor" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Resumen de Calidad</h3>
              <div className="space-y-6">
                {calidadContratacionData.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">{item.categoria}</span>
                      <span className="text-2xl font-bold text-purple-600">{item.valor}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                        style={{ width: `${(item.valor / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {reporteActivo === 'costos' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Costo por Contratación por Área</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={costoPorArea}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="area" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Bar dataKey="costo" fill="#F59E0B" name="Costo Promedio" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Análisis de ROI por Área</h3>
              <div className="space-y-4">
                {costoPorArea.map((area, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">{area.area}</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">${area.costo}</div>
                        <div className="text-sm text-gray-600">{area.contratados} contrataciones</div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>Costo total: ${area.costo * area.contratados}</span>
                      <span>CPH: ${(area.costo / area.contratados).toFixed(0)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportesAvanzados;