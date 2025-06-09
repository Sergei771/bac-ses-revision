"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, LineChart, Scale, Lightbulb, User, CheckCircle } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

const moduleTitle = "Microéconomie";
const modulePath = "/economie";
const accentColor = "eco-blue";

const chapters = [
  {
    id: "marche-prix",
    title: "Le marché et la formation des prix",
    description: "Comprendre les mécanismes de l'offre et de la demande et la formation des prix sur un marché concurrentiel.",
    icon: <Scale className="h-8 w-8" />,
    slug: "marche-prix",
    isNew: false,
  },
  {
    id: "defaillances-marche",
    title: "Les défaillances du marché",
    description: "Analyser les situations où le marché ne parvient pas à une allocation optimale des ressources.",
    icon: <Lightbulb className="h-8 w-8" />,
    slug: "defaillances-marche",
    isNew: false,
  },
  {
    id: "structures-marche",
    title: "Les structures de marché",
    description: "Étudier les différentes formes de marché : concurrence pure et parfaite, monopole, oligopole, concurrence monopolistique.",
    icon: <LineChart className="h-8 w-8" />,
    slug: "structures-marche",
    isNew: false,
  },
  {
    id: "comportement-consommateur",
    title: "Le comportement du consommateur",
    description: "Comprendre les choix des consommateurs et la notion d'utilité marginale.",
    icon: <User className="h-8 w-8" />,
    slug: "comportement-consommateur",
    isNew: false,
  },
];

export default function MicroeconomiePage() {
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
          Retour à la section Économie
        </Link>
        <h1 className={`text-3xl font-bold text-${accentColor} mb-2 flex items-center`}>
          <LineChart className="mr-3 h-8 w-8" /> {moduleTitle}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          La microéconomie étudie le comportement économique au niveau des agents individuels 
          (consommateurs, entreprises) et les mécanismes de formation des prix sur les marchés.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {chapters.map((chapter) => {
          const progress = getChapterProgress("economie", chapter.id);
          const isCompleted = progress && progress.completed;

          return (
            <Link key={chapter.id} href={`/economie/microeconomie/${chapter.slug}`}>
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
          Assurez-vous d'avoir bien compris les concepts clés de la microéconomie pour réussir votre examen.
        </p>
        <Link
          href={`/quiz/economie/microeconomie`}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-${accentColor} hover:bg-${accentColor}/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${accentColor}`}
        >
          Quiz Récapitulatif du Module
        </Link>
      </div>
    </motion.div>
  );
}
