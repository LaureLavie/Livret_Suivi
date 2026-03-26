FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache curl

# Copie des fichiers package
COPY package.json package-lock.json* ./

# Installation des dépendances
RUN npm ci

# Copie tout le code source
COPY . .

EXPOSE 1337

# Commande de démarrage en mode DEVELOPPEMENT
CMD ["npm", "run", "develop"]