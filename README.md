# Renote web client

Application front-end React + TypeScript, construite avec Vite.

## Stack

- React 19
- TypeScript
- Vite 8 (dev server et build)
- Oxlint (lint)

## Prérequis

- Node.js 22+ et npm
- ou Docker

## Démarrage sans Docker

```bash
npm install
npm run dev
```

L'application est servie sur http://localhost:5173.

## Démarrage avec Docker

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
  App.tsx       Composant racine
  main.tsx      Point d'entrée React
  assets/       Images et ressources statiques
public/         Fichiers statiques servis tels quels
```

## Fichiers Docker

- `Dockerfile` : build multi-étapes pour la production (build Node puis service via nginx)
- `Dockerfile.dev` : image de développement avec hot reload
- `docker-compose.yml` : orchestration du mode développement
- `nginx.conf` : configuration nginx pour servir l'application en production