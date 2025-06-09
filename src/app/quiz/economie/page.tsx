"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Filter, 
  LineChart, 
  Search, 
  Star 
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

type QuizDifficulty = "all" | "facile" | "moyen" | "difficile";
type QuizStatus = "all" | "completed" | "not-completed";

type Quiz = {
  id: string;
  title: string;
  difficulty: "facile" | "moyen" | "difficile";
  questionsCount: number;
  estimatedTime: string;
  slug: string;
  chapter: string;
};

// Liste des quiz d'économie
const economieQuizzes: Quiz[] = [
  {
    id: "marche-prix",
    title: "Le marché et la formation des prix",
    difficulty: "facile",
    questionsCount: 15,
    estimatedTime: "20-25 min",
    slug: "marche-prix",
    chapter: "microeconomie/marche-prix"
  },
  {
    id: "concurrence",
    title: "Concurrence parfaite et imparfaite",
    difficulty: "moyen",
    questionsCount: 15,
    estimatedTime: "20-25 min",
    slug: "concurrence",
    chapter: "microeconomie/concurrence"
  },
  {
    id: "defaillances-marche",
    title: "Les défaillances du marché",
    difficulty: "moyen",
    questionsCount: 15,
    estimatedTime: "20-25 min",
    slug: "defaillances-marche",
    chapter: "microeconomie/defaillances-marche"
  },
  {
    id: "comportement-consommateur",
    title: "Le comportement du consommateur",
    difficulty: "facile",
    questionsCount: 15,
    estimatedTime: "20-25 min",
    slug: "comportement-consommateur",
    chapter: "microeconomie/comportement-consommateur"
  },
  {
    id: "entreprise-production",
    title: "L'entreprise et la production",
    difficulty: "facile",
    questionsCount: 8,
    estimatedTime: "12 min",
    slug: "entreprise-production",
    chapter: "microeconomie/entreprise"
  },
  {
    id: "croissance-economique",
    title: "La croissance économique",
    difficulty: "moyen",
    questionsCount: 15,
    estimatedTime: "20-25 min",
    slug: "croissance-economique",
    chapter: "macroeconomie/croissance-economique"
  },
  {
    id: "fluctuations",
    title: "Les fluctuations économiques",
    difficulty: "moyen",
    questionsCount: 15,
    estimatedTime: "20-25 min",
    slug: "fluctuations",
    chapter: "macroeconomie/fluctuations"
  },
  {
    id: "chomage-inflation",
    title: "Le chômage et l'inflation",
    difficulty: "moyen",
    questionsCount: 15,
    estimatedTime: "20-25 min",
    slug: "chomage-inflation",
    chapter: "macroeconomie/chomage-inflation"
  },
  {
    id: "politiques-stabilisation",
    title: "Les politiques de stabilisation",
    difficulty: "moyen",
    questionsCount: 15,
    estimatedTime: "20-25 min",
    slug: "politiques-stabilisation",
    chapter: "macroeconomie/politiques-stabilisation"
  },
  {
    id: "fondements-commerce",
    title: "Les fondements du commerce international",
    difficulty: "moyen",
    questionsCount: 15,
    estimatedTime: "20-25 min",
    slug: "fondements-commerce",
    chapter: "mondialisation/fondements-commerce"
  },
  {
    id: "globalisation-financiere",
    title: "La Globalisation Financière",
    difficulty: "moyen",
    questionsCount: 15,
    estimatedTime: "20-25 min",
    slug: "globalisation-financiere",
    chapter: "mondialisation/globalisation-financiere"
  },
  {
    id: "firmes-multinationales",
    title: "Les Firmes Multinationales (FMN)",
    difficulty: "moyen",
    questionsCount: 15,
    estimatedTime: "20-25 min",
    slug: "firmes-multinationales",
    chapter: "mondialisation/firmes-multinationales"
  },
  {
    id: "desequilibres-mondiaux",
    title: "Les Déséquilibres Mondiaux",
    difficulty: "difficile",
    questionsCount: 15,
    estimatedTime: "20-25 min",
    slug: "desequilibres-mondiaux",
    chapter: "mondialisation/desequilibres-mondiaux"
  },
  {
    id: "politique-budgetaire",
    title: "La Politique Budgétaire",
    difficulty: "moyen",
    questionsCount: 15,
    estimatedTime: "15-20 min",
    slug: "politique-budgetaire",
    chapter: "politiques-economiques/politique-budgetaire"
  },
  {
    id: "politique-monetaire",
    title: "La Politique Monétaire",
    difficulty: "moyen",
    questionsCount: 15,
    estimatedTime: "20-25 min",
    slug: "politique-monetaire",
    chapter: "politiques-economiques/politique-monetaire"
  },
  {
    id: "politiques-emploi",
    title: "Les Politiques de l'Emploi",
    difficulty: "moyen",
    questionsCount: 15,
    estimatedTime: "20-25 min",
    slug: "politiques-emploi",
    chapter: "politiques-economiques/politiques-emploi"
  },
  {
    id: "regulation-economique",
    title: "La Régulation Économique",
    difficulty: "difficile",
    questionsCount: 15,
    estimatedTime: "20-25 min",
    slug: "regulation-economique",
    chapter: "politiques-economiques/regulation-economique"
  },
  {
    id: "politiques-economiques",
    title: "Les politiques économiques",
    difficulty: "moyen",
    questionsCount: 10,
    estimatedTime: "15 min",
    slug: "politiques-economiques",
    chapter: "macroeconomie/politiques"
  },
  {
    id: "monnaie-financement",
    title: "Monnaie et financement",
    difficulty: "difficile",
    questionsCount: 10,
    estimatedTime: "18 min",
    slug: "monnaie-financement",
    chapter: "macroeconomie/monnaie"
  }
];

