export const GET_EVALUACIONES = `
  query {
    obtenerEvaluaciones {
      id
      calificacionTecnica
      calificacionActitud
      calificacionGeneral
      comentarios
      entrevista {
        id
        fecha
        entrevistador
      }
    }
  }
`;

export const GET_EVALUACION_POR_ID = `
  query($id: String!) {
    obtenerEvaluacionPorId(id: $id) {
      id
      calificacionTecnica
      calificacionActitud
      calificacionGeneral
      comentarios
      entrevista {
        id
        fecha
        entrevistador
      }
    }
  }
`;

export const EVALUACION_KPI = `
  query EvaluacionKPI($evaluacionId: String!) {
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

export const ALL_EVALUACIONES_KPI = `
  query {
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
        calificacionTecnica
        calificacionActitud
        calificacionGeneral
        qualityLevel
      }
    }
  }
`;

export const EVALUACIONES_BY_INTERVIEW = `
  query EvaluacionesByInterview($entrevistaId: String!) {
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
        calificacionTecnica
        calificacionActitud
        calificacionGeneral
        interpretation
        qualityLevel
      }
    }
  }
`;

export const EVALUACIONES_BY_COMPANY = `
  query EvaluacionesByCompany($empresaId: String!) {
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
        calificacionTecnica
        calificacionActitud
        calificacionGeneral
        interpretation
        qualityLevel
      }
    }
  }
`;

export const EVALUACIONES_BY_INTERVIEWER = `
  query EvaluacionesByInterviewer($entrevistador: String!) {
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