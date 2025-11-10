export const CREAR_POSTULACION = `
  mutation(
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
    crearPostulacion(
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
      oferta {
        titulo
      }
    }
  }
`;

export const ELIMINAR_POSTULACION = `
  mutation($id: String!) {
    eliminarPostulacion(id: $id)
  }
`;