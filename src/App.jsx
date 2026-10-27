import { useState } from 'react'

const steps = [
  {
    number: 1,
    title: 'Renforcer l’algorithmique (la priorité)',
    description: 'Concentre-toi sur la logique algorithmique, c’est la base la plus importante.',
    details: [
      { subtitle: 'Ordre conseillé', text: 'Logique de base (conditions, boucles, fonctions), structures de données (tableaux, dictionnaires, piles, files), récursivité, tris et recherches, notion de complexité, puis arbres et graphes.' },
      { subtitle: 'Pratique', text: '1 à 2 exercices par jour sur Exercism, Codewars ou LeetCode (niveau easy), en résolvant d’abord sur papier.' },
      { subtitle: 'Ressources', text: 'CS50 (Harvard, gratuit) et le livre Grokking Algorithms.' },
    ],
    accent: 'border-l-blue-500',
  },
  {
    number: 2,
    title: 'Refaire les bases',
    description: 'Se remettre sur un langage et les outils indispensables.',
    details: [
      { subtitle: 'Langage polyvalent', text: 'Choisir Python ou TypeScript pour pratiquer l’algo.' },
      { subtitle: 'Outils', text: 'Se remettre à Git et au terminal.' },
    ],
    accent: 'border-l-indigo-500',
  },
  {
    number: 3,
    title: 'Choisir une direction',
    description: 'Définis ton objectif pour orienter ton apprentissage.',
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
    accent: 'border-l-violet-500',
  },
  {
    number: 4,
    title: 'Apprendre par projets',
    description: 'La théorie seule ne suffit pas, mets en pratique.',
    details: [
      { subtitle: 'Conseil', text: 'Réaliser 2-3 petits projets concrets, publiés sur GitHub, en parallèle de l’algo plutôt que de suivre des tutoriels passivement.' },
    ],
    accent: 'border-l-fuchsia-500',
  },
  {
    number: 5,
    title: 'Utiliser l’IA intelligemment',
    description: 'Un outil du métier à maîtriser avec discernement.',
    details: [
      { subtitle: 'Bonne pratique', text: 'Les assistants de code (Claude, Copilot…) sont désormais un outil du métier. S’en servir pour apprendre et gagner du temps, mais toujours comprendre, relire et tester le code produit.' },
    ],
    accent: 'border-l-rose-500',
  },
  {
    number: 6,
    title: 'Miser sur les fondamentaux durables',
    description: 'Des compétences qui resteront utiles peu importe ta spécialisation.',
    details: [
      { subtitle: 'À apprendre', text: 'Bases de données (SQL), conception d’API, tests, sécurité, Docker.' },
    ],
    accent: 'border-l-orange-500',
  },
  {
    number: 7,
    title: 'Être régulier',
    description: 'La constance bat l’intensité.',
    details: [
      { subtitle: 'Règle d’or', text: '45 minutes par jour valent mieux qu’un marathon le week-end.' },
    ],
    accent: 'border-l-emerald-500',
  },
]

function App() {
  const [activeStep, setActiveStep] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#0b1026] to-slate-950 text-slate-100">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400/10 via-violet-400/5 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              Réapprendre à programmer
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-300 sm:text-xl">
              Un parcours structuré et progressif pour repartir sur de bonnes bases
            </p>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-4xl px-6 pb-16">
        <div className="absolute left-9 top-0 hidden h-full w-px bg-gradient-to-b from-slate-700/40 via-slate-800/30 to-transparent sm:block" />
        <ol className="space-y-4">
          {steps.map((step, index) => {
            const isActive = activeStep === step.number
            return (
              <li key={step.number} className="group relative sm:pl-14" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="absolute left-6 top-6 hidden h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-slate-600/80 bg-gradient-to-br from-slate-900 to-slate-950 text-xs font-medium text-slate-200 shadow-[0_0_0_6px_rgba(59,130,246,0.05)] sm:flex">
                  {step.number}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveStep(isActive ? null : step.number)}
                  className="w-full text-left"
                  aria-expanded={isActive}
                >
                  <article
                    className={`relative overflow-hidden rounded-xl border border-slate-800/80 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-slate-950/60 shadow-[0_20px_80px_-40px_rgba(59,130,246,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-[0_30px_90px_-40px_rgba(99,102,241,0.25)] ${isActive ? 'border-slate-700 bg-slate-900/95 shadow-[0_40px_110px_-50px_rgba(129,140,248,0.28)]' : ''}`}
                  >
                    <div className={`absolute inset-y-0 left-0 w-0.5 ${step.accent}`} />
                    <div className="flex flex-col gap-4 p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 sm:hidden">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 text-xs font-medium text-slate-300">
                              {step.number}
                            </span>
                            <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Étape</span>
                          </div>
                          <h2 className="text-xl font-medium tracking-tight text-slate-100 sm:text-2xl">{step.title}</h2>
                          <p className="text-base text-slate-400">{step.description}</p>
                        </div>
                        <span className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-lg text-slate-400 transition-transform duration-300 ${isActive ? 'rotate-45' : ''}`}>
                          +
                        </span>
                      </div>
                      <div className={`grid transition-all duration-500 ease-out ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <div className="mt-2 space-y-5 border-t border-slate-800/70 pt-5">
                            {step.details.map((detail, idx) => (
                              <div key={idx} className="space-y-2">
                                <h3 className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300/80">
                                  {detail.subtitle}
                                </h3>
                                {detail.text && <p className="max-w-3xl text-base leading-relaxed text-slate-200">{detail.text}</p>}
                                {detail.list && (
                                  <ul className="grid gap-2 sm:grid-cols-2">
                                    {detail.list.map((item, i) => (
                                      <li key={i} className="flex items-start gap-3 rounded-lg border border-slate-800/70 bg-slate-950/40 px-4 py-3 text-sm text-slate-200">
                                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-cyan-400/70" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </button>
              </li>
            )
          })}
        </ol>
      </main>

      <footer className="border-t border-slate-800/60">
        <div className="mx-auto max-w-4xl px-6 py-8 text-center text-sm text-slate-500">
          Clique sur une étape pour afficher ou masquer les détails
        </div>
      </footer>
    </div>
  )
}

export default App

