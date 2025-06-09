"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Users, Vote, Activity, ShieldCheck, ShoppingCart, AlertTriangle, LayoutGrid, Globe, Link2, BarChart3, Briefcase, Building, LineChart, Microscope, Share2, Smartphone } from "lucide-react";

// Simplified Quiz type for this page's needs
type Quiz = {
  id: string;
  title: string;
  category: "economie" | "sociologie" | "science-politique";
  questionsCount: number;
  estimatedTime: string;
  slug: string;
  icon?: React.ElementType; // Per-quiz icon override
};

// Final, corrected list of quizzes
const allQuizzes: Quiz[] = [
  // Économie
  { id: "eco_marche_prix", title: "Le marché et la formation des prix", category: "economie", questionsCount: 15, estimatedTime: "20 min", slug: "marche-prix", icon: ShoppingCart },
  { id: "eco_croissance", title: "La croissance économique", category: "economie", questionsCount: 15, estimatedTime: "20 min", slug: "croissance-economique", icon: LineChart },
  { id: "eco_defaillances_marche", title: "Les défaillances du marché", category: "economie", questionsCount: 15, estimatedTime: "20 min", slug: "defaillances-marche", icon: AlertTriangle },
  { id: "eco_concurrence", title: "Concurrence parfaite et imparfaite", category: "economie", questionsCount: 15, estimatedTime: "20 min", slug: "concurrence", icon: LayoutGrid },
  { id: "eco_comportement_consommateur", title: "Le comportement du consommateur", category: "economie", questionsCount: 15, estimatedTime: "20 min", slug: "comportement-consommateur", icon: ShoppingCart },
  { id: "eco_politique_budgetaire", title: "La politique budgétaire", category: "economie", questionsCount: 15, estimatedTime: "20 min", slug: "politique-budgetaire", icon: Briefcase },
  { id: "eco_politique_monetaire", title: "La politique monétaire", category: "economie", questionsCount: 15, estimatedTime: "20 min", slug: "politique-monetaire", icon: Building },
  { id: "eco_politiques_emploi", title: "Les politiques de l'emploi", category: "economie", questionsCount: 12, estimatedTime: "18 min", slug: "politiques-emploi", icon: Briefcase },
  { id: "eco_regulation_economique", title: "La régulation économique", category: "economie", questionsCount: 12, estimatedTime: "18 min", slug: "regulation-economique", icon: ShieldCheck },
  { id: "eco_fondements_commerce", title: "Les fondements du commerce international", category: "economie", questionsCount: 15, estimatedTime: "20 min", slug: "fondements-commerce", icon: Globe },
  { id: "eco_firmes_multinationales", title: "Les firmes multinationales", category: "economie", questionsCount: 15, estimatedTime: "20 min", slug: "firmes-multinationales", icon: Building },
  { id: "eco_globalisation_financiere", title: "La globalisation financière", category: "economie", questionsCount: 15, estimatedTime: "25 min", slug: "globalisation-financiere", icon: Globe },
  { id: "eco_desequilibres_mondiaux", title: "Les déséquilibres mondiaux", category: "economie", questionsCount: 15, estimatedTime: "25 min", slug: "desequilibres-mondiaux", icon: BarChart3 },
  { id: "eco_politiques_stabilisation", title: "Les Politiques de Stabilisation", category: "economie", questionsCount: 15, estimatedTime: "20 min", slug: "politiques-stabilisation", icon: ShieldCheck },
  { id: "eco_chomage_inflation", title: "Chômage et inflation", category: "economie", questionsCount: 15, estimatedTime: "20 min", slug: "chomage-inflation", icon: Users },
  { id: "eco_fluctuations", title: "Les Fluctuations Économiques", category: "economie", questionsCount: 15, estimatedTime: "20 min", slug: "fluctuations", icon: Activity },
  // Sociologie (Removed diversite-socialisation and comment-socialisation)
  { id: "socio_definition_typologie_groupes", title: "Groupes Sociaux - Définition et Typologie", category: "sociologie", questionsCount: 10, estimatedTime: "15 min", slug: "groupes-sociaux/definition-typologie", icon: Users },
  { id: "socio_reseaux_capital_social", title: "Réseaux Sociaux et Capital Social", category: "sociologie", questionsCount: 10, estimatedTime: "15 min", slug: "groupes-sociaux/reseaux-capital-social", icon: Share2 },
  { id: "socio_sociabilite_numerique", title: "La Sociabilité Numérique", category: "sociologie", questionsCount: 10, estimatedTime: "15 min", slug: "groupes-sociaux/sociabilite-numerique", icon: Smartphone },
  { id: "socio_lien_social_integration", title: "Lien Social et Intégration", category: "sociologie", questionsCount: 10, estimatedTime: "15 min", slug: "lien-social-integration", icon: Link2 },
  { id: "socio_instances_socialisation", title: "Les Instances de Socialisation", category: "sociologie", questionsCount: 10, estimatedTime: "15 min", slug: "instances-socialisation", icon: Users },
  { id: "socio_socialisation_primaire_secondaire", title: "Socialisation Primaire et Secondaire", category: "sociologie", questionsCount: 10, estimatedTime: "15 min", slug: "socialisation-primaire-secondaire", icon: Users },
  { id: "socio_classes_sociales", title: "Les Classes Sociales", category: "sociologie", questionsCount: 15, estimatedTime: "20 min", slug: "classes-sociales", icon: Users },
  { id: "socio_formes_controle_social", title: "Les Formes du Contrôle Social", category: "sociologie", questionsCount: 10, estimatedTime: "15 min", slug: "controle-social-deviance/formes-controle-social", icon: ShieldCheck },
  // Science Politique
  { id: "pol_action_publique", title: "L'Action Publique", category: "science-politique", questionsCount: 15, estimatedTime: "20 min", slug: "action-publique", icon: Vote },
];

