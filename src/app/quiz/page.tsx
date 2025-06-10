"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  BookOpen, Users, Vote, Activity, ShieldCheck, ShoppingCart, AlertTriangle, 
  LayoutGrid, Globe, Link2, BarChart3, Briefcase, Building, LineChart, 
  Microscope, Share2, Smartphone, Search, FilterIcon, CheckCircle, Star
} from "lucide-react";

// Simplified Quiz type for this page's needs
type Quiz = {
  id: string;
  title: string;
  category: "economie" | "sociologie" | "science-politique";
  difficulty: "facile" | "moyen" | "difficile";
  questionsCount: number;
  estimatedTime: string;
  slug: string;
  description?: string;
  icon?: React.ElementType; // Per-quiz icon override
  isNew?: boolean;
};

// Mise à jour de la liste des quiz
const allQuizzes: Quiz[] = [
  // Économie
  { id: "eco_marche_prix", title: "Le marché et la formation des prix", category: "economie", difficulty: "moyen", questionsCount: 15, estimatedTime: "20 min", slug: "marche-prix", icon: ShoppingCart, description: "Comprendre les mécanismes de formation des prix et l'équilibre du marché" },
  { id: "eco_croissance", title: "La croissance économique", category: "economie", difficulty: "moyen", questionsCount: 15, estimatedTime: "20 min", slug: "croissance-economique", icon: LineChart, description: "Mesurer et analyser les facteurs de la croissance économique" },
  { id: "eco_defaillances_marche", title: "Les défaillances du marché", category: "economie", difficulty: "difficile", questionsCount: 15, estimatedTime: "20 min", slug: "defaillances-marche", icon: AlertTriangle, description: "Identifier les situations où le marché ne parvient pas à une allocation optimale des ressources" },
  { id: "eco_concurrence", title: "Concurrence parfaite et imparfaite", category: "economie", difficulty: "moyen", questionsCount: 15, estimatedTime: "20 min", slug: "concurrence", icon: LayoutGrid, description: "Distinguer les différentes structures de marché et leurs impacts" },
  { id: "eco_comportement_consommateur", title: "Le comportement du consommateur", category: "economie", difficulty: "facile", questionsCount: 15, estimatedTime: "20 min", slug: "comportement-consommateur", icon: ShoppingCart, description: "Analyser les choix des consommateurs et la maximisation de l'utilité" },
  { id: "eco_politique_budgetaire", title: "La politique budgétaire", category: "economie", difficulty: "difficile", questionsCount: 15, estimatedTime: "20 min", slug: "politique-budgetaire", icon: Briefcase, description: "Comprendre les outils et les effets de la politique budgétaire" },
  { id: "eco_politique_monetaire", title: "La politique monétaire", category: "economie", difficulty: "difficile", questionsCount: 15, estimatedTime: "20 min", slug: "politique-monetaire", icon: Building, description: "Analyser les actions des banques centrales et leurs impacts économiques" },
  { id: "eco_politiques_emploi", title: "Les politiques de l'emploi", category: "economie", difficulty: "moyen", questionsCount: 12, estimatedTime: "18 min", slug: "politiques-emploi", icon: Briefcase, description: "Comprendre les mesures visant à réduire le chômage et créer des emplois" },
  { id: "eco_regulation_economique", title: "La régulation économique", category: "economie", difficulty: "moyen", questionsCount: 12, estimatedTime: "18 min", slug: "regulation-economique", icon: ShieldCheck, description: "Analyser le rôle de l'État dans la régulation de l'économie" },
  { id: "eco_fondements_commerce", title: "Les fondements du commerce international", category: "economie", difficulty: "moyen", questionsCount: 15, estimatedTime: "20 min", slug: "fondements-commerce", icon: Globe, description: "Comprendre les théories et les avantages du commerce international" },
  { id: "eco_firmes_multinationales", title: "Les firmes multinationales", category: "economie", difficulty: "moyen", questionsCount: 15, estimatedTime: "20 min", slug: "firmes-multinationales", icon: Building, description: "Analyser le rôle et l'impact des entreprises multinationales" },
  { id: "eco_globalisation_financiere", title: "La globalisation financière", category: "economie", difficulty: "difficile", questionsCount: 15, estimatedTime: "25 min", slug: "globalisation-financiere", icon: Globe, description: "Comprendre l'intégration des marchés financiers à l'échelle mondiale" },
  { id: "eco_desequilibres_mondiaux", title: "Les déséquilibres mondiaux", category: "economie", difficulty: "difficile", questionsCount: 15, estimatedTime: "25 min", slug: "desequilibres-mondiaux", icon: BarChart3, description: "Analyser les inégalités et les déséquilibres économiques entre pays" },
  { id: "eco_politiques_stabilisation", title: "Les Politiques de Stabilisation", category: "economie", difficulty: "difficile", questionsCount: 15, estimatedTime: "20 min", slug: "politiques-stabilisation", icon: ShieldCheck, description: "Comprendre les outils pour réduire les fluctuations économiques" },
  { id: "eco_chomage_inflation", title: "Chômage et inflation", category: "economie", difficulty: "moyen", questionsCount: 15, estimatedTime: "20 min", slug: "chomage-inflation", icon: Users, description: "Analyser les causes et conséquences du chômage et de l'inflation" },
  { id: "eco_fluctuations", title: "Les Fluctuations Économiques", category: "economie", difficulty: "moyen", questionsCount: 15, estimatedTime: "20 min", slug: "fluctuations", icon: Activity, description: "Comprendre les cycles économiques et leurs déterminants" },
  
  // Sociologie
  { id: "socio_definition_typologie_groupes", title: "Groupes Sociaux - Définition et Typologie", category: "sociologie", difficulty: "facile", questionsCount: 10, estimatedTime: "15 min", slug: "groupes-sociaux/definition-typologie", icon: Users, description: "Identifier les différents types de groupes sociaux" },
  { id: "socio_reseaux_capital_social", title: "Réseaux Sociaux et Capital Social", category: "sociologie", difficulty: "moyen", questionsCount: 10, estimatedTime: "15 min", slug: "groupes-sociaux/reseaux-capital-social", icon: Share2, description: "Comprendre la notion de capital social et son importance" },
  { id: "socio_sociabilite_numerique", title: "La Sociabilité Numérique", category: "sociologie", difficulty: "facile", questionsCount: 10, estimatedTime: "15 min", slug: "groupes-sociaux/sociabilite-numerique", icon: Smartphone, description: "Analyser l'impact des technologies numériques sur les liens sociaux" },
  { id: "socio_lien_social_integration", title: "Lien Social et Intégration", category: "sociologie", difficulty: "moyen", questionsCount: 10, estimatedTime: "15 min", slug: "lien-social-integration", icon: Link2, description: "Comprendre les mécanismes d'intégration et de cohésion sociale" },
  { id: "socio_instances_socialisation", title: "Les Instances de Socialisation", category: "sociologie", difficulty: "facile", questionsCount: 10, estimatedTime: "15 min", slug: "instances-socialisation", icon: Users, description: "Identifier les différentes instances de socialisation et leur rôle" },
  { id: "socio_socialisation_primaire_secondaire", title: "Socialisation Primaire et Secondaire", category: "sociologie", difficulty: "facile", questionsCount: 10, estimatedTime: "15 min", slug: "socialisation-primaire-secondaire", icon: Users, description: "Distinguer les différentes phases de la socialisation" },
  { id: "socio_classes_sociales", title: "Les Classes Sociales", category: "sociologie", difficulty: "moyen", questionsCount: 15, estimatedTime: "20 min", slug: "classes-sociales", icon: Users, description: "Comprendre les théories de la stratification sociale" },
  { id: "socio_normes_deviance", title: "Normes et Déviance", category: "sociologie", difficulty: "moyen", questionsCount: 10, estimatedTime: "15 min", slug: "controle-social-deviance/normes-deviance", icon: AlertTriangle, description: "Analyser la construction sociale des normes et de la déviance", isNew: true },
  { id: "socio_formes_controle_social", title: "Les Formes du Contrôle Social", category: "sociologie", difficulty: "moyen", questionsCount: 10, estimatedTime: "15 min", slug: "controle-social-deviance/formes-controle-social", icon: ShieldCheck, description: "Comprendre les différents mécanismes de régulation sociale" },
  { id: "socio_diversite_socialisation", title: "La Diversité des Processus de Socialisation", category: "sociologie", difficulty: "moyen", questionsCount: 10, estimatedTime: "15 min", slug: "diversite-socialisation", icon: Users, description: "Analyser la variété des parcours de socialisation" },
  
  // Science Politique
  { id: "pol_action_publique", title: "L'Action Publique", category: "science-politique", difficulty: "difficile", questionsCount: 15, estimatedTime: "20 min", slug: "action-publique", icon: Vote, description: "Comprendre les mécanismes d'élaboration et de mise en œuvre des politiques publiques" },
  { id: "pol_democratie", title: "La Démocratie", category: "science-politique", difficulty: "moyen", questionsCount: 15, estimatedTime: "20 min", slug: "democratie", icon: Vote, description: "Analyser les principes et les enjeux des régimes démocratiques", isNew: true },
  { id: "pol_pouvoir_politique", title: "Le Pouvoir Politique", category: "science-politique", difficulty: "difficile", questionsCount: 15, estimatedTime: "20 min", slug: "pouvoir-politique", icon: Vote, description: "Comprendre la nature et les formes du pouvoir politique", isNew: true },
];

