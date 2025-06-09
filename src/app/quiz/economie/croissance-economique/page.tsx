"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, LineChart } from "lucide-react";
import Link from "next/link";
import QuizPlayer from "@/components/quiz-player";
import { useProgress } from "@/hooks/useProgress";
import { shuffleArray } from "@/lib/utils";

const quizTitle = "Quiz: La Croissance Économique";
const chapterSlug = "croissance-economique";
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

// Questions du quiz sur la croissance économique
const quizQuestions: QuizQuestion[] = [
  {
    id: "q1_croissance",
    question: "Comment définit-on principalement la croissance économique ?",
    options: [
      "Une augmentation du bien-être de la population",
      "Une augmentation soutenue de la production de biens et services",
      "Une diminution du taux de chômage",
      "Une augmentation des exportations"
    ],
    correctAnswer: 1,
    explanation: "La croissance économique est définie comme l'augmentation soutenue de la production de biens et services sur une longue période, généralement mesurée par le PIB réel."
  },
  {
    id: "q2_croissance",
    question: "Quel est l'indicateur le plus couramment utilisé pour mesurer la croissance économique ?",
    options: [
      "L'Indice de Développement Humain (IDH)",
      "Le Produit National Brut (PNB)",
      "Le Produit Intérieur Brut (PIB)",
      "Le taux d'inflation"
    ],
    correctAnswer: 2,
    explanation: "Le Produit Intérieur Brut (PIB) est l'agrégat le plus utilisé pour mesurer la production et donc la croissance économique d'un pays."
  },
  {
    id: "q3_croissance",
    question: "Quelle est la différence entre le PIB nominal et le PIB réel ?",
    options: [
      "Le PIB nominal inclut les importations, le PIB réel les exclut",
      "Le PIB réel est corrigé de l'inflation, pas le PIB nominal",
      "Le PIB nominal mesure la production nationale, le PIB réel la production étrangère",
      "Il n'y a pas de différence significative"
    ],
    correctAnswer: 1,
    explanation: "Le PIB nominal est calculé avec les prix de l'année courante, tandis que le PIB réel est calculé avec les prix d'une année de base (prix constants) pour éliminer l'effet de l'inflation."
  },
  {
    id: "q4_croissance",
    question: "Laquelle de ces affirmations est une limite du PIB en tant qu'indicateur de bien-être ?",
    options: [
      "Il est trop difficile à calculer",
      "Il ne tient pas compte de la production non marchande (ex: travail domestique)",
      "Il surestime toujours le niveau de vie réel",
      "Il n'est pertinent que pour les pays développés"
    ],
    correctAnswer: 1,
    explanation: "Le PIB ne comptabilise pas les activités productives non rémunérées comme le travail domestique ou le bénévolat, ce qui sous-estime la production réelle de richesses et le bien-être."
  },
  {
    id: "q5_croissance",
    question: "Qu'est-ce que la Productivité Globale des Facteurs (PGF) ?",
    options: [
      "La productivité moyenne du facteur travail",
      "L'augmentation de la quantité de capital par travailleur",
      "La part de la croissance non expliquée par l'augmentation de la quantité des facteurs de production",
      "Le total des investissements réalisés dans l'économie"
    ],
    correctAnswer: 2,
    explanation: "La PGF mesure l'efficacité de la combinaison des facteurs travail et capital. Elle est souvent assimilée au progrès technique."
  },
  {
    id: "q6_croissance",
    question: "Une croissance basée principalement sur l'augmentation de la quantité de travail et de capital est dite :",
    options: [
      "Intensive",
      "Extensive",
      "Soutenable",
      "Endogène"
    ],
    correctAnswer: 1,
    explanation: "La croissance extensive repose sur l'accumulation des facteurs de production (plus de travail, plus de capital), tandis que la croissance intensive repose sur l'amélioration de leur efficacité (PGF)."
  },
  {
    id: "q7_croissance",
    question: "Selon le modèle de croissance de Solow, qu'est-ce qui permet une croissance continue du revenu par tête à long terme ?",
    options: [
      "L'accumulation continue de capital",
      "L'augmentation de la population",
      "Le progrès technique exogène",
      "Les politiques fiscales de l'État"
    ],
    correctAnswer: 2,
    explanation: "Dans le modèle de Solow, en raison des rendements décroissants du capital, seul le progrès technique (considéré comme exogène) peut expliquer une croissance soutenue du niveau de vie par habitant."
  },
  {
    id: "q8_croissance",
    question: "Quelle est la principale caractéristique des théories de la croissance endogène ?",
    options: [
      "Elles supposent que la croissance est toujours nulle à long terme",
      "Elles considèrent le progrès technique comme une variable expliquée par des facteurs économiques",
      "Elles se concentrent uniquement sur les pays en développement",
      "Elles nient le rôle de l'investissement dans la croissance"
    ],
    correctAnswer: 1,
    explanation: "Les théories de la croissance endogène cherchent à expliquer l'origine du progrès technique en l'intégrant comme une variable déterminée par des facteurs tels que le capital humain, la R&D ou les dépenses publiques."
  },
  {
    id: "q9_croissance",
    question: "Lequel de ces éléments est considéré comme un moteur de la croissance endogène ?",
    options: [
      "L'augmentation de la consommation des ménages",
      "La découverte de nouvelles ressources naturelles",
      "L'investissement en Recherche et Développement (R&D)",
      "La baisse des taux d'intérêt"
    ],
    correctAnswer: 2,
    explanation: "L'investissement en R&D, en capital humain et en infrastructures publiques sont des exemples de facteurs qui peuvent générer un progrès technique endogène et une croissance auto-entretenue."
  },
  {
    id: "q10_croissance",
    question: "Qu'est-ce qu'une récession économique ?",
    options: [
      "Une période de forte inflation",
      "Une phase d'expansion rapide de la production",
      "Une période de croissance faible ou négative du PIB (souvent définie par au moins deux trimestres consécutifs de baisse)",
      "Un excédent de la balance commerciale"
    ],
    correctAnswer: 2,
    explanation: "Une récession est une phase du cycle économique caractérisée par une baisse de l'activité économique, mesurée par une croissance négative du PIB pendant au moins deux trimestres consécutifs."
  },
  {
    id: "q11_croissance",
    question: "Laquelle de ces situations illustre un coût environnemental de la croissance économique ?",
    options: [
      "L'augmentation des salaires réels",
      "La réduction des inégalités de revenus",
      "L'épuisement des ressources naturelles non renouvelables",
      "L'amélioration des infrastructures de transport"
    ],
    correctAnswer: 2,
    explanation: "La croissance économique peut entraîner des coûts environnementaux importants, tels que l'épuisement des ressources naturelles, la pollution, et le changement climatique."
  },
  {
    id: "q12_croissance",
    question: "Que signifie le concept de \"développement durable\" ?",
    options: [
      "Une croissance économique la plus rapide possible",
      "Un développement qui répond aux besoins du présent sans compromettre la capacité des générations futures à répondre aux leurs",
      "Un développement centré uniquement sur la protection de l'environnement",
      "Un développement qui favorise les exportations au détriment des importations"
    ],
    correctAnswer: 1,
    explanation: "Le développement durable intègre trois dimensions : économique, sociale et environnementale, dans une perspective de long terme et d'équité intergénérationnelle."
  },
  {
    id: "q13_croissance",
    question: "Quelle optique de calcul du PIB correspond à la somme : Consommation + Investissement + Dépenses publiques + (Exportations - Importations) ?",
    options: [
      "Optique production",
      "Optique revenus",
      "Optique demande",
      "Optique valeur ajoutée"
    ],
    correctAnswer: 2,
    explanation: "Cette formule correspond à l'approche du PIB par la demande globale, c'est-à-dire la somme des emplois finaux des biens et services dans l'économie."
  },
  {
    id: "q14_croissance",
    question: "L'investissement en capital humain fait référence à :",
    options: [
      "L'achat de nouvelles machines plus performantes",
      "Les dépenses en éducation et formation de la main-d'œuvre",
      "La construction d'infrastructures publiques",
      "L'augmentation du nombre de travailleurs"
    ],
    correctAnswer: 1,
    explanation: "Le capital humain représente l'ensemble des connaissances, compétences et qualifications des individus, qui peuvent être améliorées par l'éducation et la formation, contribuant ainsi à la productivité."
  },
  {
    id: "q15_croissance",
    question: "La \"soutenabilité forte\" en matière de développement durable implique que :",
    options: [
      "Le capital naturel peut toujours être remplacé par d'autres formes de capital",
      "Il existe des seuils critiques pour le capital naturel qui ne doivent pas être dépassés",
      "La croissance économique est toujours compatible avec la protection de l'environnement",
      "Seules les entreprises sont responsables de la protection de l'environnement"
    ],
    correctAnswer: 1,
    explanation: "La soutenabilité forte considère que le capital naturel est essentiel et non (ou difficilement) substituable par le capital artificiel. Sa préservation est donc une priorité."
  }
];

export default function CroissanceEconomiqueQuizPage() {
  const { getQuizProgress, isLoading } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const quizId = "croissance-economique";
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
              <TrendingUp className="mr-3 h-7 w-7 sm:h-8 sm:w-8 text-eco-blue" />
              Quiz : La croissance économique
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Testez votre compréhension des concepts clés de la croissance économique, sa mesure, ses sources et ses implications.
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
          questions={shuffledQuestions} 
          quizId={quizId}
          subjectId={subjectId}
          onComplete={handleQuizComplete}
        />
      </motion.div>
      
      <div className="mt-8 text-center">
        <Link 
            href="/economie/macroeconomie/croissance-economique" 
            className="text-sm text-eco-blue hover:underline"
        >
            Revoir le chapitre sur La croissance économique
        </Link>
      </div>
    </div>
  );
}
