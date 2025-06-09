"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookCopy, Check, X, Info, RotateCcw, Clock } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

const quizData = {
  id: "socio-normes-deviance-quiz",
  title: "Quiz - Normes et déviance",
  subject: "sociologie",
  module: "controle-social-deviance",
  chapter: "normes-deviance",
  difficulty: "moyen",
  estimatedTime: "15-20 min",
  description: "Testez vos connaissances sur les normes sociales et la déviance",
  questions: [
    {
      id: "q1",
      question: "Comment peut-on définir une norme sociale ?",
      options: [
        "Une règle instinctive et naturelle que tout individu comprend sans apprentissage",
        "Une règle de conduite définie et sanctionnée qui oriente les comportements dans un contexte social donné",
        "Une loi formelle nécessairement écrite et appliquée par l'État",
        "Une préférence personnelle qu'un individu choisit librement de suivre"
      ],
      correctAnswer: 1,
      explanation: "Les normes sociales sont des règles de conduite définies socialement et sanctionnées (positivement ou négativement) qui orientent les comportements des individus dans un contexte social donné. Elles ne sont ni instinctives ni purement personnelles, et ne se limitent pas aux lois formelles."
    },
    {
      id: "q2",
      question: "Selon Howard Becker, la déviance est :",
      options: [
        "Un comportement pathologique résultant d'un trouble mental",
        "Le résultat d'un processus d'étiquetage social",
        "Une caractéristique innée de certains individus",
        "Uniquement associée aux actes criminels graves"
      ],
      correctAnswer: 1,
      explanation: "Dans sa théorie de l'étiquetage, Howard Becker définit la déviance non comme une qualité inhérente à un acte, mais comme le résultat d'un processus d'étiquetage social. Un individu devient déviant lorsque son comportement est désigné comme tel par les autres."
    },
    {
      id: "q3",
      question: "Parmi les sanctions suivantes, laquelle est considérée comme informelle ?",
      options: [
        "Une amende pour excès de vitesse",
        "Une peine d'emprisonnement",
        "Un regard désapprobateur",
        "Une convocation au tribunal"
      ],
      correctAnswer: 2,
      explanation: "Les sanctions informelles sont des réactions sociales non institutionnalisées comme les regards désapprobateurs, les moqueries, l'exclusion sociale, etc. Elles se distinguent des sanctions formelles qui sont institutionnalisées et codifiées (amendes, peines de prison, etc.)."
    },
    {
      id: "q4",
      question: "Quel concept Erving Goffman a-t-il développé pour décrire le processus par lequel un individu déviant se voit attribuer une identité négative ?",
      options: [
        "L'anomie",
        "L'étiquetage",
        "La stigmatisation",
        "L'exclusion sociale"
      ],
      correctAnswer: 2,
      explanation: "Erving Goffman a développé le concept de stigmatisation pour décrire le processus par lequel un individu déviant se voit attribuer une identité négative qui peut devenir prépondérante dans ses interactions sociales. Le stigmate devient alors un 'statut principal' qui éclipse les autres caractéristiques de l'individu."
    },
    {
      id: "q5",
      question: "Quelle affirmation illustre le mieux la relativité culturelle et historique des normes sociales ?",
      options: [
        "Les normes sont universelles et immuables dans toutes les sociétés",
        "Les normes sont uniquement déterminées par la biologie humaine",
        "Un comportement considéré comme déviant dans une société peut être valorisé dans une autre",
        "La déviance est toujours considérée négativement, quelle que soit la société"
      ],
      correctAnswer: 2,
      explanation: "La relativité culturelle et historique des normes sociales signifie qu'un comportement peut être considéré comme déviant dans une société ou à une époque donnée, mais parfaitement normal ou même valorisé dans une autre société ou à une autre époque. Par exemple, le tatouage a été longtemps stigmatisé en Occident alors qu'il était valorisé dans certaines cultures polynésiennes."
    },
    {
      id: "q6",
      question: "Selon la théorie de l'anomie de Robert K. Merton, la déviance peut résulter de :",
      options: [
        "L'absence totale de normes sociales",
        "Un décalage entre les buts valorisés par la société et les moyens légitimes pour les atteindre",
        "Une socialisation défaillante durant l'enfance",
        "La présence excessive de règles contradictoires"
      ],
      correctAnswer: 1,
      explanation: "Selon la théorie de l'anomie de Robert K. Merton, la déviance peut résulter d'un décalage entre les buts culturellement valorisés par la société (comme la réussite matérielle) et les moyens légitimes disponibles pour les atteindre. Face à cette tension, les individus peuvent adopter différentes stratégies d'adaptation, dont certaines sont déviantes."
    },
    {
      id: "q7",
      question: "Quelle fonction les normes sociales remplissent-elles principalement selon Émile Durkheim ?",
      options: [
        "Assurer le contrôle des élites sur les masses",
        "Permettre l'expression des individualités",
        "Maintenir la solidarité sociale",
        "Favoriser l'innovation et le changement social"
      ],
      correctAnswer: 2,
      explanation: "Selon Émile Durkheim, les normes sociales jouent un rôle crucial dans le maintien de la solidarité sociale. Elles constituent le 'fait social' par excellence et sont essentielles à la cohésion de la société, que cette solidarité soit mécanique (basée sur la similitude) ou organique (basée sur la complémentarité)."
    },
    {
      id: "q8",
      question: "Quel type de contrôle social correspond à un ensemble de règles formalisées et appliquées par des institutions spécialisées ?",
      options: [
        "Contrôle social informel",
        "Contrôle social formel",
        "Contrôle social symbolique",
        "Contrôle social naturel"
      ],
      correctAnswer: 1,
      explanation: "Le contrôle social formel correspond à un ensemble de règles formalisées, codifiées et appliquées par des institutions spécialisées comme la police, la justice ou l'école. Il se distingue du contrôle social informel qui s'exerce à travers des mécanismes moins institutionnalisés comme la famille, les pairs ou l'opinion publique."
    },
    {
      id: "q9",
      question: "Dans quel ouvrage Howard Becker développe-t-il sa théorie de l'étiquetage ?",
      options: [
        "Le Suicide",
        "Outsiders",
        "Stigmate",
        "La Distinction"
      ],
      correctAnswer: 1,
      explanation: "Howard Becker développe sa théorie de l'étiquetage dans son ouvrage 'Outsiders: Études de sociologie de la déviance' (1963). Dans ce livre, il analyse notamment comment certains individus deviennent des 'outsiders' ou déviants à travers un processus d'étiquetage social."
    },
    {
      id: "q10",
      question: "Quel phénomène illustre le mouvement #MeToo en termes de normes sociales ?",
      options: [
        "La permanence des normes sociales à travers le temps",
        "L'universalité des normes sexuelles dans toutes les cultures",
        "L'évolution des normes sociales sous l'influence des mouvements sociaux",
        "L'inefficacité des sanctions sociales pour faire respecter les normes"
      ],
      correctAnswer: 2,
      explanation: "Le mouvement #MeToo illustre l'évolution des normes sociales sous l'influence des mouvements sociaux. Il montre comment des comportements longtemps tolérés (certaines formes de harcèlement sexuel) peuvent devenir fortement réprouvés suite à une mobilisation sociale, démontrant ainsi le caractère dynamique et évolutif des normes sociales."
    }
  ]
};

