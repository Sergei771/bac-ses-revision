"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, History } from "lucide-react"; 
import { useProgress } from "@/hooks/useProgress";
import QuizPlayer from "@/components/quiz-player";
import { QuizQuestion } from "@/hooks/useContent";
import { shuffleArray } from "@/lib/utils";

const quizTitle = "Quiz: L'Évolution des Formes de Sociabilité";
const chapterSlug = "evolution-sociabilite";
const subject = "sociologie";
const moduleSlug = "groupes-sociaux";
const accentColor = "socio-purple";

const questionsRaw: QuizQuestion[] = [
  {
    id: "q1_evo_soc",
    question: "Comment peut-on définir la sociabilité ?",
    options: [
      "Uniquement les relations amicales entre individus",
      "L'ensemble des relations qu'un individu entretient avec d'autres, ainsi que leurs formes et modalités",
      "Les interactions exclusivement professionnelles",
      "La capacité à utiliser les réseaux sociaux numériques"
    ],
    correctAnswer: 1,
    explanation: "La sociabilité désigne l'ensemble des relations sociales qu'un individu entretient avec d'autres personnes, quelles que soient leur nature et leur forme (familiale, amicale, professionnelle, associative, etc.)."
  },
  {
    id: "q2_evo_soc",
    question: "Selon Ferdinand Tönnies, le passage des sociétés traditionnelles aux sociétés modernes correspond à une évolution :",
    options: [
      "De la communauté (Gemeinschaft) vers la société (Gesellschaft)",
      "De la société (Gesellschaft) vers la communauté (Gemeinschaft)",
      "De la solidarité organique vers la solidarité mécanique",
      "Du capitalisme vers le socialisme"
    ],
    correctAnswer: 0,
    explanation: "Tönnies décrit le passage de la communauté (Gemeinschaft), caractérisée par des liens affectifs forts et une forte intégration, à la société (Gesellschaft), marquée par des relations plus impersonnelles et contractuelles."
  },
  {
    id: "q3_evo_soc",
    question: "Quelles caractéristiques définissaient principalement la sociabilité dans les sociétés traditionnelles ?",
    options: [
      "Des relations choisies librement et basées sur les affinités personnelles",
      "Des liens faibles et diversifiés avec de nombreux cercles sociaux différents",
      "Un ancrage local fort, la prédominance des liens familiaux et une sociabilité largement imposée",
      "Des interactions principalement virtuelles et à distance"
    ],
    correctAnswer: 2,
    explanation: "Les sociétés traditionnelles étaient caractérisées par une sociabilité ancrée localement (village, quartier), dominée par les relations familiales et de parenté, et largement déterminée par la naissance et la position sociale."
  },
  {
    id: "q4_evo_soc",
    question: "Quel phénomène n'a PAS contribué à transformer les formes de sociabilité traditionnelles ?",
    options: [
      "L'urbanisation et l'exode rural",
      "Le développement du salariat et du travail en usine",
      "L'émergence de la vie associative moderne",
      "Le retour à l'agriculture de subsistance"
    ],
    correctAnswer: 3,
    explanation: "L'urbanisation, le salariat et la vie associative ont profondément modifié les formes de sociabilité, contrairement au retour à l'agriculture de subsistance qui n'a pas été un phénomène social majeur dans les sociétés modernes."
  },
  {
    id: "q5_evo_soc",
    question: "Qu'est-ce que la sociabilité élective ?",
    options: [
      "Les relations sociales réservées aux élites",
      "Les relations sociales choisies librement par les individus selon leurs affinités",
      "Les relations sociales établies lors des élections politiques",
      "Les relations sociales imposées par l'école"
    ],
    correctAnswer: 1,
    explanation: "La sociabilité élective désigne les relations que les individus choisissent librement en fonction de leurs affinités et intérêts personnels, par opposition aux relations imposées par la naissance ou la position sociale."
  },
  {
    id: "q6_evo_soc",
    question: "Selon Émile Durkheim, l'évolution des sociétés se caractérise par le passage :",
    options: [
      "De la solidarité mécanique à la solidarité organique",
      "De la solidarité organique à la solidarité mécanique",
      "De l'anomie à l'intégration sociale",
      "Du sacré au profane"
    ],
    correctAnswer: 0,
    explanation: "Durkheim décrit le passage d'une solidarité mécanique (basée sur la ressemblance entre individus) à une solidarité organique (fondée sur la complémentarité des fonctions dans une société plus différenciée)."
  },
  {
    id: "q7_evo_soc",
    question: "Quelle tendance caractérise l'évolution récente des formes de sociabilité ?",
    options: [
      "Le renforcement des structures traditionnelles comme les syndicats et les églises",
      "L'individualisation croissante et la montée de la sociabilité élective",
      "Le retour massif à des formes de sociabilité villageoise",
      "La disparition progressive des liens familiaux"
    ],
    correctAnswer: 1,
    explanation: "Les sociétés contemporaines sont marquées par une individualisation croissante où les individus s'affranchissent des appartenances héritées et construisent davantage leurs relations en fonction de leurs affinités personnelles."
  },
  {
    id: "q8_evo_soc",
    question: "Le concept d'\"individualisme relationnel\" développé par François de Singly suggère que :",
    options: [
      "Les individus contemporains sont de plus en plus isolés et solitaires",
      "Les individus cherchent à s'affirmer comme autonomes tout en maintenant des liens significatifs",
      "Les relations sociales sont uniquement utilitaires dans les sociétés modernes",
      "Les individus ne peuvent plus former de communautés"
    ],
    correctAnswer: 1,
    explanation: "L'individualisme relationnel décrit comment l'individu contemporain cherche à concilier son besoin d'autonomie et d'affirmation de soi avec son désir de maintenir des liens sociaux significatifs."
  },
  {
    id: "q9_evo_soc",
    question: "Selon Barry Wellman, l'\"individualisme en réseau\" (ou \"individualisme connecté\") caractérise :",
    options: [
      "L'isolement croissant des individus à l'ère numérique",
      "Une situation où les individus sont au centre de leurs propres réseaux personnels qu'ils gèrent activement",
      "Le retour à des communautés traditionnelles via Internet",
      "L'addiction aux réseaux sociaux numériques"
    ],
    correctAnswer: 1,
    explanation: "Wellman décrit une situation où les individus ne sont plus intégrés dans des groupes communautaires denses et locaux, mais sont au centre de réseaux personnels diversifiés qu'ils gèrent activement."
  },
  {
    id: "q10_evo_soc",
    question: "L'évolution des formes de sociabilité dans les sociétés contemporaines se caractérise par :",
    options: [
      "Un simple déclin généralisé des liens sociaux",
      "Un retour aux formes traditionnelles de sociabilité",
      "Une transformation profonde de la nature et des modalités des liens sociaux",
      "La disparition complète des relations de face-à-face"
    ],
    correctAnswer: 2,
    explanation: "Plus qu'un déclin, on observe une transformation profonde des liens sociaux qui deviennent plus diversifiés, plus choisis et plus individualisés, sans pour autant disparaître."
  }
];

export default function EvolutionSociabiliteQuizPage() {
  const { isLoading } = useProgress(); 
  const [mounted, setMounted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setMounted(true);
    setShuffledQuestions(shuffleArray(questionsRaw)); 
  }, []);

  if (!mounted || isLoading || shuffledQuestions.length === 0) { 
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-socio-purple"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link 
          href={`/quiz/${subject}`} 
          className="flex items-center text-socio-purple hover:text-socio-dark-purple dark:text-socio-light-purple dark:hover:text-socio-purple mb-4 transition-colors duration-150"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour aux quiz de Sociologie
        </Link>
        
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
          <div className="flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <History className="mr-3 h-7 w-7 sm:h-8 sm:w-8 text-socio-purple" />
              {quizTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Testez vos connaissances sur l'évolution des formes de sociabilité à travers le temps et les transformations sociales.
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
          subjectId={subject}
        />
      </motion.div>
      
      <div className="mt-8 text-center">
        <Link 
            href={`/sociologie/${moduleSlug}/${chapterSlug}`} 
            className="text-sm text-socio-purple hover:underline"
        >
            Revoir le chapitre : {quizTitle.replace("Quiz: ", "")}
        </Link>
      </div>
    </div>
  );
} 