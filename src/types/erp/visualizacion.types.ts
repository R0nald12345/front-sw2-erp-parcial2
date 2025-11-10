export type VisualizacionOfertaType = {
  id: string;
  fechaVisualizacion: string;
  origen: string;
  createdAt?: string;
  updatedAt?: string;
  oferta?: OfertaTrabajoType;
};

export type OfertaTrabajoType = {
  id: string;
  titulo: string;
  descripcion: string;
  empresa?: EmpresaType;
};

export type EmpresaType = {
  id: string;
  nombre: string;
  correo: string;
  rubro: string;
};