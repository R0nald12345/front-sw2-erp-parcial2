"use client"

import { useState } from 'react';
import { Star, TrendingUp, Award, MessageSquare, Save, Send, User, Briefcase, Calendar } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const Evaluacion = () => {
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState(null);
  const [evaluacion, setEvaluacion] = useState({
    calificacion_tecnica: 0,
    calificacion_actitud: 0,
    calificacion_general: 0,
    comentarios: ''
  });

  const candidatos = [
    {
      id: 1,
      nombre: 'Juan Carlos Pérez',
      puesto: 'Desarrollador Full Stack',
      empresa: 'Tech Solutions S.A.',
      fecha_entrevista: '2024-11-05',
      entrevistador: 'Ing. Roberto Sánchez',
      evaluacion_previa: {
        calificacion_tecnica: 8.5,
        calificacion_actitud: 9.0,
        calificacion_general: 8.8,
        comentarios: 'Excelente conocimiento técnico. Muy comunicativo y proactivo.'
      },
      habilidades_evaluadas: [
        { nombre: 'React', calificacion: 9 },
        { nombre: 'Node.js', calificacion: 8 },
        { nombre: 'Base de Datos', calificacion: 8 },
        { nombre: 'Comunicación', calificacion: 9 },
        { nombre: 'Trabajo en Equipo', calificacion: 9 }
      ]
    },
    {
      id: 2,
      nombre: 'María González',
      puesto: 'Diseñadora UX/UI',
      empresa: 'Innovasoft',
      fecha_entrevista: '2024-11-04',
      entrevistador: 'Lic. Ana Torres',
      evaluacion_previa: {
        calificacion_tecnica: 9.0,
        calificacion_actitud: 8.5,
        calificacion_general: 8.8,
        comentarios: 'Portfolio impresionante. Gran atención al detalle.'
      },
      habilidades_evaluadas: [
        { nombre: 'Diseño Visual', calificacion: 9 },
        { nombre: 'Prototipado', calificacion: 9 },
        { nombre: 'Investigación UX', calificacion: 8 },
        { nombre: 'Creatividad', calificacion: 10 },
        { nombre: 'Comunicación', calificacion: 8 }
      ]
    },
    {
      id: 3,
      nombre: 'Roberto Silva',
      puesto: 'Analista de Datos',
      empresa: 'DataCorp',
      fecha_entrevista: '2024-11-03',
      entrevistador: 'Dr. Carlos Méndez',
      evaluacion_previa: null,
      habilidades_evaluadas: []
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      puesto: 'Project Manager',
      empresa: 'Consulting Group',
      fecha_entrevista: '2024-11-02',
      entrevistador: 'Ing. Luis Vargas',
      evaluacion_previa: {
        calificacion_tecnica: 7.5,
        calificacion_actitud: 9.5,
        calificacion_general: 8.5,
        comentarios: 'Excelente liderazgo. Experiencia sólida en gestión de proyectos complejos.'
      },
      habilidades_evaluadas: [
        { nombre: 'Liderazgo', calificacion: 9 },
        { nombre: 'Planificación', calificacion: 8 },
        { nombre: 'Gestión de Riesgos', calificacion: 7 },
        { nombre: 'Comunicación', calificacion: 10 },
        { nombre: 'Resolución de Problemas', calificacion: 8 }
      ]
    }
  ];

  const handleRatingChange = (campo, valor) => {
    setEvaluacion(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const StarRating = ({ rating, onChange, readOnly = false }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <button
            key={star}
            onClick={() => !readOnly && onChange(star)}
            disabled={readOnly}
            className={`${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          >
            <Star
              className={`w-6 h-6 ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-lg font-bold text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const prepararDatosRadar = (habilidades) => {
    return habilidades.map(h => ({
      categoria: h.nombre,
      valor: h.calificacion,
      fullMark: 10
    }));
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Evaluación de Candidatos</h1>
          <p className="text-gray-600">Registro de calificaciones y retroalimentación</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Promedio General</h3>
              <Award className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">8.7</p>
            <p className="text-sm text-gray-500 mt-1">De 10 puntos</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Técnica</h3>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">8.3</p>
            <p className="text-sm text-gray-500 mt-1">Calificación promedio</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Actitud</h3>
              <Star className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">9.0</p>
            <p className="text-sm text-gray-500 mt-1">Calificación promedio</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Evaluados</h3>
              <MessageSquare className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">34</p>
            <p className="text-sm text-gray-500 mt-1">Este mes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Candidatos */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Candidatos para Evaluar</h3>
            <div className="space-y-3">
              {candidatos.map(candidato => (
                <div
                  key={candidato.id}
                  onClick={() => {
                    setCandidatoSeleccionado(candidato);
                    setEvaluacion(candidato.evaluacion_previa || {
                      calificacion_tecnica: 0,
                      calificacion_actitud: 0,
                      calificacion_general: 0,
                      comentarios: ''
                    });
                  }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    candidatoSeleccionado?.id === candidato.id
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{candidato.nombre}</h4>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <Briefcase className="w-3 h-3" />
                        {candidato.puesto}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {candidato.fecha_entrevista}
                      </p>
                    </div>
                    {candidato.evaluacion_previa && (
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                        Evaluado
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{candidato.empresa}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Panel de Evaluación */}
          <div className="lg:col-span-2 space-y-6">
            {candidatoSeleccionado ? (
              <>
                {/* Información del Candidato */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-4 rounded-full">
                        <User className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{candidatoSeleccionado.nombre}</h2>
                        <p className="text-gray-600">{candidatoSeleccionado.puesto}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Entrevistado por: {candidatoSeleccionado.entrevistador}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gráfico Radar de Habilidades */}
                {candidatoSeleccionado.habilidades_evaluadas.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Perfil de Habilidades</h3>
                    <ResponsiveContainer width="100%" height={350}>
                      <RadarChart data={prepararDatosRadar(candidatoSeleccionado.habilidades_evaluadas)}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="categoria" stroke="#6b7280" />
                        <PolarRadiusAxis angle={90} domain={[0, 10]} stroke="#6b7280" />
                        <Radar name="Calificación" dataKey="valor" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Formulario de Evaluación */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Formulario de Evaluación</h3>
                  
                  <div className="space-y-6">
                    {/* Calificación Técnica */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Calificación Técnica
                      </label>
                      <StarRating
                        rating={evaluacion.calificacion_tecnica}
                        onChange={(valor) => handleRatingChange('calificacion_tecnica', valor)}
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Evalúa conocimientos técnicos, habilidades específicas y experiencia práctica
                      </p>
                    </div>

                    {/* Calificación Actitud */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Calificación de Actitud
                      </label>
                      <StarRating
                        rating={evaluacion.calificacion_actitud}
                        onChange={(valor) => handleRatingChange('calificacion_actitud', valor)}
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Evalúa comunicación, proactividad, trabajo en equipo y adaptabilidad
                      </p>
                    </div>

                    {/* Calificación General */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Calificación General
                      </label>
                      <StarRating
                        rating={evaluacion.calificacion_general}
                        onChange={(valor) => handleRatingChange('calificacion_general', valor)}
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Impresión general y fit cultural con la empresa
                      </p>
                    </div>

                    {/* Comentarios */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Comentarios y Observaciones
                      </label>
                      <textarea
                        value={evaluacion.comentarios}
                        onChange={(e) => setEvaluacion(prev => ({ ...prev, comentarios: e.target.value }))}
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                        placeholder="Escribe tus comentarios sobre el candidato, fortalezas, áreas de mejora, recomendaciones..."
                      />
                    </div>

                    {/* Resumen de Calificaciones */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-3">Resumen de Evaluación</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Técnica</p>
                          <p className="text-2xl font-bold text-blue-600">{evaluacion.calificacion_tecnica.toFixed(1)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Actitud</p>
                          <p className="text-2xl font-bold text-purple-600">{evaluacion.calificacion_actitud.toFixed(1)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">General</p>
                          <p className="text-2xl font-bold text-green-600">{evaluacion.calificacion_general.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                        <Save className="w-5 h-5" />
                        Guardar Borrador
                      </button>
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                        <Send className="w-5 h-5" />
                        Enviar Evaluación
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Selecciona un candidato
                </h3>
                <p className="text-gray-500">
                  Elige un candidato de la lista para comenzar o revisar su evaluación
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluacion;