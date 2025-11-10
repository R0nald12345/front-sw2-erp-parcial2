export const GET_POSTULACIONES = `
  query GetPostulaciones($limit: Int) {
    postulaciones(limit: $limit) {
      id
      nombre
      aniosExperiencia
      nivelEducacion
      habilidades
      idiomas
      certificaciones
      puestoActual
      urlCv
      telefono
      email
      fechaPostulacion
      estado
      createdAt
      updatedAt
      oferta {
        id
        titulo
        empresa {
          id
          nombre
          correo
        }
      }
    }
  }
`;

export const GET_POSTULACION_POR_ID = `
  query GetPostulacionPorId($id: String!) {
    postulacion(id: $id) {
      id
      nombre
      aniosExperiencia
      nivelEducacion
      habilidades
      idiomas
      certificaciones
      puestoActual
      urlCv
      telefono
      email
      fechaPostulacion
      estado
      createdAt
      updatedAt
      oferta {
        id
        titulo
        descripcion
        empresa {
          id
          nombre
          correo
        }
      }
    }
  }
`;