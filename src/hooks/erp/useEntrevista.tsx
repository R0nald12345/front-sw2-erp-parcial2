'use client';

import { useState, useEffect, useCallback } from 'react';
import { entrevistaService } from '@/src/service/microservices/erp/entrevista.service';
// import { EntrevistaType } from '@/types/erp/entrevista.types';
import { invalidateGraphQLCache } from '@/src/service/graphql.service';
import { EntrevistaType } from '@/src/types/erp/postulacion.types';

interface UseEntrevistaReturn {
  entrevistas: EntrevistaType[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getEntrevistaPorId: (id: string) => Promise<EntrevistaType| null>;
  crearEntrevista: (data: {
    fecha: string;
    duracionMin: number;
    objetivosTotales: string;
    objetivosCubiertos: string;
    entrevistador: string;
    postulacionId: string;
  }) => Promise<EntrevistaType>;
  eliminarEntrevista: (id: string) => Promise<boolean>;
}

export const useEntrevista = (): UseEntrevistaReturn => {
  const [entrevistas, setEntrevistas] = useState<EntrevistaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtiene todas las entrevistas
   */
  const fetchEntrevistas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await entrevistaService.getEntrevistas();
      setEntrevistas(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error fetching entrevistas';
      setError(msg);
      console.error('Error en fetchEntrevistas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtiene una entrevista por ID
   */
  const getEntrevistaPorId = useCallback(
    async (id: string): Promise<EntrevistaType | null> => {
      try {
        setError(null);
        const data = await entrevistaService.getEntrevistaPorId(id);
        return data;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error fetching entrevista';
        setError(msg);
        console.error('Error en getEntrevistaPorId:', err);
        return null;
      }
    },
    []
  );

  /**
   * Crea una nueva entrevista
   */
  const crearEntrevista = useCallback(
    async (data: {
      fecha: string;
      duracionMin: number;
      objetivosTotales: string;
      objetivosCubiertos: string;
      entrevistador: string;
      postulacionId: string;
    }): Promise<EntrevistaType> => {
      try {
        setError(null);
        const nuevaEntrevista = await entrevistaService.crearEntrevista(data);
        invalidateGraphQLCache('obtenerEntrevistas');
        await fetchEntrevistas();
        return nuevaEntrevista;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error creating entrevista';
        setError(msg);
        console.error('Error en crearEntrevista:', err);
        throw err;
      }
    },
    [fetchEntrevistas]
  );

  /**
   * Elimina una entrevista
   */
  const eliminarEntrevista = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setError(null);
        const resultado = await entrevistaService.eliminarEntrevista(id);
        if (resultado) {
          invalidateGraphQLCache('obtenerEntrevistas');
          await fetchEntrevistas();
        }
        return resultado;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error deleting entrevista';
        setError(msg);
        console.error('Error en eliminarEntrevista:', err);
        throw err;
      }
    },
    [fetchEntrevistas]
  );

  useEffect(() => {
    fetchEntrevistas();
  }, [fetchEntrevistas]);

  return {
    entrevistas,
    loading,
    error,
    refetch: fetchEntrevistas,
    getEntrevistaPorId,
    crearEntrevista,
    eliminarEntrevista,
  };
};