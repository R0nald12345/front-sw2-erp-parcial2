import { executeQuery } from "../../graphql.service";
import * as KPIQueries from "@/src/graphql/queries/bi/kpi.queries";
import {
  ConversionRateKPI,
  AllOffersConversionSummary,
  CompanyConversionStats,
  InterviewObjectivesKPI,
  AllInterviewsObjectivesSummary,
  CandidateInterviewStats,
  CompanyInterviewStats,
  EvaluacionKPI,
  AllEvaluacionesSummary,
  EvaluacionesByInterviewStats,
  EvaluacionesByCompanyStats,
  EvaluacionesByInterviewerStats,
} from "@/src/types/bi/kpi.types";

// ============================================================================
// RESPUESTAS DE QUERIES TIPADAS
// ============================================================================

interface GetJobConversionRateResponse {
  jobConversionRate: ConversionRateKPI;
}

interface GetAllJobsConversionRateResponse {
  allJobsConversionRate: AllOffersConversionSummary;
}

interface GetConversionRateByCompanyResponse {
  conversionRateByCompany: CompanyConversionStats;
}

interface GetAllCompaniesConversionRateResponse {
  allCompaniesConversionRate: CompanyConversionStats[];
}

interface GetInterviewObjectivesKPIResponse {
  interviewObjectivesKPI: InterviewObjectivesKPI;
}

interface GetAllInterviewsObjectivesKPIResponse {
  allInterviewsObjectivesKPI: AllInterviewsObjectivesSummary;
}

interface GetCandidateInterviewsObjectivesKPIResponse {
  candidateInterviewsObjectivesKPI: CandidateInterviewStats;
}

interface GetInterviewObjectivesByCompanyResponse {
  interviewObjectivesByCompany: CompanyInterviewStats;
}

interface GetAllCompaniesInterviewObjectivesResponse {
  allCompaniesInterviewObjectives: CompanyInterviewStats[];
}

interface GetEvaluacionKPIResponse {
  evaluacionKPI: EvaluacionKPI;
}

interface GetAllEvaluacionesKPIResponse {
  allEvaluacionesKPI: AllEvaluacionesSummary;
}

interface GetEvaluacionesByInterviewResponse {
  evaluacionesByInterview: EvaluacionesByInterviewStats;
}

interface GetEvaluacionesByCompanyResponse {
  evaluacionesByCompany: EvaluacionesByCompanyStats;
}

interface GetEvaluacionesByInterviewerResponse {
  evaluacionesByInterviewer: EvaluacionesByInterviewerStats;
}

// ============================================================================
// SERVICIO KPI
// ============================================================================

