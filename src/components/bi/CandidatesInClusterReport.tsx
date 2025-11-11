import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CANDIDATES_IN_CLUSTER_QUERY } from '@/graphql/queries';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

interface CandidatesInClusterData {
  clusterId: number;
  totalCandidates: number;
  clusterPercentage: number;
  candidates: Candidate[];
}

interface CandidatesInClusterReportProps {
  clusterId: number;
  onBack?: () => void;
}

export const CandidatesInClusterReport: React.FC<CandidatesInClusterReportProps> = ({
  clusterId,
  onBack,
}) => {
  const [sortBy, setSortBy] = useState<'distance' | 'experience' | 'name'>('distance');
  const [filterSkill, setFilterSkill] = useState<string>('');

  const { loading, error, data } = useQuery(GET_CANDIDATES_IN_CLUSTER_QUERY, {
    variables: {
      input: {
        clusterId,
        algorithm: 'kmeans',
        includeDetails: true,
        limit: 100,
      },
    },
  });

  const clusterData = data?.getCandidatesInCluster as CandidatesInClusterData;

  // Obtener todas las habilidades únicas para filtrado
  const allSkills = useMemo(() => {
    if (!clusterData?.candidates) return [];
    const skillsSet = new Set<string>();
    clusterData.candidates.forEach((candidate) => {
      candidate.skills.forEach((skill) => skillsSet.add(skill));
    });
    return Array.from(skillsSet).sort();
  }, [clusterData]);

  // Procesar y ordenar datos
  const processedCandidates = useMemo(() => {
    if (!clusterData?.candidates) return [];

    let filtered = clusterData.candidates;

    // Filtrar por habilidad si está seleccionada
    if (filterSkill) {
      filtered = filtered.filter((candidate) =>
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(filterSkill.toLowerCase())
        )
      );
    }

    // Ordenar
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'distance') {
        return a.distanceToCenter - b.distanceToCenter;
      } else if (sortBy === 'experience') {
        return b.yearsExperience - a.yearsExperience;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    return sorted;
  }, [clusterData, sortBy, filterSkill]);

  const exportToCSV = () => {
    if (!clusterData?.candidates) return;

    const headers = [
      'Nombre',
      'Email',
      'Años Experiencia',
      'Área Educación',
      'Habilidades',
      'Certificaciones',
      'Nivel Inglés',
      'Distancia al Centro',
    ];

    const rows = clusterData.candidates.map((candidate) => [
      candidate.name,
      candidate.email,
      candidate.yearsExperience,
      candidate.educationArea,
      candidate.skills.join('; '),
      candidate.certifications.join('; '),
      candidate.englishLevel,
      candidate.distanceToCenter.toFixed(2),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) =>
        row
          .map((cell) => {
            if (typeof cell === 'string' && cell.includes(',')) {
              return `"${cell}"`;
            }
            return cell;
          })
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cluster-${clusterId}-candidatos.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-gray-200 rounded-lg animate-pulse" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="pt-6">
          <p className="text-red-800">Error al cargar candidatos: {error.message}</p>
          {onBack && (
            <Button onClick={onBack} variant="outline" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  if (!clusterData) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-gray-500">No hay datos disponibles</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          {onBack && (
            <Button onClick={onBack} variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Análisis
            </Button>
          )}
          <h2 className="text-3xl font-bold text-gray-900">
            Cluster {clusterData.clusterId}
          </h2>
          <p className="text-gray-600 mt-1">
            Candidatos del cluster {clusterData.clusterId}
          </p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
        </Button>
      </div>

      {/* Tarjeta de resumen */}
      <Card className="bg-linear-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 font-medium">Total Candidatos</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {clusterData.totalCandidates}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 font-medium">Porcentaje del Total</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {clusterData.clusterPercentage.toFixed(2)}%
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 font-medium">Mostrados</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {processedCandidates.length}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 font-medium">Exp. Promedio</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {(
                  processedCandidates.reduce((sum, c) => sum + c.yearsExperience, 0) /
                  processedCandidates.length
                ).toFixed(1)}{' '}
                años
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros y controles */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Filtros y Opciones</CardTitle>
              <CardDescription>Personaliza la vista de candidatos</CardDescription>
            </div>
            {filterSkill && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilterSkill('')}
              >
                Limpiar Filtros
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ordenar */}
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="distance">Distancia al Centro (Ascendente)</option>
                <option value="experience">Años de Experiencia (Mayor a Menor)</option>
                <option value="name">Nombre (A-Z)</option>
              </select>
            </div>

            {/* Filtrar por habilidad */}
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">
                Filtrar por Habilidad
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <Filter className="w-4 h-4 mr-2" />
                    {filterSkill ? `Filtrando: ${filterSkill}` : 'Seleccionar Habilidad'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-h-64 overflow-y-auto">
                  {allSkills.map((skill) => (
                    <DropdownMenuItem
                      key={skill}
                      onClick={() => setFilterSkill(skill)}
                      className={filterSkill === skill ? 'bg-blue-50' : ''}
                    >
                      {skill}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de candidatos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Candidatos</CardTitle>
          <CardDescription>
            {processedCandidates.length} de {clusterData.totalCandidates} candidatos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-bold">Nombre</TableHead>
                  <TableHead className="font-bold">Email</TableHead>
                  <TableHead className="text-center font-bold">Exp</TableHead>
                  <TableHead className="font-bold">Área Educación</TableHead>
                  <TableHead className="font-bold">Habilidades</TableHead>
                  <TableHead className="text-right font-bold">Distancia</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedCandidates.length > 0 ? (
                  processedCandidates.map((candidate, index) => (
                    <TableRow
                      key={candidate.candidateId}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <TableCell className="font-medium text-gray-900">
                        {candidate.name}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {candidate.email}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">
                          {candidate.yearsExperience}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {candidate.educationArea}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 2).map((skill, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{candidate.skills.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-sm font-medium text-gray-900">
                          {candidate.distanceToCenter.toFixed(2)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No hay candidatos que coincidan con los filtros
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detalles expandibles */}
      {processedCandidates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top 3 Candidatos Más Cercanos al Centro</CardTitle>
            <CardDescription>
              Candidatos con menor distancia al centro del cluster
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processedCandidates.slice(0, 3).map((candidate, index) => (
                <div key={candidate.candidateId} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{index + 1}. {candidate.name}</h4>
                      <p className="text-sm text-gray-600">{candidate.email}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Distancia: {candidate.distanceToCenter.toFixed(2)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Experiencia</p>
                      <p className="font-semibold text-gray-900">{candidate.yearsExperience} años</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Educación</p>
                      <p className="font-semibold text-gray-900 text-sm">{candidate.educationArea}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Inglés</p>
                      <p className="font-semibold text-gray-900 text-sm">{candidate.englishLevel.split(',')[0]}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Habilidades</p>
                      <p className="font-semibold text-gray-900">{candidate.skills.length} skills</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-2">Habilidades Principales</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.slice(0, 4).map((skill, i) => (
                        <Badge key={i} className="bg-blue-100 text-blue-800">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 4 && (
                        <Badge className="bg-gray-100 text-gray-800">
                          +{candidate.skills.length - 4} más
                        </Badge>
                      )}
                    </div>
                  </div>

                  {candidate.certifications.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-gray-600 font-medium mb-2">
                        Certificaciones ({candidate.certifications.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.certifications.slice(0, 3).map((cert, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                        {candidate.certifications.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{candidate.certifications.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
