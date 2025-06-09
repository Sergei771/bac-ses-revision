import Link from "next/link";
import { ArrowRight, BookOpen, Users, Network, Shield, ArrowUpDown } from "lucide-react";

const topics = [
  {
    id: "socialisation",
    title: "Socialisation et lien social",
    description: "Processus de socialisation, instances de socialisation, évolution des liens sociaux...",
    icon: <Users className="h-6 w-6" />,
    chapters: [
      { title: "La socialisation primaire et secondaire", slug: "socialisation-primaire-secondaire" },
      { title: "Les instances de socialisation", slug: "instances-socialisation" },
      { title: "La diversité des processus de socialisation", slug: "diversite-socialisation" },
      { title: "Lien social et intégration", slug: "lien-social-integration" },
    ],
  },
  {
    id: "groupes-sociaux",
    title: "Groupes et réseaux sociaux",
    description: "Groupes sociaux, réseaux, capital social, sociabilité numérique...",
    icon: <Network className="h-6 w-6" />,
    chapters: [
      { title: "Les groupes sociaux : définition et typologie", slug: "definition-typologie" },
      { title: "Les réseaux sociaux et le capital social", slug: "reseaux-capital-social" },
      { title: "La sociabilité numérique", slug: "sociabilite-numerique" },
      { title: "L'évolution des formes de sociabilité", slug: "evolution-sociabilite" },
    ],
  },
  {
    id: "controle-social-deviance",
    title: "Contrôle social et déviance",
    description: "Normes sociales, déviance, sanctions, contrôle formel et informel...",
    icon: <Shield className="h-6 w-6" />,
    chapters: [
      { title: "Normes et déviance", slug: "normes-deviance" },
      { title: "Les formes du contrôle social", slug: "formes-controle-social" },
      { title: "La construction sociale de la déviance", slug: "construction-deviance" },
      { title: "Évolution des formes de délinquance", slug: "evolution-delinquance" },
    ],
  },
  {
    id: "stratification",
    title: "Stratification et mobilité sociale",
    description: "Classes sociales, inégalités, reproduction sociale, mobilité...",
    icon: <ArrowUpDown className="h-6 w-6" />,
    chapters: [
      { title: "Les théories des classes sociales", slug: "theories-classes-sociales" },
      { title: "La mesure de la mobilité sociale", slug: "mesure-mobilite" },
      { title: "Les déterminants de la mobilité sociale", slug: "determinants-mobilite" },
      { title: "Évolution de la structure sociale", slug: "evolution-structure-sociale" },
    ],
  },
];

export default function SociologiePage() {
  return (
    <div className="max-w-7xl mx-auto">
      <section className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-socio-purple mb-2">Sociologie</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Tous les concepts sociologiques essentiels pour le BAC SES
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {topics.map((topic) => (
          <div key={topic.id} className="card border-l-4 border-socio-purple">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-md mr-3 text-socio-purple">
                {topic.icon}
              </div>
              <h2 className="text-2xl font-bold">{topic.title}</h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {topic.description}
            </p>
            
            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-socio-purple">Chapitres principaux :</h3>
              <ul className="space-y-2">
                {topic.chapters.map((chapter) => (
                  <li key={chapter.slug}>
                    <Link 
                      href={`/sociologie/${topic.id}/${chapter.slug}`}
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-socio-purple dark:hover:text-socio-purple"
                    >
                      <BookOpen className="h-4 w-4 mr-2 text-socio-purple opacity-70" />
                      {chapter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-end">
              <Link 
                href={`/sociologie/${topic.id}`}
                className="flex items-center text-socio-purple font-medium group"
              >
                Explorer ce module
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <section className="mb-8">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-socio-purple mb-4">Concepts sociologiques clés</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Maîtrisez les concepts fondamentaux de la sociologie à travers des exemples concrets et des études de cas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <Link 
              href="/sociologie/concepts/reproduction-sociale"
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-socio-purple mb-1">Reproduction sociale</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Les mécanismes de transmission des inégalités
              </p>
            </Link>
            <Link 
              href="/sociologie/concepts/capital-culturel"
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-socio-purple mb-1">Capital culturel</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                L&apos;approche de Pierre Bourdieu
              </p>
            </Link>
            <Link 
              href="/sociologie/concepts/anomie"
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-socio-purple mb-1">Anomie</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Le concept d&apos;Émile Durkheim
              </p>
            </Link>
          </div>
          <div className="flex justify-end">
            <Link 
              href="/sociologie/concepts"
              className="flex items-center text-socio-purple font-medium group"
            >
              Voir tous les concepts
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
