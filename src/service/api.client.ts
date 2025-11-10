import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { Observable } from '@apollo/client';

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://jellyfish-app-lj4xj.ondigitalocean.app/graphql';

console.log(`🎯 Apollo Client Configuration:`);
console.log(`   GraphQL URL: ${GRAPHQL_URL}`);

// En desarrollo, ejecutar diagnóstico en el cliente
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Importar dinámicamente para evitar problemas de SSR
  import('@/src/utils/diagnostics').then(({ runFullDiagnostics }) => {
    // Ejecutar después de que la página cargue
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runFullDiagnostics);
    } else {
      setTimeout(runFullDiagnostics, 1000);
    }
  });
}

// Link personalizado para logging
const loggingLink = new ApolloLink((operation, forward) => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📡 GraphQL Operation: ${operation.operationName}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`📝 Query/Mutation:`, operation.query.loc?.source.body.substring(0, 200));
  console.log(`📋 Variables:`, operation.variables);

  return new Observable((observer: any) => {
    forward(operation).subscribe({
      next: (response: any) => {
        if (response.errors) {
          console.error(`❌ GraphQL Errors:`, response.errors);
          response.errors.forEach((error: any) => {
            console.error(`   - ${error.message}`);
            if (error.extensions?.code) {
              console.error(`     Code: ${error.extensions.code}`);
            }
          });
        } else {
          console.log(`✅ GraphQL Response received for ${operation.operationName}`);
          console.log(`📦 Data keys:`, Object.keys(response.data || {}));
        }
        observer.next(response);
      },
      error: (networkError: any) => {
        console.error(`\n${'='.repeat(60)}`);
        console.error(`❌ NETWORK ERROR`);
        console.error(`${'='.repeat(60)}`);
        
        if (networkError.response) {
          console.error(`   HTTP Status: ${networkError.response.status}`);
          console.error(`   Status Text: ${networkError.response.statusText}`);
        }
        
        if (networkError.message) {
          console.error(`   Message: ${networkError.message}`);
        }
        
        console.error(`\n💡 Debugging tips:`);
        console.error(`   1. Check if gateway is running`);
        console.error(`   2. Verify GRAPHQL_URL in .env`);
        console.error(`   3. Check browser Network tab in DevTools`);
        console.error(`   4. Look for CORS errors`);
        console.error(`${'='.repeat(60)}\n`);
        
        observer.error(networkError);
      },
      complete: () => observer.complete(),
    });
  });
});

// HTTP Link
const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  credentials: 'omit', // FIXED: Changed from 'include' to 'omit' - gateway uses wildcard CORS
  fetchOptions: {
    method: 'POST',
  },
  // Mejorado: mejor manejo de errores HTTP
  fetch: async (uri, options) => {
    try {
      console.log(`🔗 Fetching: ${uri}`);
      const response = await fetch(uri, options);
      
      if (!response.ok) {
        console.error(`❌ HTTP Error ${response.status}: ${response.statusText}`);
        console.error(`   URL: ${uri}`);
      }
      
      return response;
    } catch (error) {
      console.error(`❌ Network Error:`, error);
      console.error(`   URL: ${uri}`);
      console.error(`   This usually means:`);
      console.error(`   1. Gateway is not running`);
      console.error(`   2. CORS is not configured`);
      console.error(`   3. Network/DNS issue`);
      throw error;
    }
  },
});

// Cliente Apollo
export const apolloClient = new ApolloClient({
  link: loggingLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          empresas: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          ofertasTrabajo: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          postulaciones: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          entrevistas: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          evaluaciones: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;