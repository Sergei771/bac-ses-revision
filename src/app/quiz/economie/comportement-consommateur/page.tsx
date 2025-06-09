"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart } from "lucide-react"; // Icon changed to ShoppingCart
import Link from "next/link";
import QuizPlayer from "@/components/quiz-player";
import { useProgress } from "@/hooks/useProgress";
import { shuffleArray } from "@/lib/utils"; // Import shuffleArray

const quizTitle = "Quiz: Le Comportement du Consommateur"; // Added for consistency
const chapterSlug = "comportement-consommateur"; // Added for consistency
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

// Questions du quiz sur le comportement du consommateur
const quizQuestions: QuizQuestion[] = [
  {
    id: "cc_q1",
    question: "Qu'est-ce que la contrainte budgétaire d'un consommateur ?",
    options: [
      "L'ensemble des biens qu'il désire consommer.",
      "L'ensemble des paniers de biens qu'il peut acquérir avec son revenu disponible et les prix des biens.",
      "La satisfaction maximale qu'il peut atteindre.",
      "Sa préférence pour certains biens par rapport à d'autres."
    ],
    correctAnswer: 1,
    explanation: "La contrainte budgétaire représente la limite des combinaisons de biens et services qu'un consommateur peut acheter, compte tenu de son revenu et des prix des biens."
  },
  {
    id: "cc_q2",
    question: "Une courbe d'indifférence représente :",
    options: [
      "L'ensemble des paniers de biens qui procurent au consommateur le même niveau de satisfaction.",
      "L'ensemble des paniers de biens que le consommateur peut acheter avec un budget donné.",
      "La relation entre le prix d'un bien et la quantité demandée.",
      "La variation de l'utilité totale lorsque la consommation d'un bien augmente d'une unité."
    ],
    correctAnswer: 0,
    explanation: "Une courbe d'indifférence relie tous les paniers de biens qui apportent au consommateur un niveau d'utilité (satisfaction) identique. Le consommateur est donc indifférent entre ces paniers."
  },
  {
    id: "cc_q3",
    question: "Qu'est-ce que l'utilité marginale ?",
    options: [
      "La satisfaction totale retirée de la consommation d'un bien.",
      "Le supplément de satisfaction procuré par la consommation d'une unité supplémentaire d'un bien.",
      "Le prix maximum qu'un consommateur est prêt à payer pour un bien.",
      "Le nombre total d'unités d'un bien qu'un consommateur achète."
    ],
    correctAnswer: 1,
    explanation: "L'utilité marginale est l'accroissement d'utilité obtenu par la consommation d'une unité additionnelle d'un bien, toutes choses égales par ailleurs."
  },
  {
    id: "cc_q4",
    question: "Selon le principe de l'utilité marginale décroissante :",
    options: [
      "Plus un consommateur consomme d'un bien, plus chaque unité supplémentaire lui apporte de satisfaction.",
      "La satisfaction totale diminue lorsque la consommation d'un bien augmente.",
      "L'utilité marginale de la première unité consommée est toujours nulle.",
      "Chaque unité supplémentaire d'un bien consommé apporte moins de satisfaction que la précédente."
    ],
    correctAnswer: 3,
    explanation: "Ce principe stipule que, à mesure que la quantité consommée d'un bien augmente, l'utilité marginale tirée de chaque unité additionnelle tend à diminuer."
  },
  {
    id: "cc_q5",
    question: "Le choix optimal du consommateur est atteint lorsque :",
    options: [
      "Il dépense tout son revenu.",
      "Il maximise son utilité marginale pour chaque bien.",
      "Sa courbe d'indifférence la plus élevée possible est tangente à sa droite de budget.",
      "Il achète des quantités égales de tous les biens."
    ],
    correctAnswer: 2,
    explanation: "Le consommateur atteint son équilibre (choix optimal) au point de tangence entre sa droite de budget et la courbe d'indifférence la plus éloignée de l'origine qu'il peut atteindre. À ce point, le TMS est égal au rapport des prix."
  },
  {
    id: "cc_q6",
    question: "Qu'est-ce que l'effet de substitution suite à une baisse du prix d'un bien ?",
    options: [
      "Le consommateur achète moins de ce bien car il peut se permettre d'autres biens.",
      "Le consommateur achète plus de ce bien car son pouvoir d'achat global a augmenté.",
      "Le consommateur achète plus de ce bien (devenu relativement moins cher) et moins des autres biens (devenus relativement plus chers).",
      "Le consommateur change complètement ses préférences."
    ],
    correctAnswer: 2,
    explanation: "L'effet de substitution traduit le changement dans la consommation d'un bien dû uniquement à la variation de son prix relatif, le pouvoir d'achat (utilité) étant maintenu constant. Le bien devenu moins cher est substitué aux autres."
  },
  {
    id: "cc_q7",
    question: "Qu'est-ce que l'effet de revenu suite à une baisse du prix d'un bien ?",
    options: [
      "Le revenu réel du consommateur diminue.",
      "Le consommateur substitue ce bien à d'autres.",
      "Le pouvoir d'achat du consommateur augmente, lui permettant d'acheter plus de biens (y compris celui dont le prix a baissé, s'il est normal).",
      "Les préférences du consommateur pour ce bien augmentent."
    ],
    correctAnswer: 2,
    explanation: "L'effet de revenu traduit le changement dans la consommation d'un bien dû à la variation du pouvoir d'achat du consommateur, consécutive à la variation du prix du bien."
  },
  {
    id: "cc_q8",
    question: "Un bien est dit 'normal' si :",
    options: [
      "Sa demande diminue lorsque le revenu du consommateur augmente.",
      "Sa demande augmente lorsque son prix augmente.",
      "Sa demande augmente lorsque le revenu du consommateur augmente.",
      "Il n'a pas de substituts proches."
    ],
    correctAnswer: 2,
    explanation: "Pour un bien normal, la quantité demandée augmente lorsque le revenu du consommateur augmente, et inversement (élasticité-revenu positive)."
  },
  {
    id: "cc_q9",
    question: "Un bien est dit 'inférieur' si :",
    options: [
      "Sa qualité est médiocre.",
      "Sa demande augmente lorsque le revenu du consommateur augmente.",
      "Sa demande diminue lorsque le revenu du consommateur augmente.",
      "Son prix est très bas."
    ],
    correctAnswer: 2,
    explanation: "Pour un bien inférieur, la quantité demandée diminue lorsque le revenu du consommateur augmente (élasticité-revenu négative). Les consommateurs tendent à les remplacer par des biens de meilleure qualité lorsque leur revenu le permet."
  },
  {
    id: "cc_q10",
    question: "Deux biens sont dits 'complémentaires' si :",
    options: [
      "Ils sont toujours consommés ensemble dans des proportions fixes.",
      "L'augmentation du prix de l'un entraîne une augmentation de la demande de l'autre.",
      "Ils peuvent être utilisés l'un à la place de l'autre.",
      "L'augmentation du prix de l'un entraîne une diminution de la demande de l'autre."
    ],
    correctAnswer: 3,
    explanation: "Les biens complémentaires sont consommés conjointement (ex: voiture et essence). Si le prix de l'un augmente, la demande pour ce bien diminue, et par conséquent, la demande pour le bien complémentaire diminue aussi (élasticité-prix croisée négative)."
  },
  {
    id: "cc_q11",
    question: "Deux biens sont dits 'substituables' si :",
    options: [
      "Ils doivent être consommés ensemble pour procurer de la satisfaction.",
      "L'augmentation du prix de l'un entraîne une diminution de la demande de l'autre.",
      "Ils peuvent satisfaire le même type de besoin et être remplacés l'un par l'autre.",
      "Leur consommation est indépendante l'une de l'autre."
    ],
    correctAnswer: 2,
    explanation: "Les biens substituables peuvent se remplacer mutuellement pour satisfaire un même besoin (ex: thé et café). Si le prix de l'un augmente, les consommateurs tendent à augmenter leur demande pour le bien substitut (élasticité-prix croisée positive)."
  },
  {
    id: "cc_q12",
    question: "Le Taux Marginal de Substitution (TMS) entre deux biens mesure :",
    options: [
      "Le rapport des prix des deux biens.",
      "La quantité d'un bien à laquelle le consommateur est prêt à renoncer pour obtenir une unité supplémentaire de l'autre bien, tout en gardant le même niveau de satisfaction.",
      "La variation de l'utilité totale lorsque le consommateur achète plus des deux biens.",
      "Le rapport des utilités marginales des deux biens, pondéré par leurs prix."
    ],
    correctAnswer: 1,
    explanation: "Le TMS est la pente (en valeur absolue) d'une courbe d'indifférence. Il indique la quantité d'un bien Y que le consommateur est prêt à céder pour obtenir une unité de plus du bien X, en maintenant son utilité constante."
  },
  {
    id: "cc_q13",
    question: "Si le prix d'un bien augmente, la droite de budget du consommateur :",
    options: [
      "Se déplace parallèlement vers l'extérieur.",
      "Pivote vers l'intérieur autour de l'axe du bien dont le prix n'a pas changé.",
      "Se déplace parallèlement vers l'intérieur.",
      "Pivote vers l'extérieur autour de l'axe du bien dont le prix n'a pas changé."
    ],
    correctAnswer: 1,
    explanation: "Si le prix d'un bien X augmente (revenu et prix du bien Y constants), la quantité maximale de X achetable diminue. La droite de budget pivote donc vers l'intérieur, son point d'intersection avec l'axe des Y restant inchangé."
  },
  {
    id: "cc_q14",
    question: "Qu'est-ce qu'un bien de Giffen ?",
    options: [
      "Un bien de luxe dont la demande augmente fortement avec le revenu.",
      "Un bien inférieur pour lequel l'effet de revenu l'emporte sur l'effet de substitution, conduisant à une augmentation de la demande lorsque son prix augmente.",
      "Un bien dont la demande est parfaitement inélastique au prix.",
      "Un bien qui n'est consommé que par une petite partie de la population."
    ],
    correctAnswer: 1,
    explanation: "Un bien de Giffen est un cas théorique rare de bien inférieur où l'effet de revenu (négatif et fort) domine l'effet de substitution, si bien que la courbe de demande est croissante (la quantité demandée augmente quand le prix augmente)."
  },
  {
    id: "cc_q15",
    question: "L'objectif principal du consommateur rationnel dans la théorie microéconomique est de :",
    options: [
      "Minimiser ses dépenses.",
      "Acheter le plus grand nombre de biens possible.",
      "Maximiser sa satisfaction (utilité) compte tenu de sa contrainte budgétaire.",
      "Égaliser les prix de tous les biens qu'il consomme."
    ],
    correctAnswer: 2,
    explanation: "La théorie du consommateur postule que les individus cherchent à maximiser leur utilité (satisfaction) sous la contrainte de leur budget limité et des prix des biens."
  }
];

