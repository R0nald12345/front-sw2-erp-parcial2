// ERP GraphQL Queries
// Exporta queries relacionadas con ERP

export const GET_EMPRESAS_QUERY = `
  query GetEmpresas {
    empresas {
      id
      nombre
      descripcion
    }
  }
`;

export const GET_OFERTAS_QUERY = `
  query GetOfertas {
    ofertas {
      id
      titulo
      descripcion
      empresaId
    }
  }
`;
