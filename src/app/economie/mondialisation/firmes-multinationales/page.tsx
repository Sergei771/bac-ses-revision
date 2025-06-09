"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  CheckCircle, 
  Clock, 
  Briefcase, // Icône pour les FMN
  TrendingUp, 
  Users, // Pour les acteurs sociaux
  BarChart3,
  BookMarked,
  ListChecks,
  Info,
  Scale, // Pour les aspects légaux/éthiques
  Lightbulb, // Pour l'innovation
  HelpCircle
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

interface Notion {
  id: string;
  title: string;
  explication: string;
}

const slug = "firmes-multinationales";
const chapterTitle = "Les Firmes Multinationales (FMN) : Stratégies, Impacts et Débats";

export default function FirmesMultinationalesPage() {
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
    { id: "fmn", title: "Firme Multinationale (FMN)", explication: "Entreprise possédant au moins une unité de production à l'étranger (filiale)." },
    { id: "ide-fmn", title: "IDE et FMN", explication: "Les FMN sont les principaux vecteurs des Investissements Directs à l'Étranger." },
    { id: "strategie-localisation", title: "Stratégies de localisation", explication: "Choix des FMN pour implanter leurs activités (coûts, marché, compétences)." },
    { id: "division-internationale-processus-productif", title: "DIPP", explication: "Décomposition par les FMN des étapes de production dans différents pays." },
    { id: "prix-transfert", title: "Prix de transfert", explication: "Prix des biens/services échangés entre filiales d'une même FMN, pouvant être optimisés fiscalement." },
    { id: "attractivite-territoire", title: "Attractivité du territoire", explication: "Ensemble des facteurs rendant un pays attirant pour les IDE des FMN." },
    { id: "effets-fmn", title: "Effets des FMN sur les économies", explication: "Impacts positifs (emploi, R&D) et négatifs (concurrence, évasion fiscale) sur pays d'accueil et d'origine." },
    { id: "rse-fmn", title: "RSE et FMN", explication: "Responsabilité Sociale des Entreprises appliquée aux FMN (enjeux éthiques, sociaux, environnementaux)." },
  ];

  const pageSections = [
    { id: "introduction", title: "Introduction" },
    { id: "strategies-fmn", title: "Stratégies des FMN" },
    { id: "impacts-pays-accueil", title: "Impacts (Pays d'accueil)" },
    { id: "impacts-pays-origine", title: "Impacts (Pays d'origine)" },
    { id: "debat-regulation", title: "Débats et Régulation" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionIconMap = {
    introduction: { icon: <Info className="h-5 w-5 mr-1 text-eco-blue" />, label: "Introduction" },
    "strategies-fmn": { icon: <TrendingUp className="h-5 w-5 mr-1 text-green-500" />, label: "Stratégies" },
    "impacts-pays-accueil": { icon: <Users className="h-5 w-5 mr-1 text-purple-500" />, label: "Impacts (Accueil)" },
    "impacts-pays-origine": { icon: <BarChart3 className="h-5 w-5 mr-1 text-orange-500" />, label: "Impacts (Origine)" },
    "debat-regulation": { icon: <Scale className="h-5 w-5 mr-1 text-red-500" />, label: "Débats & Régulation" },
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
              <Briefcase className="mr-2 h-8 w-8 text-eco-blue" /> {chapterTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Analyser le rôle central des firmes multinationales dans la mondialisation, leurs stratégies d'expansion et les enjeux associés.
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
                <h2><Info className="inline h-6 w-6 mr-2 text-eco-blue" />Qu'est-ce qu'une Firme Multinationale (FMN) ?</h2>
                <p>Une Firme Multinationale (FMN), aussi appelée firme transnationale (FTN), est une entreprise qui possède ou contrôle des unités de production (filiales, usines, bureaux) dans au moins deux pays. Elle répartit ses activités (conception, production, commercialisation) à l'échelle internationale.</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-eco-blue mb-2">Caractéristiques clés des FMN :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Présence internationale :</strong> Implantation dans plusieurs pays via des filiales.</li>
                    <li><strong>Investissements Directs à l'Étranger (IDE) :</strong> Principal mode d'expansion.</li>
                    <li><strong>Stratégie globale :</strong> Coordination des activités à l'échelle mondiale.</li>
                    <li><strong>Taille et puissance économique :</strong> Chiffre d'affaires souvent comparable au PIB de certains États.</li>
                  </ul>
                </div>
                <p>Les FMN sont des acteurs majeurs de la mondialisation, influençant les flux commerciaux, financiers, technologiques et culturels. Ce chapitre explore leurs stratégies, leurs impacts et les débats qu'elles suscitent.</p>
              </>
            )}

            {activeSection === "strategies-fmn" && (
              <>
                <h2><TrendingUp className="inline h-6 w-6 mr-2 text-green-500" />Stratégies d'internationalisation des FMN</h2>
                <p>Les FMN adoptent diverses stratégies pour s'implanter et se développer à l'international, motivées par plusieurs objectifs.</p>
                <div className="my-4 p-4 border-l-4 border-green-600 bg-green-50 dark:bg-green-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-green-700 dark:text-green-300 mb-2">Principales motivations à l'internationalisation :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Accès aux marchés (stratégie de demande) :</strong> Conquérir de nouveaux clients, contourner les barrières protectionnistes.</li>
                    <li><strong>Réduction des coûts (stratégie d'offre/de rationalisation) :</strong> Bénéficier de coûts de main-d'œuvre plus faibles, de matières premières moins chères, d'une fiscalité avantageuse.</li>
                    <li><strong>Accès aux ressources et compétences :</strong> Se rapprocher des matières premières, des technologies, des savoir-faire spécifiques.</li>
                    <li><strong>Optimisation de la chaîne de valeur (DIPP) :</strong> Division Internationale du Processus Productif en localisant chaque étape là où elle est la plus efficiente.</li>
                  </ul>
                </div>
                <div className="my-4 p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-purple-700 dark:text-purple-300 mb-2">Formes d'internationalisation :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Exportation :</strong> Vente de biens/services produits nationalement vers l'étranger.</li>
                    <li><strong>Création de filiales (IDE greenfield) :</strong> Implantation d'une nouvelle unité de production à l'étranger.</li>
                    <li><strong>Fusion-acquisition (IDE brownfield) :</strong> Rachat d'une entreprise existante à l'étranger.</li>
                    <li><strong>Joint-ventures (coentreprises) :</strong> Association avec un partenaire local.</li>
                    <li><strong>Franchise, licences :</strong> Contrats permettant d'exploiter une marque ou un savoir-faire.</li>
                  </ul>
                </div>
                 <p>Les <strong className="font-semibold">prix de transfert</strong>, prix des échanges internes entre filiales d'une même FMN, sont un outil stratégique clé, permettant d'optimiser la localisation des profits et la charge fiscale globale.</p>
              </>
            )}

            {activeSection === "impacts-pays-accueil" && (
              <>
                <h2><Users className="inline h-6 w-6 mr-2 text-purple-500" />Impacts des FMN sur les pays d'accueil</h2>
                <p>L'implantation de FMN génère des effets variés, souvent ambivalents, sur les économies des pays d'accueil.</p>
                <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-green-700 dark:text-green-300 mb-2">Effets positifs potentiels :</h4>
                    <ul className="list-disc list-inside space-y-0.5 text-sm">
                      <li>Création d'emplois (directs et indirects).</li>
                      <li>Transferts de technologie et de savoir-faire.</li>
                      <li>Stimulation de la concurrence et de l'innovation.</li>
                      <li>Augmentation des exportations et amélioration de la balance commerciale.</li>
                      <li>Hausse des recettes fiscales (si pas d'optimisation agressive).</li>
                      <li>Développement des infrastructures locales.</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                     <h4 className="text-base font-semibold text-red-700 dark:text-red-300 mb-2">Effets négatifs potentiels :</h4>
                     <ul className="list-disc list-inside space-y-0.5 text-sm">
                       <li>Destruction d'emplois dans les entreprises locales moins compétitives.</li>
                       <li>Risque de dépendance technologique et économique.</li>
                       <li>Évasion fiscale via les prix de transfert et la localisation dans les paradis fiscaux.</li>
                       <li>Impacts environnementaux et sociaux négatifs (conditions de travail).</li>
                       <li>Rapatriement des profits limitant l'investissement local.</li>
                       <li>Influence politique et contournement des régulations nationales.</li>
                     </ul>
                  </div>
                </div>
                <p>L'<strong className="font-semibold">attractivité d'un territoire</strong> (stabilité politique, qualité des infrastructures, main-d'œuvre qualifiée, fiscalité) est un facteur clé pour attirer les IDE des FMN.</p>
              </>
            )}

            {activeSection === "impacts-pays-origine" && (
              <>
                <h2><BarChart3 className="inline h-6 w-6 mr-2 text-orange-500" />Impacts des FMN sur les pays d'origine</h2>
                <p>L'internationalisation des entreprises nationales a également des conséquences sur leur pays d'origine.</p>
                <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
                    <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <h4 className="text-base font-semibold text-green-700 dark:text-green-300 mb-2">Effets positifs potentiels :</h4>
                        <ul className="list-disc list-inside space-y-0.5 text-sm">
                            <li>Rapatriement des bénéfices réalisés à l'étranger.</li>
                            <li>Maintien des activités à forte valeur ajoutée (R&D, siège social).</li>
                            <li>Accès à de nouveaux marchés et sources d'approvisionnement.</li>
                            <li>Renforcement de la compétitivité globale des entreprises nationales.</li>
                            <li>Diffusion de l'innovation.</li>
                        </ul>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                        <h4 className="text-base font-semibold text-red-700 dark:text-red-300 mb-2">Effets négatifs potentiels :</h4>
                        <ul className="list-disc list-inside space-y-0.5 text-sm">
                            <li>Délocalisations et pertes d'emplois (surtout peu qualifiés).</li>
                            <li>Désindustrialisation de certaines régions.</li>
                            <li>Moindre investissement sur le territoire national.</li>
                            <li>Risque de perte de substance technologique si la R&D est aussi délocalisée.</li>
                            <li>Baisse des recettes fiscales si optimisation agressive.</li>
                        </ul>
                    </div>
                </div>
                <p>Le débat sur les délocalisations est particulièrement sensible, opposant les gains de compétitivité pour l'entreprise aux coûts sociaux pour le territoire d'origine.</p>
              </>
            )}

            {activeSection === "debat-regulation" && (
              <>
                <h2><Scale className="inline h-6 w-6 mr-2 text-red-500" />Débats et Régulation des FMN</h2>
                <p>La puissance croissante des FMN soulève de nombreux débats et la question de leur régulation.</p>
                <div className="my-4 p-4 bg-sky-50 dark:bg-sky-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-sky-700 dark:text-sky-300 mb-2">Principaux enjeux et débats :</h4>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-sm">
                    <li><strong>Optimisation et évasion fiscales :</strong> Les stratégies des FMN pour minimiser leurs impôts (prix de transfert, paradis fiscaux) privent les États de recettes considérables. Des initiatives comme BEPS (OCDE/G20) tentent d'y remédier.</li>
                    <li><strong>Responsabilité Sociale des Entreprises (RSE) :</strong> Pression croissante pour que les FMN respectent des normes sociales et environnementales dans leurs filiales (conditions de travail, droits humains, impact écologique).</li>
                    <li><strong>Pouvoir de marché et concurrence :</strong> Risque de positions dominantes et d'abus, nécessitant une vigilance des autorités de la concurrence.</li>
                    <li><strong>Influence sur les politiques nationales :</strong> Capacité des FMN à peser sur les décisions des États (lobbying, chantage à la délocalisation).</li>
                    <li><strong>Difficulté d'une régulation internationale :</strong> Absence d'autorité mondiale contraignante, souveraineté des États.</li>
                  </ul>
                </div>
                <p>Des codes de conduite volontaires, des initiatives d'ONG, et une coopération internationale accrue sont des pistes pour encadrer les activités des FMN, mais leur efficacité reste débattue.</p>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className="inline h-6 w-6 mr-2 text-eco-blue" />Conclusion</h2>
                <p>Les firmes multinationales sont des acteurs incontournables et ambivalents de la mondialisation. Leurs stratégies d'internationalisation redessinent la carte économique mondiale, apportant des bénéfices en termes d'efficacité productive et d'accès aux biens, mais posant aussi des défis majeurs en matière d'emploi, d'inégalités, de fiscalité et de régulation.</p>
                <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-eco-blue mb-2">Points clés à retenir :</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-sm">
                    <li>Les FMN opèrent via des IDE et des stratégies de localisation complexes (DIPP).</li>
                    <li>Impacts contrastés sur les pays d'accueil (emplois, R&D vs. dépendance, évasion fiscale) et d'origine (compétitivité vs. délocalisations).</li>
                    <li>Débats intenses sur l'optimisation fiscale, la RSE et la nécessité d'une meilleure gouvernance mondiale.</li>
                  </ul>
                </div>
                <p>Analyser le rôle des FMN est essentiel pour comprendre les dynamiques de l'économie globale et les enjeux du développement durable.</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur les firmes multinationales.</p>
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