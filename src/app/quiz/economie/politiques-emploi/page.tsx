"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { shuffleArray } from "@/lib/utils";
import QuizPlayer from "@/components/quiz-player";
import { QuizQuestion } from "@/hooks/useContent";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react"; // Users pour politiques de l'emploi
import { useProgress } from "@/hooks/useProgress";

const quizPageTitleText = "Quiz: Les Politiques de l'Emploi";
const chapterSlug = "politiques-emploi";
const chapterPath = "/economie/politiques-economiques/politiques-emploi";
const subjectId = "economie";
const quizTitle = quizPageTitleText;
const subject = subjectId;
const accentColor = "eco-blue";

const questionsRaw: QuizQuestion[] = [
  {
    id: "pe_q1",
    question: "Quelle est la principale distinction entre politiques actives et passives de l'emploi ?",
    options: [
      "Les politiques actives ciblent les jeunes, les passives les seniors",
      "Les actives visent à améliorer l'employabilité et le retour à l'emploi, les passives à indemniser",
      "Les actives sont menées par l'État, les passives par les entreprises",
      "Les actives sont coûteuses, les passives sont gratuites"
    ],
    correctAnswer: 1,
    explanation: "Les politiques actives cherchent à agir sur les causes du chômage (formation, aide à l'embauche), tandis que les passives en atténuent les conséquences (indemnisation)."
  },
  {
    id: "pe_q2",
    question: "Lequel de ces dispositifs relève typiquement d'une politique active de l'emploi ?",
    options: [
      "L'allocation chômage",
      "Un programme de formation professionnelle pour les demandeurs d'emploi",
      "Les indemnités de licenciement",
      "Les préretraites"
    ],
    correctAnswer: 1,
    explanation: "La formation professionnelle vise à accroître les compétences des chômeurs pour faciliter leur réinsertion sur le marché du travail."
  },
  {
    id: "pe_q3",
    question: "Le chômage structurel est principalement lié à :",
    options: [
      "Une baisse temporaire de l'activité économique globale",
      "Des inadéquations entre l'offre et la demande de travail (compétences, localisation) et des rigidités du marché",
      "Un manque d'information des chômeurs sur les offres d'emploi disponibles",
      "Des politiques monétaires trop restrictives"
    ],
    correctAnswer: 1,
    explanation: "Le chômage structurel est persistant et découle des caractéristiques mêmes du marché du travail et de l'économie, indépendamment de la conjoncture."
  },
  {
    id: "pe_q4",
    question: "Une baisse des cotisations sociales sur les bas salaires vise principalement à :",
    options: [
      "Augmenter le revenu disponible des hauts revenus",
      "Réduire le coût du travail pour les employeurs et ainsi stimuler l'embauche",
      "Financer les allocations chômage",
      "Augmenter la flexibilité du marché du travail"
    ],
    correctAnswer: 1,
    explanation: "En réduisant le coût du travail, cette mesure cherche à inciter les entreprises à embaucher davantage, notamment les moins qualifiés."
  },
  {
    id: "pe_q5",
    question: "Qu'est-ce qu'un effet d'aubaine dans le cadre d'une politique d'aide à l'embauche ?",
    options: [
      "L'aide incite une entreprise à créer un emploi qu'elle n'aurait pas créé autrement",
      "L'aide est perçue par une entreprise qui aurait embauché de toute façon, même sans l'aide",
      "L'aide permet de substituer un travailleur aidé à un travailleur non aidé",
      "L'aide est mal ciblée et ne bénéficie pas aux personnes visées"
    ],
    correctAnswer: 1,
    explanation: "L'effet d'aubaine signifie que la subvention n'a pas eu d'impact réel sur la décision d'embauche, l'entreprise profitant simplement de l'aide pour une embauche déjà prévue."
  },
  {
    id: "pe_q6",
    question: "La notion de \"flexisécurité\" vise à concilier :",
    options: [
      "Flexibilité pour les entreprises et sécurité des revenus pour l'État",
      "Flexibilité du marché du travail pour les entreprises et sécurité de l'emploi et des revenus pour les travailleurs",
      "Flexibilité des horaires de travail et sécurité des bâtiments",
      "Flexibilité des salaires et sécurité des placements financiers"
    ],
    correctAnswer: 1,
    explanation: "La flexisécurité est un modèle cherchant à combiner un marché du travail adaptable avec un haut niveau de protection sociale et d'aide au retour à l'emploi."
  },
  {
    id: "pe_q7",
    question: "Quel est l'objectif principal de l'indemnisation du chômage (politique passive) ?",
    options: [
      "Inciter les chômeurs à retrouver rapidement un emploi",
      "Fournir un revenu de remplacement temporaire aux personnes ayant perdu leur emploi",
      "Financer la formation des demandeurs d'emploi",
      "Réduire le coût du travail pour les entreprises"
    ],
    correctAnswer: 1,
    explanation: "L'indemnisation vise à sécuriser le revenu des chômeurs pendant leur période de recherche d'emploi."
  },
  {
    id: "pe_q8",
    question: "Le chômage conjoncturel (ou keynésien) est causé par :",
    options: [
      "Des problèmes d'appariement entre qualifications et emplois disponibles",
      "Une réglementation excessive du marché du travail",
      "Une insuffisance de la demande globale de biens et services dans l'économie",
      "Des salaires trop élevés par rapport à la productivité"
    ],
    correctAnswer: 2,
    explanation: "Selon l'analyse keynésienne, le chômage conjoncturel résulte d'une demande globale trop faible pour assurer le plein-emploi."
  },
  {
    id: "pe_q9",
    question: "Les contrats aidés sont une forme de politique active qui consiste à :",
    options: [
      "Subventionner les entreprises pour qu'elles n'embauchent pas",
      "Offrir des formations qualifiantes aux jeunes diplômés",
      "Subventionner l'embauche de certaines catégories de travailleurs (ex: jeunes, chômeurs de longue durée)",
      "Augmenter le salaire minimum"
    ],
    correctAnswer: 2,
    explanation: "Les emplois aidés réduisent le coût d'embauche pour l'employeur, encourageant le recrutement de publics spécifiques."
  },
  {
    id: "pe_q10",
    question: "Un des débats concernant le salaire minimum est son impact potentiel sur :",
    options: [
      "L'augmentation de la productivité des entreprises",
      "La réduction de l'inflation",
      "L'emploi des travailleurs peu qualifiés (risque de les exclure du marché)",
      "La baisse des importations"
    ],
    correctAnswer: 2,
    explanation: "Certains économistes craignent qu'un salaire minimum trop élevé par rapport à la productivité des moins qualifiés puisse freiner leur embauche."
  },
  {
    id: "pe_q11",
    question: "Les services publics de l'emploi (comme Pôle emploi en France) ont pour mission principale :",
    options: [
      "De fixer le niveau des salaires dans le secteur privé",
      "D'indemniser tous les citoyens sans condition",
      "D'accompagner les demandeurs d'emploi dans leur recherche et de mettre en relation l'offre et la demande de travail",
      "De créer directement des emplois publics pour tous les chômeurs"
    ],
    correctAnswer: 2,
    explanation: "Ces organismes jouent un rôle clé dans l'intermédiation sur le marché du travail et la mise en œuvre des politiques de l'emploi."
  },
  {
    id: "pe_q12",
    question: "L'amélioration de l'adéquation entre la formation et les besoins des entreprises est un enjeu pour lutter contre quel type de chômage ?",
    options: [
      "Le chômage frictionnel",
      "Le chômage conjoncturel",
      "Le chômage structurel (dû à l'inadéquation des compétences)",
      "Le chômage technique"
    ],
    correctAnswer: 2,
    explanation: "Une meilleure adéquation formation-emploi vise à réduire le chômage structurel lié à un déficit de compétences recherchées."
  },
  {
    id: "pe_q13",
    question: "Un effet de substitution d'une politique d'aide à l'embauche signifie que :",
    options: [
      "L'aide a permis de créer un emploi net supplémentaire",
      "L'entreprise a substitué un travailleur aidé à un travailleur qu'elle aurait embauché de toute façon ou qui était déjà en place",
      "L'aide a été utilisée pour acheter des machines plutôt que pour embaucher",
      "L'aide a été partagée entre plusieurs petits emplois précaires"
    ],
    correctAnswer: 1,
    explanation: "L'effet de substitution limite l'impact net sur l'emploi, car l'embauche aidée se fait au détriment d'une autre embauche non aidée ou d'un maintien dans l'emploi."
  },
  {
    id: "pe_q14",
    question: "Laquelle de ces mesures vise à augmenter la flexibilité quantitative externe du marché du travail ?",
    options: [
      "Investir massivement dans la formation continue des salariés",
      "Augmenter le salaire minimum de manière significative",
      "Assouplir les conditions de recours aux contrats à durée déterminée (CDD) et de licenciement",
      "Renforcer le pouvoir de négociation des syndicats"
    ],
    correctAnswer: 2,
    explanation: "La flexibilité quantitative externe concerne la facilité pour les entreprises d'ajuster le volume de leur main-d'œuvre par les embauches et les licenciements."
  },
  {
    id: "pe_q15",
    question: "Pourquoi l'évaluation des politiques de l'emploi est-elle complexe ?",
    options: [
      "Parce qu'elles sont toujours inefficaces",
      "Parce qu'il est difficile d'isoler l'effet propre de la politique des autres facteurs économiques et de mesurer les effets pervers (aubaine, substitution)",
      "Parce que les données sur le chômage ne sont pas fiables",
      "Parce que les économistes sont toujours en désaccord sur tout"
    ],
    correctAnswer: 1,
    explanation: "L'évaluation rigoureuse nécessite des méthodes statistiques pour identifier l'impact causal d'une politique, en tenant compte de ce qui se serait passé en son absence et des effets indirects."
  }
];

