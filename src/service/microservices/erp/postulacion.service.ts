import executeGraphQL from '../../graphql.service';
// import * as PostulacionQueries from '@/graphql/queries/erp/postulacion.queries';
import * as PostulacionQueries from '@/src/graphql/queries/erp/postulacion.queries';
import * as PostulacionMutations from '@/src/graphql/mutations/erp/postulacion.mutations';
import { PostulacionType } from '@/src/types/erp/postulacion.types';

export const postulacionService = {
  async getPostulaciones(): Promise<PostulacionType[]> {
    try {
      const result = await executeGraphQL<{ obtenerPostulaciones: PostulacionType[] }>(
        PostulacionQueries.GET_POSTULACIONES,
        undefined,
        'obtenerPostulaciones'
      );
      return result?.obtenerPostulaciones || [];
    } catch (error) {
      console.error('Error fetching postulaciones:', error);
      throw error;
    }
  },

  async getPostulacionPorId(id: string): Promise<PostulacionType | null> {
    try {
      const result = await executeGraphQL<{ obtenerPostulacionPorId: PostulacionType }>(
        PostulacionQueries.GET_POSTULACION_POR_ID,
        { id },
        'obtenerPostulacionPorId'
      );
      return result?.obtenerPostulacionPorId || null;
    } catch (error) {
      console.error('Error fetching postulación:', error);
      throw error;
    }
  },

  async crearPostulacion(data: {
    nombre: string;
    aniosExperiencia: number;
    nivelEducacion: string;
    habilidades: string;
    idiomas: string;
    certificaciones: string;
    puestoActual: string;
    urlCv: string;
    fechaPostulacion: string;
    estado: string;
    telefono: string;
    email: string;
    ofertaId: string;
  }): Promise<PostulacionType> {
    try {
      const result = await executeGraphQL<{ crearPostulacion: PostulacionType }>(
        PostulacionMutations.CREAR_POSTULACION,
        data,
        'crearPostulacion'
      );
      if (!result?.crearPostulacion) throw new Error('Error creating postulación');
      return result.crearPostulacion;
    } catch (error) {
      console.error('Error creating postulación:', error);
      throw error;
    }
  },

  async eliminarPostulacion(id: string): Promise<boolean> {
    try {
      const result = await executeGraphQL<{ eliminarPostulacion: boolean }>(
        PostulacionMutations.ELIMINAR_POSTULACION,
        { id },
        'eliminarPostulacion'
      );
      return result?.eliminarPostulacion || false;
    } catch (error) {
      console.error('Error deleting postulación:', error);
      throw error;
    }
  },
};