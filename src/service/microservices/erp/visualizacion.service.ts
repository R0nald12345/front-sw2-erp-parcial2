import executeGraphQL from '../../graphql.service';
import * as VisualizacionQueries from '@/src/graphql/queries/erp/visualizacion.queries';
import * as VisualizacionMutations from '@/src/graphql/mutations/erp/visualizacion.mutations';
import { VisualizacionOfertaType } from '@/src/types/erp/oferta-trabajo.types';

export const visualizacionService = {
  async getVisualizacionesOferta(): Promise<VisualizacionOfertaType[]> {
    try {
      const result = await executeGraphQL<{ obtenerVisualizacionesOferta: VisualizacionOfertaType[] }>(
        VisualizacionQueries.GET_VISUALIZACIONES_OFERTA,
        undefined,
        'obtenerVisualizacionesOferta'
      );
      return result?.obtenerVisualizacionesOferta || [];
    } catch (error) {
      console.error('Error fetching visualizaciones:', error);
      throw error;
    }
  },

  async getVisualizacionOfertaPorId(id: string): Promise<VisualizacionOfertaType | null> {
    try {
      const result = await executeGraphQL<{ obtenerVisualizacionOfertaPorId: VisualizacionOfertaType }>(
        VisualizacionQueries.GET_VISUALIZACION_OFERTA_POR_ID,
        { id },
        'obtenerVisualizacionOfertaPorId'
      );
      return result?.obtenerVisualizacionOfertaPorId || null;
    } catch (error) {
      console.error('Error fetching visualización:', error);
      throw error;
    }
  },

  async crearVisualizacionOferta(data: {
    fechaVisualizacion: string;
    origen: string;
    ofertaId: string;
  }): Promise<VisualizacionOfertaType> {
    try {
      const result = await executeGraphQL<{ crearVisualizacionOferta: VisualizacionOfertaType }>(
        VisualizacionMutations.CREAR_VISUALIZACION_OFERTA,
        data,
        'crearVisualizacionOferta'
      );
      if (!result?.crearVisualizacionOferta) throw new Error('Error creating visualización');
      return result.crearVisualizacionOferta;
    } catch (error) {
      console.error('Error creating visualización:', error);
      throw error;
    }
  },

  async eliminarVisualizacion(id: string): Promise<boolean> {
    try {
      const result = await executeGraphQL<{ eliminarVisualizacionOferta: boolean }>(
        VisualizacionMutations.ELIMINAR_VISUALIZACION,
        { id },
        'eliminarVisualizacionOferta'
      );
      return result?.eliminarVisualizacionOferta || false;
    } catch (error) {
      console.error('Error deleting visualización:', error);
      throw error;
    }
  },
};