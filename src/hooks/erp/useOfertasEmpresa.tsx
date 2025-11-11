"use client";

import { useState, useEffect, useCallback } from "react";
import { ofertaTrabajoService } from "@/src/service/microservices/erp/oferta-trabajo.service";
import { invalidateGraphQLCache } from "@/src/service/graphql.service";
import { OfertaTrabajoType } from "@/src/types/erp/oferta-trabajo.types";

interface UseOfertasEmpresaReturn {
  ofertas: OfertaTrabajoType[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  crearOfertaTrabajo: (data: {
    titulo: string;
    descripcion: string;
    salario: number;
    ubicacion: string;
    requisitos: string;
    fechaPublicacion: string;
    empresaId: string;
  }) => Promise<OfertaTrabajoType>;
  actualizarOfertaTrabajo: (data: {
    id: string;
    titulo: string;
    descripcion: string;
    salario: number;
    ubicacion: string;
    requisitos: string;
    fechaPublicacion: string;
  }) => Promise<OfertaTrabajoType>;
  eliminarOfertaTrabajo: (id: string) => Promise<boolean>;
}

export const useOfertasEmpresa = (empresaId: string): UseOfertasEmpresaReturn => {
  const [ofertas, setOfertas] = useState<OfertaTrabajoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtiene todas las ofertas de una empresa específica
   */
  const fetchOfertasEmpresa = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log(`📋 Fetching ofertas para empresa: ${empresaId}`);

      const data = await ofertaTrabajoService.getOfertaTrabajoPorEmpresa(empresaId);

      console.log(`✅ ${data.length} ofertas obtenidas`);
      setOfertas(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error fetching ofertas de empresa";
      setError(msg);
      console.error("❌ Error en fetchOfertasEmpresa:", err);
    } finally {
      setLoading(false);
    }
  }, [empresaId]);

  /**
   * Crea una nueva oferta de trabajo para la empresa
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
        console.log("🆕 Creando nueva oferta...");

        const nuevaOferta = await ofertaTrabajoService.crearOfertaTrabajo(data);

        invalidateGraphQLCache("ofertasTrabajo");
        await fetchOfertasEmpresa();

        console.log("✅ Oferta creada:", nuevaOferta.id);
        return nuevaOferta;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error creating oferta";
        setError(msg);
        console.error("❌ Error en crearOfertaTrabajo:", err);
        throw err;
      }
    },
    [fetchOfertasEmpresa]
  );

  /**
   * Actualiza una oferta de trabajo
   */
  const actualizarOfertaTrabajo = useCallback(
    async (data: {
      id: string;
      titulo: string;
      descripcion: string;
      salario: number;
      ubicacion: string;
      requisitos: string;
      fechaPublicacion: string;
    }): Promise<OfertaTrabajoType> => {
      try {
        setError(null);
        console.log("✏️ Actualizando oferta...");

        const ofertaActualizada = await ofertaTrabajoService.actualizarOfertaTrabajo(data);

        invalidateGraphQLCache("ofertasTrabajo");
        await fetchOfertasEmpresa();

        console.log("✅ Oferta actualizada:", ofertaActualizada.id);
        return ofertaActualizada;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error updating oferta";
        setError(msg);
        console.error("❌ Error en actualizarOfertaTrabajo:", err);
        throw err;
      }
    },
    [fetchOfertasEmpresa]
  );

  /**
   * Elimina una oferta de trabajo
   */
  const eliminarOfertaTrabajo = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setError(null);
        console.log(`🗑️ Eliminando oferta: ${id}`);

        const resultado = await ofertaTrabajoService.eliminarOfertaTrabajo(id);

        if (resultado) {
          invalidateGraphQLCache("ofertasTrabajo");
          await fetchOfertasEmpresa();
          console.log("✅ Oferta eliminada");
        }

        return true;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error deleting oferta";
        setError(msg);
        console.error("❌ Error en eliminarOfertaTrabajo:", err);
        throw err;
      }
    },
    [fetchOfertasEmpresa]
  );

  // Cargar ofertas al montar el componente o cuando cambia empresaId
  useEffect(() => {
    if (empresaId) {
      fetchOfertasEmpresa();
    }
  }, [empresaId, fetchOfertasEmpresa]);

  return {
    ofertas,
    loading,
    error,
    refetch: fetchOfertasEmpresa,
    crearOfertaTrabajo,
    actualizarOfertaTrabajo,
    eliminarOfertaTrabajo,
  };
};
