"use client";

import React from "react";
import { FiTrendingUp, FiUsers } from "react-icons/fi";

interface ClusterProfile {
  clusterId: number;
  size: number;
  percentage: number;
  description: string;
  topCharacteristics: string[];
  summary: string;
}

interface ClusterGridProps {
  clusters: ClusterProfile[];
  onClusterClick: (cluster: ClusterProfile) => void;
}

export default function ClusterGrid({ clusters, onClusterClick }: ClusterGridProps) {
  const getClusterColor = (clusterId: number) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-purple-500 to-purple-600",
      "from-pink-500 to-pink-600",
      "from-indigo-500 to-indigo-600",
      "from-cyan-500 to-cyan-600",
      "from-teal-500 to-teal-600",
      "from-emerald-500 to-emerald-600",
      "from-green-500 to-green-600",
      "from-lime-500 to-lime-600",
      "from-yellow-500 to-yellow-600",
      "from-amber-500 to-amber-600",
      "from-orange-500 to-orange-600",
      "from-red-500 to-red-600",
    ];
    return colors[clusterId % colors.length];
  };

  // Sort clusters by size (largest first)
  const sortedClusters = [...clusters].sort((a, b) => b.size - a.size);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedClusters.map((cluster) => (
        <div
          key={cluster.clusterId}
          onClick={() => onClusterClick(cluster)}
          className="group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 transform"
        >
          {/* Header with gradient */}
          <div
            className={`bg-linear-to-r ${getClusterColor(cluster.clusterId)} p-6 text-white relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">Cluster {cluster.clusterId}</h3>
                <FiTrendingUp className="w-5 h-5" />
              </div>
              <p className="text-white/90 text-sm">{cluster.description}</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <FiUsers className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-600">CANDIDATOS</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">{cluster.size}</div>
              </div>

              <div className="bg-linear-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                <div className="text-xs font-semibold text-purple-600 mb-1">PORCENTAJE</div>
                <div className="text-2xl font-bold text-purple-900">{cluster.percentage.toFixed(1)}%</div>
              </div>
            </div>

            {/* Top Characteristics */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Características principales</h4>
              <div className="space-y-2">
                {cluster.topCharacteristics.slice(0, 3).map((characteristic, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                    <span className="text-xs text-gray-600 line-clamp-2">{characteristic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-700 line-clamp-2">{cluster.summary}</p>
            </div>

            {/* Action Button */}
            <button className="w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:shadow-lg">
              Ver Candidatos ({cluster.size})
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
