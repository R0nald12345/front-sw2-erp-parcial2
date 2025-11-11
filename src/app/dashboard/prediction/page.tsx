'use client';

import { TrendingUp, BarChart3, AlertCircle } from 'lucide-react';

const PredictionPage = () => {
  return (
    <div className="p-8 bg-linear-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Predicciones ML</h1>
          <p className="text-gray-600">Análisis predictivo y Machine Learning</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Modelos Activos</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Precisión Promedio</p>
                <p className="text-2xl font-bold text-gray-900">87.5%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Predicciones Hoy</p>
                <p className="text-2xl font-bold text-gray-900">245</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Estado de Modelos</h2>
          <div className="text-gray-600">
            <p>Componente de predicciones en desarrollo...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
