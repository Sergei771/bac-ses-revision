"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react"; // Share2 for networks/capital social
import { useProgress } from "@/hooks/useProgress";
import QuizPlayer from "@/components/quiz-player";
import { QuizQuestion } from "@/hooks/useContent";
import { shuffleArray } from "@/lib/utils";

const quizTitle = "Quiz: Réseaux Sociaux et Capital Social";
const chapterSlug = "reseaux-capital-social";
const subject = "sociologie";
const moduleSlug = "groupes-sociaux";
const accentColor = "socio-purple";

const questionsRaw: QuizQuestion[] = [
  {
    id: "q1_reseaux_capital",
    question: "En sociologie, un réseau social se réfère principalement aux plateformes en ligne comme Facebook ou Twitter.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1,
    explanation: "En sociologie, un réseau social est un concept plus large désignant un ensemble d\'acteurs sociaux et leurs relations, qu\'elles soient en ligne ou hors ligne."
  },
  {
    id: "q2_reseaux_capital",
    question: "Selon Mark Granovetter, quel type de liens sont souvent les plus utiles pour trouver un emploi ?",
    options: [
      "Les liens forts (famille, amis très proches)",
      "Les liens faibles (connaissances, contacts occasionnels)",
      "Les liens inexistants (candidature spontanée uniquement)",
      "Les liens hiérarchiques (avec son supérieur direct)"
    ],
    correctAnswer: 1,
    explanation: "Granovetter a mis en évidence la \'force des liens faibles\' : les connaissances plus distantes donnent accès à des cercles sociaux et des informations différents, souvent cruciaux pour les opportunités."
  },
  {
    id: "q3_reseaux_capital",
    question: "Qui a défini le capital social comme \'l\'ensemble des ressources actuelles ou potentielles liées à la possession d\'un réseau durable de relations\' ?",
    options: ["Robert Putnam", "Mark Granovetter", "Pierre Bourdieu", "Émile Durkheim"],
    correctAnswer: 2,
    explanation: "C\'est Pierre Bourdieu qui a proposé cette définition, insistant sur les bénéfices qu\'un individu peut tirer de son réseau."
  },
  {
    id: "q4_reseaux_capital",
    question: "Le capital social de \'pont\' (bridging capital) selon Putnam se réfère à :",
    options: [
      "Des liens très forts au sein d\'un groupe homogène.",
      "Des liens entre des personnes de groupes sociaux différents.",
      "L\'accumulation de richesse grâce à son réseau.",
      "La capacité à construire des ponts physiques."
    ],
    correctAnswer: 1,
    explanation: "Le \'bridging capital\' (capital de pont) de Putnam concerne les liens qui connectent des groupes sociaux divers, favorisant l\'ouverture et l\'accès à des ressources variées."
  },
  {
    id: "q5_reseaux_capital",
    question: "La densité d\'un réseau social mesure :",
    options: [
      "Le nombre total de personnes dans le réseau.",
      "La fréquence des interactions entre les membres.",
      "La proportion des liens existants par rapport à tous les liens possibles.",
      "L\'influence du membre le plus central."
    ],
    correctAnswer: 2,
    explanation: "La densité indique à quel point les membres d\'un réseau sont connectés entre eux. Une forte densité signifie beaucoup de liens internes."
  },
  {
    id: "q6_reseaux_capital",
    question: "Le capital social est une ressource toujours également répartie dans la société.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1,
    explanation: "Le capital social est inégalement distribué. Certains individus et groupes ont accès à des réseaux plus étendus et/ou plus dotés en ressources, ce qui peut générer des inégalités."
  },
  {
    id: "q7_reseaux_capital",
    question: "Quel avantage N\'EST PAS typiquement associé à un fort capital social ?",
    options: [
      "Un meilleur accès à l\'information et aux opportunités.",
      "Un soutien social et émotionnel accru.",
      "Une garantie d\'augmentation du capital économique.",
      "Une plus grande capacité d\'influence."
    ],
    correctAnswer: 2,
    explanation: "Si le capital social peut aider à acquérir du capital économique, il n\'y a pas de garantie automatique. Les autres options sont des avantages plus directs."
  },
  {
    id: "q8_reseaux_capital",
    question: "Le \'bonding capital\' (capital de lien) de Putnam sert principalement à :",
    options: [
      "Créer des liens avec des personnes très différentes.",
      "Renforcer la cohésion et la solidarité au sein d\'un groupe homogène.",
      "Trouver un emploi dans un autre secteur d\'activité.",
      "Accéder à des informations très diversifiées."
    ],
    correctAnswer: 1,
    explanation: "Le \'bonding capital\' se développe entre personnes partageant des caractéristiques similaires et renforce l\'identité et le soutien mutuel au sein du groupe."
  },
  {
    id: "q9_reseaux_capital",
    question: "Un réseau social peut-il avoir des aspects négatifs ?",
    options: [
      "Non, par définition un réseau est toujours bénéfique.",
      "Oui, il peut être source de contrôle social excessif ou d\'exclusion.",
      "Seulement s\'il est trop petit.",
      "Uniquement s\'il est composé de liens faibles."
    ],
    correctAnswer: 1,
    explanation: "Les réseaux sociaux peuvent aussi exercer des pressions conformistes, limiter l\'autonomie ou exclure ceux qui n\'en font pas partie (ex: clientélisme)."
  },
  {
    id: "q10_reseaux_capital",
    question: "L\'entretien du capital social ne demande aucun effort particulier.",
    options: ["Vrai", "Faux"],
    correctAnswer: 1,
    explanation: "Le capital social, comme d\'autres formes de capital, nécessite un investissement en temps et en énergie pour maintenir les relations et les mobiliser (travail de sociabilité)."
  }
];

export default function ReseauxCapitalSocialQuizPage() {
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
              <Share2 className="mr-3 h-7 w-7 sm:h-8 sm:w-8 text-socio-purple" />
              {quizTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Testez vos connaissances sur la définition des réseaux sociaux, le concept de capital social et ses implications.
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