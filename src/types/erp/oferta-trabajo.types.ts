export type OfertaTrabajoType = {
  id: string;
  titulo: string;
  descripcion: string;
  salario: number;
  ubicacion: string;
  requisitos: string;
  fechaPublicacion: string;
  createdAt?: string;
  updatedAt?: string;
  empresa?: EmpresaType;
  postulaciones?: PostulacionType[];
  visualizaciones?: VisualizacionOfertaType[];
};

export type EmpresaType = {
  id: string;
  nombre: string;
  correo: string;
  rubro: string;
};

export type PostulacionType = {
  id: string;
  nombre: string;
  estado: string;
};

export type VisualizacionOfertaType = {
  id: string;
  fechaVisualizacion: string;
  origen: string;
};