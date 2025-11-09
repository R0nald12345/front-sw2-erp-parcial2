export const API_CONFIG = {
  GATEWAY: process.env.NEXT_PUBLIC_API_GATEWAY || 'http://localhost:4000',
  GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
  
  MICROSERVICES: {
    ERP: {
      BASE_URL: process.env.NEXT_PUBLIC_ERP_SERVICE || 'http://localhost:8080',
      GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
      API_PATH: '/api',
    },
    BI: {
      BASE_URL: process.env.NEXT_PUBLIC_BI_SERVICE || 'http://localhost:8001',
      GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
      API_PATH: '',
    },
    ML: {
      BASE_URL: process.env.NEXT_PUBLIC_ML_SERVICE || 'http://localhost:3001',
      GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
      API_PATH: '/api',
    }
  }
};

export const SERVICES = {
  ERP: 'ERP',
  BI: 'BI',
  ML: 'ML'
} as const;