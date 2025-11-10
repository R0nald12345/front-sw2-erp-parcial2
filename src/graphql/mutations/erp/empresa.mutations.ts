export const CREAR_EMPRESA = `
  mutation CrearEmpresa($nombre: String!, $correo: String!, $rubro: String!) {
    createEmpresa(nombre: $nombre, correo: $correo, rubro: $rubro) {
      id
      nombre
      correo
      rubro
      createdAt
      updatedAt
    }
  }
`;

export const ACTUALIZAR_EMPRESA = `
  mutation ActualizarEmpresa($id: String!, $nombre: String!, $correo: String!, $rubro: String!) {
    actualizarEmpresa(id: $id, nombre: $nombre, correo: $correo, rubro: $rubro) {
      id
      nombre
      correo
      rubro
      updatedAt
    }
  }
`;

export const ELIMINAR_EMPRESA = `
  mutation EliminarEmpresa($id: String!) {
    deleteEmpresa(id: $id) {
      success
      message
    }
  }
`;