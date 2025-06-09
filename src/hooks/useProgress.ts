"use client";

import { useState, useEffect } from 'react';

// Réexporter les types et le hook useProgress depuis le provider
export {
  useProgress,
  type ChapterProgress,
  type QuizProgress,
  type SubjectProgress,
  type UserProgress
} from '@/providers/progress-provider';

// Types pour le contenu
export type ContentSection = {
  id: string;
  title: string;
  content: string;
};

export type ChapterContent = {
  introduction: string;
  sections: {
    id: string;
    title: string;
    content: string;
  }[];
  conclusion: string;
};

export type Chapter = {
  id: string;
  title: string;
  description: string;
  content?: ChapterContent;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'eco' | 'socio' | 'politic';
  chapitres: Chapter[];
};

export type ContentData = {
  modules: Module[];
};

// Hook pour récupérer le contenu
export function useContent(subject: 'economie' | 'sociologie' | 'science-politique') {
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        // Dans un environnement de production, cela serait remplacé par un appel API
        const contentData = await import(`@/data/content/${subject}.json`);
        setData(contentData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Une erreur est survenue lors du chargement du contenu'));
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [subject]);

  // Fonction pour récupérer un module spécifique par son ID
  const getModule = (moduleId: string): Module | undefined => {
    return data?.modules.find(module => module.id === moduleId);
  };

  // Fonction pour récupérer un chapitre spécifique par son ID et l'ID de son module
  const getChapter = (moduleId: string, chapterId: string): Chapter | undefined => {
    const module = getModule(moduleId);
    return module?.chapitres.find(chapitre => chapitre.id === chapterId);
  };

  return {
    data,
    loading,
    error,
    getModule,
    getChapter
  };
}

// Hook pour récupérer les données de quiz
export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  subject: 'economie' | 'sociologie' | 'politique';
  difficulty: 'facile' | 'moyen' | 'difficile';
  questions: QuizQuestion[];
};

export function useQuiz(quizId: string) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Cette fonction simule le chargement des données de quiz
    // Dans une application réelle, cela serait remplacé par un appel API
    async function fetchQuiz() {
      try {
        setLoading(true);
        // Simulation d'un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Pour l'instant, nous retournons un quiz fictif
        // Cela serait remplacé par un vrai appel API ou import de données
        const mockQuiz: Quiz = {
          id: quizId,
          title: "Quiz sur la croissance économique",
          description: "Testez vos connaissances sur les mécanismes et les enjeux de la croissance économique",
          subject: "economie",
          difficulty: "moyen",
          questions: [
            {
              id: "q1",
              question: "Comment définit-on la croissance économique ?",
              options: [
                "L'augmentation du niveau général des prix",
                "L'augmentation soutenue de la production de biens et services sur une longue période",
                "La diminution du taux de chômage",
                "L'équilibre entre importations et exportations"
              ],
              correctAnswer: 1,
              explanation: "La croissance économique se définit comme l'augmentation soutenue de la production de biens et services dans une économie sur une période longue. Elle est généralement mesurée par le taux de variation du PIB réel."
            },
            {
              id: "q2",
              question: "Quel indicateur est principalement utilisé pour mesurer la croissance économique ?",
              options: [
                "L'indice des prix à la consommation (IPC)",
                "Le taux de chômage",
                "Le produit intérieur brut (PIB)",
                "La balance commerciale"
              ],
              correctAnswer: 2,
              explanation: "Le produit intérieur brut (PIB) est l'indicateur principal utilisé pour mesurer la croissance économique. Plus précisément, on utilise le taux de variation du PIB réel (corrigé de l'inflation) d'une période à l'autre."
            }
          ]
        };
        
        setQuiz(mockQuiz);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Une erreur est survenue lors du chargement du quiz'));
      } finally {
        setLoading(false);
      }
    }

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  return {
    quiz,
    loading,
    error
  };
}
