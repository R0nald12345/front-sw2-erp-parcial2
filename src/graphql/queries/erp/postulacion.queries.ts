export const GET_POSTULACIONES = `
  query {
    obtenerPostulaciones {
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
      oferta {
        id
        titulo
      }
    }
  }
`;

export const GET_POSTULACION_POR_ID = `
  query($id: String!) {
    obtenerPostulacionPorId(id: $id) {
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
      oferta {
        id
        titulo
        descripcion
      }
    }
  }
`;