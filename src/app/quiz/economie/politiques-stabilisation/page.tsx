"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import QuizPlayer from "@/components/quiz-player";
import { useProgress } from "@/hooks/useProgress";
import { shuffleArray } from "@/lib/utils";

const quizTitle = "Quiz: Les Politiques de Stabilisation";
const chapterSlug = "politiques-stabilisation";
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
    id: "q1_politiques_stabilisation",
    question: "Quel est l'objectif principal des politiques de stabilisation (ou conjoncturelles) ?",
    options: [
      "Favoriser la croissance à long terme par des réformes structurelles",
      "Atténuer les fluctuations économiques à court terme",
      "Uniquement réduire l'inflation",
      "Uniquement réduire le chômage"
    ],
    correctAnswer: 1,
    explanation: "Les politiques de stabilisation visent à lisser les cycles économiques (récessions, surchauffes) à court terme, en agissant sur la demande globale."
  },
  {
    id: "q2_politiques_stabilisation",
    question: "Lequel de ces éléments N'EST PAS un objectif du carré magique de Kaldor ?",
    options: [
      "Plein emploi",
      "Stabilité des prix",
      "Réduction des inégalités de revenus",
      "Équilibre extérieur"
    ],
    correctAnswer: 2,
    explanation: "Le carré magique de Kaldor comprend : plein emploi, stabilité des prix, croissance économique et équilibre extérieur. La réduction des inégalités est un objectif important mais distinct."
  },
  {
    id: "q3_politiques_stabilisation",
    question: "Une politique budgétaire expansive consiste à :",
    options: [
      "Augmenter les impôts et baisser les dépenses publiques",
      "Baisser les taux d'intérêt directeurs",
      "Augmenter les dépenses publiques et/ou baisser les impôts",
      "Vendre des titres sur l'open market"
    ],
    correctAnswer: 2,
    explanation: "Une politique budgétaire expansive vise à stimuler la demande globale par une augmentation des dépenses publiques ou une diminution des prélèvements obligatoires."
  },
  {
    id: "q4_politiques_stabilisation",
    question: "Quel mécanisme décrit l'effet par lequel une dépense publique initiale engendre une augmentation plus que proportionnelle du revenu national ?",
    options: [
      "L'effet d'éviction",
      "Le multiplicateur keynésien",
      "La trappe à liquidité",
      "Le stabilisateur automatique"
    ],
    correctAnswer: 1,
    explanation: "Le multiplicateur keynésien montre qu'une variation initiale des dépenses (publiques ou privées) entraîne une variation amplifiée du revenu national."
  },
  {
    id: "q5_politiques_stabilisation",
    question: "En cas de surchauffe économique avec une forte inflation, quelle politique monétaire la banque centrale devrait-elle appliquer ?",
    options: [
      "Une politique monétaire expansive (baisse des taux)",
      "Une politique monétaire restrictive (hausse des taux)",
      "Une politique de quantitative easing",
      "Ne rien faire"
    ],
    correctAnswer: 1,
    explanation: "Pour lutter contre l'inflation, la banque centrale mène une politique monétaire restrictive en augmentant ses taux d'intérêt directeurs pour freiner la demande de crédit et la demande globale."
  },
  {
    id: "q6_politiques_stabilisation",
    question: "Lequel de ces instruments N'EST PAS un instrument principal de la politique monétaire conventionnelle ?",
    options: [
      "Les taux d'intérêt directeurs",
      "Les opérations d'open market",
      "La modification des taux d'imposition",
      "Les réserves obligatoires"
    ],
    correctAnswer: 2,
    explanation: "La modification des taux d'imposition est un instrument de la politique budgétaire, pas de la politique monétaire."
  },
  {
    id: "q7_politiques_stabilisation",
    question: "Qu'est-ce que la 'trappe à liquidité' ?",
    options: [
      "Une situation où les banques manquent de liquidités",
      "Une situation où, malgré des taux d'intérêt très bas (proches de zéro), la politique monétaire ne parvient plus à stimuler l'économie",
      "Une fuite des capitaux vers l'étranger",
      "Une augmentation excessive de la masse monétaire"
    ],
    correctAnswer: 1,
    explanation: "La trappe à liquidité est une situation où la préférence pour la liquidité est si forte que la politique monétaire devient inefficace car les agents conservent la monnaie au lieu de la dépenser ou l'investir, même à des taux très bas."
  },
  {
    id: "q8_politiques_stabilisation",
    question: "Un exemple de stabilisateur automatique est :",
    options: [
      "Une décision ponctuelle du gouvernement d'augmenter les investissements publics",
      "L'augmentation des indemnités chômage en période de récession",
      "Une baisse des taux d'intérêt par la banque centrale",
      "La mise en place d'une nouvelle taxe"
    ],
    correctAnswer: 1,
    explanation: "Les indemnités chômage augmentent automatiquement lorsque le chômage monte (récession), soutenant le revenu des ménages et donc la demande, sans intervention discrétionnaire."
  },
  {
    id: "q9_politiques_stabilisation",
    question: "L'effet d'éviction (crowding out) se produit lorsque :",
    options: [
      "La politique monétaire expansive réduit l'efficacité de la politique budgétaire",
      "Les importations augmentent suite à une relance, réduisant son impact national",
      "Le financement du déficit public par l'emprunt fait monter les taux d'intérêt et décourage l'investissement privé",
      "Les entreprises n'arrivent pas à embaucher à cause d'un manque de main d'œuvre qualifiée"
    ],
    correctAnswer: 2,
    explanation: "L'effet d'éviction décrit comment une augmentation des dépenses publiques financée par l'emprunt peut entraîner une hausse des taux d'intérêt, ce qui réduit l'investissement privé."
  },
  {
    id: "q10_politiques_stabilisation",
    question: "Dans la zone Euro, la politique monétaire est ____ et les politiques budgétaires sont ____.",
    options: [
      "nationale / unique (BCE)",
      "unique (BCE) / nationales",
      "unique (BCE) / coordonnées par la Commission Européenne uniquement",
      "nationales / coordonnées par le FMI"
    ],
    correctAnswer: 1,
    explanation: "Au sein de la zone Euro, la politique monétaire est unique et gérée par la Banque Centrale Européenne (BCE), tandis que les politiques budgétaires restent de la compétence des États membres, bien qu'encadrées par des règles communes."
  },
  {
    id: "q11_politiques_stabilisation",
    question: "Quelle est la principale critique adressée par Robert Lucas aux politiques conjoncturelles discrétionnaires ?",
    options: [
      "Elles sont toujours trop lentes à agir",
      "Elles favorisent l'inflation au détriment de l'emploi",
      "Les agents économiques rationnels anticipent les effets des politiques et adaptent leur comportement, ce qui peut en réduire l'efficacité",
      "Elles ne tiennent pas compte de l'équilibre extérieur"
    ],
    correctAnswer: 2,
    explanation: "La critique de Lucas (anticipations rationnelles) suggère que si les agents économiques anticipent les actions gouvernementales, l'effet de ces politiques peut être amoindri voire annulé."
  },
  {
    id: "q12_politiques_stabilisation",
    question: "Une politique budgétaire restrictive (rigueur) est généralement mise en œuvre pour :",
    options: [
      "Stimuler une économie en récession",
      "Augmenter l'endettement public pour financer des projets futurs",
      "Lutter contre l'inflation ou réduire un déficit public jugé excessif",
      "Baisser les taux d'intérêt"
    ],
    correctAnswer: 2,
    explanation: "Une politique de rigueur (baisse des dépenses publiques ou hausse des impôts) vise à freiner la demande globale pour contrôler l'inflation ou pour assainir les finances publiques."
  },
  {
    id: "q13_politiques_stabilisation",
    question: "Lequel de ces éléments est considéré comme une limite de la politique monétaire ?",
    options: [
      "Son impact est toujours immédiat et certain",
      "Elle ne peut jamais créer de bulles spéculatives",
      "Les délais de transmission à l'économie réelle peuvent être longs et variables",
      "Elle est très efficace pour lutter contre le chômage structurel"
    ],
    correctAnswer: 2,
    explanation: "L'un des défis de la politique monétaire est que ses effets sur l'économie réelle (production, emploi) ne sont pas instantanés et peuvent prendre plusieurs trimestres à se matérialiser."
  },
  {
    id: "q14_politiques_stabilisation",
    question: "Qu'est-ce que le 'policy-mix' ?",
    options: [
      "Uniquement la politique budgétaire",
      "Uniquement la politique monétaire",
      "La combinaison des politiques budgétaire et monétaire",
      "L'ensemble des politiques structurelles"
    ],
    correctAnswer: 2,
    explanation: "Le policy-mix désigne la manière dont les autorités combinent et coordonnent la politique budgétaire (gouvernement) et la politique monétaire (banque centrale) pour atteindre leurs objectifs économiques."
  },
  {
    id: "q15_politiques_stabilisation",
    question: "En cas de choc d'offre négatif (ex: forte hausse du prix du pétrole), les politiques conjoncturelles de demande sont-elles généralement très efficaces ?",
    options: [
      "Oui, elles résolvent facilement le problème",
      "Non, elles sont moins efficaces car le problème vient de l'offre et elles risquent d'aggraver l'inflation (stagflation)",
      "Oui, mais seulement si la politique monétaire est expansive",
      "Non, car les chocs d'offre n'existent pas"
    ],
    correctAnswer: 1,
    explanation: "Les politiques conjoncturelles agissent principalement sur la demande globale. Face à un choc d'offre (qui affecte les coûts de production et la capacité à produire), elles sont moins adaptées et peuvent même créer un dilemme (ex: stimuler la demande peut aggraver l'inflation due au choc d'offre)."
  }
];

export default function PolitiquesStabilisationQuizPage() {
  const { getQuizProgress, isLoading } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const quizId = "politiques-stabilisation";

  useEffect(() => {
    setMounted(true);
    setShuffledQuestions(shuffleArray(quizQuestions));
  }, []);

  const handleQuizComplete = (score: number) => {
    console.log(`Quiz '${quizId}' (${subject}) terminé avec un score de ${score}/${quizQuestions.length}`);
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
              <ShieldCheck className="mr-3 h-7 w-7 text-eco-blue" />
              {quizTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Évaluez votre compréhension des politiques conjoncturelles et de leurs effets.
            </p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8">
        <QuizPlayer 
          questions={shuffledQuestions} 
          quizId={quizId}
          subjectId={subject}
          onComplete={handleQuizComplete}
        />
      </motion.div>
      
      <div className="mt-8 text-center">
        <Link href="/economie/macroeconomie/politiques-stabilisation" className="text-sm text-eco-blue hover:underline">
            Revoir le chapitre sur les Politiques de Stabilisation
        </Link>
      </div>
    </div>
  );
} 