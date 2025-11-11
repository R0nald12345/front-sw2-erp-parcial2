"use client";

import React, { useState } from "react";
import { useCandidatesInCluster } from "@/src/hooks/bi/useClustering";
import { FiX, FiDownload, FiMail, FiBook, FiMessageSquare } from "react-icons/fi";
import { Loader } from "lucide-react";

interface ClusterProfile {
  clusterId: number;
  size: number;
  percentage: number;
  description: string;
  topCharacteristics: string[];
  summary: string;
}

interface Candidate {
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

interface CandidatesModalProps {
  cluster: ClusterProfile;
  isOpen: boolean;
  onClose: () => void;
}

export default function CandidatesModal({ cluster, isOpen, onClose }: CandidatesModalProps) {
  const [expandedCandidateId, setExpandedCandidateId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "experience" | "distance">("name");

  const { data, loading, error } = useCandidatesInCluster(cluster.clusterId, 50);

  if (!isOpen) return null;

  const candidates: Candidate[] = data?.candidates || [];

  const sortedCandidates = [...candidates].sort((a, b) => {
    switch (sortBy) {
      case "experience":
        return b.yearsExperience - a.yearsExperience;
      case "distance":
        return a.distanceToCenter - b.distanceToCenter;
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleDownload = () => {
    const csv = generateCSV(sortedCandidates);
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csv));
    element.setAttribute("download", `cluster-${cluster.clusterId}-candidates.csv`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateCSV = (data: Candidate[]) => {
    const headers = [
      "Nombre",
      "Email",
      "Años Experiencia",
      "Educación",
      "Área Trabajo",
      "Habilidades",
      "Certificaciones",
      "Nivel Inglés",
    ];
    const rows = data.map((c) => [
      c.name,
      c.email,
      c.yearsExperience,
      c.educationArea,
      c.workArea,
      c.skills.join("; "),
      c.certifications.join("; "),
      c.englishLevel,
    ]);

    const csv = [headers, ...rows].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n");
    return csv;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full animate-in fade-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-1">Cluster {cluster.clusterId}</h2>
                <p className="text-blue-100">
                  {loading ? "Cargando candidatos..." : `${sortedCandidates.length} candidatos identificados`}
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-white/20 hover:bg-white/30 text-white rounded-lg p-2 transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <Loader className="w-8 h-8 animate-spin text-blue-600" />
                  <p className="text-gray-600 font-semibold">Cargando candidatos del cluster...</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-red-800 font-bold mb-2">Error al cargar candidatos</h3>
                <p className="text-red-700 text-sm">{error.message}</p>
              </div>
            ) : (
              <>
                {/* Controls */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1 block">Ordenar por:</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as "name" | "experience" | "distance")}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="name">Nombre (A-Z)</option>
                        <option value="experience">Experiencia (Mayor)</option>
                        <option value="distance">Distancia al Centro</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FiDownload className="w-4 h-4" />
                    Descargar CSV
                  </button>
                </div>

                {/* Candidates List */}
                <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                  {sortedCandidates.map((candidate) => (
                    <div
                      key={candidate.candidateId}
                      className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden"
                    >
                      {/* Summary */}
                      <button
                        onClick={() =>
                          setExpandedCandidateId(
                            expandedCandidateId === candidate.candidateId ? null : candidate.candidateId
                          )
                        }
                        className="w-full p-4 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{candidate.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <FiBook className="w-4 h-4" />
                                {candidate.yearsExperience} años
                              </div>
                              <div>{candidate.educationArea}</div>
                              <div className="text-blue-600 font-semibold">
                                {candidate.distanceToCenter.toFixed(2)}u
                              </div>
                            </div>
                          </div>
                          <div
                            className={`text-gray-400 transition-transform ${
                              expandedCandidateId === candidate.candidateId ? "rotate-180" : ""
                            }`}
                          >
                            ▼
                          </div>
                        </div>
                      </button>

                      {/* Details */}
                      {expandedCandidateId === candidate.candidateId && (
                        <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-4">
                          {/* Contact */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-semibold text-gray-600 mb-1 uppercase">Email</p>
                              <a
                                href={`mailto:${candidate.email}`}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                              >
                                <FiMail className="w-4 h-4" />
                                {candidate.email}
                              </a>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-600 mb-1 uppercase">Nivel de Inglés</p>
                              <p className="text-sm text-gray-700">{candidate.englishLevel}</p>
                            </div>
                          </div>

                          {/* Work Info */}
                          <div>
                            <p className="text-xs font-semibold text-gray-600 mb-2 uppercase">Área de Trabajo</p>
                            <p className="text-sm text-gray-700 bg-white p-2 rounded">
                              {candidate.workArea || "No especificada"}
                            </p>
                          </div>

                          {/* Skills */}
                          <div>
                            <p className="text-xs font-semibold text-gray-600 mb-2 uppercase">
                              Habilidades ({candidate.skills.length})
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {candidate.skills.map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Certifications */}
                          <div>
                            <p className="text-xs font-semibold text-gray-600 mb-2 uppercase">
                              Certificaciones ({candidate.certifications.length})
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {candidate.certifications.map((cert, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full"
                                >
                                  {cert}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 pt-4 border-t border-gray-200">
                            <button className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors text-sm font-semibold">
                              <FiMessageSquare className="w-4 h-4" />
                              Contactar
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg transition-colors text-sm font-semibold">
                              Ver Perfil
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
