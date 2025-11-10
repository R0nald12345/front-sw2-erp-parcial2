'use client';

import { useState, useEffect, useCallback } from 'react';
import { visualizacionService } from '@/src/service/microservices/erp/visualizacion.service';
// import { VisualizacionOfertaType } from '@/types/erp/visualizacion.types';
import { invalidateGraphQLCache } from '@/src/service/graphql.service';
import { VisualizacionOfertaType } from '@/src/types/erp/oferta-trabajo.types';

interface UseVisualizacionReturn {
  visualizaciones: VisualizacionOfertaType[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getVisualizacionPorId: (id: string) => Promise<VisualizacionOfertaType | null>;
  crearVisualizacion: (data: {
    fechaVisualizacion: string;
    origen: string;
    ofertaId: string;
  }) => Promise<VisualizacionOfertaType>;
  eliminarVisualizacion: (id: string) => Promise<boolean>;
}

export const useVisualizacion = (): UseVisualizacionReturn => {
  const [visualizaciones, setVisualizaciones] = useState<VisualizacionOfertaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtiene todas las visualizaciones
   */
  const fetchVisualizaciones = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await visualizacionService.getVisualizacionesOferta();
      setVisualizaciones(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error fetching visualizaciones';
      setError(msg);
      console.error('Error en fetchVisualizaciones:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtiene una visualización por ID
   */
  const getVisualizacionPorId = useCallback(
    async (id: string): Promise<VisualizacionOfertaType | null> => {
      try {
        setError(null);
        const data = await visualizacionService.getVisualizacionOfertaPorId(id);
        return data;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error fetching visualización';
        setError(msg);
        console.error('Error en getVisualizacionPorId:', err);
        return null;
      }
    },
    []
  );

  /**
   * Crea una nueva visualización
   */
  const crearVisualizacion = useCallback(
    async (data: {
      fechaVisualizacion: string;
      origen: string;
      ofertaId: string;
    }): Promise<VisualizacionOfertaType> => {
      try {
        setError(null);
        const nuevaVisualizacion = await visualizacionService.crearVisualizacionOferta(data);
        invalidateGraphQLCache('obtenerVisualizacionesOferta');
        await fetchVisualizaciones();
        return nuevaVisualizacion;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error creating visualización';
        setError(msg);
        console.error('Error en crearVisualizacion:', err);
        throw err;
      }
    },
    [fetchVisualizaciones]
  );

  /**
   * Elimina una visualización
   */
  const eliminarVisualizacion = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setError(null);
        const resultado = await visualizacionService.eliminarVisualizacion(id);
        if (resultado) {
          invalidateGraphQLCache('obtenerVisualizacionesOferta');
          await fetchVisualizaciones();
        }
        return resultado;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error deleting visualización';
        setError(msg);
        console.error('Error en eliminarVisualizacion:', err);
        throw err;
      }
    },
    [fetchVisualizaciones]
  );

  useEffect(() => {
    fetchVisualizaciones();
  }, [fetchVisualizaciones]);

  return {
    visualizaciones,
    loading,
    error,
    refetch: fetchVisualizaciones,
    getVisualizacionPorId,
    crearVisualizacion,
    eliminarVisualizacion,
  };
};