# Renote web client

Application front-end React + TypeScript, construite avec Vite.

Consomme l'API backend du dépôt [`OC-p2-tranformer-architecture`](https://github.com/quentin-mace/OC-p2-tranformer-architecture), **branche `feat/implement-routing`** (branche `main` = ancienne version, ne pas l'utiliser). Contrat d'API : `docs/specs/api-specs.md` de ce dépôt back.

## Stack

- React 19
- TypeScript
- Vite 8 (dev server et build)
- React Router (navigation)
- Zustand (gestion d'état)
- Axios (appels HTTP)
- Tailwind CSS (thème sepia, voir `docs/theme.md`)
- Oxlint (lint)

## Prérequis

- Node.js 22+ et npm
- ou Docker

## Démarrage sans Docker

```bash
cp .env.example .env
npm install
npm run dev
```

`.env` doit définir `VITE_API_BASE_URL` (URL de base de l'API Laravel, par défaut `http://localhost:8000/api`). Sans ce fichier, les appels API partent vers une URL vide.

L'application est servie sur http://localhost:5173.

## Démarrage avec Docker

`.env` (voir ci-dessus) doit exister avant de lancer les commandes suivantes, Vite le lit depuis le code source monté en volume.

Mode développement (avec hot reload) :

```bash
docker compose up
```

L'application est servie sur http://localhost:5174. Le code source est monté en volume, les modifications sont donc prises en compte à la volée.

Mode production (build optimisé servi par nginx) :

```bash
docker build -t oc_p3_frontend .
docker run -p 8080:80 oc_p3_frontend
```

L'application est servie sur http://localhost:8080.

## Scripts npm

| Commande          | Description                                  |
| ------------------ | --------------------------------------------- |
| `npm run dev`     | Lance le serveur de développement Vite       |
| `npm run build`   | Vérifie les types puis build l'application    |
| `npm run preview` | Prévisualise le build de production en local  |
| `npm run lint`    | Lance le linter Oxlint                        |

## Structure du projet

```
src/
  main.tsx                    Point d'entrée React
  app/
    App.tsx                   Composant racine, monte le routeur
    router.tsx                Déclaration des routes
  features/
    auth/                     Login, register, logout (api/, store/, components/)
    notes/                    CRUD notes (api/, store/, components/)
    tags/                     Liste/création de tags (api/, store/, components/)
  shared/
    lib/                      httpClient (axios), apiTypes (ApiError, ApiEnvelope, User, Tag, Note)
    components/               Layout, Sidebar, Header, AppLogo, RequireAuth, DashboardPage
public/                       Fichiers statiques servis tels quels
```

Chaque feature suit le même découpage, `api/` (appels HTTP via `httpClient`, aucun composant n'appelle axios directement), `store/` (état Zustand, statut `idle`/`loading`/`error`), `components/` (UI, déclenchent les actions du store).

## Périmètre fonctionnel

- Authentification, inscription, connexion, déconnexion (pas de mot de passe oublié, pas de vérification d'email).
- Notes, liste, création, suppression (pas d'édition).
- Tags, liste, création (nécessaires à la création d'une note, `tag_id` est obligatoire côté API).

Pas de gestion de profil/paramètres. Le détail des décisions de périmètre est tracé dans les issues GitHub du dépôt.

## Fichiers Docker

- `Dockerfile` : build multi-étapes pour la production (build Node puis service via nginx)
- `Dockerfile.dev` : image de développement avec hot reload
- `docker-compose.yml` : orchestration du mode développement
- `nginx.conf` : configuration nginx pour servir l'application en production