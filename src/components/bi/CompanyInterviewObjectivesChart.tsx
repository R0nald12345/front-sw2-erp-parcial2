"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useEmpresaBI from "@/src/hooks/bi/useEmpresaBI";

interface Props {
  empresaId: string;
  height?: number;
}

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

export default function CompanyInterviewObjectivesChart({ empresaId, height = 280 }: Props) {
  const { loading, error, interviewObjectives } = useEmpresaBI(empresaId);

  if (loading) return <div className="p-4 text-center text-gray-500">Cargando objetivos...</div>;
  if (error) return <div className="p-4 text-center text-red-600 font-semibold">Error: {error}</div>;

  if (!interviewObjectives) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-4xl mb-3">🎯</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin datos de entrevistas</h3>
        <p className="text-gray-600">Esta empresa aún no tiene datos de entrevistas registrados.</p>
      </div>
    );
  }

  const data = [
    { name: "Excelente", value: interviewObjectives.excellentCoverage ?? 0 },
    { name: "Aceptable", value: interviewObjectives.acceptableCoverage ?? 0 },
    { name: "Pobre", value: interviewObjectives.poorCoverage ?? 0 },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-4xl mb-3">🎯</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin datos de entrevistas</h3>
        <p className="text-gray-600">Esta empresa aún no tiene datos de entrevistas registrados.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Distribución de cobertura de objetivos</h3>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8" label />
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
