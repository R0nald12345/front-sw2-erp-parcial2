import { gql } from '@apollo/client';
import { apolloClient } from './api.client';

/**
 * Ejecuta una query GraphQL contra el gateway usando Apollo Client
 * @param query - String de la query GraphQL
 * @param variables - Variables para la query
 */
export async function executeQuery<T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  try {
    const result = await apolloClient.query({
      query: gql(query),
      variables,
    });

    return result.data as T;
  } catch (error) {
    console.error('❌ Query Error:', error);
    throw error;
  }
}

/**
 * Ejecuta una mutation GraphQL contra el gateway usando Apollo Client
 * @param mutation - String de la mutation GraphQL
 * @param variables - Variables para la mutation
 */
export async function executeMutation<T>(
  mutation: string,
  variables: Record<string, any> = {}
): Promise<T> {
  try {
    const result = await apolloClient.mutate({
      mutation: gql(mutation),
      variables,
      refetchQueries: 'active',
    });

    return result.data as T;
  } catch (error) {
    console.error('❌ Mutation Error:', error);
    throw error;
  }
}

/**
 * Valida una query GraphQL
 */
export function validateQuery(query: string): boolean {
  try {
    gql(query);
    return true;
  } catch {
    return false;
  }
}

/**
 * Invalida el cache de Apollo Client
 * @param fieldName - Nombre del campo a invalidar (opcional)
 * 
 * Con Apollo Client, el cache se gestiona automáticamente.
 * Esta función está disponible por compatibilidad con código anterior.
 */
export function invalidateGraphQLCache(fieldName?: string): void {
  try {
    apolloClient.cache.reset();
    console.log('✅ Apollo Cache invalidated' + (fieldName ? ` for field: ${fieldName}` : ''));
  } catch (error) {
    console.error('❌ Error invalidating cache:', error);
  }
}

export default { executeQuery, executeMutation, validateQuery, invalidateGraphQLCache };