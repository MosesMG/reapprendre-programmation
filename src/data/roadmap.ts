import type { RoadmapStep } from '../types/roadmap'

export const roadmapSteps = [
  {
    id: 1,
    title: 'Renforcer l’algorithmique',
    description:
      'Concentre-toi sur la logique algorithmique, c’est la base la plus importante.',
    tag: 'Priorité',
    accent: 'sky',
    details: [
      {
        subtitle: 'Ordre conseillé',
        text: 'Logique de base (conditions, boucles, fonctions), structures de données (tableaux, dictionnaires, piles, files), récursivité, tris et recherches, notion de complexité, puis arbres et graphes.',
      },
      {
        subtitle: 'Pratique',
        text: '1 à 2 exercices par jour sur Exercism, Codewars ou LeetCode (niveau easy), en résolvant d’abord sur papier.',
      },
      {
        subtitle: 'Ressources',
        text: 'Se servir des documentations officielles et des tutoriels en ligne.',
      },
    ],
  },
  {
    id: 2,
    title: 'Refaire les bases',
    description: 'Se remettre sur un langage et les outils indispensables.',
    tag: 'Fondations',
    accent: 'indigo',
    details: [
      {
        subtitle: 'Langage polyvalent',
        text: 'Choisir Python ou TypeScript pour pratiquer l’algo.',
      },
      {
        subtitle: 'Outils',
        text: 'Se remettre à Git et au terminal.',
      },
    ],
  },
  {
    id: 3,
    title: 'Choisir une direction',
    description: 'Définis ton objectif pour orienter ton apprentissage.',
    tag: 'Cap',
    accent: 'violet',
    details: [
      {
        subtitle: 'Possibilités',
        list: [
          'Web : TypeScript, React/Angular, Node/NestJS',
          'Backend : Java/Spring Boot ou Go',
          'Data/IA : Python',
          'Mobile : Flutter ou React Native',
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
    details: [
      {
        subtitle: 'Conseil',
        text: 'Réaliser 2-3 petits projets concrets, publiés sur GitHub, en parallèle de l’algo plutôt que de suivre des tutoriels passivement.',
      },
    ],
  },
  {
    id: 5,
    title: 'Utiliser l’IA intelligemment',
    description: 'Un outil du métier à maîtriser avec discernement.',
    tag: 'Méthode',
    accent: 'rose',
    details: [
      {
        subtitle: 'Bonne pratique',
        text: 'Les assistants de code (Claude, Copilot…) sont désormais un outil du métier. S’en servir pour apprendre et gagner du temps, mais toujours comprendre, relire et tester le code produit.',
      },
    ],
  },
  {
    id: 6,
    title: 'Miser sur les fondamentaux durables',
    description:
      'Des compétences qui resteront utiles peu importe ta spécialisation.',
    tag: 'Durabilité',
    accent: 'amber',
    details: [
      {
        subtitle: 'À apprendre',
        text: 'Bases de données (SQL), conception d’API, tests, sécurité.',
      },
    ],
  },
  {
    id: 7,
    title: 'Être régulier',
    description: 'La constance bat l’intensité.',
    tag: 'Régularité',
    accent: 'emerald',
    details: [
      {
        subtitle: 'Règle d’or',
        text: '45 minutes par jour valent mieux qu’un marathon le week-end.',
      },
    ],
  },
] as const satisfies readonly RoadmapStep[]
