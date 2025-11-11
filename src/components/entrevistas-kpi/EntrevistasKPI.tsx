"use client"

import { useState, useEffect } from 'react';
import { TrendingUp, Award, Star, AlertCircle, User } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { kpiService } from '@/src/service/microservices/bi/kpi.service';
import { AllInterviewsObjectivesSummary, InterviewObjectivesKPI } from '@/src/types/bi/kpi.types';

interface InterviewKPI extends InterviewObjectivesKPI {
  objectiveCoveragePercentage: number;
}

interface AllInterviewsKPI extends AllInterviewsObjectivesSummary {
  interviewStats: InterviewKPI[];
}

const EntrevistasKPI = () => {
  const [allInterviewsKPI, setAllInterviewsKPI] = useState<AllInterviewsKPI | null>(null);
  const [selectedInterview, setSelectedInterview] = useState<InterviewKPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar todas las entrevistas KPI
  const fetchAllInterviewsKPI = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await kpiService.getAllInterviewsKPI();
      setAllInterviewsKPI(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al cargar entrevistas';
      setError(msg);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllInterviewsKPI();
  }, []);

  // Filtrar entrevistas por búsqueda
  const entrevistasFiltradas = allInterviewsKPI?.interviewStats.filter(
    (entrevista) =>
      (entrevista.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (entrevista.interviewer?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  ) || [];

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 80) return '#10B981';
    if (coverage >= 60) return '#3B82F6';
    if (coverage >= 40) return '#F59E0B';
    return '#EF4444';
  };

  const getCoverageLevel = (coverage: number) => {
    if (coverage >= 80) return 'Excelente';
    if (coverage >= 60) return 'Buena';
    if (coverage >= 40) return 'Aceptable';
    return 'Pobre';
  };

  const prepararDatosGrafico = () => {
    if (!allInterviewsKPI) return [];
    return [
      { name: 'Cobertura Promedio', valor: allInterviewsKPI.averageCoverage },
    ];
  };

  const prepararDatosCobertura = () => {
    if (!allInterviewsKPI) return [];
    return [
      { name: 'Excelente', valor: allInterviewsKPI.excellentCoverage, fill: '#10B981' },
      { name: 'Buena', valor: allInterviewsKPI.acceptableCoverage, fill: '#3B82F6' },
      { name: 'Pobre', valor: allInterviewsKPI.poorCoverage, fill: '#EF4444' },
    ];
  };

  // Gráfico radar para entrevista seleccionada
  const prepararDatosRadarEntrevista = () => {
    if (!selectedInterview) return [];
    const coverage = selectedInterview.objectiveCoveragePercentage;
    return [
      { name: 'Cubierto', value: coverage, fill: getCoverageColor(coverage) },
      { name: 'Faltante', value: 100 - coverage, fill: '#E5E7EB' },
    ];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="spinner-modern"></div>
        <span className="ml-3 text-gray-600 font-medium">Cargando entrevistas...</span>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', backgroundImage: 'linear-gradient(to bottom right, #f9fafb, #f0fdf4)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            🎯 KPI de Entrevistas
          </h1>
          <p style={{ color: '#4B5563', fontSize: '16px' }}>
            Análisis de cobertura de objetivos en entrevistas
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

        {/* Stats Cards */}
        {allInterviewsKPI && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px', borderLeft: '4px solid #10B981' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#4B5563' }}>Total Entrevistas</h3>
                <Award size={32} color="#10B981" />
              </div>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>
                {allInterviewsKPI.totalInterviews}
              </p>
              <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px' }}>Entrevistas registradas</p>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px', borderLeft: '4px solid #3B82F6' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#4B5563' }}>Cobertura Promedio</h3>
                <TrendingUp size={32} color="#3B82F6" />
              </div>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>
                {allInterviewsKPI.averageCoverage.toFixed(1)}%
              </p>
              <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px' }}>De objetivos cubiertos</p>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px', borderLeft: '4px solid #F59E0B' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#4B5563' }}>Excelentes</h3>
                <Star size={32} color="#F59E0B" />
              </div>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>
                {allInterviewsKPI.excellentCoverage}
              </p>
              <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px' }}>
                ({((allInterviewsKPI.excellentCoverage / allInterviewsKPI.totalInterviews) * 100).toFixed(1)}%)
              </p>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          {/* Gráfico de Cobertura Promedio */}
          {allInterviewsKPI && (
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
                📊 Cobertura Promedio
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={prepararDatosGrafico()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} formatter={(value) => `${value}%`} />
                  <Bar dataKey="valor" fill="#10B981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Gráfico de Distribución */}
          {allInterviewsKPI && (
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
                📈 Distribución de Cobertura
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={prepararDatosCobertura()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
                  <Bar dataKey="valor" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Lista de Entrevistas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
          {/* Panel Izquierdo - Lista */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px', height: 'fit-content' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
              🎯 Entrevistas
            </h3>
            
            <input
              type="text"
              placeholder="Buscar candidato o entrevistador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px',
                fontFamily: 'inherit',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '600px', overflowY: 'auto' }}>
              {entrevistasFiltradas.length === 0 ? (
                <div style={{ padding: '16px', textAlign: 'center', color: '#9CA3AF' }}>
                  No hay entrevistas que coincidan
                </div>
              ) : (
                entrevistasFiltradas.map((entrevista) => (
                  <div
                    key={entrevista.interviewId}
                    onClick={() => setSelectedInterview(entrevista)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: selectedInterview?.interviewId === entrevista.interviewId ? '2px solid #10B981' : '2px solid #e5e7eb',
                      backgroundColor: selectedInterview?.interviewId === entrevista.interviewId ? '#ecfdf5' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedInterview?.interviewId !== entrevista.interviewId) {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedInterview?.interviewId !== entrevista.interviewId) {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.backgroundColor = 'white';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h4 style={{ fontWeight: '600', color: '#111827', fontSize: '14px' }}>
                        {entrevista.candidateName}
                      </h4>
                      <span
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: getCoverageColor(entrevista.objectiveCoveragePercentage) + '20',
                          color: getCoverageColor(entrevista.objectiveCoveragePercentage),
                          fontSize: '12px',
                          fontWeight: '600',
                        }}
                      >
                        {getCoverageLevel(entrevista.objectiveCoveragePercentage)}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#6B7280' }}>
                      Entrevistador: {entrevista.interviewer}
                    </p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                      Cobertura: {entrevista.objectiveCoveragePercentage.toFixed(1)}%
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Panel Derecho - Detalle */}
          <div>
            {selectedInterview ? (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
                {/* Información */}
                <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', alignItems: 'start', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ backgroundColor: '#10B98120', padding: '12px', borderRadius: '8px' }}>
                      <User size={24} color="#10B981" />
                    </div>
                    <div>
                      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                        {selectedInterview.candidateName}
                      </h2>
                      <p style={{ color: '#6B7280', marginTop: '4px' }}>
                        Entrevistador: {selectedInterview.interviewer || 'N/A'}
                      </p>
                      <p style={{ color: '#9CA3AF', fontSize: '14px', marginTop: '4px' }}>
                        📅 {selectedInterview.interviewDate ? new Date(selectedInterview.interviewDate).toLocaleDateString('es-ES') : 'Sin fecha'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Datos de Cobertura */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
                    📊 Cobertura de Objetivos
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ backgroundColor: '#EFF6FF', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                      <p style={{ fontSize: '12px', color: '#4B5563', marginBottom: '8px' }}>Objetivos Totales</p>
                      <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#3B82F6' }}>
                        {selectedInterview.totalObjectives}
                      </p>
                    </div>
                    <div style={{ backgroundColor: '#F0FDF4', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                      <p style={{ fontSize: '12px', color: '#4B5563', marginBottom: '8px' }}>Cubiertos</p>
                      <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#10B981' }}>
                        {selectedInterview.coveredObjectives}
                      </p>
                    </div>
                    <div style={{ backgroundColor: '#F3E8FF', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                      <p style={{ fontSize: '12px', color: '#4B5563', marginBottom: '8px' }}>Porcentaje</p>
                      <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#8B5CF6' }}>
                        {selectedInterview.objectiveCoveragePercentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {/* Gráfico Pie */}
                  <div style={{ backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                      📊 Cobertura Visual
                    </h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={prepararDatosRadarEntrevista()}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {prepararDatosRadarEntrevista().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                          }}
                          formatter={(value) => `${value}%`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ textAlign: 'center', marginTop: '12px' }}>
                      <p style={{ fontSize: '28px', fontWeight: 'bold', color: getCoverageColor(selectedInterview.objectiveCoveragePercentage) }}>
                        {selectedInterview.objectiveCoveragePercentage.toFixed(1)}%
                      </p>
                      <p style={{ fontSize: '12px', color: '#6B7280' }}>Cobertura Total</p>
                    </div>
                  </div>
                </div>

                {/* Interpretación */}
                <div style={{ backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '8px', borderLeft: '4px solid ' + getCoverageColor(selectedInterview.objectiveCoveragePercentage) }}>
                  <p style={{ fontSize: '12px', color: '#6B7280', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px' }}>
                    Nivel: {getCoverageLevel(selectedInterview.objectiveCoveragePercentage)}
                  </p>
                  <p style={{ color: '#111827', fontSize: '14px', lineHeight: '1.6' }}>
                    {selectedInterview.interpretation}
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '48px 24px', textAlign: 'center' }}>
                <Award size={64} color="#d1d5db" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#4B5563', marginBottom: '8px' }}>
                  Selecciona una entrevista
                </h3>
                <p style={{ color: '#9CA3AF' }}>
                  Elige una entrevista de la lista para ver los detalles
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrevistasKPI;
