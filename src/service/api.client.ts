import axios from 'axios';
import { API_CONFIG } from '../constants/api.constants';

// Instancia de Axios para API REST Gateway
export const apiClient = axios.create({
  baseURL: API_CONFIG.GATEWAY,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Instancia específica para GraphQL Gateway
export const graphqlClient = axios.create({
  baseURL: API_CONFIG.GRAPHQL_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Instancias específicas por microservicio
export const microserviceClients = {
  rrhh: axios.create({
    baseURL: API_CONFIG.MICROSERVICES.RRHH.BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  }),
  bi: axios.create({
    baseURL: API_CONFIG.MICROSERVICES.BI.BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  }),
  erp: axios.create({
    baseURL: API_CONFIG.MICROSERVICES.ERP.BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  }),
  ai: axios.create({
    baseURL: API_CONFIG.MICROSERVICES.AI.BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  }),
};

// Interceptor global para agregar token
const setupInterceptors = (client: any) => {
  client.interceptors.request.use((config: any) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  client.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );
};

// Aplicar interceptores a todos los clientes
setupInterceptors(apiClient);
setupInterceptors(graphqlClient);
Object.values(microserviceClients).forEach(setupInterceptors);

export default apiClient;