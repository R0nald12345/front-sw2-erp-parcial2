import { executeQuery, executeMutation } from '../../graphql.service';
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

interface UpdateEstadoPostulacionResponse {
  updatePostulacion: PostulacionType;
}

interface DeletePostulacionResponse {
  deletePostulacion: string;
}

export const postulacionService = {
  async getPostulaciones(limit: number = 10): Promise<PostulacionType[]> {
    try {
      console.log(`\n📋 SERVICE: Fetching postulaciones with limit: ${limit}`);

      const result = await executeQuery<GetPostulacionesResponse>(
        PostulacionQueries.GET_POSTULACIONES,
        { limit }
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

      const result = await executeQuery<GetPostulacionPorIdResponse>(
        PostulacionQueries.GET_POSTULACION_POR_ID,
        { id }
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

      const result = await executeMutation<CreatePostulacionResponse>(
        PostulacionMutations.CREAR_POSTULACION,
        data
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

  async actualizarEstadoPostulacion(id: string, estado: string): Promise<PostulacionType> {
    try {
      console.log(`\n✏️ SERVICE: Updating postulación status: ${id} -> ${estado}`);

      if (!id || !estado) {
        throw new Error('Missing required fields');
      }

      const result = await executeMutation<UpdateEstadoPostulacionResponse>(
        PostulacionMutations.ACTUALIZAR_ESTADO_POSTULACION,
        { id, estado }
      );

      if (!result?.updatePostulacion) {
        throw new Error('Error updating postulación status');
      }

      console.log('✅ Postulación status updated:', result.updatePostulacion.id);
      return result.updatePostulacion;
    } catch (error) {
      console.error(`❌ Error updating postulación status:`, error);
      throw error;
    }
  },

  async eliminarPostulacion(id: string): Promise<string> {
    try {
      console.log(`\n🗑️ SERVICE: Deleting postulación: ${id}`);

      if (!id || id.trim() === '') {
        throw new Error('Invalid postulación ID');
      }

      const result = await executeMutation<DeletePostulacionResponse>(
        PostulacionMutations.ELIMINAR_POSTULACION,
        { id }
      );

      if (!result?.deletePostulacion) {
        throw new Error('Error deleting postulación');
      }

      console.log('✅ Postulación deleted:', result.deletePostulacion);
      return result.deletePostulacion;
    } catch (error) {
      console.error(`❌ Error deleting postulación ${id}:`, error);
      throw error;
    }
  },
};