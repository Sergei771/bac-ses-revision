"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen, 
  CheckCircle,
  Clock,
  Users, // Module Socialisation
  Link2, // Lien social
  ShieldCheck, // Intégration
  HeartHandshake, // Solidarité
  Puzzle, // Cohésion
  TrendingDown, // Exclusion
  BookMarked,
  ListChecks,
  Info,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

interface Notion {
  id: string;
  title: string;
  explication: string;
}

const slug = "lien-social-integration";
const chapterTitle = "Lien Social et Intégration";
const subject = "sociologie";
const moduleSlug = "socialisation";
const accentColor = "socio-purple";

export default function LienSocialIntegrationPage() {
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
    const progress = getChapterProgress(subject, chapterId);
    if (progress) {
      setTimeSpent(progress.timeSpent);
      setIsCompleted(progress.completed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getChapterProgress, chapterId, subject]);

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
      updateChapterProgress(subject, chapterId, {
        timeSpent: timeSpentRef.current,
        completed: isCompleted,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, isCompleted, chapterId, updateChapterProgress, subject]);

  const handleMarkAsCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  const notionsCles: Notion[] = [
    {
      id: "lien-social",
      title: "Lien social",
      explication: "Ensemble des relations qui unissent les membres d'une société ou d'un groupe social, assurant sa cohésion.",
    },
    {
      id: "integration-sociale",
      title: "Intégration sociale",
      explication: "Processus par lequel un individu ou un groupe devient membre à part entière d'une société, partageant ses normes et valeurs et participant à ses activités.",
    },
    {
      id: "solidarite-mecanique",
      title: "Solidarité mécanique (Durkheim)",
      explication: "Type de cohésion sociale fondée sur la similitude des individus et la force des consciences collectives dans les sociétés traditionnelles.",
    },
    {
      id: "solidarite-organique",
      title: "Solidarité organique (Durkheim)",
      explication: "Type de cohésion sociale fondée sur la complémentarité et l'interdépendance des individus du fait de la division du travail dans les sociétés modernes.",
    },
    {
      id: "cohesion-sociale",
      title: "Cohésion sociale",
      explication: "Capacité d'une société à assurer le bien-être de tous ses membres, à minimiser les disparités et à éviter la polarisation. Elle repose sur la force des liens sociaux.",
    },
    {
      id: "anomie",
      title: "Anomie (Durkheim)",
      explication: "Situation de dérèglement social, d'affaiblissement des normes collectives, qui peut conduire à la perte de repères pour les individus.",
    },
    {
      id: "desaffiliation",
      title: "Désaffiliation (Castel)",
      explication: "Processus de rupture progressive des liens sociaux (notamment par rapport au travail et à l'insertion relationnelle) pouvant mener à l'exclusion.",
    },
  ];

  const pageSections = [
    { id: "introduction", title: "Introduction" },
    { id: "formes-lien-social", title: "Formes du Lien Social" },
    { id: "integration-durkheim", title: "Intégration selon Durkheim" },
    { id: "evolution-liens", title: "Évolution des Liens Sociaux" },
    { id: "defis-integration", title: "Défis de l'Intégration" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionIconMap = {
    introduction: { icon: <Info className={`h-5 w-5 mr-1 text-${accentColor}`} />, label: "Introduction" },
    "formes-lien-social": { icon: <Link2 className="h-5 w-5 mr-1 text-green-500" />, label: "Formes" },
    "integration-durkheim": { icon: <Puzzle className="h-5 w-5 mr-1 text-purple-500" />, label: "Durkheim" },
    "evolution-liens": { icon: <HeartHandshake className="h-5 w-5 mr-1 text-yellow-500" />, label: "Évolution" },
    "defis-integration": { icon: <TrendingDown className="h-5 w-5 mr-1 text-red-500" />, label: "Défis" },
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
          Retour au module {moduleSlug.charAt(0).toUpperCase() + moduleSlug.slice(1)}
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center`}>
              <ShieldCheck className={`mr-2 h-8 w-8 text-${accentColor}`} /> {chapterTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Explorer les mécanismes qui unissent les individus et assurent la cohésion des sociétés.
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
                <h2><Info className={`inline h-6 w-6 mr-2 text-${accentColor}`} /> Introduction : Qu'est-ce qui nous relie ?</h2>
                <p>
                  Le <strong className="font-semibold">lien social</strong> désigne l'ensemble des relations qui unissent les individus au sein d'une société, assurant sa <strong className="font-semibold">cohésion</strong>. L'<strong className="font-semibold">intégration sociale</strong> est le processus par lequel les individus deviennent membres à part entière de cette société. Ces deux concepts sont centraux pour comprendre comment une société "tient ensemble".
                </p>
                <div className={`bg-${accentColor}/5 dark:bg-${accentColor}/10 rounded-lg p-3 my-3 not-prose border-l-4 border-${accentColor}`}>
                  <h4 className={`text-base font-semibold text-${accentColor} mb-2`}>Enjeux :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Comprendre les fondements de la solidarité.</li>
                    <li>Analyser les facteurs d'intégration et d'exclusion.</li>
                    <li>Étudier l'évolution des formes de lien social dans les sociétés contemporaines.</li>
                  </ul>
                </div>
                <p>
                  Ce chapitre explore les différentes formes de lien social, les théories de l'intégration, et les défis actuels liés à la cohésion sociale.
                </p>
              </>
            )}

            {activeSection === "formes-lien-social" && (
              <>
                <h2><Link2 className="inline h-6 w-6 mr-2 text-green-500" /> Les Formes du Lien Social</h2>
                <p>
                  Serge Paugam distingue quatre grands types de liens sociaux qui attachent l'individu à la société :
                </p>
                <ul className="list-disc list-inside space-y-2 my-3">
                  <li><strong className="font-semibold">Le lien de filiation (ou lien de parenté) :</strong> unit les membres d'une même famille (parents, enfants, fratrie). Il assure la protection et la transmission intergénérationnelle.</li>
                  <li><strong className="font-semibold">Le lien de participation élective (ou lien d'amitié/affectif) :</strong> repose sur le choix mutuel et l'affinité (amis, relations amoureuses). Il apporte reconnaissance et soutien émotionnel.</li>
                  <li><strong className="font-semibold">Le lien de participation organique (ou lien professionnel) :</strong> lié à la place de l'individu dans la division du travail (collègues, relations hiérarchiques). Il procure un revenu, un statut social et un sentiment d'utilité.</li>
                  <li><strong className="font-semibold">Le lien de citoyenneté (ou lien politique) :</strong> attache l'individu à la communauté politique (nation, État). Il confère des droits et des devoirs et repose sur le sentiment d'appartenance à une collectivité.</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-green-600 dark:text-green-400 mb-2">Interdépendance :</h4>
                  <p className="text-sm">Ces différents types de liens sont souvent interdépendants. La fragilisation de l'un peut affecter les autres et menacer l'intégration de l'individu.</p>
                </div>
              </>
            )}

            {activeSection === "integration-durkheim" && (
              <>
                <h2><Puzzle className="inline h-6 w-6 mr-2 text-purple-500" /> L'Intégration et la Solidarité chez Émile Durkheim</h2>
                <p>
                  Émile Durkheim, l'un des pères fondateurs de la sociologie, a analysé l'évolution des formes de <strong className="font-semibold">solidarité sociale</strong>, c'est-à-dire ce qui fait le ciment d'une société.
                </p>
                <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-purple-700 dark:text-purple-300 mb-2">Solidarité Mécanique</h4>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Typique des sociétés traditionnelles, à faible division du travail.</li>
                      <li>Fondée sur la <strong className="font-semibold">similitude</strong> des individus (mêmes croyances, mêmes valeurs).</li>
                      <li>Forte conscience collective, contrôle social important.</li>
                      <li>Le droit répressif domine (punir celui qui dévie).</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-violet-50 dark:bg-violet-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-violet-700 dark:text-violet-300 mb-2">Solidarité Organique</h4>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Typique des sociétés modernes, à forte division du travail.</li>
                      <li>Fondée sur la <strong className="font-semibold">complémentarité</strong> et l'<strong className="font-semibold">interdépendance</strong> des individus (chacun a une fonction spécifique).</li>
                      <li>Individualisme plus marqué, conscience individuelle se développe.</li>
                      <li>Le droit restitutif domine (réparer le tort, organiser la coopération).</li>
                    </ul>
                  </div>
                </div>
                <p>Pour Durkheim, l'<strong className="font-semibold">intégration</strong> est assurée lorsque les individus partagent des valeurs et des normes communes et interagissent régulièrement. L'<strong className="font-semibold">anomie</strong> (absence ou affaiblissement des normes) est une menace pour l'intégration et peut conduire à des comportements déviants (ex: suicide anomique).</p>
              </>
            )}

            {activeSection === "evolution-liens" && (
              <>
                <h2><HeartHandshake className="inline h-6 w-6 mr-2 text-yellow-500" /> L'Évolution Contemporaine des Liens Sociaux</h2>
                <p>
                  Les sociétés contemporaines connaissent des transformations importantes qui affectent les liens sociaux :
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">Montée de l'individualisme :</strong> valorisation de l'autonomie, des choix personnels, mais peut aussi fragiliser les liens traditionnels et collectifs.</li>
                  <li><strong className="font-semibold">Transformation de la famille :</strong> diversification des modèles familiaux, augmentation des divorces, mais la famille reste une instance de solidarité essentielle.</li>
                  <li><strong className="font-semibold">Précarisation du travail :</strong> chômage, contrats courts, qui peuvent affaiblir le lien de participation organique et l'intégration professionnelle.</li>
                  <li><strong className="font-semibold">Développement des réseaux numériques :</strong> nouvelles formes de sociabilité, maintien de liens à distance, mais aussi risque d'isolement ou de liens plus superficiels.</li>
                  <li><strong className="font-semibold">Crise des institutions traditionnelles :</strong> baisse de confiance dans les partis politiques, les syndicats, les Églises, ce qui peut affecter le lien de citoyenneté.</li>
                </ul>
                <div className={`bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 my-4 not-prose border-l-4 border-yellow-600`}>
                  <h4 className="text-base font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Ambivalence :</h4>
                  <p className="text-sm mb-1">Ces évolutions ne signifient pas nécessairement une disparition du lien social, mais plutôt une <strong className="font-semibold">recomposition</strong>. De nouvelles formes de solidarité et d'engagement émergent (associations, communautés en ligne, etc.).</p>
                </div>
              </>
            )}

            {activeSection === "defis-integration" && (
              <>
                <h2><TrendingDown className="inline h-6 w-6 mr-2 text-red-500" /> Les Défis de l'Intégration Sociale Aujourd'hui</h2>
                <p>
                  Malgré les mécanismes de cohésion, les sociétés contemporaines sont confrontées à des défis majeurs en termes d'intégration :
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">Les inégalités sociales et économiques :</strong> creusement des écarts de revenus, difficultés d'accès à l'emploi, au logement, à l'éducation, qui peuvent marginaliser une partie de la population.</li>
                  <li><strong className="font-semibold">La discrimination :</strong> fondée sur l'origine, le genre, l'orientation sexuelle, la religion, etc., elle constitue un obstacle majeur à l'intégration.</li>
                  <li><strong className="font-semibold">La précarité et l'exclusion :</strong> Robert Castel a analysé le processus de <strong className="font-semibold">désaffiliation</strong>, où la perte d'emploi et l'isolement relationnel conduisent à une sortie progressive de la société.</li>
                  <li><strong className="font-semibold">Les tensions identitaires et communautaires :</strong> replis identitaires, difficultés du "vivre ensemble" dans des sociétés multiculturelles.</li>
                  <li><strong className="font-semibold">La défiance envers les institutions :</strong> peut fragiliser le sentiment d'appartenance et la participation citoyenne.</li>
                </ul>
                <div className={`bg-red-50 dark:bg-red-900/20 rounded-lg p-3 my-3 not-prose`}>
                  <h4 className="text-base font-semibold text-red-600 dark:text-red-400 mb-2">Politiques d'intégration :</h4>
                  <p className="text-sm">Face à ces défis, les politiques publiques visent à renforcer la cohésion sociale par divers moyens : lutte contre la pauvreté et les discriminations, politiques d'emploi et de formation, soutien à la vie associative, éducation à la citoyenneté.</p>
                </div>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className={`inline h-6 w-6 mr-2 text-${accentColor}`} /> Conclusion : Préserver et réinventer le lien social</h2>
                <p>
                  Le lien social et l'intégration sont des constructions permanentes et fragiles. Si les formes traditionnelles de solidarité évoluent, la nécessité de créer et de maintenir des liens pour assurer la cohésion des sociétés demeure. Comprendre les dynamiques du lien social est crucial pour analyser les mutations sociales et penser les conditions d'une société plus inclusive.
                </p>
                <div className={`my-4 p-3 bg-${accentColor}/10 dark:bg-${accentColor}/20 rounded-lg not-prose`}>
                  <h4 className={`text-base font-semibold text-${accentColor} mb-2`}>Points clés à retenir :</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-sm">
                    <li>Le lien social (filiation, électif, organique, citoyenneté) est multidimensionnel.</li>
                    <li>Durkheim distingue solidarité mécanique (similitude) et organique (interdépendance).</li>
                    <li>L'individualisme et la précarisation transforment mais ne suppriment pas le lien social.</li>
                    <li>Les inégalités, la discrimination et la désaffiliation sont des freins majeurs à l'intégration.</li>
                    <li>La cohésion sociale est un enjeu permanent pour les sociétés modernes.</li>
                  </ul>
                </div>
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
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur le lien social et l'intégration.</p>
                <Link 
                  href={`/quiz/${subject}/${slug}`}
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