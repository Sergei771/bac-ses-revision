import Link from "next/link";
import { ArrowRight, BookOpen, Vote, Building, FileText, Users2 } from "lucide-react";

const topics = [
  {
    id: "pouvoir-politique",
    title: "Pouvoir politique et citoyenneté",
    description: "Légitimité du pouvoir, formes de pouvoir, citoyenneté...",
    icon: <Vote className="h-6 w-6" />,
    chapters: [
      { title: "La légitimité du pouvoir politique", slug: "legitimite-pouvoir" },
      { title: "Les différentes formes de pouvoir", slug: "formes-pouvoir" },
      { title: "La citoyenneté : droits et devoirs", slug: "citoyennete-droits-devoirs" },
      { title: "L'évolution de la citoyenneté", slug: "evolution-citoyennete" },
    ],
  },
  {
    id: "etat-democratie",
    title: "État et démocratisation",
    description: "Formes d'État, démocratie représentative, démocratie participative...",
    icon: <Building className="h-6 w-6" />,
    chapters: [
      { title: "L'État : définition et évolution", slug: "definition-evolution" },
      { title: "Les régimes démocratiques", slug: "regimes-democratiques" },
      { title: "Les processus de démocratisation", slug: "processus-democratisation" },
      { title: "Les limites de la démocratie", slug: "limites-democratie" },
    ],
  },
  {
    id: "action-publique",
    title: "Action publique",
    description: "Politiques publiques, gouvernance, évaluation des politiques...",
    icon: <FileText className="h-6 w-6" />,
    chapters: [
      { title: "L'élaboration des politiques publiques", slug: "elaboration-politiques" },
      { title: "La mise en œuvre de l'action publique", slug: "mise-en-oeuvre" },
      { title: "L'évaluation des politiques publiques", slug: "evaluation-politiques" },
      { title: "La gouvernance multi-niveaux", slug: "gouvernance-multi-niveaux" },
    ],
  },
  {
    id: "participation",
    title: "Participation politique",
    description: "Comportement électoral, abstention, nouvelles formes de participation...",
    icon: <Users2 className="h-6 w-6" />,
    chapters: [
      { title: "Le comportement électoral", slug: "comportement-electoral" },
      { title: "L'abstention et ses déterminants", slug: "abstention-determinants" },
      { title: "Les nouvelles formes de participation", slug: "nouvelles-formes" },
      { title: "Les mouvements sociaux", slug: "mouvements-sociaux" },
    ],
  },
];

export default function SciencePolitiquePage() {
  return (
    <div className="max-w-7xl mx-auto">
      <section className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-politic-red mb-2">Science Politique</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Tous les concepts de science politique essentiels pour le BAC SES
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {topics.map((topic) => (
          <div key={topic.id} className="card border-l-4 border-politic-red">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-md mr-3 text-politic-red">
                {topic.icon}
              </div>
              <h2 className="text-2xl font-bold">{topic.title}</h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {topic.description}
            </p>
            
            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-politic-red">Chapitres principaux :</h3>
              <ul className="space-y-2">
                {topic.chapters.map((chapter) => (
                  <li key={chapter.slug}>
                    <Link 
                      href={`/science-politique/${topic.id}/${chapter.slug}`}
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-politic-red dark:hover:text-politic-red"
                    >
                      <BookOpen className="h-4 w-4 mr-2 text-politic-red opacity-70" />
                      {chapter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-end">
              <Link 
                href={`/science-politique/${topic.id}`}
                className="flex items-center text-politic-red font-medium group"
              >
                Explorer ce module
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <section className="mb-8">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-politic-red mb-4">Sujets de dissertation</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Préparez-vous à l&apos;épreuve du BAC avec des sujets de dissertation guidés et des plans détaillés.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <Link 
              href="/science-politique/dissertations/democratie-representation"
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-politic-red mb-1">La démocratie représentative</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Est-elle en crise ?
              </p>
            </Link>
            <Link 
              href="/science-politique/dissertations/etat-providence"
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-politic-red mb-1">L&apos;État-providence</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Évolution et enjeux contemporains
              </p>
            </Link>
            <Link 
              href="/science-politique/dissertations/engagement-politique"
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-politic-red mb-1">L&apos;engagement politique</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nouvelles formes et nouveaux enjeux
              </p>
            </Link>
          </div>
          <div className="flex justify-end">
            <Link 
              href="/science-politique/dissertations"
              className="flex items-center text-politic-red font-medium group"
            >
              Voir tous les sujets
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
