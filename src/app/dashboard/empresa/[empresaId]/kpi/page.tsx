"use client";

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useEmpresa } from "@/src/hooks/erp/useEmpresa";
import KpiCards from "@/src/components/bi/KpiCards";
import CompanyConversionChart from "@/src/components/bi/CompanyConversionChart";
import CompanyInterviewObjectivesChart from "@/src/components/bi/CompanyInterviewObjectivesChart";
import CompanyEvaluationsSummary from "@/src/components/bi/CompanyEvaluationsSummary";

export default function EmpresaKPIPage() {
  const pathname = usePathname();
  // Extrae empresaId de la URL: /dashboard/empresa/[empresaId]/kpi
  const empresaId = pathname.split("/")[3];
  console.log("empresa id", empresaId);
  const [goBack, setGoBack] = useState(false);
  const { empresas, loading: loadingEmpresa } = useEmpresa();

  // Buscar la empresa específica en la lista
  const empresa = useMemo(() => {
    return empresas.find((e) => e.id === empresaId) || null;
  }, [empresas, empresaId]);

  if (loadingEmpresa) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="spinner-modern"></div>
        <span className="ml-3 text-gray-600 font-medium">Cargando empresa...</span>
      </div>
    );
  }

  if (!empresa) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 font-semibold">Empresa no encontrada</p>
      </div>
    );
  }

  if (goBack) {
    // In a real app, redirect to previous page or empresa list
    return (
      <div className="text-center py-20">
        <p>Volviendo...</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="relative overflow-hidden bg-linear-to-r from-blue-600 via-blue-500 to-purple-600 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative z-10 px-6 md:px-12 py-8">
          <button
            onClick={() => setGoBack(true)}
            className="flex items-center gap-2 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 mb-6"
          >
            <FaArrowLeft size={18} />
            <span className="font-medium">Volver</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-linear-to-br from-purple-300 to-blue-300 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              📊
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">KPIs y Analítica</h1>
              <p className="text-white/90 mt-2 flex flex-wrap gap-4">
                <span className="flex items-center gap-1">{empresa.nombre}</span>
                <span className="text-white/70">•</span>
                <span className="flex items-center gap-1 truncate">{empresa.correo}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="bg-linear-to-b from-blue-50 via-white to-purple-50 min-h-screen px-6 md:px-12 py-12">
        {/* DEBUG PANEL - Disabled in production */}
        {/* <KPIDebug /> */}

        {/* KPI Cards Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Resumen de KPIs</h2>
          <KpiCards empresaId={empresaId} />
        </section>

        {/* Charts Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Análisis Detallado</h2>

          {/* Conversion Rate Chart */}
          <div className="mb-8">
            <CompanyConversionChart empresaId={empresaId} height={400} />
          </div>

          {/* Two Column Layout for Interview & Evaluations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CompanyInterviewObjectivesChart empresaId={empresaId} height={320} />
            <CompanyEvaluationsSummary empresaId={empresaId} height={320} />
          </div>
        </section>
      </main>
    </>
  );
}
