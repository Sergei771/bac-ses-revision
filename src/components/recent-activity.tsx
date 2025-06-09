"use client";

import { useEffect, useState } from "react";
import { CheckCircle, BookOpen, Clock, Award } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

type ActivityDisplay = {
  id: string;
  type: "quiz" | "chapter" | "achievement";
  title: string;
  time: string;
  subject: "economie" | "sociologie" | "science-politique";
  score?: number;
  originalTimestamp: string;
};

export default function RecentActivity() {
  const { getRecentActivities, getQuizProgress, isLoading } = useProgress();
  const [activities, setActivities] = useState<ActivityDisplay[]>([]);

  useEffect(() => {
    if (isLoading) return;
    
    const recentActivities = getRecentActivities(5);
    const formattedActivities = recentActivities.map((activity) => {
      // Formater la date
      const activityDate = new Date(activity.timestamp);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60 * 60));
      
      let timeDisplay = "";
      if (diffDays === 0) {
        if (diffHours === 0) {
          timeDisplay = "Il y a quelques minutes";
        } else {
          timeDisplay = `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
        }
      } else if (diffDays === 1) {
        timeDisplay = "Hier";
      } else {
        timeDisplay = `Il y a ${diffDays} jours`;
      }
      
      // Obtenir les détails en fonction du type d'activité
      if (activity.type === 'quiz') {
        const quizProgress = getQuizProgress(activity.subjectId, activity.id);
        
        // Transformer l'ID du quiz en titre lisible
        let title = "Quiz";
        if (activity.id.includes('croissance')) {
          title += " sur la Croissance Économique";
        } else if (activity.id.includes('marche')) {
          title += " sur le Marché et les Prix";
        } else if (activity.id.includes('socialisation')) {
          title += " sur la Socialisation";
        } else if (activity.id.includes('classe')) {
          title += " sur les Classes Sociales";
        } else if (activity.id.includes('etat')) {
          title += " sur l'État et la Démocratie";
        } else {
          title += ` sur ${activity.id.split('-').join(' ')}`;
        }
        
        return {
          id: activity.id,
          type: "quiz" as const,
          title,
          time: timeDisplay,
          subject: activity.subjectId,
          score: quizProgress?.score,
          originalTimestamp: activity.timestamp
        };
      } else {
        // Transformer l'ID du chapitre en titre lisible
        let title = "Lecture du chapitre";
        if (activity.id.includes('croissance')) {
          title += " sur la Croissance Économique";
        } else if (activity.id.includes('marche')) {
          title += " sur le Marché et les Prix";
        } else if (activity.id.includes('socialisation')) {
          title += " sur la Socialisation";
        } else if (activity.id.includes('classe')) {
          title += " sur les Classes Sociales";
        } else if (activity.id.includes('etat')) {
          title += " sur l'État et la Démocratie";
        } else {
          title += ` sur ${activity.id.split('-').join(' ')}`;
        }
        
        return {
          id: activity.id,
          type: "chapter" as const,
          title,
          time: timeDisplay,
          subject: activity.subjectId,
          originalTimestamp: activity.timestamp
        };
      }
    });
    
    setActivities(formattedActivities);
  }, [isLoading, getRecentActivities, getQuizProgress]);
  
  // Afficher un placeholder si aucune activité n'est disponible
  if (activities.length === 0 && !isLoading) {
    return (
      <div className="card">
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          <p className="mb-2">Aucune activité récente</p>
          <p className="text-sm">Commencez à explorer les chapitres et les quiz pour voir votre activité ici.</p>
        </div>
      </div>
    );
  }
  
  // Afficher un état de chargement
  if (isLoading) {
    return (
      <div className="card">
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          <p>Chargement des activités...</p>
        </div>
      </div>
    );
  }

  const getIcon = (type: ActivityDisplay["type"]) => {
    switch (type) {
      case "quiz":
        return <CheckCircle className="h-5 w-5" />;
      case "chapter":
        return <BookOpen className="h-5 w-5" />;
      case "achievement":
        return <Award className="h-5 w-5" />;
    }
  };

  const getIconColor = (type: ActivityDisplay["type"], subject: ActivityDisplay["subject"]) => {
    if (subject === "economie") return "text-eco-blue bg-blue-50 dark:bg-blue-900/20";
    if (subject === "sociologie") return "text-socio-purple bg-purple-50 dark:bg-purple-900/20";
    if (subject === "science-politique") return "text-politic-red bg-red-50 dark:bg-red-900/20";
    
    // Default colors by activity type (fallback)
    switch (type) {
      case "quiz":
        return "text-green-500 bg-green-50 dark:bg-green-900/20";
      case "chapter":
        return "text-amber-500 bg-amber-50 dark:bg-amber-900/20";
      case "achievement":
        return "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
    }
  };

  return (
    <div className="card">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={`${activity.subject}-${activity.type}-${activity.id}-${activity.originalTimestamp}`} className="flex items-start">
            <div className={`p-2 rounded-md mr-3 ${getIconColor(activity.type, activity.subject)}`}>
              {getIcon(activity.type)}
            </div>
            <div>
              <h3 className="font-medium">{activity.title}</h3>
              {activity.type === "quiz" && activity.score !== undefined && (
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Score: <span className="font-medium">{activity.score}%</span>
                </div>
              )}
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
