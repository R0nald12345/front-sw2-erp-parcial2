export const GET_VISUALIZACIONES_OFERTA = `
  query {
    obtenerVisualizacionesOferta {
      id
      fechaVisualizacion
      origen
      oferta {
        id
        titulo
      }
    }
  }
`;

export const GET_VISUALIZACION_OFERTA_POR_ID = `
  query($id: String!) {
    obtenerVisualizacionOfertaPorId(id: $id) {
      id
      fechaVisualizacion
      origen
      oferta {
        id
        titulo
      }
    }
  }
`;