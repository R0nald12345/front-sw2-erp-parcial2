// ============================================================================
// QUERIES PARA TASAS DE CONVERSIÓN
// ============================================================================

export const GET_JOB_CONVERSION_RATE = `
  query GetJobConversionRate($offerId: String!) {
    jobConversionRate(offerId: $offerId) {
      offerId
      offerTitle
      totalViews
      totalApplications
      conversionRate
      interpretation
    }
  }
`;

export const GET_ALL_JOBS_CONVERSION_RATE = `
  query GetAllJobsConversionRate {
    allJobsConversionRate {
      totalOffers
      averageConversionRate
      offerStats {
        offerId
        offerTitle
        views
        applications
        conversionPercentage
      }
    }
  }
`;

export const GET_JOB_CONVERSION_RATE_BY_PERIOD = `
  query GetJobConversionRateByPeriod($offerId: String!, $startDate: String!, $endDate: String!) {
    jobConversionRateByPeriod(offerId: $offerId, startDate: $startDate, endDate: $endDate) {
      offerId
      offerTitle
      totalViews
      totalApplications
      conversionRate
      interpretation
    }
  }
`;

export const GET_CONVERSION_RATE_BY_COMPANY = `
  query($empresaId: String!) {
    conversionRateByCompany(empresaId: $empresaId) {
      empresaId
      empresaNombre
      totalOffers
      totalViews
      totalApplications
      averageConversionRate
      offerStats {
        offerId
        offerTitle
        views
        applications
        conversionPercentage
      }
    }
  }
`;

export const GET_ALL_COMPANIES_CONVERSION_RATE = `
  query {
    allCompaniesConversionRate {
      empresaId
      empresaNombre
      totalOffers
      totalViews
      totalApplications
      averageConversionRate
      offerStats {
        offerId
        offerTitle
        views
        applications
        conversionPercentage
      }
    }
  }
`;

// ============================================================================
// QUERIES PARA OBJETIVOS DE ENTREVISTA
// ============================================================================

export const GET_INTERVIEW_OBJECTIVES_KPI = `
  query GetInterviewObjectivesKPI($interviewId: String!) {
    interviewObjectivesKPI(interviewId: $interviewId) {
      interviewId
      candidateName
      interviewer
      interviewDate
      totalObjectives
      coveredObjectives
      objectiveCoveragePercentage
      interpretation
    }
  }
`;

export const GET_ALL_INTERVIEWS_OBJECTIVES_KPI = `
  query GetAllInterviewsObjectivesKPI {
    allInterviewsObjectivesKPI {
      totalInterviews
      averageCoverage
      excellentCoverage
      acceptableCoverage
      poorCoverage
      interviewStats {
        interviewId
        candidateName
        interviewer
        interviewDate
        totalObjectives
        coveredObjectives
        objectiveCoveragePercentage
        interpretation
      }
    }
  }
`;

export const GET_CANDIDATE_INTERVIEWS_OBJECTIVES_KPI = `
  query GetCandidateInterviewsObjectivesKPI($candidateName: String!) {
    candidateInterviewsObjectivesKPI(candidateName: $candidateName) {
      candidateName
      totalInterviews
      averageObjectiveCoverage
      interviews {
        interviewId
        candidateName
        interviewer
        interviewDate
        totalObjectives
        coveredObjectives
        objectiveCoveragePercentage
        interpretation
      }
    }
  }
`;

export const GET_INTERVIEW_OBJECTIVES_BY_COMPANY = `
  query($empresaId: String!) {
    interviewObjectivesByCompany(empresaId: $empresaId) {
      empresaId
      empresaNombre
      totalInterviews
      averageCoverage
      excellentCoverage
      acceptableCoverage
      poorCoverage
      interviewStats {
        interviewId
        candidateName
        interviewer
        interviewDate
        totalObjectives
        coveredObjectives
        objectiveCoveragePercentage
        interpretation
      }
    }
  }
`;

export const GET_ALL_COMPANIES_INTERVIEW_OBJECTIVES = `
  query {
    allCompaniesInterviewObjectives {
      empresaId
      empresaNombre
      totalInterviews
      averageCoverage
      excellentCoverage
      acceptableCoverage
      poorCoverage
      interviewStats {
        interviewId
        candidateName
        interviewer
        interviewDate
        totalObjectives
        coveredObjectives
        objectiveCoveragePercentage
        interpretation
      }
    }
  }
`;

// ============================================================================
// QUERIES PARA EVALUACIONES
// ============================================================================

export const GET_EVALUACION_KPI = `
  query GetEvaluacionKPI($evaluacionId: String!) {
    evaluacionKPI(evaluacionId: $evaluacionId) {
      evaluacionId
      candidateName
      entrevistador
      interviewDate
      calificacionTecnica
      calificacionActitud
      calificacionGeneral
      interpretation
      qualityLevel
    }
  }
`;

export const GET_ALL_EVALUACIONES_KPI = `
  query GetAllEvaluacionesKPI {
    allEvaluacionesKPI {
      totalEvaluaciones
      promedioCaliTecnica
      promedioCaliActitud
      promedioCaliGeneral
      excelente
      buena
      aceptable
      pobre
      evaluacionStats {
        evaluacionId
        candidateName
        entrevistador
        interviewDate
        calificacionTecnica
        calificacionActitud
        calificacionGeneral
        interpretation
        qualityLevel
      }
    }
  }
`;

export const GET_EVALUACIONES_BY_INTERVIEW = `
  query GetEvaluacionesByInterview($entrevistaId: String!) {
    evaluacionesByInterview(entrevistaId: $entrevistaId) {
      entrevistaId
      candidateName
      entrevistador
      interviewDate
      totalEvaluaciones
      promedioCaliTecnica
      promedioCaliActitud
      promedioCaliGeneral
      evaluaciones {
        evaluacionId
        candidateName
        entrevistador
        interviewDate
        calificacionTecnica
        calificacionActitud
        calificacionGeneral
        interpretation
        qualityLevel
      }
    }
  }
`;

export const GET_EVALUACIONES_BY_COMPANY = `
  query($empresaId: String!) {
    evaluacionesByCompany(empresaId: $empresaId) {
      empresaId
      empresaNombre
      totalEvaluaciones
      promedioCaliTecnica
      promedioCaliActitud
      promedioCaliGeneral
      excelente
      buena
      aceptable
      pobre
      evaluaciones {
        evaluacionId
        candidateName
        entrevistador
        interviewDate
        calificacionTecnica
        calificacionActitud
        calificacionGeneral
        interpretation
        qualityLevel
      }
    }
  }
`;

export const GET_EVALUACIONES_BY_INTERVIEWER = `
  query GetEvaluacionesByInterviewer($entrevistador: String!) {
    evaluacionesByInterviewer(entrevistador: $entrevistador) {
      entrevistador
      totalEvaluaciones
      promedioCaliTecnica
      promedioCaliActitud
      promedioCaliGeneral
      excelente
      buena
      aceptable
      pobre
      evaluaciones {
        evaluacionId
        candidateName
        entrevistador
        interviewDate
        calificacionTecnica
        calificacionActitud
        calificacionGeneral
        interpretation
        qualityLevel
      }
    }
  }
`;
