"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  CheckCircle, 
  Clock, 
  Settings, // Icône principale pour régulation économique
  Gavel, // Pour fondements et objectifs
  ShieldCheck, // Pour instruments (protection, normes)
  Scaling, // Pour domaines d'application (concurrence, environnement)
  Scale, // Pour avantages et limites (remplace Balance)
  BookMarked,
  ListChecks,
  Info,
  HelpCircle
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

interface Notion {
  id: string;
  title: string;
  explication: string;
}

const slug = "regulation-economique";
const chapterTitle = "La Régulation Économique : Pourquoi et Comment ?";

export default function RegulationEconomiquePage() {
  const { getChapterProgress, updateChapterProgress, formatTime } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeSection, setActiveSection] = useState("introduction");
  const chapterId = slug;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeSpentRef = useRef(timeSpent);

  useEffect(() => {
    timeSpentRef.current = timeSpent;
  }, [timeSpent]);

  useEffect(() => {
    setMounted(true);
    const progress = getChapterProgress("economie", chapterId);
    if (progress) {
      setTimeSpent(progress.timeSpent);
      setIsCompleted(progress.completed);
    }
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
      updateChapterProgress("economie", chapterId, { timeSpent: timeSpentRef.current, completed: isCompleted });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, isCompleted, chapterId, updateChapterProgress]);

  const handleMarkAsCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  const notionsCles: Notion[] = [
    { id: "defaillance-marche", title: "Défaillance de marché", explication: "Situation où le marché ne parvient pas à allouer les ressources de manière optimale (externalités, biens publics, asymétries d'information)." },
    { id: "externalite", title: "Externalité", explication: "Effet de l'activité d'un agent économique sur le bien-être d'un autre agent, sans compensation monétaire." },
    { id: "bien-public", title: "Bien public", explication: "Bien caractérisé par la non-rivalité (la consommation par un agent n'empêche pas celle par un autre) et la non-exclusion (impossible d'empêcher un agent de le consommer)." },
    { id: "asymetrie-information", title: "Asymétrie d'information", explication: "Situation où une partie à une transaction dispose de plus d'informations que l'autre (ex: aléa moral, sélection adverse)." },
    { id: "politique-concurrence", title: "Politique de la concurrence", explication: "Ensemble des mesures visant à garantir une concurrence loyale et effective sur les marchés (lutte contre les cartels, abus de position dominante)." },
    { id: "regulation-sectorielle", title: "Régulation sectorielle", explication: "Régulation spécifique à certains secteurs économiques (ex: énergie, télécommunications, finance) en raison de leurs caractéristiques particulières." },
    { id: "normes-standards", title: "Normes et standards", explication: "Règles techniques, de qualité ou de sécurité imposées aux producteurs ou aux produits." },
    { id: "agence-regulation", title: "Agence de régulation indépendante", explication: "Organisme public doté d'une autonomie pour superviser un secteur ou une activité spécifique." },
  ];

  const pageSections = [
    { id: "introduction", title: "Introduction" },
    { id: "fondements-objectifs", title: "Fondements & Objectifs" },
    { id: "instruments-regulation", title: "Instruments" },
    { id: "domaines-application", title: "Domaines d'Application" },
    { id: "avantages-limites", title: "Avantages & Limites" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionIconMap = {
    introduction: { icon: <Info className="h-5 w-5 mr-1 text-eco-blue" />, label: "Introduction" },
    "fondements-objectifs": { icon: <Gavel className="h-5 w-5 mr-1 text-blue-500" />, label: "Fondements" },
    "instruments-regulation": { icon: <ShieldCheck className="h-5 w-5 mr-1 text-blue-600" />, label: "Instruments" },
    "domaines-application": { icon: <Scaling className="h-5 w-5 mr-1 text-blue-600" />, label: "Domaines" },
    "avantages-limites": { icon: <Scale className="h-5 w-5 mr-1 text-blue-600" />, label: "Avantages/Limites" },
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
              <Settings className="mr-2 h-8 w-8 text-eco-blue" /> {chapterTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Comprendre les raisons et les modalités de l'intervention publique pour encadrer les activités économiques.
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
                <h2><Info className="inline h-6 w-6 mr-2 text-eco-blue" />Introduction à la régulation économique</h2>
                <p>La régulation économique désigne l'ensemble des interventions des pouvoirs publics visant à encadrer les activités économiques et le fonctionnement des marchés. Si le marché est souvent perçu comme un mécanisme efficace d'allocation des ressources, il présente aussi des <strong className="font-semibold">défaillances</strong> qui justifient une intervention régulatrice de l'État.</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-eco-blue mb-2">Pourquoi réguler ?</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Corriger les défaillances de marché (externalités, biens publics, asymétries d'information, monopoles naturels).</li>
                    <li>Atteindre des objectifs sociaux, environnementaux ou éthiques que le marché seul ne prend pas en compte.</li>
                    <li>Assurer la stabilité de certains secteurs clés (finance, énergie).</li>
                    <li>Protéger les consommateurs et les investisseurs.</li>
                  </ul>
                </div>
                <p>La régulation peut prendre de multiples formes, allant de la simple incitation à la contrainte directe.</p>
              </>
            )}

            {activeSection === "fondements-objectifs" && (
              <>
                <h2><Gavel className="inline h-6 w-6 mr-2 text-blue-500" />Fondements et Objectifs de la régulation</h2>
                <p>La principale justification théorique de la régulation réside dans l'existence de <strong className="font-semibold">défaillances de marché</strong> :</p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong>Externalités :</strong> Les activités de production ou de consommation peuvent avoir des effets (positifs ou négatifs) sur des tiers sans compensation (ex: pollution, recherche fondamentale). La régulation vise à internaliser ces externalités (taxes, subventions, normes).</li>
                  <li><strong>Biens publics :</strong> Certains biens (ex: défense nationale, éclairage public) ne sont pas produits en quantité optimale par le marché car ils sont non-rivaux et non-exclusifs. L'État doit souvent en assurer la fourniture ou le financement.</li>
                  <li><strong>Asymétries d'information :</strong> Lorsqu'une partie à un échange dispose de plus d'informations que l'autre (ex: un vendeur connaît mieux son produit que l'acheteur), cela peut conduire à des sélections adverses ou des aléas moraux. La régulation peut imposer la transparence ou des garanties.</li>
                  <li><strong>Pouvoir de marché et monopoles naturels :</strong> Sans régulation, les monopoles peuvent fixer des prix élevés et réduire la production. Les monopoles naturels (où un seul producteur est plus efficace) nécessitent une régulation des prix ou des conditions d'accès.</li>
                </ul>
                <p>Les objectifs de la régulation sont donc de :</p>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Accroître l'efficacité économique en se rapprochant d'une allocation optimale des ressources.</li>
                        <li>Protéger l'intérêt général, les consommateurs, l'environnement.</li>
                        <li>Assurer un fonctionnement équitable et transparent des marchés.</li>
                    </ul>
                </div>
              </>
            )}

            {activeSection === "instruments-regulation" && (
              <>
                <h2><ShieldCheck className="inline h-6 w-6 mr-2 text-blue-600" />Instruments de la régulation économique</h2>
                <p>Les pouvoirs publics disposent d'un large éventail d'instruments pour réguler l'économie :</p>
                <div className="my-4 p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">Réglementation directe (approche "command and control")</h4>
                  <p className="text-sm mb-1">Imposition de <strong className="font-semibold">normes</strong> et <strong className="font-semibold">standards</strong> (qualité, sécurité, environnementales), interdictions, obligations, licences d'exploitation.</p>
                </div>
                <div className="my-4 p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">Instruments économiques (incitatifs)</h4>
                  <p className="text-sm mb-1">Utilisation des mécanismes de prix pour orienter les comportements : <strong className="font-semibold">taxes</strong> (ex: taxe carbone), <strong className="font-semibold">subventions</strong> (ex: aides à l'innovation verte), création de <strong className="font-semibold">marchés de droits à polluer</strong>.</p>
                </div>
                <div className="my-4 p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">Fourniture publique et entreprises publiques</h4>
                  <p className="text-sm mb-1">L'État peut prendre directement en charge la production de certains biens ou services (notamment les biens publics).</p>
                </div>
                 <div className="my-4 p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">Information et persuasion</h4>
                  <p className="text-sm mb-1">Campagnes d'information, labels, recommandations pour influencer les choix des agents.</p>
                </div>
                <p>La mise en œuvre de la régulation est souvent confiée à des <strong className="font-semibold">agences de régulation indépendantes</strong> pour garantir leur neutralité et leur expertise technique.</p>
              </>
            )}

            {activeSection === "domaines-application" && (
              <>
                <h2><Scaling className="inline h-6 w-6 mr-2 text-blue-600" />Principaux domaines d'application de la régulation</h2>
                <p>La régulation s'applique à de nombreux domaines :</p>
                <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                        <h4 className="text-base font-semibold text-purple-700 dark:text-purple-300 mb-2">Politique de la concurrence</h4>
                        <p className="text-sm">Lutte contre les ententes (cartels), les abus de position dominante, contrôle des concentrations (fusions-acquisitions) pour maintenir une concurrence effective.</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <h4 className="text-base font-semibold text-green-700 dark:text-green-300 mb-2">Régulation environnementale</h4>
                        <p className="text-sm">Normes de pollution, marchés de quotas d'émission, taxes écologiques pour protéger l'environnement.</p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">Régulation financière</h4>
                        <p className="text-sm">Supervision des banques et des marchés financiers pour assurer leur stabilité et protéger les épargnants (ex: ratios prudentiels, règles de transparence).</p>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                        <h4 className="text-base font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Régulation sectorielle</h4>
                        <p className="text-sm">Secteurs spécifiques comme l'énergie, les télécommunications, les transports, la santé, qui présentent des caractéristiques de monopole naturel ou des enjeux de service public.</p>
                    </div>
                     <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                        <h4 className="text-base font-semibold text-red-700 dark:text-red-300 mb-2">Protection du consommateur</h4>
                        <p className="text-sm">Normes de sécurité des produits, information sur les prix, lutte contre les pratiques commerciales trompeuses.</p>
                    </div>
                </div>
              </>
            )}

            {activeSection === "avantages-limites" && (
              <>
                <h2><Scale className="inline h-6 w-6 mr-2 text-blue-600" />Avantages et Limites de la régulation</h2>
                 <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">Avantages</h4>
                    <ul className="list-disc list-inside space-y-0.5 text-sm">
                      <li>Correction des défaillances de marché.</li>
                      <li>Meilleure prise en compte de l'intérêt général.</li>
                      <li>Protection des parties faibles (consommateurs, salariés).</li>
                      <li>Stabilité économique et financière accrue.</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">Limites et Risques</h4>
                    <ul className="list-disc list-inside space-y-0.5 text-sm">
                      <li><strong className="font-semibold">Coûts de la régulation :</strong> coûts administratifs pour l'État et coûts de conformité pour les entreprises.</li>
                      <li><strong className="font-semibold">Risque de capture du régulateur :</strong> le régulateur peut être influencé par les intérêts des entreprises qu'il est censé réguler.</li>
                      <li><strong className="font-semibold">Information imparfaite du régulateur :</strong> difficulté à obtenir l'information nécessaire pour une régulation optimale.</li>
                      <li><strong className="font-semibold">Effets pervers :</strong> la régulation peut freiner l'innovation ou créer des distorsions involontaires.</li>
                      <li>Lourdeur administrative et manque de flexibilité.</li>
                    </ul>
                  </div>
                </div>
                <p>Le débat porte souvent sur le bon dosage de régulation : ni trop, pour ne pas étouffer l'initiative privée, ni trop peu, pour éviter les excès et les crises.</p>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className="inline h-6 w-6 mr-2 text-eco-blue" />Conclusion</h2>
                <p>La régulation économique est un instrument indispensable de la gouvernance économique moderne. Elle vise à concilier les mécanismes de marché avec des objectifs d'efficacité, d'équité et de stabilité. Son efficacité dépend de la pertinence de ses objectifs, du choix des instruments et de la qualité de sa mise en œuvre.</p>
                <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-eco-blue mb-2">Points clés à retenir :</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-sm">
                    <li>La régulation se justifie par les défaillances de marché (externalités, biens publics, asymétries d'info, pouvoir de marché).</li>
                    <li>Elle utilise des instruments variés : normes, taxes/subventions, agences indépendantes.</li>
                    <li>Domaines clés : concurrence, environnement, finance, secteurs spécifiques.</li>
                    <li>Elle présente des avantages mais aussi des coûts et des risques (capture, information imparfaite).</li>
                  </ul>
                </div>
                <p>Les défis actuels de la régulation incluent l'encadrement des géants du numérique (GAFAM), la transition écologique, et la régulation des nouvelles technologies (IA, crypto-actifs).</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur la régulation économique.</p>
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