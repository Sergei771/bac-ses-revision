"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  CheckCircle, 
  Clock, 
  Scale, // Icône pour les déséquilibres/régulation
  TrendingDown, // Pour les déséquilibres commerciaux/financiers
  Users, // Pour les aspects sociaux
  Globe, // Pour les aspects globaux/environnementaux
  Landmark, // Pour les institutions
  BookMarked,
  ListChecks,
  Info,
  HelpCircle,
  AlertTriangle // Pour les risques/crises
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

interface Notion {
  id: string;
  title: string;
  explication: string;
}

const slug = "desequilibres-mondiaux";
const chapterTitle = "Les Déséquilibres Mondiaux : Causes, Conséquences et Enjeux";

export default function DesequilibresMondiauxPage() {
  const { getChapterProgress, updateChapterProgress, formatTime } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeSection, setActiveSection] = useState("introduction");
  const chapterId = slug;

  useEffect(() => {
    if (!mounted) return;
    const progress = getChapterProgress("economie", chapterId);
    if (progress) {
      setTimeSpent(progress.timeSpent);
      setIsCompleted(progress.completed);
    }
    if (!isCompleted) {
      intervalRef.current = setInterval(() => setTimeSpent(prev => prev + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      updateChapterProgress("economie", chapterId, { timeSpent: timeSpent, completed: isCompleted });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted) {
      updateChapterProgress("economie", chapterId, { timeSpent: timeSpent, completed: isCompleted });
    }
    if (isCompleted && intervalRef.current) {
      clearInterval(intervalRef.current);
    } else if (!isCompleted && mounted && !intervalRef.current) {
      intervalRef.current = setInterval(() => setTimeSpent(prev => prev + 1), 1000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted, timeSpent, mounted]);

  const handleMarkAsCompleted = () => setIsCompleted(!isCompleted);

  const notionsCles: Notion[] = [
    { id: "balance-paiements", title: "Balance des paiements", explication: "Document statistique retraçant l'ensemble des flux réels, financiers et monétaires entre les résidents d'un pays et les non-résidents au cours d'une période donnée." },
    { id: "balance-courante", title: "Balance courante (ou des transactions courantes)", explication: "Composante de la balance des paiements qui enregistre les échanges de biens, de services, les revenus primaires et secondaires." },
    { id: "taux-change", title: "Taux de change", explication: "Prix d'une monnaie exprimé dans une autre monnaie. Son évolution affecte la compétitivité-prix." },
    { id: "protectionnisme", title: "Protectionnisme", explication: "Politique économique visant à protéger la production nationale de la concurrence étrangère (droits de douane, quotas, etc.)." },
    { id: "libre-echange", title: "Libre-échange", explication: "Système de commerce international sans barrières tarifaires ou non tarifaires." },
    { id: "dette-souveraine", title: "Dette souveraine", explication: "Ensemble des engagements financiers pris par un État." },
    { id: "paradis-fiscaux", title: "Paradis fiscaux", explication: "Territoires à fiscalité très faible ou nulle attirant les capitaux et permettant l'évasion fiscale." },
    { id: "cooperation-internationale", title: "Coopération internationale", explication: "Actions concertées entre États pour atteindre des objectifs communs (économiques, sociaux, environnementaux)." },
    { id: "biens-publics-mondiaux", title: "Biens publics mondiaux", explication: "Biens dont les bénéfices s'étendent à tous les pays et dont personne ne peut être exclu (ex: climat stable, stabilité financière)." },
  ];

  const pageSections = [
    { id: "introduction", title: "Introduction" },
    { id: "desequilibres-balances-courantes", title: "Balances courantes" },
    { id: "desequilibres-financiers-dettes", title: "Finances et Dettes" },
    { id: "desequilibres-sociaux-environnementaux", title: "Sociaux & Environnementaux" },
    { id: "regulation-gouvernance", title: "Régulation & Gouvernance" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionIconMap = {
    introduction: { icon: <Info className="h-5 w-5 mr-1 text-eco-blue" />, label: "Introduction" },
    "desequilibres-balances-courantes": { icon: <TrendingDown className="h-5 w-5 mr-1 text-red-500" />, label: "Balances Courantes" },
    "desequilibres-financiers-dettes": { icon: <AlertTriangle className="h-5 w-5 mr-1 text-orange-500" />, label: "Finances & Dettes" },
    "desequilibres-sociaux-environnementaux": { icon: <Users className="h-5 w-5 mr-1 text-purple-500" />, label: "Sociaux & Environ." },
    "regulation-gouvernance": { icon: <Landmark className="h-5 w-5 mr-1 text-green-500" />, label: "Régulation" },
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
              <Scale className="mr-2 h-8 w-8 text-eco-blue" /> {chapterTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Analyser les causes et les conséquences des déséquilibres économiques mondiaux et les défis de leur régulation.
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
                <h2><Info className="inline h-6 w-6 mr-2 text-eco-blue" />Introduction aux déséquilibres mondiaux</h2>
                <p>La mondialisation, si elle a favorisé la croissance et l'interdépendance, a également généré ou accentué divers déséquilibres à l'échelle planétaire. Ces déséquilibres peuvent être de nature commerciale, financière, mais aussi sociale et environnementale. Ils représentent des défis majeurs pour la stabilité économique et le développement durable.</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-eco-blue mb-2">Principaux types de déséquilibres :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Déséquilibres commerciaux :</strong> Excédents ou déficits persistants des balances des transactions courantes de certains pays.</li>
                    <li><strong>Déséquilibres financiers :</strong> Accumulation de dettes (souveraines, privées), volatilité des flux de capitaux, crises financières.</li>
                    <li><strong>Déséquilibres sociaux :</strong> Creusement des inégalités de revenus et de richesse, disparités de développement.</li>
                    <li><strong>Déséquilibres environnementaux :</strong> Surexploitation des ressources, changement climatique, perte de biodiversité.</li>
                  </ul>
                </div>
                <p>Ce chapitre explore les principales formes de déséquilibres mondiaux, leurs causes, leurs conséquences et les tentatives de régulation internationale pour y faire face.</p>
              </>
            )}

            {activeSection === "desequilibres-balances-courantes" && (
              <>
                <h2><TrendingDown className="inline h-6 w-6 mr-2 text-red-500" />Déséquilibres des balances courantes</h2>
                <p>La <strong className="font-semibold">balance des transactions courantes</strong> (ou balance courante) est une composante clé de la balance des paiements. Elle retrace les échanges de biens (balance commerciale), de services, ainsi que les revenus primaires (salaires, dividendes, intérêts) et secondaires (transferts courants comme l'aide internationale ou les envois de fonds des migrants).</p>
                <p>Des déséquilibres importants et persistants des balances courantes, tels que les excédents massifs de pays comme la Chine ou l'Allemagne et les déficits importants des États-Unis, sont une caractéristique marquante de l'économie mondiale contemporaine.</p>
                <div className="my-4 p-4 border-l-4 border-red-600 bg-red-50 dark:bg-red-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-red-700 dark:text-red-300 mb-2">Causes des déséquilibres courants :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Différences de compétitivité-prix (liées aux coûts de production, aux taux de change) et hors-prix (qualité, innovation).</li>
                    <li>Spécialisations productives et dotations factorielles différentes.</li>
                    <li>Niveaux d'épargne et d'investissement nationaux.</li>
                    <li>Politiques commerciales (protectionnisme vs. libre-échange).</li>
                  </ul>
                </div>
                <div className="my-4 p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-orange-700 dark:text-orange-300 mb-2">Conséquences et enjeux :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Accumulation de créances pour les pays excédentaires et d'endettement extérieur pour les pays déficitaires.</li>
                    <li>Risques de "guerres commerciales" et de montée du protectionnisme.</li>
                    <li>Volatilité des taux de change.</li>
                    <li>Nécessité d'ajustements macroéconomiques (politiques de relance ou d'austérité, dévaluation/réévaluation).</li>
                  </ul>
                </div>
                <p>L'exemple des relations commerciales sino-américaines illustre bien ces tensions, avec des accusations mutuelles de pratiques déloyales et des mesures protectionnistes.</p>
              </>
            )}

            {activeSection === "desequilibres-financiers-dettes" && (
              <>
                <h2><AlertTriangle className="inline h-6 w-6 mr-2 text-orange-500" />Déséquilibres financiers et dettes souveraines</h2>
                <p>La globalisation financière a entraîné une augmentation massive des flux de capitaux internationaux. Si ces flux peuvent financer l'investissement et favoriser la croissance, ils sont aussi source d'instabilité et de déséquilibres.</p>
                <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Mouvements de capitaux et instabilité :</h4>
                    <ul className="list-disc list-inside space-y-0.5 text-sm">
                      <li>Flux de capitaux à court terme souvent spéculatifs ("hot money").</li>
                      <li>Formation de bulles spéculatives sur certains actifs (immobiliers, financiers).</li>
                      <li>Risques de crises financières (ex: crise asiatique 1997, subprimes 2008).</li>
                      <li>Contagion des crises d'un pays à l'autre.</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                     <h4 className="text-base font-semibold text-red-700 dark:text-red-300 mb-2">Dettes souveraines :</h4>
                     <ul className="list-disc list-inside space-y-0.5 text-sm">
                       <li>Augmentation de l'endettement public dans de nombreux pays (suite à des crises, des politiques de relance, ou une gestion budgétaire laxiste).</li>
                       <li>Risques de défaut de paiement pour les États les plus endettés (ex: crise de la dette grecque).</li>
                       <li>Intervention du FMI et plans d'ajustement structurel souvent impopulaires.</li>
                       <li>Débats sur la soutenabilité de la dette et les mécanismes de restructuration.</li>
                     </ul>
                  </div>
                </div>
                <p>Les <strong className="font-semibold">paradis fiscaux</strong> jouent un rôle important en facilitant l'évasion fiscale et en abritant des flux financiers opaques, ce qui complique la régulation et aggrave les déséquilibres.</p>
              </>
            )}

            {activeSection === "desequilibres-sociaux-environnementaux" && (
              <>
                <h2><Users className="inline h-6 w-6 mr-2 text-purple-500" />Déséquilibres sociaux et environnementaux globaux</h2>
                <p>Au-delà des aspects purement économiques et financiers, la mondialisation est associée à des déséquilibres sociaux et environnementaux préoccupants.</p>
                <div className="my-4 p-4 border-l-4 border-purple-600 bg-purple-50 dark:bg-purple-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-purple-700 dark:text-purple-300 mb-2">Déséquilibres sociaux :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Creusement des inégalités de revenus et de patrimoine au sein des pays (entre qualifiés/non-qualifiés, capital/travail) et entre pays.</li>
                    <li>Persistance de la pauvreté extrême dans certaines régions du monde.</li>
                    <li>Dumping social et mise en concurrence des travailleurs à l'échelle mondiale.</li>
                    <li>Disparités d'accès à l'éducation, à la santé, et aux opportunités.</li>
                  </ul>
                </div>
                <div className="my-4 p-4 border-l-4 border-teal-600 bg-teal-50 dark:bg-teal-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-teal-700 dark:text-teal-300 mb-2">Déséquilibres environnementaux :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Changement climatique dû aux émissions de gaz à effet de serre (GES), un <strong className="font-semibold">bien public mondial</strong> négatif.</li>
                    <li>Surexploitation des ressources naturelles (déforestation, surpêche).</li>
                    <li>Perte de biodiversité.</li>
                    <li>Pollution transfrontalière (air, eau).</li>
                    <li>Difficulté à concilier croissance économique et préservation de l'environnement (développement durable).</li>
                  </ul>
                </div>
                <p>Ces déséquilibres appellent une action collective et une meilleure prise en compte des externalités négatives de la mondialisation.</p>
              </>
            )}

            {activeSection === "regulation-gouvernance" && (
              <>
                <h2><Landmark className="inline h-6 w-6 mr-2 text-green-500" />Tentatives de régulation et gouvernance mondiale</h2>
                <p>Face à ces multiples déséquilibres, la question de la régulation de la mondialisation et de la gouvernance mondiale est centrale. Plusieurs institutions internationales jouent un rôle, mais leur efficacité est souvent limitée.</p>
                 <div className="my-4 p-4 bg-sky-50 dark:bg-sky-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-sky-700 dark:text-sky-300 mb-2">Acteurs et défis de la régulation :</h4>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-sm">
                    <li><strong>Fonds Monétaire International (FMI) :</strong> Surveillance des politiques économiques, aide financière aux pays en difficulté, mais critiqué pour ses conditionnalités.</li>
                    <li><strong>Organisation Mondiale du Commerce (OMC) :</strong> Établissement des règles du commerce international, règlement des différends, mais difficultés à conclure de nouveaux accords (cycle de Doha).</li>
                    <li><strong>Banque Mondiale :</strong> Financement de projets de développement, lutte contre la pauvreté.</li>
                    <li><strong>G20, G7 :</strong> Forums de discussion et de coordination des politiques économiques des principaux pays, mais décisions non contraignantes.</li>
                    <li><strong>Autres organisations spécialisées (OIT, PNUE...) et ONG.</strong></li>
                  </ul>
                </div>
                <p>Les principaux défis de la <strong className="font-semibold">coopération internationale</strong> résident dans la souveraineté des États, la divergence des intérêts nationaux, la difficulté à faire respecter les engagements (notamment environnementaux), et la montée des protectionnismes et des nationalismes.</p>
                <p>La gestion des <strong className="font-semibold">biens publics mondiaux</strong> (climat, santé, stabilité financière) nécessite une coopération renforcée et des mécanismes de financement innovants.</p>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className="inline h-6 w-6 mr-2 text-eco-blue" />Conclusion</h2>
                <p>Les déséquilibres mondiaux sont inhérents à une économie globalisée et interdépendante. Qu'ils soient commerciaux, financiers, sociaux ou environnementaux, ils posent des défis complexes qui ne peuvent être résolus par des actions isolées.</p>
                <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-eco-blue mb-2">Points clés à retenir :</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-sm">
                    <li>Les déséquilibres des balances courantes et les dettes souveraines menacent la stabilité financière.</li>
                    <li>Les inégalités sociales et les dégradations environnementales compromettent un développement durable et équitable.</li>
                    <li>La régulation internationale, bien qu'essentielle, se heurte à des obstacles politiques et à la complexité des problèmes.</li>
                    <li>Une meilleure coordination des politiques nationales et un renforcement des institutions multilatérales sont nécessaires.</li>
                  </ul>
                </div>
                <p>Comprendre ces déséquilibres est crucial pour envisager des solutions visant à une mondialisation plus équilibrée, plus juste et plus respectueuse de la planète.</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur les déséquilibres mondiaux.</p>
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