export const CREAR_EVALUACION = `
  mutation(
    $calificacionTecnica: Float!
    $calificacionActitud: Float!
    $calificacionGeneral: Float!
    $comentarios: String!
    $entrevistaId: String!
  ) {
    crearEvaluacion(
      calificacionTecnica: $calificacionTecnica
      calificacionActitud: $calificacionActitud
      calificacionGeneral: $calificacionGeneral
      comentarios: $comentarios
      entrevistaId: $entrevistaId
    ) {
      id
      calificacionTecnica
      calificacionActitud
      calificacionGeneral
      comentarios
    }
  }
`;

export const ELIMINAR_EVALUACION = `
  mutation($id: String!) {
    eliminarEvaluacion(id: $id)
  }
`;