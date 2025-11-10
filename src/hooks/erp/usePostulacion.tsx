'use client';

import { useState, useEffect, useCallback } from 'react';
import { postulacionService } from '@/src/service/microservices/erp/postulacion.service';
import { invalidateGraphQLCache } from '@/src/service/graphql.service';
import { PostulacionType } from '@/src/types/erp/postulacion.types';

interface UsePostulacionReturn {
  postulaciones: PostulacionType[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getPostulacionPorId: (id: string) => Promise<PostulacionType | null>;
  crearPostulacion: (data: {
    nombre: string;
    aniosExperiencia: number;
    nivelEducacion: string;
    habilidades: string;
    idiomas: string;
    certificaciones: string;
    puestoActual: string;
    urlCv: string;
    fechaPostulacion: string;
    estado: string;
    telefono: string;
    email: string;
    ofertaId: string;
  }) => Promise<PostulacionType>;
  eliminarPostulacion: (id: string) => Promise<boolean>;
}

export const usePostulacion = (limit: number = 10): UsePostulacionReturn => {
  const [postulaciones, setPostulaciones] = useState<PostulacionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtiene todas las postulaciones
   */
  const fetchPostulaciones = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log(`📋 Fetching postulaciones con limit: ${limit}`);

      const data = await postulacionService.getPostulaciones(limit);

      console.log(`✅ ${data.length} postulaciones obtenidas`);
      setPostulaciones(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error fetching postulaciones';
      setError(msg);
      console.error('❌ Error en fetchPostulaciones:', err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  /**
   * Obtiene una postulación por ID
   */
  const getPostulacionPorId = useCallback(
    async (id: string): Promise<PostulacionType | null> => {
      try {
        setError(null);
        console.log(`📋 Fetching postulación por ID: ${id}`);

        const data = await postulacionService.getPostulacionPorId(id);

        console.log('✅ Postulación obtenida');
        return data;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error fetching postulación';
        setError(msg);
        console.error('❌ Error en getPostulacionPorId:', err);
        return null;
      }
    },
    []
  );

  /**
   * Crea una nueva postulación
   */
  const crearPostulacion = useCallback(
    async (data: {
      nombre: string;
      aniosExperiencia: number;
      nivelEducacion: string;
      habilidades: string;
      idiomas: string;
      certificaciones: string;
      puestoActual: string;
      urlCv: string;
      fechaPostulacion: string;
      estado: string;
      telefono: string;
      email: string;
      ofertaId: string;
    }): Promise<PostulacionType> => {
      try {
        setError(null);
        console.log('🆕 Creando nueva postulación...');

        const nuevaPostulacion = await postulacionService.crearPostulacion(data);

        invalidateGraphQLCache('postulaciones');
        await fetchPostulaciones();

        console.log('✅ Postulación creada:', nuevaPostulacion.id);
        return nuevaPostulacion;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error creating postulación';
        setError(msg);
        console.error('❌ Error en crearPostulacion:', err);
        throw err;
      }
    },
    [fetchPostulaciones]
  );

  /**
   * Elimina una postulación
   */
  const eliminarPostulacion = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setError(null);
        console.log(`🗑️ Eliminando postulación: ${id}`);

        const resultado = await postulacionService.eliminarPostulacion(id);

        if (resultado) {
          invalidateGraphQLCache('postulaciones');
          await fetchPostulaciones();
          console.log('✅ Postulación eliminada');
        }

        return resultado;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error deleting postulación';
        setError(msg);
        console.error('❌ Error en eliminarPostulacion:', err);
        throw err;
      }
    },
    [fetchPostulaciones]
  );

  // Cargar postulaciones al montar el componente
  useEffect(() => {
    fetchPostulaciones();
  }, [fetchPostulaciones]);

  return {
    postulaciones,
    loading,
    error,
    refetch: fetchPostulaciones,
    getPostulacionPorId,
    crearPostulacion,
    eliminarPostulacion,
  };
};