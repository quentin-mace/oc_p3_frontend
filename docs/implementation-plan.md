# Plan d'implémentation - Renote (front React)

Plan de mise en oeuvre du front, conforme à `../OC-p2-tranformer-architecture/docs/specs/front-specs.md` (architecture cible) et `api-specs.md` (contrat consommé). Il découpe le travail en phases livrables, chacune produisant un incrément testable en isolation.

Le suivi détaillé (tâches, statut, PR liée) se fait dans les issues GitHub du dépôt, une par phase (#1 à #8). Ce document garde la vue d'ensemble et trace les décisions de périmètre prises en cours de route.

## Périmètre livré

Le projet a été volontairement réduit en cours de route (décisions du 2026-08-21) : **authentification simple + CRUD de notes**, sans gestion de profil, sans mot de passe oublié, sans vérification d'email. Les tags ont été un temps coupés, puis réintroduits (version minimale) une fois découvert que `tag_id` est obligatoire côté back (validation *et* schéma DB), donc impossible de créer une note sans tag valide.

## Etat de départ

Déjà en place :
- Stack Vite + React 19 + TypeScript + Tailwind 3, React Router 7.
- Arborescence `src/` complète (features/notes, tags, auth, settings ; shared/components, shared/lib ; app), fichiers stubs vides.
- `LoginForm.tsx` et `RegisterForm.tsx` en version UI seule (pas de store, pas d'appel API), routage `/login` et `/register` monté dans `app/router.tsx`.
- Thème "sepia" (cf. `docs/theme.md`).

## Phase 0 - Fondations techniques ✅ (issue #1, PR #9)

Socle HTTP : `shared/lib/httpClient.ts` (instance axios, intercepteurs requête/réponse), `shared/lib/apiTypes.ts` (`ApiEnvelope`, `ApiError`, `fieldErrorsOf`), variable d'environnement `VITE_API_BASE_URL`.

Critère de sortie : un appel `httpClient.get('/user')` sans token renvoie une `ApiError(401)` typée.

## Phase 1 - Authentification (issue #2, PR #10)

`register`, `login`, `logout` uniquement (pas de `forgotPassword`/`resetPassword`/`resendVerification`/`verifyEmail`, hors périmètre). `authStore.ts` (Zustand) avec persistance de `token` **et** `user` dans `localStorage` (`zustand/middleware/persist`, clé `renote.auth`) ; sans `user` persisté, un refresh de page perd l'affichage de l'utilisateur courant. `LoginForm`/`RegisterForm` câblés, erreurs 422 par champ, message générique pour les erreurs sans détail (ex, 401 identifiants incorrects). `shared/components/RequireAuth.tsx` protège les routes privées.

## Phase 2 - Layout applicatif (issue #3, PR #11)

Shell complet avec sidebar, pas la version minimale envisagée un temps. `shared/components/AppLogo.tsx`, `Sidebar.tsx` (logo, nav Dashboard, carte utilisateur avec initiales + déconnexion), `Header.tsx` (titre de page), `Layout.tsx` (assemble le tout + `Outlet`). Route parente `<RequireAuth><Layout /></RequireAuth>` autour de `/dashboard`.

## Phase 3 - Tags (issue #4, PR #12)

Version minimale : `features/tags/api/tagsApi.ts` (`list`, `create`), `tagsStore.ts`, `TagBadge.tsx`, `TagForm.tsx`, `TagList.tsx`. Pas de suppression ni d'édition de tag.

## Phase 4 - Notes (issue #5, PR #12)

CRUD partiel (liste, création, suppression), **sans logique optimiste** (décision du 2026-08-21, simplification). `createNote` crée puis re-fetch la liste complète plutôt que de fusionner la réponse de `POST /notes` (qui renvoie `tag_id` à plat, alors que `GET /notes` renvoie `tag` imbriqué, cf. `api-specs.md` §4). `deleteNote` filtre localement après confirmation serveur.

`shared/components/DashboardPage.tsx` compose `NoteForm`/`NoteList`/`TagForm`/`TagList` dans deux cartes distinctes, pour garder `router.tsx` simple.

## Phases abandonnées (hors périmètre)

- **Phase 5 - Settings** (issue #6, fermée) : pas de gestion de profil/mot de passe/suppression de compte.
- **Phase 6 - Vérification d'email** (issue #7, fermée) : dépendait de `resendVerification`/`verifyEmail`, retirés de la Phase 1.
- **Phase 7 - Finitions et livraison** (issue #8, fermée) : pas de passe de lint/accessibilité/documentation formalisée en fin de projet au-delà de ce document.

## Points d'attention transverses

- **Aucun composant ne fait d'appel réseau direct** (règle §2 de `front-specs.md`). Toute requête passe par un module `api/` déclenché depuis un store.
- **Un seul point d'entrée HTTP**, `shared/lib/httpClient.ts`. Ne jamais recréer une instance axios ailleurs.
- **Erreurs 422**, toujours propager `data.errors` jusqu'au formulaire concerné (mapping champ, message), ne jamais afficher un toast générique en lieu et place.
- **Token et utilisateur**, persistés dans `localStorage` via `zustand/middleware/persist` (clé `renote.auth`). Purge sur 401 et sur `logout`.
- **`event.currentTarget` devient `null` après un `await`** dans un handler React (comportement documenté, pas un bug) : toujours capturer la référence au formulaire avant tout `await` si on doit le manipuler après (ex, `form.reset()`).
- **`tag_id` est obligatoire** côté API (validation *et* schéma DB, pas nullable), impossible de créer une note sans tag existant.
- **Pas de suppression de tag ni d'édition de note**, conforme au périmètre `api-specs.md §5`.

## Ordre de dépendance (résumé)

```
Phase 0 (httpClient) ✅
   |
Phase 1 (auth) ✅ ------> Phase 2 (Layout, RequireAuth) ✅
                              |
                              +--> Phase 3 (Tags) ✅ --> Phase 4 (Notes) ✅
```
