// GraphQL Queries - Index
// Este archivo exporta todas las queries disponibles

// BI Queries
export * from './bi';

// Clustering Queries
export * from './clustering';

// ERP Queries
export * from './erp';

// ML Queries
export * from './ml';

// Queries por defecto (para compatibilidad)
export const GET_CANDIDATES_IN_CLUSTER_QUERY = `
  query GetCandidatesInCluster($clusterId: String!) {
    candidatesInCluster(clusterId: $clusterId) {
      candidateId
      name
      email
      yearsExperience
      educationArea
      workArea
      skills
      certifications
    }
  }
`;

export const GET_ALL_CLUSTERS_QUERY = `
  query GetAllClusters {
    clusters {
      clusterId
      name
      description
      candidatesCount
      status
    }
  }
`;

export const GET_CLUSTER_ANALYSIS_QUERY = `
  query GetClusterAnalysis($clusterId: String!) {
    clusterAnalysis(clusterId: $clusterId) {
      clusterId
      name
      totalCandidates
      averageExperience
      skillsDistribution
      educationAreas
    }
  }
`;
