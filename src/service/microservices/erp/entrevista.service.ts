import executeGraphQL from '../../graphql.service';
import * as EntrevistaQueries from '@/src/graphql/queries/erp/entrevista.queries';
import * as EntrevistaMutations from '@/src/graphql/mutations/erp/entrevista.mutations';
import { EntrevistaType } from '@/src/types/erp/postulacion.types';

export const entrevistaService = {
  async getEntrevistas(): Promise<EntrevistaType[]> {
    try {
      const result = await executeGraphQL<{ obtenerEntrevistas: EntrevistaType[] }>(
        EntrevistaQueries.GET_ENTREVISTAS,
        undefined,
        'obtenerEntrevistas'
      );
      return result?.obtenerEntrevistas || [];
    } catch (error) {
      console.error('Error fetching entrevistas:', error);
      throw error;
    }
  },

  async getEntrevistaPorId(id: string): Promise<EntrevistaType | null> {
    try {
      const result = await executeGraphQL<{ obtenerEntrevistaPorId: EntrevistaType }>(
        EntrevistaQueries.GET_ENTREVISTA_POR_ID,
        { id },
        'obtenerEntrevistaPorId'
      );
      return result?.obtenerEntrevistaPorId || null;
    } catch (error) {
      console.error('Error fetching entrevista:', error);
      throw error;
    }
  },

  async crearEntrevista(data: {
    fecha: string;
    duracionMin: number;
    objetivosTotales: string;
    objetivosCubiertos: string;
    entrevistador: string;
    postulacionId: string;
  }): Promise<EntrevistaType> {
    try {
      const result = await executeGraphQL<{ crearEntrevista: EntrevistaType }>(
        EntrevistaMutations.CREAR_ENTREVISTA,
        data,
        'crearEntrevista'
      );
      if (!result?.crearEntrevista) throw new Error('Error creating entrevista');
      return result.crearEntrevista;
    } catch (error) {
      console.error('Error creating entrevista:', error);
      throw error;
    }
  },

  async eliminarEntrevista(id: string): Promise<boolean> {
    try {
      const result = await executeGraphQL<{ eliminarEntrevista: boolean }>(
        EntrevistaMutations.ELIMINAR_ENTREVISTA,
        { id },
        'eliminarEntrevista'
      );
      return result?.eliminarEntrevista || false;
    } catch (error) {
      console.error('Error deleting entrevista:', error);
      throw error;
    }
  },
};