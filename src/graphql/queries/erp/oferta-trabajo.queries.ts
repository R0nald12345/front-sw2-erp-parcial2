export const GET_OFERTAS_TRABAJO = `
query {
  ofertasTrabajo(limit: 10) {
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
  }
}
`;

export const GET_OFERTA_TRABAJO_POR_ID = `
  query($id: String!) {
    ofertaTrabajo(id: $id) {
      id
      titulo
      descripcion
      salario
      ubicacion
      requisitos
      fechaPublicacion
      empresa {
        id
        nombre
        correo
        rubro
      }
    }
  }
`;
