'use client';

import { useState, useEffect, useCallback } from 'react';
import { evaluacionService } from '@/src/service/microservices/erp/evaluacion.service';
import { invalidateGraphQLCache } from '@/src/service/graphql.service';
import { EvaluacionType } from '@/src/types/erp/entrevista.types';

interface UseEvaluacionReturn {
  evaluaciones: EvaluacionType[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getEvaluacionPorId: (id: string) => Promise<EvaluacionType | null>;
  crearEvaluacion: (data: {
    calificacionTecnica: number;
    calificacionActitud: number;
    calificacionGeneral: number;
    comentarios: string;
    entrevistaId: string;
  }) => Promise<EvaluacionType>;
  eliminarEvaluacion: (id: string) => Promise<boolean>;
}

export const useEvaluacion = (): UseEvaluacionReturn => {
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtiene todas las evaluaciones
   */
  const fetchEvaluaciones = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await evaluacionService.getEvaluaciones();
      setEvaluaciones(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error fetching evaluaciones';
      setError(msg);
      console.error('Error en fetchEvaluaciones:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtiene una evaluación por ID
   */
  const getEvaluacionPorId = useCallback(
    async (id: string): Promise<EvaluacionType | null> => {
      try {
        setError(null);
        const data = await evaluacionService.getEvaluacionPorId(id);
        return data;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error fetching evaluación';
        setError(msg);
        console.error('Error en getEvaluacionPorId:', err);
        return null;
      }
    },
    []
  );

  /**
   * Crea una nueva evaluación
   */
  const crearEvaluacion = useCallback(
    async (data: {
      calificacionTecnica: number;
      calificacionActitud: number;
      calificacionGeneral: number;
      comentarios: string;
      entrevistaId: string;
    }): Promise<EvaluacionType> => {
      try {
        setError(null);
        const nuevaEvaluacion = await evaluacionService.crearEvaluacion(data);
        invalidateGraphQLCache('obtenerEvaluaciones');
        await fetchEvaluaciones();
        return nuevaEvaluacion;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error creating evaluación';
        setError(msg);
        console.error('Error en crearEvaluacion:', err);
        throw err;
      }
    },
    [fetchEvaluaciones]
  );

  /**
   * Elimina una evaluación
   */
  const eliminarEvaluacion = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setError(null);
        const resultado = await evaluacionService.eliminarEvaluacion(id);
        if (resultado) {
          invalidateGraphQLCache('obtenerEvaluaciones');
          await fetchEvaluaciones();
        }
        return resultado;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error deleting evaluación';
        setError(msg);
        console.error('Error en eliminarEvaluacion:', err);
        throw err;
      }
    },
    [fetchEvaluaciones]
  );

  useEffect(() => {
    fetchEvaluaciones();
  }, [fetchEvaluaciones]);

  return {
    evaluaciones,
    loading,
    error,
    refetch: fetchEvaluaciones,
    getEvaluacionPorId,
    crearEvaluacion,
    eliminarEvaluacion,
  };
};