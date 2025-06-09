"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  LineChart, 
  Users, 
  Vote 
} from "lucide-react";
import ProgressCard from "../components/progress-card";
import RecentActivity from "../components/recent-activity";
import SubjectCard from "../components/subject-card";
import { useProgress } from "@/hooks/useProgress";

export default function Home() {
  const { getOverallProgress, progress, formatTime, isLoading } = useProgress();
  const [completedQuizzes, setCompletedQuizzes] = useState<number>(0);
  const [totalQuizzes, setTotalQuizzes] = useState<number>(20); // Valeur par défaut
  
  useEffect(() => {
    if (!isLoading && progress) {
      // Calculer le nombre de quiz complétés
      let completed = 0;
      let total = 0;
      
      Object.values(progress.subjects).forEach(subject => {
        Object.values(subject.quizzesProgress).forEach(quiz => {
          if (quiz.completed) completed++;
          total++;
        });
      });
      
      setCompletedQuizzes(completed);
      if (total > 0) setTotalQuizzes(total);
    }
  }, [isLoading, progress]);
  
  // Récupérer les données de progression
  const overallProgress = getOverallProgress();
  const totalTime = progress ? formatTime(progress.totalTimeSpent) : "0h 00min";
  const quizPercentage = totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0;
  
  // Récupérer la progression par matière
  const ecoProgress = progress?.subjects.economie?.overallProgress || 0;
  const socioProgress = progress?.subjects.sociologie?.overallProgress || 0;
  const politicProgress = progress?.subjects["science-politique"]?.overallProgress || 0;
  
  return (
    <div className="max-w-7xl mx-auto">
      <section className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2">Bienvenue sur BAC SES Révision</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Votre plateforme complète pour réviser les Sciences Économiques et Sociales
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ProgressCard 
          title="Progression globale" 
          percentage={overallProgress} 
          description="Continuez vos révisions pour atteindre vos objectifs !"
          icon={<BarChart3 className="h-5 w-5" />}
        />
        <ProgressCard 
          title="Temps de révision" 
          value={totalTime} 
          description="Temps total de révision"
          icon={<Clock className="h-5 w-5" />}
          variant="time"
        />
        <ProgressCard 
          title="Quiz complétés" 
          value={`${completedQuizzes}/${totalQuizzes}`} 
          description={`${quizPercentage}% des quiz terminés`}
          icon={<CheckCircle className="h-5 w-5" />}
          variant="quiz"
        />
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Matières principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SubjectCard
            title="Économie"
            description="Microéconomie, macroéconomie, politiques économiques..."
            icon={<LineChart className="h-6 w-6" />}
            progress={ecoProgress}
            href="/economie"
            color="eco"
          />
          <SubjectCard
            title="Sociologie"
            description="Socialisation, stratification sociale, mobilité..."
            icon={<Users className="h-6 w-6" />}
            progress={socioProgress}
            href="/sociologie"
            color="socio"
          />
          <SubjectCard
            title="Science Politique"
            description="Pouvoir politique, démocratie, participation..."
            icon={<Vote className="h-6 w-6" />}
            progress={politicProgress}
            href="/science-politique"
            color="politic"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Activité récente</h2>
          <RecentActivity />
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Recommandations</h2>
          <div className="card space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md mr-3">
                <BookOpen className="h-5 w-5 text-eco-blue" />
              </div>
              <div>
                <h3 className="font-medium">Chapitre à réviser</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Vous n&apos;avez pas encore exploré ce chapitre important
                </p>
                <Link 
                  href="/economie/macroeconomie/croissance"
                  className="text-sm font-medium text-eco-blue hover:underline"
                >
                  La croissance économique →
                </Link>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md mr-3">
                <BookOpen className="h-5 w-5 text-socio-purple" />
              </div>
              <div>
                <h3 className="font-medium">Quiz recommandé</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Testez vos connaissances sur ce sujet clé
                </p>
                <Link 
                  href="/quiz/sociologie/stratification-sociale"
                  className="text-sm font-medium text-socio-purple hover:underline"
                >
                  La stratification sociale →
                </Link>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-md mr-3">
                <BookOpen className="h-5 w-5 text-politic-red" />
              </div>
              <div>
                <h3 className="font-medium">Sujet d&apos;entraînement</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Pratiquez avec un sujet type bac
                </p>
                <Link 
                  href="/science-politique/etat-democratie/sujets"
                  className="text-sm font-medium text-politic-red hover:underline"
                >
                  État et démocratisation →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
