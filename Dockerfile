# ETAPA BASE: prepara el entorno del frontend
FROM node:24-bookworm-slim AS base

# Directorio de trabajo dentro de la imagen
WORKDIR /app

# Copia primero los archivos de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias exactas del proyecto
RUN npm ci --legacy-peer-deps

# Copia el resto del frontend
COPY . .


# ETAPA DE DESARROLLO
FROM base AS development

ENV NODE_ENV=development

# Puerto cambiado en vite.config.ts
EXPOSE 3000

# --host permite acceder a Vite desde fuera del contenedor
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