export default function QuizPolitiquesEmploi() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const { updateChapterProgress } = useProgress();

  useEffect(() => {
    setQuestions(shuffleArray(questionsRaw));
  }, []);

  const handleQuizCompletion = (score: number, answers: number[]) => {
    console.log(`Quiz ${chapterSlug} complété avec un score de ${score}/${questionsRaw.length}`);
    updateChapterProgress(subjectId, chapterSlug, { completed: true, timeSpent: 0 });
  };

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-blue"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 p-1">
          <Link href="/quiz/economie" className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-eco-blue dark:hover:text-eco-blue-dark transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Retour aux quiz d'Économie
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="p-2.5 bg-eco-blue/10 dark:bg-eco-blue/20 rounded-lg mr-4">
                <Users className="h-7 w-7 text-eco-blue" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                  {quizPageTitleText}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Évaluez vos connaissances sur les mesures de lutte contre le chômage.
                </p>
              </div>
            </div>
            <Link 
              href={chapterPath}
              className="text-sm font-medium text-eco-blue hover:text-eco-blue-dark dark:text-eco-blue-light dark:hover:text-eco-blue-lighter py-2 px-4 rounded-lg bg-eco-blue/10 hover:bg-eco-blue/20 transition-colors whitespace-nowrap"
            >
              Revoir le chapitre
            </Link>
          </div>
          
          <QuizPlayer 
            questions={questions} 
            quizId={chapterSlug}
            subjectId={subjectId}
            onComplete={handleQuizCompletion} 
          />
        </div>
        
      </div>
    </motion.div>
  );
} 