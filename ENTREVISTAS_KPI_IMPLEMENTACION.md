# 🎯 KPI de Entrevistas - Implementación Completa

## 📋 Resumen

He creado una solución completa para visualizar y analizar KPIs de entrevistas, similar a la que ya existe para evaluaciones.

---

## 📁 Estructura Creada

### 1. **Queries GraphQL** (`kpi.queries.ts`)
Ya existían las queries de entrevistas:
- ✅ `GET_INTERVIEW_OBJECTIVES_KPI` - Obtiene una entrevista específica
- ✅ `GET_ALL_INTERVIEWS_OBJECTIVES_KPI` - Obtiene todas las entrevistas con estadísticas
- ✅ `GET_CANDIDATE_INTERVIEWS_OBJECTIVES_KPI` - Entrevistas por candidato
- ✅ `GET_INTERVIEW_OBJECTIVES_BY_COMPANY` - Entrevistas por empresa
- ✅ `GET_ALL_COMPANIES_INTERVIEW_OBJECTIVES` - Todas las empresas

### 2. **Servicio BI** (`kpi.service.ts`)
Agregué 5 métodos nuevos para consumir los queries:
```typescript
// Métodos para entrevistas
- getAllInterviewsKPI() ✅
- getInterviewKPI(interviewId) ✅
- getInterviewsByCandidate(candidateName) ✅
- getInterviewsByCompany(empresaId) ✅
- getAllCompaniesInterviews() ✅
```

### 3. **Componente** (`EntrevistasKPI.tsx`)
Ubicación: `/src/components/entrevistas-kpi/EntrevistasKPI.tsx`

**Características:**
- 📊 **Cards de estadísticas**:
  - Total de entrevistas
  - Cobertura promedio de objetivos
  - Entrevistas con cobertura excelente

- 📈 **Gráficos**:
  - Cobertura promedio (Bar Chart)
  - Distribución de cobertura (Bar Chart)
  - Perfil de cobertura individual (Radar Chart)

- 🔍 **Funcionalidades**:
  - Lista filtrable de entrevistas
  - Panel de detalle con información completa
  - Búsqueda por candidato o entrevistador
  - Validación de errores y loading states

### 4. **Página Dashboard** 
Ubicación: `/src/app/dashboard/entrevistas-kpi/page.tsx`

---

## 🚀 Cómo Usar

### Acceder a la página:
```
http://localhost:3000/dashboard/entrevistas-kpi
```

### Desde el código:
```typescript
import { kpiService } from '@/src/service/microservices/bi/kpi.service';

// Obtener todas las entrevistas KPI
const data = await kpiService.getAllInterviewsKPI();

// Obtener una entrevista específica
const entrevista = await kpiService.getInterviewKPI('interview-001');

// Obtener entrevistas por candidato
const candidato = await kpiService.getInterviewsByCandidate('Juan Pérez');

// Obtener entrevistas por empresa
const empresa = await kpiService.getInterviewsByCompany('empresa-123');
```

---

## 📊 Datos Disponibles

### AllInterviewsKPI retorna:
```typescript
{
  totalInterviews: number;
  averageCoverage: number;        // Porcentaje promedio
  excellentCoverage: number;      // Cantidad > 80%
  acceptableCoverage: number;     // Cantidad 60-80%
  poorCoverage: number;           // Cantidad < 60%
  interviewStats: [
    {
      interviewId: string;
      candidateName: string;
      interviewer: string;
      interviewDate: string;
      totalObjectives: number;
      coveredObjectives: number;
      objectiveCoveragePercentage: number;
      interpretation: string;
    }
  ]
}
```

---

## 🎨 Interfaz Visual

**Lado Izquierdo:**
- Lista de entrevistas con búsqueda en tiempo real
- Badges de nivel de cobertura (Excelente, Buena, Aceptable, Pobre)
- Selección interactiva

**Lado Derecho:**
- Información detallada de la entrevista seleccionada
- 3 tarjetas con:
  - Objetivos totales
  - Objetivos cubiertos
  - Porcentaje de cobertura
- Gráfico radar visualizando la cobertura
- Interpretación textual del nivel

---

## ✅ Validaciones

- ✅ Manejo de tipos nullable
- ✅ Manejo de errores
- ✅ Loading states
- ✅ Sin datos vacíos
- ✅ Búsqueda inteligente
- ✅ Colores dinámicos según nivel de cobertura

---

## 🔗 Comparación con Evaluaciones

| Aspecto | Evaluaciones | Entrevistas |
|---------|--------------|------------|
| Métrica | Calificaciones (Técnica, Actitud, General) | Cobertura de Objetivos (%) |
| Rango | 0-5 puntos | 0-100% |
| Niveles | Excelente, Buena, Aceptable, Pobre | Excelente (≥80%), Buena (60-80%), Aceptable (40-60%), Pobre (<40%) |
| Gráficos | Bar, Radar | Bar, Radar |
| Ubicación | `/dashboard/evaluaciones-kpi` | `/dashboard/entrevistas-kpi` |

---

## 📝 Notas Técnicas

- Usa el mismo patrón de servicios que evaluaciones
- Reutiliza componentes de recharts
- Estilos inline para máxima portabilidad
- TypeScript strict mode completo
- Sin dependencias externas adicionales

---

## 🎯 Próximos Pasos (Opcionales)

1. Agregar exportación a PDF/Excel
2. Agregar filtros avanzados (por período, entrevistador, etc.)
3. Agregar comparativa entre entrevistas
4. Agregar historial de cambios
5. Integrar con dashboard principal

