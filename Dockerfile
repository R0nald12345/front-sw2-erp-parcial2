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
