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
  Landmark, // Icône pour la finance
  TrendingUp, 
  AlertTriangle, // Pour les risques
  ShieldCheck, // Pour la régulation
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

const slug = "globalisation-financiere";
const chapterTitle = "La Globalisation Financière : Marchés, Acteurs et Enjeux";

export default function GlobalisationFinancierePage() {
  const { getChapterProgress, updateChapterProgress, formatTime } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeSection, setActiveSection] = useState("introduction");
  const chapterId = slug; // Utiliser le slug comme chapterId

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
      // Sauvegarde lors du démontage ou si l'état change
      updateChapterProgress("economie", chapterId, { timeSpent: timeSpent, completed: isCompleted });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]); // Dépendance initiale au montage

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sauvegarde lorsque isCompleted ou timeSpent change (et que le composant est monté)
  useEffect(() => {
    if (mounted) {
      updateChapterProgress("economie", chapterId, { timeSpent: timeSpent, completed: isCompleted });
    }
    if (isCompleted && intervalRef.current) {
      clearInterval(intervalRef.current);
    } else if (!isCompleted && mounted && !intervalRef.current) {
      // Redémarre le timer si non complété et pas de timer actif (ex: retour sur la page)
      intervalRef.current = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted, timeSpent, mounted]);


  const handleMarkAsCompleted = () => {
    const newCompletedStatus = !isCompleted;
    setIsCompleted(newCompletedStatus);
  };

  const notionsCles: Notion[] = [
    { id: "marches-capitaux", title: "Marchés de capitaux", explication: "Lieux (physiques ou virtuels) où s'échangent les capitaux à long terme (actions, obligations)." },
    { id: "marche-monetaire", title: "Marché monétaire", explication: "Marché des capitaux à court terme, liquidités entre banques et institutions." },
    { id: "marche-changes", title: "Marché des changes (Forex)", explication: "Marché où s'échangent les devises les unes contre les autres." },
    { id: "ide", title: "Investissements Directs à l'Étranger (IDE)", explication: "Prises de participation durables dans des entreprises étrangères." },
    { id: "investissements-portefeuille", title: "Investissements de portefeuille", explication: "Achats d'actifs financiers étrangers (actions, obligations) à des fins de placement, souvent à court terme." },
    { id: "desintermediation", title: "Désintermédiation", explication: "Réduction du rôle des intermédiaires financiers traditionnels (banques) au profit du financement direct sur les marchés." },
    { id: "dereglementation", title: "Déréglementation (les '3D')", explication: "Politiques visant à réduire les réglementations sur les marchés financiers (avec Décloisonnement et Désintermédiation)." },
    { id: "risque-systemique", title: "Risque systémique", explication: "Risque qu'une défaillance locale se propage à l'ensemble du système financier." },
    { id: "paradis-fiscaux", title: "Paradis fiscaux", explication: "Territoires à fiscalité très faible ou nulle attirant les capitaux." },
  ];

  const pageSections = [
    { id: "introduction", title: "Introduction" },
    { id: "acteurs-marches", title: "Acteurs et Marchés" },
    { id: "mecanismes-avantages", title: "Mécanismes et Avantages" },
    { id: "risques-defis", title: "Risques et Défis" },
    { id: "regulation-gouvernance", title: "Régulation et Gouvernance" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionIconMap = {
    introduction: { icon: <Info className="h-5 w-5 mr-1 text-eco-blue" />, label: "Introduction" },
    "acteurs-marches": { icon: <Landmark className="h-5 w-5 mr-1 text-green-500" />, label: "Acteurs & Marchés" },
    "mecanismes-avantages": { icon: <TrendingUp className="h-5 w-5 mr-1 text-purple-500" />, label: "Mécanismes & Avantages" },
    "risques-defis": { icon: <AlertTriangle className="h-5 w-5 mr-1 text-red-500" />, label: "Risques & Défis" },
    "regulation-gouvernance": { icon: <ShieldCheck className="h-5 w-5 mr-1 text-yellow-600" />, label: "Régulation" },
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
              <Landmark className="mr-2 h-8 w-8 text-eco-blue" /> {chapterTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Explorer l'intégration croissante des marchés financiers mondiaux, ses moteurs, ses bénéfices et ses dangers.
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
                <h2><Info className="inline h-6 w-6 mr-2 text-eco-blue" />Introduction à la globalisation financière</h2>
                <p>La globalisation financière désigne l'interconnexion croissante des marchés de capitaux à l'échelle mondiale. Elle se traduit par une libre circulation des capitaux, permettant aux investisseurs de placer leurs fonds au-delà des frontières nationales et aux emprunteurs de se financer sur les marchés internationaux.</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-eco-blue mb-2">Les "3 D" de la globalisation financière :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Déréglementation :</strong> Assouplissement des règles encadrant les mouvements de capitaux et les activités financières.</li>
                    <li><strong>Désintermédiation :</strong> Accès direct des entreprises aux marchés financiers, réduisant le rôle traditionnel des banques.</li>
                    <li><strong>Décloisonnement :</strong> Abolition des barrières entre les différents types de marchés (monétaire, financier, changes) et entre les marchés nationaux.</li>
                  </ul>
                </div>
                <p>Ce phénomène, accéléré par les innovations technologiques (notamment les NTIC), a profondément transformé l'économie mondiale, offrant des opportunités mais aussi engendrant de nouveaux risques.</p>
              </>
            )}

            {activeSection === "acteurs-marches" && (
              <>
                <h2><Landmark className="inline h-6 w-6 mr-2 text-green-500" />Principaux Acteurs et Marchés</h2>
                <p>La globalisation financière repose sur une diversité d'acteurs et de marchés interconnectés.</p>
                <div className="my-4 p-4 border-l-4 border-green-600 bg-green-50 dark:bg-green-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-green-700 dark:text-green-300 mb-2">Acteurs clés :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Banques d'investissement :</strong> Facilitent les émissions de titres, fusions-acquisitions, etc.</li>
                    <li><strong>Investisseurs institutionnels ("Zinzins") :</strong> Compagnies d'assurance, fonds de pension, fonds communs de placement, qui gèrent d'importants volumes d'épargne.</li>
                    <li><strong>Hedge funds (fonds spéculatifs) :</strong> Cherchent des rendements élevés via des stratégies complexes et souvent risquées.</li>
                    <li><strong>Agences de notation :</strong> Évaluent la solvabilité des emprunteurs (États, entreprises).</li>
                    <li><strong>Entreprises multinationales :</strong> Acteurs majeurs des IDE et des flux financiers transfrontaliers.</li>
                    <li><strong>Banques centrales :</strong> Régulent le système bancaire, conduisent la politique monétaire et gèrent les réserves de change.</li>
                  </ul>
                </div>
                <div className="my-4 p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-purple-700 dark:text-purple-300 mb-2">Types de marchés financiers :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Marché des changes (Forex) :</strong> Le plus grand marché au monde, où les devises sont échangées.</li>
                    <li><strong>Marchés des actions (bourses) :</strong> Négociation des titres de propriété des entreprises.</li>
                    <li><strong>Marchés obligataires :</strong> Émission et échange de titres de créance (obligations d'État ou d'entreprises).</li>
                    <li><strong>Marchés des produits dérivés :</strong> Instruments financiers (options, futures) dont la valeur dérive d'un actif sous-jacent.</li>
                    <li><strong>Marché monétaire :</strong> Financement à court terme entre institutions financières.</li>
                  </ul>
                  <p className="mt-2 text-xs italic">Ces marchés sont de plus en plus intégrés, fonctionnant souvent 24h/24 grâce aux technologies de l'information.</p>
                </div>
              </>
            )}

            {activeSection === "mecanismes-avantages" && (
              <>
                <h2><TrendingUp className="inline h-6 w-6 mr-2 text-purple-500" />Mécanismes et Avantages</h2>
                <p>La globalisation financière permet une allocation potentiellement plus efficace des capitaux et offre divers avantages.</p>
                <div className="my-4 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Mécanismes clés :</h4>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-sm">
                    <li><strong>Investissements Directs à l'Étranger (IDE) :</strong> Création ou acquisition d'entreprises à l'étranger, transfert de technologie et de savoir-faire.</li>
                    <li><strong>Investissements de portefeuille :</strong> Achats d'actions ou d'obligations étrangères, permettant la diversification des risques pour les investisseurs.</li>
                    <li><strong>Flux de prêts bancaires internationaux :</strong> Financement transfrontalier par les banques.</li>
                    <li><strong>Transferts de fonds des migrants.</strong></li>
                  </ul>
                </div>
                <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-green-700 dark:text-green-300 mb-2">Avantages attendus :</h4>
                    <ul className="list-disc list-inside space-y-0.5 text-sm">
                      <li>Meilleure allocation du capital vers les projets les plus rentables.</li>
                      <li>Financement de l'investissement et de la croissance, notamment dans les pays émergents.</li>
                      <li>Diversification des risques pour les épargnants.</li>
                      <li>Baisse du coût du capital grâce à une concurrence accrue.</li>
                      <li>Discipline des politiques économiques nationales par les marchés.</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                     <h4 className="text-base font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Exemple : Financement des déficits</h4>
                     <p className="text-sm">La globalisation financière permet aux pays ayant un déficit de leur balance courante (ex: États-Unis) de le financer grâce à l'épargne des pays excédentaires (ex: Chine, pays pétroliers).</p>
                  </div>
                </div>
              </>
            )}

            {activeSection === "risques-defis" && (
              <>
                <h2><AlertTriangle className="inline h-6 w-6 mr-2 text-red-500" />Risques et Défis</h2>
                <p>La globalisation financière n'est pas sans inconvénients et présente des risques significatifs.</p>
                <div className="my-4 p-4 border-l-4 border-red-600 bg-red-50 dark:bg-red-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-red-700 dark:text-red-300 mb-2">Principaux risques :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Instabilité financière et crises :</strong> La libre circulation des capitaux peut entraîner une volatilité accrue, des bulles spéculatives et des crises financières (ex: crise asiatique 1997, crise des subprimes 2008).</li>
                    <li><strong>Risque systémique :</strong> L'interconnexion des marchés augmente le risque de contagion : une crise locale peut rapidement se propager mondialement.</li>
                    <li><strong>Fuite des capitaux :</strong> Les capitaux peuvent quitter rapidement un pays perçu comme risqué, aggravant les crises.</li>
                    <li><strong>Perte d'autonomie des politiques monétaires nationales :</strong> Les banques centrales peuvent être contraintes par les réactions des marchés financiers internationaux.</li>
                    <li><strong>Creusement des inégalités :</strong> Les bénéfices de la globalisation financière ne sont pas toujours équitablement répartis.</li>
                    <li><strong>Évasion fiscale et paradis fiscaux :</strong> Facilitent l'optimisation et la fraude fiscale, réduisant les recettes des États.</li>
                  </ul>
                </div>
                <div className="my-4 p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg not-prose">
                    <h4 className="text-base font-semibold text-orange-700 dark:text-orange-300 mb-1">Le "Triangle d'incompatibilité" de Mundell</h4>
                    <p className="text-sm">Il est difficile pour un pays de maintenir simultanément : 1) un régime de change fixe, 2) une politique monétaire autonome, et 3) la libre circulation des capitaux. Un choix doit être fait.</p>
                </div>
              </>
            )}

            {activeSection === "regulation-gouvernance" && (
              <>
                <h2><ShieldCheck className="inline h-6 w-6 mr-2 text-yellow-600" />Régulation et Gouvernance Mondiale</h2>
                <p>Face aux risques, la question de la régulation de la finance mondiale est cruciale.</p>
                <div className="my-4 p-4 bg-sky-50 dark:bg-sky-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-sky-700 dark:text-sky-300 mb-2">Pistes de régulation et instances :</h4>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-sm">
                    <li><strong>Renforcement des fonds propres des banques :</strong> Accords de Bâle (Bâle I, II, III) pour améliorer la solidité des banques.</li>
                    <li><strong>Surveillance macroprudentielle :</strong> Anticiper et prévenir le risque systémique (ex: Conseil de Stabilité Financière - CSF, ou Financial Stability Board - FSB).</li>
                    <li><strong>Lutte contre les paradis fiscaux :</strong> Initiatives de l'OCDE et du G20 pour plus de transparence fiscale.</li>
                    <li><strong>Taxation des transactions financières (TTF) :</strong> Proposée pour limiter la spéculation et générer des revenus (débat en cours).</li>
                    <li><strong>Rôle du FMI :</strong> Prêteur en dernier ressort, surveillance des politiques économiques.</li>
                    <li><strong>Coordination internationale (G7, G20) :</strong> Essentielle mais souvent difficile à mettre en œuvre.</li>
                  </ul>
                </div>
                <p>La crise de 2008 a relancé les débats sur la nécessité de mieux encadrer la finance mondiale, mais les solutions peinent à être universellement adoptées et appliquées, en raison des intérêts divergents des États et de la complexité des marchés.</p>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className="inline h-6 w-6 mr-2 text-eco-blue" />Conclusion</h2>
                <p>La globalisation financière est une facette majeure de la mondialisation économique. Elle offre des potentialités de croissance et d'efficacité, mais génère également une instabilité et des risques importants qui appellent à une meilleure gouvernance et régulation à l'échelle internationale.</p>
                <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-eco-blue mb-2">Points clés à retenir :</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-sm">
                    <li>Moteurs : Les "3D" (Déréglementation, Désintermédiation, Décloisonnement) et les NTIC.</li>
                    <li>Avantages : Allocation du capital, financement de la croissance, diversification des risques.</li>
                    <li>Risques : Instabilité, crises systémiques, perte d'autonomie, inégalités.</li>
                    <li>Débats : Nécessité d'une régulation internationale plus forte face aux défis.</li>
                  </ul>
                </div>
                <p>Comprendre ses mécanismes, ses acteurs et ses enjeux est indispensable pour analyser l'économie contemporaine.</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur la globalisation financière.</p>
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