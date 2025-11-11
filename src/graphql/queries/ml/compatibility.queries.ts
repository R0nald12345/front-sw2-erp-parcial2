export const PREDICT_CUSTOM_COMPATIBILITY = `
  query predictCustomCompatibility(
    $aniosExperiencia: Int!
    $nivelEducacion: String!
    $habilidades: String!
    $idiomas: String!
    $certificaciones: String
    $puestoActual: String!
    $titulo: String!
    $salario: Float!
    $ubicacion: String!
    $requisitos: String!
  ) {
    predictCustomCompatibility(
      input: {
        candidateData: {
          aniosExperiencia: $aniosExperiencia
          nivelEducacion: $nivelEducacion
          habilidades: $habilidades
          idiomas: $idiomas
          certificaciones: $certificaciones
          puestoActual: $puestoActual
        }
        offerData: {
          titulo: $titulo
          salario: $salario
          ubicacion: $ubicacion
          requisitos: $requisitos
        }
      }
    ) {
      probabilityPercentage
      compatibilityLevel
      recommendation
      summary
      strengths
      weaknesses
      suggestions
    }
  }
`;
