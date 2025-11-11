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

// KPI Interfaces
interface EvaluacionKPIData {
  evaluacionId: string;
  candidateName: string;
  entrevistador: string;
  interviewDate: string;
  calificacionTecnica: number;
  calificacionActitud: number;
  calificacionGeneral: number;
  interpretation: string;
  qualityLevel: string;
}

interface EvaluacionKPIResponse {
  evaluacionKPI: EvaluacionKPIData;
}

interface EvaluacionStats {
  evaluacionId: string;
  candidateName: string;
  entrevistador: string;
  interviewDate: string;
  calificacionTecnica: number;
  calificacionActitud: number;
  calificacionGeneral: number;
  interpretation: string;
  qualityLevel: string;
}

interface AllEvaluacionesKPIResponse {
  allEvaluacionesKPI: {
    totalEvaluaciones: number;
    promedioCaliTecnica: number;
    promedioCaliActitud: number;
    promedioCaliGeneral: number;
    excelente: number;
    buena: number;
    aceptable: number;
    pobre: number;
    evaluacionStats: EvaluacionStats[];
  };
}

interface EvaluacionesByInterviewResponse {
  evaluacionesByInterview: {
    entrevistaId: string;
    candidateName: string;
    entrevistador: string;
    interviewDate: string;
    totalEvaluaciones: number;
    promedioCaliTecnica: number;
    promedioCaliActitud: number;
    promedioCaliGeneral: number;
    evaluaciones: EvaluacionKPIData[];
  };
}

interface EvaluacionesByCompanyResponse {
  evaluacionesByCompany: {
    empresaId: string;
    empresaNombre: string;
    totalEvaluaciones: number;
    promedioCaliTecnica: number;
    promedioCaliActitud: number;
    promedioCaliGeneral: number;
    excelente: number;
    buena: number;
    aceptable: number;
    pobre: number;
    evaluaciones: EvaluacionKPIData[];
  };
}

interface EvaluacionesByInterviewerResponse {
  evaluacionesByInterviewer: {
    entrevistador: string;
    totalEvaluaciones: number;
    promedioCaliTecnica: number;
    promedioCaliActitud: number;
    promedioCaliGeneral: number;
    excelente: number;
    buena: number;
    aceptable: number;
    pobre: number;
    evaluaciones: EvaluacionKPIData[];
  };
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

  // KPI Methods
  async getEvaluacionKPI(evaluacionId: string): Promise<EvaluacionKPIData | null> {
    try {
      console.log(`\n📊 SERVICE KPI: Fetching evaluación KPI: ${evaluacionId}`);

      if (!evaluacionId || evaluacionId.trim() === '') {
        throw new Error('Invalid evaluación ID');
      }

      const result = await executeQuery<EvaluacionKPIResponse>(
        EvaluacionQueries.EVALUACION_KPI,
        { evaluacionId }
      );

      if (!result?.evaluacionKPI) {
        console.warn(`⚠️ Evaluación KPI ${evaluacionId} not found`);
        return null;
      }

      console.log('✅ Evaluación KPI fetched:', result.evaluacionKPI.candidateName);
      return result.evaluacionKPI;
    } catch (error) {
      console.error(`❌ Error fetching evaluación KPI ${evaluacionId}:`, error);
      throw error;
    }
  },

  async getAllEvaluacionesKPI() {
    try {
      console.log(`\n📊 SERVICE KPI: Fetching all evaluaciones KPI`);

      const result = await executeQuery<AllEvaluacionesKPIResponse>(
        EvaluacionQueries.ALL_EVALUACIONES_KPI
      );

      if (!result?.allEvaluacionesKPI) {
        console.warn('⚠️ No evaluaciones KPI returned');
        return null;
      }

      console.log(`✅ ${result.allEvaluacionesKPI.totalEvaluaciones} evaluaciones KPI fetched`);
      return result.allEvaluacionesKPI;
    } catch (error) {
      console.error('❌ Error fetching all evaluaciones KPI:', error);
      throw error;
    }
  },

  async getEvaluacionesByInterview(entrevistaId: string) {
    try {
      console.log(`\n📊 SERVICE KPI: Fetching evaluaciones by interview: ${entrevistaId}`);

      if (!entrevistaId || entrevistaId.trim() === '') {
        throw new Error('Invalid entrevista ID');
      }

      const result = await executeQuery<EvaluacionesByInterviewResponse>(
        EvaluacionQueries.EVALUACIONES_BY_INTERVIEW,
        { entrevistaId }
      );

      if (!result?.evaluacionesByInterview) {
        console.warn(`⚠️ Evaluaciones for interview ${entrevistaId} not found`);
        return null;
      }

      console.log(
        `✅ ${result.evaluacionesByInterview.totalEvaluaciones} evaluaciones fetched for interview`
      );
      return result.evaluacionesByInterview;
    } catch (error) {
      console.error(`❌ Error fetching evaluaciones by interview ${entrevistaId}:`, error);
      throw error;
    }
  },

  async getEvaluacionesByCompany(empresaId: string) {
    try {
      console.log(`\n📊 SERVICE KPI: Fetching evaluaciones by company: ${empresaId}`);

      if (!empresaId || empresaId.trim() === '') {
        throw new Error('Invalid empresa ID');
      }

      const result = await executeQuery<EvaluacionesByCompanyResponse>(
        EvaluacionQueries.EVALUACIONES_BY_COMPANY,
        { empresaId }
      );

      if (!result?.evaluacionesByCompany) {
        console.warn(`⚠️ Evaluaciones for company ${empresaId} not found`);
        return null;
      }

      console.log(
        `✅ ${result.evaluacionesByCompany.totalEvaluaciones} evaluaciones fetched for company`
      );
      return result.evaluacionesByCompany;
    } catch (error) {
      console.error(`❌ Error fetching evaluaciones by company ${empresaId}:`, error);
      throw error;
    }
  },

  async getEvaluacionesByInterviewer(entrevistador: string) {
    try {
      console.log(`\n📊 SERVICE KPI: Fetching evaluaciones by interviewer: ${entrevistador}`);

      if (!entrevistador || entrevistador.trim() === '') {
        throw new Error('Invalid entrevistador name');
      }

      const result = await executeQuery<EvaluacionesByInterviewerResponse>(
        EvaluacionQueries.EVALUACIONES_BY_INTERVIEWER,
        { entrevistador }
      );

      if (!result?.evaluacionesByInterviewer) {
        console.warn(`⚠️ Evaluaciones for interviewer ${entrevistador} not found`);
        return null;
      }

      console.log(
        `✅ ${result.evaluacionesByInterviewer.totalEvaluaciones} evaluaciones fetched for interviewer`
      );
      return result.evaluacionesByInterviewer;
    } catch (error) {
      console.error(`❌ Error fetching evaluaciones by interviewer ${entrevistador}:`, error);
      throw error;
    }
  },
};