export default function NormesDevianceQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  
  const { updateQuizProgress } = useProgress();
  
  // Timer
  useEffect(() => {
    if (quizCompleted) return;
    
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quizCompleted]);
  
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Fonction pour déterminer la couleur selon la difficulté
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "facile":
        return "text-green-600 bg-green-50 dark:bg-green-900/20";
      case "moyen":
        return "text-amber-600 bg-amber-50 dark:bg-amber-900/20";
      case "difficile":
        return "text-red-600 bg-red-50 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20";
    }
  };
  
  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption === null) {
      setSelectedOption(optionIndex);
      
      // Update answers array
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = optionIndex;
      setAnswers(newAnswers);
      
      // Update score if correct
      if (optionIndex === quizData.questions[currentQuestion].correctAnswer) {
        setScore(prevScore => prevScore + 1);
      }
      
      // Show explanation
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      
      // Update progress
      const percentageScore = Math.round((score / quizData.questions.length) * 100);
      updateQuizProgress("sociologie", quizData.module, percentageScore, true);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setAnswers([]);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm mb-6 flex items-center text-gray-600 dark:text-gray-400"
      >
        <Link href="/sociologie" className="hover:text-socio-purple transition-colors">Sociologie</Link>
        <span className="mx-2">/</span>
        <Link href="/sociologie/controle-social-deviance" className="hover:text-socio-purple transition-colors">Contrôle social et déviance</Link>
        <span className="mx-2">/</span>
        <Link href="/sociologie/controle-social-deviance/normes-deviance" className="hover:text-socio-purple transition-colors">Normes et déviance</Link>
        <span className="mx-2">/</span>
        <span className="text-socio-purple font-medium">Quiz</span>
      </motion.div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
                 <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
           <BookCopy className="mr-3 h-8 w-8 text-socio-purple" />
           {quizData.title}
         </h1>
         <div className="flex flex-wrap items-center gap-3 mb-3">
           <div className={`px-3 py-1 rounded-md text-sm font-medium ${getDifficultyColor(quizData.difficulty)}`}>
             {quizData.difficulty}
           </div>
           <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
             <BookCopy className="h-4 w-4 mr-1" />
             {quizData.questions.length} questions
           </div>
           <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
             <Clock className="h-4 w-4 mr-1" />
             {quizData.estimatedTime}
           </div>
         </div>
         <p className="text-lg text-gray-700 dark:text-gray-300">
           {quizData.description}
         </p>
      </motion.header>

      {!quizCompleted ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
        >
          {/* Question progress */}
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700">
            <div 
              className="h-full bg-socio-purple transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="p-6">
            {/* Question counter */}
                         <div className="mb-6 flex justify-between items-center">
               <div className="flex items-center gap-3">
                 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                   Question {currentQuestion + 1}/{quizData.questions.length}
                 </span>
                 <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded-md flex items-center">
                   <Clock className="h-3.5 w-3.5 mr-1" />
                   {formatTime(timeSpent)}
                 </div>
               </div>
               <span className="text-sm font-medium text-socio-purple">
                 Score: {score}
               </span>
             </div>
            
            {/* Question */}
            <motion.h2 
              variants={itemVariants}
              className="text-xl font-semibold text-gray-900 dark:text-white mb-6"
            >
              {quizData.questions[currentQuestion].question}
            </motion.h2>
            
            {/* Options */}
            <div className="space-y-4 mb-8">
              {quizData.questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  variants={itemVariants}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedOption === null
                      ? "border-gray-200 dark:border-gray-700 hover:border-socio-purple dark:hover:border-socio-purple"
                      : selectedOption === index
                        ? index === quizData.questions[currentQuestion].correctAnswer
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : "border-red-500 bg-red-50 dark:bg-red-900/20"
                        : index === quizData.questions[currentQuestion].correctAnswer
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : "border-gray-200 dark:border-gray-700"
                  }`}
                  disabled={selectedOption !== null}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      {selectedOption !== null && (
                        <>
                          {index === quizData.questions[currentQuestion].correctAnswer ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : selectedOption === index ? (
                            <X className="h-5 w-5 text-red-500" />
                          ) : null}
                        </>
                      )}
                    </div>
                    <span className={`${
                      selectedOption !== null && index === quizData.questions[currentQuestion].correctAnswer
                        ? "font-medium text-green-700 dark:text-green-400"
                        : selectedOption === index && index !== quizData.questions[currentQuestion].correctAnswer
                          ? "font-medium text-red-700 dark:text-red-400"
                          : "text-gray-700 dark:text-gray-300"
                    }`}>
                      {option}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
            
            {/* Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-6 border border-purple-100 dark:border-purple-800"
              >
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-socio-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-socio-purple mb-1">Explication</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {quizData.questions[currentQuestion].explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Next button */}
            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  selectedOption === null
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-socio-purple hover:bg-socio-purple/90 text-white"
                }`}
              >
                {currentQuestion < quizData.questions.length - 1 ? "Question suivante" : "Terminer le quiz"}
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6"
        >
                     <div className="text-center mb-8">
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quiz terminé !</h2>
             <div className="flex justify-center items-center gap-4 mb-4">
               <div className="bg-socio-purple/10 rounded-full p-6">
                 <div className="text-4xl font-bold text-socio-purple">{Math.round((score / quizData.questions.length) * 100)}%</div>
                 <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
               </div>
               <div className="bg-blue-50 dark:bg-blue-900/10 rounded-full p-6">
                 <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{formatTime(timeSpent)}</div>
                 <div className="text-sm text-gray-600 dark:text-gray-400">Temps</div>
               </div>
             </div>
             <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
               Votre score : <span className="font-semibold text-socio-purple">{score}/{quizData.questions.length}</span>
             </p>
            <p className="text-gray-600 dark:text-gray-400">
              {score === quizData.questions.length 
                ? "Parfait ! Vous maîtrisez parfaitement ce chapitre."
                : score >= quizData.questions.length * 0.7
                  ? "Très bien ! Vous avez une bonne compréhension du sujet."
                  : score >= quizData.questions.length * 0.5
                    ? "Pas mal ! Vous avez compris les bases, mais quelques révisions seraient utiles."
                    : "Vous devriez réviser ce chapitre pour mieux comprendre les concepts."
              }
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/sociologie/controle-social-deviance/normes-deviance"
              className="flex items-center justify-center px-6 py-3 rounded-md border border-socio-purple text-socio-purple hover:bg-socio-purple/10 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au chapitre
            </Link>
            <button
              onClick={resetQuiz}
              className="flex items-center justify-center px-6 py-3 rounded-md bg-socio-purple text-white hover:bg-socio-purple/90 transition-colors"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Recommencer le quiz
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}