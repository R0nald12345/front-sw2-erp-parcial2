"use client"

import { useState } from 'react';
import { Search, BarChart3, TrendingUp, Award, AlertCircle, User } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { evaluacionService } from '@/src/service/microservices/erp/evaluacion.service';
import { kpiService } from '@/src/service/microservices/bi/kpi.service';

interface EvaluacionesByInterviewer {
  entrevistador: string;
  totalEvaluaciones: number;
  promedioCaliTecnica: number;
  promedioCaliActitud: number;
  promedioCaliGeneral: number;
  excelente: number;
  buena: number;
  aceptable: number;
  pobre: number;
  evaluaciones: Array<{
    evaluacionId: string;
    candidateName: string;
    calificacionTecnica: number;
    calificacionActitud: number;
    calificacionGeneral: number;
  }>;
}

interface CandidateInterviews {
  candidateName: string;
  totalInterviews: number;
  averageObjectiveCoverage: number;
  interviews: Array<{
    interviewId: string;
    totalObjectives: number;
    coveredObjectives: number;
    objectiveCoveragePercentage: number;
    interpretation: string;
  }>;
}

const KPIBusqueda = () => {
  const [activeTab, setActiveTab] = useState<'entrevistador' | 'candidato'>('entrevistador');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Datos de entrevistador
  const [entrevistadorData, setEntrevistadorData] = useState<EvaluacionesByInterviewer | null>(null);
  
  // Datos de candidato
  const [candidatoData, setCandidatoData] = useState<CandidateInterviews | null>(null);

  const handleSearchEntrevistador = async () => {
    if (!searchTerm.trim()) {
      setError('Por favor ingresa el nombre del entrevistador');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await evaluacionService.getEvaluacionesByInterviewer(searchTerm);
      if (data) {
        setEntrevistadorData(data);
      } else {
        setError('No se encontraron datos para este entrevistador');
        setEntrevistadorData(null);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al buscar';
      setError(msg);
      setEntrevistadorData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchCandidato = async () => {
    if (!searchTerm.trim()) {
      setError('Por favor ingresa el nombre del candidato');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await kpiService.getInterviewsByCandidate(searchTerm);
      if (data) {
        setCandidatoData(data);
      } else {
        setError('No se encontraron datos para este candidato');
        setCandidatoData(null);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al buscar';
      setError(msg);
      setCandidatoData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (activeTab === 'entrevistador') {
      handleSearchEntrevistador();
    } else {
      handleSearchCandidato();
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 4) return '#10B981';
    if (score >= 3) return '#3B82F6';
    if (score >= 2) return '#F59E0B';
    return '#EF4444';
  };

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 80) return '#10B981';
    if (coverage >= 60) return '#3B82F6';
    if (coverage >= 40) return '#F59E0B';
    return '#EF4444';
  };

  const prepararDatosCalificaciones = () => {
    if (!entrevistadorData) return [];
    return [
      { name: 'Técnica', valor: entrevistadorData.promedioCaliTecnica },
      { name: 'Actitud', valor: entrevistadorData.promedioCaliActitud },
      { name: 'General', valor: entrevistadorData.promedioCaliGeneral },
    ];
  };

  const prepararDatosDistribucion = () => {
    if (!entrevistadorData) return [];
    return [
      { name: 'Excelente', valor: entrevistadorData.excelente, fill: '#10B981' },
      { name: 'Buena', valor: entrevistadorData.buena, fill: '#3B82F6' },
      { name: 'Aceptable', valor: entrevistadorData.aceptable, fill: '#F59E0B' },
      { name: 'Pobre', valor: entrevistadorData.pobre, fill: '#EF4444' },
    ];
  };

  const prepararDatosCoberturaCandidato = () => {
    if (!candidatoData) return [];
    return [
      { name: 'Cubierto', value: candidatoData.averageObjectiveCoverage, fill: getCoverageColor(candidatoData.averageObjectiveCoverage) },
      { name: 'Faltante', value: 100 - candidatoData.averageObjectiveCoverage, fill: '#E5E7EB' },
    ];
  };

  return (
    <div style={{ padding: '24px', backgroundImage: 'linear-gradient(to bottom right, #f9fafb, #f0fdf4)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            🔍 Búsqueda de KPIs
          </h1>
          <p style={{ color: '#4B5563', fontSize: '16px' }}>
            Busca KPIs específicos por entrevistador o candidato
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '2px solid #e5e7eb' }}>
          <button
            onClick={() => {
              setActiveTab('entrevistador');
              setSearchTerm('');
              setError(null);
              setEntrevistadorData(null);
            }}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: activeTab === 'entrevistador' ? 'bold' : 'normal',
              color: activeTab === 'entrevistador' ? '#3B82F6' : '#6B7280',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'entrevistador' ? '3px solid #3B82F6' : 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            👤 Entrevistador
          </button>
          <button
            onClick={() => {
              setActiveTab('candidato');
              setSearchTerm('');
              setError(null);
              setCandidatoData(null);
            }}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: activeTab === 'candidato' ? 'bold' : 'normal',
              color: activeTab === 'candidato' ? '#3B82F6' : '#6B7280',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'candidato' ? '3px solid #3B82F6' : 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            🎯 Candidato
          </button>
        </div>

        {/* Search Box */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <input
              type="text"
              placeholder={activeTab === 'entrevistador' ? 'Ej: Ing. Juan Pérez' : 'Ej: Carlos García'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                fontFamily: 'inherit',
              }}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                padding: '12px 24px',
                backgroundColor: loading ? '#9CA3AF' : '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s',
              }}
            >
              <Search size={20} />
              {loading ? 'Buscando...' : 'Buscar KPI'}
            </button>
          </div>
          <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
            {activeTab === 'entrevistador' 
              ? '* Ingresa el nombre completo del entrevistador para obtener sus evaluaciones'
              : '* Ingresa el nombre completo del candidato para obtener su cobertura en entrevistas'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{ backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '16px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'start' }}>
            <AlertCircle size={20} color="#DC2626" style={{ marginTop: '4px', flexShrink: 0 }} />
            <div>
              <h3 style={{ fontWeight: '600', color: '#991B1B', marginBottom: '4px' }}>Error</h3>
              <p style={{ color: '#7F1D1D', fontSize: '14px' }}>{error}</p>
            </div>
          </div>
        )}

        {/* TAB: ENTREVISTADOR */}
        {activeTab === 'entrevistador' && entrevistadorData && (
          <div>
            {/* Header de Entrevistador */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ backgroundColor: '#3B82F620', padding: '16px', borderRadius: '12px' }}>
                  <User size={32} color="#3B82F6" />
                </div>
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>
                    {entrevistadorData.entrevistador}
                  </h2>
                  <p style={{ color: '#6B7280', marginTop: '4px' }}>
                    {entrevistadorData.totalEvaluaciones} evaluaciones realizadas
                  </p>
                </div>
              </div>

              {/* Stats Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ backgroundColor: '#EFF6FF', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '12px', color: '#4B5563', marginBottom: '8px' }}>Técnica</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#3B82F6' }}>
                    {entrevistadorData.promedioCaliTecnica.toFixed(2)}
                  </p>
                  <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>Promedio (0-5)</p>
                </div>

                <div style={{ backgroundColor: '#F0FDF4', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '12px', color: '#4B5563', marginBottom: '8px' }}>Actitud</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#10B981' }}>
                    {entrevistadorData.promedioCaliActitud.toFixed(2)}
                  </p>
                  <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>Promedio (0-5)</p>
                </div>

                <div style={{ backgroundColor: '#F3E8FF', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '12px', color: '#4B5563', marginBottom: '8px' }}>General</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#8B5CF6' }}>
                    {entrevistadorData.promedioCaliGeneral.toFixed(2)}
                  </p>
                  <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>Promedio (0-5)</p>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              {/* Gráfico de Promedios */}
              <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
                  📊 Promedios por Categoría
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={prepararDatosCalificaciones()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" domain={[0, 5]} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} formatter={(value: any) => value.toFixed(2)} />
                    <Bar dataKey="valor" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Gráfico de Distribución */}
              <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
                  📈 Distribución de Calificaciones
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={prepararDatosDistribucion()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
                    <Bar dataKey="valor" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Lista de Evaluaciones */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
                📋 Evaluaciones ({entrevistadorData.evaluaciones.length})
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Candidato</th>
                      <th style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Técnica</th>
                      <th style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Actitud</th>
                      <th style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>General</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entrevistadorData.evaluaciones.map((evaluation, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px', fontSize: '14px', color: '#111827' }}>{evaluation.candidateName}</td>
                        <td style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: getQualityColor(evaluation.calificacionTecnica) }}>
                          {evaluation.calificacionTecnica.toFixed(2)}
                        </td>
                        <td style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: getQualityColor(evaluation.calificacionActitud) }}>
                          {evaluation.calificacionActitud.toFixed(2)}
                        </td>
                        <td style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: getQualityColor(evaluation.calificacionGeneral) }}>
                          {evaluation.calificacionGeneral.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: CANDIDATO */}
        {activeTab === 'candidato' && candidatoData && (
          <div>
            {/* Header de Candidato */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ backgroundColor: '#10B98120', padding: '16px', borderRadius: '12px' }}>
                  <User size={32} color="#10B981" />
                </div>
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>
                    {candidatoData.candidateName}
                  </h2>
                  <p style={{ color: '#6B7280', marginTop: '4px' }}>
                    {candidatoData.totalInterviews} entrevistas realizadas
                  </p>
                </div>
              </div>

              {/* Stats Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ backgroundColor: '#EFF6FF', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '12px', color: '#4B5563', marginBottom: '8px' }}>Total Entrevistas</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#3B82F6' }}>
                    {candidatoData.totalInterviews}
                  </p>
                </div>

                <div style={{ backgroundColor: '#F0FDF4', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '12px', color: '#4B5563', marginBottom: '8px' }}>Cobertura Promedio</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#10B981' }}>
                    {candidatoData.averageObjectiveCoverage.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              {/* Gráfico Pie de Cobertura */}
              <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
                  📊 Cobertura General
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={prepararDatosCoberturaCandidato()}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {prepararDatosCoberturaCandidato().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>Promedio de cobertura en todas sus entrevistas</p>
                </div>
              </div>
            </div>

            {/* Lista de Entrevistas */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
                📋 Entrevistas ({candidatoData.interviews.length})
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>ID</th>
                      <th style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Objetivos Totales</th>
                      <th style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Cubiertos</th>
                      <th style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Cobertura</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Interpretación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidatoData.interviews.map((interview, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px', fontSize: '14px', color: '#111827' }}>{interview.interviewId}</td>
                        <td style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#3B82F6' }}>
                          {interview.totalObjectives}
                        </td>
                        <td style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: '#10B981' }}>
                          {interview.coveredObjectives}
                        </td>
                        <td style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: '600', color: getCoverageColor(interview.objectiveCoveragePercentage) }}>
                          {interview.objectiveCoveragePercentage.toFixed(1)}%
                        </td>
                        <td style={{ padding: '12px', fontSize: '12px', color: '#6B7280' }}>{interview.interpretation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Estado vacío */}
        {!entrevistadorData && !candidatoData && !loading && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '48px 24px', textAlign: 'center' }}>
            <BarChart3 size={64} color="#d1d5db" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#4B5563', marginBottom: '8px' }}>
              Ingresa un nombre para buscar
            </h3>
            <p style={{ color: '#9CA3AF' }}>
              {activeTab === 'entrevistador' 
                ? 'Busca un entrevistador para ver sus evaluaciones y estadísticas'
                : 'Busca un candidato para ver sus entrevistas y cobertura de objetivos'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPIBusqueda;
