import axios from 'axios';

// Configuración de URLs según el ambiente
const API_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:4000';
const API_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '/graphql';

console.log(`🔧 API Configuration:`);
console.log(`   Gateway: ${API_GATEWAY_URL}`);
console.log(`   GraphQL Endpoint: ${API_GRAPHQL_ENDPOINT}`);
console.log(`   Full URL: ${API_GATEWAY_URL}${API_GRAPHQL_ENDPOINT}`);

// Cliente axios para el gateway GraphQL
export const graphqlClient = axios.create({
  baseURL: `${API_GATEWAY_URL}${API_GRAPHQL_ENDPOINT}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Interceptor para logging de requests
graphqlClient.interceptors.request.use((config) => {
  console.log(`📤 GraphQL Request:`);
  console.log(`   URL: ${config.baseURL}${config.url || ''}`);
  console.log(`   Method: ${config.method?.toUpperCase()}`);
  return config;
});

// Interceptor para logging de responses
graphqlClient.interceptors.response.use(
  (response) => {
    console.log(`📥 GraphQL Response Status: ${response.status}`);
    if (response.data.errors) {
      console.error(`⚠️ GraphQL Errors:`, response.data.errors);
    }
    return response;
  },
  (error) => {
    console.error(`❌ GraphQL Request Error:`, error.message);
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   StatusText: ${error.response.statusText}`);
      console.error(`   URL: ${error.config?.baseURL}${error.config?.url || ''}`);
      console.error(`   Data:`, error.response.data);
    }
    return Promise.reject(error);
  }
);

export default graphqlClient;