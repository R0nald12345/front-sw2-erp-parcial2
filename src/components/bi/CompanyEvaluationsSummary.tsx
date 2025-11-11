"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import useEmpresaBI from "@/src/hooks/bi/useEmpresaBI";

interface Props {
  empresaId: string;
  height?: number;
}

export default function CompanyEvaluationsSummary({ empresaId, height = 260 }: Props) {
  const { loading, error, evaluaciones } = useEmpresaBI(empresaId);

  if (loading) return <div className="p-4 text-center text-gray-500">Cargando evaluaciones...</div>;
  if (error) return <div className="p-4 text-center text-red-600 font-semibold">Error: {error}</div>;

  if (!evaluaciones) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-4xl mb-3">⭐</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin datos de evaluaciones</h3>
        <p className="text-gray-600">Esta empresa aún no tiene datos de evaluaciones registrados.</p>
      </div>
    );
  }

  const data = [
    { name: "Técnica", value: evaluaciones.promedioCaliTecnica ?? 0 },
    { name: "Actitud", value: evaluaciones.promedioCaliActitud ?? 0 },
    { name: "General", value: evaluaciones.promedioCaliGeneral ?? 0 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Resumen promedio de evaluaciones</h3>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
