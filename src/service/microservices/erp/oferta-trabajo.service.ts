import executeGraphQL from "../../graphql.service";
import * as OfertaQueries from "@/src/graphql/queries/erp/oferta-trabajo.queries";
import * as OfertaMutations from "@/src/graphql/mutations/erp/oferta-trabajo.mutations";
import { OfertaTrabajoType } from "@/src/types/erp/empresa.types";

export const ofertaTrabajoService = {
  async getOfertasTrabajo(): Promise<OfertaTrabajoType[]> {
    try {
      const result = await executeGraphQL<{ ofertasTrabajo: OfertaTrabajoType[] }>(
        OfertaQueries.GET_OFERTAS_TRABAJO,
        undefined,
        "ofertasTrabajo"
      );
      return result?.ofertasTrabajo || [];
    } catch (error) {
      console.error("Error fetching ofertas trabajo:", error);
      throw error;
    }
  },

  async getOfertaTrabajoPorId(id: string): Promise<OfertaTrabajoType | null> {
    try {
      const result = await executeGraphQL<{ obtenerOfertaTrabajoPorId: OfertaTrabajoType }>(
        OfertaQueries.GET_OFERTA_TRABAJO_POR_ID,
        { id },
        "obtenerOfertaTrabajoPorId"
      );
      return result?.obtenerOfertaTrabajoPorId || null;
    } catch (error) {
      console.error("Error fetching oferta trabajo:", error);
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
      const result = await executeGraphQL<{ crearOfertaTrabajo: OfertaTrabajoType }>(
        OfertaMutations.CREAR_OFERTA_TRABAJO,
        data,
        "crearOfertaTrabajo"
      );
      if (!result?.crearOfertaTrabajo) throw new Error("Error creating oferta");
      return result.crearOfertaTrabajo;
    } catch (error) {
      console.error("Error creating oferta trabajo:", error);
      throw error;
    }
  },

  async eliminarOfertaTrabajo(id: string): Promise<boolean> {
    try {
      const result = await executeGraphQL<{ eliminarOfertaTrabajo: boolean }>(
        OfertaMutations.ELIMINAR_OFERTA_TRABAJO,
        { id },
        "eliminarOfertaTrabajo"
      );
      return result?.eliminarOfertaTrabajo || false;
    } catch (error) {
      console.error("Error deleting oferta trabajo:", error);
      throw error;
    }
  },
};
