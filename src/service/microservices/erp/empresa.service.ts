import executeGraphQL from '../../graphql.service';
import * as EmpresaQueries from '@/src/graphql/queries/erp/empresa.queries';
import * as EmpresaMutations from '@/src/graphql/mutations/erp/empresa.mutations';
import { EmpresaType, CreateEmpresaInput, UpdateEmpresaInput } from '@/src/types/erp/empresa.types';

interface GetEmpresasResponse {
  empresas: EmpresaType[];
}

interface GetEmpresaPorIdResponse {
  empresa: EmpresaType;
}

interface CreateEmpresaResponse {
  createEmpresa: EmpresaType;
}

interface UpdateEmpresaResponse {
  actualizarEmpresa: EmpresaType;
}

interface DeleteEmpresaResponse {
  deleteEmpresa: {
    success: boolean;
    message: string;
  };
}

export const empresaService = {
  async getEmpresas(limit: number = 10): Promise<EmpresaType[]> {
    try {
      console.log(`\n🏢 SERVICE: Fetching empresas with limit: ${limit}`);
      
      const result = await executeGraphQL<GetEmpresasResponse>(
        EmpresaQueries.GET_EMPRESAS,
        { limit },
        'GetEmpresas',
        true
      );

      if (!result?.empresas) {
        console.warn('⚠️ No empresas returned');
        return [];
      }

      console.log(`✅ ${result.empresas.length} empresas fetched`);
      return result.empresas;
    } catch (error) {
      console.error('❌ Error fetching empresas:', error);
      throw error;
    }
  },

  async getEmpresaPorId(id: string): Promise<EmpresaType | null> {
    try {
      console.log(`\n🏢 SERVICE: Fetching empresa with id: ${id}`);

      if (!id || id.trim() === '') {
        throw new Error('Invalid empresa ID');
      }

      const result = await executeGraphQL<GetEmpresaPorIdResponse>(
        EmpresaQueries.GET_EMPRESA_POR_ID,
        { id },
        'GetEmpresaPorId',
        true
      );

      if (!result?.empresa) {
        console.warn(`⚠️ Empresa ${id} not found`);
        return null;
      }

      console.log('✅ Empresa fetched:', result.empresa.nombre);
      return result.empresa;
    } catch (error) {
      console.error(`❌ Error fetching empresa ${id}:`, error);
      throw error;
    }
  },

  async crearEmpresa(input: CreateEmpresaInput): Promise<EmpresaType> {
    try {
      console.log(`\n🆕 SERVICE: Creating empresa:`, input.nombre);

      if (!input.nombre || !input.correo || !input.rubro) {
        throw new Error('Missing required fields: nombre, correo, rubro');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.correo)) {
        throw new Error('Invalid email format');
      }

      const result = await executeGraphQL<CreateEmpresaResponse>(
        EmpresaMutations.CREAR_EMPRESA,
        input,
        'CrearEmpresa',
        false
      );

      if (!result?.createEmpresa) {
        throw new Error('Error creating empresa');
      }

      console.log('✅ Empresa created:', result.createEmpresa.id);
      return result.createEmpresa;
    } catch (error) {
      console.error('❌ Error creating empresa:', error);
      throw error;
    }
  },

  async actualizarEmpresa(input: UpdateEmpresaInput): Promise<EmpresaType> {
    try {
      console.log(`\n✏️ SERVICE: Updating empresa: ${input.id}`);

      if (!input.id || !input.nombre || !input.correo || !input.rubro) {
        throw new Error('Missing required fields');
      }

      const result = await executeGraphQL<UpdateEmpresaResponse>(
        EmpresaMutations.ACTUALIZAR_EMPRESA,
        input,
        'ActualizarEmpresa',
        false
      );

      if (!result?.actualizarEmpresa) {
        throw new Error('Error updating empresa');
      }

      console.log('✅ Empresa updated:', result.actualizarEmpresa.id);
      return result.actualizarEmpresa;
    } catch (error) {
      console.error(`❌ Error updating empresa:`, error);
      throw error;
    }
  },

  async eliminarEmpresa(id: string): Promise<boolean> {
    try {
      console.log(`\n🗑️ SERVICE: Deleting empresa: ${id}`);

      if (!id || id.trim() === '') {
        throw new Error('Invalid empresa ID');
      }

      const result = await executeGraphQL<DeleteEmpresaResponse>(
        EmpresaMutations.ELIMINAR_EMPRESA,
        { id },
        'EliminarEmpresa',
        false
      );

      if (!result?.deleteEmpresa?.success) {
        throw new Error(result?.deleteEmpresa?.message || 'Error deleting empresa');
      }

      console.log('✅ Empresa deleted:', result.deleteEmpresa.message);
      return true;
    } catch (error) {
      console.error(`❌ Error deleting empresa ${id}:`, error);
      throw error;
    }
  },
};