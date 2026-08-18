# Thème visuel, palette sépia

Le thème de l'application adopte un style chaud et sépia, inspiré du papier ancien et des tons ambrés. L'objectif est un rendu doux, lisible, et moins clinique qu'un thème gris ou bleu standard.

## Palette

La palette est déclarée dans `tailwind.config.js` sous la clé `theme.extend.colors.sepia`. Elle suit l'échelle Tailwind classique (50 à 900), du crème clair au brun profond.

| Nuance | Hex       | Usage type                                                |
|--------|-----------|-----------------------------------------------------------|
| 50     | `#fbf6ec` | Fond principal, fond des champs de saisie                 |
| 100    | `#f5ead1` | Fond des cartes, panneaux                                 |
| 200    | `#e9d3a6` | Bordures douces, séparateurs                              |
| 300    | `#d8b57a` | Bordures d'input, anneaux de focus, ombres teintées       |
| 400    | `#c69759` | Accents secondaires                                       |
| 500    | `#a97a3f` | Accent principal, illustrations                           |
| 600    | `#8a5f30` | Bordures actives, focus                                   |
| 700    | `#6b4823` | Texte secondaire, hover des boutons foncés                |
| 800    | `#4c3319` | Boutons primaires, éléments foncés                        |
| 900    | `#2e1e0f` | Texte principal, titres                                   |

## Correspondance avant, apres

Le thème remplace la palette `slate` par la palette `sepia` sur l'écran de connexion.

| Avant (slate)             | Apres (sepia)                | Element                       |
|---------------------------|------------------------------|-------------------------------|
| `bg-slate-100`            | `bg-sepia-50`                | Fond de page                  |
| `bg-white`                | `bg-sepia-100`               | Fond de la carte              |
| `text-slate-800`          | `text-sepia-900`             | Titre, texte des champs       |
| `text-slate-600`          | `text-sepia-700`             | Libelles                      |
| `border-slate-300`        | `border-sepia-300`           | Bordures d'input              |
| `focus:border-slate-500`  | `focus:border-sepia-600`     | Bordure au focus              |
| `focus:ring-slate-200`    | `focus:ring-sepia-300`       | Anneau de focus               |
| `bg-slate-800`            | `bg-sepia-800`               | Bouton primaire               |
| `hover:bg-slate-700`      | `hover:bg-sepia-700`         | Bouton primaire (hover)       |
| `text-white`              | `text-sepia-50`              | Texte du bouton primaire      |

Un liseré `border border-sepia-200` et une ombre teintee `shadow-sepia-300/40` ont ete ajoutes a la carte pour renforcer l'effet parchemin.

## Utilisation

Toutes les nuances sont accessibles via les utilitaires Tailwind standards, par exemple, `bg-sepia-100`, `text-sepia-900`, `border-sepia-300`, `ring-sepia-300`, `shadow-sepia-500/30`.

Pour ajouter un nouvel ecran ou composant dans le meme style, s'appuyer sur les regles suivantes.
- Fonds clairs, `bg-sepia-50` pour la page, `bg-sepia-100` pour les surfaces.
- Textes, `text-sepia-900` pour le contenu principal, `text-sepia-700` pour le secondaire.
- Bordures, `border-sepia-200` pour les separateurs discrets, `border-sepia-300` pour les inputs.
- Actions primaires, `bg-sepia-800` avec `hover:bg-sepia-700` et texte `text-sepia-50`.
- Focus, `focus:border-sepia-600` avec `focus:ring-2 focus:ring-sepia-300`.

## Fichiers concernes

- `tailwind.config.js`, declaration de la palette `sepia`.
- `../src/app/App.tsx`, application des classes sur l'ecran de connexion.