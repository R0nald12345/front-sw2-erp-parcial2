export const GET_ENTREVISTAS = `
  query {
    obtenerEntrevistas {
      id
      fecha
      duracionMin
      objetivosTotales
      objetivosCubiertos
      entrevistador
      postulacion {
        id
        nombre
        puestoActual
      }
    }
  }
`;

export const GET_ENTREVISTA_POR_ID = `
  query($id: String!) {
    obtenerEntrevistaPorId(id: $id) {
      id
      fecha
      duracionMin
      objetivosTotales
      objetivosCubiertos
      entrevistador
      postulacion {
        id
        nombre
        puestoActual
      }
    }
  }
`;