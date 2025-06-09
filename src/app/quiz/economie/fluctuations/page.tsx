"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Activity } from "lucide-react";
import Link from "next/link";
import QuizPlayer from "@/components/quiz-player";
import { useProgress } from "@/hooks/useProgress";
import { shuffleArray } from "@/lib/utils";

const quizTitle = "Quiz: Les Fluctuations Économiques";
const chapterSlug = "fluctuations";
const subject = "economie";
const accentColor = "eco-blue";

// Types pour les questions de quiz
type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

// Questions du quiz sur les fluctuations économiques
const quizQuestions: QuizQuestion[] = [
  {
    id: "q1_fluctuations",
    question: "Que désignent les fluctuations économiques ?",
    options: [
      "Uniquement les périodes de crise financière",
      "Les variations de l'activité économique autour de sa tendance de long terme",
      "L'augmentation constante du PIB",
      "Les changements de politique monétaire"
    ],
    correctAnswer: 1,
    explanation: "Les fluctuations économiques sont les mouvements (hausse ou baisse) de l'activité économique (souvent mesurée par le PIB) autour de sa tendance de croissance de long terme."
  },
  {
    id: "q2_fluctuations",
    question: "Quelle phase du cycle économique est caractérisée par une baisse du PIB pendant au moins deux trimestres consécutifs ?",
    options: [
      "Expansion",
      "Crise",
      "Récession",
      "Reprise"
    ],
    correctAnswer: 2,
    explanation: "La récession est techniquement définie par une baisse du PIB réel pendant au moins deux trimestres consécutifs."
  },
  {
    id: "q3_fluctuations",
    question: "Un choc d'offre négatif (par exemple, une hausse brutale du prix du pétrole) tend à provoquer :",
    options: [
      "Une baisse des prix et une hausse de la production",
      "Une hausse des prix et une hausse de la production",
      "Une hausse des prix et une baisse de la production (stagflation)",
      "Une baisse des prix et une baisse de la production"
    ],
    correctAnswer: 2,
    explanation: "Un choc d'offre négatif augmente les coûts de production, ce qui conduit les entreprises à réduire leur offre et à augmenter leurs prix, pouvant mener à la stagflation."
  },
  {
    id: "q4_fluctuations",
    question: "Comment appelle-t-on un cycle économique d'une durée de 7 à 11 ans, principalement lié aux variations de l'investissement ?",
    options: [
      "Cycle de Kitchin",
      "Cycle de Juglar",
      "Cycle de Kondratiev",
      "Cycle de Kuznets"
    ],
    correctAnswer: 1,
    explanation: "Le cycle de Juglar, ou cycle des affaires, dure environ 7-11 ans et est souvent associé aux fluctuations de l'investissement des entreprises."
  },
  {
    id: "q5_fluctuations",
    question: "Qu'est-ce qu'un choc de demande positif ?",
    options: [
      "Une augmentation soudaine des coûts de production",
      "Une baisse de la confiance des consommateurs",
      "Une augmentation des dépenses publiques ou une baisse des impôts",
      "Une catastrophe naturelle affectant la production"
    ],
    correctAnswer: 2,
    explanation: "Un choc de demande positif est un événement qui augmente la demande globale, comme une politique budgétaire expansive (hausse des dépenses publiques, baisse des impôts) ou une hausse de la confiance."
  },
  {
    id: "q6_fluctuations",
    question: "Laquelle de ces situations décrit la stagflation ?",
    options: [
      "Forte croissance et faible inflation",
      "Faible croissance (ou stagnation) et forte inflation",
      "Faible croissance et déflation",
      "Forte croissance et forte inflation"
    ],
    correctAnswer: 1,
    explanation: "La stagflation est une situation économique difficile caractérisée par la coexistence d'une stagnation de l'activité économique (faible croissance, chômage élevé) et d'une forte inflation."
  },
  {
    id: "q7_fluctuations",
    question: "Selon Keynes, quel rôle jouent les \"esprits animaux\" des entrepreneurs dans les fluctuations ?",
    options: [
      "Ils assurent toujours la stabilité de l'investissement",
      "Ils sont des calculs rationnels basés sur des probabilités objectives",
      "Leurs vagues d'optimisme ou de pessimisme influencent les décisions d'investissement",
      "Ils n'ont aucun impact sur l'économie réelle"
    ],
    correctAnswer: 2,
    explanation: "Keynes utilisait le terme \"esprits animaux\" pour décrire l'influence des facteurs psychologiques, comme l'optimisme et le pessimisme, sur les décisions d'investissement des entrepreneurs, contribuant ainsi à l'instabilité."
  },
  {
    id: "q8_fluctuations",
    question: "La loi d'Okun établit une relation empirique entre :",
    options: [
      "L'inflation et le chômage (courbe de Phillips)",
      "La croissance du PIB et la variation du taux de chômage",
      "Les taux d'intérêt et l'investissement",
      "Les dépenses publiques et la croissance du PIB"
    ],
    correctAnswer: 1,
    explanation: "La loi d'Okun décrit une relation inverse entre les variations du PIB réel et les variations du taux de chômage : une augmentation de la croissance du PIB est généralement associée à une baisse du chômage."
  },
  {
    id: "q9_fluctuations",
    question: "Un exemple d'indicateur avancé de la conjoncture économique est :",
    options: [
      "Le taux de chômage actuel",
      "Le PIB du trimestre précédent",
      "Le nombre de permis de construire accordés",
      "L'indice des prix à la consommation du mois dernier"
    ],
    correctAnswer: 2,
    explanation: "Les indicateurs avancés sont des variables qui ont tendance à changer avant que l'ensemble de l'économie ne change. Le nombre de permis de construire est un exemple, car il anticipe l'activité future dans le secteur de la construction."
  },
  {
    id: "q10_fluctuations",
    question: "Quelle est la phase du cycle économique qui suit la récession et précède l'expansion ?",
    options: [
      "Crise",
      "Pic",
      "Reprise (ou creux)",
      "Stagnation"
    ],
    correctAnswer: 2,
    explanation: "Après une récession, l'économie atteint un creux (point le plus bas), puis entame une phase de reprise, où l'activité recommence à augmenter, menant à une nouvelle expansion."
  },
  {
    id: "q11_fluctuations",
    question: "Le mécanisme du multiplicateur d'investissement suggère que :",
    options: [
      "Une variation initiale de l'investissement entraîne une variation moins que proportionnelle du revenu global",
      "Une variation initiale de l'investissement entraîne une variation plus que proportionnelle du revenu global",
      "L'investissement n'a pas d'impact sur le revenu global",
      "Le revenu global détermine l'investissement, mais pas l'inverse"
    ],
    correctAnswer: 1,
    explanation: "Le multiplicateur keynésien montre qu'une augmentation (ou baisse) initiale de l'investissement engendre une augmentation (ou baisse) plus importante du revenu national, car les dépenses des uns deviennent les revenus des autres, qui sont à leur tour dépensés."
  },
  {
    id: "q12_fluctuations",
    question: "Les cycles de Kondratiev, d'une durée de 40 à 60 ans, sont souvent associés à :",
    options: [
      "Des variations saisonnières de la production agricole",
      "Des changements dans les politiques électorales",
      "Des vagues d'innovations technologiques majeures",
      "Des ajustements des stocks des entreprises"
    ],
    correctAnswer: 2,
    explanation: "Les cycles longs de Kondratiev sont liés par certains économistes (comme Schumpeter) à des grappes d'innovations technologiques majeures qui transforment l'économie."
  },
  {
    id: "q13_fluctuations",
    question: "Qu'est-ce qu'une politique budgétaire contracyclique en période de récession ?",
    options: [
      "Augmenter les impôts et réduire les dépenses publiques",
      "Réduire les impôts et augmenter les dépenses publiques",
      "Maintenir un budget équilibré à tout prix",
      "Augmenter les taux d'intérêt"
    ],
    correctAnswer: 1,
    explanation: "En période de récession, une politique budgétaire contracyclique (visant à contrer le cycle) consiste à stimuler la demande globale en réduisant les impôts et/ou en augmentant les dépenses publiques."
  },
  {
    id: "q14_fluctuations",
    question: "Lequel de ces éléments est considéré comme un stabilisateur automatique de l'économie ?",
    options: [
      "Les décisions discrétionnaires de la banque centrale d'augmenter les taux d'intérêt",
      "Un plan de relance gouvernemental voté en urgence",
      "Le système d'imposition progressif et les indemnités chômage",
      "Les variations des prix du pétrole sur le marché mondial"
    ],
    correctAnswer: 2,
    explanation: "Les stabilisateurs automatiques sont des mécanismes budgétaires qui atténuent les fluctuations sans intervention discrétionnaire de l'État. Par exemple, en récession, les recettes fiscales baissent et les indemnités chômage augmentent automatiquement, soutenant la demande."
  },
  {
    id: "q15_fluctuations",
    question: "Une bulle spéculative qui éclate peut provoquer quel type de choc principal ?",
    options: [
      "Un choc d'offre positif",
      "Un choc de demande positif",
      "Un choc de demande négatif",
      "Un choc technologique"
    ],
    correctAnswer: 2,
    explanation: "L'éclatement d'une bulle spéculative entraîne souvent une forte baisse de la richesse des agents économiques, une crise de confiance et une contraction du crédit, provoquant un choc de demande négatif."
  }
];

