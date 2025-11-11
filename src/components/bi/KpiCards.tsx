"use client";

import React from "react";
import useEmpresaBI from "@/src/hooks/bi/useEmpresaBI";
import { FaBriefcase, FaChartLine, FaUsers, FaStar } from "react-icons/fa";

interface Props {
  empresaId: string;
}

export default function KpiCards({ empresaId }: Props) {
  const { loading, error, conversion, evaluaciones } = useEmpresaBI(empresaId);

  if (loading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-32 animate-pulse"></div>
        ))}
      </div>
    );

  if (error) return <div className="text-red-600 p-4">Error cargando KPIs: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Ofertas */}
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Ofertas</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{conversion?.totalOffers ?? 0}</p>
          </div>
          <FaBriefcase className="text-blue-600 text-4xl opacity-20" />
        </div>
      </div>

      {/* Total Postulaciones */}
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Postulaciones</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{conversion?.totalApplications ?? 0}</p>
          </div>
          <FaUsers className="text-purple-600 text-4xl opacity-20" />
        </div>
      </div>

      {/* Tasa de Conversión */}
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Tasa Conversión Prom.</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {((conversion?.averageConversionRate ?? 0) * 100).toFixed(1)}%
            </p>
          </div>
          <FaChartLine className="text-green-600 text-4xl opacity-20" />
        </div>
      </div>

      {/* Calificación General Promedio */}
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-600">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Evaluación Prom.</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {(evaluaciones?.promedioCaliGeneral ?? 0).toFixed(1)}
            </p>
          </div>
          <FaStar className="text-yellow-600 text-4xl opacity-20" />
        </div>
      </div>
    </div>
  );
}