export default function EconomieQuizPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<QuizDifficulty>("all");
  const [statusFilter, setStatusFilter] = useState<QuizStatus>("all");
  const [showFilters, setShowFilters] = useState(false);
  
  const { getQuizProgress, isLoading } = useProgress();
  
  const getDifficultyColor = (difficulty: Quiz["difficulty"]) => {
    switch (difficulty) {
      case "facile":
        return "text-green-600 bg-green-50 dark:bg-green-900/20";
      case "moyen":
        return "text-amber-600 bg-amber-50 dark:bg-amber-900/20";
      case "difficile":
        return "text-red-600 bg-red-50 dark:bg-red-900/20";
    }
  };

  const filteredQuizzes = economieQuizzes.filter((quiz) => {
    // Search filter
    if (
      searchQuery &&
      !quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Difficulty filter
    if (difficultyFilter !== "all" && quiz.difficulty !== difficultyFilter) {
      return false;
    }

    // Status filter
    if (statusFilter !== "all") {
      const quizProgress = getQuizProgress("economie", quiz.id);
      if (
        (statusFilter === "completed" && (!quizProgress || !quizProgress.completed)) ||
        (statusFilter === "not-completed" && quizProgress && quizProgress.completed)
      ) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Link href="/quiz" className="text-sm text-gray-500 dark:text-gray-400 hover:text-eco-blue dark:hover:text-eco-blue mb-2 inline-block">
          <ArrowLeft className="h-4 w-4 inline mr-1" />
          Retour à tous les quiz
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-eco-blue">Quiz d'Économie</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Testez vos connaissances sur les concepts économiques clés du programme de SES
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher un quiz..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </button>
        </div>
        
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Difficulté</label>
                <select
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value as QuizDifficulty)}
                >
                  <option value="all">Toutes les difficultés</option>
                  <option value="facile">Facile</option>
                  <option value="moyen">Moyen</option>
                  <option value="difficile">Difficile</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Statut</label>
                <select
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as QuizStatus)}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="completed">Complétés</option>
                  <option value="not-completed">Non complétés</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => {
            const quizProgress = getQuizProgress("economie", quiz.id);
            return (
              <Link key={quiz.id} href={`/quiz/economie/${quiz.slug}`}>
                <div className="card hover:translate-y-[-2px] transition-transform h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-md bg-blue-50 dark:bg-blue-900/20 text-eco-blue">
                      <LineChart className="h-5 w-5" />
                    </div>
                    {quizProgress?.completed ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{quizProgress.score}%</span>
                      </div>
                    ) : (
                      <div className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                        {quiz.difficulty}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-semibold mb-2">{quiz.title}</h3>
                  
                  <div className="mt-auto pt-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{quiz.questionsCount} questions</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{quiz.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 mb-2">
              Aucun quiz ne correspond à vos critères de recherche.
            </div>
            <button
              onClick={() => {
                setSearchQuery("");
                setDifficultyFilter("all");
                setStatusFilter("all");
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
      
      <section className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-eco-blue">Quiz recommandés</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Ces quiz couvrent des notions essentielles pour le BAC SES en économie.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/quiz/economie/politiques-economiques"
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-2">
                <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-eco-blue mr-2">
                  <Star className="h-4 w-4" />
                </div>
                <h3 className="font-medium">Politiques économiques</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Un sujet fréquent au BAC
              </p>
            </Link>
            <Link 
              href="/quiz/economie/mondialisation"
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-2">
                <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-eco-blue mr-2">
                  <Star className="h-4 w-4" />
                </div>
                <h3 className="font-medium">Mondialisation</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Concept transversal important
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
