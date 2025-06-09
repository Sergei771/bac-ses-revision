"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { shuffleArray } from "@/lib/utils";
import QuizPlayer from "@/components/quiz-player";
import { QuizQuestion } from "@/hooks/useContent";
import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react"; // Icône TrendingUp pour la politique monétaire
import { useProgress } from "@/hooks/useProgress";

const quizPageTitleText = "Quiz: La Politique Monétaire";
const chapterSlug = "politique-monetaire";
const chapterPath = "/economie/politiques-economiques/politique-monetaire";
const subjectId = "economie";
const quizTitle = quizPageTitleText;
const subject = subjectId;
const accentColor = "eco-blue";

const questionsRaw: QuizQuestion[] = [
  {
    id: "pm_q1",
    question: "Quel est l'objectif principal généralement assigné à la politique monétaire moderne (ex: BCE) ?",
    options: [
      "Maximiser les recettes de l'État",
      "Assurer la stabilité des prix",
      "Fixer le niveau des salaires",
      "Contrôler directement l'investissement des entreprises"
    ],
    correctAnswer: 1,
    explanation: "La stabilité des prix (maîtrise de l'inflation) est l'objectif primordial de la plupart des banques centrales contemporaines."
  },
  {
    id: "pm_q2",
    question: "Lequel de ces éléments est un instrument conventionnel de la politique monétaire ?",
    options: [
      "Les dépenses publiques",
      "Le taux directeur de la banque centrale",
      "Le taux de l'impôt sur les sociétés",
      "Les subventions à l'exportation"
    ],
    correctAnswer: 1,
    explanation: "Les taux directeurs sont le principal levier des banques centrales pour influencer le coût du crédit et l'offre de monnaie."
  },
  {
    id: "pm_q3",
    question: "Une politique monétaire expansionniste (ou accommodante) vise à :",
    options: [
      "Augmenter les taux d'intérêt pour freiner l'inflation",
      "Réduire les taux d'intérêt pour stimuler l'activité économique",
      "Augmenter les réserves obligatoires des banques",
      "Vendre des titres sur l'open market"
    ],
    correctAnswer: 1,
    explanation: "Une politique expansionniste cherche à rendre le crédit moins cher et plus abondant pour encourager la dépense et l'investissement."
  },
  {
    id: "pm_q4",
    question: "Qu'est-ce que le Quantitative Easing (QE) ?",
    options: [
      "Une hausse des taux d'intérêt directeurs",
      "Une politique budgétaire de relance par l'endettement",
      "Un achat massif d'actifs financiers par la banque centrale pour injecter des liquidités",
      "Une augmentation du ratio des réserves obligatoires"
    ],
    correctAnswer: 2,
    explanation: "Le QE est un instrument non conventionnel où la banque centrale achète des actifs (souvent des obligations d'État) pour augmenter la masse monétaire et abaisser les taux à long terme."
  },
  {
    id: "pm_q5",
    question: "Laquelle de ces institutions est responsable de la politique monétaire dans la zone euro ?",
    options: [
      "La Commission Européenne",
      "Le Fonds Monétaire International (FMI)",
      "La Banque Centrale Européenne (BCE)",
      "Chaque banque centrale nationale individuellement"
    ],
    correctAnswer: 2,
    explanation: "La BCE définit et met en œuvre la politique monétaire unique pour les pays de la zone euro."
  },
  {
    id: "pm_q6",
    question: "L'indépendance d'une banque centrale est considérée comme importante pour :",
    options: [
      "Permettre au gouvernement de financer directement ses déficits",
      "Assurer une meilleure coordination avec la politique budgétaire",
      "Renforcer sa crédibilité dans la lutte contre l'inflation",
      "Garantir des taux d'intérêt toujours bas"
    ],
    correctAnswer: 2,
    explanation: "L'indépendance protège la banque centrale des pressions politiques de court terme, augmentant sa crédibilité pour maintenir la stabilité des prix."
  },
  {
    id: "pm_q7",
    question: "Quel est l'un des principaux canaux de transmission de la politique monétaire à l'économie réelle ?",
    options: [
      "Le canal des dépenses publiques",
      "Le canal du taux d'intérêt et du crédit",
      "Le canal des impôts et taxes",
      "Le canal des réglementations sur les entreprises"
    ],
    correctAnswer: 1,
    explanation: "Les variations des taux directeurs affectent les conditions de crédit, qui à leur tour influencent les décisions de consommation et d'investissement."
  },
  {
    id: "pm_q8",
    question: "Une politique monétaire restrictive est généralement mise en place pour :",
    options: [
      "Stimuler la croissance économique en période de récession",
      "Lutter contre une inflation jugée trop élevée",
      "Encourager les banques à prêter davantage",
      "Réduire le taux de chômage"
    ],
    correctAnswer: 1,
    explanation: "Une politique restrictive (hausse des taux, etc.) vise à freiner la demande globale pour calmer les tensions inflationnistes."
  },
  {
    id: "pm_q9",
    question: "La \"trappe à liquidité\" est une situation où :",
    options: [
      "Les banques manquent de liquidités pour prêter",
      "La politique monétaire devient inefficace car les taux d'intérêt sont déjà très bas et les agents préfèrent détenir de la monnaie",
      "L'inflation est hors de contrôle malgré les hausses de taux",
      "Le gouvernement impose des contrôles de capitaux stricts"
    ],
    correctAnswer: 1,
    explanation: "Dans une trappe à liquidité, même si la banque centrale injecte des liquidités, cela n'a que peu d'effet sur l'activité car les taux sont proches de zéro et la demande de crédit est faible."
  },
  {
    id: "pm_q10",
    question: "Les opérations d'open market consistent pour la banque centrale à :",
    options: [
      "Fixer les salaires minimums",
      "Acheter ou vendre des titres sur le marché monétaire",
      "Réglementer directement les prix des biens et services",
      "Accorder des prêts aux pays en difficulté"
    ],
    correctAnswer: 1,
    explanation: "Par ses opérations d'achat (injection de liquidité) ou de vente (retrait de liquidité) de titres, la banque centrale influence la liquidité bancaire et les taux à court terme."
  },
  {
    id: "pm_q11",
    question: "Que signifie le \"Zero Lower Bound\" (ZLB) pour les taux d'intérêt ?",
    options: [
      "Que les taux d'intérêt ne peuvent jamais être nuls",
      "Que les taux d'intérêt nominaux ne peuvent pas descendre significativement en dessous de zéro",
      "Que la banque centrale vise un taux d'inflation de zéro",
      "Qu'il n'y a aucune limite à la baisse des taux d'intérêt réels"
    ],
    correctAnswer: 1,
    explanation: "Le ZLB représente la contrainte selon laquelle il est difficile pour les banques centrales de fixer des taux directeurs nominaux très négatifs."
  },
  {
    id: "pm_q12",
    question: "Si une banque centrale augmente le ratio des réserves obligatoires, quel en est l'effet attendu ?",
    options: [
      "Les banques auront plus de fonds à prêter, stimulant l'économie",
      "Les banques auront moins de fonds à prêter, freinant l'économie",
      "Cela n'a aucun impact sur la capacité de prêt des banques",
      "Les taux d'intérêt vont automatiquement baisser"
    ],
    correctAnswer: 1,
    explanation: "Augmenter les réserves obligatoires réduit la quantité de monnaie que les banques peuvent créer via le crédit, ayant un effet restrictif."
  },
  {
    id: "pm_q13",
    question: "Le canal du taux de change de la politique monétaire implique que :",
    options: [
      "La banque centrale fixe directement le taux de change",
      "Une baisse des taux d'intérêt peut entraîner une dépréciation de la monnaie, stimulant les exportations",
      "La politique monétaire n'a aucun effet sur le taux de change",
      "Une hausse des taux d'intérêt entraîne toujours une appréciation de la monnaie"
    ],
    correctAnswer: 1,
    explanation: "Les différentiels de taux d'intérêt influencent les flux de capitaux. Une baisse des taux peut rendre la monnaie moins attractive, la déprécier et ainsi favoriser la compétitivité-prix."
  },
  {
    id: "pm_q14",
    question: "Lequel de ces éléments n'est PAS un objectif typique de la politique monétaire ?",
    options: [
      "La stabilité des prix",
      "La réduction des inégalités de revenus",
      "Le soutien à l'emploi (souvent de manière secondaire)",
      "La stabilité financière"
    ],
    correctAnswer: 1,
    explanation: "Bien que la politique monétaire puisse avoir des effets distributifs, la réduction des inégalités est généralement un objectif principal de la politique budgétaire et fiscale."
  },
  {
    id: "pm_q15",
    question: "En période d'inflation élevée, une banque centrale devrait normalement :",
    options: [
      "Baisser ses taux directeurs et acheter des actifs (QE)",
      "Augmenter ses taux directeurs et potentiellement vendre des actifs",
      "Ne rien faire et laisser le marché s'ajuster seul",
      "Demander au gouvernement d'augmenter les dépenses publiques"
    ],
    correctAnswer: 1,
    explanation: "Pour lutter contre l'inflation, une banque centrale adopte une politique restrictive en augmentant les taux d'intérêt pour freiner la demande."
  }
];

