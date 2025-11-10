export const CREAR_POSTULACION = `
  mutation CreatePostulacion(
    $nombre: String!
    $aniosExperiencia: Int!
    $nivelEducacion: String!
    $habilidades: String!
    $idiomas: String!
    $certificaciones: String!
    $puestoActual: String!
    $urlCv: String!
    $fechaPostulacion: String!
    $estado: String!
    $telefono: String!
    $email: String!
    $ofertaId: String!
  ) {
    createPostulacion(
      nombre: $nombre
      aniosExperiencia: $aniosExperiencia
      nivelEducacion: $nivelEducacion
      habilidades: $habilidades
      idiomas: $idiomas
      certificaciones: $certificaciones
      puestoActual: $puestoActual
      urlCv: $urlCv
      fechaPostulacion: $fechaPostulacion
      estado: $estado
      telefono: $telefono
      email: $email
      ofertaId: $ofertaId
    ) {
      id
      nombre
      puestoActual
      telefono
      email
      createdAt
      oferta {
        id
        titulo
      }
    }
  }
`;

export const ELIMINAR_POSTULACION = `
  mutation DeletePostulacion($id: String!) {
    deletePostulacion(id: $id) {
      success
      message
    }
  }
`;

export const ACTUALIZAR_ESTADO_POSTULACION = `
  mutation UpdateEstadoPostulacion($id: String!, $estado: String!) {
    updatePostulacion(id: $id, estado: $estado) {
      id
      estado
      updatedAt
    }
  }
`;