export const CREAR_VISUALIZACION_OFERTA = `
  mutation(
    $fechaVisualizacion: String!
    $origen: String!
    $ofertaId: String!
  ) {
    crearVisualizacionOferta(
      fechaVisualizacion: $fechaVisualizacion
      origen: $origen
      ofertaId: $ofertaId
    ) {
      id
      fechaVisualizacion
      origen
    }
  }
`;

export const ELIMINAR_VISUALIZACION = `
  mutation($id: String!) {
    eliminarVisualizacionOferta(id: $id)
  }
`;