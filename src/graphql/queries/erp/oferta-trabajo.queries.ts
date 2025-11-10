export const GET_OFERTAS_TRABAJO = `
  query {
    obtenerOfertasTrabajo {
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

export const GET_OFERTA_TRABAJO_POR_ID = `
  query($id: String!) {
    obtenerOfertaTrabajoPorId(id: $id) {
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