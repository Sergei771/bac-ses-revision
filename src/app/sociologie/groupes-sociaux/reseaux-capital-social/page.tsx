"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen, 
  CheckCircle,
  Clock,
  Users, // Module Icon for Groups & Social Networks
  Share2, // Main chapter icon: Réseaux
  Link2, // Icon for definition
  Coins, // Icon for Capital Social concept
  BookMarked,
  ListChecks,
  Info,
  HelpCircle,
  TrendingUp, // For evolution/advantages
  Users2, // For Bourdieu/Putnam's focus on people
  AlertTriangle // For limits/inequalities
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

interface Notion {
  id: string;
  title: string;
  explication: string;
}

const slug = "reseaux-capital-social";
const chapterTitle = "Les Réseaux Sociaux et le Capital Social";
const subject = "sociologie";
const moduleSlug = "groupes-sociaux";
const accentColor = "socio-purple"; // Ensured socio-purple

export default function ReseauxCapitalSocialPage() {
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
      id: "reseau-social",
      title: "Réseau social (sociologique)",
      explication: "Ensemble d'acteurs (individus, groupes) et des liens qui les unissent.",
    },
    {
      id: "capital-social",
      title: "Capital social",
      explication: "Ensemble des ressources (actuelles ou potentielles) liées à la possession d'un réseau durable de relations.",
    },
    {
      id: "liens-forts",
      title: "Liens forts",
      explication: "Relations intimes, fréquentes et réciproques (ex: famille, amis proches).",
    },
    {
      id: "liens-faibles",
      title: "Liens faibles (Granovetter)",
      explication: "Relations plus distantes, moins fréquentes, mais importantes pour l'accès à de nouvelles informations/opportunités.",
    },
    {
      id: "capital-bonding",
      title: "Capital social de lien (bonding - Putnam)",
      explication: "Relations au sein de groupes homogènes, renforçant la cohésion interne.",
    },
    {
      id: "capital-bridging",
      title: "Capital social de pont (bridging - Putnam)",
      explication: "Relations entre groupes différents, ouvrant à de nouvelles ressources.",
    },
  ];

  const pageSections = [
    { id: "introduction", title: "Introduction" },
    { id: "definition_reseaux", title: "Définition des Réseaux" },
    { id: "capital_social", title: "Concept de Capital Social" },
    { id: "types_capital", title: "Types de Capital Social" },
    { id: "avantages_limites", title: "Avantages et Limites" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionIconMap = {
    introduction: { icon: <Info className={`h-5 w-5 mr-1 text-${accentColor}`} />, label: "Intro" },
    definition_reseaux: { icon: <Link2 className="h-5 w-5 mr-1 text-blue-500" />, label: "Réseaux" },
    capital_social: { icon: <Users2 className="h-5 w-5 mr-1 text-green-500" />, label: "Capital Social" },
    types_capital: { icon: <Coins className="h-5 w-5 mr-1 text-yellow-500" />, label: "Types" },
    avantages_limites: { icon: <TrendingUp className="h-5 w-5 mr-1 text-purple-500" />, label: "Bilan" },
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
              <Share2 className={`mr-3 h-8 w-8 text-${accentColor}`} /> {chapterTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Explorer la structure des relations sociales et les ressources qu'elles procurent.
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
                <h2><Info className={`inline h-6 w-6 mr-2 text-${accentColor}`} /> Introduction: L'importance des connexions</h2>
                <p>
                  Au-delà des groupes sociaux formels, notre vie est tissée de <strong className="font-semibold">réseaux de relations</strong>. Ces réseaux, qu'ils soient amicaux, professionnels ou familiaux, ne sont pas de simples collections d'individus ; ils constituent des structures qui influencent nos comportements, nos opportunités et nos ressources. Comprendre la notion de réseau social (au sens sociologique) est une première étape pour analyser le concept crucial de <strong className="font-semibold">capital social</strong>.
                </p>
                <div className={`bg-${accentColor}/5 dark:bg-${accentColor}/10 rounded-lg p-3 my-3 not-prose border-l-4 border-${accentColor}`}>
                  <h4 className={`text-base font-semibold text-${accentColor} mb-2`}>Ce que vous allez découvrir :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>La définition sociologique d'un réseau social.</li>
                    <li>Le concept de capital social et ses différentes approches (Bourdieu, Putnam).</li>
                    <li>Les types de liens (forts, faibles) et leur importance.</li>
                    <li>Les avantages et les limites du capital social.</li>
                  </ul>
                </div>
              </>
            )}

            {activeSection === "definition_reseaux" && (
              <>
                <h2><Link2 className="inline h-6 w-6 mr-2 text-blue-500" /> Qu'est-ce qu'un Réseau Social (au sens sociologique) ?</h2>
                <p>
                  En sociologie, un <strong className="font-semibold">réseau social</strong> désigne un ensemble d'unités sociales (appelées "nœuds" ou "acteurs" – qui peuvent être des individus, des groupes, des organisations, voire des nations) et les <strong className="font-semibold">relations</strong> (appelées "liens" ou "arêtes") que ces unités entretiennent les unes avec les autres. Ce concept est bien plus large que la simple utilisation des plateformes numériques (comme Facebook, X, LinkedIn), qui ne sont qu'une manifestation contemporaine des réseaux sociaux.
                </p>
                <p>L'analyse des réseaux sociaux s'intéresse à la <strong className="font-semibold">structure</strong> de ces relations. On peut étudier par exemple :</p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">La taille du réseau :</strong> le nombre d'acteurs impliqués.</li>
                  <li><strong className="font-semibold">La densité du réseau :</strong> la proportion de liens existants par rapport à tous les liens possibles. Un réseau dense est fortement interconnecté.</li>
                  <li><strong className="font-semibold">La centralité d'un acteur :</strong> son importance ou son influence au sein du réseau (par exemple, le nombre de liens directs).</li>
                  <li><strong className="font-semibold">La force des liens (Mark Granovetter) :</strong>
                    <ul className="list-circle list-inside ml-4 text-sm">
                        <li><strong className="font-semibold">Liens forts :</strong> Relations intimes, fréquentes, émotionnellement intenses et réciproques (famille, amis très proches). Ils apportent un soutien émotionnel et matériel important.</li>
                        <li><strong className="font-semibold">Liens faibles :</strong> Relations plus distantes, moins fréquentes (connaissances, collègues occasionnels). Granovetter a montré leur importance cruciale ("la force des liens faibles") pour accéder à des informations nouvelles, des opportunités (notamment d'emploi) car ils connectent à des cercles sociaux différents.</li>
                    </ul>
                  </li>
                </ul>
                 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-2">Exemple concret :</h4>
                  <p className="text-sm">Votre réseau d'amis proches constitue un réseau dense avec des liens forts. Vos contacts professionnels rencontrés lors d'événements forment un réseau potentiellement plus large avec des liens faibles, mais qui peuvent s'avérer utiles pour votre carrière.</p>
                </div>
              </>
            )}

            {activeSection === "capital_social" && (
              <>
                <h2><Users2 className="inline h-6 w-6 mr-2 text-green-500" /> Le Concept de Capital Social</h2>
                <p>
                  Le <strong className="font-semibold">capital social</strong> est une ressource qui découle de l'appartenance à des réseaux sociaux. C'est l'ensemble des avantages et des ressources (actuelles ou potentielles) qu'un individu ou un groupe peut mobiliser grâce à ses relations.
                </p>
                <p>Deux sociologues majeurs ont popularisé ce concept avec des approches distinctes mais complémentaires :</p>
                
                <h3 className="text-xl font-semibold mt-4 mb-2">Pierre Bourdieu : Le capital social comme ressource individuelle</h3>
                <p>
                  Pour Pierre Bourdieu, le capital social est "l'ensemble des ressources actuelles ou potentielles qui sont liées à la possession d'un réseau durable de relations plus ou moins institutionnalisées d'interconnaissance et d'interreconnaissance". 
                </p>
                <ul className="list-disc list-inside space-y-1 my-3 text-sm">
                    <li>Il s'agit d'une <strong className="font-semibold">propriété individuelle</strong>, même si elle repose sur le groupe.</li>
                    <li>Son volume dépend de la <strong className="font-semibold">taille du réseau</strong> que l'on peut mobiliser et du <strong className="font-semibold">volume de capital</strong> (économique, culturel, symbolique) détenu par chaque membre du réseau.</li>
                    <li>Ce capital demande un <strong className="font-semibold">travail d'entretien</strong> (sociabilité) et peut être transformé en capital économique (ex: trouver un emploi grâce à son réseau).</li>
                    <li>Il contribue à la <strong className="font-semibold">reproduction sociale</strong>, les individus dotés d'un fort capital social ayant plus de facilités.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-4 mb-2">Robert Putnam : Le capital social comme ressource collective</h3>
                <p>
                  Robert Putnam adopte une perspective plus macro-sociologique. Pour lui, le capital social se réfère aux "caractéristiques de l'organisation sociale, telles que les <strong className="font-semibold">réseaux</strong>, les <strong className="font-semibold">normes (de réciprocité)</strong> et la <strong className="font-semibold">confiance (sociale)</strong>, qui facilitent la coordination et la coopération pour un bénéfice mutuel".
                </p>
                 <ul className="list-disc list-inside space-y-1 my-3 text-sm">
                    <li>Il est vu comme une <strong className="font-semibold">caractéristique de la collectivité</strong> (quartier, nation).</li>
                    <li>Un fort capital social au niveau d'une société favorise l'engagement civique, la coopération, et même la performance économique et la santé publique.</li>
                    <li>Putnam s'est inquiété du <strong className="font-semibold">déclin du capital social</strong> dans les sociétés occidentales (ex: baisse de la participation associative, de la confiance interpersonnelle).</li>
                </ul>
                 <div className={`bg-green-50 dark:bg-green-900/20 rounded-lg p-3 my-3 not-prose border-l-4 border-green-500`}>
                  <h4 className="text-base font-semibold text-green-600 dark:text-green-400 mb-2">Approches complémentaires :</h4>
                  <p className="text-sm">Bourdieu se concentre sur les avantages individuels et les inégalités liées au capital social, tandis que Putnam met l'accent sur ses bénéfices pour la cohésion sociale et le fonctionnement démocratique.</p>
                </div>
              </>
            )}
            
            {activeSection === "types_capital" && (
              <>
                <h2><Coins className="inline h-6 w-6 mr-2 text-yellow-500" /> Les Différentes Formes de Capital Social (Putnam)</h2>
                <p>Robert Putnam distingue principalement deux formes de capital social, en fonction de la nature des liens et des groupes impliqués :</p>
                
                <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Capital Social de Lien (Bonding Capital)</h4>
                    <p className="text-sm">
                      Il se réfère aux <strong className="font-semibold">liens forts</strong> entre des personnes <strong className="font-semibold">similaires</strong> ou appartenant au même groupe (famille, amis proches, membres d'un même groupe ethnique, religieux ou club fermé). 
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs mt-2">
                      <li><strong className="font-semibold">Fonction principale :</strong> Renforcer la cohésion interne du groupe, l'identité collective, le soutien mutuel et la solidarité.</li>
                      <li><strong className="font-semibold">Exemple :</strong> Une association d'anciens élèves d'une même école, un groupe d'entraide de quartier très soudé.</li>
                      <li><strong className="font-semibold">Risque :</strong> Peut conduire à l'isolement par rapport à d'autres groupes et à l'exclusion des non-membres.</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-orange-700 dark:text-orange-300 mb-2">Capital Social de Pont (Bridging Capital)</h4>
                    <p className="text-sm">
                      Il concerne les <strong className="font-semibold">liens (souvent plus faibles)</strong> entre des personnes ou des groupes <strong className="font-semibold">différents</strong> (par exemple, en termes d'âge, d'origine sociale, d'opinions politiques).
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs mt-2">
                      <li><strong className="font-semibold">Fonction principale :</strong> Ouvrir à de nouvelles informations, ressources et perspectives, favoriser la tolérance et la compréhension intergroupes.</li>
                      <li><strong className="font-semibold">Exemple :</strong> Un mouvement civique regroupant des personnes de divers horizons, des réseaux professionnels intersectoriels.</li>
                      <li><strong className="font-semibold">Importance :</strong> Crucial pour l'innovation, l'intégration sociale plus large et la résolution de problèmes complexes.</li>
                    </ul>
                  </div>
                </div>
                 <p>
                  Une société saine a besoin d'un équilibre entre ces deux formes de capital social. Trop de "bonding" sans "bridging" peut mener au communautarisme et à la fragmentation sociale.
                </p>
              </>
            )}

            {activeSection === "avantages_limites" && (
              <>
                <h2><TrendingUp className="inline h-6 w-6 mr-2 text-purple-500" /> Avantages et Limites du Capital Social</h2>
                <p>
                  Le capital social, qu'il soit individuel ou collectif, offre de nombreux avantages, mais présente aussi des limites et peut être source d'inégalités.
                </p>
                
                <h3 className="text-xl font-semibold mt-4 mb-2">Les avantages du capital social :</h3>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">Pour les individus :</strong>
                    <ul className="list-circle list-inside ml-4 text-sm">
                        <li>Meilleur accès à l'information (opportunités d'emploi, logement, etc.).</li>
                        <li>Soutien émotionnel, matériel et financier en cas de besoin.</li>
                        <li>Sentiment d'appartenance, intégration sociale.</li>
                        <li>Influence, capacité à mobiliser des ressources pour atteindre des objectifs.</li>
                        <li>Amélioration de la santé physique et mentale (selon certaines études).</li>
                    </ul>
                  </li>
                  <li><strong className="font-semibold">Pour la collectivité :</strong>
                    <ul className="list-circle list-inside ml-4 text-sm">
                        <li>Facilitation de l'action collective et de la coopération.</li>
                        <li>Renforcement de la confiance et de la réciprocité.</li>
                        <li>Amélioration de la gouvernance et de l'efficacité des institutions.</li>
                        <li>Développement économique local.</li>
                        <li>Plus grande cohésion sociale.</li>
                    </ul>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mt-4 mb-2 text-red-600 dark:text-red-400"><AlertTriangle className="inline h-5 w-5 mr-1"/>Les limites et les aspects négatifs :</h3>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">Inégalités :</strong> Le capital social n'est pas également réparti. Certains individus/groupes ont des réseaux plus étendus et/ou plus "rentables", ce qui reproduit ou accentue les inégalités sociales.</li>
                  <li><strong className="font-semibold">Exclusion :</strong> Des réseaux très fermés (fort bonding) peuvent exclure les non-membres et limiter leurs opportunités (ex: clientélisme, népotisme).</li>
                  <li><strong className="font-semibold">Contrôle social excessif :</strong> La pression à la conformité au sein de réseaux denses peut étouffer l'individualité et l'innovation.</li>
                  <li><strong className="font-semibold">Coûts d'entretien :</strong> Maintenir un réseau demande du temps et des efforts.</li>
                  <li><strong className="font-semibold">Circulation d'informations erronées :</strong> Les réseaux peuvent aussi propager des rumeurs ou de la désinformation.</li>
                </ul>
                 <div className={`bg-red-50 dark:bg-red-900/20 rounded-lg p-3 my-3 not-prose border-l-4 border-red-500`}>
                  <h4 className="text-base font-semibold text-red-600 dark:text-red-400 mb-2">Le "côté obscur" du capital social :</h4>
                  <p className="text-sm">Il est important de ne pas idéaliser le capital social. Des réseaux criminels, par exemple, possèdent un fort capital social interne, mais leurs actions sont néfastes pour la société.</p>
                </div>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className={`inline h-6 w-6 mr-2 text-${accentColor}`} /> Conclusion : Une ressource à double tranchant</h2>
                <p>
                  Les réseaux sociaux et le capital social qui en découle sont des dimensions fondamentales de la vie en société. Ils structurent nos interactions, influencent nos trajectoires et conditionnent notre accès à diverses ressources. Si le capital social est souvent perçu positivement pour ses effets bénéfiques sur l'intégration, la coopération et le bien-être, il est crucial de garder à l'esprit son caractère inégalement distribué et ses potentiels effets pervers (exclusion, reproduction des inégalités).
                </p>
                <div className={`my-4 p-3 bg-${accentColor}/10 dark:bg-${accentColor}/20 rounded-lg not-prose`}>
                  <h4 className={`text-base font-semibold text-${accentColor} mb-2`}>Points clés à retenir :</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-sm">
                    <li>Les réseaux sociaux sont la structure des relations ; le capital social en est la ressource.</li>
                    <li>Bourdieu souligne l'aspect individuel et stratégique, Putnam l'aspect collectif et civique.</li>
                    <li>Les liens faibles sont souvent plus utiles pour l'information nouvelle que les liens forts.</li>
                    <li>Le capital social de lien (bonding) unit, le capital de pont (bridging) relie des groupes divers.</li>
                    <li>Le capital social est une ressource précieuse mais inégalement partagée, pouvant avoir des effets d'exclusion.</li>
                  </ul>
                </div>
                <p>
                   L'analyse du capital social invite donc à une réflexion nuancée sur la manière dont les relations sociales façonnent nos vies et la société dans son ensemble.
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
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur les réseaux et le capital social.</p>
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