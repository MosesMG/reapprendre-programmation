import type { Principle, RoadmapStep } from '../types/roadmap'

export const roadmapSteps = [
  {
    id: 1,
    title: 'Renforcer l’algorithmique',
    description:
      'Concentre-toi sur la logique algorithmique, c’est la base la plus importante.',
    tag: 'Priorité',
    accent: 'sky',
    tasks: [
      {
        id: 'algo-logique',
        label: 'Logique de base : conditions, boucles, fonctions',
      },
      {
        id: 'algo-structures',
        label: 'Structures de données : tableaux, dictionnaires, piles, files',
      },
      { id: 'algo-recursivite', label: 'Récursivité' },
      { id: 'algo-tris', label: 'Tris et recherches' },
      { id: 'algo-complexite', label: 'Notion de complexité' },
      { id: 'algo-arbres', label: 'Arbres et graphes' },
    ],
    details: [
      {
        subtitle: 'Pratique',
        text: '1 à 2 exercices par jour, en résolvant d’abord sur papier. France-IOI pour progresser pas à pas en français, Exercism pour pratiquer dans ton langage, CodinGame pour le côté ludique, CSES pour monter en niveau.',
        links: [
          { label: 'France-IOI', url: 'https://www.france-ioi.org/' },
          { label: 'Exercism', url: 'https://exercism.org/' },
          { label: 'CodinGame', url: 'https://www.codingame.com/' },
          { label: 'CSES', url: 'https://cses.fi/problemset/' },
        ],
      },
      {
        subtitle: 'Ressources',
        text: 'Visualiser les algorithmes aide à comprendre ce qu’ils font à chaque étape.',
        links: [{ label: 'VisuAlgo', url: 'https://visualgo.net/fr' }],
      },
    ],
  },
  {
    id: 2,
    title: 'Refaire les bases',
    description: 'Se remettre sur un langage et les outils indispensables.',
    tag: 'Fondations',
    accent: 'indigo',
    tasks: [
      { id: 'bases-langage', label: 'Choisir Python ou TypeScript' },
      { id: 'bases-git', label: 'Revoir Git : commit, branche, merge' },
      { id: 'bases-terminal', label: 'Retrouver ses repères dans le terminal' },
    ],
    details: [
      {
        subtitle: 'Langage polyvalent',
        text: 'Choisir Python ou TypeScript pour pratiquer l’algo.',
      },
      {
        subtitle: 'Ressources',
        text: 'Se servir des documentations officielles.',
        links: [
          {
            label: 'Tutoriel Python',
            url: 'https://docs.python.org/fr/3/tutorial/',
          },
          {
            label: 'Handbook TypeScript',
            url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
          },
          { label: 'Livre Pro Git', url: 'https://git-scm.com/book/fr/v2' },
          {
            label: 'Ligne de commande (MDN)',
            url: 'https://developer.mozilla.org/fr/docs/Learn_web_development/Getting_started/Environment_setup/Command_line',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Choisir une direction',
    description: 'Définis ton objectif pour orienter ton apprentissage.',
    tag: 'Cap',
    accent: 'violet',
    tasks: [{ id: 'direction-choix', label: 'Choisir une direction' }],
    details: [
      {
        subtitle: 'Possibilités',
        text: 'Ouvre chaque domaine pour voir en quoi il consiste et par où commencer.',
        options: [
          {
            id: 'web',
            label: 'Web',
            stack: 'TypeScript, React/Angular, Node/NestJS',
            summary:
              'Créer des sites et des applications qui s’utilisent dans un navigateur : l’interface que l’on voit (frontend) et souvent le serveur qui l’alimente (backend).',
            fit: 'Tu aimes voir vite le résultat de ton travail et construire des choses que tout le monde peut ouvrir avec un simple lien.',
            firstSteps: [
              'Revoir HTML, CSS et JavaScript',
              'Passer à TypeScript',
              'Apprendre React ou Angular',
              'Créer une petite API avec Node ou NestJS',
            ],
          },
          {
            id: 'backend',
            label: 'Backend',
            stack: 'Java/Spring Boot ou Go',
            summary:
              'Construire ce que l’utilisateur ne voit pas : les API, les règles métier et les bases de données, avec de fortes exigences de fiabilité, de sécurité et de performance.',
            fit: 'Tu préfères la logique et l’architecture à l’apparence, et tu aimes comprendre comment un système tient la charge.',
            firstSteps: [
              'Choisir Java avec Spring Boot, ou Go',
              'Écrire une API REST',
              'La connecter à une base de données SQL',
              'La tester, puis la déployer avec Docker',
            ],
          },
          {
            id: 'data-ia',
            label: 'Data/IA',
            stack: 'Python',
            summary:
              'Analyser des données, entraîner des modèles et intégrer l’IA dans des applications. Ce domaine demande plus de mathématiques et de statistiques que les autres.',
            fit: 'Tu aimes les chiffres, l’expérimentation et chercher des réponses dans les données.',
            firstSteps: [
              'Manipuler des données avec Python, NumPy et pandas',
              'Interroger une base de données en SQL',
              'Revoir les bases des statistiques',
              'Entraîner un premier modèle avec scikit-learn',
            ],
          },
          {
            id: 'mobile',
            label: 'Mobile',
            stack: 'Flutter ou React Native',
            summary:
              'Créer des applications pour téléphone, souvent avec un seul code pour Android et iOS. Il faut composer avec les petits écrans, le mode hors ligne et la publication sur les stores.',
            fit: 'Tu veux créer des applications que l’on garde dans sa poche et soigner l’expérience tactile.',
            firstSteps: [
              'Choisir Flutter (Dart) ou React Native (TypeScript)',
              'Créer des écrans et la navigation entre eux',
              'Appeler une API et stocker des données sur le téléphone',
              'Tester l’application sur un vrai téléphone',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Apprendre par projets',
    description: 'La théorie seule ne suffit pas, mets en pratique.',
    tag: 'Pratique',
    accent: 'fuchsia',
    tasks: [
      { id: 'projet-1', label: 'Publier un premier projet sur GitHub' },
      { id: 'projet-2', label: 'Publier un deuxième projet sur GitHub' },
    ],
    details: [
      {
        subtitle: 'Conseil',
        text: 'Réaliser 2-3 petits projets concrets, publiés sur GitHub, en parallèle de l’algo plutôt que de suivre des tutoriels passivement.',
      },
    ],
  },
  {
    id: 5,
    title: 'Miser sur les fondamentaux durables',
    description:
      'Des compétences qui resteront utiles peu importe ta spécialisation.',
    tag: 'Durabilité',
    accent: 'amber',
    tasks: [
      { id: 'durable-sql', label: 'Bases de données (SQL)' },
      { id: 'durable-api', label: 'Conception d’API' },
      { id: 'durable-tests', label: 'Tests' },
      { id: 'durable-securite', label: 'Sécurité' },
    ],
    details: [
      {
        subtitle: 'Ressources',
        text: 'Des leçons interactives pour pratiquer le SQL dans le navigateur.',
        links: [{ label: 'SQLBolt', url: 'https://sqlbolt.com/' }],
      },
    ],
  },
] as const satisfies readonly RoadmapStep[]

export const principles = [
  {
    id: 'ia',
    accent: 'rose',
    title: 'Utiliser l’IA intelligemment',
    text: 'Les assistants de code (Claude, Copilot…) sont désormais un outil du métier. S’en servir pour apprendre et gagner du temps, mais toujours comprendre, relire et tester le code produit.',
  },
  {
    id: 'regularite',
    accent: 'emerald',
    title: 'Être régulier',
    text: '45 minutes par jour valent mieux qu’un marathon le week-end.',
  },
] as const satisfies readonly Principle[]
