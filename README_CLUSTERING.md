# Dashboard Frontend - Clustering & BI

Este es el frontend React/Next.js que integra visualización de datos de BI, predicciones de ML y análisis de clustering.

## 📋 Características Principales

### 🎯 Dashboard de Clustering (NUEVO!)

Visualiza y analiza clusters de candidatos:

- **Vista General**: Todos los clusters con gráficos y métricas
  - 13 clusters identificados
  - 9,907 candidatos totales
  - Gráficos interactivos (pastel, barras)
  - Métricas de calidad (Silhouette, Calinski-Harabasz, Davies-Bouldin)

- **Vista de Candidatos**: Detalles por cluster
  - Tabla filtrable y ordenable
  - Exportación a CSV
  - Top 3 candidatos más cercanos
  - Filtro por habilidades

**Acceso:** http://localhost:3000/dashboard/clustering

### 📊 KPIs de BI

- Evaluaciones de candidatos
- Tasa de conversión de ofertas
- Objetivos de entrevistas
- Análisis por empresa, entrevistador, etc.

### 🤖 Predicciones de ML

- Compatibilidad candidato-oferta
- Candidatos similares
- Análisis de clusters

## 🚀 Quick Start

### Instalación

```bash
npm install
npm run dev
```

Abre: http://localhost:3000

### Requisitos

- Node.js 18+
- npm o yarn
- Gateway corriendo en http://localhost:4000
- Service ML corriendo en http://localhost:8000 (opcional)

## 📁 Estructura

```
src/
├── app/                        # Next.js app directory
│   └── dashboard/
│       ├── clustering/         # 🎯 NUEVO: Dashboard de clustering
│       ├── empresa/
│       ├── evaluaciones/
│       ├── postulaciones/
│       └── reporte/
├── components/
│   ├── bi/                    # Componentes de BI
│   │   ├── ClusterAnalysisReport.tsx        # 🆕
│   │   ├── CandidatesInClusterReport.tsx    # 🆕
│   │   ├── ClusteringDashboard.tsx          # 🆕
│   │   ├── KpiCards.tsx
│   │   ├── CompanyConversionChart.tsx
│   │   └── ...
│   ├── dashboard/            # Layout components
│   ├── empresa/              # Empresa components
│   └── ui/                   # UI components base
├── graphql/
│   ├── queries/
│   │   ├── bi/
│   │   │   ├── clustering.queries.ts   # 🆕
│   │   │   └── kpi.queries.ts
│   │   ├── erp/
│   │   ├── ml/
│   │   └── ...
│   └── mutations/
├── hooks/
│   ├── bi/                   # Hooks para BI queries
│   ├── erp/                  # Hooks para ERP queries
│   ├── ml/                   # Hooks para ML queries
│   └── useAuth.tsx
├── lib/
│   └── utils.ts             # Utilidades
├── service/                 # Servicios API
│   ├── api.client.ts
│   ├── graphql.service.ts
│   └── ...
├── types/                   # Tipos TypeScript
└── utils/

```

## 🎯 Nuevas Características de Clustering

### Instalación (ya incluido)

Los componentes de clustering ya están listos:

```bash
# Ya están instaladas las dependencias necesarias
npm list recharts
npm list @apollo/client
npm list lucide-react
```

### Uso

#### Opción 1: Página dedicada (RECOMENDADO)

La página ya existe: `src/app/dashboard/clustering/page.tsx`

```bash
npm run dev
# Abre: http://localhost:3000/dashboard/clustering
```

#### Opción 2: Importar en tu componente

```tsx
import { ClusteringDashboard } from '@/src/components/bi';

export default function MiPagina() {
  return <ClusteringDashboard title="Análisis de Clustering" />;
}
```

#### Opción 3: Componentes individuales

```tsx
import { ClusterAnalysisReport, CandidatesInClusterReport } from '@/src/components/bi';

export function MiDashboard() {
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);
  
  return selectedCluster ? (
    <CandidatesInClusterReport clusterId={selectedCluster} />
  ) : (
    <ClusterAnalysisReport onClusterSelect={setSelectedCluster} />
  );
}
```

## 📊 Componentes Disponibles

