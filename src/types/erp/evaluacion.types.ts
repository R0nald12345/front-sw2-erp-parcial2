export type EvaluacionType = {
  id: string;
  calificacionTecnica: number;
  calificacionActitud: number;
  calificacionGeneral: number;
  comentarios: string;
  createdAt?: string;
  updatedAt?: string;
  entrevista?: EntrevistaType;
};

export type EntrevistaType = {
  id: string;
  fecha: string;
  duracionMin: number;
  entrevistador: string;
  postulacion?: PostulacionType;
};

export type PostulacionType = {
  nombre: string;
  puestoActual: string;
  oferta?: OfertaTrabajoType;
};

export type OfertaTrabajoType = {
  titulo: string;
};