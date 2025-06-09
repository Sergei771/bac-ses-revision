"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, TrendingUp, Landmark, Briefcase, Scale, CheckCircle } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

const moduleTitle = "Mondialisation";
const modulePath = "/economie";
const accentColor = "eco-blue";

const chapters = [
  {
    id: "fondements-commerce",
    title: "Les fondements du commerce international",
    description: "Analyser les théories classiques et nouvelles du commerce international, les avantages et les inconvénients de l'échange.",
    icon: <TrendingUp className="h-8 w-8" />,
    slug: "fondements-commerce",
    isNew: false,
  },
  {
    id: "globalisation-financiere",
    title: "La Globalisation Financière : Marchés, Acteurs et Enjeux",
    description: "Explorer l'intégration croissante des marchés financiers mondiaux, ses moteurs, ses bénéfices et ses dangers.",
    icon: <Landmark className="h-8 w-8" />,
    slug: "globalisation-financiere",
    isNew: false,
  },
  {
    id: "firmes-multinationales",
    title: "Les Firmes Multinationales (FMN) : Stratégies, Impacts et Débats",
    description: "Analyser le rôle central des firmes multinationales dans la mondialisation, leurs stratégies d'expansion et les enjeux associés.",
    icon: <Briefcase className="h-8 w-8" />,
    slug: "firmes-multinationales",
    isNew: false,
  },
  {
    id: "desequilibres-mondiaux",
    title: "Les Déséquilibres Mondiaux : Causes, Conséquences et Enjeux",
    description: "Analyser les déséquilibres commerciaux, financiers, sociaux et environnementaux, ainsi que les enjeux de la régulation mondiale.",
    icon: <Scale className="h-8 w-8" />,
    slug: "desequilibres-mondiaux",
    isNew: true,
  }
];

export default function MondialisationPage() {
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
          <Globe className="mr-3 h-8 w-8" /> {moduleTitle}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Comprendre les mécanismes et les enjeux des échanges internationaux et de la globalisation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {chapters.map((chapter) => {
          const progress = getChapterProgress("economie", chapter.id);
          const isCompleted = progress && progress.completed;

          return (
            <Link key={chapter.id} href={`/economie/mondialisation/${chapter.slug}`}>
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
          Assurez-vous d'avoir bien compris les concepts clés de la mondialisation et des échanges internationaux.
        </p>
        <Link
          href={`/quiz/economie/mondialisation`}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-${accentColor} hover:bg-${accentColor}/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${accentColor}`}
        >
          Quiz Récapitulatif du Module
        </Link>
      </div>
    </motion.div>
  );
} 