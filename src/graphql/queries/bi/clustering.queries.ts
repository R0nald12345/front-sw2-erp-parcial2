import { gql } from '@apollo/client';

// Query para obtener el análisis de todos los clusters
export const ANALYZE_CLUSTERS_QUERY = gql`
  query analyzeCandidateClusters(
    $input: ClusteringQueryInput
  ) {
    analyzeCandidateClusters(input: $input) {
      totalCandidates
      clustersFound
      outliersDetected
      algorithmUsed
      trainingDate
      metrics {
        silhouetteScore
        calinskiHarabaszScore
        daviesBouldinScore
        nClusters
        algorithmUsed
      }
      clusterProfiles {
        clusterId
        size
        percentage
        description
        topCharacteristics
        summary
      }
    }
  }
`;

// Query para obtener candidatos de un cluster específico
export const GET_CANDIDATES_IN_CLUSTER_QUERY = gql`
  query getCandidatesInCluster($input: GetCandidatesInClusterInput!) {
    getCandidatesInCluster(input: $input) {
      clusterId
      totalCandidates
      clusterPercentage
      candidates {
        candidateId
        name
        email
        yearsExperience
        educationArea
        workArea
        skills
        certifications
        englishLevel
        distanceToCenter
      }
    }
  }
`;
