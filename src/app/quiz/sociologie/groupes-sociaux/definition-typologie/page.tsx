"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react"; // Changed icon
import { useProgress } from "@/hooks/useProgress";
import QuizPlayer from "@/components/quiz-player";
import { QuizQuestion } from "@/hooks/useContent"; // Standard QuizQuestion type
import { shuffleArray } from "@/lib/utils";

const quizTitle = "Quiz: Groupes Sociaux - Définition et Typologie";
const chapterSlug = "definition-typologie";
const subject = "sociologie";
const moduleSlug = "groupes-sociaux"; // Keep for chapter link
const accentColor = "socio-purple";

// Adapted from initialQuestions, ensure structure matches QuizQuestion from useContent
const questionsRaw: QuizQuestion[] = [
  {
    id: "q1_def_typo_groupes", // Changed id to string
    question: "Un ensemble d'individus attendant le bus constitue un groupe social au sens sociologique.", // Renamed questionText
    // type: "vrai-faux", // Type is often implicit or handled by options length in QuizPlayer
    options: ["Vrai", "Faux"], // For vrai-faux, provide options
    correctAnswer: 1,
    explanation: "Un agrégat physique (comme une file d'attente) ne constitue pas un groupe social car il manque généralement d'interactions régulières et d'une conscience d'appartenance."
  },
  {
    id: "q2_def_typo_groupes",
    question: "Lequel de ces critères N'EST PAS essentiel pour définir un groupe social ?",
    // type: "qcm",
    options: [
      "Des interactions régulières entre les membres",
      "Une conscience d'appartenance commune",
      "Des objectifs ou intérêts communs",
      "Une taille minimale de 50 personnes"
    ],
    correctAnswer: 3,
    explanation: "La taille d'un groupe social peut varier considérablement. Les autres critères (interactions, conscience d'appartenance, objectifs communs) sont plus fondamentaux."
  },
  {
    id: "q3_def_typo_groupes",
    question: "Un groupe primaire se caractérise par des relations formelles et impersonnelles.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1,
    explanation: "Les groupes primaires (ex: famille, amis proches) se caractérisent par des relations directes, intimes et affectives, et une forte cohésion."
  },
  {
    id: "q4_def_typo_groupes",
    question: "Une entreprise est un exemple typique de :",
    options: ["Groupe primaire", "Groupe secondaire", "Agrégat physique", "Catégorie statistique"],
    correctAnswer: 1,
    explanation: "Une entreprise est un groupe secondaire, où les relations sont plus formelles et fonctionnelles, orientées vers des buts spécifiques."
  },
  {
    id: "q5_def_typo_groupes",
    question: "Le groupe de référence est toujours identique au groupe d'appartenance.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1,
    explanation: "Le groupe de référence (celui auquel on s'identifie) peut être différent du groupe d'appartenance (celui dont on fait objectivement partie). C'est le cas de la socialisation anticipatrice."
  },
  {
    id: "q6_def_typo_groupes",
    question: "Laquelle de ces propositions décrit le mieux un groupe d'appartenance ?",
    options: [
      "Un groupe que l'individu admire et dont il imite les comportements.",
      "Un groupe dont l'individu fait objectivement partie (ex: sa profession).",
      "Un groupe avec lequel l'individu n'a aucune interaction.",
      "Un groupe toujours choisi volontairement par l'individu."
    ],
    correctAnswer: 1,
    explanation: "Le groupe d'appartenance est défini par des critères objectifs qui situent l'individu dans la structure sociale."
  },
  {
    id: "q7_def_typo_groupes",
    question: "La famille est généralement considérée comme un :",
    options: [
      "Groupe secondaire et groupe de référence uniquement",
      "Groupe primaire et groupe d'appartenance",
      "Catégorie statistique et groupe secondaire",
      "Agrégat physique et groupe primaire"
    ],
    correctAnswer: 1,
    explanation: "La famille est l'exemple type du groupe primaire (liens affectifs forts) et constitue un groupe d'appartenance fondamental."
  },
  {
    id: "q8_def_typo_groupes",
    question: "La socialisation anticipatrice se produit lorsqu'un individu adopte les normes et valeurs de son groupe d'appartenance.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1,
    explanation: "La socialisation anticipatrice implique d'adopter les normes et valeurs d'un groupe de référence auquel on n'appartient pas encore, mais que l'on souhaite intégrer."
  },
  {
    id: "q9_def_typo_groupes",
    question: "Les 'catégories socioprofessionnelles' (CSP) sont un exemple de :",
    options: [
      "Groupe primaire",
      "Groupe de référence pour tous les individus",
      "Catégorie statistique",
      "Agrégat physique"
    ],
    correctAnswer: 2,
    explanation: "Les CSP regroupent des individus selon leur profession, mais ces individus n'ont pas nécessairement d'interactions ou de conscience d'appartenance commune. C'est une catégorie statistique."
  },
  {
    id: "q10_def_typo_groupes",
    question: "La distinction entre groupe primaire et secondaire a été principalement développée par :",
    options: ["Karl Marx", "Émile Durkheim", "Max Weber", "Charles Cooley"],
    correctAnswer: 3,
    explanation: "C'est Charles Horton Cooley qui a introduit la distinction fondamentale entre groupes primaires et groupes secondaires."
  }
];

export default function DefinitionTypologieQuizPage() {
  const { isLoading } = useProgress(); // isLoading from useProgress
  const [mounted, setMounted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setMounted(true);
    // Ensure questions are shuffled. Note: QuizPlayer might also have its own shuffling.
    // It's good practice to shuffle them before passing if QuizPlayer expects pre-shuffled questions
    // or doesn't shuffle them in a way that meets requirements (e.g. if seed is needed).
    // For now, assume QuizPlayer can handle potentially unshuffled or shuffle them itself.
    // Let's shuffle them here for consistency with other quizzes.
    setShuffledQuestions(shuffleArray(questionsRaw)); 
  }, []);

  // onComplete is handled by QuizPlayer's internal useProgress hook
  const handleQuizComplete = (score: number, totalQuestions: number) => {
    console.log('Quiz completed:', chapterSlug, subject, score, totalQuestions);
    // Additional logic if needed after quiz completion, beyond what QuizPlayer handles.
  };

  if (!mounted || isLoading || shuffledQuestions.length === 0) { 
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-socio-purple"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* En-tête standardisé */}
      <div className="mb-8">
        <Link 
          href="/quiz/sociologie" // Link back to sociology quizzes
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
              Testez vos connaissances sur la définition et les différentes typologies des groupes sociaux.
            </p>
          </div>
        </div>
      </div>

      {/* Lecteur de Quiz */}
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
          // onComplete is handled by QuizPlayer through useProgress hook
          // If specific onComplete logic for this page is needed beyond progress tracking:
          // onComplete={(s, t) => handleQuizComplete(s,t)} 
        />
      </motion.div>
      
      {/* Lien pour revoir le chapitre */}
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