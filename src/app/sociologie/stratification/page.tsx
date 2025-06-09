"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpDown, Layers, BarChart, Briefcase, CheckCircle } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

const moduleTitle = "Stratification et mobilité sociale";
const modulePath = "/sociologie";
const accentColor = "socio-purple";

const chapters = [
  {
    id: "theories-classes-sociales",
    title: "Les théories des classes sociales",
    description: "Explorer les différentes approches théoriques des classes sociales selon Marx, Weber et Bourdieu.",
    icon: <Layers className="h-8 w-8" />,
    slug: "theories-classes-sociales",
    isNew: false,
  },
  {
    id: "mesure-mobilite",
    title: "La mesure de la mobilité sociale",
    description: "Comprendre les outils et méthodes permettant d'évaluer la mobilité sociale.",
    icon: <BarChart className="h-8 w-8" />,
    slug: "mesure-mobilite",
    isNew: false,
  },
  {
    id: "determinants-mobilite",
    title: "Les déterminants de la mobilité sociale",
    description: "Analyser les facteurs qui influencent la mobilité sociale intergénérationnelle.",
    icon: <Briefcase className="h-8 w-8" />,
    slug: "determinants-mobilite",
    isNew: false,
  },
  {
    id: "evolution-structure-sociale",
    title: "Évolution de la structure sociale",
    description: "Étudier les transformations de la structure sociale dans les sociétés contemporaines.",
    icon: <ArrowUpDown className="h-8 w-8" />,
    slug: "evolution-structure-sociale",
    isNew: false,
  }
];

export default function StratificationModulePage() {
  const { getChapterProgress } = useProgress();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      <div className="mb-8">
        <Link
          href={modulePath}
          className={`flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-${accentColor} dark:hover:text-${accentColor} mb-2 transition-colors`}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour à la section Sociologie
        </Link>
        <h1 className={`text-3xl font-bold text-${accentColor} mb-2 flex items-center`}>
          <ArrowUpDown className="mr-3 h-8 w-8" /> {moduleTitle}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Ce module examine comment les sociétés sont stratifiées en différentes classes sociales, les phénomènes de mobilité sociale et l'évolution des inégalités.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {chapters.map((chapter) => {
          const progress = getChapterProgress("sociologie", chapter.id);
          const isCompleted = progress && progress.completed;

          return (
            <Link key={chapter.id} href={`/sociologie/stratification/${chapter.slug}`}>
              <div className={`card h-full group hover:border-${accentColor}/80 dark:hover:border-${accentColor}/70 transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-l-4 border-${accentColor}/50`}>
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2.5 rounded-lg bg-${accentColor}/10 dark:bg-${accentColor}/20 text-${accentColor} mb-3 group-hover:scale-110 transition-transform`}>
                    {chapter.icon}
                  </div>
                  {isCompleted && (
                    <div className="flex items-center text-sm text-green-500">
                      <CheckCircle className="h-5 w-5 mr-1" />
                      Terminé
                    </div>
                  )}
                </div>
                <h2 className={`text-xl font-semibold mb-1 text-gray-800 dark:text-white group-hover:text-${accentColor} transition-colors`}>
                  {chapter.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  {chapter.description}
                </p>
                {chapter.isNew && (
                    <span className={`text-xs font-semibold text-white bg-${accentColor} px-2 py-0.5 rounded-full self-start mb-2`}>
                        Nouveau
                    </span>
                )}
                <div className="mt-auto pt-2 border-t border-gray-200 dark:border-gray-700/50">
                    <div className={`text-sm font-medium text-${accentColor} group-hover:underline`}>
                        Commencer le chapitre
                    </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className={`bg-gradient-to-r from-${accentColor}/10 to-${accentColor}/5 dark:from-${accentColor}/20 dark:to-${accentColor}/10 p-6 rounded-lg shadow-sm`}>
        <h2 className={`text-2xl font-bold text-${accentColor} mb-3`}>Point sur le Module</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Assurez-vous d'avoir bien compris les concepts clés de la stratification sociale et de la mobilité sociale.
        </p>
        <Link
          href={`/quiz/sociologie/stratification`}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-${accentColor} hover:bg-${accentColor}/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${accentColor}`}
        >
          Quiz Récapitulatif du Module
        </Link>
      </div>
    </motion.div>
  );
} 