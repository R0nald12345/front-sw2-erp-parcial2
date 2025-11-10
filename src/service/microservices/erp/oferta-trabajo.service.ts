import executeGraphQL from "../../graphql.service";
import * as OfertaQueries from "@/src/graphql/queries/erp/oferta-trabajo.queries";
import * as OfertaMutations from "@/src/graphql/mutations/erp/oferta-trabajo.mutations";
import { OfertaTrabajoType } from "@/src/types/erp/oferta-trabajo.types";

interface GetOfertasResponse {
  ofertasTrabajo: OfertaTrabajoType[];
}

interface GetOfertaPorIdResponse {
  ofertaTrabajo: OfertaTrabajoType;
}

interface CreateOfertaResponse {
  createOfertaTrabajo: OfertaTrabajoType;
}

interface DeleteOfertaResponse {
  deleteOfertaTrabajo: {
    success: boolean;
    message: string;
  };
}

export const ofertaTrabajoService = {
  async getOfertasTrabajo(limit: number = 10): Promise<OfertaTrabajoType[]> {
    try {
      console.log(`\n📋 SERVICE: Fetching ofertas trabajo with limit: ${limit}`);
      
      const result = await executeGraphQL<GetOfertasResponse>(
        OfertaQueries.GET_OFERTAS_TRABAJO,
        { limit },
        'GetOfertasTrabajo',
        true
      );

      if (!result?.ofertasTrabajo) {
        console.warn('⚠️ No ofertas returned');
        return [];
      }

      console.log(`✅ ${result.ofertasTrabajo.length} ofertas fetched`);
      return result.ofertasTrabajo;
    } catch (error) {
      console.error('❌ Error fetching ofertas trabajo:', error);
      throw error;
    }
  },

  async getOfertaTrabajoPorId(id: string): Promise<OfertaTrabajoType | null> {
    try {
      console.log(`\n📋 SERVICE: Fetching oferta trabajo with id: ${id}`);

      if (!id || id.trim() === '') {
        throw new Error('Invalid oferta ID');
      }

      const result = await executeGraphQL<GetOfertaPorIdResponse>(
        OfertaQueries.GET_OFERTA_TRABAJO_POR_ID,
        { id },
        'GetOfertaTrabajoPorId',
        true
      );

      if (!result?.ofertaTrabajo) {
        console.warn(`⚠️ Oferta ${id} not found`);
        return null;
      }

      console.log('✅ Oferta fetched:', result.ofertaTrabajo.titulo);
      return result.ofertaTrabajo;
    } catch (error) {
      console.error(`❌ Error fetching oferta ${id}:`, error);
      throw error;
    }
  },

  async crearOfertaTrabajo(data: {
    titulo: string;
    descripcion: string;
    salario: number;
    ubicacion: string;
    requisitos: string;
    fechaPublicacion: string;
    empresaId: string;
  }): Promise<OfertaTrabajoType> {
    try {
      console.log(`\n🆕 SERVICE: Creating oferta:`, data.titulo);

      if (!data.titulo || !data.descripcion || !data.empresaId) {
        throw new Error('Missing required fields');
      }

      if (data.salario <= 0) {
        throw new Error('Salary must be greater than 0');
      }

      const result = await executeGraphQL<CreateOfertaResponse>(
        OfertaMutations.CREAR_OFERTA_TRABAJO,
        data,
        'CreateOfertaTrabajo',
        false
      );

      if (!result?.createOfertaTrabajo) {
        throw new Error('Error creating oferta');
      }

      console.log('✅ Oferta created:', result.createOfertaTrabajo.id);
      return result.createOfertaTrabajo;
    } catch (error) {
      console.error('❌ Error creating oferta:', error);
      throw error;
    }
  },

  async eliminarOfertaTrabajo(id: string): Promise<boolean> {
    try {
      console.log(`\n🗑️ SERVICE: Deleting oferta: ${id}`);

      if (!id || id.trim() === '') {
        throw new Error('Invalid oferta ID');
      }

      const result = await executeGraphQL<DeleteOfertaResponse>(
        OfertaMutations.ELIMINAR_OFERTA_TRABAJO,
        { id },
        'DeleteOfertaTrabajo',
        false
      );

      if (!result?.deleteOfertaTrabajo?.success) {
        throw new Error(result?.deleteOfertaTrabajo?.message || 'Error deleting oferta');
      }

      console.log('✅ Oferta deleted:', result.deleteOfertaTrabajo.message);
      return true;
    } catch (error) {
      console.error(`❌ Error deleting oferta ${id}:`, error);
      throw error;
    }
  },
};