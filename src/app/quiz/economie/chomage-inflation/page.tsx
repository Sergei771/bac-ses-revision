"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Users, DollarSign } from "lucide-react";
import Link from "next/link";
import QuizPlayer from "@/components/quiz-player";
import { useProgress } from "@/hooks/useProgress";
import { shuffleArray } from "@/lib/utils";

const quizTitle = "Quiz: Chômage et Inflation";
const chapterSlug = "chomage-inflation";
const subject = "economie";
const accentColor = "eco-blue";

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const quizQuestions: QuizQuestion[] = [
  {
    id: "q1_chomage_inflation",
    question: "Selon la définition du BIT, un chômeur doit remplir combien de conditions simultanément ?",
    options: ["Une", "Deux", "Trois", "Quatre"],
    correctAnswer: 2,
    explanation: "Le BIT définit un chômeur selon trois critères : être sans emploi, être disponible pour travailler, et rechercher activement un emploi."
  },
  {
    id: "q2_chomage_inflation",
    question: "Quel type de chômage est principalement lié à une insuffisance de la demande globale dans l'économie ?",
    options: ["Chômage structurel", "Chômage frictionnel", "Chômage conjoncturel (keynésien)", "Chômage technique"],
    correctAnswer: 2,
    explanation: "Le chômage conjoncturel résulte d'un ralentissement de l'activité économique qui réduit la demande globale et donc la demande de travail."
  },
  {
    id: "q3_chomage_inflation",
    question: "L'inflation est définie comme :",
    options: [
      "Une baisse générale des prix",
      "Une augmentation ponctuelle du prix d'un bien",
      "Une augmentation générale, auto-entretenue et durable du niveau général des prix",
      "Un ralentissement de la hausse des prix"
    ],
    correctAnswer: 2,
    explanation: "L'inflation se caractérise par une hausse généralisée des prix qui est persistante et s'auto-entretient, entraînant une perte de pouvoir d'achat de la monnaie."
  },
  {
    id: "q4_chomage_inflation",
    question: "Comment appelle-t-on une situation où l'inflation ralentit (les prix augmentent moins vite) ?",
    options: ["Déflation", "Stagflation", "Désinflation", "Hyperinflation"],
    correctAnswer: 2,
    explanation: "La désinflation est un ralentissement du rythme de l'inflation. Les prix continuent d'augmenter, mais moins rapidement qu'auparavant."
  },
  {
    id: "q5_chomage_inflation",
    question: "Une inflation causée par une augmentation des salaires ou du prix des matières premières est appelée :",
    options: ["Inflation par la demande", "Inflation importée", "Inflation par les coûts", "Inflation monétaire"],
    correctAnswer: 2,
    explanation: "L'inflation par les coûts survient lorsque les entreprises répercutent sur leurs prix de vente une hausse de leurs coûts de production (salaires, énergie, matières premières...)."
  },
  {
    id: "q6_chomage_inflation",
    question: "La courbe de Phillips originelle décrivait une relation empirique inverse entre :",
    options: [
      "Le taux d'intérêt et l'investissement",
      "Le taux de chômage et le taux de croissance des salaires nominaux",
      "La croissance du PIB et l'inflation",
      "Les dépenses publiques et le taux de chômage"
    ],
    correctAnswer: 1,
    explanation: "A.W. Phillips a initialement observé une relation inverse entre le taux de chômage et la croissance des salaires nominaux, suggérant un arbitrage entre chômage et inflation."
  },
  {
    id: "q7_chomage_inflation",
    question: "Qu'est-ce que le NAIRU ?",
    options: [
      "Un indice de confiance des consommateurs",
      "Le taux d'inflation maximum tolérable",
      "Le taux de chômage qui n'accélère pas l'inflation (Non-Accelerating Inflation Rate of Unemployment)",
      "Une mesure de la productivité du travail"
    ],
    correctAnswer: 2,
    explanation: "Le NAIRU (ou taux de chômage naturel/structurel) est le taux de chômage théorique compatible avec une inflation stable. En dessous de ce taux, l'inflation tendrait à s'accélérer."
  },
  {
    id: "q8_chomage_inflation",
    question: "Lequel de ces éléments est une conséquence négative du chômage pour l'économie ?",
    options: [
      "Augmentation de la production potentielle",
      "Hausse des recettes fiscales pour l'État",
      "Perte de production et de capital humain",
      "Baisse des dépenses d'indemnisation"
    ],
    correctAnswer: 2,
    explanation: "Le chômage entraîne une sous-utilisation des facteurs de production (perte de PIB potentiel) et peut dégrader le capital humain (perte de compétences des chômeurs)."
  },
  {
    id: "q9_chomage_inflation",
    question: "Quel effet l'inflation peut-elle avoir sur le pouvoir d'achat des ménages dont les revenus n'augmentent pas aussi vite que les prix ?",
    options: ["Aucun effet", "Une augmentation du pouvoir d'achat", "Une baisse du pouvoir d'achat", "Une stabilisation du pouvoir d'achat"],
    correctAnswer: 2,
    explanation: "Si les revenus n'augmentent pas au même rythme que les prix, l'inflation entraîne une diminution du pouvoir d'achat, car la même somme d'argent permet d'acheter moins de biens et services."
  },
  {
    id: "q10_chomage_inflation",
    question: "Une politique monétaire restrictive menée par la banque centrale vise généralement à lutter contre :",
    options: ["Le chômage structurel", "La déflation", "L'inflation", "La faible croissance"],
    correctAnswer: 2,
    explanation: "En augmentant les taux d'intérêt, la banque centrale cherche à freiner la demande globale pour limiter les pressions inflationnistes."
  },
  {
    id: "q11_chomage_inflation",
    question: "Le chômage structurel est principalement causé par :",
    options: [
      "Une baisse temporaire de la demande globale",
      "Des facteurs liés à l'organisation et aux mutations de l'économie (inadéquation des qualifications, rigidités...)",
      "Un manque de motivation des chercheurs d'emploi",
      "Des variations saisonnières de l'activité"
    ],
    correctAnswer: 1,
    explanation: "Le chômage structurel est un chômage de long terme lié aux caractéristiques de l'appareil productif, aux qualifications de la main-d'œuvre et au fonctionnement du marché du travail."
  },
  {
    id: "q12_chomage_inflation",
    question: "La stagflation des années 1970 a remis en cause quelle idée concernant la relation chômage-inflation ?",
    options: [
      "L'existence même de l'inflation",
      "L'idée d'un arbitrage simple et stable entre un faible chômage et une faible inflation (courbe de Phillips)",
      "L'efficacité des politiques monétaires",
      "Le rôle du progrès technique dans le chômage"
    ],
    correctAnswer: 1,
    explanation: "La stagflation (coexistence d'un chômage élevé et d'une forte inflation) a montré que la relation de Phillips n'était pas stable et que l'on ne pouvait pas toujours 'acheter' moins de chômage avec plus d'inflation."
  },
  {
    id: "q13_chomage_inflation",
    question: "Comment l'inflation peut-elle affecter la compétitivité-prix d'un pays ?",
    options: [
      "Elle l'améliore toujours",
      "Elle la détériore si l'inflation nationale est plus élevée que chez les partenaires commerciaux",
      "Elle n'a aucun impact sur la compétitivité",
      "Elle la détériore uniquement si les taux de change sont fixes"
    ],
    correctAnswer: 1,
    explanation: "Si les prix des produits nationaux augmentent plus vite que ceux des produits étrangers, les produits nationaux deviennent relativement plus chers, ce qui dégrade la compétitivité-prix à l'exportation et face aux importations."
  },
  {
    id: "q14_chomage_inflation",
    question: "Une politique budgétaire expansive (hausse des dépenses publiques/baisse des impôts) peut être utilisée pour lutter contre quel type de chômage principal ?",
    options: ["Chômage frictionnel", "Chômage structurel", "Chômage volontaire", "Chômage conjoncturel"],
    correctAnswer: 3,
    explanation: "Les politiques budgétaires expansives visent à stimuler la demande globale et sont donc plus adaptées pour lutter contre le chômage conjoncturel, qui est dû à une insuffisance de cette demande."
  },
  {
    id: "q15_chomage_inflation",
    question: "Les anticipations d'inflation jouent un rôle important dans la critique de la courbe de Phillips car :",
    options: [
      "Elles rendent l'inflation toujours nulle",
      "Si les agents anticipent l'inflation, ils ajustent leurs comportements (ex: demandes salariales), ce qui peut neutraliser l'effet d'une politique de relance sur le chômage à long terme",
      "Elles prouvent que le chômage est toujours volontaire",
      "Elles n'affectent que le taux de change"
    ],
    correctAnswer: 1,
    explanation: "Selon Friedman et Phelps, si les agents anticipent correctement l'inflation future, ils réclameront des hausses de salaires qui compenseront cette inflation, empêchant une baisse durable du chômage en dessous de son niveau naturel."
  }
];

