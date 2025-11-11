export const PREDICTION_COMPATIBILITY_POSTULATION = `
  query predictCustomCompatibility($limit: Int) {
    postulaciones() {
   input: {
      candidateData: {
        aniosExperiencia: 
        nivelEducacion: ""
        habilidades: "React, Node.js, JavaScript, TypeScript, MongoDB, Express, Git, AWS"
        idiomas: "Español (Nativo), Inglés (Avanzado)"
        certificaciones: "AWS Certified Developer, React Professional Certificate"
        puestoActual: "Full Stack Developer en TechCorp"
      }
      offerData: {
        titulo: "Desarrollador Full Stack Senior"
        salario: 9500.00
        ubicacion: "Santa Cruz de la Sierra"
        requisitos: "Licenciatura en Ingeniería de Sistemas, 5+ años experiencia Full Stack"
      }
    }
  ) {
    probabilityPercentage
    compatibilityLevel
    recommendation
    summary
    strengths
    suggestions
  }
  }
`;
