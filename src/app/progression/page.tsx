"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Clock, CheckCircle, BookOpen, Target, Award, Calendar, TrendingUp, Medal } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import ProgressCard from "@/components/progress-card";

export default function ProgressionPage() {
  const { 
    progress, 
    getOverallProgress, 
    formatTime, 
    isLoading,
    getRecentActivities 
  } = useProgress();
  
  const [completedChapters, setCompletedChapters] = useState(0);
  const [totalChapters, setTotalChapters] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState(0);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [bestSubject, setBestSubject] = useState<{name: string, progress: number, color: string}>({
    name: "Aucune", progress: 0, color: "text-gray-500"
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [streak, setStreak] = useState(0);
  
  useEffect(() => {
    if (!isLoading && progress) {
      // Calculer le nombre de chapitres et quiz complétés
      let chaptersCompleted = 0;
      let chaptersTotal = 0;
      let quizzesCompleted = 0;
      let quizzesTotal = 0;
      
      // Trouver la meilleure matière
      let best = {name: "Aucune", progress: 0, color: "text-gray-500"};
      
      Object.entries(progress.subjects).forEach(([key, subject]) => {
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
        
        // Vérifier si c'est la meilleure matière
        if (subject.overallProgress > best.progress) {
          let color = "text-gray-500";
          let name = "Inconnue";
          
          if (key === "economie") {
            color = "text-eco-blue";
            name = "Économie";
          } else if (key === "sociologie") {
            color = "text-socio-purple";
            name = "Sociologie";
          } else if (key === "science-politique") {
            color = "text-politic-red";
            name = "Science Politique";
          }
          
          best = {
            name,
            progress: subject.overallProgress,
            color
          };
        }
      });
      
      setCompletedChapters(chaptersCompleted);
      setTotalChapters(chaptersTotal || 10); // Valeur par défaut si aucun chapitre
      setCompletedQuizzes(quizzesCompleted);
      setTotalQuizzes(quizzesTotal || 20); // Valeur par défaut si aucun quiz
      setBestSubject(best);
      
      // Récupérer les activités récentes
      setRecentActivities(getRecentActivities(5));
      
      // Calculer le streak (nombre de jours consécutifs d'activité)
      // Ici c'est une simulation, dans un environnement réel cela serait calculé à partir des données
      setStreak(calculateStreak(progress.lastActivity));
    }
  }, [isLoading, progress, getRecentActivities]);
  
  // Calculer le streak à partir des activités
  const calculateStreak = (activities: any[]) => {
    if (!activities || activities.length === 0) return 0;
    
    // Logique simplifiée pour l'exemple
    // En réalité, il faudrait compter les jours consécutifs d'activité
    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);
    
    // Simuler un streak de 1 à 7 jours
    streak = Math.min(7, Math.max(1, activities.length));
    
    return streak;
  };
  
  const overallProgress = getOverallProgress();
  const totalTime = progress ? formatTime(progress.totalTimeSpent) : "0h 00min";
  const chaptersPercentage = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
  const quizzesPercentage = totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0;
  
  // Récupérer la progression par matière
  const ecoProgress = progress?.subjects.economie?.overallProgress || 0;
  const socioProgress = progress?.subjects.sociologie?.overallProgress || 0;
  const politicProgress = progress?.subjects["science-politique"]?.overallProgress || 0;
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const formatActivityDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Aujourd'hui";
    } else if (diffDays === 1) {
      return "Hier";
    } else {
      return date.toLocaleDateString();
    }
  };
  
  const getActivityIcon = (type: string) => {
    if (type === "chapter") {
      return <BookOpen className="h-4 w-4 text-blue-500" />;
    } else {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };
  
  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <section className="mb-12">
        <motion.h1 
          variants={item}
          className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Votre progression
        </motion.h1>
        <motion.p 
          variants={item}
          className="text-xl text-gray-600 dark:text-gray-400"
        >
          Suivez votre avancement dans les révisions du BAC SES
        </motion.p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <motion.div variants={item}>
          <ProgressCard 
            title="Progression globale" 
            percentage={overallProgress} 
            description="Votre avancement total"
            icon={<BarChart3 className="h-5 w-5 text-blue-500" />}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <ProgressCard 
            title="Temps de révision" 
            value={totalTime} 
            description="Temps total passé à réviser"
            icon={<Clock className="h-5 w-5 text-blue-500" />}
            variant="time"
          />
        </motion.div>
        
        <motion.div variants={item}>
          <ProgressCard 
            title="Chapitres terminés" 
            value={`${completedChapters}/${totalChapters}`} 
            description={`${chaptersPercentage}% des chapitres lus`}
            icon={<BookOpen className="h-5 w-5 text-blue-500" />}
            variant="quiz"
          />
        </motion.div>
        
        <motion.div variants={item}>
          <ProgressCard 
            title="Quiz complétés" 
            value={`${completedQuizzes}/${totalQuizzes}`} 
            description={`${quizzesPercentage}% des quiz terminés`}
            icon={<CheckCircle className="h-5 w-5 text-blue-500" />}
            variant="quiz"
          />
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <motion.section 
          variants={item}
          className="lg:col-span-2"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Target className="mr-2 h-6 w-6 text-blue-500" />
            Progression par matière
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card overflow-hidden">
              <div className="relative">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-eco-blue opacity-10 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-eco-blue opacity-10 rounded-full"></div>
                <h3 className="text-xl font-semibold mb-4 text-eco-blue flex items-center">
                  <span className="bg-eco-blue/10 p-1.5 rounded-md mr-2">
                    <BarChart3 className="h-4 w-4 text-eco-blue" />
                  </span>
                  Économie
                </h3>
              </div>
              <div className="mb-3">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-lg">{ecoProgress}%</span>
                  <span className="text-gray-500 dark:text-gray-400">100%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${ecoProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-eco-blue h-3 rounded-full"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {ecoProgress < 30 ? "Vous commencez tout juste vos révisions d'économie." : 
                 ecoProgress < 70 ? "Vous progressez bien en économie." : 
                 "Vous maîtrisez bien les concepts économiques !"}
              </p>
            </div>
            
            <div className="card overflow-hidden">
              <div className="relative">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-socio-purple opacity-10 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-socio-purple opacity-10 rounded-full"></div>
                <h3 className="text-xl font-semibold mb-4 text-socio-purple flex items-center">
                  <span className="bg-socio-purple/10 p-1.5 rounded-md mr-2">
                    <BarChart3 className="h-4 w-4 text-socio-purple" />
                  </span>
                  Sociologie
                </h3>
              </div>
              <div className="mb-3">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-lg">{socioProgress}%</span>
                  <span className="text-gray-500 dark:text-gray-400">100%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${socioProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-socio-purple h-3 rounded-full"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {socioProgress < 30 ? "Vous commencez tout juste vos révisions de sociologie." : 
                 socioProgress < 70 ? "Vous progressez bien en sociologie." : 
                 "Vous maîtrisez bien les concepts sociologiques !"}
              </p>
            </div>
            
            <div className="card overflow-hidden">
              <div className="relative">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-politic-red opacity-10 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-politic-red opacity-10 rounded-full"></div>
                <h3 className="text-xl font-semibold mb-4 text-politic-red flex items-center">
                  <span className="bg-politic-red/10 p-1.5 rounded-md mr-2">
                    <BarChart3 className="h-4 w-4 text-politic-red" />
                  </span>
                  Science Politique
                </h3>
              </div>
              <div className="mb-3">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-lg">{politicProgress}%</span>
                  <span className="text-gray-500 dark:text-gray-400">100%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${politicProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-politic-red h-3 rounded-full"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {politicProgress < 30 ? "Vous commencez tout juste vos révisions de science politique." : 
                 politicProgress < 70 ? "Vous progressez bien en science politique." : 
                 "Vous maîtrisez bien les concepts de science politique !"}
              </p>
            </div>
          </div>
        </motion.section>
        
        <motion.section 
          variants={item}
          className="card"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Award className="mr-2 h-5 w-5 text-amber-500" />
            Vos accomplissements
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm mr-3">
                <Medal className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-medium">Votre meilleure matière</h3>
                <p className={`text-sm ${bestSubject.color} font-medium`}>
                  {bestSubject.name} ({bestSubject.progress}%)
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <div className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm mr-3">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">Série de jours consécutifs</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-blue-600 dark:text-blue-400">{streak} jour{streak > 1 ? 's' : ''}</span> de révision
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm mr-3">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium">Score moyen aux quiz</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {Math.round((ecoProgress + socioProgress + politicProgress) / 3)}%
                  </span> de bonnes réponses
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
      
      <motion.section
        variants={item}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Clock className="mr-2 h-6 w-6 text-blue-500" />
          Activités récentes
        </h2>
        
        <div className="card">
          {recentActivities.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              Aucune activité récente à afficher
            </p>
          ) : (
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md transition-colors"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full mr-3">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {activity.type === "chapter" ? "Lecture d'un chapitre" : "Réalisation d'un quiz"}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.id.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatActivityDate(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.section>
      
      <motion.section 
        variants={item}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <TrendingUp className="mr-2 h-6 w-6 text-blue-500" />
          Statistiques détaillées
        </h2>
        <div className="card">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-gray-500" />
                Temps passé par matière
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium flex items-center">
                      <span className="inline-block w-3 h-3 bg-eco-blue rounded-full mr-2"></span>
                      Économie
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatTime(progress?.subjects.economie?.chaptersProgress 
                        ? Object.values(progress.subjects.economie.chaptersProgress).reduce((acc, chapter) => acc + chapter.timeSpent, 0) 
                        : 0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${ecoProgress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-eco-blue h-2 rounded-full" 
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium flex items-center">
                      <span className="inline-block w-3 h-3 bg-socio-purple rounded-full mr-2"></span>
                      Sociologie
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatTime(progress?.subjects.sociologie?.chaptersProgress 
                        ? Object.values(progress.subjects.sociologie.chaptersProgress).reduce((acc, chapter) => acc + chapter.timeSpent, 0) 
                        : 0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${socioProgress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-socio-purple h-2 rounded-full" 
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium flex items-center">
                      <span className="inline-block w-3 h-3 bg-politic-red rounded-full mr-2"></span>
                      Science Politique
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatTime(progress?.subjects["science-politique"]?.chaptersProgress 
                        ? Object.values(progress.subjects["science-politique"].chaptersProgress).reduce((acc, chapter) => acc + chapter.timeSpent, 0) 
                        : 0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${politicProgress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-politic-red h-2 rounded-full" 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Award className="mr-2 h-5 w-5 text-gray-500" />
                Scores moyens aux quiz
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium flex items-center">
                      <span className="inline-block w-3 h-3 bg-eco-blue rounded-full mr-2"></span>
                      Économie
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {progress?.subjects.economie?.quizzesProgress 
                        ? Math.round(Object.values(progress.subjects.economie.quizzesProgress)
                            .reduce((acc, quiz) => acc + quiz.score, 0) / 
                            Math.max(1, Object.values(progress.subjects.economie.quizzesProgress).length))
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${
                        progress?.subjects.economie?.quizzesProgress 
                          ? Math.round(Object.values(progress.subjects.economie.quizzesProgress)
                              .reduce((acc, quiz) => acc + quiz.score, 0) / 
                              Math.max(1, Object.values(progress.subjects.economie.quizzesProgress).length))
                          : 0}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-eco-blue h-2 rounded-full" 
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium flex items-center">
                      <span className="inline-block w-3 h-3 bg-socio-purple rounded-full mr-2"></span>
                      Sociologie
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {progress?.subjects.sociologie?.quizzesProgress 
                        ? Math.round(Object.values(progress.subjects.sociologie.quizzesProgress)
                            .reduce((acc, quiz) => acc + quiz.score, 0) / 
                            Math.max(1, Object.values(progress.subjects.sociologie.quizzesProgress).length))
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${
                        progress?.subjects.sociologie?.quizzesProgress 
                          ? Math.round(Object.values(progress.subjects.sociologie.quizzesProgress)
                              .reduce((acc, quiz) => acc + quiz.score, 0) / 
                              Math.max(1, Object.values(progress.subjects.sociologie.quizzesProgress).length))
                          : 0}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-socio-purple h-2 rounded-full" 
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium flex items-center">
                      <span className="inline-block w-3 h-3 bg-politic-red rounded-full mr-2"></span>
                      Science Politique
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {progress?.subjects["science-politique"]?.quizzesProgress 
                        ? Math.round(Object.values(progress.subjects["science-politique"].quizzesProgress)
                            .reduce((acc, quiz) => acc + quiz.score, 0) / 
                            Math.max(1, Object.values(progress.subjects["science-politique"].quizzesProgress).length))
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${
                        progress?.subjects["science-politique"]?.quizzesProgress 
                          ? Math.round(Object.values(progress.subjects["science-politique"].quizzesProgress)
                              .reduce((acc, quiz) => acc + quiz.score, 0) / 
                              Math.max(1, Object.values(progress.subjects["science-politique"].quizzesProgress).length))
                          : 0}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-politic-red h-2 rounded-full" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