export const kpiService = {
  // ========================================================================
  // TASAS DE CONVERSIÓN
  // ========================================================================

  async getJobConversionRate(offerId: string): Promise<ConversionRateKPI | null> {
    try {
      console.log(`\n📈 SERVICE: Fetching job conversion rate: ${offerId}`);

      if (!offerId || offerId.trim() === "") {
        throw new Error("Invalid offer ID");
      }

      const result = await executeQuery<GetJobConversionRateResponse>(KPIQueries.GET_JOB_CONVERSION_RATE, { offerId });

      if (!result?.jobConversionRate) {
        console.warn(`⚠️ Job conversion rate for ${offerId} not found`);
        return null;
      }

      console.log("✅ Job conversion rate fetched");
      return result.jobConversionRate;
    } catch (error) {
      console.error(`❌ Error fetching job conversion rate:`, error);
      throw error;
    }
  },

  async getAllJobsConversionRate(): Promise<AllOffersConversionSummary> {
    try {
      console.log(`\n📈 SERVICE: Fetching all jobs conversion rates`);

      const result = await executeQuery<GetAllJobsConversionRateResponse>(KPIQueries.GET_ALL_JOBS_CONVERSION_RATE, {});

      if (!result?.allJobsConversionRate) {
        throw new Error("Failed to fetch all jobs conversion rates");
      }

      console.log(`✅ All jobs conversion rates fetched`);
      return result.allJobsConversionRate;
    } catch (error) {
      console.error("❌ Error fetching all jobs conversion rates:", error);
      throw error;
    }
  },

  async getJobConversionRateByPeriod(
    offerId: string,
    startDate: string,
    endDate: string
  ): Promise<ConversionRateKPI | null> {
    try {
      console.log(`\n📅 SERVICE: Fetching job conversion rate by period: ${offerId} from ${startDate} to ${endDate}`);

      if (!offerId || !startDate || !endDate) {
        throw new Error("Missing required parameters: offerId, startDate, endDate");
      }

      const result = await executeQuery<GetJobConversionRateResponse>(KPIQueries.GET_JOB_CONVERSION_RATE_BY_PERIOD, {
        offerId,
        startDate,
        endDate,
      });

      if (!result?.jobConversionRate) {
        console.warn(`⚠️ Job conversion rate for period not found`);
        return null;
      }

      console.log("✅ Job conversion rate by period fetched");
      return result.jobConversionRate;
    } catch (error) {
      console.error(`❌ Error fetching job conversion rate by period:`, error);
      throw error;
    }
  },

  async getConversionRateByCompany(empresaId: string): Promise<CompanyConversionStats | null> {
    try {
      console.log(`\n📈 SERVICE: Fetching conversion rate by company: ${empresaId}`);

      if (!empresaId || empresaId.trim() === "") {
        throw new Error("Invalid empresa ID");
      }

      const result = await executeQuery<GetConversionRateByCompanyResponse>(KPIQueries.GET_CONVERSION_RATE_BY_COMPANY, {
        empresaId,
      });

      if (!result?.conversionRateByCompany) {
        console.warn(`⚠️ Conversion rate for company ${empresaId} not found`);
        return null;
      }

      console.log("✅ Conversion rate by company fetched");
      return result.conversionRateByCompany;
    } catch (error) {
      console.error(`❌ Error fetching conversion rate by company:`, error);
      throw error;
    }
  },

  async getAllCompaniesConversionRate(): Promise<CompanyConversionStats[]> {
    try {
      console.log(`\n📈 SERVICE: Fetching all companies conversion rates`);

      const result = await executeQuery<GetAllCompaniesConversionRateResponse>(
        KPIQueries.GET_ALL_COMPANIES_CONVERSION_RATE,
        {}
      );

      if (!result?.allCompaniesConversionRate) {
        console.warn("⚠️ No companies conversion rates returned");
        return [];
      }

      console.log(`✅ ${result.allCompaniesConversionRate.length} companies conversion rates fetched`);
      return result.allCompaniesConversionRate;
    } catch (error) {
      console.error("❌ Error fetching all companies conversion rates:", error);
      throw error;
    }
  },

  // ========================================================================
  // OBJETIVOS DE ENTREVISTA
  // ========================================================================

  async getInterviewObjectivesKPI(interviewId: string): Promise<InterviewObjectivesKPI | null> {
    try {
      console.log(`\n🎯 SERVICE: Fetching interview objectives KPI: ${interviewId}`);

      if (!interviewId || interviewId.trim() === "") {
        throw new Error("Invalid interview ID");
      }

      const result = await executeQuery<GetInterviewObjectivesKPIResponse>(KPIQueries.GET_INTERVIEW_OBJECTIVES_KPI, {
        interviewId,
      });

      if (!result?.interviewObjectivesKPI) {
        console.warn(`⚠️ Interview objectives KPI ${interviewId} not found`);
        return null;
      }

      console.log("✅ Interview objectives KPI fetched");
      return result.interviewObjectivesKPI;
    } catch (error) {
      console.error(`❌ Error fetching interview objectives KPI:`, error);
      throw error;
    }
  },

  async getAllInterviewsObjectivesKPI(): Promise<AllInterviewsObjectivesSummary> {
    try {
      console.log(`\n🎯 SERVICE: Fetching all interviews objectives KPI`);

      const result = await executeQuery<GetAllInterviewsObjectivesKPIResponse>(
        KPIQueries.GET_ALL_INTERVIEWS_OBJECTIVES_KPI,
        {}
      );

      if (!result?.allInterviewsObjectivesKPI) {
        throw new Error("Failed to fetch all interviews objectives KPI");
      }

      console.log("✅ All interviews objectives KPI fetched");
      return result.allInterviewsObjectivesKPI;
    } catch (error) {
      console.error("❌ Error fetching all interviews objectives KPI:", error);
      throw error;
    }
  },

  async getCandidateInterviewsObjectivesKPI(candidateName: string): Promise<CandidateInterviewStats | null> {
    try {
      console.log(`\n👤 SERVICE: Fetching candidate interviews objectives KPI: ${candidateName}`);

      if (!candidateName || candidateName.trim() === "") {
        throw new Error("Invalid candidate name");
      }

      const result = await executeQuery<GetCandidateInterviewsObjectivesKPIResponse>(
        KPIQueries.GET_CANDIDATE_INTERVIEWS_OBJECTIVES_KPI,
        { candidateName }
      );

      if (!result?.candidateInterviewsObjectivesKPI) {
        console.warn(`⚠️ Candidate objectives KPI ${candidateName} not found`);
        return null;
      }

      console.log("✅ Candidate interviews objectives KPI fetched");
      return result.candidateInterviewsObjectivesKPI;
    } catch (error) {
      console.error(`❌ Error fetching candidate interviews objectives KPI:`, error);
      throw error;
    }
  },

  async getInterviewObjectivesByCompany(empresaId: string): Promise<CompanyInterviewStats | null> {
    try {
      console.log(`\n🎯 SERVICE: Fetching interview objectives by company: ${empresaId}`);

      if (!empresaId || empresaId.trim() === "") {
        throw new Error("Invalid empresa ID");
      }

      const result = await executeQuery<GetInterviewObjectivesByCompanyResponse>(
        KPIQueries.GET_INTERVIEW_OBJECTIVES_BY_COMPANY,
        { empresaId }
      );

      if (!result?.interviewObjectivesByCompany) {
        console.warn(`⚠️ Interview objectives for company ${empresaId} not found`);
        return null;
      }

      console.log("✅ Interview objectives by company fetched");
      return result.interviewObjectivesByCompany;
    } catch (error) {
      console.error(`❌ Error fetching interview objectives by company:`, error);
      throw error;
    }
  },

  async getAllCompaniesInterviewObjectives(): Promise<CompanyInterviewStats[]> {
    try {
      console.log(`\n🎯 SERVICE: Fetching all companies interview objectives`);

      const result = await executeQuery<GetAllCompaniesInterviewObjectivesResponse>(
        KPIQueries.GET_ALL_COMPANIES_INTERVIEW_OBJECTIVES,
        {}
      );

      if (!result?.allCompaniesInterviewObjectives) {
        console.warn("⚠️ No companies interview objectives returned");
        return [];
      }

      console.log(`✅ ${result.allCompaniesInterviewObjectives.length} companies interview objectives fetched`);
      return result.allCompaniesInterviewObjectives;
    } catch (error) {
      console.error("❌ Error fetching all companies interview objectives:", error);
      throw error;
    }
  },

  // ========================================================================
  // EVALUACIONES
  // ========================================================================

  async getEvaluacionKPI(evaluacionId: string): Promise<EvaluacionKPI | null> {
    try {
      console.log(`\n📊 SERVICE: Fetching evaluacion KPI: ${evaluacionId}`);

      if (!evaluacionId || evaluacionId.trim() === "") {
        throw new Error("Invalid evaluacion ID");
      }

      const result = await executeQuery<GetEvaluacionKPIResponse>(KPIQueries.GET_EVALUACION_KPI, { evaluacionId });

      if (!result?.evaluacionKPI) {
        console.warn(`⚠️ Evaluacion KPI ${evaluacionId} not found`);
        return null;
      }

      console.log("✅ Evaluacion KPI fetched");
      return result.evaluacionKPI;
    } catch (error) {
      console.error(`❌ Error fetching evaluacion KPI:`, error);
      throw error;
    }
  },

  async getAllEvaluacionesKPI(): Promise<AllEvaluacionesSummary> {
    try {
      console.log(`\n📊 SERVICE: Fetching all evaluaciones KPI`);

      const result = await executeQuery<GetAllEvaluacionesKPIResponse>(KPIQueries.GET_ALL_EVALUACIONES_KPI, {});

      if (!result?.allEvaluacionesKPI) {
        throw new Error("Failed to fetch all evaluaciones KPI");
      }

      console.log("✅ All evaluaciones KPI fetched");
      return result.allEvaluacionesKPI;
    } catch (error) {
      console.error("❌ Error fetching all evaluaciones KPI:", error);
      throw error;
    }
  },

  async getEvaluacionesByInterview(entrevistaId: string): Promise<EvaluacionesByInterviewStats | null> {
    try {
      console.log(`\n📊 SERVICE: Fetching evaluaciones by interview: ${entrevistaId}`);

      if (!entrevistaId || entrevistaId.trim() === "") {
        throw new Error("Invalid entrevista ID");
      }

      const result = await executeQuery<GetEvaluacionesByInterviewResponse>(KPIQueries.GET_EVALUACIONES_BY_INTERVIEW, {
        entrevistaId,
      });

      if (!result?.evaluacionesByInterview) {
        console.warn(`⚠️ No evaluaciones found for interview ${entrevistaId}`);
        return null;
      }

      console.log("✅ Evaluaciones by interview fetched");
      return result.evaluacionesByInterview;
    } catch (error) {
      console.error(`❌ Error fetching evaluaciones by interview:`, error);
      throw error;
    }
  },

  async getEvaluacionesByCompany(empresaId: string): Promise<EvaluacionesByCompanyStats | null> {
    try {
      console.log(`\n📊 SERVICE: Fetching evaluaciones by company: ${empresaId}`);

      if (!empresaId || empresaId.trim() === "") {
        throw new Error("Invalid empresa ID");
      }

      const result = await executeQuery<GetEvaluacionesByCompanyResponse>(KPIQueries.GET_EVALUACIONES_BY_COMPANY, {
        empresaId,
      });

      if (!result?.evaluacionesByCompany) {
        console.warn(`⚠️ No evaluaciones found for company ${empresaId}`);
        return null;
      }

      console.log("✅ Evaluaciones by company fetched");
      return result.evaluacionesByCompany;
    } catch (error) {
      console.error(`❌ Error fetching evaluaciones by company:`, error);
      throw error;
    }
  },

  async getEvaluacionesByInterviewer(entrevistador: string): Promise<EvaluacionesByInterviewerStats | null> {
    try {
      console.log(`\n📊 SERVICE: Fetching evaluaciones by interviewer: ${entrevistador}`);

      if (!entrevistador || entrevistador.trim() === "") {
        throw new Error("Invalid interviewer name");
      }

      const result = await executeQuery<GetEvaluacionesByInterviewerResponse>(
        KPIQueries.GET_EVALUACIONES_BY_INTERVIEWER,
        { entrevistador }
      );

      if (!result?.evaluacionesByInterviewer) {
        console.warn(`⚠️ No evaluaciones found for interviewer ${entrevistador}`);
        return null;
      }

      console.log("✅ Evaluaciones by interviewer fetched");
      return result.evaluacionesByInterviewer;
    } catch (error) {
      console.error(`❌ Error fetching evaluaciones by interviewer:`, error);
      throw error;
    }
  },
};
