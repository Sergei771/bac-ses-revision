"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Brain, Users, RotateCcw } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

const quizTitle = "Quiz: La Diversité des Processus de Socialisation";
const chapterSlug = "diversite-socialisation";
const subject = "sociologie";
const moduleSlug = "socialisation";
const accentColor = "socio-purple";

interface Question {
  id: number;
  questionText: string;
  type: "qcm" | "vrai-faux";
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  userAnswer?: string | null;
  isCorrect?: boolean | null;
}

const initialQuestions: Question[] = [
  {
    id: 1,
    questionText: "La socialisation différenciée signifie que tous les individus d'une société sont socialisés de manière identique pour assurer la cohésion sociale.",
    type: "vrai-faux",
    correctAnswer: "Faux",
    explanation: "La socialisation différenciée implique au contraire que les individus sont socialisés différemment selon des facteurs comme le genre, le milieu social ou la culture."
  },
  {
    id: 2,
    questionText: "Lequel de ces éléments N'EST PAS un agent principal de la socialisation de genre ?",
    type: "qcm",
    options: ["La famille", "L'école", "Les médias", "Les gènes"],
    correctAnswer: "Les gènes",
    explanation: "Si le sexe biologique est déterminé génétiquement, le genre (rôles, comportements sociaux) est construit socialement par des agents comme la famille, l'école, et les médias."
  },
  {
    id: 3,
    questionText: "Le concept de 'capital culturel' a été développé par :",
    type: "qcm",
    options: ["Émile Durkheim", "Max Weber", "Pierre Bourdieu", "Karl Marx"],
    correctAnswer: "Pierre Bourdieu",
    explanation: "Pierre Bourdieu a introduit le concept de capital culturel pour désigner les ressources culturelles transmises par la famille et valorisées socialement, notamment à l'école."
  },
  {
    id: 4,
    questionText: "L'habitus, selon Bourdieu, est un système de dispositions...",
    type: "qcm",
    options: [
      "Inné et universel",
      "Acquis et propre à chaque individu, indépendamment de son milieu",
      "Acquis, durable et transposable, structurant les pratiques et représentations",
      "Conscient et réfléchi, guidant les choix rationnels"
    ],
    correctAnswer: "Acquis, durable et transposable, structurant les pratiques et représentations",
    explanation: "L'habitus est intériorisé par les individus du fait de leurs conditions d'existence (milieu social) et oriente leurs manières d'agir, de penser et de sentir de façon souvent inconsciente."
  },
  {
    id: 5,
    questionText: "Considérer sa propre culture comme supérieure aux autres est une manifestation de :",
    type: "qcm",
    options: ["Relativisme culturel", "Ethnocentrisme", "Acculturation", "Assimilation"],
    correctAnswer: "Ethnocentrisme",
    explanation: "L'ethnocentrisme est la tendance à juger les autres cultures à partir de ses propres normes et valeurs, souvent en les dévalorisant."
  },
  {
    id: 6,
    questionText: "La socialisation varie selon le milieu social, influençant notamment le rapport au langage et les pratiques culturelles.",
    type: "vrai-faux",
    correctAnswer: "Vrai",
    explanation: "Le milieu social transmet des manières de parler, des goûts et des pratiques culturelles qui peuvent différer significativement et avoir un impact sur la trajectoire scolaire et sociale."
  },
  {
    id: 7,
    questionText: "Le relativisme culturel consiste à :",
    type: "qcm",
    options: [
      "Hiérarchiser les cultures selon leur degré de développement",
      "Comprendre les pratiques d'une culture en les rapportant à son propre contexte, sans jugement de valeur",
      "Promouvoir l'uniformisation culturelle mondiale",
      "Nier l'existence de valeurs universelles"
    ],
    correctAnswer: "Comprendre les pratiques d'une culture en les rapportant à son propre contexte, sans jugement de valeur",
    explanation: "Le relativisme culturel est une approche méthodologique et une attitude qui vise à analyser les faits sociaux et culturels sans les juger à l'aune de ses propres critères culturels."
  },
  {
    id: 8,
    questionText: "Laquelle de ces affirmations sur la socialisation de genre est FAUSSE ?",
    type: "qcm",
    options: [
      "Elle commence dès la petite enfance.",
      "Elle est principalement transmise par les institutions religieuses.",
      "Elle peut conduire à des inégalités entre hommes et femmes.",
      "Elle est influencée par les jouets, les vêtements et les médias."
    ],
    correctAnswer: "Elle est principalement transmise par les institutions religieuses.",
    explanation: "Bien que les institutions religieuses puissent jouer un rôle, la socialisation de genre est principalement transmise par la famille, l'école, les médias et les pairs."
  },
  {
    id: 9,
    questionText: "L'exposition à des influences culturelles multiples peut conduire à des identités culturelles plurielles.",
    type: "vrai-faux",
    correctAnswer: "Vrai",
    explanation: "Dans des sociétés de plus en plus interconnectées, les individus sont souvent amenés à intégrer des éléments de différentes cultures, forgeant ainsi des identités complexes et plurielles."
  },
  {
    id: 10,
    questionText: "Le concept de 'socialisation anticipatrice' (non abordé directement dans le chapitre mais lié) décrit :",
    type: "qcm",
    options: [
      "L'intériorisation des normes d'un groupe auquel on n'appartient pas encore mais que l'on souhaite intégrer.",
      "La socialisation reçue pendant l'enfance.",
      "Le processus de resocialisation à l'âge adulte.",
      "L'échec du processus de socialisation."
    ],
    correctAnswer: "L'intériorisation des normes d'un groupe auquel on n'appartient pas encore mais que l'on souhaite intégrer.",
    explanation: "La socialisation anticipatrice est un processus par lequel un individu adopte les normes et valeurs d'un groupe de référence auquel il aspire à appartenir."
  }
];

