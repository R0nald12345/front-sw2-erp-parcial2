import { executeQuery, executeMutation } from '../../graphql.service';
import * as EvaluacionQueries from '@/src/graphql/queries/erp/evaluacion.queries';
import * as EvaluacionMutations from '@/src/graphql/mutations/erp/evaluacion.mutations';
import { EvaluacionType } from '@/src/types/erp/entrevista.types';

interface GetEvaluacionesResponse {
  evaluaciones: EvaluacionType[];
}

interface GetEvaluacionPorIdResponse {
  evaluacion: EvaluacionType;
}

interface CreateEvaluacionResponse {
  createEvaluacion: EvaluacionType;
}

interface DeleteEvaluacionResponse {
  deleteEvaluacion: string;
}

export const evaluacionService = {
  async getEvaluaciones(limit: number = 10): Promise<EvaluacionType[]> {
    try {
      console.log(`\n📊 SERVICE: Fetching evaluaciones with limit: ${limit}`);
      
      const result = await executeQuery<GetEvaluacionesResponse>(
        EvaluacionQueries.GET_EVALUACIONES,
        { limit }
      );

      if (!result?.evaluaciones) {
        console.warn('⚠️ No evaluaciones returned');
        return [];
      }

      console.log(`✅ ${result.evaluaciones.length} evaluaciones fetched`);
      return result.evaluaciones;
    } catch (error) {
      console.error('❌ Error fetching evaluaciones:', error);
      throw error;
    }
  },

  async getEvaluacionPorId(id: string): Promise<EvaluacionType | null> {
    try {
      console.log(`\n📊 SERVICE: Fetching evaluación with id: ${id}`);

      if (!id || id.trim() === '') {
        throw new Error('Invalid evaluación ID');
      }

      const result = await executeQuery<GetEvaluacionPorIdResponse>(
        EvaluacionQueries.GET_EVALUACION_POR_ID,
        { id }
      );

      if (!result?.evaluacion) {
        console.warn(`⚠️ Evaluación ${id} not found`);
        return null;
      }

      console.log('✅ Evaluación fetched:', result.evaluacion.id);
      return result.evaluacion;
    } catch (error) {
      console.error(`❌ Error fetching evaluación ${id}:`, error);
      throw error;
    }
  },

  async crearEvaluacion(data: {
    calificacionTecnica: number;
    calificacionActitud: number;
    calificacionGeneral: number;
    comentarios: string;
    entrevistaId: string;
  }): Promise<EvaluacionType> {
    try {
      console.log(`\n🆕 SERVICE: Creating evaluación for entrevista: ${data.entrevistaId}`);

      if (!data.entrevistaId) {
        throw new Error('Missing required fields');
      }

      if (data.calificacionTecnica < 0 || data.calificacionTecnica > 100 ||
          data.calificacionActitud < 0 || data.calificacionActitud > 100 ||
          data.calificacionGeneral < 0 || data.calificacionGeneral > 100) {
        throw new Error('Ratings must be between 0 and 100');
      }

      const result = await executeMutation<CreateEvaluacionResponse>(
        EvaluacionMutations.CREAR_EVALUACION,
        data
      );

      if (!result?.createEvaluacion) {
        throw new Error('Error creating evaluación');
      }

      console.log('✅ Evaluación created:', result.createEvaluacion.id);
      return result.createEvaluacion;
    } catch (error) {
      console.error('❌ Error creating evaluación:', error);
      throw error;
    }
  },

  async eliminarEvaluacion(id: string): Promise<string> {
    try {
      console.log(`\n🗑️ SERVICE: Deleting evaluación: ${id}`);

      if (!id || id.trim() === '') {
        throw new Error('Invalid evaluación ID');
      }

      const result = await executeMutation<DeleteEvaluacionResponse>(
        EvaluacionMutations.ELIMINAR_EVALUACION,
        { id }
      );

      if (!result?.deleteEvaluacion) {
        throw new Error('Error deleting evaluación');
      }

      console.log('✅ Evaluación deleted:', result.deleteEvaluacion);
      return result.deleteEvaluacion;
    } catch (error) {
      console.error(`❌ Error deleting evaluación ${id}:`, error);
      throw error;
    }
  },
};