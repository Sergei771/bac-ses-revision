"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import QuizPlayer from "@/components/quiz-player";
import { QuizQuestion } from "@/hooks/useContent";
import { shuffleArray } from "@/lib/utils";

const quizTitle = "Quiz: Socialisation Primaire et Secondaire";
const chapterSlug = "socialisation-primaire-secondaire";
const subject = "sociologie";
const moduleSlug = "socialisation";
const accentColor = "socio-purple";

const questionsRaw: QuizQuestion[] = [
  {
    id: "q1_soc_prim_sec",
    question: "La socialisation primaire se déroule principalement à l'âge adulte.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1,
    explanation: "La socialisation primaire a lieu durant l'enfance et constitue le socle de l'identité sociale."
  },
  {
    id: "q2_soc_prim_sec",
    question: "Quel est le principal agent de socialisation durant la phase primaire ?",
    options: ["L'école", "Les médias", "La famille", "Le groupe de pairs"],
    correctAnswer: 2,
    explanation: "La famille est l'instance centrale de la socialisation primaire, transmettant les normes et valeurs fondamentales."
  },
  {
    id: "q3_soc_prim_sec",
    question: "La socialisation secondaire permet d'acquérir des rôles sociaux spécifiques.",
    options: ["Vrai", "Faux"],
    correctAnswer: 0,
    explanation: "La socialisation secondaire est liée à l'intégration dans des sphères sociales particulières (profession, associations, etc.) et à l'apprentissage des rôles correspondants."
  },
  {
    id: "q4_soc_prim_sec",
    question: "L'intériorisation des normes signifie que l'individu les connaît mais ne les accepte pas forcément.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1,
    explanation: "L'intériorisation implique que l'individu fait siennes les normes et valeurs, les intégrant à sa personnalité au point qu'elles lui semblent naturelles."
  },
  {
    id: "q5_soc_prim_sec",
    question: "Laquelle de ces situations relève typiquement de la socialisation secondaire ?",
    options: [
      "Apprendre à marcher et parler",
      "Intégrer une nouvelle entreprise et apprendre sa culture",
      "Développer les premières interactions avec ses frères et sœurs",
      "Apprendre les règles de politesse de base à la maison"
    ],
    correctAnswer: 1,
    explanation: "L'intégration professionnelle est un exemple clé de socialisation secondaire, impliquant l'apprentissage de nouvelles normes et compétences spécifiques."
  },
  {
    id: "q6_soc_prim_sec",
    question: "La socialisation anticipatrice consiste à rejeter les normes du groupe auquel on appartient.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1,
    explanation: "La socialisation anticipatrice est l'adoption des normes et valeurs d'un groupe de référence auquel on souhaite appartenir, avant même d'y être intégré."
  },
  {
    id: "q7_soc_prim_sec",
    question: "Une rupture entre socialisation primaire et secondaire peut conduire à :",
    options: [
      "Uniquement un renforcement des acquis primaires",
      "Une resocialisation ou une conversion",
      "L'impossibilité d'apprendre de nouvelles normes",
      "Une disparition totale de l'influence de la socialisation primaire"
    ],
    correctAnswer: 1,
    explanation: "Lorsque les normes de la socialisation secondaire sont en forte contradiction avec celles de la primaire, cela peut entraîner une redéfinition identitaire (resocialisation, conversion)."
  },
  {
    id: "q8_soc_prim_sec",
    question: "Lequel de ces éléments N'EST PAS une caractéristique typique de la socialisation primaire comparée à la secondaire ?",
    options: [
      "Forte charge affective",
      "Caractère plus général et fondamental",
      "Plus grande réflexivité de l'individu",
      "Influence durable sur la personnalité"
    ],
    correctAnswer: 2,
    explanation: "La socialisation primaire, surtout chez le jeune enfant, est moins réflexive. La socialisation secondaire peut impliquer une démarche plus consciente d'apprentissage."
  },
  {
    id: "q9_soc_prim_sec",
    question: "La socialisation professionnelle est un exemple de socialisation primaire.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1,
    explanation: "La socialisation professionnelle est un processus typique de la socialisation secondaire, intervenant à l'âge adulte."
  },
  {
    id: "q10_soc_prim_sec",
    question: "Le concept de 'rôle social' désigne :",
    options: [
      "Les opinions politiques d'un individu",
      "L'ensemble des comportements attendus d'un individu selon son statut",
      "Les capacités innées d'une personne",
      "Le niveau de revenu d'un individu"
    ],
    correctAnswer: 1,
    explanation: "Un rôle social est un ensemble de droits et d'obligations, de modèles de conduite, associés à une position sociale donnée."
  }
];

export default function SocialisationPrimaireSecondaireQuizPage() {
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
              <Users className="mr-3 h-7 w-7 sm:h-8 sm:w-8 text-socio-purple" />
              {quizTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Testez votre compréhension des différences et des articulations entre la socialisation primaire et la socialisation secondaire.
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