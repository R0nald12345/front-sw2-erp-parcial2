import { graphqlClient } from './api.client';
import { API_CONFIG } from '@/src/constants/api.constants';

interface GraphQLError {
  message: string;
  extensions?: {
    code?: string;
  };
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

// Cache simple para queries (opcional)
const queryCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

/**
 * Ejecuta una query o mutation de GraphQL
 * @param query - Query o mutation en formato string
 * @param variables - Variables de la query
 * @param operationName - Nombre de la operación (opcional)
 * @param useCache - Usar cache para queries (default: false)
 * @returns Datos de la respuesta
 */
async function executeGraphQL<T>(
  query: string,
  variables?: Record<string, any>,
  operationName?: string,
  useCache: boolean = false
): Promise<T | null> {
  // Generar clave de cache
  const cacheKey = `${operationName}:${JSON.stringify(variables || {})}`;

  // Verificar cache
  if (useCache && queryCache.has(cacheKey)) {
    const cached = queryCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log(`📦 Cache hit for [${operationName}]`);
      return cached.data as T;
    }
    queryCache.delete(cacheKey);
  }

  try {
    console.log(`🚀 Executing GraphQL operation [${operationName}]`);

    const response = await graphqlClient.post<GraphQLResponse<T>>(
      API_CONFIG.GRAPHQL_ENDPOINT,
      {
        query,
        variables,
        operationName,
      }
    );

    // Verificar si hay errores en la respuesta
    if (response.data.errors && response.data.errors.length > 0) {
      const errorMessage = response.data.errors
        .map(error => error.message)
        .join(', ');
      
      console.error(`❌ GraphQL Error [${operationName}]:`, errorMessage);
      throw new Error(`GraphQL Error: ${errorMessage}`);
    }

    const data = response.data.data || null;

    // Guardar en cache si es una query
    if (useCache && query.trim().startsWith('query')) {
      queryCache.set(cacheKey, { data, timestamp: Date.now() });
      console.log(`💾 Cached [${operationName}]`);
    }

    console.log(`✅ GraphQL operation [${operationName}] completed successfully`);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error executing GraphQL operation [${operationName}]:`, error.message);
      throw error;
    }
    
    console.error('Unknown error executing GraphQL operation:', error);
    throw new Error('Unknown GraphQL error');
  }
}

/**
 * Limpia el cache
 */
export function clearGraphQLCache(): void {
  queryCache.clear();
  console.log('📦 GraphQL cache cleared');
}

/**
 * Invalida una entrada específica del cache
 */
export function invalidateGraphQLCache(operationName: string): void {
  const keysToDelete = Array.from(queryCache.keys()).filter(key =>
    key.startsWith(operationName)
  );
  keysToDelete.forEach(key => queryCache.delete(key));
  console.log(`📦 Cache invalidated for [${operationName}]`);
}

export default executeGraphQL;