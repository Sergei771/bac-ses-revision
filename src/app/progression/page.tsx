"use client";

import { useEffect, useState } from "react";
import { BarChart3, Clock, CheckCircle, BookOpen } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import ProgressCard from "@/components/progress-card";

export default function ProgressionPage() {
  const { 
    progress, 
    getOverallProgress, 
    formatTime, 
    isLoading 
  } = useProgress();
  
  const [completedChapters, setCompletedChapters] = useState(0);
  const [totalChapters, setTotalChapters] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState(0);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  
  useEffect(() => {
    if (!isLoading && progress) {
      // Calculer le nombre de chapitres et quiz complétés
      let chaptersCompleted = 0;
      let chaptersTotal = 0;
      let quizzesCompleted = 0;
      let quizzesTotal = 0;
      
      Object.values(progress.subjects).forEach(subject => {
        // Chapitres
        Object.values(subject.chaptersProgress).forEach(chapter => {
          if (chapter.completed) chaptersCompleted++;
          chaptersTotal++;
        });
        
        // Quiz
        Object.values(subject.quizzesProgress).forEach(quiz => {
          if (quiz.completed) quizzesCompleted++;
          quizzesTotal++;
        });
      });
      
      setCompletedChapters(chaptersCompleted);
      setTotalChapters(chaptersTotal || 10); // Valeur par défaut si aucun chapitre
      setCompletedQuizzes(quizzesCompleted);
      setTotalQuizzes(quizzesTotal || 20); // Valeur par défaut si aucun quiz
    }
  }, [isLoading, progress]);
  
  const overallProgress = getOverallProgress();
  const totalTime = progress ? formatTime(progress.totalTimeSpent) : "0h 00min";
  const chaptersPercentage = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
  const quizzesPercentage = totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0;
  
  // Récupérer la progression par matière
  const ecoProgress = progress?.subjects.economie?.overallProgress || 0;
  const socioProgress = progress?.subjects.sociologie?.overallProgress || 0;
  const politicProgress = progress?.subjects["science-politique"]?.overallProgress || 0;
  
  return (
    <div className="max-w-7xl mx-auto">
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Votre progression</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Suivez votre avancement dans les révisions du BAC SES
        </p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <ProgressCard 
          title="Progression globale" 
          percentage={overallProgress} 
          description="Votre avancement total"
          icon={<BarChart3 className="h-5 w-5" />}
        />
        <ProgressCard 
          title="Temps de révision" 
          value={totalTime} 
          description="Temps total passé à réviser"
          icon={<Clock className="h-5 w-5" />}
          variant="time"
        />
        <ProgressCard 
          title="Chapitres terminés" 
          value={`${completedChapters}/${totalChapters}`} 
          description={`${chaptersPercentage}% des chapitres lus`}
          icon={<BookOpen className="h-5 w-5" />}
          variant="quiz"
        />
        <ProgressCard 
          title="Quiz complétés" 
          value={`${completedQuizzes}/${totalQuizzes}`} 
          description={`${quizzesPercentage}% des quiz terminés`}
          icon={<CheckCircle className="h-5 w-5" />}
          variant="quiz"
        />
      </div>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Progression par matière</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4 text-eco-blue">Économie</h3>
            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{ecoProgress}%</span>
                <span className="text-gray-500 dark:text-gray-400">100%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-eco-blue h-2.5 rounded-full"
                  style={{ width: `${ecoProgress}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {ecoProgress < 30 ? "Vous commencez tout juste vos révisions d'économie." : 
               ecoProgress < 70 ? "Vous progressez bien en économie." : 
               "Vous maîtrisez bien les concepts économiques !"}
            </p>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-semibold mb-4 text-socio-purple">Sociologie</h3>
            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{socioProgress}%</span>
                <span className="text-gray-500 dark:text-gray-400">100%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-socio-purple h-2.5 rounded-full"
                  style={{ width: `${socioProgress}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {socioProgress < 30 ? "Vous commencez tout juste vos révisions de sociologie." : 
               socioProgress < 70 ? "Vous progressez bien en sociologie." : 
               "Vous maîtrisez bien les concepts sociologiques !"}
            </p>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-semibold mb-4 text-politic-red">Science Politique</h3>
            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{politicProgress}%</span>
                <span className="text-gray-500 dark:text-gray-400">100%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-politic-red h-2.5 rounded-full"
                  style={{ width: `${politicProgress}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {politicProgress < 30 ? "Vous commencez tout juste vos révisions de science politique." : 
               politicProgress < 70 ? "Vous progressez bien en science politique." : 
               "Vous maîtrisez bien les concepts de science politique !"}
            </p>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Statistiques détaillées</h2>
        <div className="card">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Temps passé par matière</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Économie</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatTime(progress?.subjects.economie?.chaptersProgress 
                        ? Object.values(progress.subjects.economie.chaptersProgress).reduce((acc, chapter) => acc + chapter.timeSpent, 0) 
                        : 0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-eco-blue h-1.5 rounded-full" style={{ width: `${ecoProgress}%` }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Sociologie</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatTime(progress?.subjects.sociologie?.chaptersProgress 
                        ? Object.values(progress.subjects.sociologie.chaptersProgress).reduce((acc, chapter) => acc + chapter.timeSpent, 0) 
                        : 0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-socio-purple h-1.5 rounded-full" style={{ width: `${socioProgress}%` }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Science Politique</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatTime(progress?.subjects["science-politique"]?.chaptersProgress 
                        ? Object.values(progress.subjects["science-politique"].chaptersProgress).reduce((acc, chapter) => acc + chapter.timeSpent, 0) 
                        : 0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-politic-red h-1.5 rounded-full" style={{ width: `${politicProgress}%` }} />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Scores moyens aux quiz</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Économie</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {progress?.subjects.economie?.quizzesProgress 
                        ? Math.round(Object.values(progress.subjects.economie.quizzesProgress)
                            .reduce((acc, quiz) => acc + quiz.score, 0) / 
                            Math.max(1, Object.values(progress.subjects.economie.quizzesProgress).length))
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-eco-blue h-1.5 rounded-full" style={{ width: `${
                      progress?.subjects.economie?.quizzesProgress 
                        ? Math.round(Object.values(progress.subjects.economie.quizzesProgress)
                            .reduce((acc, quiz) => acc + quiz.score, 0) / 
                            Math.max(1, Object.values(progress.subjects.economie.quizzesProgress).length))
                        : 0}%` }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Sociologie</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {progress?.subjects.sociologie?.quizzesProgress 
                        ? Math.round(Object.values(progress.subjects.sociologie.quizzesProgress)
                            .reduce((acc, quiz) => acc + quiz.score, 0) / 
                            Math.max(1, Object.values(progress.subjects.sociologie.quizzesProgress).length))
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-socio-purple h-1.5 rounded-full" style={{ width: `${
                      progress?.subjects.sociologie?.quizzesProgress 
                        ? Math.round(Object.values(progress.subjects.sociologie.quizzesProgress)
                            .reduce((acc, quiz) => acc + quiz.score, 0) / 
                            Math.max(1, Object.values(progress.subjects.sociologie.quizzesProgress).length))
                        : 0}%` }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Science Politique</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {progress?.subjects["science-politique"]?.quizzesProgress 
                        ? Math.round(Object.values(progress.subjects["science-politique"].quizzesProgress)
                            .reduce((acc, quiz) => acc + quiz.score, 0) / 
                            Math.max(1, Object.values(progress.subjects["science-politique"].quizzesProgress).length))
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-politic-red h-1.5 rounded-full" style={{ width: `${
                      progress?.subjects["science-politique"]?.quizzesProgress 
                        ? Math.round(Object.values(progress.subjects["science-politique"].quizzesProgress)
                            .reduce((acc, quiz) => acc + quiz.score, 0) / 
                            Math.max(1, Object.values(progress.subjects["science-politique"].quizzesProgress).length))
                        : 0}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
