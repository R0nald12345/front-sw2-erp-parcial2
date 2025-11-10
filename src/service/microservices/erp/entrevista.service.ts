import { executeQuery, executeMutation } from '../../graphql.service';
import * as EntrevistaQueries from '@/src/graphql/queries/erp/entrevista.queries';
import * as EntrevistaMutations from '@/src/graphql/mutations/erp/entrevista.mutations';
import { EntrevistaType } from '@/src/types/erp/postulacion.types';

interface GetEntrevistasResponse {
  entrevistas: EntrevistaType[];
}

interface GetEntrevistaPorIdResponse {
  entrevista: EntrevistaType;
}

interface CreateEntrevistaResponse {
  createEntrevista: EntrevistaType;
}

interface DeleteEntrevistaResponse {
  deleteEntrevista: string;
}

export const entrevistaService = {
  async getEntrevistas(limit: number = 10): Promise<EntrevistaType[]> {
    try {
      console.log(`\n👥 SERVICE: Fetching entrevistas with limit: ${limit}`);
      
      const result = await executeQuery<GetEntrevistasResponse>(
        EntrevistaQueries.GET_ENTREVISTAS,
        { limit }
      );

      if (!result?.entrevistas) {
        console.warn('⚠️ No entrevistas returned');
        return [];
      }

      console.log(`✅ ${result.entrevistas.length} entrevistas fetched`);
      return result.entrevistas;
    } catch (error) {
      console.error('❌ Error fetching entrevistas:', error);
      throw error;
    }
  },

  async getEntrevistaPorId(id: string): Promise<EntrevistaType | null> {
    try {
      console.log(`\n👥 SERVICE: Fetching entrevista with id: ${id}`);

      if (!id || id.trim() === '') {
        throw new Error('Invalid entrevista ID');
      }

      const result = await executeQuery<GetEntrevistaPorIdResponse>(
        EntrevistaQueries.GET_ENTREVISTA_POR_ID,
        { id }
      );

      if (!result?.entrevista) {
        console.warn(`⚠️ Entrevista ${id} not found`);
        return null;
      }

      console.log('✅ Entrevista fetched:', result.entrevista.id);
      return result.entrevista;
    } catch (error) {
      console.error(`❌ Error fetching entrevista ${id}:`, error);
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
      console.log(`\n🆕 SERVICE: Creating entrevista for postulación: ${data.postulacionId}`);

      if (!data.fecha || !data.postulacionId || !data.entrevistador) {
        throw new Error('Missing required fields');
      }

      if (data.duracionMin <= 0) {
        throw new Error('Duration must be greater than 0');
      }

      const result = await executeMutation<CreateEntrevistaResponse>(
        EntrevistaMutations.CREAR_ENTREVISTA,
        data
      );

      if (!result?.createEntrevista) {
        throw new Error('Error creating entrevista');
      }

      console.log('✅ Entrevista created:', result.createEntrevista.id);
      return result.createEntrevista;
    } catch (error) {
      console.error('❌ Error creating entrevista:', error);
      throw error;
    }
  },

  async eliminarEntrevista(id: string): Promise<string> {
    try {
      console.log(`\n🗑️ SERVICE: Deleting entrevista: ${id}`);

      if (!id || id.trim() === '') {
        throw new Error('Invalid entrevista ID');
      }

      const result = await executeMutation<DeleteEntrevistaResponse>(
        EntrevistaMutations.ELIMINAR_ENTREVISTA,
        { id }
      );

      if (!result?.deleteEntrevista) {
        throw new Error('Error deleting entrevista');
      }

      console.log('✅ Entrevista deleted:', result.deleteEntrevista);
      return result.deleteEntrevista;
    } catch (error) {
      console.error(`❌ Error deleting entrevista ${id}:`, error);
      throw error;
    }
  },
};