# ⚡ Quick Start - Dashboard de Clustering (5 minutos)

## 1️⃣ Copiar archivos (Ya están listos)

Los archivos ya están en:
```
✅ src/components/bi/ClusterAnalysisReport.tsx
✅ src/components/bi/CandidatesInClusterReport.tsx
✅ src/components/bi/ClusteringDashboard.tsx
✅ src/graphql/queries/bi/clustering.queries.ts
✅ src/app/dashboard/clustering/page.tsx
```

## 2️⃣ Verificar dependencias

Asegúrate que tienes en `package.json`:
```bash
npm list recharts @apollo/client lucide-react
```

Si faltan:
```bash
npm install recharts lucide-react
```

## 3️⃣ Verificar componentes UI

Necesitas estos en `src/components/ui/`:
- `card.tsx`
- `button.tsx`
- `badge.tsx`
- `table.tsx`
- `dropdown-menu.tsx`

Si no los tienes, crea uno simple:
```tsx
// src/components/ui/card.tsx
export const Card = ({ children, ...props }) => (
  <div className="rounded-lg border bg-white shadow-sm" {...props}>{children}</div>
)
export const CardHeader = ({ children }) => <div className="p-6">{children}</div>
export const CardTitle = ({ children }) => <h2 className="text-2xl font-bold">{children}</h2>
export const CardContent = ({ children }) => <div className="p-6 pt-0">{children}</div>
export const CardDescription = ({ children }) => <p className="text-sm text-gray-600">{children}</p>
```

## 4️⃣ Agregar a navegación (opcional)

En tu sidebar/navbar, agrega:
```tsx
<Link href="/dashboard/clustering">
  <span>📊 Clustering</span>
</Link>
```

## 5️⃣ Ejecutar

```bash
npm run dev
```

Abre: `http://localhost:3000/dashboard/clustering`

---

## 🎯 Eso es todo!

El dashboard debería mostrar:
1. ✅ Todos los 13 clusters
2. ✅ Gráficos interactivos
3. ✅ Al hacer click → Candidatos del cluster
4. ✅ Tabla filtrable y ordenable
5. ✅ Exportación a CSV

---

## 🐛 Si algo no funciona

### Problema: "Module not found: '@/graphql/queries'"
**Solución:** Verifica que los imports en `clustering.queries.ts` sean correctos

### Problema: "Graph QL Query Error"
**Solución:** 
- Verifica que el gateway esté corriendo: `npm start` en `gateway/`
- Verifica que la query esté en el schema

### Problema: No se ve bien
**Solución:**
- Asegúrate que Tailwind esté configurado: `npx tailwindcss -i ./src/input.css -o ./src/output.css`
- Limpia cache: `rm -rf .next && npm run dev`

---

## 📍 Estructura final

```
src/
├── app/
│   └── dashboard/
│       └── clustering/
│           └── page.tsx ✨
├── components/
│   └── bi/
│       ├── ClusterAnalysisReport.tsx ✨
│       ├── CandidatesInClusterReport.tsx ✨
│       ├── ClusteringDashboard.tsx ✨
│       └── index.ts
└── graphql/
    └── queries/
        └── bi/
            ├── clustering.queries.ts ✨
            └── index.ts
```

---

## 📊 Qué ves

```
Cluster | Candidatos | Característica
--------|------------|------------------
0       | 382 (3.9%)  | React, Node, GraphQL
1       | 492 (5.0%)  | Google Expert, UX
2       | 357 (3.6%)  | GitLab, GitHub
3       | 4678(47%)   | Administrador ⭐
4       | 461 (4.7%)  | Ethereum, Blockchain
5       | 483 (4.9%)  | Seguridad, CISM
6       | 372 (3.8%)  | Testing (Cypress)
7       | 360 (3.6%)  | Blockchain, Solidity
8       | 471 (4.8%)  | Project Mgmt (PMP)
9       | 486 (4.9%)  | Neo4J, Redis
10      | 387 (3.9%)  | Angular, Firebase
11      | 491 (5.0%)  | Google Cloud, GitHub
12      | 487 (4.9%)  | Docker, DevOps
```

¡Listo! 🚀
