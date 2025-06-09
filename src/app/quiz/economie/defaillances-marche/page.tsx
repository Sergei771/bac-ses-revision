"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle } from "lucide-react"; // Icon changed to AlertTriangle
import Link from "next/link";
import QuizPlayer from "@/components/quiz-player";
import { useProgress } from "@/hooks/useProgress";
import { shuffleArray } from "@/lib/utils"; // Import shuffleArray

const quizTitle = "Quiz: Les Défaillances du Marché"; // Added for consistency
const chapterSlug = "defaillances-marche"; // Added for consistency
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

// Questions du quiz sur les défaillances du marché
const quizQuestions: QuizQuestion[] = [
  {
    id: "dm_q1",
    question: "Qu'est-ce qu'une externalité ?",
    options: [
      "Un coût ou un bénéfice imposé à un tiers qui n'est pas directement impliqué dans une transaction économique.",
      "Un bien que tout le monde peut consommer sans payer.",
      "Une situation où une entreprise domine le marché.",
      "L'incapacité du marché à atteindre une allocation efficace des ressources due à l'intervention de l'État."
    ],
    correctAnswer: 0,
    explanation: "Une externalité se produit lorsque l'action d'un agent économique (producteur ou consommateur) a un impact (positif ou négatif) sur le bien-être d'un autre agent sans que cet impact soit compensé monétairement."
  },
  {
    id: "dm_q2",
    question: "La pollution émise par une usine qui affecte la santé des riverains est un exemple de :",
    options: [
      "Externalité positive de production",
      "Externalité négative de consommation",
      "Externalité négative de production",
      "Bien public impur"
    ],
    correctAnswer: 2,
    explanation: "Il s'agit d'une externalité négative de production car l'activité de production de l'usine impose un coût (la dégradation de la santé) à des tiers (les riverains) sans compensation."
  },
  {
    id: "dm_q3",
    question: "Laquelle de ces caractéristiques définit un bien public pur ?",
    options: [
      "Rivalité et exclusion",
      "Non-rivalité et non-exclusion",
      "Rivalité et non-exclusion",
      "Non-rivalité et exclusion"
    ],
    correctAnswer: 1,
    explanation: "Un bien public pur est caractérisé par la non-rivalité (la consommation par une personne n'empêche pas la consommation par une autre) et la non-exclusion (il est impossible ou trop coûteux d'empêcher quelqu'un de le consommer)."
  },
  {
    id: "dm_q4",
    question: "L'éclairage public est souvent cité comme un exemple de bien public. Pourquoi le marché privé a-t-il tendance à sous-produire ce type de bien ?",
    options: [
      "À cause du coût élevé de production.",
      "En raison du problème du passager clandestin (free rider).",
      "Parce que seules les entreprises publiques peuvent le produire.",
      "Car la demande pour ce type de bien est très faible."
    ],
    correctAnswer: 1,
    explanation: "Le problème du passager clandestin se pose car les individus peuvent bénéficier du bien sans payer, ce qui décourage la production privée. Chacun attend que les autres paient."
  },
  {
    id: "dm_q5",
    question: "Qu'est-ce que l'asymétrie d'information ?",
    options: [
      "Une situation où tous les agents économiques disposent de la même information.",
      "Une information qui est fausse ou trompeuse.",
      "Une situation où une partie à une transaction dispose de plus ou de meilleure information que l'autre.",
      "Le coût lié à la recherche d'information."
    ],
    correctAnswer: 2,
    explanation: "L'asymétrie d'information survient lorsque, dans une relation contractuelle ou une transaction, l'un des agents économiques détient une information pertinente que l'autre n'a pas."
  },
  {
    id: "dm_q6",
    question: "Le problème de la 'sélection adverse' (ou anti-sélection) est une conséquence de l'asymétrie d'information qui se manifeste typiquement :",
    options: [
      "Après la signature d'un contrat.",
      "Avant la signature d'un contrat.",
      "Uniquement sur les marchés financiers.",
      "Lorsque l'État intervient pour réguler un marché."
    ],
    correctAnswer: 1,
    explanation: "La sélection adverse se produit avant la transaction, lorsque l'asymétrie d'information conduit à ce que les 'mauvais' produits ou contractants chassent les 'bons' du marché (ex: marché des voitures d'occasion)."
  },
  {
    id: "dm_q7",
    question: "L'aléa moral (ou risque moral) se produit lorsque :",
    options: [
      "Une partie change son comportement après la conclusion d'un contrat, d'une manière préjudiciable à l'autre partie.",
      "Les entreprises d'un oligopole s'entendent secrètement sur les prix.",
      "Un consommateur achète un produit défectueux sans le savoir.",
      "L'information est parfaitement symétrique mais coûteuse."
    ],
    correctAnswer: 0,
    explanation: "L'aléa moral survient après la contractualisation, quand une partie, se sentant moins observée ou protégée, adopte un comportement plus risqué ou moins diligent au détriment de l'autre (ex: un assuré prend plus de risques)."
  },
  {
    id: "dm_q8",
    question: "Laquelle de ces mesures N'EST PAS une solution typique pour corriger les externalités négatives ?",
    options: [
      "L'instauration de taxes (taxe pigouvienne).",
      "La mise en place de subventions à la production.",
      "La réglementation (normes d'émission, interdictions).",
      "La création de marchés de droits à polluer."
    ],
    correctAnswer: 1,
    explanation: "Les subventions à la production sont généralement utilisées pour encourager les externalités positives, pas pour corriger les externalités négatives. Une taxe vise à faire internaliser le coût social par le pollueur."
  },
  {
    id: "dm_q9",
    question: "Les ressources communes (ou biens communs) sont caractérisées par :",
    options: [
      "Non-rivalité et non-exclusion",
      "Rivalité et exclusion",
      "Non-rivalité et exclusion",
      "Rivalité et non-exclusion"
    ],
    correctAnswer: 3,
    explanation: "Les biens communs sont rivaux (la consommation par l'un diminue la quantité disponible pour les autres) mais non-excluables (difficile d'empêcher l'accès). Ex: les bancs de poissons en haute mer."
  },
  {
    id: "dm_q10",
    question: "La 'tragédie des biens communs' décrit une situation où :",
    options: [
      "Les biens communs sont sous-utilisés.",
      "Les individus, agissant dans leur propre intérêt, surexploitent une ressource commune, menant à son épuisement.",
      "L'État nationalise tous les biens communs.",
      "Les biens communs sont transformés en biens privés grâce à des droits de propriété clairs."
    ],
    correctAnswer: 1,
    explanation: "La tragédie des biens communs illustre comment la poursuite de l'intérêt individuel peut conduire à la dégradation ou à l'épuisement d'une ressource partagée accessible à tous."
  },
  {
    id: "dm_q11",
    question: "Comment le théorème de Coase suggère-t-il de résoudre certains problèmes d'externalités ?",
    options: [
      "Par l'intervention systématique de l'État pour taxer les pollueurs.",
      "En interdisant les activités générant des externalités.",
      "En attribuant des droits de propriété clairs et en laissant les parties négocier, si les coûts de transaction sont faibles.",
      "En subventionnant massivement les victimes des externalités."
    ],
    correctAnswer: 2,
    explanation: "Le théorème de Coase stipule que si les droits de propriété sont bien définis et que les coûts de transaction sont nuls ou faibles, les agents économiques peuvent négocier entre eux pour atteindre une solution efficace au problème d'externalité, quelle que soit l'attribution initiale des droits."
  },
  {
    id: "dm_q12",
    question: "Sur un marché avec sélection adverse, comme celui des voitures d'occasion (lemons problem), que peut-on observer ?",
    options: [
      "Seules les voitures de bonne qualité sont vendues.",
      "Les acheteurs sont prêts à payer un prix très élevé car ils font confiance aux vendeurs.",
      "Les vendeurs de voitures de bonne qualité peuvent être chassés du marché car les acheteurs, ne pouvant distinguer la qualité, offrent un prix moyen bas.",
      "Le prix des voitures d'occasion est toujours égal à celui des voitures neuves."
    ],
    correctAnswer: 2,
    explanation: "Dans le 'lemons problem' d'Akerlof, l'asymétrie d'information sur la qualité des voitures conduit les acheteurs à offrir un prix moyen, ce qui incite les vendeurs de bonnes voitures à se retirer du marché, ne laissant que les 'citrons' (mauvaises voitures)."
  },
  {
    id: "dm_q13",
    question: "Laquelle de ces institutions vise principalement à réduire l'asymétrie d'information et à protéger les consommateurs ?",
    options: [
      "L'autorité de la concurrence",
      "Les agences de notation de crédit",
      "Les labels de qualité et les certifications",
      "La banque centrale"
    ],
    correctAnswer: 2,
    explanation: "Les labels de qualité, les certifications, les garanties, ou encore les avis clients sont des mécanismes qui visent à fournir plus d'information aux acheteurs et à réduire l'asymétrie d'information."
  },
  {
    id: "dm_q14",
    question: "L'existence de défaillances de marché justifie souvent :",
    options: [
      "La suppression totale des marchés.",
      "L'intervention de l'État pour corriger ces défaillances et améliorer l'efficacité ou l'équité.",
      "Une confiance aveugle dans la capacité du marché à s'auto-réguler.",
      "La privatisation de tous les services publics."
    ],
    correctAnswer: 1,
    explanation: "Les défaillances de marché (externalités, biens publics, asymétries d'information, etc.) sont des situations où le marché seul ne parvient pas à une allocation optimale des ressources. L'intervention de l'État peut alors être justifiée pour améliorer le fonctionnement du marché ou atteindre des objectifs sociaux."
  },
  {
    id: "dm_q15",
    question: "La vaccination est un exemple d'activité générant une externalité positive. Pourquoi ?",
    options: [
      "Parce qu'elle est coûteuse pour l'individu.",
      "Parce qu'en se vaccinant, un individu protège non seulement lui-même mais réduit aussi le risque de transmission à d'autres personnes.",
      "Parce qu'elle est obligatoire dans la plupart des pays.",
      "Parce qu'elle est produite uniquement par des entreprises pharmaceutiques privées."
    ],
    correctAnswer: 1,
    explanation: "La vaccination génère une externalité positive car le bénéfice pour la collectivité (réduction de la propagation des maladies) est supérieur au bénéfice privé de l'individu vacciné. Le marché tend donc à en sous-produire."
  }
];

export default function DefaillancesMarcheQuizPage() {
  const { getQuizProgress, isLoading } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]); // State for shuffled questions
  const quizId = "defaillances-marche";

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

  // const quizProgress = getQuizProgress(subjectId, quizId); // Removed as QuizPlayer handles this internally if needed

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
              <AlertTriangle className="mr-3 h-7 w-7 sm:h-8 sm:w-8 text-eco-blue" /> {/* Icon updated */}
              {quizTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Testez vos connaissances sur les externalités, les biens publics, l'asymétrie d'information et le rôle de l'État.
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
            href="/economie/microeconomie/defaillances-marche" 
            className="text-sm text-eco-blue hover:underline"
        >
            Revoir le chapitre sur {quizTitle}
        </Link>
      </div>
    </div>
  );
} 