"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { shuffleArray } from "@/lib/utils";
import QuizPlayer from "@/components/quiz-player";
import { QuizQuestion } from "@/hooks/useContent";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react"; // Icône Scale pour les déséquilibres
import { useProgress } from "@/hooks/useProgress";

const quizPageTitleText = "Quiz: Les Déséquilibres Mondiaux";
const chapterSlug = "desequilibres-mondiaux";
const chapterPath = "/economie/mondialisation/desequilibres-mondiaux";
const subjectId = "economie";
const quizTitle = quizPageTitleText;
const subject = subjectId;
const accentColor = "eco-blue";

const questionsRaw: QuizQuestion[] = [
  {
    id: "deseq_q1",
    question: "Qu'est-ce qu'un déséquilibre de la balance des transactions courantes ?",
    options: [
      "Un excédent systématique des importations sur les exportations de capitaux.",
      "Un écart important et persistant entre les exportations et les importations de biens, services et revenus d'un pays.",
      "Une variation brutale du taux de change d'une monnaie.",
      "L'incapacité d'un État à rembourser sa dette publique."
    ],
    correctAnswer: 1,
    explanation: "Un déséquilibre de la balance courante se manifeste par un déficit (importations > exportations) ou un excédent (exportations > importations) significatif et durable."
  },
  {
    id: "deseq_q2",
    question: "Lequel de ces facteurs N'EST PAS une cause directe des déséquilibres des balances courantes ?",
    options: [
      "Les différences de compétitivité-prix entre pays.",
      "Les politiques monétaires des banques centrales uniquement.",
      "Les niveaux d'épargne et d'investissement nationaux.",
      "Les spécialisations productivas nationales."
    ],
    correctAnswer: 1,
    explanation: "Si les politiques monétaires peuvent influencer le taux de change et donc la compétitivité-prix, elles ne sont pas le seul facteur et agissent souvent indirectement. Les autres options sont des causes directes."
  },
  {
    id: "deseq_q3",
    question: "Quelle peut être une conséquence majeure d'un déficit courant persistant pour un pays ?",
    options: [
      "Une accumulation de réserves de change.",
      "Une augmentation de sa créance nette sur le reste du monde.",
      "Un endettement extérieur croissant.",
      "Une forte appréciation de sa monnaie."
    ],
    correctAnswer: 2,
    explanation: "Un déficit courant signifie que le pays dépense plus à l'étranger qu'il ne reçoit de revenus de l'étranger. Ce déficit doit être financé, souvent par l'emprunt, ce qui accroît la dette extérieure."
  },
  {
    id: "deseq_q4",
    question: "Qu'est-ce que la dette souveraine ?",
    options: [
      "La dette des entreprises multinationales envers les États.",
      "L'ensemble des engagements financiers d'un État (gouvernement central, collectivités locales, sécurité sociale).",
      "La dette des ménages d'un pays envers les banques.",
      "Les prêts accordés par le FMI aux pays en développement."
    ],
    correctAnswer: 1,
    explanation: "La dette souveraine représente la totalité des emprunts contractés par un État pour financer ses déficits budgétaires passés."
  },
  {
    id: "deseq_q5",
    question: "Un exemple de 'bien public mondial' est :",
    options: [
      "Un vaccin développé par une entreprise pharmaceutique privée.",
      "La stabilité du climat.",
      "Les réserves de pétrole d'un pays.",
      "Un logiciel propriétaire très utilisé."
    ],
    correctAnswer: 1,
    explanation: "Un bien public mondial est non-rival (sa consommation par un n'empêche pas celle des autres) et non-excluable (difficile d'empêcher quelqu'un d'en bénéficier). La stabilité climatique en est un exemple type."
  },
  {
    id: "deseq_q6",
    question: "Lequel de ces éléments caractérise un paradis fiscal ?",
    options: [
      "Une forte imposition sur les sociétés et les revenus.",
      "Une grande transparence financière et une coopération judiciaire internationale active.",
      "Une fiscalité très faible ou nulle, l'opacité bancaire et une faible réglementation.",
      "L'obligation pour les entreprises d'y avoir une activité productive réelle importante."
    ],
    correctAnswer: 2,
    explanation: "Les paradis fiscaux se distinguent par une fiscalité très attractive, le secret bancaire et une réglementation minimale, ce qui favorise l'évasion et la fraude fiscales."
  },
  {
    id: "deseq_q7",
    question: "Quelle institution internationale a pour rôle principal de veiller à la stabilité du système financier international et de fournir une aide aux pays en difficulté de balance des paiements ?",
    options: [
      "L'Organisation Mondiale du Commerce (OMC).",
      "La Banque Mondiale.",
      "Le Fonds Monétaire International (FMI).",
      "L'Organisation de Coopération et de Développement Économiques (OCDE)."
    ],
    correctAnswer: 2,
    explanation: "Le FMI a été créé pour promouvoir la coopération monétaire internationale, la stabilité financière, et fournir une assistance financière conditionnelle aux pays rencontrant des problèmes de balance des paiements."
  },
  {
    id: "deseq_q8",
    question: "Le protectionnisme vise à :",
    options: [
      "Favoriser la libre circulation des biens, services et capitaux.",
      "Protéger les industries nationales de la concurrence étrangère par des barrières tarifaires ou non tarifaires.",
      "Supprimer toutes les subventions aux entreprises nationales.",
      "Encourager les délocalisations d'entreprises."
    ],
    correctAnswer: 1,
    explanation: "Le protectionnisme regroupe les mesures prises par un État pour limiter les importations (droits de douane, quotas, normes) et/ou favoriser les exportations (subventions), afin de protéger sa production domestique."
  },
  {
    id: "deseq_q9",
    question: "Un des principaux déséquilibres sociaux accentué par la mondialisation est :",
    options: [
      "La réduction systématique des inégalités de revenus dans tous les pays.",
      "L'amélioration uniforme des conditions de travail à l'échelle mondiale.",
      "Le creusement des inégalités de revenus et de richesse au sein de nombreux pays.",
      "La disparition totale du travail des enfants."
    ],
    correctAnswer: 2,
    explanation: "Si la mondialisation a sorti de la pauvreté des millions de personnes, elle a aussi contribué, dans de nombreux pays, à une augmentation des inégalités entre les plus riches et les plus pauvres, et entre travail qualifié et non qualifié."
  },
  {
    id: "deseq_q10",
    question: "La 'contagion financière' lors d'une crise signifie que :",
    options: [
      "Seul le pays d'origine de la crise est affecté.",
      "La crise se propage rapidement d'un pays ou d'un marché à d'autres, même s'ils ne sont pas directement liés au départ.",
      "Les banques centrales réussissent toujours à contenir la crise localement.",
      "Les investisseurs se ruent massivement sur les actifs du pays en crise."
    ],
    correctAnswer: 1,
    explanation: "La contagion financière est un phénomène par lequel les difficultés d'une institution, d'un marché ou d'un pays se transmettent à d'autres, souvent par le biais des interconnexions financières et des réactions des investisseurs."
  },
  {
    id: "deseq_q11",
    question: "Lequel de ces forums regroupe les économies les plus développées et certaines grandes économies émergentes pour discuter de la coopération économique et financière internationale ?",
    options: [
      "L'Union Européenne (UE).",
      "L'Organisation des Nations Unies (ONU).",
      "Le G20 (Groupe des Vingt).",
      "L'ALENA (Accord de libre-échange nord-américain, devenu ACEUM)."
    ],
    correctAnswer: 2,
    explanation: "Le G20 est un forum international majeur qui réunit les dirigeants des 19 pays les plus riches et de l'Union européenne, représentant environ 80% du PIB mondial, pour coordonner leurs politiques économiques."
  },
  {
    id: "deseq_q12",
    question: "Un exemple de déséquilibre environnemental mondial est :",
    options: [
      "L'augmentation du nombre de parcs nationaux protégés.",
      "La réduction des émissions de CO2 par la Chine ces dernières années.",
      "La déforestation de l'Amazonie qui affecte la biodiversité et le climat mondial.",
      "Le développement de l'agriculture biologique en Europe."
    ],
    correctAnswer: 2,
    explanation: "La déforestation a des impacts globaux (perte de biodiversité, émission de GES) qui dépassent les frontières du pays où elle a lieu, ce qui en fait un déséquilibre environnemental mondial."
  },
  {
    id: "deseq_q13",
    question: "Un taux de change qui s'apprécie fortement et durablement pour un pays peut :",
    options: [
      "Rendre ses exportations moins chères et ses importations plus chères.",
      "Améliorer la compétitivité-prix de ses produits à l'exportation.",
      "Rendre ses exportations plus chères et ses importations moins chères, pouvant creuser un déficit commercial.",
      "N'avoir aucun impact sur sa balance commerciale."
    ],
    correctAnswer: 2,
    explanation: "Une appréciation de la monnaie nationale signifie qu'il faut plus d'unités de monnaie étrangère pour acheter une unité de monnaie nationale. Cela renchérit les produits nationaux pour les étrangers (exportations) et rend les produits étrangers moins chers (importations)."
  },
  {
    id: "deseq_q14",
    question: "La difficulté à faire respecter les accords internationaux sur le climat (comme l'Accord de Paris) illustre principalement :",
    options: [
      "L'inutilité totale de ces accords.",
      "Le manque de connaissances scientifiques sur le changement climatique.",
      "Le défi de la coopération internationale face aux souverainetés nationales et aux coûts de la transition écologique.",
      "Le fait que le changement climatique n'est plus une préoccupation majeure."
    ],
    correctAnswer: 2,
    explanation: "La gestion des biens publics mondiaux comme le climat se heurte à la tentation du 'passager clandestin' et aux coûts économiques que chaque État doit supporter, limitant l'efficacité des accords malgré leur nécessité."
  },
  {
    id: "deseq_q15",
    question: "L'accumulation de réserves de change par certains pays (ex: Chine) peut être interprétée comme :",
    options: [
      "Un signe de faiblesse économique et de dépendance.",
      "Une stratégie pour maintenir leur monnaie sous-évaluée et favoriser leurs exportations, ou se prémunir contre l'instabilité financière.",
      "Une obligation imposée par le FMI à tous ses membres.",
      "Uniquement le résultat d'une forte attractivité touristique."
    ],
    correctAnswer: 1,
    explanation: "Accumuler des réserves de change peut servir plusieurs objectifs : se protéger contre des chocs financiers externes, influencer le taux de change de sa monnaie (souvent pour la maintenir compétitive), ou placer des excédents courants."
  }
];

export default function DesequilibresMondiauxQuizPage() {
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
              <Scale className="mr-3 h-7 w-7 sm:h-8 sm:w-8 text-eco-blue" /> 
              {quizPageTitleText}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Évaluez votre compréhension des causes, conséquences et enjeux des déséquilibres économiques mondiaux.
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