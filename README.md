# 🐳 Next.js + Docker Setup

Este proyecto usa **Docker** y **Docker Compose** para ejecutar una aplicación Next.js de forma aislada y reproducible, tanto en **modo desarrollo** como en **producción**.

---

## 🚀 Requisitos previos

Asegúrate de tener instalado:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js 20+](https://nodejs.org/) (solo necesario para desarrollo local sin Docker)

---

## 🧱 Estructura del proyecto

```
📦 proyecto/
┣ 📂 src/
┣ 📂 app/
┣ 📜 Dockerfile
┣ 📜 docker-compose.yml
┣ 📜 package.json
┣ 📜 tsconfig.json
┗ 📜 next.config.js
```

---

## ⚙️ Dockerfile

```dockerfile
# Etapa base
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Etapa de desarrollo (sin build)
FROM base AS development
COPY . .
CMD ["npm", "run", "dev"]

# Etapa de producción (con build)
FROM base AS production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🧩 docker-compose.yml

```yaml
services:
  web:
    build:
      context: .
      target: development
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    command: npm run dev
    volumes:
      - .:/app
      - /app/node_modules
```

---

## 🧰 Comandos básicos

### 1️⃣ Instalar dependencias locales

Antes de crear la imagen, asegúrate de tener todas las dependencias instaladas:

```bash
npm install
```

### 2️⃣ Construir la imagen

Crea la imagen del contenedor usando el Dockerfile:

```bash
docker compose build
```

Si quieres reconstruir todo desde cero (sin caché):

```bash
docker compose build --no-cache
```

### 3️⃣ Levantar el contenedor (modo desarrollo)

Ejecuta la aplicación con hot reload (modo desarrollo):

```bash
docker compose up
```

Levantar en segundo plano:

```bash
docker compose up -d
```

Apagar todo:

```bash
docker compose down
```

### 4️⃣ Verificar contenedores activos

```bash
docker ps
```

Ver todos (incluso los detenidos):

```bash
docker ps -a
```

### 5️⃣ Ver logs

```bash
docker compose logs -f
```

Solo logs del servicio web:

```bash
docker compose logs -f web
```

### 6️⃣ Entrar dentro del contenedor

Abrir una terminal dentro del contenedor:

```bash
docker compose exec web sh
```

Salir del contenedor:

```bash
exit
```

### 7️⃣ Instalar dependencias desde dentro del contenedor

Si necesitas agregar un nuevo paquete:

```bash
docker compose exec web npm install nombre-del-paquete
```

---

## 🏗️ Construir imagen de producción

Para crear una imagen optimizada:

```bash
docker build -t front-erp-web:prod --target production .
```

Y ejecutarla:

```bash
docker run -p 3000:3000 front-erp-web:prod
```

Esto ejecuta la aplicación en modo producción, sin hot reload.

---

## 🧹 Comandos de limpieza

Eliminar contenedores detenidos:

```bash
docker container prune
```

Eliminar imágenes no usadas:

```bash
docker image prune
```

Eliminar todo (contenedores, redes, imágenes):

```bash
docker system prune -a
```

---

## 💡 Flujo recomendado de desarrollo

```bash
# 1. Instalar dependencias
npm install

# 2. Construir imagen (primera vez o tras cambios de dependencias)
docker compose build

# 3. Levantar contenedor en modo dev
docker compose up

# 4. Instalar nuevas dependencias dentro del contenedor (opcional)
docker compose exec web npm install axios

# 5. Apagar y limpiar
docker compose down
```

---

## 🌐 Acceso

Una vez levantado el contenedor, la app estará disponible en:

👉 **http://localhost:3000**


# Front ERP Web - Next.js

Sistema de gestión RRHH integrado con múltiples microservicios a través de GraphQL Gateway.

## 🏗️ Arquitectura

```
GraphQL Gateway (Node.js:4000)
├── ERP/RRHH (Spring Boot:8080)
│   ├── Empresas
│   ├── Ofertas de Trabajo
│   ├── Postulaciones
│   ├── Entrevistas
│   └── Evaluaciones
├── BI (FastAPI:8001)
│   ├── Analíticas
│   └── Reportes
└── ML (Go Fiber:3001)
    ├── Productos
    └── Recomendaciones
```

## 📁 Estructura del Proyecto

```
src/
├── constants/
│   └── api.constants.ts          # URLs de microservicios
├── service/
│   ├── api.client.ts             # Instancias de axios
│   ├── graphql.service.ts        # Ejecutor GraphQL
│   ├── auth.service.ts
│   └── microservices/
│       ├── erp/                  # Servicios ERP/RRHH
│       ├── bi/                   # Servicios BI
│       └── ml/                   # Servicios ML
├── graphql/
│   ├── queries/                  # Queries por microservicio
│   └── mutations/                # Mutations por microservicio
├── types/
│   ├── erp/                      # Tipos ERP/RRHH
│   ├── bi/                       # Tipos BI
│   └── ml/                       # Tipos ML
├── hooks/
│   ├── erp/                      # Hooks ERP/RRHH
│   ├── bi/                       # Hooks BI
│   └── ml/                       # Hooks ML
├── page/
└── components/
```

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Variables de entorno
cp .env.example .env.local

# Desarrollo
npm run dev
```

## 📊 Endpoints

- **Gateway GraphQL**: http://localhost:4000/graphql
- **ERP**: http://localhost:8080/api/*
- **BI**: http://localhost:8001/*
- **ML**: http://localhost:3001/api/*

## 🔑 Características

- ✅ Integración GraphQL completa
- ✅ Type-safe con TypeScript
- ✅ Hooks reutilizables
- ✅ Gestión de errores centralizada
- ✅ Soporte para múltiples microservicios

## 📦 Dependencias

```bash
npm install axios graphql
```