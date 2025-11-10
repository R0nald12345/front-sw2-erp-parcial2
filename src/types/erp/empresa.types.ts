
export type OfertaTrabajoType = {
  id: string;
  titulo: string;
  descripcion?: string;
  salario?: number;
  ubicacion?: string;
  requisitos?: string;
  fechaPublicacion?: string;
  createdAt?: string;
  updatedAt?: string;
};


export type EmpresaType = {
  id: string;
  nombre: string;
  correo: string;
  rubro: string;
  createdAt?: string;
  updatedAt?: string;
  ofertas?: OfertaTrabajoType[];
};


export type CreateEmpresaInput = {
  nombre: string;
  correo: string;
  rubro: string;
};


export type UpdateEmpresaInput = {
  id: string;
  nombre: string;
  correo: string;
  rubro: string;
};