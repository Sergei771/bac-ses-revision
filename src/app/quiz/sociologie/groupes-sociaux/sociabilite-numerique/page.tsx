"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Smartphone } from "lucide-react"; 
import { useProgress } from "@/hooks/useProgress";
import QuizPlayer from "@/components/quiz-player";
import { QuizQuestion } from "@/hooks/useContent";
import { shuffleArray } from "@/lib/utils";

const quizTitle = "Quiz: La Sociabilité Numérique";
const chapterSlug = "sociabilite-numerique";
const subject = "sociologie";
const moduleSlug = "groupes-sociaux";
const accentColor = "socio-purple";

const questionsRaw: QuizQuestion[] = [
  {
    id: "q1_soc_num",
    question: "Qu\'est-ce que la sociabilité numérique ?",
    options: [
      "Uniquement les rencontres amoureuses en ligne.",
      "L\'ensemble des relations sociales entretenues via les technologies numériques.",
      "L\'utilisation des ordinateurs au travail.",
      "La peur de parler en public sans support numérique."
    ],
    correctAnswer: 1,
    explanation: "La sociabilité numérique englobe toutes les formes d\'interactions sociales médiatisées par des outils comme les réseaux sociaux, messageries, jeux, etc."
  },
  {
    id: "q2_soc_num",
    question: "Les interactions numériques peuvent-elles être synchrones et asynchrones ?",
    options: ["Vrai", "Faux"],
    correctAnswer: 0,
    explanation: "Oui, elles sont synchrones en temps réel (chat) et asynchrones en différé (email, commentaire de blog)."
  },
  {
    id: "q3_soc_num",
    question: "Selon la thèse du \'complément\', la sociabilité numérique...",
    options: [
      "Remplace totalement les interactions en face-à-face.",
      "Enrichit et complète la sociabilité traditionnelle.",
      "N\'a aucun impact sur les relations hors ligne.",
      "Concerne uniquement les jeunes générations."
    ],
    correctAnswer: 1,
    explanation: "La thèse du complément suggère que le numérique offre des moyens supplémentaires d\'interagir et de maintenir des liens, en plus des rencontres physiques."
  },
  {
    id: "q4_soc_num",
    question: "Qu\'est-ce qu\'une communauté en ligne ?",
    options: [
      "Tous les habitants d\'une même ville connectés à Internet.",
      "Un groupe de personnes interagissant autour d\'un intérêt commun via Internet.",
      "Les employés d\'une entreprise utilisant une messagerie interne.",
      "Uniquement les joueurs d\'un même jeu vidéo."
    ],
    correctAnswer: 1,
    explanation: "Une communauté en ligne se forme autour d\'intérêts partagés et se caractérise par des interactions régulières et un sentiment d\'appartenance."
  },
  {
    id: "q5_soc_num",
    question: "L\'identité numérique se réfère à :",
    options: [
      "Uniquement le pseudonyme utilisé sur un forum.",
      "L\'ensemble des traces qu\'un individu laisse sur Internet, façonnant sa présentation de soi.",
      "La capacité à utiliser des outils numériques complexes.",
      "Le numéro d\'identification d\'un smartphone."
    ],
    correctAnswer: 1,
    explanation: "L\'identité numérique est construite par les profils, publications, interactions et autres données laissées en ligne."
  },
  {
    id: "q6_soc_num",
    question: "La \'fracture numérique\' désigne principalement :",
    options: [
      "Les disputes causées par l\'usage des réseaux sociaux.",
      "Les inégalités d\'accès et de compétences face aux technologies numériques.",
      "La différence de vitesse de connexion entre zones urbaines et rurales.",
      "Le temps excessif passé en ligne."
    ],
    correctAnswer: 1,
    explanation: "La fracture numérique met en évidence les disparités d\'accès aux TIC et les inégalités de maîtrise de ces outils (illectronisme)."
  },
  {
    id: "q7_soc_num",
    question: "Le concept d\'\'individualisme connecté\' (Barry Wellman) suggère que :",
    options: [
      "Les gens sont plus isolés à cause d\'Internet.",
      "Les individus gèrent de manière autonome de multiples réseaux sociaux, moins dépendants des groupes locaux.",
      "Chaque individu est connecté en permanence à un seul grand réseau mondial.",
      "Seuls les individus les plus connectés ont une réelle influence."
    ],
    correctAnswer: 1,
    explanation: "L\'individualisme connecté décrit une sociabilité où les individus sont au centre de leurs propres réseaux personnels, gérés activement, plutôt que d\'être intégrés dans des groupes communautaires denses et locaux."
  },
  {
    id: "q8_soc_num",
    question: "Le cyberharcèlement est un exemple de défi lié à la sociabilité numérique.",
    options: ["Vrai", "Faux"],
    correctAnswer: 0,
    explanation: "Le cyberharcèlement, la diffusion de discours de haine et la désinformation sont des risques majeurs de la sociabilité en ligne."
  },
  {
    id: "q9_soc_num",
    question: "Les communautés en ligne ne peuvent jamais créer de liens sociaux aussi forts que les communautés physiques.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1,
    explanation: "De nombreuses études montrent que les communautés en ligne peuvent générer des liens très forts, un soutien émotionnel important et un fort sentiment d\'appartenance, parfois même plus que certaines relations hors ligne."
  },
  {
    id: "q10_soc_num",
    question: "Laquelle de ces plateformes est principalement axée sur la sociabilité professionnelle ?",
    options: ["Instagram", "WhatsApp", "LinkedIn", "Reddit"],
    correctAnswer: 2,
    explanation: "LinkedIn est spécifiquement conçu pour le réseautage professionnel, la gestion de carrière et la recherche d\'opportunités d\'emploi."
  }
];

export default function SociabiliteNumeriqueQuizPage() {
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
              <Smartphone className="mr-3 h-7 w-7 sm:h-8 sm:w-8 text-socio-purple" />
              {quizTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Évaluez votre compréhension des formes, impacts et enjeux de la sociabilité à l\'ère numérique.
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