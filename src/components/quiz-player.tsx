"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Loader2, 
  RefreshCw, 
  XCircle 
} from "lucide-react";
import { QuizQuestion } from "@/hooks/useContent";
import { useProgress } from "@/hooks/useProgress";

type QuizPlayerProps = {
  questions: QuizQuestion[];
  quizId: string;
  subjectId: 'economie' | 'sociologie' | 'science-politique';
  onComplete?: (score: number, answers: number[]) => void;
};

export default function QuizPlayer({ questions, quizId, subjectId, onComplete }: QuizPlayerProps) {
  const { updateQuizProgress, getQuizProgress, isLoading } = useProgress();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  
  // Timer
  useEffect(() => {
    if (isCompleted) return;
    
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isCompleted]);
  
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswerSubmitted(true);
    
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedOption;
    
    setUserAnswers(newUserAnswers);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswerSubmitted(false);
    setSelectedOption(null);
    setShowExplanation(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      
      // Calculer le score en pourcentage
      const scorePercentage = Math.round((score / questions.length) * 100);
      
      // Mettre à jour la progression dans le système
      updateQuizProgress(subjectId, quizId, scorePercentage, true);
      
      // Appeler le callback onComplete si fourni
      if (onComplete) {
        onComplete(score, userAnswers);
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setIsAnswerSubmitted(false);
      setSelectedOption(userAnswers[currentQuestionIndex - 1] ?? null);
      setShowExplanation(false);
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setScore(0);
    setTimeSpent(0);
    setIsCompleted(false);
    setShowExplanation(false);
    
    // Enregistrer une nouvelle tentative avec un score de 0
    updateQuizProgress(subjectId, quizId, 0, false);
  };

  const getOptionClassName = (optionIndex: number) => {
    if (!isAnswerSubmitted) {
      return selectedOption === optionIndex
        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
        : "border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400";
    }
    
    if (optionIndex === currentQuestion.correctAnswer) {
      return "border-green-500 bg-green-50 dark:bg-green-900/20";
    }
    
    if (selectedOption === optionIndex && optionIndex !== currentQuestion.correctAnswer) {
      return "border-red-500 bg-red-50 dark:bg-red-900/20";
    }
    
    return "border-gray-300 dark:border-gray-700 opacity-50";
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-medium">
              Question {currentQuestionIndex + 1}/{questions.length}
            </span>
            <div className="ml-4 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-md flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {formatTime(timeSpent)}
            </div>
          </div>
          <div className="text-sm">
            Score: <span className="font-medium">{score}/{questions.length}</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>
        
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={isAnswerSubmitted}
              className={`w-full text-left p-4 border rounded-lg transition-colors ${getOptionClassName(
                index
              )}`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full border border-current text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </div>
                </div>
                <div>{option}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {isAnswerSubmitted && showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold flex items-center text-blue-800 dark:text-blue-300 mb-2">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Explication
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {currentQuestion.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-between mt-6">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Précédent
          </button>

          <div className="flex gap-3">
            {isAnswerSubmitted ? (
              <>
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="flex items-center px-4 py-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-md"
                >
                  {showExplanation ? "Masquer l'explication" : "Voir l'explication"}
                </button>
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      Suivant
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    "Terminer le quiz"
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                Valider ma réponse
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Modal */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h3 className="text-2xl font-bold mb-4">Résultats du quiz</h3>
              
              <div className="flex justify-between items-center mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {Math.round((score / questions.length) * 100)}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Score
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {score}/{questions.length}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Bonnes réponses
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">
                    {formatTime(timeSpent)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Temps
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                {score === questions.length ? (
                  <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-lg">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Parfait ! Vous avez répondu correctement à toutes les questions.</span>
                  </div>
                ) : score >= questions.length / 2 ? (
                  <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Bon travail ! Vous maîtrisez bien ce sujet.</span>
                  </div>
                ) : (
                  <div className="flex items-center p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 rounded-lg">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>Continuez à réviser ce sujet pour améliorer vos connaissances.</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleRestartQuiz}
                  className="flex items-center px-4 py-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-md"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Recommencer
                </button>
                <button
                  onClick={() => window.location.href = "/quiz"}
                  className="flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Retour aux quiz
                </button>
                <button
                  onClick={() => window.location.href = `/quiz/${subjectId}`}
                  className="flex items-center px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md"
                >
                  Plus de quiz {subjectId === 'economie' ? "d'économie" : subjectId === 'sociologie' ? "de sociologie" : "de science politique"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
