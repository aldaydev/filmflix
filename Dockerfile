# ---------- BUILD STAGE ----------

FROM node:22-slim AS builder
WORKDIR /app

# Instalación de dependencias
COPY package*.json ./
RUN npm ci

# Hacemos el Build
COPY . .
RUN npm run build

# ---------- RUN STAGE ----------

FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=4000 \
    HOST=0.0.0.0

# Solo deps de producción para el server SSR
COPY package*.json ./
RUN npm ci --omit=dev

# Copia el artefacto construido
COPY --from=builder /app/dist ./dist

# Usuario no root (opcional pero recomendado)
USER node

# El SSR suele escuchar en 4000 si no se define PORT
EXPOSE 4000

CMD ["node", "--experimental-specifier-resolution=node", "dist/filmflix/server/server.mjs"]