export default function ComportementConsommateurQuizPage() {
  const { getQuizProgress, isLoading } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]); // State for shuffled questions
  const quizId = "comportement-consommateur";

  useEffect(() => {
    setMounted(true);
    setShuffledQuestions(shuffleArray(quizQuestions)); // Shuffle questions on mount
  }, []);

  const handleQuizComplete = (score: number) => {
    console.log(`Quiz '${quizId}' (Économie) terminé avec un score de ${score}/${quizQuestions.length}`);
  };

  if (!mounted || isLoading || shuffledQuestions.length === 0) { // Check shuffledQuestions.length
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-blue"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/quiz/economie"
          className="flex items-center text-eco-blue hover:text-eco-dark-blue dark:text-eco-light-blue dark:hover:text-eco-blue mb-4 transition-colors duration-150"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour aux quiz d'Économie
        </Link>
        
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
          <div className="flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <ShoppingCart className="mr-3 h-7 w-7 sm:h-8 sm:w-8 text-eco-blue" /> {/* Icon updated */}
              Quiz : Le comportement du consommateur
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Évaluez votre compréhension de la contrainte budgétaire, des préférences, de l'utilité et du choix optimal du consommateur.
            </p>
          </div>
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
            href="/economie/microeconomie/comportement-consommateur" 
            className="text-sm text-eco-blue hover:underline"
        >
            Revoir le chapitre sur Le comportement du consommateur
        </Link>
      </div>
    </div>
  );
} 