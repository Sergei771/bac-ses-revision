"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  CheckCircle, 
  Clock, 
  FileText,
  HelpCircle, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  BarChart3,
  BookMarked,
  ListChecks,
  Info
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

// Définition des types pour les sections et notions clés
interface Notion {
  id: string;
  title: string;
  explication: string;
}

const slug = "fondements-commerce";
const chapterTitle = "Les fondements du commerce international";

export default function FondementsCommercePage() {
  const { getChapterProgress, updateChapterProgress, formatTime } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeSection, setActiveSection] = useState("introduction");
  const chapterId = "fondements-commerce";

  useEffect(() => {
    if (!mounted) return;

    const progress = getChapterProgress("economie", chapterId);
    if (progress) {
      setTimeSpent(progress.timeSpent);
      setIsCompleted(progress.completed);
    }
    
    if (!isCompleted) {
        intervalRef.current = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
        clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      updateChapterProgress("economie", chapterId, { timeSpent: timeSpent, completed: isCompleted });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      updateChapterProgress("economie", chapterId, { timeSpent: timeSpent, completed: isCompleted });
    }
    if (isCompleted && intervalRef.current) {
      clearInterval(intervalRef.current);
    } else if (!isCompleted && mounted && !intervalRef.current) {
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted, timeSpent, mounted]);

  const handleMarkAsCompleted = () => {
    const newCompletedStatus = !isCompleted;
    setIsCompleted(newCompletedStatus);
  };

  const notionsCles: Notion[] = [
    { id: "avantage-absolu", title: "Avantage Absolu (A. Smith)", explication: "Capacité d'un pays à produire un bien avec moins de facteurs de production qu'un autre." },
    { id: "avantage-comparatif", title: "Avantage Comparatif (D. Ricardo)", explication: "Spécialisation là où le désavantage productif est le plus faible." },
    { id: "dotation-factorielle", title: "Dotation Factorielle (HOS)", explication: "Spécialisation selon l'abondance relative des facteurs de production." },
    { id: "commerce-intrabranche", title: "Commerce Intra-branche", explication: "Échange de produits similaires (différenciation, économies d'échelle)." },
    { id: "protectionnisme", title: "Protectionnisme", explication: "Mesures pour protéger les producteurs nationaux (droits de douane, quotas)." },
    { id: "libre-echange", title: "Libre-échange", explication: "Suppression des barrières aux échanges." },
  ];

  const pageSections = [
    { id: "introduction", title: "Introduction" },
    { id: "theories-classiques", title: "Théories Classiques" },
    { id: "nouvelles-theories", title: "Nouvelles Théories" },
    { id: "avantages-limites", title: "Avantages et Limites" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionIconMap = {
    introduction: { icon: <Info className="h-5 w-5 mr-1 text-eco-blue" />, label: "Introduction" },
    "theories-classiques": { icon: <BookOpen className="h-5 w-5 mr-1 text-blue-500" />, label: "Théories Classiques" },
    "nouvelles-theories": { icon: <TrendingUp className="h-5 w-5 mr-1 text-purple-500" />, label: "Nouvelles Théories" },
    "avantages-limites": { icon: <BarChart3 className="h-5 w-5 mr-1 text-yellow-500" />, label: "Avantages & Limites" },
    conclusion: { icon: <ListChecks className="h-5 w-5 mr-1 text-eco-blue" />, label: "Conclusion" },
  } as const;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/economie/mondialisation" className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour à la section Mondialisation
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <FileText className="mr-2 h-8 w-8 text-eco-blue" /> {chapterTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Analyser les théories, les avantages et les inconvénients des échanges internationaux.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600 dark:text-gray-300"><Clock className="h-5 w-5 mr-1" /><span>Temps: {formatTime(timeSpent)}</span></div>
            <button 
                onClick={handleMarkAsCompleted}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isCompleted ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}
            >
                <CheckCircle className="h-5 w-5 mr-1" />{isCompleted ? "Terminé" : "Marquer comme terminé"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sommaire */}
        <nav className="md:w-64 w-full md:sticky md:top-24 self-start bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-8 md:mb-0 flex-shrink-0">
          <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Sommaire</h3>
          <ul className="space-y-2 md:space-y-2 flex md:flex-col flex-row overflow-x-auto">
            {pageSections.map(section => (
              <li key={section.id} className="flex-1 md:flex-none">
                <button 
                  onClick={() => setActiveSection(section.id)} 
                  className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors text-left focus:outline-none focus:ring-2 focus:ring-eco-blue ${activeSection === section.id ? "bg-eco-blue text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"}`}
                  aria-current={activeSection === section.id ? "page" : undefined}
                >
                  {sectionIconMap[section.id as keyof typeof sectionIconMap].icon} 
                  <span className="hidden md:inline ml-2">{sectionIconMap[section.id as keyof typeof sectionIconMap].label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Contenu principal du chapitre */}
        <div className="flex-1 min-w-0">
          <motion.div 
            key={activeSection} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }} 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 prose dark:prose-invert max-w-none"
          >
            
            {activeSection === "introduction" && (
              <>
                <h2><Info className="inline h-6 w-6 mr-2 text-eco-blue" />Introduction au commerce international</h2>
                <p>Le commerce international désigne l'ensemble des échanges de biens et de services entre les agents économiques résidant sur des territoires différents (pays). Il est un moteur essentiel de la mondialisation économique et a connu une expansion spectaculaire depuis la seconde moitié du XXe siècle.</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-eco-blue mb-2">Pourquoi les pays échangent-ils ?</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Accès à des biens et services non disponibles localement.</li>
                    <li>Bénéficier de coûts de production plus faibles à l'étranger.</li>
                    <li>Augmenter la diversité des produits pour les consommateurs.</li>
                    <li>Stimuler la concurrence et l'innovation.</li>
                  </ul>
                </div>
                <p>Ce chapitre explore les principales théories expliquant pourquoi et comment les nations commercent entre elles, ainsi que les avantages et les limites de ces échanges.</p>
              </>
            )}

            {activeSection === "theories-classiques" && (
              <>
                <h2><BookOpen className="inline h-6 w-6 mr-2 text-blue-500" />Théories classiques de l'échange</h2>
                <p>Les premières théories du commerce international cherchent à expliquer les gains à l'échange basés sur les différences de coûts de production entre pays.</p>
                <div className="my-4 p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">1. L'avantage absolu d'Adam Smith (1776)</h4>
                  <p className="text-sm">Adam Smith, dans "La Richesse des Nations", explique qu'un pays a intérêt à se spécialiser dans la production des biens pour lesquels il détient un <strong className="font-semibold">avantage absolu</strong>, c'est-à-dire qu'il peut produire plus efficacement (avec moins de facteurs de production) que les autres pays. Il doit ensuite échanger ces biens contre ceux que d'autres pays produisent plus efficacement.</p>
                  <p className="mt-2 text-xs italic">Exemple: Si le Portugal produit du vin avec moins d'heures de travail que l'Angleterre, et l'Angleterre du drap avec moins d'heures de travail que le Portugal, les deux pays gagnent à se spécialiser et à échanger.</p>
                </div>
                <div className="my-4 p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-yellow-700 dark:text-yellow-300 mb-2">2. L'avantage comparatif de David Ricardo (1817)</h4>
                  <p className="text-sm">David Ricardo va plus loin : même si un pays est moins efficace dans la production de <strong className="font-semibold">tous</strong> les biens (aucun avantage absolu), il a quand même intérêt à se spécialiser dans la production du bien pour lequel son désavantage productif est le <strong className="font-semibold">moindre</strong> (ou son avantage relatif le plus grand). C'est la théorie de l'<strong className="font-semibold">avantage comparatif</strong>.</p>
                  <p className="mt-2 text-xs italic">Exemple: Même si le Portugal est moins efficace que l'Angleterre pour produire ET le vin ET le drap, il doit se spécialiser là où son désavantage est le plus faible (ex: le vin) et l'Angleterre là où son avantage est le plus grand (ex: le drap).</p>
                </div>
                <div className="my-4 p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-purple-700 dark:text-purple-300 mb-2">3. Le modèle HOS (Heckscher-Ohlin-Samuelson) - Dotations factorielles</h4>
                  <p className="text-sm">Au début du XXe siècle, Eli Heckscher, Bertil Ohlin, et Paul Samuelson développent un modèle basé sur les <strong className="font-semibold">dotations factorielles</strong>. Les pays se spécialisent et exportent les biens dont la production nécessite l'utilisation intensive des facteurs de production (travail, capital, terre) qu'ils possèdent en abondance, et importent les biens nécessitant des facteurs rares sur leur territoire.</p>
                  <p className="mt-2 text-xs italic">Exemple: Un pays riche en main-d'œuvre mais pauvre en capital se spécialisera dans des productions intensives en travail (ex: textile).</p>
                </div>
              </>
            )}

            {activeSection === "nouvelles-theories" && (
              <>
                <h2><TrendingUp className="inline h-6 w-6 mr-2 text-purple-500" />Nouvelles théories du commerce international</h2>
                <p>À partir des années 1970-1980, de nouvelles théories émergent pour expliquer des aspects du commerce international que les modèles classiques peinaient à justifier, notamment le commerce intra-branche entre pays similaires.</p>
                <div className="my-4 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-indigo-700 dark:text-indigo-300 mb-2">1. Commerce intra-branche et différenciation des produits</h4>
                  <p className="text-sm">Le <strong className="font-semibold">commerce intra-branche</strong> désigne les échanges croisés de produits appartenant à la même branche (ex: la France exporte des Renault et importe des Volkswagen). Il s'explique par :</p>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-sm">
                    <li>La <strong className="font-semibold">différenciation des produits</strong> : les consommateurs recherchent de la variété (modèles, qualités, marques différentes).</li>
                    <li>Les <strong className="font-semibold">économies d'échelle</strong> : produire en grande quantité pour un marché mondial permet de réduire les coûts unitaires.</li>
                  </ul>
                  <p className="mt-2 text-xs italic">Paul Krugman (prix Nobel 2008) a largement contribué à ces analyses.</p>
                </div>
                <div className="my-4 p-4 bg-pink-50 dark:bg-pink-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-pink-700 dark:text-pink-300 mb-2">2. Concurrence imparfaite et rôle des firmes</h4>
                  <p className="text-sm">Ces théories intègrent des marchés en <strong className="font-semibold">concurrence imparfaite</strong> (oligopoles, monopoles) où les firmes multinationales jouent un rôle stratégique. Leurs décisions d'investissement, d'innovation et de localisation influencent les flux commerciaux.</p>
                  <p className="mt-1 text-sm">Le commerce peut aussi résulter de stratégies de firmes cherchant à exploiter des avantages spécifiques (technologie, marque) ou à fragmenter leur chaîne de valeur à l'échelle mondiale.</p>
                </div>
              </>
            )}

            {activeSection === "avantages-limites" && (
              <>
                <h2><BarChart3 className="inline h-6 w-6 mr-2 text-yellow-500" />Avantages et limites du commerce international</h2>
                <p>Le commerce international est source de nombreux avantages, mais présente aussi des défis et des limites.</p>
                <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-green-700 dark:text-green-300 mb-2">Avantages</h4>
                    <ul className="list-disc list-inside space-y-0.5 text-sm">
                      <li><strong className="font-semibold">Gains de productivité</strong> (spécialisation).</li>
                      <li><strong className="font-semibold">Baisse des prix</strong> et choix accru.</li>
                      <li><strong className="font-semibold">Diffusion de l'innovation</strong>.</li>
                      <li><strong className="font-semibold">Croissance économique</strong>.</li>
                      <li>Réduction de la pauvreté (certains cas).</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-red-700 dark:text-red-300 mb-2">Limites et Débats</h4>
                    <ul className="list-disc list-inside space-y-0.5 text-sm">
                      <li><strong className="font-semibold">Inégalités de revenus</strong>.</li>
                      <li><strong className="font-semibold">Dépendance économique</strong>.</li>
                      <li>Risques liés aux <strong className="font-semibold">chocs externes</strong>.</li>
                      <li>Critiques <strong className="font-semibold">sociales/environnementales</strong>.</li>
                      <li>Débat <strong className="font-semibold">protectionnisme</strong> vs. <strong className="font-semibold">libre-échange</strong>.</li>
                    </ul>
                  </div>
                </div>
                <p>Le débat entre libre-échange et protectionnisme est ancien. Le <strong className="font-semibold">libre-échange</strong> vise à supprimer les obstacles pour maximiser les gains. Le <strong className="font-semibold">protectionnisme</strong> (tarifs, quotas) cherche à protéger les industries nationales ou à répondre à des préoccupations sociales/environnementales.</p>
                <div className="my-4 p-3 bg-gray-100 dark:bg-gray-700/30 rounded-lg not-prose">
                    <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">Exemple : Le protectionnisme éducateur</h4>
                    <p className="text-sm">Friedrich List (XIXe siècle) a défendu l'idée d'un "protectionnisme éducateur" : protection temporaire pour les industries naissantes.</p>
                </div>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className="inline h-6 w-6 mr-2 text-eco-blue" />Conclusion</h2>
                <p>Les fondements du commerce international reposent sur une combinaison de théories classiques et nouvelles. Il offre des avantages économiques mais soulève des questions de répartition, dépendance et impacts sociaux/environnementaux.</p>
                <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-eco-blue mb-2">Points clés à retenir :</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-sm">
                    <li>Théories : avantages absolus/comparatifs, dotations factorielles, différenciation, économies d'échelle.</li>
                    <li>Avantages : efficacité, choix, innovation, croissance.</li>
                    <li>Débats : inégalités, dépendance, protectionnisme.</li>
                  </ul>
                </div>
                <p>Comprendre ces fondements est crucial pour analyser les enjeux de la mondialisation et les politiques commerciales.</p>
              </>
            )}
          </motion.div>
        </div>

        {/* Barre latérale de ressources */}
        <aside className="md:w-64 w-full flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:sticky md:top-24">
            <h3 className="font-semibold text-lg mb-4 flex items-center"><BookMarked className="h-5 w-5 mr-2 text-eco-blue" />Ressources</h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-eco-blue mb-1 flex items-center"><HelpCircle className="h-5 w-5 mr-1.5"/>Quiz associé</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur les fondements du commerce.</p>
                <Link href={`/quiz/economie/${chapterId}`} className="text-sm text-white bg-eco-blue px-3 py-1.5 rounded inline-flex items-center hover:bg-blue-700 transition-colors">
                  Faire le quiz <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-sm mb-1">Notions clés</h4>
                <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-0.5">
                  {notionsCles.map(notion => (
                     <li key={notion.id} className="cursor-default" title={notion.explication}>
                        <HelpCircle className="h-3 w-3 inline mr-1 opacity-60" />{notion.title}
                     </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
} 