interface CategoryUIDetail {
  name: string;
  Icon: React.ElementType;
  quizPath: string;
  accentBarClass: string;
  iconTextClass: string;
  bgClass: string;
  buttonClasses: string; // Includes bg, hover, and focus ring
  titleTextClass: string;
  badgeClass: string;
}

const categoryUIDetails: Record<Quiz['category'], CategoryUIDetail> = {
  economie: {
    name: "Économie",
    Icon: BookOpen,
    quizPath: "/quiz/economie/",
    accentBarClass: "bg-eco-blue",
    iconTextClass: "text-eco-blue",
    bgClass: "bg-blue-50 dark:bg-blue-900/20",
    buttonClasses: "bg-eco-blue hover:bg-eco-blue/80 focus:ring-4 focus:ring-eco-blue/50 dark:focus:ring-eco-blue/70",
    titleTextClass: "text-eco-blue dark:text-eco-blue/90",
    badgeClass: "bg-eco-blue/10 text-eco-blue dark:bg-eco-blue/20 dark:text-eco-blue/90"
  },
  sociologie: {
    name: "Sociologie",
    Icon: Users,
    quizPath: "/quiz/sociologie/",
    accentBarClass: "bg-socio-purple",
    iconTextClass: "text-socio-purple",
    bgClass: "bg-purple-50 dark:bg-purple-900/20",
    buttonClasses: "bg-socio-purple hover:bg-socio-purple/80 focus:ring-4 focus:ring-socio-purple/50 dark:focus:ring-socio-purple/70",
    titleTextClass: "text-socio-purple dark:text-socio-purple/90",
    badgeClass: "bg-socio-purple/10 text-socio-purple dark:bg-socio-purple/20 dark:text-socio-purple/90"
   },
  "science-politique": {
    name: "Science Politique",
    Icon: Vote,
    quizPath: "/quiz/science-politique/",
    accentBarClass: "bg-politic-red",
    iconTextClass: "text-politic-red",
    bgClass: "bg-red-50 dark:bg-red-900/20",
    buttonClasses: "bg-politic-red hover:bg-politic-red/80 focus:ring-4 focus:ring-politic-red/50 dark:focus:ring-politic-red/70",
    titleTextClass: "text-politic-red dark:text-politic-red/90",
    badgeClass: "bg-politic-red/10 text-politic-red dark:bg-politic-red/20 dark:text-politic-red/90"
   },
};

