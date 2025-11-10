"use client";

import { useState, useEffect, useCallback } from "react";
import { ofertaTrabajoService } from "@/src/service/microservices/erp/oferta-trabajo.service";
// import { OfertaTrabajoType } from '@/types/erp/oferta-trabajo.types';
import { invalidateGraphQLCache } from "@/src/service/graphql.service";
import { OfertaTrabajoType } from "@/src/types/erp/empresa.types";

interface UseOfertaTrabajoReturn {
  ofertas: OfertaTrabajoType[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getOfertaTrabajoPorId: (id: string) => Promise<OfertaTrabajoType | null>;
  crearOfertaTrabajo: (data: {
    titulo: string;
    descripcion: string;
    salario: number;
    ubicacion: string;
    requisitos: string;
    fechaPublicacion: string;
    empresaId: string;
  }) => Promise<OfertaTrabajoType>;
  eliminarOfertaTrabajo: (id: string) => Promise<boolean>;
}

export const useOfertaTrabajo = (): UseOfertaTrabajoReturn => {
  const [ofertas, setOfertas] = useState<OfertaTrabajoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtiene todas las ofertas de trabajo
   */
  const fetchOfertas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ofertaTrabajoService.getOfertasTrabajo();
      setOfertas(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error fetching ofertas";
      setError(msg);
      console.error("Error en fetchOfertas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtiene una oferta por ID
   */
  const getOfertaTrabajoPorId = useCallback(async (id: string): Promise<OfertaTrabajoType | null> => {
    try {
      setError(null);
      const data = await ofertaTrabajoService.getOfertaTrabajoPorId(id);
      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error fetching oferta";
      setError(msg);
      console.error("Error en getOfertaTrabajoPorId:", err);
      return null;
    }
  }, []);

  /**
   * Crea una nueva oferta de trabajo
   */
  const crearOfertaTrabajo = useCallback(
    async (data: {
      titulo: string;
      descripcion: string;
      salario: number;
      ubicacion: string;
      requisitos: string;
      fechaPublicacion: string;
      empresaId: string;
    }): Promise<OfertaTrabajoType> => {
      try {
        setError(null);
        const nuevaOferta = await ofertaTrabajoService.crearOfertaTrabajo(data);
        invalidateGraphQLCache("ofertasTrabajo");
        await fetchOfertas();
        return nuevaOferta;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error creating oferta";
        setError(msg);
        console.error("Error en crearOfertaTrabajo:", err);
        throw err;
      }
    },
    [fetchOfertas]
  );

  /**
   * Elimina una oferta de trabajo
   */
  const eliminarOfertaTrabajo = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setError(null);
        const resultado = await ofertaTrabajoService.eliminarOfertaTrabajo(id);
        if (resultado) {
          invalidateGraphQLCache("ofertasTrabajo");
          await fetchOfertas();
        }
        return resultado;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error deleting oferta";
        setError(msg);
        console.error("Error en eliminarOfertaTrabajo:", err);
        throw err;
      }
    },
    [fetchOfertas]
  );

  useEffect(() => {
    fetchOfertas();
  }, [fetchOfertas]);

  return {
    ofertas,
    loading,
    error,
    refetch: fetchOfertas,
    getOfertaTrabajoPorId,
    crearOfertaTrabajo,
    eliminarOfertaTrabajo,
  };
};
