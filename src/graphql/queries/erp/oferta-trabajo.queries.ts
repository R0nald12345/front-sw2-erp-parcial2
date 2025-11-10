export const GET_OFERTAS_TRABAJO = `
  query GetOfertasTrabajo($limit: Int) {
    ofertasTrabajo(limit: $limit) {
      id
      titulo
      descripcion
      salario
      ubicacion
      requisitos
      fechaPublicacion
      createdAt
      updatedAt
      empresa {
        id
        nombre
        correo
        rubro
      }
      postulaciones(limit: 10) {
        id
        nombre
        estado
      }
      visualizaciones(limit: 10) {
        id
        fechaVisualizacion
        origen
      }
    }
  }
`;

export const GET_OFERTA_TRABAJO_POR_ID = `
  query GetOfertaTrabajoPorId($id: String!) {
    ofertaTrabajo(id: $id) {
      id
      titulo
      descripcion
      salario
      ubicacion
      requisitos
      fechaPublicacion
      createdAt
      updatedAt
      empresa {
        id
        nombre
        correo
        rubro
      }
      postulaciones(limit: 10) {
        id
        nombre
        estado
      }
      visualizaciones(limit: 10) {
        id
        fechaVisualizacion
        origen
      }
    }
  }
`;