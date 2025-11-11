"use client";

import { useState } from "react";
import { executeQuery } from "@/src/service/graphql.service";
import * as KPIQueries from "@/src/graphql/queries/bi/kpi.queries";

interface DebugResult {
  query: string;
  variables: Record<string, unknown>;
  result: unknown;
  error: string | null;
  timestamp: string;
}

export default function KPIDebug() {
  const [empresaId, setEmpresaId] = useState("test-empresa");
  const [results, setResults] = useState<DebugResult[]>([]);
  const [loading, setLoading] = useState(false);

  const testQuery = async (queryName: string, query: string, variables: Record<string, unknown>) => {
    setLoading(true);
    try {
      console.log(`\n${"=".repeat(60)}`);
      console.log(`🧪 Testing Query: ${queryName}`);
      console.log(`${"=".repeat(60)}`);
      console.log(`Variables:`, variables);

      const result = await executeQuery(query, variables);
      console.log(`✅ Result:`, result);

      setResults((prev) => [
        ...prev,
        {
          query: queryName,
          variables,
          result,
          error: null,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      console.error(`❌ Error:`, error);
      setResults((prev) => [
        ...prev,
        {
          query: queryName,
          variables,
          result: null,
          error: String(error),
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-red-50 border-2 border-red-500 rounded-lg m-6">
      <h2 className="text-2xl font-bold text-red-900 mb-4">🧪 KPI Debug Panel</h2>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-red-800 mb-2">Empresa ID:</label>
        <input
          type="text"
          value={empresaId}
          onChange={(e) => setEmpresaId(e.target.value)}
          className="w-full px-4 py-2 border border-red-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        <button
          onClick={() =>
            testQuery("GET_CONVERSION_RATE_BY_COMPANY", KPIQueries.GET_CONVERSION_RATE_BY_COMPANY, { empresaId })
          }
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded font-semibold"
        >
          Test Conversion
        </button>

        <button
          onClick={() =>
            testQuery("GET_INTERVIEW_OBJECTIVES_BY_COMPANY", KPIQueries.GET_INTERVIEW_OBJECTIVES_BY_COMPANY, {
              empresaId,
            })
          }
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded font-semibold"
        >
          Test Interviews
        </button>

        <button
          onClick={() =>
            testQuery("GET_EVALUACIONES_BY_COMPANY", KPIQueries.GET_EVALUACIONES_BY_COMPANY, { empresaId })
          }
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded font-semibold"
        >
          Test Evaluaciones
        </button>

        <button
          onClick={() => {
            setResults([]);
          }}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-semibold"
        >
          Clear Results
        </button>
      </div>

      <div className="space-y-4">
        {results.map((r, idx) => (
          <div
            key={idx}
            className={`p-4 rounded border-l-4 ${
              r.error ? "bg-red-100 border-red-500" : "bg-green-100 border-green-500"
            }`}
          >
            <div className="font-semibold text-sm mb-2">
              [{r.timestamp}] {r.query}
            </div>
            <pre className="text-xs bg-white p-2 rounded overflow-auto max-h-40 border">
              {r.error ? r.error : JSON.stringify(r.result, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
