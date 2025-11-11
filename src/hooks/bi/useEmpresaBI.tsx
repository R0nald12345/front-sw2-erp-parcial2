"use client";

import { useEffect, useState, useCallback } from "react";
import empresaBIService from "@/src/service/microservices/bi/empresa.service";
import { CompanyConversionStats, CompanyInterviewStats, EvaluacionesByCompanyStats } from "@/src/types/bi/kpi.types";

export function useEmpresaBI(empresaId?: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversion, setConversion] = useState<CompanyConversionStats | null>(null);
  const [interviewObjectives, setInterviewObjectives] = useState<CompanyInterviewStats | null>(null);
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionesByCompanyStats | null>(null);

  const fetchAll = useCallback(async (id?: string) => {
    if (!id) {
      console.warn("⚠️ useEmpresaBI: empresaId is undefined or empty");
      return;
    }

    console.log(`🔄 useEmpresaBI: Fetching data for empresaId: ${id}`);
    setLoading(true);
    setError(null);

    try {
      console.log("📡 Fetching conversion data...");
      const conv = await empresaBIService.getConversionRateByCompany(id);
      console.log("✅ Conversion data received:", conv);

      console.log("📡 Fetching interview objectives data...");
      const obj = await empresaBIService.getInterviewObjectivesByCompany(id);
      console.log("✅ Interview objectives data received:", obj);

      console.log("📡 Fetching evaluaciones data...");
      const evals = await empresaBIService.getEvaluacionesByCompany(id);
      console.log("✅ Evaluaciones data received:", evals);

      setConversion(conv);
      setInterviewObjectives(obj);
      setEvaluaciones(evals);
      console.log("✅ useEmpresaBI: All data loaded successfully");
    } catch (err: unknown) {
      // normalize unknown error
      const maybeMessage =
        err && typeof err === "object" && "message" in err ? (err as Record<string, unknown>).message : undefined;

      const message = typeof maybeMessage === "string" ? maybeMessage : String(err);
      console.error(`❌ useEmpresaBI Error: ${message}`, err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (empresaId) fetchAll(empresaId);
  }, [empresaId, fetchAll]);

  return {
    loading,
    error,
    conversion,
    interviewObjectives,
    evaluaciones,
    refresh: () => fetchAll(empresaId),
  };
}

export default useEmpresaBI;
