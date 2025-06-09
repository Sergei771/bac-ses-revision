"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { shuffleArray } from "@/lib/utils";
import QuizPlayer from "@/components/quiz-player";
import { QuizQuestion } from "@/hooks/useContent";
import Link from "next/link";
import { ArrowLeft, Settings2 } from "lucide-react"; // Settings pour régulation économique
import { useProgress } from "@/hooks/useProgress";

const quizPageTitleText = "Quiz: La Régulation Économique";
const chapterSlug = "regulation-economique";
const chapterPath = "/economie/politiques-economiques/regulation-economique";
const subjectId = "economie";
const accentColor = "eco-blue";

const questionsRaw: QuizQuestion[] = [
  {
    id: "reg_q1",
    question: "Quelle est la principale justification de la régulation économique ?",
    options: [
      "Maximiser les profits des entreprises dominantes",
      "L'existence de défaillances de marché",
      "Réduire le rôle de l'État dans l'économie",
      "Encourager la formation de monopoles"
    ],
    correctAnswer: 1,
    explanation: "La régulation vise principalement à corriger les situations où le marché seul ne parvient pas à une allocation optimale des ressources (externalités, biens publics, etc.)."
  },
  {
    id: "reg_q2",
    question: "La pollution émise par une usine qui affecte la santé des riverains est un exemple de :",
    options: [
      "Bien public",
      "Asymétrie d'information",
      "Externalité négative",
      "Monopole naturel"
    ],
    correctAnswer: 2,
    explanation: "Une externalité négative se produit lorsque l'action d'un agent économique a un impact négatif sur un autre agent sans compensation."
  },
  {
    id: "reg_q3",
    question: "Lequel de ces instruments est un exemple de régulation par incitation économique ?",
    options: [
      "L'interdiction totale d'une substance polluante",
      "La fixation d'une norme de qualité obligatoire pour un produit",
      "L'instauration d'une taxe carbone sur les émissions de CO2",
      "La création d'une agence de surveillance des marchés"
    ],
    correctAnswer: 2,
    explanation: "Une taxe carbone vise à modifier le comportement des agents en rendant plus coûteuse l'émission de CO2, les incitant ainsi à polluer moins."
  },
  {
    id: "reg_q4",
    question: "La politique de la concurrence vise principalement à :",
    options: [
      "Protéger les entreprises nationales de la concurrence étrangère",
      "Favoriser la fusion des petites entreprises en grands groupes",
      "Lutter contre les ententes, les abus de position dominante et contrôler les concentrations",
      "Fixer les prix dans tous les secteurs de l'économie"
    ],
    correctAnswer: 2,
    explanation: "Son objectif est de garantir un fonctionnement concurrentiel des marchés, bénéfique pour l'innovation et les consommateurs."
  },
  {
    id: "reg_q5",
    question: "Un bien public pur est caractérisé par :",
    options: [
      "La rivalité et l'exclusion",
      "La non-rivalité et la non-exclusion",
      "La production uniquement par l'État",
      "Un prix de marché très élevé"
    ],
    correctAnswer: 1,
    explanation: "Non-rivalité: la consommation par l'un n'empêche pas celle par l'autre. Non-exclusion: impossible d'empêcher quelqu'un de le consommer (ex: éclairage public)."
  },
  {
    id: "reg_q6",
    question: "Qu'est-ce qu'une asymétrie d'information ?",
    options: [
      "Lorsque tous les agents disposent de la même information parfaite",
      "Lorsque l'information est disponible mais trop coûteuse à acquérir",
      "Lorsqu'une partie à une transaction dispose de plus d'informations pertinentes que l'autre",
      "Lorsque l'État cache des informations aux citoyens"
    ],
    correctAnswer: 2,
    explanation: "L'asymétrie d'information peut conduire à des problèmes de sélection adverse (avant la transaction) ou d'aléa moral (après la transaction)."
  },
  {
    id: "reg_q7",
    question: "Laquelle de ces situations relève d'une régulation sectorielle ?",
    options: [
      "L'interdiction de la publicité mensongère pour tous les produits",
      "La fixation de ratios de solvabilité pour les banques",
      "L'obligation d'affichage des prix dans tous les commerces",
      "La loi sur le salaire minimum applicable à tous les salariés"
    ],
    correctAnswer: 1,
    explanation: "La régulation financière (ici, les ratios de solvabilité bancaire) est un exemple type de régulation spécifique à un secteur."
  },
  {
    id: "reg_q8",
    question: "Le risque de \"capture du régulateur\" signifie que :",
    options: [
      "Le régulateur est trop strict avec les entreprises",
      "Le régulateur manque de moyens pour accomplir sa mission",
      "Le régulateur finit par servir les intérêts des entreprises qu'il est censé réguler plutôt que l'intérêt général",
      "Les entreprises capturent des parts de marché grâce à la régulation"
    ],
    correctAnswer: 2,
    explanation: "La proximité et les échanges d'influence peuvent amener le régulateur à être plus sensible aux arguments de l'industrie régulée."
  },
  {
    id: "reg_q9",
    question: "Un monopole naturel existe typiquement lorsque :",
    options: [
      "Une seule entreprise détient un brevet exclusif",
      "Les coûts fixes sont très élevés et les coûts marginaux faibles, rendant un seul producteur plus efficace",
      "L'État accorde un monopole légal à une entreprise publique",
      "Plusieurs entreprises s'entendent pour former un cartel"
    ],
    correctAnswer: 1,
    explanation: "Dans un monopole naturel (ex: réseaux de distribution d'eau, d'électricité), il est plus coûteux d'avoir plusieurs producteurs qu'un seul."
  },
  {
    id: "reg_q10",
    question: "Lequel de ces éléments est un coût potentiel de la régulation ?",
    options: [
      "Une meilleure information des consommateurs",
      "Une réduction des externalités négatives",
      "Les coûts administratifs pour l'État et de conformité pour les entreprises",
      "Une concurrence accrue sur les marchés"
    ],
    correctAnswer: 2,
    explanation: "La mise en place et le respect des réglementations engendrent des coûts qui peuvent être significatifs."
  },
  {
    id: "reg_q11",
    question: "Les normes environnementales imposant des limites d'émission aux usines sont un exemple de régulation par :",
    options: [
      "Incitation économique (taxes)",
      "Information et persuasion",
      "Réglementation directe (command and control)",
      "Fourniture publique"
    ],
    correctAnswer: 2,
    explanation: "Il s'agit d'une contrainte directe imposée aux entreprises, caractéristique de l'approche \"command and control\"."
  },
  {
    id: "reg_q12",
    question: "Pourquoi les agences de régulation sont-elles souvent indépendantes ?",
    options: [
      "Pour réduire leurs coûts de fonctionnement",
      "Pour les soumettre directement au contrôle du Parlement",
      "Pour garantir leur neutralité, leur expertise technique et les protéger des pressions politiques de court terme",
      "Pour qu'elles puissent fixer elles-mêmes leur budget"
    ],
    correctAnswer: 2,
    explanation: "L'indépendance vise à assurer que leurs décisions sont prises sur la base de critères techniques et d'intérêt général."
  },
  {
    id: "reg_q13",
    question: "Laquelle de ces affirmations sur les externalités est FAUSSE ?",
    options: [
      "Une externalité peut être positive (ex: la vaccination)",
      "Les externalités sont toujours prises en compte par le marché",
      "La régulation peut viser à internaliser les externalités (ex: taxe pigouvienne)",
      "La pollution est un exemple courant d'externalité négative"
    ],
    correctAnswer: 1,
    explanation: "Justement, les externalités sont une défaillance du marché car celui-ci ne les prend pas spontanément en compte dans les prix et les quantités."
  },
  {
    id: "reg_q14",
    question: "Contrôler les fusions et acquisitions d'entreprises pour éviter une concentration excessive du marché relève de :",
    options: [
      "La régulation environnementale",
      "La politique de la concurrence",
      "La régulation financière",
      "La protection des consommateurs"
    ],
    correctAnswer: 1,
    explanation: "Le contrôle des concentrations est un des piliers de la politique de la concurrence pour prévenir les abus de position dominante."
  },
  {
    id: "reg_q15",
    question: "Un des défis actuels de la régulation concerne :",
    options: [
      "La diminution du nombre de secteurs nécessitant une régulation",
      "L'encadrement des activités des géants du numérique (GAFAM)",
      "La simplification extrême de toutes les normes existantes",
      "Le retour à une absence totale de régulation (laisser-faire intégral)"
    ],
    correctAnswer: 1,
    explanation: "La puissance économique et l'influence des grandes entreprises technologiques posent de nouveaux défis aux régulateurs (concurrence, données personnelles, désinformation)."
  }
];

export default function QuizRegulationEconomique() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const { updateChapterProgress } = useProgress();

  useEffect(() => {
    setQuestions(shuffleArray(questionsRaw));
  }, []);

  const handleQuizCompletion = (score: number, answers: number[]) => {
    console.log(`Quiz ${chapterSlug} complété avec un score de ${score}/${questionsRaw.length}`);
    updateChapterProgress(subjectId, chapterSlug, { completed: true, timeSpent: 0 });
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
                <Settings2 className="h-7 w-7 text-eco-blue" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                  {quizPageTitleText}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Testez votre compréhension des mécanismes de régulation.
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