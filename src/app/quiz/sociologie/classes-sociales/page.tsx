"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import QuizPlayer from "@/components/quiz-player";
import { useProgress } from "@/hooks/useProgress";
import { QuizQuestion } from "@/hooks/useContent"; // Assuming this is the correct path
import { shuffleArray } from "@/lib/utils";

// Standardized constants
const quizTitle = "Quiz: Les Classes Sociales";
const chapterSlug = "classes-sociales";
const subject = "sociologie";
const accentColor = "socio-purple";
// const moduleSlug = ""; // Define if this chapter is part of a specific module folder

// Questions du quiz sur les classes sociales
const questionsRaw: QuizQuestion[] = [
  {
    id: "cs1",
    question: "Selon Karl Marx, comment se définissent les classes sociales ?",
    options: [
      "Par le niveau de revenu",
      "Par le rapport aux moyens de production",
      "Par le niveau d'éducation",
      "Par le prestige social"
    ],
    correctAnswer: 1,
    explanation: "Pour Karl Marx, les classes sociales se définissent par leur rapport aux moyens de production. Dans le système capitaliste, il identifie principalement la bourgeoisie (propriétaires des moyens de production) et le prolétariat (travailleurs qui ne possèdent que leur force de travail)."
  },
  {
    id: "cs2",
    question: "Quelles sont les trois dimensions de la stratification sociale selon Max Weber ?",
    options: [
      "Revenu, patrimoine, profession",
      "Classe économique, statut social, pouvoir politique",
      "Capital économique, capital culturel, capital social",
      "Origine sociale, niveau d'éducation, profession"
    ],
    correctAnswer: 1,
    explanation: "Max Weber propose une vision multidimensionnelle des classes sociales avec trois dimensions : la classe économique (position sur le marché), le statut social (prestige, honneur social) et le pouvoir politique (capacité à imposer sa volonté)."
  },
  {
    id: "cs3",
    question: "Quelles sont les différentes formes de capital identifiées par Pierre Bourdieu ?",
    options: [
      "Capital financier, capital humain, capital naturel",
      "Capital économique, capital culturel, capital social, capital symbolique",
      "Capital monétaire, capital intellectuel, capital relationnel",
      "Capital fixe, capital variable, capital circulant"
    ],
    correctAnswer: 1,
    explanation: "Pierre Bourdieu distingue quatre formes de capital : économique (revenus, patrimoine), culturel (diplômes, connaissances), social (réseau de relations) et symbolique (prestige, réputation)."
  },
  {
    id: "cs4",
    question: "Qu'est-ce que la mobilité sociale intergénérationnelle ?",
    options: [
      "Le changement de position sociale au cours de la vie d'un individu",
      "Le changement de position sociale entre parents et enfants",
      "Le passage d'une classe sociale à une autre",
      "Le changement de statut professionnel"
    ],
    correctAnswer: 1,
    explanation: "La mobilité sociale intergénérationnelle désigne le changement de position sociale entre parents et enfants. Elle permet d'évaluer dans quelle mesure la position sociale est héritée ou acquise."
  },
  {
    id: "cs5",
    question: "Quelle période a connu une forte augmentation de la mobilité sociale en France ?",
    options: [
      "La Belle Époque (1890-1914)",
      "L'entre-deux-guerres (1918-1939)",
      "Les Trente Glorieuses (1945-1975)",
      "La période contemporaine (depuis 2000)"
    ],
    correctAnswer: 2,
    explanation: "La mobilité sociale a fortement augmenté pendant les Trente Glorieuses (1945-1975), notamment grâce à la transformation de la structure des emplois (déclin de l'agriculture, développement du secteur tertiaire) et à la démocratisation de l'enseignement."
  },
  {
    id: "cs6",
    question: "Qu'est-ce que le phénomène de déclassement social ?",
    options: [
      "L'impossibilité de changer de classe sociale",
      "La perte de prestige d'une profession",
      "Le fait pour un individu d'occuper une position sociale inférieure à celle de ses parents",
      "La diminution du nombre de classes sociales dans une société"
    ],
    correctAnswer: 2,
    explanation: "Le déclassement social désigne la situation où un individu occupe une position sociale inférieure à celle de ses parents. Ce phénomène s'est accentué depuis les années 1980, notamment pour certains diplômés qui n'accèdent pas aux positions sociales auxquelles ils pouvaient prétendre."
  },
  {
    id: "cs7",
    question: "Quel concept désigne la prise de conscience par les individus de leur appartenance à une classe sociale et des intérêts communs qui en découlent ?",
    options: [
      "L'habitus de classe",
      "La conscience de classe",
      "L'identité sociale",
      "La solidarité mécanique"
    ],
    correctAnswer: 1,
    explanation: "La conscience de classe désigne la prise de conscience par les individus de leur appartenance à une classe sociale et des intérêts communs qui en découlent. Pour Marx, cette conscience est nécessaire à l'action collective et à la transformation sociale."
  },
  {
    id: "cs8",
    question: "Selon Pierre Bourdieu, quel est le principal mécanisme de reproduction des inégalités sociales ?",
    options: [
      "L'héritage économique",
      "Le système éducatif",
      "Les réseaux sociaux",
      "Les discriminations à l'embauche"
    ],
    correctAnswer: 1,
    explanation: "Pour Pierre Bourdieu, le système éducatif joue un rôle central dans la reproduction des inégalités sociales. Sous une apparence méritocratique, il favorise les enfants des classes dominantes qui possèdent le capital culturel valorisé par l'école."
  },
  {
    id: "cs9",
    question: "Qu'est-ce que l'intersectionnalité ?",
    options: [
      "L'étude des interactions entre différentes classes sociales",
      "L'analyse des points communs entre différentes théories sociologiques",
      "L'étude de l'articulation entre différentes formes de domination (classe, genre, origine, etc.)",
      "La rencontre entre différentes trajectoires sociales"
    ],
    correctAnswer: 2,
    explanation: "L'intersectionnalité, concept développé par Kimberlé Crenshaw, désigne l'étude de l'articulation entre différentes formes de domination (classe, genre, origine, etc.) et permet d'analyser comment ces différentes formes de domination s'articulent et se renforcent mutuellement."
  },
  {
    id: "cs10",
    question: "Quelle théorie justifie les inégalités sociales par les différences de mérite individuel ?",
    options: [
      "La théorie marxiste",
      "La théorie fonctionnaliste",
      "La théorie méritocratique",
      "La théorie du capital humain"
    ],
    correctAnswer: 2,
    explanation: "La théorie méritocratique justifie les inégalités sociales par les différences de mérite individuel. Selon cette approche, les positions sociales seraient attribuées en fonction des talents, des efforts et des compétences de chacun."
  },
  {
    id: "cs11",
    question: "Quelle institution utilise en France la nomenclature des Professions et Catégories Socioprofessionnelles (PCS) ?",
    options: [
      "Le Ministère de l'Éducation nationale",
      "L'INSEE",
      "Le Conseil économique, social et environnemental",
      "L'Observatoire des inégalités"
    ],
    correctAnswer: 1,
    explanation: "En France, c'est l'INSEE (Institut National de la Statistique et des Études Économiques) qui utilise la nomenclature des Professions et Catégories Socioprofessionnelles (PCS) pour ses études et enquêtes sur la structure sociale."
  },
  {
    id: "cs12",
    question: "Quelle tendance observe-t-on concernant les inégalités économiques dans la plupart des pays développés depuis les années 1980 ?",
    options: [
      "Une forte diminution",
      "Une stabilisation",
      "Une augmentation",
      "Une disparition progressive"
    ],
    correctAnswer: 2,
    explanation: "Dans la plupart des pays développés, on observe depuis les années 1980 une augmentation des inégalités économiques, avec notamment une concentration accrue des revenus les plus élevés et une augmentation encore plus marquée des inégalités de patrimoine."
  },
  {
    id: "cs13",
    question: "Selon la théorie marxiste, quelle est la conséquence inévitable de l'antagonisme entre bourgeoisie et prolétariat ?",
    options: [
      "La révolution prolétarienne",
      "La disparition progressive des classes moyennes",
      "L'émergence d'une nouvelle classe dirigeante",
      "L'augmentation du niveau de vie général"
    ],
    correctAnswer: 0,
    explanation: "Selon la théorie marxiste, l'antagonisme entre bourgeoisie et prolétariat conduit inévitablement à une révolution prolétarienne qui renversera le capitalisme et mènera à l'avènement d'une société sans classes."
  },
  {
    id: "cs14",
    question: "Quel sociologue a mis l'accent sur l'importance des choix individuels et des effets d'agrégation dans les trajectoires sociales ?",
    options: [
      "Émile Durkheim",
      "Pierre Bourdieu",
      "Raymond Boudon",
      "Erving Goffman"
    ],
    correctAnswer: 2,
    explanation: "Raymond Boudon a mis l'accent sur l'importance des choix individuels et des effets d'agrégation dans les trajectoires sociales. Contrairement à Bourdieu qui insiste sur les déterminismes sociaux, Boudon souligne la rationalité des acteurs et les conséquences non intentionnelles de leurs actions."
  },
  {
    id: "cs15",
    question: "Qu'est-ce qui caractérise principalement les classes populaires dans les sociétés contemporaines ?",
    options: [
      "Un fort capital économique mais un faible capital culturel",
      "Un niveau d'éducation élevé mais des revenus modestes",
      "Des emplois peu qualifiés et des revenus modestes",
      "Une forte conscience de classe et une mobilisation politique importante"
    ],
    correctAnswer: 2,
    explanation: "Les classes populaires dans les sociétés contemporaines se caractérisent principalement par des emplois peu qualifiés (employés, ouvriers) et des revenus modestes. Elles disposent généralement d'un faible capital économique et culturel."
  }
];

