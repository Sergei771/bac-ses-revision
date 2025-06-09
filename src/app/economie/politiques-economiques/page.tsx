"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Landmark, DollarSign, TrendingUp, Users, Settings, CheckCircle } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

const moduleTitle = "Politiques Économiques";
const modulePath = "/economie";
const accentColor = "eco-blue";

const chapters = [
  {
    id: "politique-budgetaire",
    title: "La politique budgétaire",
    description: "Comprendre les objectifs, les instruments et les effets de la politique budgétaire sur l'économie.",
    icon: <DollarSign className="h-8 w-8" />,
    slug: "politique-budgetaire",
    isNew: true,
  },
  {
    id: "politique-monetaire",
    title: "La politique monétaire",
    description: "Analyser le rôle de la banque centrale, les instruments de la politique monétaire et son impact sur l'inflation et l'activité.",
    icon: <TrendingUp className="h-8 w-8" />,
    slug: "politique-monetaire",
    isNew: false,
  },
  {
    id: "politiques-emploi",
    title: "Les politiques de l'emploi",
    description: "Étudier les différentes mesures visant à lutter contre le chômage et à favoriser l'insertion professionnelle.",
    icon: <Users className="h-8 w-8" />,
    slug: "politiques-emploi",
    isNew: false,
  },
  {
    id: "regulation-economique",
    title: "La régulation économique",
    description: "Explorer les fondements et les modalités de l'intervention publique pour réguler les marchés et corriger les défaillances.",
    icon: <Settings className="h-8 w-8" />,
    slug: "regulation-economique",
    isNew: false,
  }
];

export default function PolitiquesEconomiquesPage() {
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
          <Landmark className="mr-3 h-8 w-8" /> {moduleTitle}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Analyser les interventions de l'État et des banques centrales dans l'économie.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {chapters.map((chapter) => {
          const progress = getChapterProgress("economie", chapter.id);
          const isCompleted = progress && progress.completed;

          return (
            <Link key={chapter.id} href={`/economie/politiques-economiques/${chapter.slug}`}>
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
          Assurez-vous d'avoir bien compris les concepts clés des politiques économiques pour réussir votre examen.
        </p>
        <Link
          href={`/quiz/economie/politiques-economiques`}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-${accentColor} hover:bg-${accentColor}/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${accentColor}`}
        >
          Quiz Récapitulatif du Module
        </Link>
      </div>
    </motion.div>
  );
} 