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