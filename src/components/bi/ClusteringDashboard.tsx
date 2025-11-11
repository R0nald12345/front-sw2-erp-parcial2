import React, { useState } from 'react';
import { ClusterAnalysisReport } from './ClusterAnalysisReport';
import { CandidatesInClusterReport } from './CandidatesInClusterReport';

type ViewMode = 'clusters' | 'candidates';

interface ClusteringDashboardProps {
  title?: string;
}

export const ClusteringDashboard: React.FC<ClusteringDashboardProps> = ({
  title = 'Dashboard de Clustering de Candidatos',
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('clusters');
  const [selectedClusterId, setSelectedClusterId] = useState<number | null>(null);

  const handleClusterSelect = (clusterId: number) => {
    setSelectedClusterId(clusterId);
    setViewMode('candidates');
  };

  const handleBack = () => {
    setViewMode('clusters');
    setSelectedClusterId(null);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-2">
            {viewMode === 'clusters'
              ? 'Vista general de todos los clusters de candidatos'
              : `Detalles del Cluster ${selectedClusterId}`}
          </p>
        </div>

        {/* Contenido principal */}
        {viewMode === 'clusters' ? (
          <ClusterAnalysisReport onClusterSelect={handleClusterSelect} />
        ) : selectedClusterId !== null ? (
          <CandidatesInClusterReport 
            clusterId={selectedClusterId}
            onBack={handleBack}
          />
        ) : null}
      </div>
    </div>
  );
};
