export interface CompatibilityResponse {
  probabilityPercentage: string;
  compatibilityLevel: string;
  recommendation: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface PredictCustomCompatibilityData {
  predictCustomCompatibility: CompatibilityResponse;
}
