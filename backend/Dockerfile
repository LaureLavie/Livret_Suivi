# === Stage 1 : Build ===
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers package
COPY package.json yarn.lock ./

# Installation des dépendances
RUN yarn install --frozen-lockfile

# Copie du code source
COPY . .

# Build de Strapi
RUN yarn build

# === Stage 2 : Production ===
FROM node:20-alpine

WORKDIR /app

# Installation de curl pour healthcheck
RUN apk add --no-cache curl

# Copie uniquement des fichiers nécessaires depuis le builder
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public

# Installation des dépendances de production uniquement
RUN yarn install --production --frozen-lockfile

# Exposition du port
EXPOSE 1337

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:1337/_health || exit 1

# Commande de démarrage
CMD ["yarn", "start"]