const difficultyLabels = {
  facile: { label: "Facile", icon: null, className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  moyen: { label: "Moyen", icon: null, className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  difficile: { label: "Difficile", icon: null, className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" }
};

export default function QuizPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("tous");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("tous");
  const [displayedQuizzes, setDisplayedQuizzes] = useState(allQuizzes);

  // Filtrer les quiz en fonction des critères
  useEffect(() => {
    const filteredQuizzes = allQuizzes.filter(quiz => {
      const matchesSearch = searchTerm === "" || 
                          quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (quiz.description && quiz.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "tous" || quiz.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "tous" || quiz.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
    
    setDisplayedQuizzes(filteredQuizzes);
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const quizzesByCat = displayedQuizzes.reduce((acc, quiz) => {
    if (!acc[quiz.category]) {
      acc[quiz.category] = [];
    }
    acc[quiz.category].push(quiz);
    return acc;
  }, {} as Record<Quiz['category'], Quiz[]>);

  const orderedCategories: Quiz['category'][] = ["economie", "sociologie", "science-politique"];

  // Comptage des quiz par catégorie pour l'affichage des badges
  const quizCounts = allQuizzes.reduce((acc, quiz) => {
    acc[quiz.category] = (acc[quiz.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Animation pour les éléments qui apparaissent
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Testez vos connaissances
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 sm:mt-4 max-w-2xl mx-auto">
          Quiz interactifs pour réviser les concepts clés du programme de SES du Baccalauréat
        </p>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border-gray-300 bg-gray-50 pl-10 pr-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Rechercher un quiz..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="min-w-[180px]">
              <label htmlFor="category-filter" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Catégorie
              </label>
              <select
                id="category-filter"
                className="block w-full rounded-lg border-gray-300 bg-gray-50 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="tous">Toutes les catégories</option>
                <option value="economie">Économie</option>
                <option value="sociologie">Sociologie</option>
                <option value="science-politique">Science Politique</option>
              </select>
            </div>
            <div className="min-w-[180px]">
              <label htmlFor="difficulty-filter" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Difficulté
              </label>
              <select
                id="difficulty-filter"
                className="block w-full rounded-lg border-gray-300 bg-gray-50 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="tous">Toutes les difficultés</option>
                <option value="facile">Facile</option>
                <option value="moyen">Moyen</option>
                <option value="difficile">Difficile</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistiques des quiz */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <span className="font-medium">Total : </span>
            <span>{allQuizzes.length} quiz</span>
          </div>
          {Object.entries(quizCounts).map(([category, count]) => {
            const uiDetails = categoryUIDetails[category as Quiz['category']];
            return (
              <div 
                key={category} 
                className={`px-4 py-2 rounded-lg ${uiDetails.bgClass}`}
              >
                <span className="font-medium">{uiDetails.name} : </span>
                <span>{count} quiz</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {displayedQuizzes.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-gray-100 dark:bg-gray-700">
            <Search className="h-8 w-8 text-gray-500 dark:text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Aucun quiz ne correspond à votre recherche</h2>
          <p className="text-gray-600 dark:text-gray-400">Essayez de modifier vos critères de recherche</p>
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {orderedCategories.map((categoryKey) => {
            const quizzesInCategory = quizzesByCat[categoryKey] || [];
            if (quizzesInCategory.length === 0) return null;

            const uiDetails = categoryUIDetails[categoryKey];
            const CategoryTitleIcon = uiDetails.Icon;

            return (
              <motion.section 
                key={categoryKey} 
                variants={itemVariants}
                aria-labelledby={`${categoryKey}-title`}
              >
                <div className="mb-8 flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${uiDetails.bgClass}`}>
                    <CategoryTitleIcon className={`h-8 w-8 ${uiDetails.iconTextClass}`} />
                  </div>
                  <h2 id={`${categoryKey}-title`} className={`text-3xl font-semibold ${uiDetails.titleTextClass}`}>
                    {uiDetails.name}
                  </h2>
                  <span className={`ml-2 px-3 py-1 text-sm font-medium rounded-full ${uiDetails.badgeClass}`}>
                    {quizzesInCategory.length} quiz
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {quizzesInCategory.map((quiz) => {
                    const QuizCardIcon = quiz.icon || uiDetails.Icon; // Use quiz-specific icon or category default
                    const quizLinkPath = `${uiDetails.quizPath}${quiz.slug}`;
                    const difficultyInfo = difficultyLabels[quiz.difficulty];

                    return (
                      <motion.div
                        key={quiz.id}
                        variants={itemVariants}
                        className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 hover:-translate-y-1 relative"
                      >
                        {quiz.isNew && (
                          <div className="absolute top-3 right-3 z-10">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                              Nouveau
                            </span>
                          </div>
                        )}
                        <div className={`h-2 ${uiDetails.accentBarClass}`}></div>
                        <div className="flex flex-col flex-grow p-6">
                          <div className="mb-4 flex items-center justify-start">
                             <QuizCardIcon className={`h-10 w-10 ${uiDetails.iconTextClass}`} />
                          </div>
                          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600">
                            {quiz.title}
                          </h3>
                          {quiz.description && (
                            <p className="mb-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                              {quiz.description}
                            </p>
                          )}
                          <div className="mb-4 flex flex-wrap gap-2">
                            <span className={`px-2.5 py-0.5 text-xs rounded-full ${difficultyInfo.className}`}>
                              {difficultyInfo.label}
                            </span>
                            <span className="px-2.5 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              {quiz.questionsCount} questions
                            </span>
                            <span className="px-2.5 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              {quiz.estimatedTime}
                            </span>
                          </div>
                          <div className="mt-auto">
                            <Link
                              href={quizLinkPath}
                              className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white transition focus:outline-none ${uiDetails.buttonClasses} w-full`}
                            >
                              Commencer le quiz
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