export default function QuizPolitiqueMonetaire() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const { updateChapterProgress } = useProgress();

  useEffect(() => {
    setQuestions(shuffleArray(questionsRaw));
  }, []);

  const handleQuizCompletion = (score: number, answers: number[]) => {
    // Potentiellement, mettre à jour la progression du chapitre comme complété ici aussi
    // Pour l'instant, on logue juste, la progression est gérée dans QuizPlayer ou via le useProgress hook
    console.log(`Quiz ${chapterSlug} complété avec un score de ${score}/${questionsRaw.length}`);
    updateChapterProgress(subjectId, chapterSlug, { completed: true, timeSpent: 0 }); // Exemple de mise à jour
  };

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-blue"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 p-1">
          <Link href="/quiz/economie" className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-eco-blue dark:hover:text-eco-blue-dark transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Retour aux quiz d'Économie
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="p-2.5 bg-eco-blue/10 dark:bg-eco-blue/20 rounded-lg mr-4">
                <TrendingUp className="h-7 w-7 text-eco-blue" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                  {quizPageTitleText}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Évaluez votre maîtrise des outils et des enjeux de la politique monétaire.
                </p>
              </div>
            </div>
            <Link 
              href={chapterPath}
              className="text-sm font-medium text-eco-blue hover:text-eco-blue-dark dark:text-eco-blue-light dark:hover:text-eco-blue-lighter py-2 px-4 rounded-lg bg-eco-blue/10 hover:bg-eco-blue/20 transition-colors whitespace-nowrap"
            >
              Revoir le chapitre
            </Link>
          </div>
          
          <QuizPlayer 
            questions={questions} 
            quizId={chapterSlug}
            subjectId={subjectId}
            onComplete={handleQuizCompletion} 
          />
        </div>
        
      </div>
    </motion.div>
  );
} 