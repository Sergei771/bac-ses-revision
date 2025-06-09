"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, LayoutGrid } from "lucide-react"; // Changed icon to LayoutGrid
import Link from "next/link";
import QuizPlayer from "@/components/quiz-player";
import { useProgress } from "@/hooks/useProgress";
import { shuffleArray } from "@/lib/utils"; // Import shuffleArray

const quizTitle = "Quiz: Concurrence Parfaite et Imparfaite"; // Added for consistency
const chapterSlug = "concurrence"; // Added for consistency
const subject = "economie"; // Added for consistency
const accentColor = "eco-blue"; // Added accentColor

// Types pour les questions de quiz
type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

// Questions du quiz sur la concurrence parfaite et imparfaite
const quizQuestions: QuizQuestion[] = [
  {
    id: "cpi_q1",
    question: "Laquelle de ces conditions N'EST PAS une caractéristique de la concurrence parfaite ?",
    options: [
      "Atomicité du marché",
      "Produits différenciés",
      "Transparence de l'information",
      "Libre entrée et sortie du marché"
    ],
    correctAnswer: 1,
    explanation: "En concurrence parfaite, les produits sont homogènes (non différenciés). La différenciation des produits est une caractéristique de la concurrence monopolistique."
  },
  {
    id: "cpi_q2",
    question: "Qu'est-ce qu'un monopole ?",
    options: [
      "Un marché avec quelques vendeurs",
      "Un marché avec un seul acheteur",
      "Un marché avec un seul vendeur",
      "Un marché où les prix sont fixés par l'État"
    ],
    correctAnswer: 2,
    explanation: "Un monopole est une structure de marché caractérisée par la présence d'un seul vendeur (ou producteur) face à une multitude d'acheteurs."
  },
  {
    id: "cpi_q3",
    question: "Dans un oligopole, les entreprises sont souvent en situation d'interdépendance stratégique. Qu'est-ce que cela signifie ?",
    options: [
      "Les entreprises coopèrent toujours pour fixer les prix.",
      "Les décisions d'une entreprise n'affectent pas les autres.",
      "Chaque entreprise doit tenir compte des réactions possibles de ses concurrents lorsqu'elle prend des décisions.",
      "Il n'y a pas de concurrence car les entreprises sont peu nombreuses."
    ],
    correctAnswer: 2,
    explanation: "L'interdépendance stratégique signifie que les entreprises doivent anticiper les réactions de leurs concurrents à leurs propres actions (prix, quantité, publicité, etc.), car le profit de chacune dépend des décisions des autres."
  },
  {
    id: "cpi_q4",
    question: "Quelle structure de marché se caractérise par de nombreux vendeurs proposant des produits différenciés (par la marque, la qualité, le design, etc.) ?",
    options: [
      "Concurrence parfaite",
      "Monopole",
      "Oligopole",
      "Concurrence monopolistique"
    ],
    correctAnswer: 3,
    explanation: "La concurrence monopolistique combine des éléments de concurrence (nombreux vendeurs, libre entrée) et de monopole (produits différenciés conférant un certain pouvoir de marché à chaque entreprise)."
  },
  {
    id: "cpi_q5",
    question: "Le 'pouvoir de marché' d'une entreprise se réfère à sa capacité à...",
    options: [
      "Influencer le prix du marché au-dessus de son coût marginal.",
      "Produire au coût le plus bas possible.",
      "Satisfaire tous les consommateurs.",
      "Innover plus rapidement que ses concurrents."
    ],
    correctAnswer: 0,
    explanation: "Le pouvoir de marché est la capacité d'une entreprise à fixer un prix supérieur à son coût marginal sans perdre tous ses clients. Il est absent en concurrence parfaite."
  },
  {
    id: "cpi_q6",
    question: "Une entente illégale entre entreprises d'un oligopole pour fixer les prix ou se répartir le marché s'appelle :",
    options: [
      "Une fusion-acquisition",
      "Un cartel",
      "Une stratégie de niche",
      "Une barrière à l'entrée"
    ],
    correctAnswer: 1,
    explanation: "Un cartel est un accord formel ou informel entre entreprises concurrentes visant à limiter la concurrence, souvent en fixant les prix, en limitant la production ou en se partageant les marchés. C'est généralement illégal."
  },
  {
    id: "cpi_q7",
    question: "Quelle est la principale différence entre un monopole naturel et un monopole légal ?",
    options: [
      "Le monopole naturel est toujours détenu par l'État, le monopole légal par une entreprise privée.",
      "Le monopole naturel découle de coûts de production élevés rendant un seul producteur plus efficace, le monopole légal est accordé par une autorité publique.",
      "Le monopole naturel n'a pas de barrières à l'entrée, contrairement au monopole légal.",
      "Il n'y a pas de différence significative, les deux termes sont interchangeables."
    ],
    correctAnswer: 1,
    explanation: "Un monopole naturel existe lorsque les conditions de coûts (forts coûts fixes, économies d'échelle) font qu'un seul producteur est plus efficace. Un monopole légal est créé par la loi (ex: brevets, licences exclusives)."
  },
  {
    id: "cpi_q8",
    question: "En concurrence monopolistique, chaque entreprise dispose d'un certain pouvoir de marché grâce à :",
    options: [
      "L'atomicité parfaite des acheteurs.",
      "La différenciation de son produit.",
      "L'absence totale de concurrents.",
      "La transparence parfaite de l'information."
    ],
    correctAnswer: 1,
    explanation: "La différenciation du produit (par la marque, la qualité, le design, la localisation, etc.) permet à chaque entreprise en concurrence monopolistique de fidéliser une partie de la clientèle et de fixer un prix légèrement supérieur à celui de ses concurrents sans perdre tous ses clients."
  },
  {
    id: "cpi_q9",
    question: "Une 'barrière à l'entrée' sur un marché peut être :",
    options: [
      "Uniquement un obstacle légal (ex: licence).",
      "Uniquement un obstacle financier (ex: coûts de démarrage élevés).",
      "Tout facteur qui rend difficile ou coûteux pour une nouvelle entreprise d'entrer sur un marché et de concurrencer les entreprises existantes.",
      "Une situation où les produits sont parfaitement homogènes."
    ],
    correctAnswer: 2,
    explanation: "Les barrières à l'entrée peuvent être de nature légale (brevets, licences), structurelle (économies d'échelle, coûts irrécupérables élevés, accès aux réseaux de distribution) ou stratégique (prix prédateurs, publicité massive)."
  },
  {
    id: "cpi_q10",
    question: "Dans le modèle de duopole de Cournot, les entreprises concurrentes choisissent simultanément :",
    options: [
      "Leurs prix de vente.",
      "Leurs quantités à produire.",
      "Leurs dépenses publicitaires.",
      "Leurs stratégies de différenciation de produit."
    ],
    correctAnswer: 1,
    explanation: "Dans le modèle de Cournot, chaque entreprise détermine la quantité qu'elle va produire en supposant que la quantité produite par son concurrent est fixe. La concurrence se fait par les quantités."
  },
  {
    id: "cpi_q11",
    question: "Quelle est la principale critique adressée à la concurrence parfaite en tant que modèle descriptif de la réalité ?",
    options: [
      "Elle suppose que les entreprises cherchent à maximiser leurs profits.",
      "Elle ne prend pas en compte les coûts de production.",
      "Ses conditions strictes (atomicité, homogénéité, transparence, libre entrée/sortie) sont rarement toutes réunies dans la réalité.",
      "Elle mène toujours à des prix trop élevés pour les consommateurs."
    ],
    correctAnswer: 2,
    explanation: "Bien qu'utile comme référence théorique, le modèle de concurrence parfaite est souvent critiqué car ses hypothèses (produits identiques, information parfaite, absence de barrières, etc.) sont très restrictives et s'écartent de la plupart des marchés réels."
  },
  {
    id: "cpi_q12",
    question: "Un marché contestable est un marché où :",
    options: [
      "Il y a de nombreux conflits entre les entreprises.",
      "Les entreprises en place peuvent être menacées par l'entrée de nouveaux concurrents potentiels, même si le nombre d'entreprises est faible.",
      "Les consommateurs contestent systématiquement les prix.",
      "L'État impose des tests de qualité stricts sur les produits."
    ],
    correctAnswer: 1,
    explanation: "La théorie des marchés contestables suggère que même un monopole ou un oligopole peut se comporter de manière concurrentielle si la menace d'entrée de nouveaux concurrents est crédible (absence de barrières à l'entrée et à la sortie)."
  },
  {
    id: "cpi_q13",
    question: "Lequel de ces secteurs est le plus susceptible d'être un oligopole ?",
    options: [
      "Les restaurants d'une grande ville.",
      "La production de blé.",
      "Les opérateurs de téléphonie mobile.",
      "Les coiffeurs indépendants."
    ],
    correctAnswer: 2,
    explanation: "Le secteur de la téléphonie mobile est souvent dominé par un petit nombre de grands opérateurs, en raison des coûts d'infrastructure élevés et des licences, ce qui correspond à une structure d'oligopole."
  },
  {
    id: "cpi_q14",
    question: "En situation de monopole, le prix fixé par l'entreprise est généralement :",
    options: [
      "Inférieur au coût marginal.",
      "Égal au coût marginal.",
      "Supérieur au coût marginal.",
      "Déterminé par l'équilibre entre l'offre et la demande globales du marché."
    ],
    correctAnswer: 2,
    explanation: "Un monopoleur maximise son profit en fixant un prix là où sa recette marginale égale son coût marginal. Comme la courbe de demande qui s'adresse à lui est décroissante, ce prix est supérieur au coût marginal (et à la recette marginale)."
  },
  {
    id: "cpi_q15",
    question: "Les autorités de la concurrence interviennent typiquement pour :",
    options: [
      "Fixer les prix dans tous les secteurs.",
      "Encourager la formation de monopoles pour stimuler l'innovation.",
      "Sanctionner les abus de position dominante et les ententes illicites.",
      "Protéger les entreprises nationales de la concurrence étrangère."
    ],
    correctAnswer: 2,
    explanation: "Le rôle principal des autorités de la concurrence est de préserver une concurrence effective sur les marchés en luttant contre les pratiques anticoncurrentielles telles que les ententes sur les prix, les abus de position dominante, et en contrôlant certaines opérations de concentration (fusions-acquisitions)."
  }
];

