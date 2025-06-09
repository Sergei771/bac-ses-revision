"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, LineChart } from "lucide-react";
import Link from "next/link";
import QuizPlayer from "@/components/quiz-player";
import { useProgress } from "@/hooks/useProgress";
import { shuffleArray } from "@/lib/utils";

const quizTitle = "Quiz: Le Marché et la Formation des Prix";
const chapterSlug = "marche-prix";
const subject = "economie";
const accentColor = "eco-blue";

// Types pour les questions de quiz
type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

// Questions du quiz sur le marché et la formation des prix
const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Selon la loi de la demande, que se passe-t-il à la quantité demandée lorsque le prix d'un bien augmente ?",
    options: [
      "Elle augmente",
      "Elle diminue",
      "Elle reste constante",
      "Elle peut augmenter ou diminuer selon le bien"
    ],
    correctAnswer: 1,
    explanation: "La loi de la demande stipule que, toutes choses égales par ailleurs, la quantité demandée d'un bien diminue lorsque son prix augmente. C'est pourquoi la courbe de demande est généralement décroissante."
  },
  {
    id: "q2",
    question: "Selon la loi de l'offre, que se passe-t-il à la quantité offerte lorsque le prix d'un bien augmente ?",
    options: [
      "Elle augmente",
      "Elle diminue",
      "Elle reste constante",
      "Elle peut augmenter ou diminuer selon le bien"
    ],
    correctAnswer: 0,
    explanation: "La loi de l'offre stipule que, toutes choses égales par ailleurs, la quantité offerte d'un bien augmente lorsque son prix augmente. C'est pourquoi la courbe d'offre est généralement croissante."
  },
  {
    id: "q3",
    question: "Qu'est-ce que le prix d'équilibre sur un marché ?",
    options: [
      "Le prix fixé par l'État",
      "Le prix le plus bas possible",
      "Le prix auquel la quantité offerte égale la quantité demandée",
      "Le prix moyen pratiqué par les entreprises"
    ],
    correctAnswer: 2,
    explanation: "Le prix d'équilibre est le prix auquel la quantité offerte est égale à la quantité demandée. À ce prix, le marché est en équilibre : il n'y a ni excédent ni pénurie."
  },
  {
    id: "q4",
    question: "Que se passe-t-il sur un marché lorsque le prix est supérieur au prix d'équilibre ?",
    options: [
      "Il y a une pénurie",
      "Il y a un excédent d'offre",
      "Le marché est en équilibre",
      "La demande augmente"
    ],
    correctAnswer: 1,
    explanation: "Lorsque le prix est supérieur au prix d'équilibre, la quantité offerte est supérieure à la quantité demandée, créant un excédent d'offre (surplus). Les producteurs ne peuvent pas vendre toute leur production."
  },
  {
    id: "q5",
    question: "Que se passe-t-il sur un marché lorsque le prix est inférieur au prix d'équilibre ?",
    options: [
      "Il y a une pénurie",
      "Il y a un excédent d'offre",
      "Le marché est en équilibre",
      "L'offre augmente"
    ],
    correctAnswer: 0,
    explanation: "Lorsque le prix est inférieur au prix d'équilibre, la quantité demandée est supérieure à la quantité offerte, créant une pénurie. Les consommateurs ne peuvent pas acheter toute la quantité qu'ils souhaitent."
  },
  {
    id: "q6",
    question: "Qu'est-ce que l'élasticité-prix de la demande ?",
    options: [
      "La variation du prix en fonction de la quantité",
      "La sensibilité de la quantité demandée aux variations de prix",
      "La pente de la courbe de demande",
      "La différence entre le prix maximum et le prix minimum"
    ],
    correctAnswer: 1,
    explanation: "L'élasticité-prix de la demande mesure la sensibilité de la quantité demandée aux variations de prix. Elle quantifie le pourcentage de variation de la quantité demandée suite à un pourcentage de variation du prix."
  },
  {
    id: "q7",
    question: "Comment qualifie-t-on une demande dont l'élasticité-prix est inférieure à 1 en valeur absolue ?",
    options: [
      "Élastique",
      "Inélastique",
      "D'élasticité unitaire",
      "Parfaitement élastique"
    ],
    correctAnswer: 1,
    explanation: "Une demande est dite inélastique lorsque son élasticité-prix est inférieure à 1 en valeur absolue. Cela signifie que la quantité demandée varie proportionnellement moins que le prix."
  },
  {
    id: "q8",
    question: "Qu'est-ce que le surplus du consommateur ?",
    options: [
      "La différence entre ce que le consommateur est prêt à payer et ce qu'il paie réellement",
      "Le profit réalisé par le producteur",
      "La différence entre le prix d'équilibre et le coût de production",
      "L'excédent d'offre sur un marché"
    ],
    correctAnswer: 0,
    explanation: "Le surplus du consommateur représente la différence entre ce qu'un consommateur est prêt à payer pour un bien (son prix de réservation) et ce qu'il paie réellement (le prix du marché)."
  },
  {
    id: "q9",
    question: "Qu'est-ce que le surplus du producteur ?",
    options: [
      "La différence entre ce que le consommateur est prêt à payer et ce qu'il paie réellement",
      "Le profit total réalisé par l'entreprise",
      "La différence entre le prix de vente et le prix minimum auquel le producteur aurait accepté de vendre",
      "L'excédent de demande sur un marché"
    ],
    correctAnswer: 2,
    explanation: "Le surplus du producteur représente la différence entre le prix auquel un producteur vend effectivement son bien (le prix du marché) et le prix minimum auquel il aurait été prêt à le vendre (son coût marginal)."
  },
  {
    id: "q10",
    question: "Quel est l'effet d'une augmentation du revenu des consommateurs sur la demande d'un bien normal ?",
    options: [
      "La courbe de demande se déplace vers la gauche",
      "La courbe de demande se déplace vers la droite",
      "On se déplace le long de la courbe de demande",
      "La courbe de demande ne change pas"
    ],
    correctAnswer: 1,
    explanation: "Pour un bien normal, une augmentation du revenu des consommateurs entraîne un déplacement de la courbe de demande vers la droite, ce qui signifie une augmentation de la demande à tous les niveaux de prix."
  },
  {
    id: "q11",
    question: "Quel est l'effet d'une amélioration technologique sur l'offre d'un bien ?",
    options: [
      "La courbe d'offre se déplace vers la gauche",
      "La courbe d'offre se déplace vers la droite",
      "On se déplace le long de la courbe d'offre",
      "La courbe d'offre ne change pas"
    ],
    correctAnswer: 1,
    explanation: "Une amélioration technologique réduit généralement les coûts de production, ce qui permet aux producteurs d'offrir davantage à chaque niveau de prix. Cela se traduit par un déplacement de la courbe d'offre vers la droite."
  },
  {
    id: "q12",
    question: "Dans un marché concurrentiel, que maximise l'équilibre du marché ?",
    options: [
      "Le profit des entreprises",
      "Le surplus des consommateurs",
      "Le surplus des producteurs",
      "Le surplus total (somme des surplus du consommateur et du producteur)"
    ],
    correctAnswer: 3,
    explanation: "Dans un marché concurrentiel sans défaillances, l'équilibre du marché maximise le surplus total, c'est-à-dire la somme du surplus du consommateur et du surplus du producteur. C'est ce qu'on appelle l'efficience allocative."
  },
  {
    id: "q13",
    question: "Comment évolue le prix d'équilibre si la demande augmente et que l'offre reste constante ?",
    options: [
      "Le prix d'équilibre augmente",
      "Le prix d'équilibre diminue",
      "Le prix d'équilibre reste constant",
      "L'effet sur le prix d'équilibre est indéterminé"
    ],
    correctAnswer: 0,
    explanation: "Si la demande augmente (déplacement de la courbe de demande vers la droite) et que l'offre reste constante, le prix d'équilibre augmente et la quantité d'équilibre augmente également."
  },
  {
    id: "q14",
    question: "Comment évolue le prix d'équilibre si l'offre augmente et que la demande reste constante ?",
    options: [
      "Le prix d'équilibre augmente",
      "Le prix d'équilibre diminue",
      "Le prix d'équilibre reste constant",
      "L'effet sur le prix d'équilibre est indéterminé"
    ],
    correctAnswer: 1,
    explanation: "Si l'offre augmente (déplacement de la courbe d'offre vers la droite) et que la demande reste constante, le prix d'équilibre diminue et la quantité d'équilibre augmente."
  },
  {
    id: "q15",
    question: "Quelle est la différence entre un mouvement le long d'une courbe de demande et un déplacement de la courbe de demande ?",
    options: [
      "Il n'y a pas de différence, ce sont deux façons de décrire le même phénomène",
      "Un mouvement le long de la courbe est dû à un changement de prix, un déplacement de la courbe est dû à un changement d'autres facteurs",
      "Un mouvement le long de la courbe est dû à un changement de la quantité, un déplacement de la courbe est dû à un changement de prix",
      "Un mouvement le long de la courbe concerne le court terme, un déplacement de la courbe concerne le long terme"
    ],
    correctAnswer: 1,
    explanation: "Un mouvement le long de la courbe de demande est causé par un changement du prix du bien lui-même. Un déplacement de la courbe de demande est causé par un changement dans les autres facteurs qui influencent la demande (revenu, goûts, prix des autres biens, etc.)."
  }
];

