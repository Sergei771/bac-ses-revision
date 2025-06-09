"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  BookMarked, Lightbulb, Info, ListChecks, LineChart, ArrowLeft, CheckCircle, Clock
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

export default function ComportementConsommateurPage() {
  const { updateChapterProgress, getChapterProgress, formatTime } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeSection, setActiveSection] = useState("intro");
  const chapterId = "comportement-consommateur";
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
    { id: "choix", title: "Le choix du consommateur" },
    { id: "utilite", title: "Utilité et contrainte budgétaire" },
    { id: "arbitrages", title: "Arbitrages et préférences" },
    { id: "biais", title: "Biais comportementaux" },
    { id: "conclusion", title: "Conclusion" },
  ];
  const sectionMap = {
    intro: { icon: <Info className="h-5 w-5 mr-1 text-eco-blue" />, label: "Introduction" },
    choix: { icon: <Lightbulb className="h-5 w-5 mr-1 text-green-500" />, label: "Choix du consommateur" },
    utilite: { icon: <Lightbulb className="h-5 w-5 mr-1 text-yellow-400" />, label: "Utilité et contrainte" },
    arbitrages: { icon: <Lightbulb className="h-5 w-5 mr-1 text-purple-500" />, label: "Arbitrages" },
    biais: { icon: <Lightbulb className="h-5 w-5 mr-1 text-pink-500" />, label: "Biais comportementaux" },
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
              Le comportement du consommateur
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Comprendre comment les consommateurs prennent leurs décisions, les contraintes auxquelles ils font face et les biais qui influencent leurs choix.
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
                  <strong>Définition :</strong> Étude des choix des individus face à la rareté et aux contraintes.
                </div>
                <p>
                  Le comportement du consommateur analyse comment les individus prennent leurs décisions d'achat en fonction de leurs préférences, de leur budget et des contraintes du marché.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Choisir entre un fast-food et un restaurant gastronomique selon son budget et ses préférences.
                </div>
                <ul className="mt-4">
                  <li>Choix rationnel et utilité</li>
                  <li>Contraintes budgétaires</li>
                  <li>Arbitrages et préférences</li>
                  <li>Biais comportementaux</li>
                </ul>
              </>
            )}
            {activeSection === "choix" && (
              <>
                <h2>Le choix du consommateur</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Principe :</strong> Maximiser l'utilité sous contrainte budgétaire.
                </div>
                <ul>
                  <li>Préférences individuelles</li>
                  <li>Contraintes de revenu</li>
                  <li>Prix relatifs</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> « Avec 10€, j'achète 2 sandwiches ou 1 pizza. »
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-4 mt-4">
                  <strong>Point clé :</strong> Le choix optimal est celui qui procure la plus grande satisfaction possible.
                </div>
              </>
            )}
            {activeSection === "utilite" && (
              <>
                <h2>Utilité et contrainte budgétaire</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Utilité marginale décroissante :</strong> Chaque unité supplémentaire apporte moins de satisfaction.
                </div>
                <ul>
                  <li>Utilité marginale décroissante</li>
                  <li>Équilibre du consommateur : utilité marginale pondérée par le prix</li>
                  <li>Courbe de demande individuelle</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> « Le premier café du matin est plus apprécié que le troisième. »
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
                  <strong>Schéma mental :</strong> L'équilibre est atteint quand la satisfaction par euro dépensé est la même pour tous les biens.
                </div>
              </>
            )}
            {activeSection === "arbitrages" && (
              <>
                <h2>Arbitrages et préférences</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Courbes d'indifférence :</strong> Représentent les combinaisons de biens procurant le même niveau de satisfaction.
                </div>
                <ul>
                  <li>Courbes d'indifférence</li>
                  <li>Taux marginal de substitution</li>
                  <li>Effet de substitution et effet de revenu</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> « Si le prix du cinéma augmente, je vais plus souvent au théâtre. »
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
                  <strong>Schéma mental :</strong> Le consommateur arbitre en fonction de ses préférences et des prix.
                </div>
              </>
            )}
            {activeSection === "biais" && (
              <>
                <h2>Biais comportementaux</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Rationalité limitée :</strong> Les consommateurs font des erreurs systématiques.
                </div>
                <ul>
                  <li>Biais d'ancrage : on se base sur la première information reçue</li>
                  <li>Effet de dotation : on surévalue ce qu'on possède déjà</li>
                  <li>Préférence pour le présent : on préfère une petite récompense immédiate à une grande plus tard</li>
                  <li>Effet de rareté</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> « Promo limitée : j'achète même si je n'en ai pas besoin. »
                </div>
              </>
            )}
            {activeSection === "conclusion" && (
              <>
                <h2>Conclusion</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Résumé :</strong> Le consommateur arbitre entre préférences, contraintes et biais.
                </div>
                <ul>
                  <li>Le consommateur arbitre en fonction de ses préférences et de ses contraintes</li>
                  <li>Les biais comportementaux remettent en cause l'hypothèse de rationalité parfaite</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4">
                  <strong>Ouverture :</strong> Les politiques publiques (nudges) peuvent corriger certains biais.
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
                  Testez vos connaissances sur le comportement du consommateur.
                </p>
                <Link
                  href="/quiz/economie/comportement-consommateur"
                  className="text-sm text-white bg-eco-blue px-3 py-1.5 rounded inline-flex items-center hover:bg-blue-700 transition-colors relative z-30"
                >
                  Faire le quiz
                  <ArrowLeft className="h-3.5 w-3.5 ml-1 rotate-180" />
                </Link>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-1">Notions clés</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Utilité</li>
                  <li>• Contrainte budgétaire</li>
                  <li>• Arbitrage</li>
                  <li>• Biais comportementaux</li>
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
                    <Link href="/economie/microeconomie/concurrence" className="text-eco-blue hover:underline">
                      La concurrence parfaite et imparfaite
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