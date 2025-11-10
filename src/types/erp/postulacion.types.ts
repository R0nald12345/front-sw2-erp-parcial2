export type PostulacionType = {
  id: string;
  nombre: string;
  aniosExperiencia: number;
  nivelEducacion: string;
  habilidades: string;
  idiomas: string;
  certificaciones: string;
  puestoActual: string;
  urlCv: string;
  telefono: string;
  email: string;
  fechaPostulacion: string;
  estado: 'Pendiente' | 'En Revisión' | 'Entrevista' | 'Ofertado' | 'Contratado' | 'Rechazado';
  createdAt?: string;
  updatedAt?: string;
  oferta?: OfertaTrabajoType;
  entrevistas?: EntrevistaType[];
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
};

export type EntrevistaType = {
  id: string;
  fecha: string;
  entrevistador: string;
};