export default function FluctuationsEconomiquesQuizPage() {
  const { getQuizProgress, isLoading } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const quizId = "fluctuations"; // Corresponds à l'ID du chapitre

  useEffect(() => {
    setMounted(true);
    setShuffledQuestions(shuffleArray(quizQuestions));
  }, []);

  const handleQuizComplete = (score: number) => {
    console.log(`Quiz '${quizId}' (${subject}) terminé avec un score de ${score}/${quizQuestions.length}`);
    // Ici, on pourrait appeler updateQuizProgress si nécessaire, selon la logique de useProgress
  };

  if (!mounted || isLoading || shuffledQuestions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-blue"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/quiz/economie" 
          className="flex items-center text-eco-blue hover:text-eco-dark-blue dark:text-eco-light-blue dark:hover:text-eco-blue mb-4 transition-colors duration-150"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour aux quiz d'Économie
        </Link>
        
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
          <div className="flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <Activity className="mr-3 h-7 w-7 sm:h-8 sm:w-8 text-eco-blue" />
              {quizTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Testez votre compréhension des cycles économiques, de leurs causes et de leurs conséquences.
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8"
      >
        <QuizPlayer 
          questions={shuffledQuestions} 
          quizId={quizId}
          subjectId={subject}
          onComplete={handleQuizComplete}
        />
      </motion.div>
      
      <div className="mt-8 text-center">
        <Link 
            href="/economie/macroeconomie/fluctuations" 
            className="text-sm text-eco-blue hover:underline"
        >
            Revoir le chapitre sur Les fluctuations économiques
        </Link>
      </div>
    </div>
  );
} 