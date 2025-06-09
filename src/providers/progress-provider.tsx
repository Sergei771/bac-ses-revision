"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types pour le suivi de progression
export type ChapterProgress = {
  id: string;
  completed: boolean;
  lastVisited: string; // ISO date string
  timeSpent: number; // en secondes
};

export type QuizProgress = {
  id: string;
  completed: boolean;
  score: number;
  attempts: number;
  lastAttempt: string; // ISO date string
};

export type SubjectProgress = {
  id: 'economie' | 'sociologie' | 'science-politique';
  chaptersProgress: { [chapterId: string]: ChapterProgress };
  quizzesProgress: { [quizId: string]: QuizProgress };
  overallProgress: number; // pourcentage de 0 à 100
};

export type UserProgress = {
  subjects: { [subjectId: string]: SubjectProgress };
  totalTimeSpent: number; // en secondes
  lastActivity: {
    type: 'chapter' | 'quiz';
    id: string;
    subjectId: 'economie' | 'sociologie' | 'science-politique';
    timestamp: string; // ISO date string
  }[];
};

// Fonction pour obtenir la progression initiale (depuis localStorage ou valeurs par défaut)
const getInitialProgress = (): UserProgress => {
  if (typeof window === 'undefined') {
    return createDefaultProgress();
  }
  
  const savedProgress = localStorage.getItem('user-progress');
  if (savedProgress) {
    try {
      return JSON.parse(savedProgress);
    } catch (e) {
      console.error('Erreur lors du chargement de la progression:', e);
      return createDefaultProgress();
    }
  }
  
  return createDefaultProgress();
};

// Crée une structure de progression par défaut
const createDefaultProgress = (): UserProgress => {
  return {
    subjects: {
      economie: {
        id: 'economie',
        chaptersProgress: {},
        quizzesProgress: {},
        overallProgress: 0
      },
      sociologie: {
        id: 'sociologie',
        chaptersProgress: {},
        quizzesProgress: {},
        overallProgress: 0
      },
      'science-politique': {
        id: 'science-politique',
        chaptersProgress: {},
        quizzesProgress: {},
        overallProgress: 0
      }
    },
    totalTimeSpent: 0,
    lastActivity: []
  };
};

