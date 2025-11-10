import { executeQuery, executeMutation } from '../../graphql.service';
import * as VisualizacionQueries from '@/src/graphql/queries/erp/visualizacion.queries';
import * as VisualizacionMutations from '@/src/graphql/mutations/erp/visualizacion.mutations';
import { VisualizacionOfertaType } from '@/src/types/erp/oferta-trabajo.types';

interface GetVisualizacionesResponse {
  visualizacionesOferta: VisualizacionOfertaType[];
}

interface GetVisualizacionPorIdResponse {
  visualizacionOferta: VisualizacionOfertaType;
}

interface CreateVisualizacionResponse {
  createVisualizacionOferta: VisualizacionOfertaType;
}

interface DeleteVisualizacionResponse {
  deleteVisualizacionOferta: string;
}

export const visualizacionService = {
  async getVisualizacionesOferta(limit: number = 10): Promise<VisualizacionOfertaType[]> {
    try {
      console.log(`\n👁️ SERVICE: Fetching visualizaciones with limit: ${limit}`);
      
      const result = await executeQuery<GetVisualizacionesResponse>(
        VisualizacionQueries.GET_VISUALIZACIONES_OFERTA,
        { limit }
      );

      if (!result?.visualizacionesOferta) {
        console.warn('⚠️ No visualizaciones returned');
        return [];
      }

      console.log(`✅ ${result.visualizacionesOferta.length} visualizaciones fetched`);
      return result.visualizacionesOferta;
    } catch (error) {
      console.error('❌ Error fetching visualizaciones:', error);
      throw error;
    }
  },

  async getVisualizacionOfertaPorId(id: string): Promise<VisualizacionOfertaType | null> {
    try {
      console.log(`\n👁️ SERVICE: Fetching visualización with id: ${id}`);

      if (!id || id.trim() === '') {
        throw new Error('Invalid visualización ID');
      }

      const result = await executeQuery<GetVisualizacionPorIdResponse>(
        VisualizacionQueries.GET_VISUALIZACION_OFERTA_POR_ID,
        { id }
      );

      if (!result?.visualizacionOferta) {
        console.warn(`⚠️ Visualización ${id} not found`);
        return null;
      }

      console.log('✅ Visualización fetched:', result.visualizacionOferta.id);
      return result.visualizacionOferta;
    } catch (error) {
      console.error(`❌ Error fetching visualización ${id}:`, error);
      throw error;
    }
  },

  async crearVisualizacionOferta(data: {
    fechaVisualizacion: string;
    origen: string;
    ofertaId: string;
  }): Promise<VisualizacionOfertaType> {
    try {
      console.log(`\n🆕 SERVICE: Creating visualización for oferta: ${data.ofertaId}`);

      if (!data.fechaVisualizacion || !data.origen || !data.ofertaId) {
        throw new Error('Missing required fields');
      }

      const result = await executeMutation<CreateVisualizacionResponse>(
        VisualizacionMutations.CREAR_VISUALIZACION_OFERTA,
        data
      );

      if (!result?.createVisualizacionOferta) {
        throw new Error('Error creating visualización');
      }

      console.log('✅ Visualización created:', result.createVisualizacionOferta.id);
      return result.createVisualizacionOferta;
    } catch (error) {
      console.error('❌ Error creating visualización:', error);
      throw error;
    }
  },

  async eliminarVisualizacion(id: string): Promise<string> {
    try {
      console.log(`\n🗑️ SERVICE: Deleting visualización: ${id}`);

      if (!id || id.trim() === '') {
        throw new Error('Invalid visualización ID');
      }

      const result = await executeMutation<DeleteVisualizacionResponse>(
        VisualizacionMutations.ELIMINAR_VISUALIZACION,
        { id }
      );

      if (!result?.deleteVisualizacionOferta) {
        throw new Error('Error deleting visualización');
      }

      console.log('✅ Visualización deleted:', result.deleteVisualizacionOferta);
      return result.deleteVisualizacionOferta;
    } catch (error) {
      console.error(`❌ Error deleting visualización ${id}:`, error);
      throw error;
    }
  },
};