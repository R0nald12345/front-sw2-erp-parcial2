import executeGraphQL from '../../graphql.service';
import * as EvaluacionQueries from '@/src/graphql/queries/erp/evaluacion.queries';
import * as EvaluacionMutations from '@/src/graphql/mutations/erp/evaluacion.mutations';
import { EvaluacionType } from '@/src/types/erp/entrevista.types';

export const evaluacionService = {
  async getEvaluaciones(): Promise<EvaluacionType[]> {
    try {
      const result = await executeGraphQL<{ obtenerEvaluaciones: EvaluacionType[] }>(
        EvaluacionQueries.GET_EVALUACIONES,
        undefined,
        'obtenerEvaluaciones'
      );
      return result?.obtenerEvaluaciones || [];
    } catch (error) {
      console.error('Error fetching evaluaciones:', error);
      throw error;
    }
  },

  async getEvaluacionPorId(id: string): Promise<EvaluacionType | null> {
    try {
      const result = await executeGraphQL<{ obtenerEvaluacionPorId: EvaluacionType }>(
        EvaluacionQueries.GET_EVALUACION_POR_ID,
        { id },
        'obtenerEvaluacionPorId'
      );
      return result?.obtenerEvaluacionPorId || null;
    } catch (error) {
      console.error('Error fetching evaluación:', error);
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
      const result = await executeGraphQL<{ crearEvaluacion: EvaluacionType }>(
        EvaluacionMutations.CREAR_EVALUACION,
        data,
        'crearEvaluacion'
      );
      if (!result?.crearEvaluacion) throw new Error('Error creating evaluación');
      return result.crearEvaluacion;
    } catch (error) {
      console.error('Error creating evaluación:', error);
      throw error;
    }
  },

  async eliminarEvaluacion(id: string): Promise<boolean> {
    try {
      const result = await executeGraphQL<{ eliminarEvaluacion: boolean }>(
        EvaluacionMutations.ELIMINAR_EVALUACION,
        { id },
        'eliminarEvaluacion'
      );
      return result?.eliminarEvaluacion || false;
    } catch (error) {
      console.error('Error deleting evaluación:', error);
      throw error;
    }
  },
};