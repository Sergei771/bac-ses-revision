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
  Baby, // Socialisation primaire
  GraduationCap, // Socialisation secondaire
  Briefcase, // Rôles adultes
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

const slug = "socialisation-primaire-secondaire";
const chapterTitle = "La Socialisation Primaire et Secondaire";
const subject = "sociologie";
const moduleSlug = "socialisation";
const accentColor = "socio-purple";

export default function SocialisationPrimaireSecondairePage() {
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
      id: "socialisation-primaire",
      title: "Socialisation primaire",
      explication: "Processus d'apprentissage des normes et valeurs fondamentales durant l'enfance, principalement au sein de la famille.",
    },
    {
      id: "socialisation-secondaire",
      title: "Socialisation secondaire",
      explication: "Processus d'apprentissage de nouvelles normes et valeurs lié à l'intégration dans des sphères sociales spécifiques (école, travail, etc.) tout au long de la vie.",
    },
    {
      id: "interiorisation",
      title: "Intériorisation",
      explication: "Processus par lequel l'individu fait siennes les normes et valeurs sociales, les intégrant à sa personnalité.",
    },
    {
      id: "role-social",
      title: "Rôle social",
      explication: "Ensemble de comportements attendus d'un individu en fonction de sa position ou de son statut social.",
    },
    {
      id: "socialisation-anticipatrice",
      title: "Socialisation anticipatrice",
      explication: "Processus par lequel un individu adopte les normes et valeurs d'un groupe de référence auquel il souhaite appartenir.",
    },
  ];

  const pageSections = [
    { id: "introduction", title: "Introduction" },
    { id: "primaire", title: "Socialisation Primaire" },
    { id: "secondaire", title: "Socialisation Secondaire" },
    { id: "articulation", title: "Articulation et Ruptures" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionIconMap = {
    introduction: { icon: <Info className={`h-5 w-5 mr-1 text-${accentColor}`} />, label: "Introduction" },
    primaire: { icon: <Baby className="h-5 w-5 mr-1 text-pink-500" />, label: "Primaire" },
    secondaire: { icon: <GraduationCap className="h-5 w-5 mr-1 text-green-500" />, label: "Secondaire" },
    articulation: { icon: <Briefcase className="h-5 w-5 mr-1 text-purple-500" />, label: "Articulation" },
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
              <Users className={`mr-2 h-8 w-8 text-${accentColor}`} /> {chapterTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Comprendre comment se construisent les fondations de l'identité sociale et comment elles évoluent.
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
                <h2><Info className={`inline h-6 w-6 mr-2 text-${accentColor}`} /> Introduction: Deux temps forts de la construction identitaire</h2>
                <p>
                  La socialisation est le processus par lequel un individu apprend et <strong className="font-semibold">intériorise</strong> les normes, valeurs et rôles qui régissent la vie en société. Ce processus n'est pas monolithique ; il se déroule en plusieurs étapes tout au long de la vie. On distingue classiquement deux grandes phases : la <strong className="font-semibold">socialisation primaire</strong> et la <strong className="font-semibold">socialisation secondaire</strong>.
                </p>
                <div className={`bg-${accentColor}/5 dark:bg-${accentColor}/10 rounded-lg p-3 my-3 not-prose border-l-4 border-${accentColor}`}>
                  <h4 className={`text-base font-semibold text-${accentColor} mb-2`}>Distinction clé :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong className="font-semibold">Primaire :</strong> Les fondations, durant l'enfance.</li>
                    <li><strong className="font-semibold">Secondaire :</strong> Les ajustements et spécialisations, tout au long de la vie adulte.</li>
                  </ul>
                </div>
                <p>
                  Comprendre cette distinction est essentiel pour saisir comment se forment les identités individuelles et comment elles s'adaptent aux différents contextes sociaux rencontrés.
                </p>
              </>
            )}

            {activeSection === "primaire" && (
              <>
                <h2><Baby className="inline h-6 w-6 mr-2 text-pink-500" /> La Socialisation Primaire : Les fondations</h2>
                <p>
                  La socialisation primaire se déroule durant l'<strong className="font-semibold">enfance</strong> et est fondamentale car elle pose les bases de la personnalité et de l'identité sociale. L'<strong className="font-semibold">intériorisation</strong> des normes et valeurs y est particulièrement forte et durable, car l'enfant n'a pas encore développé de recul critique.
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">Agent principal :</strong> La famille. C'est au sein du cercle familial que l'enfant apprend les règles de base de la vie en commun, le langage, les codes de politesse, les distinctions fondamentales (permis/défendu, bien/mal).
                  </li>
                  <li><strong className="font-semibold">Modalités :</strong> Inculcation (ordres, sanctions, récompenses) et imitation (reproduction des comportements des adultes). L'affectivité joue un rôle majeur dans l'efficacité de cette transmission.</li>
                  <li><strong className="font-semibold">Contenus :</strong> Normes de base (propreté, respect), valeurs morales, rôles de genre, habitudes corporelles (hexis corporelle), rapport au temps et à l'espace.</li>
                </ul>
                <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-pink-600 dark:text-pink-400 mb-2">Importance cruciale :</h4>
                  <p className="text-sm">Les acquis de la socialisation primaire structurent durablement la vision du monde de l'individu et ses manières d'être. Ils constituent un socle sur lequel viendront s'appuyer les socialisations ultérieures.</p>
                </div>
              </>
            )}

            {activeSection === "secondaire" && (
              <>
                <h2><GraduationCap className="inline h-6 w-6 mr-2 text-green-500" /> La Socialisation Secondaire : Adaptations et spécialisations</h2>
                <p>
                  La socialisation secondaire intervient <strong className="font-semibold">après l'enfance</strong>, lorsque l'individu est confronté à de nouveaux milieux sociaux (école, groupes de pairs, monde du travail, associations, couple, etc.). Elle s'appuie sur les acquis de la socialisation primaire, mais peut aussi les <strong className="font-semibold">modifier</strong>, les <strong className="font-semibold">compléter</strong> ou parfois les <strong className="font-semibold">remettre en cause</strong>.
                </p>
                <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-green-700 dark:text-green-300 mb-2">Caractéristiques :</h4>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Multiplicité des agents (enseignants, collègues, amis, conjoint, etc.).</li>
                      <li>Plus spécialisée : apprentissage de rôles sociaux spécifiques (étudiant, professionnel, parent).</li>
                      <li>Peut être plus consciente et réflexive que la socialisation primaire.</li>
                      <li>Moins affectivement chargée en général, bien que des liens forts puissent se créer.</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-teal-700 dark:text-teal-300 mb-2">Exemples :</h4>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li><strong className="font-semibold">Socialisation scolaire :</strong> Apprentissage de savoirs, de méthodes de travail, de la discipline.</li>
                      <li><strong className="font-semibold">Socialisation professionnelle :</strong> Acquisition de compétences techniques, de la culture d'entreprise, des codes relationnels au travail.</li>
                      <li><strong className="font-semibold">Socialisation conjugale :</strong> Apprentissage de la vie à deux, partage des tâches, compromis.</li>
                    </ul>
                  </div>
                </div>
                <p>La socialisation secondaire permet à l'individu de s'adapter à la diversité des situations sociales et d'endosser de nouveaux <strong className="font-semibold">rôles sociaux</strong>.</p>
              </>
            )}

            {activeSection === "articulation" && (
              <>
                <h2><Briefcase className="inline h-6 w-6 mr-2 text-purple-500" /> Articulation et Ruptures entre Primaire et Secondaire</h2>
                <p>
                  Les socialisations primaire et secondaire ne sont pas toujours en parfaite continuité. Leur articulation peut prendre différentes formes :
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">Continuité :</strong> La socialisation secondaire renforce et prolonge les acquis de la socialisation primaire. C'est souvent le cas lorsque le milieu social de l'individu reste stable.</li>
                  <li><strong className="font-semibold">Ajustement/Transformation :</strong> La socialisation secondaire modifie ou complète les dispositions initiales pour s'adapter à un nouveau contexte (ex: un étudiant issu d'un milieu populaire s'adaptant aux codes universitaires).</li>
                  <li><strong className="font-semibold">Rupture/Conversion :</strong> La socialisation secondaire entre en contradiction avec la socialisation primaire, pouvant mener à une redéfinition identitaire importante (ex: conversion religieuse, changement radical de carrière, forte mobilité sociale ascendante ou descendante). On parle parfois de <strong className="font-semibold">resocialisation</strong>.</li>
                </ul>
                <div className={`bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 my-4 not-prose border-l-4 border-purple-600`}>
                  <h4 className="text-base font-semibold text-purple-700 dark:text-purple-300 mb-2">Socialisation anticipatrice :</h4>
                  <p className="text-sm mb-1">Un cas particulier est la <strong className="font-semibold">socialisation anticipatrice</strong>, où un individu adopte les normes et valeurs d'un groupe auquel il n'appartient pas encore mais qu'il souhaite intégrer (ex: un lycéen adoptant les comportements d'étudiants pour préparer son entrée à l'université). Cela peut faciliter la transition.</p>
                </div>
                <p>
                  L'individu est donc en permanence en train de négocier entre ses dispositions héritées et les exigences des nouveaux contextes sociaux.
                </p>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className={`inline h-6 w-6 mr-2 text-${accentColor}`} /> Conclusion : Un processus continu et dynamique</h2>
                <p>
                  La distinction entre socialisation primaire et secondaire est un outil analytique puissant pour comprendre la construction de l'individu social. La socialisation primaire jette des bases solides et souvent inconscientes, tandis que la socialisation secondaire permet une adaptation continue et une diversification des rôles et des identités tout au long de la vie.
                </p>
                <div className={`my-4 p-3 bg-${accentColor}/10 dark:bg-${accentColor}/20 rounded-lg not-prose`}>
                  <h4 className={`text-base font-semibold text-${accentColor} mb-2`}>Points clés à retenir :</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-sm">
                    <li>La socialisation primaire (enfance, famille) est fondatrice.</li>
                    <li>La socialisation secondaire (vie adulte, multiples agents) est adaptative et spécialisée.</li>
                    <li>L'articulation entre les deux peut être continue, transformatrice ou en rupture.</li>
                    <li>La socialisation anticipatrice facilite l'intégration à de nouveaux groupes.</li>
                    <li>L'identité se construit et se reconstruit tout au long de la vie.</li>
                  </ul>
                </div>
                <p>
                   Ce processus dynamique montre que l'individu n'est jamais totalement déterminé par sa socialisation initiale et possède une marge de manœuvre pour évoluer.
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
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur socialisation primaire et secondaire.</p>
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