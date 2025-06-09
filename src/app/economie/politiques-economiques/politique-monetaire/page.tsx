"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  CheckCircle, 
  Clock, 
  TrendingUp, // Icône principale pour politique monétaire
  Target, // Pour objectifs
  SlidersHorizontal, // Pour instruments
  Activity, // Pour mécanismes de transmission
  ShieldAlert, // Pour limites
  BookMarked,
  ListChecks,
  Info,
  HelpCircle,
  Scale // Pour équilibre/inflation
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

interface Notion {
  id: string;
  title: string;
  explication: string;
}

const slug = "politique-monetaire";
const chapterTitle = "La Politique Monétaire : Objectifs, Instruments et Impacts";

export default function PolitiqueMonetairePage() {
  const { getChapterProgress, updateChapterProgress, formatTime } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeSection, setActiveSection] = useState("introduction");
  const chapterId = slug;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeSpentRef = useRef(timeSpent); // Ref pour timeSpent

  useEffect(() => {
    timeSpentRef.current = timeSpent; // Mettre à jour la ref quand timeSpent change
  }, [timeSpent]);

  useEffect(() => {
    setMounted(true);
    const progress = getChapterProgress("economie", chapterId);
    if (progress) {
      setTimeSpent(progress.timeSpent);
      setIsCompleted(progress.completed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getChapterProgress, chapterId]);
  
  useEffect(() => {
    if (!mounted) return;
  
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
      // Sauvegarde du temps et du statut lors du démontage ou si complété/décomplété
      updateChapterProgress("economie", chapterId, { timeSpent: timeSpentRef.current, completed: isCompleted });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, isCompleted, chapterId, updateChapterProgress]); // timeSpent retiré des dépendances


  const handleMarkAsCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  const notionsCles: Notion[] = [
    { id: "banque-centrale", title: "Banque Centrale", explication: "Institution chargée de conduire la politique monétaire et d'assurer la stabilité financière (ex: BCE, Fed)." },
    { id: "inflation", title: "Inflation", explication: "Augmentation générale et durable des prix des biens et services." },
    { id: "taux-directeur", title: "Taux directeur", explication: "Principal taux d'intérêt fixé par la banque centrale pour influencer le coût du crédit." },
    { id: "operations-open-market", title: "Opérations d'open market", explication: "Achats ou ventes de titres par la banque centrale pour influencer la liquidité bancaire." },
    { id: "reserves-obligatoires", title: "Réserves obligatoires", explication: "Pourcentage des dépôts que les banques commerciales doivent détenir auprès de la banque centrale." },
    { id: "politique-expansionniste", title: "Politique monétaire expansionniste", explication: "Vise à stimuler l'activité économique par une baisse des taux d'intérêt ou une augmentation de la masse monétaire." },
    { id: "politique-restrictive", title: "Politique monétaire restrictive", explication: "Vise à lutter contre l'inflation par une hausse des taux d'intérêt ou une réduction de la masse monétaire." },
    { id: "quantitative-easing", title: "Quantitative Easing (QE)", explication: "Politique non conventionnelle où la banque centrale achète massivement des actifs financiers pour injecter des liquidités." },
    { id: "canal-credit", title: "Canal du crédit", explication: "Voie par laquelle la politique monétaire affecte l'offre et la demande de crédit, et donc l'investissement et la consommation." },
    { id: "independance-bc", title: "Indépendance de la Banque Centrale", explication: "Principe selon lequel la banque centrale doit être libre de toute influence politique pour mener sa mission." },
  ];

  const pageSections = [
    { id: "introduction", title: "Introduction" },
    { id: "objectifs-politique-monetaire", title: "Objectifs" },
    { id: "instruments-politique-monetaire", title: "Instruments" },
    { id: "mecanismes-transmission", title: "Mécanismes" },
    { id: "limites-contraintes", title: "Limites & Contraintes" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionIconMap = {
    introduction: { icon: <Info className="h-5 w-5 mr-1 text-eco-blue" />, label: "Introduction" },
    "objectifs-politique-monetaire": { icon: <Target className="h-5 w-5 mr-1 text-blue-500" />, label: "Objectifs" },
    "instruments-politique-monetaire": { icon: <SlidersHorizontal className="h-5 w-5 mr-1 text-blue-600" />, label: "Instruments" },
    "mecanismes-transmission": { icon: <Activity className="h-5 w-5 mr-1 text-blue-500" />, label: "Mécanismes" },
    "limites-contraintes": { icon: <ShieldAlert className="h-5 w-5 mr-1 text-blue-600" />, label: "Limites" },
    conclusion: { icon: <ListChecks className="h-5 w-5 mr-1 text-eco-blue" />, label: "Conclusion" },
  } as const;
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/economie/politiques-economiques" className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour à la section Politiques Économiques
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <TrendingUp className="mr-2 h-8 w-8 text-eco-blue" /> {chapterTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Décortiquer le rôle de la monnaie et des banques centrales dans la régulation de l'activité économique.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600 dark:text-gray-300"><Clock className="h-5 w-5 mr-1" /><span>Temps: {formatTime(timeSpent)}</span></div>
            <button 
                onClick={handleMarkAsCompleted}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isCompleted ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}
            >
                <CheckCircle className="h-5 w-5 mr-1" />{isCompleted ? "Terminé" : "Marquer comme terminé"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
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
                <h2><Info className="inline h-6 w-6 mr-2 text-eco-blue" />Qu'est-ce que la politique monétaire ?</h2>
                <p>La politique monétaire est l'ensemble des décisions et actions mises en œuvre par une <strong className="font-semibold">banque centrale</strong> pour influencer l'offre de monnaie, le coût du crédit (taux d'intérêt) et, par ce biais, atteindre des objectifs macroéconomiques comme la stabilité des prix, le plein emploi ou la croissance économique.</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-eco-blue mb-2">Rôle clé de la Banque Centrale :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Contrôler la quantité de monnaie en circulation.</li>
                    <li>Influencer les conditions de financement de l'économie.</li>
                    <li>Assurer la confiance dans la monnaie et la stabilité du système financier.</li>
                  </ul>
                </div>
                <p>Elle est un instrument essentiel de la politique économique, complémentaire à la politique budgétaire.</p>
              </>
            )}

            {activeSection === "objectifs-politique-monetaire" && (
              <>
                <h2><Target className="inline h-6 w-6 mr-2 text-blue-500" />Objectifs de la politique monétaire</h2>
                <p>L'objectif principal de la plupart des banques centrales modernes (comme la Banque Centrale Européenne - BCE) est la <strong className="font-semibold">stabilité des prix</strong>, c'est-à-dire maintenir un taux d'inflation bas, stable et prévisible (souvent autour de 2%).</p>
                <p>D'autres objectifs peuvent être poursuivis, de manière subordonnée ou complémentaire :</p>
                <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center"><Scale className="h-5 w-5 mr-1.5"/>Stabilité des prix</h4>
                    <p className="text-sm">Lutter contre l'inflation excessive ou la déflation.</p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center"><TrendingUp className="h-5 w-5 mr-1.5"/>Soutien à la croissance et à l'emploi</h4>
                    <p className="text-sm">Dans la mesure où cela ne compromet pas la stabilité des prix.</p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center"><ShieldAlert className="h-5 w-5 mr-1.5"/>Stabilité financière</h4>
                    <p className="text-sm">Prévenir les crises financières systémiques.</p>
                  </div>
                </div>
                <p>L'<strong className="font-semibold">indépendance de la banque centrale</strong> vis-à-vis du pouvoir politique est souvent considérée comme cruciale pour atteindre ces objectifs de manière crédible.</p>
              </>
            )}

            {activeSection === "instruments-politique-monetaire" && (
              <>
                <h2><SlidersHorizontal className="inline h-6 w-6 mr-2 text-blue-600" />Instruments de la politique monétaire</h2>
                <p>Les banques centrales disposent de plusieurs instruments pour mettre en œuvre leur politique :</p>
                <div className="my-4 p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center">Les taux directeurs</h4>
                  <p className="text-sm mb-1">Ce sont les principaux taux d'intérêt fixés par la banque centrale. Ils influencent le coût auquel les banques commerciales se refinancent auprès d'elle, et par ricochet, les taux d'intérêt qu'elles proposent à leurs clients (ménages et entreprises).</p>
                   <ul className="list-disc list-inside space-y-0.5 text-xs pl-4">
                        <li>Le taux de refinancement principal (taux refi)</li>
                        <li>Le taux de facilité de prêt marginal</li>
                        <li>Le taux de facilité de dépôt</li>
                    </ul>
                </div>
                <div className="my-4 p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center">Les opérations d'open market</h4>
                  <p className="text-sm mb-1">La banque centrale achète ou vend des titres (généralement des obligations d'État) sur le marché monétaire pour injecter ou retirer des liquidités bancaires, influençant ainsi les taux d'intérêt à court terme.</p>
                </div>
                <div className="my-4 p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center">Les réserves obligatoires</h4>
                  <p className="text-sm mb-1">Les banques centrales peuvent exiger des banques commerciales qu'elles conservent un certain pourcentage de leurs dépôts sous forme de réserves. Augmenter ce ratio réduit la capacité des banques à accorder des crédits (effet restrictif), et inversement.</p>
                </div>
                <p>Des instruments <strong className="font-semibold">non conventionnels</strong> ont aussi été utilisés, notamment après la crise de 2008, comme le <strong className="font-semibold">Quantitative Easing (QE)</strong> ou les taux d'intérêt négatifs.</p>
              </>
            )}

            {activeSection === "mecanismes-transmission" && (
              <>
                <h2><Activity className="inline h-6 w-6 mr-2 text-blue-500" />Mécanismes de transmission</h2>
                <p>Les décisions de politique monétaire se transmettent à l'économie réelle via plusieurs canaux :</p>
                <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                    <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">Canal du taux d'intérêt</h4>
                    <p className="text-sm">Une baisse des taux directeurs réduit le coût du crédit, stimulant l'investissement des entreprises et la consommation des ménages. Inversement pour une hausse.</p>
                </div>
                <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                    <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">Canal du crédit</h4>
                    <p className="text-sm">Modifie l'offre et la demande de crédit bancaire. Une politique accommodante facilite l'accès au crédit.</p>
                </div>
                <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                    <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">Canal du taux de change</h4>
                    <p className="text-sm">Les variations de taux d'intérêt influencent les flux de capitaux et donc le taux de change, ce qui affecte la compétitivité-prix et les échanges extérieurs.</p>
                </div>
                 <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                    <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">Canal des anticipations</h4>
                    <p className="text-sm">Les annonces de la banque centrale influencent les anticipations d'inflation et de croissance des agents économiques, ce qui peut modifier leurs comportements (d'épargne, de consommation, d'investissement).</p>
                </div>
              </>
            )}

            {activeSection === "limites-contraintes" && (
              <>
                <h2><ShieldAlert className="inline h-6 w-6 mr-2 text-blue-600" />Limites et Contraintes</h2>
                <p>L'efficacité de la politique monétaire peut être limitée par plusieurs facteurs :</p>
                 <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">Principales contraintes :</h4>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-sm">
                    <li><strong>Trappe à liquidité :</strong> Situation où les taux d'intérêt sont si bas que la politique monétaire devient inefficace car les agents préfèrent détenir de la monnaie liquide.</li>
                    <li><strong>Délais de transmission :</strong> Les effets de la politique monétaire sur l'économie réelle peuvent prendre du temps à se manifester (plusieurs mois).</li>
                    <li><strong>Incertitude :</strong> Difficulté à prévoir l'impact exact des mesures et à anticiper les chocs économiques.</li>
                    <li><strong>Globalisation financière :</strong> Les flux de capitaux internationaux peuvent contrarier les politiques nationales.</li>
                    <li><strong>Rigidités structurelles :</strong> Des rigidités sur les marchés des biens, du travail ou financiers peuvent freiner la transmission.</li>
                    <li><strong>Zero Lower Bound (ZLB) :</strong> Les taux d'intérêt nominaux ne peuvent pas descendre significativement en dessous de zéro, limitant la marge de manœuvre en cas de déflation.</li>
                  </ul>
                </div>
                <p>Ces limites soulignent l'importance de la coordination avec les autres politiques économiques.</p>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className="inline h-6 w-6 mr-2 text-eco-blue" />Conclusion</h2>
                <p>La politique monétaire est un levier crucial pour la stabilité économique. Conduite par la banque centrale, elle vise principalement la stabilité des prix à travers la gestion des taux d'intérêt et de la masse monétaire. Son efficacité dépend de la crédibilité de la banque centrale, des canaux de transmission et des contraintes existantes.</p>
                <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-eco-blue mb-2">Points clés à retenir :</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-sm">
                    <li>Objectif principal : stabilité des prix (inflation maîtrisée).</li>
                    <li>Instruments : taux directeurs, open market, réserves obligatoires.</li>
                    <li>Mécanismes : canal du taux, du crédit, du change, des anticipations.</li>
                    <li>Limites : trappe à liquidité, délais, ZLB.</li>
                    <li>L'indépendance de la banque centrale est un gage de crédibilité.</li>
                  </ul>
                </div>
                <p>Les défis actuels incluent la gestion des politiques non conventionnelles, la coordination internationale et l'adaptation aux nouvelles réalités économiques (numérisation, enjeux climatiques).</p>
              </>
            )}
          </motion.div>
        </div>

        <aside className="md:w-64 w-full flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:sticky md:top-24">
            <h3 className="font-semibold text-lg mb-4 flex items-center"><BookMarked className="h-5 w-5 mr-2 text-eco-blue" />Ressources</h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-eco-blue mb-1 flex items-center"><HelpCircle className="h-5 w-5 mr-1.5"/>Quiz associé</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur la politique monétaire.</p>
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