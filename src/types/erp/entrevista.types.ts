export type EntrevistaType = {
  id: string;
  fecha: string;
  duracionMin: number;
  objetivosTotales: string;
  objetivosCubiertos: string;
  entrevistador: string;
  createdAt?: string;
  updatedAt?: string;
  postulacion?: PostulacionType;
  evaluaciones?: EvaluacionType[];
};

export type PostulacionType = {
  id: string;
  nombre: string;
  puestoActual: string;
  oferta?: OfertaTrabajoType;
};

export type OfertaTrabajoType = {
  id: string;
  titulo: string;
  empresa?: EmpresaType;
};

export type EmpresaType = {
  nombre: string;
};

export type EvaluacionType = {
  id: string;
  calificacionTecnica: number;
  calificacionActitud: number;
  calificacionGeneral: number;
};