### ClusterAnalysisReport
Muestra todos los clusters con análisis general.

**Props:**
- `onClusterSelect?: (clusterId: number) => void` - Callback al hacer click en un cluster

**Muestra:**
- Resumen con 5 métricas principales
- Gráfico de pastel (distribución %)
- Gráfico de barras (tamaño)
- Métricas de calidad del modelo
- Tarjetas expandibles de cada cluster

### CandidatesInClusterReport
Muestra candidatos de un cluster específico.

**Props:**
- `clusterId: number` - ID del cluster (requerido)
- `onBack?: () => void` - Callback del botón volver

**Muestra:**
- Resumen del cluster
- Filtros (ordenamiento, búsqueda)
- Tabla de candidatos
- Top 3 candidatos más cercanos

### ClusteringDashboard
Componente integrador que maneja la navegación.

**Props:**
- `title?: string` - Título del dashboard

**Características:**
- Navega entre vista general y candidatos
- Botón volver
- Maneja estado automáticamente

## 🔗 GraphQL Queries

### ANALYZE_CLUSTERS_QUERY

Obtiene análisis general de todos los clusters.

```graphql
query analyzeCandidateClusters($input: ClusteringQueryInput) {
  analyzeCandidateClusters(input: $input) {
    totalCandidates
    clustersFound
    metrics { ... }
    clusterProfiles { ... }
  }
}
```

### GET_CANDIDATES_IN_CLUSTER_QUERY

Obtiene candidatos de un cluster específico.

```graphql
query getCandidatesInCluster($input: GetCandidatesInClusterInput!) {
  getCandidatesInCluster(input: $input) {
    clusterId
    totalCandidates
    candidates { ... }
  }
}
```

## 🎨 Estilos

Todos los componentes usan **Tailwind CSS** con:
- Clases predefinidas
- Colores profesionales
- Responsive design
- Efectos hover y transiciones

Personalización:
```tsx
// Cambiar colores en ClusterAnalysisReport.tsx
const COLORS = [
  '#3b82f6', // azul - cambiar aquí
  '#ef4444', // rojo
  // ... más
];
```

## 📱 Responsive

- ✅ Desktop (1024px+)
- ✅ Tablet (768px-1023px)
- ✅ Mobile (< 768px)

Todos los gráficos y tablas se adaptan automáticamente.

## 🐛 Solución de Problemas

### Gateway no conecta
```bash
# Verificar que el gateway esté corriendo
cd gateway
npm start
```

### Queries no devuelven datos
```bash
# Verificar en DevTools → Network → GraphQL
# Ver si hay errores en la respuesta
```

### Componentes UI no se ven bien
```bash
# Asegúrate que Tailwind esté configurado
npm run dev
# Limpia cache si es necesario
rm -rf .next
```

## 📚 Documentación

Para más detalles, ver:

- `GUIA_DASHBOARD_CLUSTERING.md` - Guía completa
- `QUICK_START_CLUSTERING.md` - Inicio rápido (5 min)
- `VISTA_PREVIA_DASHBOARD.md` - Vista previa visual
- `EJEMPLOS_INTEGRACION_CLUSTERING.tsx` - Ejemplos de integración
- `RESUMEN_ENTREGA.md` - Resumen de entrega

## 🚀 Deploy

```bash
npm run build
npm start
```

O directamente en Vercel:
```bash
vercel deploy
```

## 🔐 Variables de Entorno

Crear `.env.local`:

```
NEXT_PUBLIC_GATEWAY_URL=http://localhost:4000
NEXT_PUBLIC_ML_URL=http://localhost:8000
```

## 📞 Soporte

Cualquier problema, revisar:
1. Consola del navegador (F12)
2. Network tab para requests GraphQL
3. Logs del gateway (`npm start`)

## ✨ Próximas Mejoras

- [ ] Modal de perfil completo para candidatos
- [ ] Exportación a PDF
- [ ] Comparación de clusters
- [ ] Búsqueda global de candidatos
- [ ] Historial de búsquedas

## 📝 Licencia

Proyecto interno - 2025

---

**Última actualización:** 11 de Noviembre de 2025
**Estado:** ✅ Production Ready
