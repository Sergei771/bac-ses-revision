"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { shuffleArray } from "@/lib/utils";
import QuizPlayer from "@/components/quiz-player";
import { QuizQuestion } from "@/hooks/useContent";
import Link from "next/link";
import { ArrowLeft, Briefcase } from "lucide-react"; // Icône Briefcase pour les FMN
import { useProgress } from "@/hooks/useProgress";

const quizPageTitleText = "Quiz: Les Firmes Multinationales (FMN)";
const chapterSlug = "firmes-multinationales";
const chapterPath = "/economie/mondialisation/firmes-multinationales";
const subjectId = "economie";
const quizTitle = quizPageTitleText;
const subject = subjectId;
const accentColor = "eco-blue";

const questionsRaw: QuizQuestion[] = [
  {
    id: "fmn_q1",
    question: "Qu'est-ce qui définit principalement une Firme Multinationale (FMN) ?",
    options: [
      "Elle exporte dans plusieurs pays.",
      "Elle possède au moins une unité de production (filiale) à l'étranger.",
      "Son chiffre d'affaires dépasse un milliard d'euros.",
      "Elle est cotée sur plusieurs places boursières internationales."
    ],
    correctAnswer: 1,
    explanation: "La caractéristique essentielle d'une FMN est la possession ou le contrôle d'unités de production dans au moins un pays étranger, en plus de son pays d'origine."
  },
  {
    id: "fmn_q2",
    question: "Lequel de ces éléments est le principal mode d'expansion internationale des FMN ?",
    options: [
      "Les accords de franchise.",
      "Les exportations indirectes via des agents commerciaux.",
      "Les Investissements Directs à l'Étranger (IDE).",
      "Les alliances stratégiques sans prise de participation."
    ],
    correctAnswer: 2,
    explanation: "Les IDE, qu'ils soient de type 'greenfield' (création) ou 'brownfield' (acquisition), sont le moyen privilégié par les FMN pour établir une présence productive à l'étranger."
  },
  {
    id: "fmn_q3",
    question: "La Division Internationale du Processus Productif (DIPP) consiste pour une FMN à :",
    options: [
      "Vendre le même produit standardisé dans tous les pays.",
      "Segmenter les étapes de production et les localiser dans différents pays en fonction des avantages comparatifs.",
      "Se concentrer uniquement sur la production dans son pays d'origine et exporter massivement.",
      "Racheter toutes les entreprises concurrentes sur un marché étranger."
    ],
    correctAnswer: 1,
    explanation: "La DIPP est une stratégie où les FMN optimisent leur chaîne de valeur en répartissant les différentes phases du processus productif (conception, fabrication de composants, assemblage, marketing) dans les pays offrant les meilleures conditions pour chaque étape."
  },
  {
    id: "fmn_q4",
    question: "Une stratégie de localisation motivée par l'accès à un grand marché de consommateurs relève d'une logique :",
    options: [
      "De rationalisation des coûts de production.",
      "D'approvisionnement en matières premières.",
      "De demande (ou de marché).",
      "De recherche et développement technologique."
    ],
    correctAnswer: 2,
    explanation: "S'implanter pour vendre sur un marché local ou régional important est une stratégie de demande, visant à se rapprocher des clients et à contourner d'éventuelles barrières à l'importation."
  },
  {
    id: "fmn_q5",
    question: "Que sont les prix de transfert ?",
    options: [
      "Les prix de vente finaux des produits des FMN aux consommateurs.",
      "Les taxes que les FMN paient sur leurs bénéfices transférés à l'étranger.",
      "Les prix des biens et services échangés entre les différentes filiales d'une même FMN.",
      "Les coûts de transport des marchandises entre pays."
    ],
    correctAnswer: 2,
    explanation: "Les prix de transfert sont les prix internes pratiqués pour les transactions entre entités d'un même groupe multinational. Ils peuvent être manipulés pour localiser les bénéfices dans des juridictions à faible fiscalité."
  },
  {
    id: "fmn_q6",
    question: "Lequel de ces éléments est un avantage potentiel de la présence de FMN pour un pays d'accueil ?",
    options: [
      "Une augmentation garantie de l'autonomie technologique nationale.",
      "La disparition de toutes les entreprises locales concurrentes.",
      "Des transferts de technologie et la création d'emplois qualifiés.",
      "Une réduction systématique des inégalités de revenus."
    ],
    correctAnswer: 2,
    explanation: "Les FMN peuvent apporter des technologies, des compétences managériales et créer des emplois, stimulant ainsi l'économie du pays d'accueil, bien que ces effets ne soient pas automatiques et puissent avoir des contreparties."
  },
  {
    id: "fmn_q7",
    question: "Un 'IDE greenfield' fait référence à :",
    options: [
      "Un investissement dans le secteur agricole durable.",
      "Le rachat d'une entreprise étrangère existante.",
      "La création d'une toute nouvelle unité de production à l'étranger.",
      "Un investissement spéculatif à court terme sur les marchés verts."
    ],
    correctAnswer: 2,
    explanation: "Un IDE 'greenfield' (terrain vierge) est la création d'une nouvelle implantation (usine, bureau) à l'étranger, par opposition à un IDE 'brownfield' qui est l'acquisition d'une structure existante."
  },
  {
    id: "fmn_q8",
    question: "Lequel de ces arguments est souvent avancé comme un impact négatif des FMN sur les pays d'origine ?",
    options: [
      "L'augmentation des exportations de biens à forte valeur ajoutée.",
      "Le rapatriement de tous les bénéfices réalisés à l'étranger.",
      "Les délocalisations d'activités et les pertes d'emplois.",
      "Le renforcement de la recherche et développement nationale."
    ],
    correctAnswer: 2,
    explanation: "La délocalisation d'unités de production ou de services par les FMN vers des pays à moindres coûts peut entraîner des pertes d'emplois et une désindustrialisation dans le pays d'origine."
  },
  {
    id: "fmn_q9",
    question: "La Responsabilité Sociale des Entreprises (RSE) pour une FMN implique notamment de :",
    options: [
      "Maximiser les profits à court terme pour ses actionnaires, quel qu'en soit le coût social.",
      "Payer le minimum d'impôts possible en utilisant toutes les niches fiscales.",
      "Prendre en compte les impacts sociaux et environnementaux de ses activités dans tous les pays où elle opère.",
      "Se conformer uniquement aux lois du pays où son siège social est établi."
    ],
    correctAnswer: 2,
    explanation: "La RSE incite les FMN à intégrer volontairement les préoccupations sociales (conditions de travail, droits humains) et environnementales dans leurs activités commerciales et leurs relations avec les parties prenantes."
  },
  {
    id: "fmn_q10",
    question: "L'attractivité d'un territoire pour les IDE des FMN dépend de facteurs tels que :",
    options: [
      "Uniquement le niveau des salaires.",
      "Uniquement la taille du marché intérieur.",
      "La stabilité politique, la qualité des infrastructures, le niveau de qualification de la main-d'œuvre et la fiscalité.",
      "L'absence totale de réglementation environnementale."
    ],
    correctAnswer: 2,
    explanation: "L'attractivité d'un territoire est multidimensionnelle, incluant des aspects économiques, politiques, sociaux, et infrastructurels qui influencent la décision d'investissement d'une FMN."
  },
  {
    id: "fmn_q11",
    question: "L'optimisation fiscale agressive par les FMN peut entraîner pour les États :",
    options: [
      "Une augmentation des recettes fiscales grâce aux investissements attirés.",
      "Une concurrence fiscale accrue entre les pays, tirant les taux d'imposition vers le bas ('course au moins-disant fiscal').",
      "Une simplification des systèmes fiscaux nationaux.",
      "Une plus grande transparence sur les bénéfices réels des entreprises."
    ],
    correctAnswer: 1,
    explanation: "Les stratégies d'optimisation fiscale des FMN, bien que souvent légales, peuvent réduire considérablement les recettes fiscales des États et engendrer une concurrence fiscale dommageable entre eux."
  },
  {
    id: "fmn_q12",
    question: "Une FMN qui délocalise sa production dans un pays à bas salaires pour réexporter ensuite vers son marché d'origine adopte une stratégie de :",
    options: [
      "Conquête de marché local.",
      "Rationalisation des coûts de production (plateforme d'exportation).",
      "Accès à des ressources naturelles spécifiques.",
      "Recherche et développement externalisée."
    ],
    correctAnswer: 1,
    explanation: "Cette stratégie vise à minimiser les coûts de production en profitant d'avantages comparatifs (bas salaires) pour ensuite servir d'autres marchés, y compris le marché d'origine."
  },
  {
    id: "fmn_q13",
    question: "Lequel de ces organismes internationaux joue un rôle dans la tentative de régulation des aspects fiscaux des FMN (comme le projet BEPS) ?",
    options: [
      "L'Organisation Mondiale du Commerce (OMC)",
      "Le Fonds Monétaire International (FMI)",
      "L'Organisation de Coopération et de Développement Économiques (OCDE)",
      "La Banque Mondiale"
    ],
    correctAnswer: 2,
    explanation: "L'OCDE, en collaboration avec le G20, a initié le projet BEPS (Base Erosion and Profit Shifting) pour lutter contre l'érosion de la base d'imposition et le transfert de bénéfices par les FMN."
  },
  {
    id: "fmn_q14",
    question: "Un effet négatif potentiel des FMN sur l'environnement dans les pays d'accueil peut être lié à :",
    options: [
      "L'introduction systématique de technologies plus propres.",
      "Des normes environnementales locales moins strictes ou un faible contrôle de leur application.",
      "L'obligation pour les FMN de financer des projets de conservation.",
      "Une réduction de la consommation d'énergie grâce à une meilleure efficacité."
    ],
    correctAnswer: 1,
    explanation: "Certaines FMN peuvent être tentées de localiser leurs activités les plus polluantes dans des pays où la réglementation environnementale est moins contraignante ou moins appliquée, conduisant à des impacts négatifs."
  },
  {
    id: "fmn_q15",
    question: "Parmi les stratégies des FMN, la recherche de 'l'effet de taille' ou 'd'économies d'échelle' consiste à :",
    options: [
      "S'implanter dans de très nombreux petits pays.",
      "Produire en très grande quantité pour réduire les coûts unitaires.",
      "Adapter chaque produit aux spécificités de chaque marché local.",
      "Se concentrer sur des marchés de niche à forte valeur ajoutée."
    ],
    correctAnswer: 1,
    explanation: "Les économies d'échelle sont réalisées lorsque le coût moyen de production diminue avec l'augmentation des quantités produites. Les FMN peuvent chercher à atteindre une taille critique pour en bénéficier."
  }
];

export default function FirmesMultinationalesQuizPage() {
  const { isLoading } = useProgress(); 
  const [mounted, setMounted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setMounted(true);
    setShuffledQuestions(shuffleArray(questionsRaw)); 
  }, []);

  const handleQuizComplete = (score: number) => {
    console.log(`Quiz '${chapterSlug}' (${subjectId}) terminé avec un score de ${score}/${questionsRaw.length}`);
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
              <Briefcase className="mr-3 h-7 w-7 sm:h-8 sm:w-8 text-eco-blue" /> 
              {quizPageTitleText}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Évaluez votre compréhension du rôle, des stratégies et des impacts des firmes multinationales.
            </p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8"
      >
        <QuizPlayer 
          questions={shuffledQuestions} 
          quizId={chapterSlug}
          subjectId={subjectId}
          onComplete={handleQuizComplete} 
        />
      </motion.div>
      
      <div className="mt-8 text-center">
        <Link 
            href={chapterPath} 
            className="text-sm text-eco-blue hover:underline"
        >
            Revoir le chapitre : {quizPageTitleText.replace("Quiz: ", "")}
        </Link>
      </div>
    </div>
  );
} 