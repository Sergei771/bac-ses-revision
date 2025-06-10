"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BookOpen, Clock, Loader2, Star } from "lucide-react";
import { useQuiz } from "@/hooks/useContent";
import QuizPlayer from "@/components/quiz-player";

// Cette fonction est appelée au moment du build pour générer toutes les routes statiques
export function generateStaticParams() {
  return [
    // Économie
    { subject: 'economie', slug: 'marche-prix' },
    { subject: 'economie', slug: 'comportement-consommateur' },
    { subject: 'economie', slug: 'concurrence' },
    { subject: 'economie', slug: 'defaillances-marche' },
    { subject: 'economie', slug: 'croissance-economique' },
    { subject: 'economie', slug: 'fluctuations' },
    { subject: 'economie', slug: 'chomage-inflation' },
    { subject: 'economie', slug: 'politiques-stabilisation' },
    { subject: 'economie', slug: 'fondements-commerce' },
    { subject: 'economie', slug: 'firmes-multinationales' },
    { subject: 'economie', slug: 'desequilibres-mondiaux' },
    { subject: 'economie', slug: 'globalisation-financiere' },
    { subject: 'economie', slug: 'politique-budgetaire' },
    { subject: 'economie', slug: 'politique-monetaire' },
    { subject: 'economie', slug: 'politiques-emploi' },
    { subject: 'economie', slug: 'regulation-economique' },
    
    // Sociologie
    { subject: 'sociologie', slug: 'socialisation-primaire-secondaire' },
    { subject: 'sociologie', slug: 'instances-socialisation' },
    { subject: 'sociologie', slug: 'diversite-socialisation' },
    { subject: 'sociologie', slug: 'lien-social-integration' },
    { subject: 'sociologie', slug: 'definition-typologie' },
    { subject: 'sociologie', slug: 'reseaux-capital-social' },
    { subject: 'sociologie', slug: 'sociabilite-numerique' },
    { subject: 'sociologie', slug: 'normes-deviance' },
    { subject: 'sociologie', slug: 'classes-sociales' },
    
    // Science Politique
    { subject: 'science-politique', slug: 'pouvoir-politique' },
    { subject: 'science-politique', slug: 'democratie' },
    { subject: 'science-politique', slug: 'action-publique' }
  ];
}

export default function QuizPage() {
  const params = useParams();
  const subject = params.subject as string;
  const slug = params.slug as string;
  const quizId = `${subject}-${slug}`;
  
  const { quiz, loading, error } = useQuiz(quizId);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleQuizComplete = (score: number, answers: number[]) => {
    setQuizScore(score);
    setUserAnswers(answers);
    setQuizCompleted(true);
    
    // Dans une application réelle, on sauvegarderait les résultats dans une base de données
    console.log("Quiz completed", { score, answers });
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "economie":
        return "text-eco-blue";
      case "sociologie":
        return "text-socio-purple";
      case "politique":
        return "text-politic-red";
      default:
        return "text-blue-600";
    }
  };

  const getSubjectBgColor = (subject: string) => {
    switch (subject) {
      case "economie":
        return "bg-blue-50 dark:bg-blue-900/20";
      case "sociologie":
        return "bg-purple-50 dark:bg-purple-900/20";
      case "politique":
        return "bg-red-50 dark:bg-red-900/20";
      default:
        return "bg-gray-50 dark:bg-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Chargement du quiz...</p>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link
          href="/quiz"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux quiz
        </Link>
        
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Quiz non disponible</h2>
          <p>Désolé, ce quiz n&apos;est pas disponible pour le moment. Veuillez réessayer ultérieurement.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link
        href="/quiz"
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour aux quiz
      </Link>
      
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${getSubjectColor(quiz.subject)}`}>
          {quiz.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {quiz.description}
        </p>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <div className={`px-3 py-1 rounded-full text-sm ${getSubjectBgColor(quiz.subject)} ${getSubjectColor(quiz.subject)}`}>
            {quiz.subject === "economie" ? "Économie" : 
             quiz.subject === "sociologie" ? "Sociologie" : "Science Politique"}
          </div>
          
          <div className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            {quiz.difficulty === "facile" ? "Facile" : 
             quiz.difficulty === "moyen" ? "Moyen" : "Difficile"}
          </div>
          
          <div className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {quiz.questions.length * 1.5} min environ
          </div>
          
          <div className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center">
            <BookOpen className="h-3.5 w-3.5 mr-1" />
            {quiz.questions.length} questions
          </div>
        </div>
      </div>
      
      <QuizPlayer
        questions={quiz.questions}
        quizId={quizId}
        subjectId={subject as 'economie' | 'sociologie' | 'science-politique'}
        onComplete={handleQuizComplete}
      />
      
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Star className="h-5 w-5 mr-2 text-amber-500" />
          Ressources complémentaires
        </h2>
        
        <div className="space-y-3">
          <Link
            href={`/${quiz.subject}/${slug}`}
            className={`flex items-center hover:underline ${getSubjectColor(quiz.subject)}`}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Consulter le cours sur ce sujet
          </Link>
          
          <Link
            href={`/${quiz.subject}/${slug}/fiche-synthese`}
            className={`flex items-center hover:underline ${getSubjectColor(quiz.subject)}`}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Télécharger la fiche de synthèse
          </Link>
        </div>
      </div>
    </div>
  );
}