interface CategoryUIDetail {
  name: string;
  Icon: React.ElementType;
  quizPath: string;
  accentBarClass: string;
  iconTextClass: string;
  buttonClasses: string; // Includes bg, hover, and focus ring
  titleTextClass: string;
}

const categoryUIDetails: Record<Quiz['category'], CategoryUIDetail> = {
  economie: {
    name: "Économie",
    Icon: BookOpen,
    quizPath: "/quiz/economie/",
    accentBarClass: "bg-eco-blue",
    iconTextClass: "text-eco-blue",
    buttonClasses: "bg-eco-blue hover:bg-eco-dark-blue focus:ring-4 focus:ring-eco-blue/50 dark:focus:ring-eco-blue/70",
    titleTextClass: "text-eco-blue dark:text-eco-light-blue"
  },
  sociologie: {
    name: "Sociologie",
    Icon: Users,
    quizPath: "/quiz/sociologie/",
    accentBarClass: "bg-socio-purple",
    iconTextClass: "text-socio-purple",
    buttonClasses: "bg-socio-purple hover:bg-socio-dark-purple focus:ring-4 focus:ring-socio-purple/50 dark:focus:ring-socio-purple/70",
    titleTextClass: "text-socio-purple dark:text-socio-light-purple"
   },
  "science-politique": {
    name: "Science Politique",
    Icon: Vote,
    quizPath: "/quiz/science-politique/",
    accentBarClass: "bg-politic-red",
    iconTextClass: "text-politic-red",
    buttonClasses: "bg-politic-red hover:bg-politic-dark-red focus:ring-4 focus:ring-politic-red/50 dark:focus:ring-politic-red/70",
    titleTextClass: "text-politic-red dark:text-politic-light-red"
   },
};

export default function QuizPage() {
  const quizzesByCat = allQuizzes.reduce((acc, quiz) => {
    if (!acc[quiz.category]) {
      acc[quiz.category] = [];
    }
    acc[quiz.category].push(quiz);
    return acc;
  }, {} as Record<Quiz['category'], Quiz[]>);

  const orderedCategories: Quiz['category'][] = ["economie", "sociologie", "science-politique"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 md:px-6 lg:py-16"
    >
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Tous les Quiz
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 sm:mt-4">
          Testez vos connaissances dans chaque matière et suivez votre progression.
        </p>
      </header>

      <div className="space-y-16">
        {orderedCategories.map((categoryKey) => {
          const quizzesInCategory = quizzesByCat[categoryKey] || [];
          if (quizzesInCategory.length === 0) return null;

          const uiDetails = categoryUIDetails[categoryKey];
          const CategoryTitleIcon = uiDetails.Icon;

          return (
            <section key={categoryKey} aria-labelledby={`${categoryKey}-title`}>
              <div className="mb-8 flex items-center gap-3">
                <CategoryTitleIcon className={`h-8 w-8 ${uiDetails.iconTextClass}`} />
                <h2 id={`${categoryKey}-title`} className={`text-3xl font-semibold ${uiDetails.titleTextClass}`}>
                  {uiDetails.name}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {quizzesInCategory.map((quiz) => {
                  const QuizCardIcon = quiz.icon || uiDetails.Icon; // Use quiz-specific icon or category default
                  const quizLinkPath = `${uiDetails.quizPath}${quiz.slug}`;

                  return (
                    <motion.div
                      key={quiz.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.random() * 0.2 }}
                      className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 hover:-translate-y-1"
                    >
                      <div className={`h-2 ${uiDetails.accentBarClass}`}></div>
                      <div className="flex flex-col flex-grow p-6">
                        <div className="mb-4 flex items-center justify-start">
                           <QuizCardIcon className={`h-10 w-10 ${uiDetails.iconTextClass}`} />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                          {quiz.title}
                        </h3>
                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                          {quiz.questionsCount} questions
                        </p>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                          Estimé: {quiz.estimatedTime}
                        </p>
                        <div className="mt-auto">
                          <Link
                            href={quizLinkPath}
                            className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white transition focus:outline-none ${uiDetails.buttonClasses}`}
                          >
                            Commencer le quiz
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </motion.div>
  );
}
