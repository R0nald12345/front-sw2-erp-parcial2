export const GET_EMPRESAS = `
  query GetEmpresas($limit: Int) {
    empresas(limit: $limit) {
      id
      nombre
      correo
      rubro
      createdAt
      updatedAt
      ofertas(limit: 5) {
        id
        titulo
        descripcion
      }
    }
  }
`;

export const GET_EMPRESA_POR_ID = `
  query GetEmpresaPorId($id: String!) {
    empresa(id: $id) {
      id
      nombre
      correo
      rubro
      createdAt
      updatedAt
      ofertas(limit: 10) {
        id
        titulo
        descripcion
        salario
        ubicacion
        requisitos
      }
    }
  }
`;