export default function DiversiteSocialisationQuizPage() {
  const [questions, setQuestions] = useState<Question[]>(() => 
    initialQuestions.map(q => ({ ...q, userAnswer: null, isCorrect: null }))
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { updateChapterProgress, getChapterProgress } = useProgress();

  useEffect(() => setMounted(true), []);

  const handleAnswer = (answer: string) => {
    const newQuestions = [...questions];
    const currentQuestion = newQuestions[currentQuestionIndex];
    currentQuestion.userAnswer = answer;
    currentQuestion.isCorrect = Array.isArray(currentQuestion.correctAnswer) 
      ? currentQuestion.correctAnswer.includes(answer) 
      : currentQuestion.correctAnswer === answer;
    
    if (currentQuestion.isCorrect) {
      setScore(score + 1);
    }
    setQuestions(newQuestions);

    // Aller à la question suivante ou afficher les résultats
    // setTimeout(() => {
    //   if (currentQuestionIndex < questions.length - 1) {
    //     setCurrentQuestionIndex(currentQuestionIndex + 1);
    //   } else {
    //     setShowResults(true);
    //     handleQuizCompletion();
    //   }
    // }, 1000); // Délai pour voir la correction
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      handleQuizCompletion();
    }
  }

  const handleQuizCompletion = () => {
    const chapterProgress = getChapterProgress(subject, chapterSlug) || { 
      timeSpent: 0, 
      completed: false,
    };
    
    updateChapterProgress(subject, chapterSlug, {
      timeSpent: chapterProgress.timeSpent,
      completed: chapterProgress.completed || (score / questions.length >= 0.7),
    });
  };

  const resetQuiz = () => {
    setQuestions(initialQuestions.map(q => ({ ...q, userAnswer: null, isCorrect: null })));
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
  };

  if (!mounted) return null;

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-${accentColor}`}
      >
        <div className="text-center">
          <Brain className={`w-16 h-16 mx-auto mb-4 text-${accentColor}`} />
          <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Résultats du Quiz</h2>
          <p className={`text-xl font-semibold mb-4 ${percentage >= 70 ? 'text-green-500' : 'text-red-500'}`}>
            Votre score: {score} / {questions.length} ({percentage.toFixed(0)}%)
          </p>
          {percentage >= 70 ? (
            <p className="text-green-600 dark:text-green-400 mb-6">Félicitations ! Vous maîtrisez bien les nuances de la socialisation.</p>
          ) : (
            <p className="text-red-600 dark:text-red-400 mb-6">Continuez à explorer ce chapitre pour approfondir votre compréhension.</p>
          )}
        </div>

        <div className="space-y-4 mb-8">
          {questions.map((q) => (
            <div key={q.id} className={`p-3 rounded-lg ${q.isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <p className="font-medium text-gray-800 dark:text-gray-100">{q.questionText}</p>
              <p className={`text-sm ${q.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                Votre réponse: {q.userAnswer || "Non répondu"}. {q.isCorrect ? "Correct !" : `Incorrect. La bonne réponse était : ${q.correctAnswer}`}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{q.explanation}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <button
            onClick={resetQuiz}
            className={`w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-${accentColor} hover:bg-${accentColor}/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${accentColor}`}
          >
            <RotateCcw className="h-5 w-5 mr-2" /> Refaire le quiz
          </button>
          <Link
            href={`/${subject}/${moduleSlug}/${chapterSlug}`}
            className="w-full sm:w-auto text-center px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg shadow-sm"
          >
            Retourner au chapitre
          </Link>
          <Link
            href={`/${subject}/${moduleSlug}`}
            className="w-full sm:w-auto text-center px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg shadow-sm"
          >
            Retour au module
          </Link>
        </div>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <motion.div
      key={currentQuestionIndex}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className={`max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-${accentColor}`}
    >
      <div className="mb-6">
        <Link
          href={`/${subject}/${moduleSlug}/${chapterSlug}`}
          className={`flex items-center text-sm text-${accentColor} hover:text-${accentColor}/80 dark:text-${accentColor} dark:hover:text-${accentColor}/70 mb-2 transition-colors`}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour au chapitre
        </Link>
        <div className="flex justify-between items-center mb-2">
          <h1 className={`text-2xl font-bold text-gray-900 dark:text-white flex items-center`}>
            <Brain className={`mr-2 h-7 w-7 text-${accentColor}`} /> {quizTitle}
          </h1>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full bg-${accentColor}/10 text-${accentColor}`}>
            Question {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>
        <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1`}>
          <div
            className={`bg-${accentColor} h-2.5 rounded-full transition-all duration-300 ease-out`}
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 min-h-[3em]">{currentQuestion.questionText}</h2>
        <div className="space-y-3 mb-6">
          {currentQuestion.type === "qcm" && currentQuestion.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={currentQuestion.userAnswer !== null}
              className={`w-full text-left p-3 rounded-lg transition-all duration-150 ease-in-out 
                ${currentQuestion.userAnswer === null 
                  ? `bg-gray-50 dark:bg-gray-700 hover:bg-${accentColor}/10 dark:hover:bg-${accentColor}/20 border-2 border-transparent hover:border-${accentColor}/50` 
                  : option === currentQuestion.correctAnswer 
                    ? 'bg-green-100 dark:bg-green-700/30 text-green-700 dark:text-green-300 border-2 border-green-500 scale-105'
                    : option === currentQuestion.userAnswer 
                      ? 'bg-red-100 dark:bg-red-700/30 text-red-700 dark:text-red-300 border-2 border-red-500'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}
              `}
            >
              {option}
            </button>
          ))}
          {currentQuestion.type === "vrai-faux" && ["Vrai", "Faux"].map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={currentQuestion.userAnswer !== null}
              className={`w-full text-left p-3 rounded-lg transition-all duration-150 ease-in-out 
                ${currentQuestion.userAnswer === null 
                  ? `bg-gray-50 dark:bg-gray-700 hover:bg-${accentColor}/10 dark:hover:bg-${accentColor}/20 border-2 border-transparent hover:border-${accentColor}/50` 
                  : option === currentQuestion.correctAnswer 
                    ? 'bg-green-100 dark:bg-green-700/30 text-green-700 dark:text-green-300 border-2 border-green-500 scale-105'
                    : option === currentQuestion.userAnswer 
                      ? 'bg-red-100 dark:bg-red-700/30 text-red-700 dark:text-red-300 border-2 border-red-500'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {currentQuestion.userAnswer !== null && (
          <motion.div 
            initial={{ opacity: 0, y:10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-lg mb-4 ${currentQuestion.isCorrect ? 'bg-green-50 dark:bg-green-800/30' : 'bg-red-50 dark:bg-red-800/30'}`}
          >
            <div className="flex items-center">
              {currentQuestion.isCorrect ? (
                <CheckCircle className="h-6 w-6 mr-2 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 mr-2 text-red-500" />
              )}
              <p className={`text-sm font-medium ${currentQuestion.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                {currentQuestion.isCorrect ? "Bonne réponse !" : "Dommage !"}
              </p>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 ml-8">{currentQuestion.explanation}</p>
          </motion.div>
        )}

        <button
          onClick={handleNextQuestion}
          disabled={currentQuestion.userAnswer === null}
          className={`w-full mt-4 px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-${accentColor} hover:bg-${accentColor}/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${accentColor} disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed`}
        >
          {currentQuestionIndex < questions.length - 1 ? "Question suivante" : "Voir les résultats"}
        </button>
      </div>
    </motion.div>
  );
} 