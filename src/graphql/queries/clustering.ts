import { gql } from "@apollo/client";

export const ANALYZE_CANDIDATE_CLUSTERS = gql`
  query AnalyzeCandidateClusters {
    analyzeCandidateClusters(input: { algorithm: "kmeans", maxResults: 10, includeOutliers: false }) {
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

export const GET_CANDIDATES_IN_CLUSTER = gql`
  query GetCandidatesInCluster($clusterId: Int!, $limit: Int, $includeDetails: Boolean) {
    getCandidatesInCluster(
      input: { clusterId: $clusterId, algorithm: "kmeans", limit: $limit, includeDetails: $includeDetails }
    ) {
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
