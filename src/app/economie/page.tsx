import Link from "next/link";
import { ArrowRight, BookOpen, LineChart, TrendingUp, Briefcase, Globe } from "lucide-react";

const topics = [
  {
    id: "microeconomie",
    title: "Microéconomie",
    description: "Marché, prix, concurrence, comportement des agents économiques...",
    icon: <TrendingUp className="h-6 w-6" />,
    chapters: [
      { title: "Le marché et la formation des prix", slug: "marche-prix" },
      { title: "La concurrence parfaite et imparfaite", slug: "concurrence" },
      { title: "Les défaillances du marché", slug: "defaillances-marche" },
      { title: "Le comportement du consommateur", slug: "comportement-consommateur" },
    ],
  },
  {
    id: "macroeconomie",
    title: "Macroéconomie",
    description: "Croissance, inflation, chômage, politiques économiques...",
    icon: <LineChart className="h-6 w-6" />,
    chapters: [
      { title: "La croissance économique", slug: "croissance-economique" },
      { title: "Les fluctuations économiques", slug: "fluctuations" },
      { title: "Le chômage et l'inflation", slug: "chomage-inflation" },
      { title: "Les politiques de stabilisation", slug: "politiques-stabilisation" },
    ],
  },
  {
    id: "mondialisation",
    title: "Mondialisation",
    description: "Échanges internationaux, commerce mondial, globalisation financière...",
    icon: <Globe className="h-6 w-6" />,
    chapters: [
      { title: "Les fondements du commerce international", slug: "fondements-commerce" },
      { title: "La globalisation financière", slug: "globalisation-financiere" },
      { title: "Les firmes multinationales", slug: "firmes-multinationales" },
      { title: "Les déséquilibres mondiaux", slug: "desequilibres-mondiaux" },
    ],
  },
  {
    id: "politiques-economiques",
    title: "Politiques économiques",
    description: "Politique budgétaire, monétaire, régulation, intervention de l'État...",
    icon: <Briefcase className="h-6 w-6" />,
    chapters: [
      { title: "La politique budgétaire", slug: "politique-budgetaire" },
      { title: "La politique monétaire", slug: "politique-monetaire" },
      { title: "Les politiques de l'emploi", slug: "politiques-emploi" },
      { title: "La régulation économique", slug: "regulation-economique" },
    ],
  },
];

export default function EconomiePage() {
  return (
    <div className="max-w-7xl mx-auto">
      <section className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-eco-blue mb-2">Économie</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Tous les concepts économiques essentiels pour le BAC SES
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {topics.map((topic) => (
          <div key={topic.id} className="card border-l-4 border-eco-blue">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md mr-3 text-eco-blue">
                {topic.icon}
              </div>
              <h2 className="text-2xl font-bold">{topic.title}</h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {topic.description}
            </p>
            
            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-eco-blue">Chapitres principaux :</h3>
              <ul className="space-y-2">
                {topic.chapters.map((chapter) => (
                  <li key={chapter.slug}>
                    <Link 
                      href={`/economie/${topic.id}/${chapter.slug}`}
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-eco-blue dark:hover:text-eco-blue"
                    >
                      <BookOpen className="h-4 w-4 mr-2 text-eco-blue opacity-70" />
                      {chapter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-end">
              <Link 
                href={`/economie/${topic.id}`}
                className="flex items-center text-eco-blue font-medium group"
              >
                Explorer ce module
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <section className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-eco-blue mb-4">Graphiques économiques interactifs</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Explorez les concepts économiques à travers des graphiques interactifs pour mieux comprendre les mécanismes fondamentaux.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <Link 
              href="/economie/graphiques/offre-demande"
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-eco-blue mb-1">Offre et Demande</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comprendre l&apos;équilibre du marché
              </p>
            </Link>
            <Link 
              href="/economie/graphiques/circuit-economique"
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-eco-blue mb-1">Circuit économique</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Les flux entre les agents économiques
              </p>
            </Link>
            <Link 
              href="/economie/graphiques/pib-croissance"
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-eco-blue mb-1">PIB et croissance</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Évolution des indicateurs macroéconomiques
              </p>
            </Link>
          </div>
          <div className="flex justify-end">
            <Link 
              href="/economie/graphiques"
              className="flex items-center text-eco-blue font-medium group"
            >
              Voir tous les graphiques
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
