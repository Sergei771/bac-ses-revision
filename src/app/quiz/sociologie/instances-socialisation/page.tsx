"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react"; // Users as a general icon for instances
import { useProgress } from "@/hooks/useProgress";
import QuizPlayer from "@/components/quiz-player";
import { QuizQuestion } from "@/hooks/useContent";
import { shuffleArray } from "@/lib/utils";

const quizTitle = "Quiz: Les Instances de Socialisation";
const chapterSlug = "instances-socialisation";
const subject = "sociologie";
const moduleSlug = "socialisation"; // As per original file
const accentColor = "socio-purple";

const questionsRaw: QuizQuestion[] = [
  {
    id: "q1_instances_soc",
    question: "Laquelle de ces instances est considérée comme la principale pour la socialisation primaire ?",
    options: ["Les médias", "L'école", "La famille", "Le groupe de pairs"],
    correctAnswer: 2, // Was "La famille"
    explanation: "La famille est l'instance fondamentale de la socialisation primaire, intervenant dès les premiers moments de la vie."
  },
  {
    id: "q2_instances_soc",
    question: "L'école transmet uniquement des savoirs formels (lire, écrire, compter).",
    options: ["Vrai", "Faux"],
    correctAnswer: 1, // Was "Faux"
    explanation: "L'école transmet des savoirs formels, mais aussi des normes (discipline, ponctualité) et des valeurs (mérite, effort) de manière implicite."
  },
  {
    id: "q3_instances_soc",
    question: "Le groupe de pairs a une influence particulièrement forte durant :",
    options: ["La petite enfance", "L'adolescence", "L'âge adulte avancé", "La vieillesse"],
    correctAnswer: 1, // Was "L'adolescence"
    explanation: "Bien que présente à d'autres âges, l'influence du groupe de pairs est souvent maximale à l'adolescence, période de construction identitaire et de distanciation par rapport à la famille."
  },
  {
    id: "q4_instances_soc",
    question: "Les médias ne jouent qu'un rôle mineur dans la socialisation des jeunes aujourd'hui.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1, // Was "Faux"
    explanation: "Les médias (internet, réseaux sociaux, TV, etc.) sont des instances de socialisation majeures, véhiculant informations, modèles, valeurs et stéréotypes."
  },
  {
    id: "q5_instances_soc",
    question: "La socialisation professionnelle fait partie de :",
    options: [
      "Uniquement la socialisation primaire",
      "Principalement la socialisation secondaire",
      "La socialisation anticipatrice uniquement",
      "N'est pas considérée comme une forme de socialisation"
    ],
    correctAnswer: 1, // Was "Principalement la socialisation secondaire"
    explanation: "La socialisation professionnelle (apprentissage des normes et compétences d'un métier) est un exemple typique de socialisation secondaire."
  },
  {
    id: "q6_instances_soc",
    question: "La pluralité des instances de socialisation signifie que toutes les instances transmettent toujours des messages convergents.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1, // Was "Faux"
    explanation: "La pluralité des instances implique que leurs influences peuvent être convergentes, complémentaires, mais aussi parfois contradictoires ou divergentes."
  },
  {
    id: "q7_instances_soc",
    question: "L'hexis corporelle (manière de se tenir, de bouger) est principalement innée et non apprise.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1, // Was "Faux"
    explanation: "L'hexis corporelle est socialement construite et transmise par la socialisation, notamment au sein de la famille et par imitation."
  },
  {
    id: "q8_instances_soc",
    question: "Quelle instance de socialisation est particulièrement associée à l'apprentissage de l'interaction horizontale (entre égaux) ?",
    options: ["La famille (relation parents-enfants)", "L'école (relation maître-élève)", "Le groupe de pairs", "Les médias traditionnels"],
    correctAnswer: 2, // Was "Le groupe de pairs"
    explanation: "Le groupe de pairs est un lieu privilégié d'apprentissage des relations entre égaux, de la coopération et de la gestion des conflits."
  },
  {
    id: "q9_instances_soc",
    question: "La socialisation conjugale est un processus où les deux partenaires adaptent mutuellement leurs normes et valeurs.",
    options: ["Vrai", "Faux"],
    correctAnswer: 0, // Was "Vrai"
    explanation: "La socialisation conjugale, instance de socialisation secondaire, implique un ajustement et une négociation des manières de vivre et des valeurs entre les conjoints."
  },
  {
    id: "q10_instances_soc",
    question: "Lequel de ces éléments N'EST PAS typiquement transmis par l'école en tant qu'instance de socialisation ?",
    options: [
      "Le respect des horaires",
      "Les compétences professionnelles très spécialisées pour un premier emploi",
      "La méthode de travail pour résoudre un problème mathématique",
      "L'apprentissage de la vie en collectivité avec des règles communes"
    ],
    correctAnswer: 1, // Was "Les compétences professionnelles très spécialisées pour un premier emploi"
    explanation: "Si l'école donne des bases, les compétences très spécialisées sont plutôt acquises lors de la socialisation professionnelle (en entreprise, formations spécifiques)."
  }
];

export default function InstancesSocialisationQuizPage() {
  const { isLoading } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setMounted(true);
    setShuffledQuestions(shuffleArray(questionsRaw));
  }, []);

  // const handleQuizComplete = (score: number, totalQuestions: number) => {
  //   console.log(`Quiz '${chapterSlug}' (${subject}) terminé avec un score de ${score}/${totalQuestions}`);
  // };

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
              Testez votre compréhension du rôle des différentes instances (famille, école, pairs, médias...) dans le processus de socialisation.
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