"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { shuffleArray } from "@/lib/utils";
import QuizPlayer from "@/components/quiz-player";
import { QuizQuestion } from "@/hooks/useContent";
import Link from "next/link";
import { ArrowLeft, Landmark } from "lucide-react"; // Icône Landmark pour la finance
import { useProgress } from "@/hooks/useProgress";

const quizPageTitleText = "Quiz: La Globalisation Financière";
const chapterSlug = "globalisation-financiere";
const chapterPath = "/economie/mondialisation/globalisation-financiere";
const subjectId = "economie";
const quizTitle = quizPageTitleText;
const subject = subjectId;
const accentColor = "eco-blue";

const questionsRaw: QuizQuestion[] = [
  {
    id: "gf_q1",
    question: "Laquelle de ces affirmations NE FAIT PAS partie des '3D' de la globalisation financière ?",
    options: [
      "Déréglementation",
      "Désintermédiation",
      "Décloisonnement",
      "Diversification"
    ],
    correctAnswer: 3,
    explanation: "Les '3D' sont Déréglementation, Désintermédiation et Décloisonnement. La diversification est une conséquence ou une stratégie, mais pas un des '3D' initiaux."
  },
  {
    id: "gf_q2",
    question: "Qu'est-ce que la désintermédiation financière ?",
    options: [
      "Une augmentation du rôle des banques dans le financement",
      "Un accès plus direct des entreprises aux marchés pour se financer",
      "La séparation stricte entre banques de dépôt et banques d'investissement",
      "Une régulation plus forte des intermédiaires financiers"
    ],
    correctAnswer: 1,
    explanation: "La désintermédiation signifie que les agents économiques (notamment les entreprises) ont de plus en plus recours directement aux marchés financiers pour se financer, réduisant le rôle traditionnel d'intermédiaire des banques."
  },
  {
    id: "gf_q3",
    question: "Quel marché financier est considéré comme le plus grand au monde en termes de volume de transactions ?",
    options: [
      "Le marché des actions (Bourse)",
      "Le marché obligataire",
      "Le marché des changes (Forex)",
      "Le marché des matières premières"
    ],
    correctAnswer: 2,
    explanation: "Le marché des changes (Forex), où les devises sont échangées, est de loin le marché financier le plus liquide et le plus important en volume quotidien de transactions."
  },
  {
    id: "gf_q4",
    question: "Un Investissement Direct à l'Étranger (IDE) se caractérise par :",
    options: [
      "Un achat d'actions étrangères à court terme pour spéculer",
      "Une prise de participation durable dans une entreprise étrangère avec intention d'influence",
      "Un prêt accordé à un gouvernement étranger",
      "L'ouverture d'un simple compte bancaire à l'étranger"
    ],
    correctAnswer: 1,
    explanation: "Les IDE impliquent une relation à long terme et une influence significative sur la gestion de l'entreprise étrangère, par opposition aux investissements de portefeuille plus volatils."
  },
  {
    id: "gf_q5",
    question: "Les 'Zinzins' (investisseurs institutionnels) regroupent typiquement :",
    options: [
      "Les petits épargnants individuels",
      "Les banques centrales uniquement",
      "Les compagnies d'assurance, fonds de pension et fonds de placement",
      "Les agences de notation financière"
    ],
    correctAnswer: 2,
    explanation: "Les investisseurs institutionnels sont des entités qui collectent l'épargne de nombreux agents (assurés, cotisants) pour l'investir sur les marchés financiers. Ex: compagnies d'assurance, fonds de pension."
  },
  {
    id: "gf_q6",
    question: "Lequel de ces éléments est considéré comme un risque majeur de la globalisation financière ?",
    options: [
      "Une baisse du coût du capital pour les entreprises",
      "Une meilleure allocation des ressources à l'échelle mondiale",
      "Une plus grande stabilité des systèmes financiers nationaux",
      "Le risque systémique et la contagion des crises financières"
    ],
    correctAnswer: 3,
    explanation: "Si la globalisation financière peut offrir des avantages, elle accroît aussi l'interdépendance des systèmes financiers, augmentant le risque qu'une crise locale se propage (contagion) et devienne systémique."
  },
  {
    id: "gf_q7",
    question: "Le triangle d'incompatibilité de Mundell stipule qu'un pays ne peut avoir simultanément :",
    options: [
      "Croissance économique, plein emploi et inflation maîtrisée",
      "Taux de change fixe, politique monétaire autonome et libre circulation des capitaux",
      "Budget équilibré, faible dette publique et protection sociale élevée",
      "Industrie forte, agriculture performante et secteur tertiaire développé"
    ],
    correctAnswer: 1,
    explanation: "Le triangle de Mundell (ou trilemme de Mundell) postule qu'un pays doit choisir deux de ces trois objectifs : un régime de change fixe, une politique monétaire indépendante, et la libre mobilité des capitaux. Il ne peut atteindre les trois simultanément."
  },
  {
    id: "gf_q8",
    question: "Les accords de Bâle (I, II, III) visent principalement à :",
    options: [
      "Faciliter la création de paradis fiscaux",
      "Promouvoir la déréglementation totale des banques",
      "Renforcer la solvabilité et la stabilité des banques internationales",
      "Fixer les taux d'intérêt directeurs des banques centrales"
    ],
    correctAnswer: 2,
    explanation: "Les accords de Bâle sont des ensembles de recommandations prudentielles destinées à assurer la solidité financière des banques, notamment en exigeant des niveaux de fonds propres minimaux."
  },
  {
    id: "gf_q9",
    question: "Qu'est-ce qu'un 'paradis fiscal' ?",
    options: [
      "Un pays avec des impôts très élevés mais d'excellents services publics",
      "Un territoire offrant une fiscalité très faible ou nulle et une faible transparence, attirant les capitaux",
      "Une zone où les investissements financiers sont garantis sans risque par l'État",
      "Un pays qui subventionne massivement ses entreprises exportatrices"
    ],
    correctAnswer: 1,
    explanation: "Un paradis fiscal se caractérise par une imposition très avantageuse, voire inexistante, et souvent un manque de transparence, ce qui attire les capitaux cherchant à échapper à l'impôt."
  },
  {
    id: "gf_q10",
    question: "La crise des 'subprimes' de 2007-2008 trouve son origine dans quel secteur et pays ?",
    options: [
      "Le secteur technologique en Asie",
      "Le secteur immobilier aux États-Unis",
      "Le secteur bancaire en Europe",
      "La dette souveraine en Amérique Latine"
    ],
    correctAnswer: 1,
    explanation: "La crise des subprimes a débuté avec les difficultés de remboursement de prêts hypothécaires à risque (subprimes) aux États-Unis, avant de se propager au système financier mondial."
  },
  {
    id: "gf_q11",
    question: "Un avantage de la globalisation financière pour un pays en développement peut être :",
    options: [
      "Une protection garantie contre la fuite des capitaux",
      "Un accès facilité à l'épargne mondiale pour financer son développement",
      "Une plus grande autonomie de sa politique monétaire",
      "Une diminution automatique des inégalités internes"
    ],
    correctAnswer: 1,
    explanation: "La globalisation financière peut permettre aux pays en développement d'attirer des capitaux étrangers pour financer leurs investissements et leur croissance, complétant ainsi une épargne nationale parfois insuffisante."
  },
  {
    id: "gf_q12",
    question: "Les agences de notation (Moody's, S&P, Fitch) ont pour rôle principal de :",
    options: [
      "Gérer directement les portefeuilles d'investissement des particuliers",
      "Réguler les marchés boursiers internationaux",
      "Évaluer et noter la capacité des emprunteurs (États, entreprises) à rembourser leurs dettes",
      "Fixer les parités entre les différentes monnaies"
    ],
    correctAnswer: 2,
    explanation: "Les agences de notation évaluent le risque de crédit des émetteurs de dette, fournissant une information aux investisseurs sur la probabilité de défaut de ces emprunteurs."
  },
  {
    id: "gf_q13",
    question: "Qu'appelle-t-on 'capitaux flottants' ou 'hot money' ?",
    options: [
      "Des investissements industriels à très long terme",
      "Des capitaux qui se déplacent très rapidement d'un pays à l'autre à la recherche de rendements élevés à court terme",
      "L'argent liquide détenu par les ménages",
      "Les réserves d'or des banques centrales"
    ],
    correctAnswer: 1,
    explanation: "Les capitaux flottants ('hot money') sont des fonds spéculatifs très mobiles qui peuvent entrer et sortir rapidement d'un pays, ce qui peut être une source d'instabilité."
  },
  {
    id: "gf_q14",
    question: "La 'taxe Tobin' (ou une de ses variantes comme la TTF) est une taxe proposée sur :",
    options: [
      "Les bénéfices des sociétés multinationales",
      "Les transactions financières internationales",
      "Les émissions de carbone",
      "Les importations de produits de luxe"
    ],
    correctAnswer: 1,
    explanation: "Initialement proposée par James Tobin pour taxer les transactions sur les devises, l'idée a été élargie à d'autres transactions financières (TTF) pour freiner la spéculation et/ou lever des fonds."
  },
  {
    id: "gf_q15",
    question: "Le FMI (Fonds Monétaire International) a pour rôle principal :",
    options: [
      "D'être une banque commerciale pour les entreprises",
      "De financer des projets de développement à long terme (rôle de la Banque Mondiale)",
      "De promouvoir la stabilité financière mondiale, de fournir une assistance financière aux pays en difficulté et de surveiller les politiques économiques",
      "De réguler directement les hedge funds et les fonds de private equity"
    ],
    correctAnswer: 2,
    explanation: "Le FMI vise à assurer la stabilité du système monétaire international, prévenir les crises financières, et aider les pays membres confrontés à des difficultés de balance des paiements."
  }
];

export default function GlobalisationFinanciereQuizPage() {
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
              <Landmark className="mr-3 h-7 w-7 sm:h-8 sm:w-8 text-eco-blue" /> 
              {quizPageTitleText}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Évaluez vos connaissances sur les marchés financiers mondiaux, leurs acteurs et les enjeux de la globalisation financière.
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
          onComplete={handleQuizComplete} 
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