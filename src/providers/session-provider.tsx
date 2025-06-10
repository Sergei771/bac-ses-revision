"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Type pour la session de révision
export type RevisionSession = {
  active: boolean;
  startTime: string | null; // ISO date string
  duration: number; // en secondes
  goal: string;
  subject: 'economie' | 'sociologie' | 'science-politique' | 'all';
};

// Contexte pour la session
type SessionContextType = {
  session: RevisionSession;
  startSession: (subject: RevisionSession['subject'], goal: string) => void;
  endSession: () => void;
  updateSessionDuration: () => void;
  getRemainingTime: () => number; // en secondes
  getElapsedTime: () => number; // en secondes
  formatTime: (seconds: number) => string;
};

// Valeur par défaut de la session
const defaultSession: RevisionSession = {
  active: false,
  startTime: null,
  duration: 0,
  goal: '',
  subject: 'all',
};

// Créer le contexte
const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<RevisionSession>(defaultSession);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Charger la session depuis le localStorage au démarrage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSession = localStorage.getItem('revision-session');
      if (savedSession) {
        try {
          const parsedSession = JSON.parse(savedSession);
          setSession(parsedSession);
          
          // Si la session est active, on continue à mettre à jour la durée
          if (parsedSession.active) {
            const timer = setInterval(() => {
              updateSessionDuration();
            }, 1000);
            setIntervalId(timer);
          }
        } catch (e) {
          console.error('Erreur lors du chargement de la session:', e);
        }
      }
    }
  }, []);

  // Sauvegarder la session lorsqu'elle change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('revision-session', JSON.stringify(session));
    }
  }, [session]);

  // Nettoyer l'intervalle lors du démontage
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  // Démarrer une nouvelle session
  const startSession = (subject: RevisionSession['subject'], goal: string) => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const newSession = {
      active: true,
      startTime: new Date().toISOString(),
      duration: 0,
      goal,
      subject,
    };

    setSession(newSession);

    // Démarrer un timer pour mettre à jour la durée chaque seconde
    const timer = setInterval(() => {
      updateSessionDuration();
    }, 1000);
    setIntervalId(timer);
  };

  // Terminer la session en cours
  const endSession = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    setSession(defaultSession);
  };

  // Mettre à jour la durée de la session
  const updateSessionDuration = () => {
    setSession(prev => {
      if (!prev.active || !prev.startTime) return prev;
      
      const startTime = new Date(prev.startTime).getTime();
      const now = new Date().getTime();
      const durationMs = now - startTime;
      const durationSeconds = Math.floor(durationMs / 1000);
      
      return {
        ...prev,
        duration: durationSeconds,
      };
    });
  };

  // Obtenir le temps restant par rapport à un objectif (25 minutes par défaut)
  const getRemainingTime = (targetMinutes: number = 25) => {
    if (!session.active) return targetMinutes * 60;
    
    const targetSeconds = targetMinutes * 60;
    const remaining = Math.max(0, targetSeconds - session.duration);
    return remaining;
  };

  // Obtenir le temps écoulé depuis le début de la session
  const getElapsedTime = () => {
    if (!session.active || !session.startTime) return 0;
    return session.duration;
  };

  // Formater le temps (secondes -> format lisible)
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes.toString().padStart(2, '0')}min ${secs.toString().padStart(2, '0')}s`;
    }
    return `${minutes}min ${secs.toString().padStart(2, '0')}s`;
  };

  const value = {
    session,
    startSession,
    endSession,
    updateSessionDuration,
    getRemainingTime,
    getElapsedTime,
    formatTime,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}; 