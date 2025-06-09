"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, BookCopy, ListChecks, Edit3, CheckCircle } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

const moduleTitle = "Contrôle social et déviance";
const modulePath = "/sociologie";
const accentColor = "socio-purple";

const chapters = [
  {
    id: "normes-deviance",
    title: "Normes et déviance",
    description: "Comprendre ce que sont les normes sociales et comment la déviance est définie.",
    icon: <BookCopy className="h-8 w-8" />,
    slug: "normes-deviance",
    isNew: false,
  },
  {
    id: "formes-controle-social",
    title: "Les formes du contrôle social",
    description: "Explorer les mécanismes par lesquels la société régule les comportements.",
    icon: <ListChecks className="h-8 w-8" />,
    slug: "formes-controle-social",
    isNew: true,
  },
  {
    id: "construction-sociale-deviance",
    title: "La construction sociale de la déviance",
    description: "Analyser comment la déviance est un produit de processus sociaux et d'étiquetage.",
    icon: <Edit3 className="h-8 w-8" />,
    slug: "construction-sociale-deviance",
    isNew: false,
  },
  {
    id: "evolution-delinquance",
    title: "Évolution des formes de délinquance",
    description: "Étudier les transformations des actes délinquants et leur mesure.",
    icon: <Shield className="h-8 w-8" />,
    slug: "evolution-delinquance",
    isNew: false,
  }
];

export default function ControleSocialDevianceModulePage() {
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
          <Shield className="mr-3 h-8 w-8" /> {moduleTitle}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Ce module explore les mécanismes par lesquels les sociétés maintiennent l'ordre social, définissent et réagissent à la déviance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {chapters.map((chapter) => {
          const progress = getChapterProgress("sociologie", chapter.id);
          const isCompleted = progress && progress.completed;

          return (
            <Link key={chapter.id} href={`/sociologie/controle-social-deviance/${chapter.slug}`}>
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
          Assurez-vous d'avoir bien compris les concepts clés du contrôle social et de la déviance.
        </p>
        <Link
          href={`/quiz/sociologie/controle-social-deviance`}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-${accentColor} hover:bg-${accentColor}/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${accentColor}`}
        >
          Quiz Récapitulatif du Module
        </Link>
      </div>
    </motion.div>
  );
} 