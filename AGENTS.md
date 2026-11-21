# AGENTS.md — tuto-code

Ce fichier sert de point de départ pour toute personne (ou agent) qui reprend le
projet. Le mettre à jour à la fin de chaque étape importante : ce qui a été
fait, pourquoi, et ce qui reste.

## Le projet en bref

Site d'une page (React 18 + TypeScript + Vite 7 + Tailwind 4) qui présente une
feuille de route pour (ré)apprendre à coder : étapes, objectifs à cocher,
ressources et principes. Tout le texte est en français et tutoie le lecteur.

- `npm run dev` : serveur de développement
- `npm run typecheck` : vérification TypeScript (passe au 11/11/2026)
- `npm run build` : typecheck + build dans `dist/`

## Chronologie

### 27/10/2026 — Premier commit (`c441278`, `35967f0`)
Projet Vite + React en JSX, tout dans `src/App.jsx`, config Tailwind classique.

### 29/10/2026 — Passage à TypeScript (`5078f4d`)
- `App.jsx` découpé en composants (`src/components/`), hooks (`src/hooks/`),
  données (`src/data/roadmap.ts`) et types (`src/types/`).
- Thème clair/sombre (`useTheme`, `ThemeToggle`), couleurs d'accent par étape
  (`src/lib/accent.ts`), favicon.

### 05/11/2026 — Progression et refonte des étapes (`a1b93bc`)
- Chaque étape a des objectifs cochables (`TaskCheckbox`), un bloc « prochain
  objectif » (`NextObjective`), des options de parcours (`StepOptions`), une
  section principes (`PrinciplesSection`).
- Progression sauvegardée côté serveur via un plugin Vite
  (`server/progressPlugin.ts` → `data/progress.json`).
- Passage à Tailwind 4 (`@tailwindcss/postcss`), suppression de
  `tailwind.config.js` et `vite.config.js`.

### 11/11/2026 — Comptes Supabase (branche `feat/auth-supabase`, **non commité**)
Objectif : que chaque personne retrouve sa progression sur n'importe quel
appareil, au lieu d'un fichier JSON unique sur le serveur de dev.

- **Supprimé** : `server/progressPlugin.ts` et `data/progress.json` (le plugin
  ne marchait qu'en local avec `vite dev`).
- **Client Supabase** : `src/lib/supabase.ts`. Vaut `null` si les variables
  d'environnement manquent ; le site fonctionne alors en mode local seul.
- **Auth** : `src/hooks/useAuth.ts` — inscription (nom + e-mail + mot de
  passe), connexion, déconnexion, suppression de compte. Messages d'erreur
  traduits en français.
- **Progression** : `src/hooks/useProgress.ts`
  - sans compte : `localStorage` (clé `tuto-code-progress`) ;
  - avec compte : table `task_progress` ; à la connexion, les coches locales
    sont envoyées au compte puis effacées du navigateur ;
  - les enregistrements sont mis en file pour garder l'ordre des clics, et
    annulés à l'écran en cas d'échec (`ProgressNotice` affiche l'erreur).
- **Page « Mon compte »** : `AccountPage.tsx`, accessible via `#/compte`
  (routage par hash, `useHashRoute.ts`, aucune config hébergeur). Affiche les
  infos, permet d'ajouter un numéro de téléphone facultatif
  (`useAccountPhone.ts`, composant `react-phone-input-2`), se déconnecter,
  supprimer le compte.
- **En-tête** : `AccountControl.tsx` (bouton connexion / lien vers le compte).
  Styles de formulaire partagés dans `formStyles.ts`, `FormError.tsx`.
- **Validation** : `src/lib/credentials.ts` — nom de 2 à 50 caractères (noms
  complets acceptés, doublons autorisés), mot de passe ≥ 8, téléphone au format
  international `+XXXXXXXX` (le 0 national est retiré, sauf Italie, Côte
  d'Ivoire, Gabon, Congo).
- **Base de données** : `supabase/`
  - `schema.sql` : à lancer une fois sur un projet neuf (tables `profiles` et
    `task_progress`, RLS, trigger de création de profil, fonction
    `delete_own_account`). Contient aussi en commentaire la requête pour
    réinitialiser un mot de passe à la main.
  - `add-phone.sql`, `allow-full-names.sql` : migrations pour une base créée
    avec une ancienne version de `schema.sql` uniquement.
- **Config** : `.env.example` (`VITE_SUPABASE_URL`,
  `VITE_SUPABASE_PUBLISHABLE_KEY`) ; `.env` ajouté au `.gitignore`.

## Choix à respecter

- Ne jamais renommer l'`id` d'un objectif dans `src/data/roadmap.ts` : il est
  stocké en base (`task_progress.task_id`, format `^[a-z0-9-]{1,64}$`).
- Seule la clé publique Supabase va côté client ; jamais la clé `service_role`.
- Le nom d'utilisateur n'est pas modifiable après inscription (seul `phone`
  est autorisé en UPDATE sur `profiles`).
- Pas de « mot de passe oublié » automatique pour l'instant : réinitialisation
  manuelle via la requête SQL de `schema.sql`.

## Reste à faire / points d'attention

- Commiter le travail de `feat/auth-supabase` puis ouvrir une PR vers `main`.
- Le commentaire de `StepTask.id` dans `src/types/roadmap.ts` mentionne encore
  `data/progress.json` : à mettre à jour (l'id est désormais stocké dans
  Supabase et le `localStorage`).
- Déclarer les variables `VITE_SUPABASE_*` chez l'hébergeur avant de déployer.
- Pistes possibles : réinitialisation du mot de passe par e-mail, modification
  du nom d'utilisateur.