export default function ClassesSocialesQuizPage() {
  const { getQuizProgress, isLoading } = useProgress(); // Removed updateQuizProgress as QuizPlayer handles it
  const [mounted, setMounted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  // const quizId = "classes-sociales"; // Using chapterSlug now
  // const subjectId = "sociologie"; // Using subject now

  useEffect(() => {
    setMounted(true);
    setShuffledQuestions(shuffleArray(questionsRaw));
  }, []);

  // const handleQuizComplete = (score: number) => {
  //   console.log(`Quiz terminé avec un score de ${score}/${questionsRaw.length}`);
  // };

  if (!mounted || isLoading || shuffledQuestions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-socio-purple"></div>
      </div>
    );
  }

  const quizProgress = getQuizProgress(subject, chapterSlug);
  const hasAttempted = quizProgress?.attempts && quizProgress.attempts > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8"> {/* Changed max-w-7xl to max-w-4xl for consistency */}
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/quiz/sociologie" // Corrected link
          className="flex items-center text-socio-purple hover:text-socio-dark-purple dark:text-socio-light-purple dark:hover:text-socio-purple mb-4 transition-colors duration-150" // Standardized colors
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour aux quiz de Sociologie
        </Link>
        
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4"> {/* Added standard layout structure */}
          <div className="flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <Users className="mr-3 h-7 w-7 sm:h-8 sm:w-8 text-socio-purple" /> {/* Standardized icon and size */}
              {quizTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Testez vos connaissances sur les différentes approches des classes sociales, la stratification sociale, la mobilité sociale et les inégalités.
            </p>
          </div>
        </div>
        
        {hasAttempted && (
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-6"> {/* Adjusted color for socio-purple theme */}
            <p className="text-purple-800 dark:text-purple-300">
              Vous avez déjà réalisé ce quiz. Votre meilleur score : <span className="font-semibold">{quizProgress?.score}%</span>. 
              Nombre de tentatives : <span className="font-semibold">{quizProgress?.attempts}</span>.
            </p>
          </div>
        )}
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
          quizId={chapterSlug} 
          subjectId={subject}
          // onComplete={handleQuizComplete} // QuizPlayer handles progress, custom onComplete if needed
        />
      </motion.div>
      
      <div className="mt-8 text-center">
        <Link 
            href={`/sociologie/${chapterSlug}`} // Assuming direct path for chapter, adjust if in a module
            className="text-sm text-socio-purple hover:underline"
        >
            Revoir le chapitre : {quizTitle.replace("Quiz: ", "")}
        </Link>
      </div>
    </div>
  );
}
