"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Users, CheckCircle, Network, Smartphone, History } from "lucide-react"; 
import { useProgress } from "@/hooks/useProgress";

const moduleTitle = "Groupes et Réseaux Sociaux";
const modulePath = "/sociologie";
const accentColor = "socio-purple"; // Couleur d'accentuation pour ce module

const chapters = [
  {
    id: "definition-typologie",
    title: "Les groupes sociaux : définition et typologie",
    description: "Comprendre ce qu'est un groupe social et distinguer ses différentes formes (primaire, secondaire, d'appartenance, de référence).",
    icon: <Users className="h-8 w-8" />,
    slug: "definition-typologie",
    isNew: false,
  },
  {
    id: "reseaux-capital-social",
    title: "Les réseaux sociaux et le capital social",
    description: "Analyser la structure des réseaux sociaux et le concept de capital social selon Bourdieu et Putnam.",
    icon: <Network className="h-8 w-8" />,
    slug: "reseaux-capital-social",
    isNew: false,
  },
  {
    id: "sociabilite-numerique",
    title: "La sociabilité numérique",
    description: "Explorer les nouvelles formes de sociabilité liées à internet et aux réseaux sociaux numériques.",
    icon: <Smartphone className="h-8 w-8" />,
    slug: "sociabilite-numerique",
    isNew: false,
  },
  {
    id: "evolution-sociabilite",
    title: "L\'évolution des formes de sociabilité",
    description: "Étudier comment les manières d'entrer en relation et de \"faire société\" se transforment.",
    icon: <History className="h-8 w-8" />,
    slug: "evolution-sociabilite",
    isNew: true,
  },
];

export default function GroupesSociauxModulePage() {
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
          <Network className="mr-3 h-8 w-8" /> {moduleTitle} {/* Network comme icône principale du module */}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Ce module examine la manière dont les individus s'associent, forment des groupes, interagissent au sein de réseaux et comment ces dynamiques structurent la société.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {chapters.map((chapter) => {
          const progress = getChapterProgress("sociologie", chapter.id);
          const isCompleted = progress && progress.completed;

          return (
            <Link key={chapter.id} href={`/sociologie/groupes-sociaux/${chapter.slug}`}>
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
          Assurez-vous d'avoir bien compris les concepts clés des groupes et réseaux sociaux pour réussir votre examen.
        </p>
        <Link
          href={`/quiz/sociologie/groupes-sociaux`}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-${accentColor} hover:bg-${accentColor}/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${accentColor}`}
        >
          Quiz Récapitulatif du Module
        </Link>
      </div>
    </motion.div>
  );
} 