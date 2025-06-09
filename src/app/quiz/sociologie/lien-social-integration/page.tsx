"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Link2 } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import QuizPlayer from "@/components/quiz-player";
import { QuizQuestion } from "@/hooks/useContent";
import { shuffleArray } from "@/lib/utils";

const quizTitle = "Quiz: Lien Social et Intégration";
const chapterSlug = "lien-social-integration";
const subject = "sociologie";
const moduleSlug = "socialisation";
const accentColor = "socio-purple";

const questionsRaw: QuizQuestion[] = [
  {
    id: "q1_lien_social",
    question: "Lequel de ces éléments N'EST PAS un des quatre types de liens sociaux distingués par Serge Paugam ?",
    options: ["Le lien de filiation", "Le lien de participation élective", "Le lien de participation organique", "Le lien de consommation"],
    correctAnswer: 3,
    explanation: "Serge Paugam distingue les liens de filiation, de participation élective, de participation organique et de citoyenneté."
  },
  {
    id: "q2_lien_social",
    question: "Selon Durkheim, la solidarité mécanique est typique des sociétés modernes à forte division du travail.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1,
    explanation: "La solidarité mécanique caractérise les sociétés traditionnelles (fondée sur la similitude), tandis que la solidarité organique (fondée sur la complémentarité) est typique des sociétés modernes."
  },
  {
    id: "q3_lien_social",
    question: "L'intégration sociale désigne le processus par lequel un individu devient membre d'une société.",
    options: ["Vrai", "Faux"],
    correctAnswer: 0,
    explanation: "L'intégration sociale implique l'adhésion aux normes et valeurs communes et la participation active à la vie sociale."
  },
  {
    id: "q4_lien_social",
    question: "Le concept d'anomie chez Durkheim fait référence à :",
    options: [
      "Une forte cohésion sociale",
      "Un affaiblissement des normes sociales et un dérèglement",
      "Une sur-intégration de l'individu",
      "Un excès de lois et de contraintes"
    ],
    correctAnswer: 1,
    explanation: "L'anomie est une situation où les normes sociales sont confuses, absentes ou contradictoires, entraînant une perte de repères pour les individus."
  },
  {
    id: "q5_lien_social",
    question: "Laquelle de ces affirmations décrit le mieux la solidarité organique selon Durkheim ?",
    options: [
      "Fondée sur la similitude des individus et une forte conscience collective.",
      "Caractéristique des sociétés où les individus sont très peu différenciés.",
      "Repose sur l'interdépendance des fonctions due à la division du travail.",
      "Implique un droit principalement répressif."
    ],
    correctAnswer: 2,
    explanation: "La solidarité organique naît de la différenciation des tâches ; les individus sont interdépendants car chacun remplit une fonction spécifique."
  },
  {
    id: "q6_lien_social",
    question: "Le processus de désaffiliation, analysé par Robert Castel, est principalement lié à la rupture des liens amicaux.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1,
    explanation: "La désaffiliation est un processus de fragilisation et de rupture des liens par rapport au travail (perte d'emploi, précarité) et à l'insertion relationnelle et communautaire."
  },
  {
    id: "q7_lien_social",
    question: "La montée de l'individualisme dans les sociétés contemporaines signifie nécessairement une disparition du lien social.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1,
    explanation: "La montée de l'individualisme transforme les liens sociaux (plus électifs, moins institutionnels) mais ne les fait pas disparaître. De nouvelles formes de solidarité peuvent émerger."
  },
  {
    id: "q8_lien_social",
    question: "Lequel de ces éléments est un exemple de lien de participation organique ?",
    options: ["Les relations entre frères et sœurs", "L'amitié avec un voisin", "Les relations entre collègues de travail", "L'appartenance à un parti politique"],
    correctAnswer: 2,
    explanation: "Le lien de participation organique est lié à la place de l'individu dans la sphère productive et la division du travail."
  },
  {
    id: "q9_lien_social",
    question: "La précarisation du travail peut affaiblir le lien social.",
    options: ["Vrai", "Faux"],
    correctAnswer: 0,
    explanation: "La précarité de l'emploi peut fragiliser l'intégration professionnelle (lien de participation organique) et avoir des répercussions sur d'autres liens sociaux."
  },
  {
    id: "q10_lien_social",
    question: "Les politiques d'intégration visent principalement à :",
    options: [
      "Augmenter les différences entre les groupes sociaux",
      "Renforcer la cohésion sociale et lutter contre l'exclusion",
      "Limiter les interactions entre les individus",
      "Promouvoir l'isolement individuel pour favoriser l'autonomie"
    ],
    correctAnswer: 1,
    explanation: "Les politiques d'intégration cherchent à assurer que tous les membres de la société puissent y participer pleinement et bénéficier de ses ressources."
  }
];

export default function LienSocialIntegrationQuizPage() {
  const { isLoading } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setMounted(true);
    setShuffledQuestions(shuffleArray(questionsRaw));
  }, []);

  if (!mounted || isLoading || shuffledQuestions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-socio-purple"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/quiz/sociologie"
          className="flex items-center text-socio-purple hover:text-socio-dark-purple dark:text-socio-light-purple dark:hover:text-socio-purple mb-4 transition-colors duration-150"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour aux quiz de Sociologie
        </Link>

        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
          <div className="flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <Link2 className="mr-3 h-7 w-7 sm:h-8 sm:w-8 text-socio-purple" />
              {quizTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Évaluez vos connaissances sur les formes de lien social, la solidarité et les processus d'intégration et de désaffiliation.
            </p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8"
      >
        <QuizPlayer
          questions={shuffledQuestions}
          quizId={chapterSlug}
          subjectId={subject}
        />
      </motion.div>

      <div className="mt-8 text-center">
        <Link
          href={`/sociologie/${moduleSlug}/${chapterSlug}`}
          className="text-sm text-socio-purple hover:underline"
        >
          Revoir le chapitre : {quizTitle.replace("Quiz: ", "")}
        </Link>
      </div>
    </div>
  );
} 