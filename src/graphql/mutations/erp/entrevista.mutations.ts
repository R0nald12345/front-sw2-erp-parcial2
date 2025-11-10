export const CREAR_ENTREVISTA = `
  mutation(
    $fecha: String!
    $duracionMin: Int!
    $objetivosTotales: String!
    $objetivosCubiertos: String!
    $entrevistador: String!
    $postulacionId: String!
  ) {
    crearEntrevista(
      fecha: $fecha
      duracionMin: $duracionMin
      objetivosTotales: $objetivosTotales
      objetivosCubiertos: $objetivosCubiertos
      entrevistador: $entrevistador
      postulacionId: $postulacionId
    ) {
      id
      fecha
      entrevistador
    }
  }
`;

export const ELIMINAR_ENTREVISTA = `
  mutation($id: String!) {
    eliminarEntrevista(id: $id)
  }
`;