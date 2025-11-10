"use client"

import { useState } from 'react';
import { Calendar, Clock, Video, MapPin, User, Briefcase, ChevronLeft, ChevronRight, Plus, Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { useEntrevista } from '@/src/hooks/erp/useEntrevista';

interface Entrevista {
  id: string;
  fecha: string;
  entrevistador: string;
}

const GestionEntrevista = () => {
  const { entrevistas, loading, error } = useEntrevista();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEntrevista, setSelectedEntrevista] = useState<any>(null);

  // Mostrar estados de carga y error
  if (loading) return <div className="p-6 text-center">Cargando entrevistas...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!entrevistas || entrevistas.length === 0) return <div className="p-6 text-center">No hay entrevistas</div>;

  const getEstadoColor = (estado: string): string => {
    const colores: Record<string, string> = {
      'Confirmada': 'bg-green-100 text-green-800 border-green-300',
      'Pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Cancelada': 'bg-red-100 text-red-800 border-red-300',
      'Completada': 'bg-blue-100 text-blue-800 border-blue-300'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getTipoIcon = (tipo: string) => {
    return tipo === 'Virtual' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />;
  };

  const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  
  const getWeekDates = () => {
    const dates = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const getEntrevistasPorFecha = (fecha: Date): any[] => {
    const fechaStr = fecha.toISOString().split('T')[0];
    return entrevistas.filter((e: any) => e.fecha.split('T')[0] === fechaStr).sort((a: any, b: any) => a.fecha.localeCompare(b.fecha));
  };

  const navigateWeek = (direction: number): void => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  return (
    <div className="p-6 bg-linear-to-br from-gray-50 to-purple-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestión de Entrevistas</h1>
            <p className="text-gray-600">Calendario y seguimiento de entrevistas</p>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl">
            <Plus className="w-5 h-5" />
            Nueva Entrevista
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Confirmadas</h3>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-500 mt-1">Esta semana</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Pendientes</h3>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">5</p>
            <p className="text-sm text-gray-500 mt-1">Por confirmar</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Hoy</h3>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-500 mt-1">Entrevistas programadas</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Canceladas</h3>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">2</p>
            <p className="text-sm text-gray-500 mt-1">Este mes</p>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button onClick={() => navigateWeek(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-xl font-bold text-gray-900">
                Semana del {weekDates[0].getDate()} al {weekDates[6].getDate()} de {weekDates[0].toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              </h2>
              <button onClick={() => navigateWeek(1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors">
              Hoy
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {weekDates.map((date, index) => {
              const entrevistasDelDia = getEntrevistasPorFecha(date);
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <div key={index} className={`border rounded-lg ${isToday ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'} p-3 min-h-[200px]`}>
                  <div className="text-center mb-3">
                    <div className="text-xs font-semibold text-gray-500 uppercase">{daysOfWeek[index]}</div>
                    <div className={`text-lg font-bold ${isToday ? 'text-purple-600' : 'text-gray-900'}`}>
                      {date.getDate()}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {entrevistasDelDia.map((entrevista: any) => (
                      <div 
                        key={entrevista.id}
                        onClick={() => setSelectedEntrevista(entrevista)}
                        className="p-2 rounded-lg cursor-pointer hover:shadow-md transition-all bg-blue-50 border border-blue-200"
                      >
                        <div className="text-xs font-semibold flex items-center gap-1 mb-1">
                          <Clock className="w-3 h-3" />
                          {new Date(entrevista.fecha).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="text-xs font-medium truncate">{entrevista.entrevistador}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {entrevista.postulacion?.nombre || 'Sin postulante'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lista de Entrevistas */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Todas las Entrevistas</h3>
          <div className="space-y-4">
            {entrevistas.map((entrevista: any) => (
              <div key={entrevista.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer" onClick={() => setSelectedEntrevista(entrevista)}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{entrevista.postulacion?.nombre || 'N/A'}</h4>
                    </div>
                    <p className="text-gray-600 flex items-center gap-2 mb-1">
                      <Briefcase className="w-4 h-4" />
                      {entrevista.postulacion?.oferta?.titulo || 'N/A'}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(entrevista.fecha).toLocaleDateString('es-ES')} a las {new Date(entrevista.fecha).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4" />
                      Duración: {entrevista.duracionMin} minutos
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Entrevistador: {entrevista.entrevistador}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" onClick={() => entrevista.id && alert('Eliminar: ' + entrevista.id)}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de Detalles */}
        {selectedEntrevista && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedEntrevista(null)}>
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedEntrevista.postulacion?.nombre || 'N/A'}</h2>
                    <p className="text-gray-600 mt-1">{selectedEntrevista.postulacion?.oferta?.titulo || 'Sin información'}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Fecha y Hora</h4>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(selectedEntrevista.fecha).toLocaleDateString('es-ES')}
                    </p>
                    <p className="text-gray-900 flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {new Date(selectedEntrevista.fecha).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Duración</h4>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {selectedEntrevista.duracionMin} minutos
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Entrevistador</h4>
                  <p className="text-gray-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    {selectedEntrevista.entrevistador}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Objetivos Totales</h4>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">{selectedEntrevista.objetivosTotales}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Objetivos Cubiertos</h4>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">{selectedEntrevista.objetivosCubiertos}</p>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setSelectedEntrevista(null)}>
                  Cerrar
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Editar
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Marcar como Completada
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionEntrevista;