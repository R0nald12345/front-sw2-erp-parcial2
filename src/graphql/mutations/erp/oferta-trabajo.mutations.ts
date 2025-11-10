export const CREAR_OFERTA_TRABAJO = `
  mutation(
    $titulo: String!
    $descripcion: String!
    $salario: Float!
    $ubicacion: String!
    $requisitos: String!
    $fechaPublicacion: String!
    $empresaId: String!
  ) {
    crearOfertaTrabajo(
      titulo: $titulo
      descripcion: $descripcion
      salario: $salario
      ubicacion: $ubicacion
      requisitos: $requisitos
      fechaPublicacion: $fechaPublicacion
      empresaId: $empresaId
    ) {
      id
      titulo
      descripcion
      salario
      empresa {
        nombre
      }
    }
  }
`;

export const ELIMINAR_OFERTA_TRABAJO = `
  mutation($id: String!) {
    eliminarOfertaTrabajo(id: $id)
  }
`;