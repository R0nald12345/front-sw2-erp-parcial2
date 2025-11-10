'use client';

import { useState, useEffect, useCallback } from 'react';
import { empresaService } from '@/src/service/microservices/erp/empresa.service';
import { invalidateGraphQLCache } from '@/src/service/graphql.service';
import { EmpresaType, CreateEmpresaInput, UpdateEmpresaInput } from '@/src/types/erp/empresa.types';

interface UseEmpresaReturn {
  empresas: EmpresaType[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getEmpresaPorId: (id: string) => Promise<EmpresaType | null>;
  crearEmpresa: (input: CreateEmpresaInput) => Promise<EmpresaType>;
  actualizarEmpresa: (input: UpdateEmpresaInput) => Promise<EmpresaType>;
  eliminarEmpresa: (id: string) => Promise<boolean>;
}

export const useEmpresa = (): UseEmpresaReturn => {
  const [empresas, setEmpresas] = useState<EmpresaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmpresas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('📊 Iniciando carga de empresas...');
      
      const data = await empresaService.getEmpresas(10);
      console.log(`📊 Datos recibidos:`, data);
      setEmpresas(data || []);
      
      console.log(`✅ ${data?.length || 0} empresas cargadas`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error fetching empresas';
      setError(msg);
      console.error('❌ Error en fetchEmpresas:', err);
      setEmpresas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getEmpresaPorId = useCallback(
    async (id: string): Promise<EmpresaType | null> => {
      try {
        setError(null);
        console.log(`🔍 Buscando empresa con id: ${id}`);
        const data = await empresaService.getEmpresaPorId(id);
        return data;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error fetching empresa';
        setError(msg);
        console.error('❌ Error en getEmpresaPorId:', err);
        return null;
      }
    },
    []
  );

  const crearEmpresa = useCallback(
    async (input: CreateEmpresaInput): Promise<EmpresaType> => {
      try {
        setError(null);
        console.log('🆕 Creando nueva empresa:', input.nombre);
        
        const nuevaEmpresa = await empresaService.crearEmpresa(input);
        invalidateGraphQLCache();
        await fetchEmpresas();
        
        console.log('✅ Empresa creada exitosamente');
        return nuevaEmpresa;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error creating empresa';
        setError(msg);
        console.error('❌ Error en crearEmpresa:', err);
        throw err;
      }
    },
    [fetchEmpresas]
  );

  const actualizarEmpresa = useCallback(
    async (input: UpdateEmpresaInput): Promise<EmpresaType> => {
      try {
        setError(null);
        console.log(`✏️ Actualizando empresa: ${input.id}`);
        
        const empresaActualizada = await empresaService.actualizarEmpresa(input);
        invalidateGraphQLCache();
        await fetchEmpresas();
        
        console.log('✅ Empresa actualizada exitosamente');
        return empresaActualizada;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error updating empresa';
        setError(msg);
        console.error('❌ Error en actualizarEmpresa:', err);
        throw err;
      }
    },
    [fetchEmpresas]
  );

  const eliminarEmpresa = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setError(null);
        console.log(`🗑️ Eliminando empresa: ${id}`);
        
        const resultado = await empresaService.eliminarEmpresa(id);
        
        if (resultado) {
          invalidateGraphQLCache();
          await fetchEmpresas();
          console.log('✅ Empresa eliminada exitosamente');
        }
        
        return resultado;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error deleting empresa';
        setError(msg);
        console.error('❌ Error en eliminarEmpresa:', err);
        throw err;
      }
    },
    [fetchEmpresas]
  );

  useEffect(() => {
    fetchEmpresas();
  }, [fetchEmpresas]);

  return {
    empresas,
    loading,
    error,
    refetch: fetchEmpresas,
    getEmpresaPorId,
    crearEmpresa,
    actualizarEmpresa,
    eliminarEmpresa,
  };
};