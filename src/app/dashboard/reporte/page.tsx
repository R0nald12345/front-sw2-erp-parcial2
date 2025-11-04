"use client";

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { ChevronDown } from 'lucide-react';


interface EstadoTramiteData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface TramitesMensualData {
  mes: string;
  inscripciones: number;
  certificados: number;
  otros: number;
}

interface TiempoPromedioData {
  tipo: string;
  dias: number;
}

interface DashboardStats {
  totalTramites: number;
  tramitesPendientes: number;
  tramitesFinalizados: number;
  tiempoPromedio: number;
}

const DashboardTramites: React.FC = () => {
  const [selectedDepartamento, setSelectedDepartamento] = useState('Planificación Académica');
  const [selectedTipoTramite, setSelectedTipoTramite] = useState('Todos');
  const [selectedPeriodo, setSelectedPeriodo] = useState({
    semestre1: true,
    semestre2: false
  });

  const stats: DashboardStats = {
    totalTramites: 8945,
    tramitesPendientes: 1567,
    tramitesFinalizados: 7378,
    tiempoPromedio: 8.5
  };

  const tramitesMensualData: TramitesMensualData[] = [
    { mes: 'Ene', inscripciones: 450, certificados: 320, otros: 180 },
    { mes: 'Feb', inscripciones: 580, certificados: 280, otros: 210 },
    { mes: 'Mar', inscripciones: 720, certificados: 390, otros: 250 },
    { mes: 'Abr', inscripciones: 650, certificados: 410, otros: 190 },
    { mes: 'May', inscripciones: 820, certificados: 450, otros: 280 },
    { mes: 'Jun', inscripciones: 890, certificados: 520, otros: 310 }
  ];

  const estadoTramiteData: EstadoTramiteData[] = [
    { name: 'Finalizados', value: 65, color: '#10B981' },
    { name: 'En proceso', value: 20, color: '#F59E0B' },
    { name: 'Pendientes', value: 10, color: '#EF4444' },
    { name: 'Rechazados', value: 5, color: '#6B7280' }
  ];

  const tiempoPromedioData: TiempoPromedioData[] = [
    { tipo: 'Inscripciones', dias: 3 },
    { tipo: 'Certificados', dias: 7 },
    { tipo: 'Convalidaciones', dias: 15 },
    { tipo: 'Titulaciones', dias: 45 },
    { tipo: 'Cambio carrera', dias: 20 }
  ];

  const departamentos = ['Planificación Académica', 'Registro', 'Secretaría General', 'Vicerrectorado'];
  const tiposTramite = ['Todos', 'Inscripciones', 'Certificados', 'Convalidaciones', 'Titulaciones'];

  // NEW: Added missing function
  const handlePeriodoChange = (tipo: 'semestre1' | 'semestre2') => {
    setSelectedPeriodo(prev => ({
      ...prev,
      [tipo]: !prev[tipo]
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard de Trámites - Planificación UAGRM</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total de trámites:</h3>
          <p className="text-3xl font-bold text-gray-800">{stats.totalTramites.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Trámites pendientes:</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.tramitesPendientes.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Trámites finalizados:</h3>
          <p className="text-3xl font-bold text-green-600">{stats.tramitesFinalizados.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Tiempo promedio:</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.tiempoPromedio} días</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
            <div className="relative">
              <select
                value={selectedDepartamento}
                onChange={(e) => setSelectedDepartamento(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {departamentos.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de trámite</label>
            <div className="relative">
              <select
                value={selectedTipoTramite}
                onChange={(e) => setSelectedTipoTramite(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {tiposTramite.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Periodo académico:</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedPeriodo.semestre1}
                  onChange={() => handlePeriodoChange('semestre1')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">1er Semestre</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedPeriodo.semestre2}
                  onChange={() => handlePeriodoChange('semestre2')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">2do Semestre</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Line Chart - Trámites Mensuales */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Trámites mensuales por categoría</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={tramitesMensualData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="inscripciones" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="certificados" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="otros" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Estado de Trámites */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Estado de trámites</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={estadoTramiteData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
              >
                {estadoTramiteData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Horizontal Bar Chart - Tiempo Promedio */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tiempo promedio de procesamiento (días)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={tiempoPromedioData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="tipo" type="category" />
            <Tooltip formatter={(value) => [`${value} días`, 'Tiempo promedio']} />
            <Bar dataKey="dias" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardTramites;