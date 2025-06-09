"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { shuffleArray } from "@/lib/utils";
import QuizPlayer from "@/components/quiz-player";
import { QuizQuestion } from "@/hooks/useContent";
import Link from "next/link";
import { ArrowLeft, DollarSign } from "lucide-react"; // Icône DollarSign pour la politique budgétaire
import { useProgress } from "@/hooks/useProgress";

const quizPageTitleText = "Quiz: La Politique Budgétaire";
const chapterSlug = "politique-budgetaire";
const chapterPath = "/economie/politiques-economiques/politique-budgetaire";
const subjectId = "economie";
const quizTitle = quizPageTitleText;
const subject = subjectId;
const accentColor = "eco-blue";

const questionsRaw: QuizQuestion[] = [
  {
    id: "pb_q1",
    question: "Quel est l'objectif principal d'une politique budgétaire de relance ?",
    options: [
      "Réduire l'inflation",
      "Stimuler la demande globale et l'emploi",
      "Diminuer la dette publique",
      "Augmenter les taux d'intérêt"
    ],
    correctAnswer: 1,
    explanation: "Une politique de relance vise à augmenter les dépenses publiques ou baisser les impôts pour stimuler l'activité économique et l'emploi."
  },
  {
    id: "pb_q2",
    question: "Lequel de ces éléments est un instrument des dépenses publiques ?",
    options: [
      "Le taux de TVA",
      "Les salaires des fonctionnaires",
      "L'impôt sur les sociétés",
      "Les cotisations sociales"
    ],
    correctAnswer: 1,
    explanation: "Les salaires des fonctionnaires font partie des dépenses de fonctionnement de l'État, un des volets des dépenses publiques."
  },
  {
    id: "pb_q3",
    question: "Qu'est-ce que le déficit public ?",
    options: [
      "L'excédent des recettes sur les dépenses de l'État",
      "L'ensemble de la dette accumulée par l'État",
      "La situation où les dépenses de l'État sont supérieures à ses recettes sur une période donnée",
      "L'ensemble des impôts perçus par l'État"
    ],
    correctAnswer: 2,
    explanation: "Le déficit public (ou budgétaire) se produit lorsque les dépenses excèdent les recettes sur une année."
  },
  {
    id: "pb_q4",
    question: "Quel mécanisme décrit l'effet par lequel une dépense publique initiale engendre une augmentation plus que proportionnelle du revenu national ?",
    options: [
      "L'effet d'éviction",
      "L'équivalence ricardienne",
      "Le multiplicateur keynésien",
      "La courbe de Laffer"
    ],
    correctAnswer: 2,
    explanation: "Le multiplicateur keynésien explique comment une injection de dépenses publiques peut avoir un impact amplifié sur le revenu global."
  },
  {
    id: "pb_q5",
    question: "Une politique budgétaire restrictive (ou de rigueur) vise généralement à :",
    options: [
      "Augmenter les dépenses publiques pour stimuler l'économie",
      "Réduire le déficit public et maîtriser la dette",
      "Baisser les impôts pour augmenter le pouvoir d'achat",
      "Encourager l'inflation"
    ],
    correctAnswer: 1,
    explanation: "Une politique de rigueur cherche à assainir les finances publiques en réduisant les dépenses ou en augmentant les prélèvements."
  },
  {
    id: "pb_q6",
    question: "Lequel de ces éléments constitue une recette pour l'État (prélèvement obligatoire) ?",
    options: [
      "Les subventions aux entreprises",
      "L'impôt sur le revenu",
      "Les investissements dans les infrastructures",
      "Les allocations chômage"
    ],
    correctAnswer: 1,
    explanation: "L'impôt sur le revenu est un prélèvement obligatoire qui constitue une recette fiscale pour l'État."
  },
  {
    id: "pb_q7",
    question: "Qu'est-ce que l'effet d'éviction (crowding-out effect) ?",
    options: [
      "L'augmentation de l'investissement privé suite à une baisse des dépenses publiques",
      "La réduction de l'investissement privé due à la hausse des taux d'intérêt provoquée par le financement du déficit public par emprunt",
      "L'augmentation des exportations suite à une dévaluation de la monnaie",
      "La baisse de la consommation due à une anticipation de hausse des impôts"
    ],
    correctAnswer: 1,
    explanation: "L'effet d'éviction se produit lorsque l'emprunt public pour financer le déficit fait monter les taux d'intérêt, ce qui peut décourager l'investissement privé."
  },
  {
    id: "pb_q8",
    question: "Le Pacte de Stabilité et de Croissance (PSC) européen impose des limites concernant :",
    options: [
      "Le taux de chômage et le taux d'inflation",
      "Le déficit public et la dette publique des États membres",
      "Le solde de la balance commerciale et le taux de croissance du PIB",
      "Les dépenses de recherche et développement et les investissements écologiques"
    ],
    correctAnswer: 1,
    explanation: "Le PSC vise à coordonner les politiques budgétaires en fixant des seuils pour le déficit (moins de 3% du PIB) et la dette publique (moins de 60% du PIB)."
  },
  {
    id: "pb_q9",
    question: "Si le solde budgétaire est nul, cela signifie que :",
    options: [
      "Les dépenses publiques sont supérieures aux recettes publiques",
      "Les recettes publiques sont supérieures aux dépenses publiques",
      "Les dépenses publiques sont égales aux recettes publiques",
      "L'État n'a aucune dette"
    ],
    correctAnswer: 2,
    explanation: "Un solde budgétaire nul (à l'équilibre) signifie que les recettes de l'État couvrent exactement ses dépenses pour la période considérée."
  },
  {
    id: "pb_q10",
    question: "Laquelle de ces actions relève d'une politique budgétaire expansive ?",
    options: [
      "Une augmentation de la TVA",
      "Une diminution des dépenses d'investissement public",
      "Une augmentation des allocations familiales",
      "Une hausse de l'impôt sur les sociétés"
    ],
    correctAnswer: 2,
    explanation: "L'augmentation des allocations familiales est une hausse des dépenses de transfert, ce qui caractérise une politique budgétaire expansive visant à soutenir la demande."
  },
  {
    id: "pb_q11",
    question: "Qu'est-ce que la dette publique ?",
    options: [
      "Le déficit de l'année en cours",
      "L'ensemble des engagements financiers accumulés par les administrations publiques pour financer les déficits passés",
      "Les impôts que les citoyens doivent payer",
      "Les bénéfices réalisés par les entreprises publiques"
    ],
    correctAnswer: 1,
    explanation: "La dette publique est le stock des emprunts contractés par l'État et les autres administrations publiques pour couvrir leurs déficits accumulés."
  },
  {
    id: "pb_q12",
    question: "Selon le théorème de l'équivalence ricardienne, comment les ménages pourraient-ils réagir à une relance budgétaire financée par déficit ?",
    options: [
      "En augmentant immédiatement leur consommation",
      "En augmentant leur épargne en prévision d'une future hausse d'impôts",
      "En demandant des salaires plus élevés",
      "En investissant davantage dans les entreprises"
    ],
    correctAnswer: 1,
    explanation: "L'équivalence ricardienne suggère que les agents rationnels anticipent que le déficit d'aujourd'hui sera financé par des impôts futurs, les incitant à épargner plutôt qu'à consommer."
  },
  {
    id: "pb_q13",
    question: "Lequel de ces objectifs n'est PAS traditionnellement un objectif direct de la politique budgétaire ?",
    options: [
      "La stabilité des prix",
      "Le plein-emploi",
      "La fixation du taux de change de la monnaie",
      "La redistribution des revenus"
    ],
    correctAnswer: 2,
    explanation: "La fixation du taux de change relève davantage de la politique monétaire ou de la politique de change, bien que la politique budgétaire puisse avoir des effets indirects."
  },
  {
    id: "pb_q14",
    question: "Les 'stabilisateurs automatiques' en matière de politique budgétaire sont des mécanismes qui :",
    options: [
      "Nécessitent une décision discrétionnaire du gouvernement pour être activés",
      "Atténuent automatiquement les fluctuations économiques sans intervention active de l'État",
      "Empêchent systématiquement le budget d'être en déficit",
      "Garantissent une croissance économique constante"
    ],
    correctAnswer: 1,
    explanation: "Les stabilisateurs automatiques (ex: allocations chômage qui augmentent en récession, impôts progressifs) modèrent les cycles économiques sans décision ponctuelle."
  },
  {
    id: "pb_q15",
    question: "Une augmentation des dépenses publiques d'infrastructure est un exemple de :",
    options: [
      "Politique monétaire restrictive",
      "Dépense de transfert",
      "Politique budgétaire de rigueur",
      "Dépense d'investissement public"
    ],
    correctAnswer: 3,
    explanation: "Les dépenses en infrastructures (routes, écoles, etc.) sont des investissements publics, un levier de la politique budgétaire qui peut avoir des effets à long terme."
  }
];

export default function QuizPolitiqueBudgetaire() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const { updateChapterProgress, updateQuizProgress } = useProgress();

  useEffect(() => {
    setQuestions(shuffleArray(questionsRaw));
  }, []);

  const handleQuizCompletion = (score: number, totalQuestions: number) => {
    updateChapterProgress(subjectId, chapterSlug, { completed: true, timeSpent: 0 });
  };

  if (questions.length === 0) {
    return <div>Chargement du quiz...</div>; 
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
          <Link href="/quiz/economie" className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-eco-blue dark:hover:text-eco-blue transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Retour aux quiz d'Économie
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="p-2.5 bg-eco-blue/10 dark:bg-eco-blue/20 rounded-lg mr-4">
                <DollarSign className="h-7 w-7 text-eco-blue" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                  {quizPageTitleText}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Testez vos connaissances sur les objectifs, instruments et impacts de la politique budgétaire.
                </p>
              </div>
            </div>
            <Link 
              href={chapterPath}
              className="text-sm font-medium text-eco-blue hover:text-eco-dark-blue dark:text-eco-light-blue dark:hover:text-eco-blue-lighter py-2 px-4 rounded-lg bg-eco-blue/10 hover:bg-eco-blue/20 transition-colors whitespace-nowrap"
            >
              Revoir le chapitre
            </Link>
          </div>
          
          <QuizPlayer 
            questions={questions} 
            quizId={chapterSlug}
            subjectId={subjectId}
            onComplete={(finalScore, answers) => handleQuizCompletion(finalScore, questions.length)} 
          />
        </div>
        
      </div>
    </motion.div>
  );
} 