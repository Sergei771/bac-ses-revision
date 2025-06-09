"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  BookMarked, Lightbulb, Info, ListChecks, LineChart, ArrowLeft, CheckCircle, Clock
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

export default function ConcurrencePage() {
  const { updateChapterProgress, getChapterProgress, formatTime } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeSection, setActiveSection] = useState("intro");
  const chapterId = "concurrence";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!mounted) return;
    intervalRef.current = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (mounted && timeSpent > 0) {
        const progress = getChapterProgress("economie", chapterId);
        updateChapterProgress("economie", chapterId, {
          timeSpent: (progress?.timeSpent || 0) + timeSpent
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
    const progress = getChapterProgress("economie", chapterId);
    if (progress) {
      setIsCompleted(progress.completed);
    }
  }, [getChapterProgress, chapterId]);

  const handleMarkAsCompleted = () => {
    updateChapterProgress("economie", chapterId, {
      completed: !isCompleted
    });
    setIsCompleted(!isCompleted);
  };

  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "parfaite", title: "La concurrence parfaite" },
    { id: "imparfaite", title: "La concurrence imparfaite" },
    { id: "monopole", title: "Le monopole" },
    { id: "oligopole", title: "L'oligopole" },
    { id: "conclusion", title: "Conclusion" },
  ];
  const sectionMap = {
    intro: { icon: <Info className="h-5 w-5 mr-1 text-eco-blue" />, label: "Introduction" },
    parfaite: { icon: <Lightbulb className="h-5 w-5 mr-1 text-green-500" />, label: "Concurrence parfaite" },
    imparfaite: { icon: <Lightbulb className="h-5 w-5 mr-1 text-yellow-400" />, label: "Concurrence imparfaite" },
    monopole: { icon: <Lightbulb className="h-5 w-5 mr-1 text-purple-500" />, label: "Monopole" },
    oligopole: { icon: <Lightbulb className="h-5 w-5 mr-1 text-pink-500" />, label: "Oligopole" },
    conclusion: { icon: <ListChecks className="h-5 w-5 mr-1 text-eco-blue" />, label: "Conclusion" },
  } as const;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/economie/microeconomie"
          className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour à la microéconomie
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <LineChart className="mr-2 h-8 w-8 text-eco-blue" />
              La concurrence parfaite et imparfaite
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Comprendre les différents types de marchés et leurs implications sur la formation des prix et l'efficacité économique.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="h-5 w-5 mr-1" />
              <span>Temps: {formatTime(timeSpent)}</span>
            </div>
            <button
              onClick={handleMarkAsCompleted}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isCompleted
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              <CheckCircle className="h-5 w-5 mr-1" />
              {isCompleted ? "Terminé" : "Marquer comme terminé"}
            </button>
          </div>
        </div>
      </div>
      {/* Contenu principal avec sommaire et sidebar alignés */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sommaire */}
        <nav className="md:w-56 w-full md:sticky md:top-24 self-start bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-8 md:mb-0 flex-shrink-0">
          <ul className="space-y-2 md:space-y-2 flex md:flex-col flex-row overflow-x-auto">
            {sections.map(section => (
              <li key={section.id} className="flex-1 md:flex-none">
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors text-left focus:outline-none focus:ring-2 focus:ring-eco-blue ${
                    activeSection === section.id
                      ? "bg-eco-blue text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                  aria-current={activeSection === section.id ? "page" : undefined}
                >
                  {sectionMap[section.id as keyof typeof sectionMap].icon}
                  <span className="hidden md:inline">{sectionMap[section.id as keyof typeof sectionMap].label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* Contenu principal */}
        <div className="flex-1 min-w-0">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 prose dark:prose-invert max-w-none"
            style={{ position: 'relative', zIndex: 1 }}
          >
            {activeSection === "intro" && (
              <>
                <h2>Introduction</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Définition :</strong> Un marché peut être parfaitement ou imparfaitement concurrentiel selon le nombre d'acteurs, la nature des produits, l'information disponible, etc.
                </div>
                <p>
                  Comprendre la structure du marché est essentiel pour analyser le fonctionnement de l'économie.
                </p>
                <ul>
                  <li>Concurrence parfaite : de nombreux offreurs et demandeurs, produit homogène</li>
                  <li>Concurrence imparfaite : monopole, oligopole, concurrence monopolistique</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Le marché des fruits sur un marché local (proche de la concurrence parfaite) vs le marché de l'électricité (monopole naturel).
                </div>
              </>
            )}
            {activeSection === "parfaite" && (
              <>
                <h2>La concurrence parfaite</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Définition :</strong> Marché où aucun acteur n'a d'influence sur le prix.
                </div>
                <ul>
                  <li>Atomicité (beaucoup d'offre/demande)</li>
                  <li>Homogénéité du produit</li>
                  <li>Libre entrée/sortie</li>
                  <li>Transparence de l'information</li>
                  <li>Mobilité des facteurs</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Marché du blé, marché boursier (en théorie)
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
                  <strong>Schéma mental :</strong> Tous les vendeurs sont des « preneurs de prix ».
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-4 mt-4">
                  <strong>Point clé :</strong> Le prix d'équilibre maximise le bien-être collectif.
                </div>
              </>
            )}
            {activeSection === "imparfaite" && (
              <>
                <h2>La concurrence imparfaite</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Définition :</strong> Au moins une condition de la concurrence parfaite n'est pas respectée.
                </div>
                <ul>
                  <li>Différenciation des produits (ex : smartphones)</li>
                  <li>Barrières à l'entrée (brevets, coûts fixes)</li>
                  <li>Information imparfaite (publicité, opacité)</li>
                  <li>Nombre limité d'offreurs (oligopole, monopole)</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Marché de l'automobile, téléphonie mobile.
                </div>
              </>
            )}
            {activeSection === "monopole" && (
              <>
                <h2>Le monopole</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Définition :</strong> Un seul producteur, prix fixé par l'offre.
                </div>
                <ul>
                  <li>Sources : brevets, ressources rares, barrières légales</li>
                  <li>Conséquences : prix plus élevé, quantité plus faible, perte sèche de bien-être</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> SNCF (avant ouverture à la concurrence), Microsoft (années 2000 sur les OS)
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/40 rounded-lg p-4 mt-4">
                  <strong>À retenir :</strong> Le monopole peut favoriser l'innovation… mais aussi l'inefficacité.
                </div>
              </>
            )}
            {activeSection === "oligopole" && (
              <>
                <h2>L'oligopole</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Définition :</strong> Quelques entreprises dominent, forte interdépendance.
                </div>
                <ul>
                  <li>Ententes/cartels (ex : OPEP)</li>
                  <li>Guerre des prix (ex : grande distribution)</li>
                  <li>Interdépendance stratégique</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Marché de l'essence, télécoms.
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-4 mt-4">
                  <strong>Point clé :</strong> L'oligopole peut conduire à des prix plus élevés ou à une forte concurrence selon les stratégies.
                </div>
              </>
            )}
            {activeSection === "conclusion" && (
              <>
                <h2>Conclusion</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Résumé :</strong> La concurrence parfaite est un idéal, la plupart des marchés sont imparfaits.
                </div>
                <ul>
                  <li>La concurrence parfaite est un idéal rarement atteint</li>
                  <li>Les marchés réels sont souvent imparfaits</li>
                  <li>La régulation vise à limiter les abus de position dominante</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4">
                  <strong>Ouverture :</strong> Les politiques publiques cherchent à limiter les abus (ex : Autorité de la concurrence).
                </div>
              </>
            )}
          </motion.div>
        </div>
        {/* Sidebar */}
        <div className="md:col-span-1 w-full md:w-56 xl:w-64">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:sticky md:top-24 relative z-20 mt-8 md:mt-0">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <BookMarked className="h-5 w-5 mr-2 text-eco-blue" />
              Ressources
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-eco-blue mb-1">Quiz associé</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Testez vos connaissances sur la concurrence parfaite et imparfaite.
                </p>
                <Link
                  href="/quiz/economie/concurrence"
                  className="text-sm text-white bg-eco-blue px-3 py-1.5 rounded inline-flex items-center hover:bg-blue-700 transition-colors relative z-30"
                >
                  Faire le quiz
                  <ArrowLeft className="h-3.5 w-3.5 ml-1 rotate-180" />
                </Link>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-1">Notions clés</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Concurrence parfaite</li>
                  <li>• Concurrence imparfaite</li>
                  <li>• Monopole</li>
                  <li>• Oligopole</li>
                  <li>• Barrières à l'entrée</li>
                </ul>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-1">Chapitres liés</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <Link href="/economie/microeconomie/marche-prix" className="text-eco-blue hover:underline">
                      Le marché et la formation des prix
                    </Link>
                  </li>
                  <li>
                    <Link href="/economie/microeconomie/defaillances-marche" className="text-eco-blue hover:underline">
                      Les défaillances du marché
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 