// Créer le contexte
type ProgressContextType = {
  progress: UserProgress | null;
  isLoading: boolean;
  updateChapterProgress: (
    subjectId: 'economie' | 'sociologie' | 'science-politique',
    chapterId: string,
    data: Partial<ChapterProgress>
  ) => void;
  updateQuizProgress: (
    subjectId: 'economie' | 'sociologie' | 'science-politique',
    quizId: string,
    score: number,
    completed?: boolean
  ) => void;
  updateTimeSpent: (additionalSeconds: number) => void;
  getChapterProgress: (
    subjectId: 'economie' | 'sociologie' | 'science-politique',
    chapterId: string
  ) => ChapterProgress | null;
  getQuizProgress: (
    subjectId: 'economie' | 'sociologie' | 'science-politique',
    quizId: string
  ) => QuizProgress | null;
  getOverallProgress: () => number;
  getRecentActivities: (limit?: number) => UserProgress['lastActivity'];
  formatTime: (seconds: number) => string;
  markChapterAsCompleted: (
    subjectId: 'economie' | 'sociologie' | 'science-politique',
    chapterId: string
  ) => void;
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger la progression au démarrage
  useEffect(() => {
    setProgress(getInitialProgress());
    setIsLoading(false);
  }, []);

  // Sauvegarder la progression lorsqu'elle change
  useEffect(() => {
    if (progress && typeof window !== 'undefined') {
      localStorage.setItem('user-progress', JSON.stringify(progress));
    }
  }, [progress]);

  // Mettre à jour la progression d'un chapitre
  const updateChapterProgress = (
    subjectId: 'economie' | 'sociologie' | 'science-politique',
    chapterId: string,
    data: Partial<ChapterProgress>
  ) => {
    if (!progress) return;
    
    setProgress(prev => {
      if (!prev) return prev;
      
      const subject = prev.subjects[subjectId];
      const currentChapterProgress = subject.chaptersProgress[chapterId] || {
        id: chapterId,
        completed: false,
        lastVisited: new Date().toISOString(),
        timeSpent: 0
      };
      
      const updatedChapterProgress = {
        ...currentChapterProgress,
        ...data,
        lastVisited: new Date().toISOString()
      };
      
      // Ajouter à l'historique des activités
      const newActivity = {
        type: 'chapter' as const,
        id: chapterId,
        subjectId,
        timestamp: new Date().toISOString()
      };
      
      // Calculer la nouvelle progression globale
      const chaptersCount = Object.keys(subject.chaptersProgress).length + 
        (subject.chaptersProgress[chapterId] ? 0 : 1);
      const completedChapters = Object.values({
        ...subject.chaptersProgress,
        [chapterId]: updatedChapterProgress
      }).filter(chapter => chapter.completed).length;
      
      const newOverallProgress = chaptersCount > 0 
        ? Math.round((completedChapters / chaptersCount) * 100)
        : 0;
      
      return {
        ...prev,
        subjects: {
          ...prev.subjects,
          [subjectId]: {
            ...subject,
            chaptersProgress: {
              ...subject.chaptersProgress,
              [chapterId]: updatedChapterProgress
            },
            overallProgress: newOverallProgress
          }
        },
        lastActivity: [newActivity, ...prev.lastActivity.slice(0, 9)]
      };
    });
  };

  // Mettre à jour la progression d'un quiz
  const updateQuizProgress = (
    subjectId: 'economie' | 'sociologie' | 'science-politique',
    quizId: string,
    score: number,
    completed: boolean = true
  ) => {
    if (!progress) return;
    
    setProgress(prev => {
      if (!prev) return prev;
      
      const subject = prev.subjects[subjectId];
      const currentQuizProgress = subject.quizzesProgress[quizId] || {
        id: quizId,
        completed: false,
        score: 0,
        attempts: 0,
        lastAttempt: new Date().toISOString()
      };
      
      const updatedQuizProgress = {
        ...currentQuizProgress,
        completed,
        score: Math.max(currentQuizProgress.score, score), // Garder le meilleur score
        attempts: currentQuizProgress.attempts + 1,
        lastAttempt: new Date().toISOString()
      };
      
      // Ajouter à l'historique des activités
      const newActivity = {
        type: 'quiz' as const,
        id: quizId,
        subjectId,
        timestamp: new Date().toISOString()
      };
      
      return {
        ...prev,
        subjects: {
          ...prev.subjects,
          [subjectId]: {
            ...subject,
            quizzesProgress: {
              ...subject.quizzesProgress,
              [quizId]: updatedQuizProgress
            }
          }
        },
        lastActivity: [newActivity, ...prev.lastActivity.slice(0, 9)]
      };
    });
  };

  // Mettre à jour le temps total passé
  const updateTimeSpent = (additionalSeconds: number) => {
    if (!progress) return;
    
    setProgress(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        totalTimeSpent: prev.totalTimeSpent + additionalSeconds
      };
    });
  };

  // Obtenir la progression d'un chapitre spécifique
  const getChapterProgress = (
    subjectId: 'economie' | 'sociologie' | 'science-politique',
    chapterId: string
  ): ChapterProgress | null => {
    if (!progress) return null;
    
    const subject = progress.subjects[subjectId];
    return subject.chaptersProgress[chapterId] || null;
  };

  // Obtenir la progression d'un quiz spécifique
  const getQuizProgress = (
    subjectId: 'economie' | 'sociologie' | 'science-politique',
    quizId: string
  ): QuizProgress | null => {
    if (!progress) return null;
    
    const subject = progress.subjects[subjectId];
    return subject.quizzesProgress[quizId] || null;
  };

  // Obtenir la progression globale
  const getOverallProgress = (): number => {
    if (!progress) return 0;
    
    const subjects = Object.values(progress.subjects);
    if (subjects.length === 0) return 0;
    
    const totalProgress = subjects.reduce((sum, subject) => sum + subject.overallProgress, 0);
    return Math.round(totalProgress / subjects.length);
  };

  // Obtenir les activités récentes
  const getRecentActivities = (limit: number = 5) => {
    if (!progress) return [];
    
    return progress.lastActivity.slice(0, limit);
  };

  // Formater le temps (secondes -> format lisible)
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes}min`;
  };

  // Marquer un chapitre comme terminé
  const markChapterAsCompleted = (
    subjectId: 'economie' | 'sociologie' | 'science-politique',
    chapterId: string
  ) => {
    updateChapterProgress(subjectId, chapterId, { completed: true });
  };

  const value = {
    progress,
    isLoading,
    updateChapterProgress,
    updateQuizProgress,
    updateTimeSpent,
    getChapterProgress,
    getQuizProgress,
    getOverallProgress,
    getRecentActivities,
    formatTime,
    markChapterAsCompleted
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
