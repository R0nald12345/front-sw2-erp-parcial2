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

interface DeleteEmpresaResponse {
  deleteEmpresa: boolean;
}

interface UpdateEmpresaResponse {
  updateEmpresa: EmpresaType;
}

export const empresaService = {
  /**
   * Obtener todas las empresas
   * @param limit - Número máximo de empresas a obtener (default: 10, max: 100)
   */
  async getEmpresas(limit: number = 10): Promise<EmpresaType[]> {
    try {
      console.log(`🏢 Fetching empresas with limit: ${limit}...`);
      
      const result = await executeGraphQL<GetEmpresasResponse>(
        EmpresaQueries.GET_EMPRESAS,
        { limit },
        'empresas',
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

  /**
   * Obtener empresa por ID
   * @param id - UUID de la empresa
   */
  async getEmpresaPorId(id: string): Promise<EmpresaType | null> {
    try {
      console.log(`🏢 Fetching empresa with id: ${id}`);

      if (!id || id.trim() === '') {
        throw new Error('Invalid empresa ID');
      }

      const result = await executeGraphQL<GetEmpresaPorIdResponse>(
        EmpresaQueries.GET_EMPRESA_POR_ID,
        { id },
        'empresa',
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

  /**
   * Crear nueva empresa
   * @param input - Datos de la empresa a crear
   */
  async crearEmpresa(input: CreateEmpresaInput): Promise<EmpresaType> {
    try {
      console.log('🆕 Creating empresa:', input.nombre);

      if (!input.nombre || !input.correo || !input.rubro) {
        throw new Error('Missing required fields: nombre, correo, rubro');
      }

      // Validar formato de correo
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.correo)) {
        throw new Error('Invalid email format');
      }

      const result = await executeGraphQL<CreateEmpresaResponse>(
        EmpresaMutations.CREAR_EMPRESA,
        input,
        'createEmpresa',
        false
      );

      if (!result?.createEmpresa) {
        throw new Error('Error creating empresa');
      }

      console.log('✅ Empresa created successfully:', result.createEmpresa.id);
      return result.createEmpresa;
    } catch (error) {
      console.error('❌ Error creating empresa:', error);
      throw error;
    }
  },

  /**
   * Actualizar empresa existente
   * @param input - Datos de la empresa a actualizar
   */
  async actualizarEmpresa(input: UpdateEmpresaInput): Promise<EmpresaType> {
    try {
      console.log(`✏️ Updating empresa with id: ${input.id}`);

      if (!input.id || !input.nombre || !input.correo || !input.rubro) {
        throw new Error('Missing required fields');
      }

      const result = await executeGraphQL<UpdateEmpresaResponse>(
        EmpresaMutations.ACTUALIZAR_EMPRESA,
        input,
        'updateEmpresa',
        false
      );

      if (!result?.updateEmpresa) {
        throw new Error('Error updating empresa');
      }

      console.log('✅ Empresa updated successfully:', result.updateEmpresa.id);
      return result.updateEmpresa;
    } catch (error) {
      console.error(`❌ Error updating empresa:`, error);
      throw error;
    }
  },

  /**
   * Eliminar empresa
   * @param id - UUID de la empresa a eliminar
   */
  async eliminarEmpresa(id: string): Promise<boolean> {
    try {
      console.log(`🗑️ Deleting empresa with id: ${id}`);

      if (!id || id.trim() === '') {
        throw new Error('Invalid empresa ID');
      }

      const result = await executeGraphQL<DeleteEmpresaResponse>(
        EmpresaMutations.ELIMINAR_EMPRESA,
        { id },
        'deleteEmpresa',
        false
      );

      if (result?.deleteEmpresa !== true) {
        throw new Error('Error deleting empresa');
      }

      console.log('✅ Empresa deleted successfully');
      return true;
    } catch (error) {
      console.error(`❌ Error deleting empresa ${id}:`, error);
      throw error;
    }
  },
};