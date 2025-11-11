"use client";

import React, { useState } from "react";
import { useClusteringData } from "@/src/hooks/bi/useClustering";
import ClusterGrid from "./ClusterGrid";
import CandidatesModal from "./CandidatesModal";
import { Loader } from "lucide-react";

interface ClusterProfile {
  clusterId: number;
  size: number;
  percentage: number;
  description: string;
  topCharacteristics: string[];
  summary: string;
}

export default function ClusteringReport() {
  const [selectedCluster, setSelectedCluster] = useState<ClusterProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, error } = useClusteringData();

  const handleClusterClick = (cluster: ClusterProfile) => {
    setSelectedCluster(cluster);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCluster(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600 font-semibold">Cargando clusters...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-bold mb-2">Error al cargar los clusters</h2>
          <p className="text-red-700 text-sm">{error instanceof Error ? error.message : String(error)}</p>
        </div>
      </div>
    );
  }

  const clusterData = data;

  if (!clusterData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No hay datos de clusters disponibles</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Análisis de Clusters</h1>
            <p className="text-gray-600">
              Visualiza los {clusterData.clustersFound} clusters de candidatos identificados mediante análisis de
              machine learning
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-blue-600 font-semibold text-sm mb-2">Total de Candidatos</div>
            <div className="text-3xl font-bold text-gray-900">{clusterData.totalCandidates.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-2">Candidatos analizados</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-purple-600 font-semibold text-sm mb-2">Clusters Encontrados</div>
            <div className="text-3xl font-bold text-gray-900">{clusterData.clustersFound}</div>
            <div className="text-xs text-gray-500 mt-2">Grupos de similitud</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-green-600 font-semibold text-sm mb-2">Silhouette Score</div>
            <div className="text-3xl font-bold text-gray-900">
              {(clusterData.metrics.silhouetteScore * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500 mt-2">Calidad de clustering</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-orange-600 font-semibold text-sm mb-2">Algoritmo</div>
            <div className="text-2xl font-bold text-gray-900 capitalize">{clusterData.algorithmUsed}</div>
            <div className="text-xs text-gray-500 mt-2">K-Means Clustering</div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent mb-10"></div>
      </div>

      {/* Clusters Grid */}
      <div className="max-w-7xl mx-auto">
        <ClusterGrid clusters={clusterData.clusterProfiles} onClusterClick={handleClusterClick} />
      </div>

      {/* Candidates Modal */}
      {selectedCluster && <CandidatesModal cluster={selectedCluster} isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
}