export default function MarchePrixQuizPage() {
  const { getQuizProgress, updateQuizProgress, isLoading } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const quizId = "marche-prix";
  const subjectId = "economie";

  useEffect(() => {
    setMounted(true);
    setShuffledQuestions(shuffleArray(quizQuestions));
  }, []);

  const handleQuizComplete = (score: number) => {
    // La mise à jour de la progression est déjà gérée dans le QuizPlayer
    console.log(`Quiz terminé avec un score de ${score}/${quizQuestions.length}`);
  };

  if (!mounted || isLoading || shuffledQuestions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-blue"></div>
      </div>
    );
  }

  const quizProgress = getQuizProgress(subjectId, quizId);
  const hasAttempted = quizProgress?.attempts && quizProgress.attempts > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/quiz" 
          className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour aux quiz
        </Link>
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <LineChart className="mr-2 h-8 w-8 text-eco-blue" />
              Quiz : Le marché et la formation des prix
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Testez vos connaissances sur les mécanismes de l'offre et de la demande et la formation des prix sur un marché concurrentiel.
            </p>
          </div>
        </div>
        
        {hasAttempted && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
            <p className="text-blue-800 dark:text-blue-300">
              Vous avez déjà réalisé ce quiz. Votre meilleur score : <span className="font-semibold">{quizProgress?.score}%</span>. 
              Nombre de tentatives : <span className="font-semibold">{quizProgress?.attempts}</span>.
            </p>
          </div>
        )}
      </div>

      {/* Quiz Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <QuizPlayer 
          questions={shuffledQuestions}
          quizId={quizId} 
          subjectId={subjectId}
          onComplete={handleQuizComplete}
        />
      </motion.div>
    </div>
  );
}
