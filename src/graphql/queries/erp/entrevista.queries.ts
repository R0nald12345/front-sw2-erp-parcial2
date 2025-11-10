export const GET_ENTREVISTAS = `
  query($limit: Int) {
    entrevistas(limit: $limit) {
      id
      fecha
      duracionMin
      objetivosTotales
      objetivosCubiertos
      entrevistador
      postulacion {
        id
        nombre
        oferta {
          titulo
        }
      }
    }
  }
`;

export const GET_ENTREVISTA_POR_ID = `
  query($id: UUID!) {
    entrevista(id: $id) {
      id
      fecha
      duracionMin
      objetivosTotales
      objetivosCubiertos
      entrevistador
      postulacion {
        id
        nombre
        oferta {
          titulo
        }
      }
    }
  }
`;