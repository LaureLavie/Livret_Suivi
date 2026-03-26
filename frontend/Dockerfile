# === Stage 1 : Build ===
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers package
COPY package.json package-lock.json* ./

# Installation de toutes les dépendances
RUN npm ci

# Copie du code source
COPY . .

# Build de l'application Next.js
RUN npm run build

# === Stage 2 : Production ===
FROM node:20-alpine AS runner

WORKDIR /app

# Installation de curl pour healthcheck
RUN apk add --no-cache curl

# Copie des fichiers nécessaires depuis le builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Exposition du port
EXPOSE 3000

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Commande de démarrage (standalone mode Next.js)
CMD ["node", "server.js"]