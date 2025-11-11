import { executeQuery } from "../../graphql.service";
import * as KPIQueries from "@/src/graphql/queries/bi/kpi.queries";
import { CompanyConversionStats, CompanyInterviewStats, EvaluacionesByCompanyStats } from "@/src/types/bi/kpi.types";

interface GetConversionRateByCompanyResponse {
  conversionRateByCompany: CompanyConversionStats;
}

interface GetAllCompaniesConversionRateResponse {
  allCompaniesConversionRate: CompanyConversionStats[];
}

interface GetInterviewObjectivesByCompanyResponse {
  interviewObjectivesByCompany: CompanyInterviewStats;
}

interface GetAllCompaniesInterviewObjectivesResponse {
  allCompaniesInterviewObjectives: CompanyInterviewStats[];
}

interface GetEvaluacionesByCompanyResponse {
  evaluacionesByCompany: EvaluacionesByCompanyStats;
}

export const empresaBIService = {
  async getConversionRateByCompany(empresaId: string): Promise<CompanyConversionStats | null> {
    if (!empresaId || empresaId.trim() === "") {
      console.error("❌ getConversionRateByCompany: Invalid empresa ID");
      throw new Error("Invalid empresa ID");
    }

    console.log(`🔍 getConversionRateByCompany: Querying with empresaId=${empresaId}`);
    const result = await executeQuery<GetConversionRateByCompanyResponse>(KPIQueries.GET_CONVERSION_RATE_BY_COMPANY, {
      empresaId,
    });

    console.log("📦 getConversionRateByCompany Result:", result);
    return result?.conversionRateByCompany ?? null;
  },

  async getAllCompaniesConversionRate(): Promise<CompanyConversionStats[]> {
    console.log(`🔍 getAllCompaniesConversionRate: Querying all companies`);
    const result = await executeQuery<GetAllCompaniesConversionRateResponse>(
      KPIQueries.GET_ALL_COMPANIES_CONVERSION_RATE,
      {}
    );

    console.log("📦 getAllCompaniesConversionRate Result:", result);
    return result?.allCompaniesConversionRate ?? [];
  },

  async getInterviewObjectivesByCompany(empresaId: string): Promise<CompanyInterviewStats | null> {
    if (!empresaId || empresaId.trim() === "") {
      console.error("❌ getInterviewObjectivesByCompany: Invalid empresa ID");
      throw new Error("Invalid empresa ID");
    }

    console.log(`🔍 getInterviewObjectivesByCompany: Querying with empresaId=${empresaId}`);
    const result = await executeQuery<GetInterviewObjectivesByCompanyResponse>(
      KPIQueries.GET_INTERVIEW_OBJECTIVES_BY_COMPANY,
      { empresaId }
    );

    console.log("📦 getInterviewObjectivesByCompany Result:", result);
    return result?.interviewObjectivesByCompany ?? null;
  },

  async getAllCompaniesInterviewObjectives(): Promise<CompanyInterviewStats[]> {
    console.log(`🔍 getAllCompaniesInterviewObjectives: Querying all companies`);
    const result = await executeQuery<GetAllCompaniesInterviewObjectivesResponse>(
      KPIQueries.GET_ALL_COMPANIES_INTERVIEW_OBJECTIVES,
      {}
    );

    console.log("📦 getAllCompaniesInterviewObjectives Result:", result);
    return result?.allCompaniesInterviewObjectives ?? [];
  },

  async getEvaluacionesByCompany(empresaId: string): Promise<EvaluacionesByCompanyStats | null> {
    if (!empresaId || empresaId.trim() === "") {
      console.error("❌ getEvaluacionesByCompany: Invalid empresa ID");
      throw new Error("Invalid empresa ID");
    }

    console.log(`🔍 getEvaluacionesByCompany: Querying with empresaId=${empresaId}`);
    const result = await executeQuery<GetEvaluacionesByCompanyResponse>(KPIQueries.GET_EVALUACIONES_BY_COMPANY, {
      empresaId,
    });

    console.log("📦 getEvaluacionesByCompany Result:", result);
    return result?.evaluacionesByCompany ?? null;
  },
};

export default empresaBIService;
