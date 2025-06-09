"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Users, // Module Icon
  Smartphone, // Main chapter icon: Sociabilité Numérique
  Wifi, // Icon for forms/platforms
  MessageSquare, // Icon for interactions
  Globe, // Icon for online communities
  BookMarked,
  ListChecks,
  Info,
  HelpCircle,
  Users2, // Icon for impact/comparison
  AlertTriangle // For issues/challenges
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

interface Notion {
  id: string;
  title: string;
  explication: string;
}

const slug = "sociabilite-numerique";
const chapterTitle = "La Sociabilité Numérique";
const subject = "sociologie";
const moduleSlug = "groupes-sociaux";
const accentColor = "socio-purple";

export default function SociabiliteNumeriquePage() {
  const { getChapterProgress, updateChapterProgress, formatTime } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeSection, setActiveSection] = useState("introduction");
  const chapterId = slug;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeSpentRef = useRef(timeSpent);

  // Refs for progress functions
  const getChapterProgressRef = useRef(getChapterProgress);
  const updateChapterProgressRef = useRef(updateChapterProgress);

  useEffect(() => {
    getChapterProgressRef.current = getChapterProgress;
    updateChapterProgressRef.current = updateChapterProgress;
  }); // Runs on every render to keep refs updated

  useEffect(() => {
    timeSpentRef.current = timeSpent;
  }, [timeSpent]);

  useEffect(() => {
    setMounted(true);
    const progress = getChapterProgressRef.current(subject, chapterId);
    if (progress) {
      setTimeSpent(progress.timeSpent);
      setIsCompleted(progress.completed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId, subject]); // Removed getChapterProgress

  useEffect(() => {
    if (!mounted) return;
    if (!isCompleted) {
      intervalRef.current = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      updateChapterProgressRef.current(subject, chapterId, {
        timeSpent: timeSpentRef.current,
        completed: isCompleted,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, isCompleted, chapterId, subject]); // Removed updateChapterProgress

  const handleMarkAsCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  const notionsCles: Notion[] = [
    {
      id: "sociabilite-numerique",
      title: "Sociabilité numérique",
      explication: "Ensemble des relations sociales entretenues par le biais des technologies numériques (réseaux sociaux, messageries, jeux en ligne, etc.).",
    },
    {
      id: "communaute-en-ligne",
      title: "Communauté en ligne",
      explication: "Groupe de personnes interagissant autour d\'un intérêt commun via Internet, développant un sentiment d\'appartenance.",
    },
    {
      id: "identite-numerique",
      title: "Identité numérique",
      explication: "Ensemble des traces numériques (profils, publications, etc.) qu\'un individu laisse sur Internet, contribuant à sa présentation de soi.",
    },
    {
      id: "cyberdependance",
      title: "Cyberdépendance",
      explication: "Usage excessif et incontrôlable d\'Internet et des outils numériques, ayant des conséquences négatives sur la vie quotidienne.",
    },
    {
      id: "fracture-numerique",
      title: "Fracture numérique",
      explication: "Inégalités d\'accès et d\'usage des technologies de l\'information et de la communication (TIC).",
    },
  ];

  const pageSections = [
    { id: "introduction", title: "Introduction" },
    { id: "formes_plateformes", title: "Formes et Plateformes" },
    { id: "impact_traditionnel", title: "Impact sur la Sociabilité Traditionnelle" },
    { id: "communautes_ligne", title: "Communautés en Ligne" },
    { id: "enjeux_defis", title: "Enjeux et Défis" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionIconMap = {
    introduction: { icon: <Info className={`h-5 w-5 mr-1 text-${accentColor}`} />, label: "Intro" },
    formes_plateformes: { icon: <Wifi className="h-5 w-5 mr-1 text-blue-500" />, label: "Formes" },
    impact_traditionnel: { icon: <Users2 className="h-5 w-5 mr-1 text-green-500" />, label: "Impact" },
    communautes_ligne: { icon: <Globe className="h-5 w-5 mr-1 text-yellow-500" />, label: "Communautés" },
    enjeux_defis: { icon: <AlertTriangle className="h-5 w-5 mr-1 text-red-500" />, label: "Enjeux" },
    conclusion: { icon: <ListChecks className={`h-5 w-5 mr-1 text-${accentColor}`} />, label: "Conclusion" },
  } as const;
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href={`/${subject}/${moduleSlug}`}
          className={`flex items-center text-${accentColor} hover:text-${accentColor}/80 dark:text-${accentColor} dark:hover:text-${accentColor}/70 mb-4 transition-colors`}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour au module {moduleSlug.replace(/-/g, ' ').charAt(0).toUpperCase() + moduleSlug.replace(/-/g, ' ').slice(1)}
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center`}>
              <Smartphone className={`mr-3 h-8 w-8 text-${accentColor}`} /> {chapterTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Analyser comment les technologies numériques transforment nos manières d\'interagir et de faire société.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="h-5 w-5 mr-1" />
              <span>Temps: {formatTime(timeSpent)}</span>
            </div>
            <button
              onClick={handleMarkAsCompleted}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isCompleted ? `bg-${accentColor}/10 text-${accentColor} dark:bg-${accentColor}/20` : `bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300`}`}
            >
              <CheckCircle className="h-5 w-5 mr-1" />
              {isCompleted ? "Terminé" : "Marquer comme terminé"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <nav className="md:w-64 w-full md:sticky md:top-24 self-start bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-8 md:mb-0 flex-shrink-0">
          <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Sommaire du chapitre</h3>
          <ul className="space-y-2 md:space-y-2 flex md:flex-col flex-row overflow-x-auto">
            {pageSections.map((section) => (
              <li key={section.id} className="flex-1 md:flex-none">
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors text-left focus:outline-none focus:ring-2 focus:ring-${accentColor} ${activeSection === section.id ? `bg-${accentColor} text-white` : `bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700`}`}
                  aria-current={activeSection === section.id ? "page" : undefined}
                >
                  {sectionIconMap[section.id as keyof typeof sectionIconMap].icon}
                  <span className="hidden md:inline ml-2">
                    {sectionIconMap[section.id as keyof typeof sectionIconMap].label}
                  </span>
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
                <h2><Info className={`inline h-6 w-6 mr-2 text-${accentColor}`} /> Introduction: Vers une sociabilité connectée ?</h2>
                <p>
                  L'avènement d'Internet et la prolifération des outils numériques (smartphones, tablettes, ordinateurs) ont profondément modifié nos manières d'entrer en relation les uns avec les autres. La <strong className="font-semibold">sociabilité numérique</strong> désigne l'ensemble de ces interactions sociales médiatisées par les technologies. Loin de simplement reproduire les formes traditionnelles de sociabilité, elle en crée de nouvelles, avec leurs propres codes, opportunités et défis.
                </p>
                <div className={`bg-${accentColor}/5 dark:bg-${accentColor}/10 rounded-lg p-3 my-3 not-prose border-l-4 border-${accentColor}`}>
                  <h4 className={`text-base font-semibold text-${accentColor} mb-2`}>Questions centrales :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Quelles sont les principales formes de sociabilité numérique ?</li>
                    <li>Le numérique enrichit-il ou appauvrit-il nos relations sociales ?</li>
                    <li>Comment se constituent les communautés en ligne ?</li>
                    <li>Quels sont les enjeux liés à l'identité et à la vie privée à l'ère numérique ?</li>
                  </ul>
                </div>
              </>
            )}

            {activeSection === "formes_plateformes" && (
              <>
                <h2><Wifi className="inline h-6 w-6 mr-2 text-blue-500" /> Formes et Plateformes de la Sociabilité Numérique</h2>
                <p>La sociabilité numérique s'exprime à travers une multitude de plateformes et d'outils :</p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">Réseaux sociaux généralistes (Facebook, Instagram, X) :</strong> Maintien des liens existants (amis, famille), partage d'informations, expression de soi, suivi de l'actualité.</li>
                  <li><strong className="font-semibold">Messageries instantanées (WhatsApp, Messenger, Signal) :</strong> Conversations privées ou en petits groupes, coordination quotidienne, maintien de liens forts.</li>
                  <li><strong className="font-semibold">Réseaux sociaux professionnels (LinkedIn, Viadeo) :</strong> Gestion de carrière, réseautage professionnel, recherche d'emploi.</li>
                  <li><strong className="font-semibold">Forums et groupes de discussion thématiques (Reddit, Discord, groupes Facebook) :</strong> Échanges autour d'intérêts spécifiques, formation de communautés d'intérêt.</li>
                  <li><strong className="font-semibold">Jeux en ligne massivement multijoueurs (MMORPG) :</strong> Interactions ludiques, collaboration, formation d'équipes et de guildes.</li>
                  <li><strong className="font-semibold">Blogs et microblogging :</strong> Partage d'opinions, création de contenu, interaction via les commentaires.</li>
                  <li><strong className="font-semibold">Applications de rencontre :</strong> Recherche de partenaires amoureux ou amicaux.</li>
                </ul>
                 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-2">Caractéristiques des interactions numériques :</h4>
                  <p className="text-sm">Elles peuvent être <strong className="font-semibold">synchrones</strong> (en temps réel, comme un chat) ou <strong className="font-semibold">asynchrones</strong> (différées, comme un email ou un commentaire de blog). Elles permettent de dépasser les contraintes géographiques et temporelles.</p>
                </div>
              </>
            )}

            {activeSection === "impact_traditionnel" && (
              <>
                <h2><Users2 className="inline h-6 w-6 mr-2 text-green-500" /> Impact sur la Sociabilité Traditionnelle</h2>
                <p>
                  La question de l'impact de la sociabilité numérique sur les relations en face-à-face est complexe et débattue. Plusieurs perspectives existent :
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                    <li><strong className="font-semibold">Thèse du complément :</strong> La sociabilité numérique viendrait <strong className="font-semibold">enrichir et compléter</strong> la sociabilité traditionnelle. Elle permet de maintenir des liens à distance, de faciliter l'organisation de rencontres physiques, et d'étendre son réseau. Les outils numériques sont un moyen de plus pour interagir.</li>
                    <li><strong className="font-semibold">Thèse du substitut (ou de l'appauvrissement) :</strong> La sociabilité numérique tendrait à <strong className="font-semibold">remplacer</strong> les interactions en face-à-face, conduisant à un appauvrissement de la qualité des liens (moins d'empathie, superficialité) et à un isolement social. Cette thèse est souvent nuancée par les études récentes.</li>
                    <li><strong className="font-semibold">Thèse de la transformation :</strong> Plus qu'un simple complément ou substitut, le numérique <strong className="font-semibold">transforme</strong> la nature même de la sociabilité. Les frontières entre "en ligne" et "hors ligne" deviennent poreuses. On parle d\'<strong className="font-semibold">individualisme connecté</strong> (Barry Wellman) : les individus sont moins dépendants de groupes locaux et plus autonomes dans la gestion de leurs multiples réseaux.</li>
                </ul>
                 <div className={`bg-green-50 dark:bg-green-900/20 rounded-lg p-3 my-3 not-prose border-l-4 border-green-500`}>
                  <h4 className="text-base font-semibold text-green-600 dark:text-green-400 mb-2">Nuances importantes :</h4>
                  <p className="text-sm">L'impact varie fortement selon les individus (âge, personnalité, compétences numériques), les types de plateformes utilisées et les contextes sociaux. Le numérique peut renforcer les liens existants autant qu'il peut en créer de nouveaux.</p>
                </div>
              </>
            )}
            
            {activeSection === "communautes_ligne" && (
              <>
                <h2><Globe className="inline h-6 w-6 mr-2 text-yellow-500" /> Les Communautés en Ligne</h2>
                <p>Internet a favorisé l'émergence de <strong className="font-semibold">communautés en ligne</strong> (ou communautés virtuelles). Ce sont des groupes sociaux dont les membres interagissent principalement via des supports numériques autour d'un <strong className="font-semibold">intérêt commun</strong> (passion, hobby, maladie, identité partagée, projet, etc.).</p>
                <ul className="list-disc list-inside space-y-1 my-3">
                    <li><strong className="font-semibold">Caractéristiques :</strong> Partage d'informations, soutien mutuel, développement d'un sentiment d'appartenance, élaboration de normes et de codes spécifiques au groupe.</li>
                    <li><strong className="font-semibold">Diversité :</strong> Elles peuvent être très variées : forums de fans, groupes de soutien pour malades, communautés de joueurs, groupes militants, etc.</li>
                    <li><strong className="font-semibold">Liens sociaux :</strong> Les relations au sein de ces communautés peuvent être intenses et significatives, même si elles sont médiatisées. Elles peuvent parfois déboucher sur des rencontres physiques.</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-3 my-3 not-prose">
                    <h4 className="text-base font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Exemple : Les forums d'entraide</h4>
                    <p className="text-sm">Les forums dédiés à des maladies rares permettent aux patients et à leurs familles de rompre l'isolement, d'échanger des conseils pratiques et de trouver un soutien émotionnel précieux, formant ainsi une communauté solidaire.</p>
                </div>
                <p>Ces communautés montrent que le lien social peut se construire et se maintenir efficacement à travers les interactions numériques, en transcendant souvent les barrières géographiques.</p>
              </>
            )}

            {activeSection === "enjeux_defis" && (
              <>
                <h2><AlertTriangle className="inline h-6 w-6 mr-2 text-red-500" /> Enjeux et Défis de la Sociabilité Numérique</h2>
                <p>
                  Si la sociabilité numérique offre de nombreuses opportunités, elle soulève également des enjeux importants et des défis :
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">Identité numérique et présentation de soi :</strong> Gestion de l'image en ligne, mise en scène de soi, risque de décalage entre identité réelle et virtuelle.</li>
                  <li><strong className="font-semibold">Vie privée et données personnelles :</strong> Collecte et usage des données par les plateformes, risques de surveillance, cybermalveillance.</li>
                  <li><strong className="font-semibold">Cyberdépendance et surcharge informationnelle :</strong> Risque d'usage excessif, difficulté à déconnecter, anxiété liée à la peur de manquer quelque chose (FOMO).</li>
                  <li><strong className="font-semibold">Cyberharcèlement et discours de haine :</strong> Propagation rapide de contenus violents ou haineux, sentiment d'impunité.</li>
                  <li><strong className="font-semibold">Fracture numérique :</strong> Inégalités d'accès aux outils numériques (matériel, connexion) et de compétences pour les utiliser (illectronisme), créant de nouvelles formes d'exclusion.</li>
                  <li><strong className="font-semibold">Fiabilité de l'information :</strong> Diffusion de fausses nouvelles (fake news), rumeurs, difficulté à évaluer la crédibilité des sources.</li>
                </ul>
                 <div className={`bg-red-50 dark:bg-red-900/20 rounded-lg p-3 my-3 not-prose border-l-4 border-red-500`}>
                  <h4 className="text-base font-semibold text-red-600 dark:text-red-400 mb-2">Un équilibre à trouver :</h4>
                  <p className="text-sm">L'enjeu est de développer une <strong className="font-semibold">littératie numérique</strong> critique, permettant de tirer parti des avantages du numérique tout en se prémunissant contre ses risques.</p>
                </div>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className={`inline h-6 w-6 mr-2 text-${accentColor}`} /> Conclusion : Une sociabilité en constante évolution</h2>
                <p>
                  La sociabilité numérique est devenue une composante incontournable de la vie sociale contemporaine. Elle transforme nos façons d'interagir, de nous informer, de nous mobiliser et de construire notre identité. Plutôt que de l'opposer frontalement à la sociabilité traditionnelle, il convient d'analyser leurs interactions complexes et la manière dont elles se reconfigurent mutuellement.
                </p>
                <div className={`my-4 p-3 bg-${accentColor}/10 dark:bg-${accentColor}/20 rounded-lg not-prose`}>
                  <h4 className={`text-base font-semibold text-${accentColor} mb-2`}>Points clés à retenir :</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-sm">
                    <li>La sociabilité numérique englobe toutes les relations sociales médiatisées par la technologie.</li>
                    <li>Elle se manifeste via de multiples plateformes (réseaux sociaux, messageries, forums, jeux).</li>
                    <li>Son impact sur la sociabilité traditionnelle est débattu (complément, substitut, transformation).</li>
                    <li>Les communautés en ligne peuvent créer des liens sociaux forts autour d'intérêts communs.</li>
                    <li>Elle soulève des enjeux majeurs : identité, vie privée, cyberdépendance, fracture numérique, désinformation.</li>
                  </ul>
                </div>
                <p>
                  Comprendre la sociabilité numérique est essentiel pour saisir les dynamiques sociales actuelles et les défis des sociétés connectées.
                </p>
              </>
            )}
          </motion.div>
        </div>

        <aside className="md:w-64 w-full flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:sticky md:top-24">
            <h3 className={`font-semibold text-lg mb-4 flex items-center text-${accentColor}`}><BookMarked className="h-5 w-5 mr-2" />Ressources</h3>
            <div className="space-y-4">
              <div className={`p-3 bg-${accentColor}/5 dark:bg-${accentColor}/10 rounded-lg`}>
                <h4 className={`font-medium text-${accentColor} mb-1 flex items-center`}><HelpCircle className="h-5 w-5 mr-1.5"/>Quiz associé</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur la sociabilité numérique.</p>
                <Link 
                  href={`/quiz/${subject}/${moduleSlug}/${slug}`}
                  className={`text-sm text-white bg-${accentColor} px-3 py-1.5 rounded inline-flex items-center hover:bg-${accentColor}/80 transition-colors`}
                >
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