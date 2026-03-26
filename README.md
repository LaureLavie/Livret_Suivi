# Livret_Suivi
```markdown
# Livret de Suivi Étudiant

Application de gestion des livrets de suivi en alternance.
Le tuteur entreprise et le référent pédagogique remplissent le livret via un lien unique.
Données persistantes, génération PDF, et administration simple avec Strapi.

**Technologies** : Strapi v5 (backend + admin) + Next.js 15 (frontend) + PostgreSQL
**Charte graphique** : Police Montserrat – Couleurs : Bleu Cobalt, Bleu Cyan, Orange Brique

## Architecture du projet
```

livret-suivi-etudiant/
├── backend/          # Strapi v5 (API + Admin Panel)
├── frontend/         # Next.js 15 App Router (interface publique + génération PDF)
├── docker-compose.yml
├── .env.example
└── [README.md](http://readme.md/)

```

- **Backend** : Strapi (Content Types, composants, rôles & permissions)
- **Frontend** : Next.js avec TailwindCSS + React-PDF ou Puppeteer pour générer les PDF
- **Base de données** : PostgreSQL
- **Déploiement** : Render (Strapi + DB) + Vercel (Frontend) – solution gratuite possible en tier hobby

## Prérequis

- Node.js ≥ 20
- Yarn ou npm
- Git
- Docker + Docker Compose (recommandé pour le développement local)
- Compte Render.com (gratuit) et Vercel (gratuit)
- VS Code (recommandé avec extensions : ESLint, Prettier, Tailwind CSS IntelliSense)

## Installation locale (développement)

### 1. Cloner le repository

```bash
git clone <https://github.com/ton-username/livret-suivi-etudiant.git>
cd livret-suivi-etudiant
```

### 2. Configuration des variables d'environnement

Copie les fichiers d'exemple :

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

Remplis les variables (surtout les JWT secrets et la connexion DB).

### 3. Lancement avec Docker Compose (recommandé)

```bash
docker-compose up -d --build
```

Ou en mode développement :

```bash
docker-compose up --build
```

Services disponibles :

- Strapi → [http://localhost:1337](http://localhost:1337/)
- Next.js Frontend → [http://localhost:3000](http://localhost:3000/)
- PostgreSQL → port 5432

### 4. Installation manuelle (sans Docker)

**Backend (Strapi)**

```bash
cd backend
yarn install          # ou npm install
yarn develop          # ou npm run develop
```

Ouvre [http://localhost:1337](http://localhost:1337/) → crée ton premier utilisateur admin.

**Frontend (Next.js)**

```bash
cd frontend
yarn install
yarn dev
```

## Structure des Content Types Strapi (à créer)

Une fois Strapi lancé, va dans **Content-Type Builder** et crée les types suivants (ou importe les schémas JSON fournis précédemment) :

- **Formation**
- **Etudiant**
- **Livret** (relation oneToOne avec Etudiant + tokenAcces + Dynamic Zone)
- **Bilan-Suivi** (relation oneToMany avec Livret)

**Composants** :

- `livret.infos-entreprise`
- `livret.bloc-competence`
- `livret.bloc-competence-suivi`
- `livret.bilan-final`

## Lifecycle Hook – Génération automatique du tokenAcces

Crée le fichier `backend/src/api/livret/content-types/livret/lifecycles.ts` :

```tsx
import { v4 as uuidv4 } from 'uuid';

export default {
  async beforeCreate(event: any) {
    const { data } = event.params;
    if (!data.tokenAcces) {
      data.tokenAcces = uuidv4();
    }
  },
};
```

Installe `uuid` si nécessaire : `yarn add uuid` dans le dossier backend.

## Déploiement

### Option recommandée (gratuite / low-cost)

- **Strapi + PostgreSQL** → [**Render.com**](http://render.com/)
    - Utilise le template officiel : https://render.com/templates/strapi-postgres
    - Crée un service Web + un service PostgreSQL
    - Ajoute un **Persistent Disk** pour la Media Library (upload signatures)
- **Frontend Next.js** → **Vercel** (idéal pour Next.js)

### CI/CD avec GitHub Actions

Crée un fichier `.github/workflows/deploy.yml` (exemple simplifié) :

```yaml
name: Deploy to Render + Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy Strapi to Render
        uses: render/deploy-action@v1
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
```

Ajoute les secrets dans GitHub Settings → Secrets and variables.

## Commandes utiles

```bash
# Backend
cd backend
yarn develop
yarn build
yarn start

# Frontend
cd frontend
yarn dev
yarn build
yarn start

# Docker
docker-compose up -d
docker-compose down
docker-compose logs -f strapi
```

## Prochaines étapes recommandées

1. Créer les Content Types dans Strapi (suivre les schémas fournis précédemment).
2. Configurer les Roles & Permissions (surtout pour l’accès public via `tokenAcces`).
3. Développer la page publique du livret dans Next.js (`/livret/[token]`).
4. Implémenter la génération PDF (avec `@react-pdf/renderer` ou Puppeteer).
5. Ajouter l’envoi d’email avec lien unique (plugin Strapi SendGrid ou Nodemailer).

## Contribution

Fork → Branch → Pull Request.

## Licence

MIT

---

**Auteur** : Elève CDAIA P7 => projet Livret de Suivi Étudiant

**Date** : Mars 2026

```
---
```