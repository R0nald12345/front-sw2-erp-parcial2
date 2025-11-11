import { useState, useEffect } from "react";
import { executeQuery } from "@/src/service/graphql.service";

export const ANALYZE_CLUSTERS_QUERY = `
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

export const GET_CANDIDATES_QUERY = `
  query GetCandidatesInCluster($clusterId: Int!, $limit: Int, $includeDetails: Boolean) {
    getCandidatesInCluster(input: { clusterId: $clusterId, algorithm: "kmeans", limit: $limit, includeDetails: $includeDetails }) {
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

interface ClusterData {
  totalCandidates: number;
  clustersFound: number;
  outliersDetected: number;
  algorithmUsed: string;
  trainingDate: string;
  metrics: {
    silhouetteScore: number;
    calinskiHarabaszScore: number;
    daviesBouldinScore: number;
    nClusters: number;
    algorithmUsed: string;
  };
  clusterProfiles: Array<{
    clusterId: number;
    size: number;
    percentage: number;
    description: string;
    topCharacteristics: string[];
    summary: string;
  }>;
}

interface UseClusteringDataResult {
  data: ClusterData | null;
  loading: boolean;
  error: Error | null;
}

export const useClusteringData = (): UseClusteringDataResult => {
  const [data, setData] = useState<ClusterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await executeQuery(ANALYZE_CLUSTERS_QUERY);
        setData((result as { analyzeCandidateClusters: ClusterData }).analyzeCandidateClusters);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

interface CandidateInCluster {
  candidateId: string;
  name: string;
  email: string;
  yearsExperience: number;
  educationArea: string;
  workArea: string;
  skills: string[];
  certifications: string[];
  englishLevel: string;
  distanceToCenter: number;
}

interface CandidatesInClusterData {
  clusterId: number;
  totalCandidates: number;
  clusterPercentage: number;
  candidates: CandidateInCluster[];
}

interface UseCandidatesInClusterResult {
  data: CandidatesInClusterData | null;
  loading: boolean;
  error: Error | null;
}

export const useCandidatesInCluster = (clusterId: number, limit: number = 50): UseCandidatesInClusterResult => {
  const [data, setData] = useState<CandidatesInClusterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await executeQuery(GET_CANDIDATES_QUERY, {
          clusterId,
          limit,
          includeDetails: true,
        });
        setData((result as { getCandidatesInCluster: CandidatesInClusterData }).getCandidatesInCluster);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clusterId, limit]);

  return { data, loading, error };
};
