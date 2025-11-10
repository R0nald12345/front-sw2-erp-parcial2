export const CREAR_OFERTA_TRABAJO = `
  mutation CreateOfertaTrabajo(
    $titulo: String!
    $descripcion: String!
    $salario: Float!
    $ubicacion: String!
    $requisitos: String!
    $fechaPublicacion: String!
    $empresaId: String!
  ) {
    createOfertaTrabajo(
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
        id
        nombre
      }
      createdAt
    }
  }
`;

export const ACTUALIZAR_OFERTA_TRABAJO = `
  mutation UpdateOfertaTrabajo(
    $id: String!
    $titulo: String!
    $descripcion: String!
    $salario: Float!
    $ubicacion: String!
    $requisitos: String!
    $fechaPublicacion: String!
  ) {
    updateOfertaTrabajo(
      id: $id
      titulo: $titulo
      descripcion: $descripcion
      salario: $salario
      ubicacion: $ubicacion
      requisitos: $requisitos
      fechaPublicacion: $fechaPublicacion
    ) {
      id
      titulo
      descripcion
      salario
      updatedAt
    }
  }
`;

export const ELIMINAR_OFERTA_TRABAJO = `
  mutation DeleteOfertaTrabajo($id: String!) {
    deleteOfertaTrabajo(id: $id) {
      success
      message
    }
  }
`;