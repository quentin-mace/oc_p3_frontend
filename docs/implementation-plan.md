# Plan d'implémentation - Renote (front React)

Plan de mise en oeuvre du front, conforme à `../OC-p2-tranformer-architecture/docs/specs/front-specs.md` (architecture cible) et `api-specs.md` (contrat consommé). Il découpe le travail en phases livrables, chacune produisant un incrément testable en isolation.

## Etat de départ

Déjà en place :
- Stack Vite + React 19 + TypeScript + Tailwind 3, React Router 7.
- Arborescence `src/` complète (features/notes, tags, auth, settings ; shared/components, shared/lib ; app), fichiers stubs vides.
- `LoginForm.tsx` et `RegisterForm.tsx` en version UI seule (pas de store, pas d'appel API), routage `/login` et `/register` monté dans `app/router.tsx`.
- Thème "sepia" (cf. `docs/theme.md`).

Manquant côté dépendances : `zustand`, `axios`. À installer en phase 0.

## Phase 0 - Fondations techniques

Objectif : disposer d'un socle prêt à câbler les couches Store et Services.

1. Installer les dépendances runtime.
   ```
   npm install zustand axios
   ```
2. Ajouter la variable d'environnement `VITE_API_BASE_URL` (fichier `.env` local, non commit ; `.env.example` commit avec la valeur par défaut `http://localhost:8000/api`).
3. Implémenter `shared/lib/httpClient.ts` :
   - Instance axios avec `baseURL` lue depuis `import.meta.env.VITE_API_BASE_URL`.
   - Intercepteur de requête, injecte `Authorization: Bearer {token}` depuis `authStore` si présent.
   - Intercepteur de réponse :
     - 401, purge le token dans `authStore` et redirige vers `/login` (via un event bus léger ou une callback, pas d'import direct du router pour éviter un cycle).
     - 422, laisse remonter `data.errors` au store appelant.
     - Autres erreurs, normalisation `{status, message, data}` en une exception typée `ApiError`.
4. Types partagés : `shared/lib/apiTypes.ts` (ou colocalisé dans `httpClient.ts`) pour l'enveloppe `{status, message, data}` et `ApiError`.

Critère de sortie : un appel `httpClient.get('/user')` sans token renvoie une `ApiError(401)` typée.

## Phase 1 - Authentification (bout en bout)

Objectif : un utilisateur peut créer un compte, se connecter, se déconnecter, et récupérer son mot de passe. C'est le prérequis de toutes les autres features.

1. `features/auth/api/authApi.ts` :
   - `register(payload)`, `login(payload)`, `logout()`, `forgotPassword(payload)`, `resetPassword(payload)`, `resendVerification()`, `verifyEmail(id, hash, query)`.
   - Chaque fonction retourne le `data` déjà déballé, laisse remonter `ApiError`.
2. `features/auth/store/authStore.ts` (Zustand) :
   - Etat, `user`, `token`, `status: 'idle' | 'loading' | 'error'`, `errors` (map champ, messages).
   - Actions, `register`, `login`, `logout`, `forgotPassword`, `resetPassword`, `hydrate` (relit le token depuis `localStorage` au démarrage).
   - Persistance du token via `zustand/middleware/persist` sur `localStorage` (clé `renote.auth`).
3. Câbler les formulaires existants (`LoginForm`, `RegisterForm`) sur le store :
   - `onSubmit` déclenche l'action, affichage des erreurs 422 champ par champ, redirection `/dashboard` en cas de succès.
4. Créer les formulaires manquants, `ForgotPasswordForm`, `ResetPasswordForm`, `ConfirmPasswordForm` (structure identique, styling cohérent avec l'existant).
5. Routes publiques associées dans `app/router.tsx`, `/forgot-password`, `/reset-password`, `/verify-email`.
6. Composant `RequireAuth` (dans `shared/components/`) pour protéger les routes privées, redirige vers `/login` si `authStore.token` absent.

Critère de sortie : parcours complet login, logout, register, forgot, reset validé manuellement contre un back mocké (ou le back réel une fois disponible).

## Phase 2 - Layout applicatif

Objectif : cadre visuel commun aux pages authentifiées.

1. `shared/components/Layout.tsx`, structure `<Sidebar />` + `<Header />` + `<Outlet />` de React Router.
2. `shared/components/Sidebar.tsx`, liens vers Dashboard, Settings, action de déconnexion (appelle `authStore.logout`).
3. `shared/components/Header.tsx`, affiche le nom de l'utilisateur courant, badge "email non vérifié" avec bouton "renvoyer l'email".
4. `shared/components/AppLogo.tsx`, logo textuel ou SVG minimal.
5. Route parent `<RequireAuth><Layout /></RequireAuth>` regroupant `/dashboard` et `/settings/*`.

Critère de sortie : après login, l'utilisateur voit un shell applicatif cohérent avec navigation fonctionnelle.

## Phase 3 - Tags

Objectif : gérer les tags avant les notes (les notes en dépendent via `tag_id`).

1. `features/tags/api/tagsApi.ts`, `list()`, `create(name)`.
2. `features/tags/store/tagsStore.ts`, état `tags`, `status`, `errors` ; actions `fetchTags`, `createTag`.
3. Composants :
   - `TagBadge.tsx`, pastille lecture seule (réutilisée par `NoteItem`).
   - `TagForm.tsx`, création d'un tag (champ nom, validation 50 caractères, erreur 422 unicité).
   - `TagList.tsx`, liste des tags de l'utilisateur.

Critère de sortie : depuis le dashboard, on peut créer un tag et le voir apparaître dans la liste sans rechargement de page.

## Phase 4 - Notes (coeur métier)

Objectif : CRUD partiel des notes conforme à `api-specs.md §4` (liste, création, suppression ; pas d'édition, pas de suppression de tag).

1. `features/notes/api/notesApi.ts`, `list()`, `create(payload)`, `remove(id)`.
2. `features/notes/store/notesStore.ts`, état `notes`, `status`, `errors` ; actions `fetchNotes`, `createNote`, `deleteNote`.
   - `createNote` optimiste, ajout local immédiat, rollback si l'API renvoie une erreur.
   - `deleteNote` optimiste également (retrait local puis confirmation).
3. Composants :
   - `NoteForm.tsx`, saisie du texte + `<select>` de tag (alimenté par `tagsStore`), bouton "Créer".
   - `NoteItem.tsx`, affiche `text`, `tag` (via `TagBadge`), `created_at`, bouton "Supprimer".
   - `NoteList.tsx`, liste + état vide.
4. Page `/dashboard`, compose `<NoteForm />` + `<NoteList />` + `<TagForm />` + `<TagList />`.

Critère de sortie : parcours complet (créer un tag, créer une note associée, supprimer une note) fonctionne, y compris avec un back qui renvoie 422 sur `tag_id` invalide.

## Phase 5 - Settings

Objectif : gestion du profil, exposée via les sous-routes `/settings/*`.

1. `features/settings/api/settingsApi.ts`, `getProfile()` (alias `GET /user`), `updateProfile(payload)`, `updatePassword(payload)`, `deleteAccount(password)`.
2. `features/settings/store/settingsStore.ts` ou extension d'`authStore` pour le profil (à trancher en début de phase, la spec §4 laisse le choix ; simple, on garde le profil dans `authStore` et on ajoute un `settingsStore` uniquement pour l'état des formulaires si nécessaire).
3. Composants :
   - `ProfileForm.tsx`, nom + email, avertissement si l'email change (`email_verified_at` repassera à `null`).
   - `PasswordForm.tsx`, mot de passe actuel + nouveau + confirmation.
   - `AppearanceForm.tsx`, sélection du thème (persist local si pas d'endpoint back).
   - `DeleteAccountForm.tsx`, confirmation par mot de passe, déconnexion + redirection après succès.
4. Sous-routes `/settings/profile`, `/settings/password`, `/settings/appearance`, `/settings/delete` avec une nav latérale locale.

Critère de sortie : chaque formulaire fonctionne, les erreurs 422 s'affichent au bon endroit, la suppression de compte purge bien la session.

## Phase 6 - Vérification d'email

Objectif : gérer le flow email de vérification (endpoint `GET /email/verify/{id}/{hash}` signé).

1. Route `/verify-email/:id/:hash`, lit les query params `expires` et `signature`, appelle `authApi.verifyEmail`.
2. Composant de retour, message succès/erreur + lien vers `/dashboard`.
3. Bouton "renvoyer l'email" dans `Header.tsx` (déjà prévu phase 2), branché sur `authApi.resendVerification`.

Critère de sortie : cliquer sur un lien de vérification valide met à jour `email_verified_at` et supprime le bandeau.

## Phase 7 - Finitions et livraison

1. Passer `oxlint` propre sur `src/`.
2. Vérifier `npm run build` (compilation TS stricte + build Vite).
3. Tester le build servi par Nginx (`docker compose up`), vérifier que `VITE_API_BASE_URL` est bien injecté au build ou lu à l'exécution selon la stratégie retenue.
4. Passe de revue accessibilité (labels de formulaire, focus visible, contraste sur le thème sepia).
5. README, section "Démarrer en local", variables d'env, commandes utiles.

## Points d'attention transverses

- **Aucun composant ne fait d'appel réseau direct** (règle §2 de `front-specs.md`). Toute requête passe par un module `api/` déclenché depuis un store.
- **Un seul point d'entrée HTTP**, `shared/lib/httpClient.ts`. Ne jamais recréer une instance axios ailleurs.
- **Erreurs 422**, toujours propager `data.errors` jusqu'au formulaire concerné (mapping champ, message), ne jamais afficher un toast générique en lieu et place.
- **Token**, `localStorage` uniquement (contrainte "consommable par un client mobile" côté back, pas de cookie de session). Purge sur 401 et sur `logout`.
- **404 sur ressource d'un autre user**, traité comme "ressource inexistante" côté UI (pas de message d'autorisation).
- **Pas de suppression de tag ni d'édition de note**, conforme au périmètre `api-specs.md §5`. Ne pas ajouter d'UI pour ces actions.

## Ordre de dépendance (résumé)

```
Phase 0 (httpClient)
   |
Phase 1 (auth) ------> Phase 2 (Layout, RequireAuth)
                              |
                              +--> Phase 3 (Tags) --> Phase 4 (Notes)
                              |
                              +--> Phase 5 (Settings)
                              |
                              +--> Phase 6 (Vérif email)
                                            |
                                        Phase 7 (finitions)
```

Les phases 3 à 6 peuvent être menées en parallèle une fois la phase 2 terminée, à condition que la phase 4 (Notes) démarre après la phase 3 (Tags).