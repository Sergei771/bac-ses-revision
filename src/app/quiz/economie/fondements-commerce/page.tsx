"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { shuffleArray } from "@/lib/utils";
// import QuizPlayer, { QuizQuestion } from "@/components/quiz-player"; // Ancienne importation incorrecte
import QuizPlayer from "@/components/quiz-player"; // Importer QuizPlayer par défaut
import { QuizQuestion } from "@/hooks/useContent"; // Importer QuizQuestion depuis useContent 
import Link from "next/link";
import { ArrowLeft, BookOpen, TrendingUp, Globe } from "lucide-react";
import { useProgress } from "@/hooks/useProgress"; // Ajout de useProgress

const quizPageTitleText = "Quiz: Les fondements du commerce international";
const chapterSlug = "fondements-commerce";
const chapterPath = "/economie/mondialisation/fondements-commerce";
const subjectId = "economie";
const quizTitle = quizPageTitleText;
const subject = subjectId;
const accentColor = "eco-blue";

const questionsRaw: QuizQuestion[] = [
  {
    id: "q1",
    question: "Quelle théorie suggère qu'un pays doit se spécialiser là où il est le plus efficace en termes absolus ?",
    options: [
      "Théorie de l'avantage comparatif",
      "Théorie de l'avantage absolu",
      "Modèle HOS",
      "Nouvelle théorie du commerce"
    ],
    correctAnswer: 1,
    explanation: "La théorie de l'avantage absolu, développée par Adam Smith, stipule qu'un pays gagne à se spécialiser dans la production où il est le plus productif par rapport aux autres."
  },
  {
    id: "q2",
    question: "David Ricardo est principalement associé à quelle théorie du commerce international ?",
    options: [
      "Dotations factorielles",
      "Commerce intra-branche",
      "Avantage comparatif",
      "Protectionnisme éducateur"
    ],
    correctAnswer: 2,
    explanation: "David Ricardo a développé la théorie de l'avantage comparatif, qui montre que l'échange est bénéfique même si un pays n'a pas d'avantage absolu."
  },
  {
    id: "q3",
    question: "Le modèle Heckscher-Ohlin-Samuelson (HOS) base la spécialisation sur :",
    options: [
      "Les différences technologiques",
      "Les dotations en facteurs de production",
      "Les économies d'échelle",
      "La demande des consommateurs"
    ],
    correctAnswer: 1,
    explanation: "Le modèle HOS explique le commerce par les différences de dotations relatives en facteurs de production (travail, capital) entre les pays."
  },
  {
    id: "q4",
    question: "Qu'est-ce que le commerce intra-branche ?",
    options: [
      "L'échange de biens totalement différents entre pays",
      "L'échange de services uniquement",
      "L'échange de produits similaires appartenant à la même branche d'activité",
      "Le commerce entre filiales d'une même entreprise"
    ],
    correctAnswer: 2,
    explanation: "Le commerce intra-branche concerne les échanges de produits différenciés mais relevant de la même catégorie ou branche industrielle (ex: voitures contre voitures)."
  },
  {
    id: "q5",
    question: "Lequel de ces éléments N'EST PAS une explication du commerce intra-branche ?",
    options: [
      "La différenciation des produits",
      "Les économies d'échelle",
      "Les avantages comparatifs ricardiens purs",
      "Le goût pour la variété des consommateurs"
    ],
    correctAnswer: 2,
    explanation: "Les avantages comparatifs ricardiens expliquent le commerce inter-branche (biens différents), tandis que le commerce intra-branche repose sur la différenciation et les économies d'échelle."
  },
  {
    id: "q6",
    question: "Le protectionnisme vise à :",
    options: [
      "Promouvoir la libre circulation des biens et services",
      "Protéger les producteurs nationaux de la concurrence étrangère",
      "Augmenter les importations",
      "Supprimer toutes les barrières douanières"
    ],
    correctAnswer: 1,
    explanation: "Le protectionnisme regroupe les mesures visant à limiter les importations pour favoriser les entreprises nationales."
  },
  {
    id: "q7",
    question: "Un droit de douane est :",
    options: [
      "Une subvention à l'exportation",
      "Une taxe sur les produits importés",
      "Une limite quantitative sur les importations (quota)",
      "Une norme technique rendant l'importation difficile"
    ],
    correctAnswer: 1,
    explanation: "Un droit de douane est un impôt prélevé sur les marchandises importées, augmentant leur prix sur le marché domestique."
  },
  {
    id: "q8",
    question: "Selon la théorie de l'avantage comparatif, un pays doit exporter les biens :",
    options: [
      "Pour lesquels il a un coût de production absolument plus bas",
      "Pour lesquels son coût d'opportunité de production est plus faible",
      "Qu'il ne consomme pas du tout",
      "Qui sont les plus technologiquement avancés"
    ],
    correctAnswer: 1,
    explanation: "L'avantage comparatif se détermine par le coût d'opportunité : un pays se spécialise là où il est relativement le moins inefficace (ou le plus efficace)."
  },
  {
    id: "q9",
    question: "Les 'nouvelles' théories du commerce international intègrent souvent :",
    options: [
      "La concurrence parfaite et les rendements constants",
      "Uniquement les différences de dotations factorielles",
      "La concurrence imparfaite, les économies d'échelle et la différenciation des produits",
      "L'absence totale de coûts de transport"
    ],
    correctAnswer: 2,
    explanation: "Les nouvelles théories (Krugman, etc.) mettent l'accent sur la concurrence imparfaite, les rendements d'échelle croissants et la demande de variété."
  },
  {
    id: "q10",
    question: "Lequel de ces arguments est un argument EN FAVEUR du libre-échange ?",
    options: [
      "Protection des industries naissantes",
      "Augmentation du choix et baisse des prix pour les consommateurs",
      "Indépendance économique nationale",
      "Création d'emplois garantie dans tous les secteurs"
    ],
    correctAnswer: 1,
    explanation: "Le libre-échange favorise l'efficience, ce qui peut se traduire par plus de choix et des prix plus bas pour les consommateurs."
  },
  {
    id: "q11",
    question: "Le concept de 'protectionnisme éducateur' a été développé par :",
    options: [
      "Adam Smith",
      "David Ricardo",
      "Friedrich List",
      "Paul Krugman"
    ],
    correctAnswer: 2,
    explanation: "Friedrich List est l'économiste qui a théorisé le protectionnisme 'éducateur' pour permettre aux industries naissantes de se développer."
  },
  {
    id: "q12",
    question: "Un des inconvénients potentiels de la spécialisation internationale est :",
    options: [
      "Une productivité accrue",
      "Une plus grande dépendance vis-à-vis des partenaires commerciaux",
      "Une baisse générale des prix mondiaux",
      "Une innovation technologique ralentie"
    ],
    correctAnswer: 1,
    explanation: "Une forte spécialisation peut rendre un pays vulnérable aux chocs économiques externes et dépendant de ses fournisseurs ou clients étrangers."
  },
  {
    id: "q13",
    question: "Si un pays A produit du vin avec 10h de travail et du tissu avec 20h, et un pays B produit du vin avec 15h et du tissu avec 25h. Selon l'avantage absolu :",
    options: [
      "A se spécialise dans le vin, B dans le tissu",
      "A se spécialise dans le tissu, B dans le vin",
      "A se spécialise dans les deux",
      "Il n'y a pas d'avantage à l'échange"
    ],
    correctAnswer: 0,
    explanation: "Le pays A a un avantage absolu dans la production de vin (10h < 15h) et de tissu (20h < 25h). Il devrait se spécialiser là où son avantage est le plus grand, mais ici la question porte sur l'avantage absolu simple pour chaque bien. A est plus efficace pour le vin."
  },
  {
    id: "q14",
    question: "Le paradoxe de Leontief a remis en question quel modèle théorique ?",
    options: [
      "Le modèle de Ricardo",
      "Le modèle d'Adam Smith",
      "Le modèle HOS (dotations factorielles)",
      "Les théories de la croissance endogène"
    ],
    correctAnswer: 2,
    explanation: "Wassily Leontief a montré que les États-Unis, pays le plus riche en capital, exportaient des biens relativement plus intensifs en travail, contredisant les prédictions simples du modèle HOS."
  },
  {
    id: "q15",
    question: "Laquelle de ces mesures N'EST PAS un instrument du protectionnisme ?",
    options: [
      "Les quotas d'importation",
      "Les subventions aux exportations",
      "Les accords de libre-échange régionaux",
      "Les normes sanitaires et techniques strictes"
    ],
    correctAnswer: 2,
    explanation: "Les accords de libre-échange visent à réduire les barrières commerciales, ce qui est l'opposé du protectionnisme. Les subventions à l'exportation sont une forme de protectionnisme car elles favorisent les producteurs nationaux sur les marchés étrangers."
  }
];

export default function FondementsCommerceQuizPage() {
  const { isLoading } = useProgress(); // Seulement isLoading ici, getQuizProgress n'est pas utilisé directement
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
      {/* En-tête */}
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
              <Globe className="mr-3 h-7 w-7 sm:h-8 sm:w-8 text-eco-blue" /> {/* Icône adaptée */}
              {quizPageTitleText}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Testez votre compréhension des théories et mécanismes fondamentaux du commerce international.
            </p>
          </div>
        </div>
      </div>

      {/* Lecteur de Quiz */}
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
          onComplete={handleQuizComplete} // onComplete est optionnel dans QuizPlayer, mais bon à garder
        />
      </motion.div>
      
      {/* Lien pour revoir le chapitre */}
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