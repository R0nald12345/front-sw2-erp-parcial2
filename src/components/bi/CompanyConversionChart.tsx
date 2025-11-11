"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import useEmpresaBI from "@/src/hooks/bi/useEmpresaBI";

interface Props {
  empresaId: string;
  height?: number;
}

export default function CompanyConversionChart({ empresaId, height = 300 }: Props) {
  const { loading, error, conversion } = useEmpresaBI(empresaId);

  if (loading) return <div className="p-4 text-center text-gray-500">Cargando conversiones...</div>;
  if (error) return <div className="p-4 text-center text-red-600 font-semibold">Error: {error}</div>;
  
  if (!conversion || !conversion.offerStats || conversion.offerStats.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-4xl mb-3">📊</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin datos de conversión</h3>
        <p className="text-gray-600">Esta empresa aún no tiene datos de conversión registrados.</p>
      </div>
    );
  }

  console.log("conversion", conversion);

  const data = (conversion.offerStats ?? []).map((o) => ({
    name: o.offerTitle ?? o.offerId,
    views: o.views,
    applications: o.applications,
    conversion: Number(o.conversionPercentage ?? 0),
  }));

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Tasa de conversión por oferta</h3>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="views" stackId="a" fill="#60a5fa" />
            <Bar dataKey="applications" stackId="a" fill="#7c3aed" />
            <Bar dataKey="conversion" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
