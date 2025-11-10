import executeGraphQL from '../../graphql.service';
import * as PostulacionQueries from '@/src/graphql/queries/erp/postulacion.queries';
import * as PostulacionMutations from '@/src/graphql/mutations/erp/postulacion.mutations';
import { PostulacionType } from '@/src/types/erp/postulacion.types';

interface GetPostulacionesResponse {
  postulaciones: PostulacionType[];
}

interface GetPostulacionPorIdResponse {
  postulacion: PostulacionType;
}

interface CreatePostulacionResponse {
  createPostulacion: PostulacionType;
}

interface DeletePostulacionResponse {
  deletePostulacion: {
    success: boolean;
    message: string;
  };
}

export const postulacionService = {
  async getPostulaciones(limit: number = 10): Promise<PostulacionType[]> {
    try {
      console.log(`\n📋 SERVICE: Fetching postulaciones with limit: ${limit}`);

      const result = await executeGraphQL<GetPostulacionesResponse>(
        PostulacionQueries.GET_POSTULACIONES,
        { limit },
        'GetPostulaciones',
        true
      );

      if (!result?.postulaciones) {
        console.warn('⚠️ No postulaciones returned');
        return [];
      }

      console.log(`✅ ${result.postulaciones.length} postulaciones fetched`);
      return result.postulaciones;
    } catch (error) {
      console.error('❌ Error fetching postulaciones:', error);
      throw error;
    }
  },

  async getPostulacionPorId(id: string): Promise<PostulacionType | null> {
    try {
      console.log(`\n📋 SERVICE: Fetching postulación with id: ${id}`);

      if (!id || id.trim() === '') {
        throw new Error('Invalid postulación ID');
      }

      const result = await executeGraphQL<GetPostulacionPorIdResponse>(
        PostulacionQueries.GET_POSTULACION_POR_ID,
        { id },
        'GetPostulacionPorId',
        true
      );

      if (!result?.postulacion) {
        console.warn(`⚠️ Postulación ${id} not found`);
        return null;
      }

      console.log('✅ Postulación fetched:', result.postulacion.nombre);
      return result.postulacion;
    } catch (error) {
      console.error(`❌ Error fetching postulación ${id}:`, error);
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
      console.log(`\n🆕 SERVICE: Creating postulación:`, data.nombre);

      if (!data.nombre || !data.email || !data.ofertaId) {
        throw new Error('Missing required fields');
      }

      if (data.aniosExperiencia < 0) {
        throw new Error('Experience years must be >= 0');
      }

      const result = await executeGraphQL<CreatePostulacionResponse>(
        PostulacionMutations.CREAR_POSTULACION,
        data,
        'CreatePostulacion',
        false
      );

      if (!result?.createPostulacion) {
        throw new Error('Error creating postulación');
      }

      console.log('✅ Postulación created:', result.createPostulacion.id);
      return result.createPostulacion;
    } catch (error) {
      console.error('❌ Error creating postulación:', error);
      throw error;
    }
  },

  async eliminarPostulacion(id: string): Promise<boolean> {
    try {
      console.log(`\n🗑️ SERVICE: Deleting postulación: ${id}`);

      if (!id || id.trim() === '') {
        throw new Error('Invalid postulación ID');
      }

      const result = await executeGraphQL<DeletePostulacionResponse>(
        PostulacionMutations.ELIMINAR_POSTULACION,
        { id },
        'DeletePostulacion',
        false
      );

      if (!result?.deletePostulacion?.success) {
        throw new Error(result?.deletePostulacion?.message || 'Error deleting postulación');
      }

      console.log('✅ Postulación deleted:', result.deletePostulacion.message);
      return true;
    } catch (error) {
      console.error(`❌ Error deleting postulación ${id}:`, error);
      throw error;
    }
  },
};