export default function ChomageInflationQuizPage() {
  const { getQuizProgress, isLoading } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const quizId = "chomage-inflation";
  const subjectId = "economie";

  useEffect(() => {
    setMounted(true);
    setShuffledQuestions(shuffleArray(quizQuestions));
  }, []);

  const handleQuizComplete = (score: number) => {
    console.log(`Quiz '${quizId}' (${subjectId}) terminé avec un score de ${score}/${quizQuestions.length}`);
  };

  if (!mounted || isLoading || shuffledQuestions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-blue"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/quiz/economie" className="flex items-center text-eco-blue hover:text-eco-dark-blue dark:text-eco-light-blue dark:hover:text-eco-blue mb-4 transition-colors duration-150">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour aux quiz d'Économie
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
          <div className="flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <Users className="mr-2 h-6 w-6 text-eco-blue" /><DollarSign className="mr-3 h-6 w-6 text-eco-blue" />
              Quiz : Chômage et Inflation
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Évaluez votre compréhension des mécanismes du chômage et de l'inflation.
            </p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8">
        <QuizPlayer 
          questions={shuffledQuestions} 
          quizId={quizId}
          subjectId={subjectId}
          onComplete={handleQuizComplete}
        />
      </motion.div>
      
      <div className="mt-8 text-center">
        <Link href="/economie/macroeconomie/chomage-inflation" className="text-sm text-eco-blue hover:underline">
            Revoir le chapitre sur le Chômage et l'Inflation
        </Link>
      </div>
    </div>
  );
} 