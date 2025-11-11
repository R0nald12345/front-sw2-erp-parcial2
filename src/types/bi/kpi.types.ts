// ============================================================================
// TIPOS PARA TASAS DE CONVERSIÓN
// ============================================================================

export type ConversionRateKPI = {
  offerId: string;
  offerTitle?: string;
  totalViews: number;
  totalApplications: number;
  conversionRate: number;
  interpretation: string;
};

export type OfferConversionStats = {
  offerId: string;
  offerTitle: string;
  views: number;
  applications: number;
  conversionPercentage: number;
};

export type AllOffersConversionSummary = {
  totalOffers: number;
  offerStats: OfferConversionStats[];
  averageConversionRate: number;
};

export type CompanyConversionStats = {
  empresaId: string;
  empresaNombre: string;
  totalOffers: number;
  totalViews: number;
  totalApplications: number;
  averageConversionRate: number;
  offerStats: OfferConversionStats[];
};

// ============================================================================
// TIPOS PARA OBJETIVOS DE ENTREVISTA
// ============================================================================

export type InterviewObjectivesKPI = {
  interviewId: string;
  candidateName?: string;
  interviewer?: string;
  interviewDate?: string;
  totalObjectives: number;
  coveredObjectives: number;
  objectiveCoveragePercentage: number;
  interpretation: string;
};

export type CandidateInterviewStats = {
  candidateName: string;
  totalInterviews: number;
  averageObjectiveCoverage: number;
  interviews: InterviewObjectivesKPI[];
};

export type AllInterviewsObjectivesSummary = {
  totalInterviews: number;
  averageCoverage: number;
  excellentCoverage: number;
  acceptableCoverage: number;
  poorCoverage: number;
  interviewStats: InterviewObjectivesKPI[];
};

export type CompanyInterviewStats = {
  empresaId: string;
  empresaNombre: string;
  totalInterviews: number;
  averageCoverage: number;
  excellentCoverage: number;
  acceptableCoverage: number;
  poorCoverage: number;
  interviewStats: InterviewObjectivesKPI[];
};

// ============================================================================
// TIPOS PARA EVALUACIONES
// ============================================================================

export type EvaluacionKPI = {
  evaluacionId: string;
  candidateName?: string;
  entrevistador?: string;
  interviewDate?: string;
  calificacionTecnica?: number;
  calificacionActitud?: number;
  calificacionGeneral?: number;
  interpretation: string;
  qualityLevel: string;
};

export type EvaluacionStats = {
  evaluacionId: string;
  candidateName?: string;
  calificacionTecnica?: number;
  calificacionActitud?: number;
  calificacionGeneral?: number;
};

export type AllEvaluacionesSummary = {
  totalEvaluaciones: number;
  promedioCaliTecnica: number;
  promedioCaliActitud: number;
  promedioCaliGeneral: number;
  excelente: number;
  buena: number;
  aceptable: number;
  pobre: number;
  evaluacionStats: EvaluacionKPI[];
};

export type EvaluacionesByInterviewStats = {
  entrevistaId: string;
  candidateName: string;
  entrevistador: string;
  interviewDate: string;
  totalEvaluaciones: number;
  promedioCaliTecnica: number;
  promedioCaliActitud: number;
  promedioCaliGeneral: number;
  evaluaciones: EvaluacionKPI[];
};

export type EvaluacionesByCompanyStats = {
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
  evaluaciones: EvaluacionKPI[];
};

export type EvaluacionesByInterviewerStats = {
  entrevistador: string;
  totalEvaluaciones: number;
  promedioCaliTecnica: number;
  promedioCaliActitud: number;
  promedioCaliGeneral: number;
  excelente: number;
  buena: number;
  aceptable: number;
  pobre: number;
  evaluaciones: EvaluacionKPI[];
};
