// ML GraphQL Queries
// Exporta queries relacionadas con Machine Learning

export const GET_PREDICTIONS_QUERY = `
  query GetPredictions {
    predictions {
      id
      candidateId
      predictionScore
      status
    }
  }
`;

export const GET_MODEL_STATUS_QUERY = `
  query GetModelStatus {
    modelStatus {
      modelId
      name
      accuracy
      status
    }
  }
`;
