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

export default function DefaillancesMarchePage() {
  const { updateChapterProgress, getChapterProgress, formatTime } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeSection, setActiveSection] = useState("intro");
  const chapterId = "defaillances-marche";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Démarrer le suivi du temps
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

  // Charger l'état initial
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
    { id: "externalites", title: "Les externalités" },
    { id: "biens-publics", title: "Les biens publics" },
    { id: "asymetrie-info", title: "L'asymétrie d'information" },
    { id: "pouvoir-marche", title: "Le pouvoir de marché" },
    { id: "conclusion", title: "Conclusion" },
  ];

  // Sommaire flottant
  const sectionMap = {
    intro: { icon: <Info className="h-5 w-5 mr-1 text-eco-blue" />, label: "Introduction" },
    externalites: { icon: <Lightbulb className="h-5 w-5 mr-1 text-yellow-400" />, label: "Les externalités" },
    "biens-publics": { icon: <Lightbulb className="h-5 w-5 mr-1 text-green-500" />, label: "Les biens publics" },
    "asymetrie-info": { icon: <Lightbulb className="h-5 w-5 mr-1 text-purple-500" />, label: "L'asymétrie d'information" },
    "pouvoir-marche": { icon: <Lightbulb className="h-5 w-5 mr-1 text-pink-500" />, label: "Le pouvoir de marché" },
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
              Les défaillances du marché
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Analyser les situations où le marché ne parvient pas à une allocation optimale des ressources et comprendre les solutions possibles.
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

      {/* Contenu */}
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
                <h2>Introduction aux défaillances du marché</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Définition :</strong> Les défaillances du marché désignent les situations où le mécanisme de marché ne parvient pas à assurer une allocation optimale des ressources.
                </div>
                <p>
                  Ces situations justifient souvent l'intervention de l'État pour corriger les inefficacités du marché.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Pollution, biens publics, asymétrie d'information, monopoles.
                </div>
                <ul className="mt-4">
                  <li>Les externalités (positives et négatives)</li>
                  <li>Les biens publics</li>
                  <li>L'asymétrie d'information</li>
                  <li>Le pouvoir de marché</li>
                </ul>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
                  <strong>Schéma mental :</strong> Quand le marché seul ne suffit pas, l'État ou d'autres solutions interviennent.
                </div>
              </>
            )}

            {activeSection === "externalites" && (
              <>
                <h2>Les externalités</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Définition :</strong> Une externalité est un effet secondaire d'une activité économique qui affecte des tiers sans compensation monétaire.
                </div>
                <h3>Externalités négatives</h3>
                <ul>
                  <li>Pollution industrielle</li>
                  <li>Bruit des transports</li>
                  <li>Congestion routière</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Une usine qui pollue un fleuve affecte les riverains sans payer pour ce dommage.
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-4 mt-4">
                  <strong>Point clé :</strong> Le marché produit trop de biens à externalités négatives car le coût social n'est pas pris en compte.
                </div>
                <h3>Externalités positives</h3>
                <ul>
                  <li>Vaccination</li>
                  <li>Recherche et développement</li>
                  <li>Éducation</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Se faire vacciner protège aussi les autres.
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-4 mt-4">
                  <strong>Point clé :</strong> Le marché produit trop peu de biens à externalités positives car le bénéfice social n'est pas pris en compte.
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
                  <strong>Schéma mental :</strong> Externalité négative : coût caché. Externalité positive : bénéfice caché.
                </div>
                <h3>Solutions</h3>
                <ul>
                  <li>Taxation (négative), subventions (positive)</li>
                  <li>Marchés de droits à polluer</li>
                  <li>Réglementation</li>
                  <li>Négociation privée (théorème de Coase)</li>
                </ul>
              </>
            )}

            {activeSection === "biens-publics" && (
              <>
                <h2>Les biens publics</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Définition :</strong> Un bien public pur est non-rival (consommation par un n'empêche pas l'autre) et non-excluable (impossible d'empêcher l'accès).
                </div>
                <ul>
                  <li>Défense nationale</li>
                  <li>Éclairage public</li>
                  <li>Recherche fondamentale</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Tout le monde profite de l'éclairage public sans exclusion.
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-4 mt-4">
                  <strong>Point clé :</strong> Le marché sous-produit les biens publics à cause du problème du passager clandestin.
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
                  <strong>Schéma mental :</strong> Passager clandestin : profiter sans payer.
                </div>
                <h3>Solutions</h3>
                <ul>
                  <li>Production publique financée par l'impôt</li>
                  <li>Production privée subventionnée</li>
                  <li>Mécanismes de contribution volontaire</li>
                  <li>Transformation en bien de club</li>
                </ul>
              </>
            )}

            {activeSection === "asymetrie-info" && (
              <>
                <h2>L'asymétrie d'information</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Définition :</strong> Situation où certains agents disposent d'informations que d'autres n'ont pas.
                </div>
                <ul>
                  <li>Antisélection (sélection adverse)</li>
                  <li>Aléa moral</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Assurance : l'assureur ne connaît pas le risque réel du client.
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-4 mt-4">
                  <strong>Point clé :</strong> L'asymétrie d'information peut faire disparaître le marché ou le rendre inefficace.
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
                  <strong>Schéma mental :</strong> Antisélection : seuls les mauvais risques restent. Aléa moral : comportement risqué après contrat.
                </div>
                <h3>Solutions</h3>
                <ul>
                  <li>Signalisation (diplômes, labels)</li>
                  <li>Screening (tests, questionnaires)</li>
                  <li>Incitations (bonus/malus)</li>
                  <li>Réglementation</li>
                </ul>
              </>
            )}

            {activeSection === "pouvoir-marche" && (
              <>
                <h2>Le pouvoir de marché</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Définition :</strong> Capacité d'une entreprise à influencer le prix du marché.
                </div>
                <ul>
                  <li>Barrières à l'entrée</li>
                  <li>Économies d'échelle</li>
                  <li>Brevets et droits de propriété intellectuelle</li>
                  <li>Contrôle des ressources essentielles</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4">
                  <strong>Exemple :</strong> Monopole de la SNCF sur certaines lignes.
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-4 mt-4">
                  <strong>Point clé :</strong> Le pouvoir de marché conduit à des prix plus élevés et une production inférieure à l'optimum social.
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
                  <strong>Schéma mental :</strong> {"Monopole = prix > coût marginal, production < optimum."}
                </div>
                <h3>Solutions</h3>
                <ul>
                  <li>Régulation des prix</li>
                  <li>Politique de la concurrence</li>
                  <li>Nationalisation</li>
                  <li>Promotion de l'entrée de nouveaux concurrents</li>
                </ul>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2>Conclusion</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <strong>Résumé :</strong> Les défaillances du marché justifient parfois l'intervention publique, mais il faut évaluer au cas par cas.
                </div>
                <ul>
                  <li>L'intervention publique n'est pas toujours la meilleure solution</li>
                  <li>Les solutions de marché peuvent parfois être efficaces</li>
                  <li>Il faut évaluer le coût de l'intervention par rapport à ses bénéfices</li>
                  <li>Les défaillances du marché ne justifient pas une intervention systématique</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-4">
                  <strong>Ouverture :</strong> Comprendre les défaillances du marché permet d'évaluer l'efficacité des politiques publiques et de concevoir des solutions adaptées.
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
                  Testez vos connaissances sur les défaillances du marché.
                </p>
                <Link
                  href="/quiz/economie/defaillances-marche"
                  className="text-sm text-white bg-eco-blue px-3 py-1.5 rounded inline-flex items-center hover:bg-blue-700 transition-colors relative z-30"
                >
                  Faire le quiz
                  <ArrowLeft className="h-3.5 w-3.5 ml-1 rotate-180" />
                </Link>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-1">Notions clés</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Externalités positives et négatives</li>
                  <li>• Biens publics et passager clandestin</li>
                  <li>• Asymétrie d'information</li>
                  <li>• Pouvoir de marché</li>
                  <li>• Solutions aux défaillances</li>
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