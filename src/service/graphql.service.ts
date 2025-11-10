import { graphqlClient } from './api.client';

// Cache para queries GraphQL
const queryCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const invalidateGraphQLCache = (key?: string) => {
  if (key) {
    queryCache.delete(key);
  } else {
    queryCache.clear();
  }
};

/**
 * Ejecuta una query/mutation GraphQL contra el gateway
 * @param query - String de la query GraphQL
 * @param variables - Variables para la query
 * @param operationName - Nombre de la operación (empresas, createEmpresa, etc)
 * @param isQuery - true si es query, false si es mutation
 */
async function executeGraphQL<T>(
  query: string,
  variables: Record<string, any> = {},
  operationName: string = '',
  isQuery: boolean = true
): Promise<T> {
  try {
    const cacheKey = `${operationName}-${JSON.stringify(variables)}`;

    // Verificar cache si es query
    if (isQuery && queryCache.has(cacheKey)) {
      const cached = queryCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log(`📦 Cache hit for ${operationName}`);
        return cached.data;
      }
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`📡 Executing GraphQL ${isQuery ? 'Query' : 'Mutation'}: ${operationName}`);
    console.log(`${'='.repeat(50)}`);
    console.log(`📝 Query:\n${query.substring(0, 200)}${query.length > 200 ? '...' : ''}`);
    console.log(`📋 Variables:`, variables);

    // IMPORTANTE: Usar '' como URL porque la baseURL ya tiene el endpoint
    const response = await graphqlClient.post('', {
      query,
      variables,
      operationName,
    });

    if (response.data?.errors) {
      console.error('❌ GraphQL Errors:', response.data.errors);
      throw new Error(response.data.errors[0].message);
    }

    const result = response.data?.data as T;

    console.log(`✅ GraphQL Response for ${operationName}:`, result);

    // Cachear si es query
    if (isQuery && result) {
      queryCache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
      });
    }

    return result;
  } catch (error) {
    console.error(`\n❌ GraphQL Error in ${operationName}:`);
    console.error(error);
    throw error;
  }
}

export default executeGraphQL;