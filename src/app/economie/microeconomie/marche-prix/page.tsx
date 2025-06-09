"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  LineChart, 
  ArrowLeft,
  BookMarked,
  Lightbulb,
  Info,
  ListChecks
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

export default function MarchePrixPage() {
  const { updateChapterProgress, getChapterProgress, formatTime } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeSection, setActiveSection] = useState("intro");
  const chapterId = "marche-prix";
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
    { id: "offre-demande", title: "L'offre et la demande" },
    { id: "equilibre", title: "L'équilibre du marché" },
    { id: "elasticite", title: "L'élasticité" },
    { id: "surplus", title: "Le surplus du consommateur et du producteur" },
    { id: "conclusion", title: "Conclusion" },
  ];

  // Sommaire flottant
  const sectionMap = {
    intro: { icon: <Info className="h-5 w-5 mr-1 text-eco-blue" />, label: "Introduction" },
    "offre-demande": { icon: <Lightbulb className="h-5 w-5 mr-1 text-yellow-400" />, label: "L'offre et la demande" },
    equilibre: { icon: <Lightbulb className="h-5 w-5 mr-1 text-green-500" />, label: "L'équilibre du marché" },
    elasticite: { icon: <Lightbulb className="h-5 w-5 mr-1 text-purple-500" />, label: "L'élasticité" },
    surplus: { icon: <Lightbulb className="h-5 w-5 mr-1 text-pink-500" />, label: "Le surplus du consommateur et du producteur" },
    conclusion: { icon: <ListChecks className="h-5 w-5 mr-1 text-eco-blue" />, label: "Conclusion" },
  } as const;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
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
              Le marché et la formation des prix
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Comprendre les mécanismes de l'offre et de la demande et la formation des prix sur un marché concurrentiel.
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

      {/* Navigation des sections */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sommaire flottant */}
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
                  <strong>Définition :</strong> Le marché est le lieu (réel ou virtuel) où se rencontrent l'offre et la demande d'un bien ou service.
                </div>
                <p>
                  Comprendre les mécanismes de marché est essentiel pour analyser comment se forment les prix dans une économie de marché.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Le marché des fruits, la bourse, le marché de l'immobilier.
                </div>
                <ul className="mt-4">
                  <li>Les concepts fondamentaux de l'offre et de la demande</li>
                  <li>Comment se détermine l'équilibre sur un marché</li>
                  <li>Les notions d'élasticité-prix de l'offre et de la demande</li>
                  <li>Le concept de surplus du consommateur et du producteur</li>
                </ul>
              </>
            )}

            {activeSection === "offre-demande" && (
              <>
                <h2>L'offre et la demande</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Définition :</strong> L'offre représente la quantité qu'un producteur est prêt à vendre à chaque prix, la demande la quantité qu'un consommateur est prêt à acheter.
                </div>
                <h3>La demande</h3>
                <ul>
                  <li>La demande diminue quand le prix augmente (loi de la demande)</li>
                  <li>Facteurs : prix, revenu, prix des biens liés, goûts, anticipations</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Si le prix des pommes baisse, la demande augmente.
                </div>
                <h3>L'offre</h3>
                <ul>
                  <li>L'offre augmente quand le prix augmente (loi de l'offre)</li>
                  <li>Facteurs : prix, coûts de production, technologie, anticipations, nombre de producteurs</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Si le prix du blé augmente, les agriculteurs produisent plus de blé.
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
                  <strong>Schéma mental :</strong> La courbe de demande est décroissante, la courbe d'offre est croissante.
                </div>
              </>
            )}

            {activeSection === "equilibre" && (
              <>
                <h2>L'équilibre du marché</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Définition :</strong> L'équilibre est atteint quand la quantité offerte = quantité demandée. Le prix d'équilibre s'ajuste pour équilibrer le marché.
                </div>
                <ul>
                  <li>Si prix {'>'} prix d'équilibre : surplus, baisse des prix</li>
                  <li>Si prix {'<'} prix d'équilibre : pénurie, hausse des prix</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Soldes : trop de stock → baisse des prix.
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
                  <strong>Schéma mental :</strong> Le marché s'autorégule par les variations de prix.
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-4 mt-4">
                  <strong>Point clé :</strong> L'équilibre maximise le bien-être collectif (premier théorème du bien-être).
                </div>
              </>
            )}

            {activeSection === "elasticite" && (
              <>
                <h2>L'élasticité</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Définition :</strong> L'élasticité mesure la sensibilité de la demande ou de l'offre à une variation du prix.
                </div>
                <ul>
                  <li>Élasticité-prix de la demande : variation de la quantité demandée quand le prix varie</li>
                  <li>Élasticité-prix de l'offre : variation de la quantité offerte quand le prix varie</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Si le prix de l'essence augmente, la demande baisse peu (demande inélastique).
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
                  <strong>Schéma mental :</strong> Plus la courbe est plate, plus l'élasticité est forte.
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-4 mt-4">
                  <strong>Point clé :</strong> L'élasticité permet de prévoir l'effet d'une variation de prix sur le marché.
                </div>
              </>
            )}

            {activeSection === "surplus" && (
              <>
                <h2>Le surplus du consommateur et du producteur</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Définition :</strong> Le surplus mesure le gain de bien-être des consommateurs et des producteurs sur le marché.
                </div>
                <ul>
                  <li>Surplus du consommateur : différence entre le prix qu'il est prêt à payer et le prix payé</li>
                  <li>Surplus du producteur : différence entre le prix auquel il vend et son coût marginal</li>
                  <li>Surplus total = bien-être collectif</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Soldes, enchères, marchés concurrentiels.
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
                  <strong>Schéma mental :</strong> Le surplus est l'aire entre la courbe de demande (ou d'offre) et le prix du marché.
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-4 mt-4">
                  <strong>Point clé :</strong> Un marché concurrentiel maximise le surplus total.
                </div>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2>Conclusion</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Résumé :</strong> L'analyse de l'offre et de la demande explique la formation des prix et l'allocation des ressources.
                </div>
                <ul>
                  <li>La loi de la demande : la quantité demandée diminue lorsque le prix augmente</li>
                  <li>La loi de l'offre : la quantité offerte augmente lorsque le prix augmente</li>
                  <li>L'équilibre du marché : point où l'offre égale la demande</li>
                  <li>L'élasticité-prix : mesure de la sensibilité de l'offre ou de la demande aux variations de prix</li>
                  <li>Le surplus du consommateur et du producteur : mesures du bien-être généré par le marché</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4">
                  <strong>Ouverture :</strong> Ce modèle de base peut être enrichi pour prendre en compte des situations plus complexes, comme les défaillances du marché ou les différentes structures de marché.
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
                  Testez vos connaissances sur le marché et la formation des prix.
                </p>
                <Link
                  href="/quiz/economie/marche-prix"
                  className="text-sm text-white bg-eco-blue px-3 py-1.5 rounded inline-flex items-center hover:bg-blue-700 transition-colors relative z-30"
                >
                  Faire le quiz
                  <ArrowLeft className="h-3.5 w-3.5 ml-1 rotate-180" />
                </Link>
              </div>

              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-medium text-yellow-700 dark:text-yellow-300 mb-1">Graphique interactif</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Visualisez l'offre, la demande et l'équilibre du marché.
                </p>
                <Link
                  href="/economie/graphiques/offre-demande"
                  className="text-sm text-white bg-yellow-600 px-3 py-1.5 rounded inline-flex items-center hover:bg-yellow-700 transition-colors relative z-30"
                >
                  Voir le graphique
                  <LineChart className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-1">Notions clés</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Offre et demande</li>
                  <li>• Prix d'équilibre</li>
                  <li>• Élasticité-prix</li>
                  <li>• Surplus du consommateur</li>
                  <li>• Surplus du producteur</li>
                </ul>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-1">Chapitres liés</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <Link href="/economie/microeconomie/defaillances-marche" className="text-eco-blue hover:underline">
                      Les défaillances du marché
                    </Link>
                  </li>
                  <li>
                    <Link href="/economie/microeconomie/structures-marche" className="text-eco-blue hover:underline">
                      Les structures de marché
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