export default function ConcurrenceQuizPage() {
  const { getQuizProgress, isLoading } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]); // State for shuffled questions
  const quizId = "concurrence";

  useEffect(() => {
    setMounted(true);
    setShuffledQuestions(shuffleArray(quizQuestions)); // Shuffle questions on mount
  }, []);

  const handleQuizComplete = (score: number) => {
    // La mise à jour de la progression est gérée dans le QuizPlayer via le hook useProgress
    console.log(`Quiz '${quizId}' (Économie) terminé avec un score de ${score}/${quizQuestions.length}`);
  };

  if (!mounted || isLoading || shuffledQuestions.length === 0) { // Check shuffledQuestions.length
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-blue"></div>
      </div>
    );
  }

  const quizProgress = getQuizProgress(subject, quizId);
  // const hasAttempted = quizProgress?.attempts && quizProgress.attempts > 0; // Not directly used in marche-prix, can be added if needed for UI later

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/quiz/economie" // Adjusted link to go back to the economy quiz list
          className="flex items-center text-eco-blue hover:text-eco-dark-blue dark:text-eco-light-blue dark:hover:text-eco-blue mb-4 transition-colors duration-150"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour aux quiz d'Économie
        </Link>
        
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
          <div className="flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <LayoutGrid className="mr-3 h-7 w-7 sm:h-8 sm:w-8 text-eco-blue" /> {/* Icon updated */}
              {quizTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Évaluez votre compréhension des différentes structures de marché, de la concurrence parfaite aux diverses formes de concurrence imparfaite.
            </p>
          </div>
          {/* Potential placeholder for stats or a small image if needed in future */}
        </div>
      </div>

      {/* Quiz Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8"
      >
        <QuizPlayer 
          questions={shuffledQuestions} // Pass shuffledQuestions to QuizPlayer
          quizId={quizId}
          subjectId={subject}
          onComplete={handleQuizComplete}
        />
      </motion.div>
      
      <div className="mt-8 text-center">
        <Link 
            href="/economie/microeconomie/concurrence" 
            className="text-sm text-eco-blue hover:underline"
        >
            Revoir le chapitre sur la Concurrence parfaite et imparfaite
        </Link>
      </div>
    </div>
  );
} 