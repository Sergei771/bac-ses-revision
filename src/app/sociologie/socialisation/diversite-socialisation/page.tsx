"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  Users, // Icône principale socialisation
  Brain, // Icône pour ce chapitre (diversité des processus)
  Sprout, // Pour socialisation primaire/genre
  Building, // Pour milieu social
  Globe, // Pour culture
  BookMarked,
  ListChecks,
  Info,
  HelpCircle,
  Edit3, // Pour nouveau chapitre
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

interface Notion {
  id: string;
  title: string;
  explication: string;
}

const slug = "diversite-socialisation";
const chapterTitle = "La Diversité des Processus de Socialisation";
const subject = "sociologie";
const moduleSlug = "socialisation";
const accentColor = "socio-purple";

export default function DiversiteSocialisationPage() {
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
      id: "socialisation-differenciee",
      title: "Socialisation différenciée",
      explication: "Processus par lequel les individus sont socialisés différemment en fonction de caractéristiques comme le genre, le milieu social ou l'origine culturelle.",
    },
    {
      id: "socialisation-genre",
      title: "Socialisation de genre",
      explication: "Apprentissage des normes, valeurs et rôles sociaux associés au masculin et au féminin.",
    },
    {
      id: "capital-culturel",
      title: "Capital culturel",
      explication: "Ensemble des ressources culturelles (savoirs, savoir-faire, diplômes, biens culturels) détenues par un individu et valorisées socialement.",
    },
    {
      id: "habitus",
      title: "Habitus (Bourdieu)",
      explication: "Système de dispositions durables et transposables, intériorisées par les individus du fait de leurs conditions d'existence, qui structure leurs pratiques et représentations.",
    },
    {
      id: "ethnocentrisme",
      title: "Ethnocentrisme",
      explication: "Tendance à considérer sa propre culture ou son propre groupe social comme modèle de référence et à juger les autres cultures à travers ses propres valeurs.",
    },
    {
      id: "relativisme-culturel",
      title: "Relativisme culturel",
      explication: "Attitude qui consiste à analyser les cultures sans porter de jugement de valeur, en les comprenant dans leur propre contexte.",
    },
  ];

  const pageSections = [
    { id: "introduction", title: "Introduction" },
    { id: "socialisation-genre", title: "Socialisation et Genre" },
    { id: "socialisation-milieu-social", title: "Socialisation et Milieu Social" },
    { id: "socialisation-culture", title: "Socialisation et Culture" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionIconMap = {
    introduction: { icon: <Info className={`h-5 w-5 mr-1 text-${accentColor}`} />, label: "Introduction" },
    "socialisation-genre": { icon: <Sprout className="h-5 w-5 mr-1 text-pink-500" />, label: "Genre" },
    "socialisation-milieu-social": { icon: <Building className="h-5 w-5 mr-1 text-yellow-500" />, label: "Milieu Social" },
    "socialisation-culture": { icon: <Globe className="h-5 w-5 mr-1 text-green-500" />, label: "Culture" },
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
              <Brain className={`mr-2 h-8 w-8 text-${accentColor}`} /> {chapterTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Explorer comment les processus de socialisation varient et produisent des identités plurielles.
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
                <h2><Info className={`inline h-6 w-6 mr-2 text-${accentColor}`} /> Introduction à la diversité des socialisations</h2>
                <p>
                  La socialisation, bien qu'étant un processus universel par lequel les individus apprennent et intériorisent les normes et valeurs de leur société, n'est pas uniforme. Elle est <strong className="font-semibold">différenciée</strong> : les individus ne sont pas socialisés de la même manière.
                  Cette diversité s'explique par plusieurs facteurs, notamment le <strong className="font-semibold">genre</strong>, le <strong className="font-semibold">milieu social</strong> d'origine, et la <strong className="font-semibold">culture</strong> dans laquelle ils évoluent.
                </p>
                <div className={`bg-${accentColor}/5 dark:bg-${accentColor}/10 rounded-lg p-3 my-3 not-prose border-l-4 border-${accentColor}`}>
                  <h4 className={`text-base font-semibold text-${accentColor} mb-2`}>Points clés de la différenciation :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Les attentes et les rôles assignés varient.
                    </li>
                    <li>Les ressources (économiques, culturelles) transmises diffèrent.
                    </li>
                    <li>Les valeurs et les normes inculquées peuvent être spécifiques à certains groupes.
                    </li>
                  </ul>
                </div>
                <p>
                  Comprendre cette diversité est crucial pour analyser les inégalités sociales, la formation des identités plurielles et les dynamiques de reproduction ou de mobilité sociale.
                </p>
              </>
            )}

            {activeSection === "socialisation-genre" && (
              <>
                <h2><Sprout className="inline h-6 w-6 mr-2 text-pink-500" /> Socialisation et Genre</h2>
                <p>
                  Dès la naissance, et même avant, les individus sont socialisés différemment en fonction de leur sexe biologique, ce qui construit leur <strong className="font-semibold">genre</strong> (identité et rôles sociaux masculins ou féminins).
                  Cette <strong className="font-semibold">socialisation de genre</strong> se manifeste à travers :
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">Les attentes parentales :</strong> choix des jouets, des vêtements, des activités proposées, manière de parler à l'enfant.</li>
                  <li><strong className="font-semibold">L'école :</strong> interactions avec les enseignants et les pairs, orientation scolaire et professionnelle parfois stéréotypée.</li>
                  <li><strong className="font-semibold">Les médias :</strong> représentations des hommes et des femmes dans la publicité, les films, les séries, qui renforcent souvent les stéréotypes de genre.</li>
                  <li><strong className="font-semibold">Le groupe de pairs :</strong> pression à la conformité aux normes de masculinité ou de féminité.</li>
                </ul>
                <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-pink-600 dark:text-pink-400 mb-2">Conséquences :</h4>
                  <p className="text-sm">Cette socialisation différenciée peut conduire à l'intériorisation de rôles de genre spécifiques, influençant les choix d'orientation, les carrières, la répartition des tâches domestiques, et contribuant ainsi aux inégalités entre hommes et femmes.</p>
                </div>
              </>
            )}

            {activeSection === "socialisation-milieu-social" && (
              <>
                <h2><Building className="inline h-6 w-6 mr-2 text-yellow-500" /> Socialisation et Milieu Social</h2>
                <p>
                  Le <strong className="font-semibold">milieu social d'origine</strong> (classe sociale, catégorie socioprofessionnelle des parents) influence fortement le processus de socialisation.
                  Pierre Bourdieu a montré comment la famille transmet un <strong className="font-semibold">capital culturel</strong> (langage, savoirs, goûts, etc.) et un <strong className="font-semibold">habitus</strong> (ensemble de dispositions à agir, penser, sentir d'une certaine manière) spécifiques à son milieu.
                </p>
                <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Exemples de différenciation :</h4>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Styles éducatifs parentaux (plus ou moins d'autorité, d'encouragement à l'autonomie).</li>
                      <li>Rapport au langage (vocabulaire, syntaxe).</li>
                      <li>Pratiques culturelles (lecture, sorties au musée, type de musique écoutée).</li>
                      <li>Ambitions scolaires et professionnelles inculquées.</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-amber-700 dark:text-amber-300 mb-2">Impact sur la trajectoire :</h4>
                     <p className="text-sm">Le capital culturel et l'habitus transmis peuvent être plus ou moins en adéquation avec les attentes du système scolaire, ce qui explique en partie les inégalités de réussite scolaire et la reproduction sociale.</p>
                  </div>
                </div>
                 <p>D'autres sociologues, comme Bernard Lahire, ont nuancé cette approche en montrant la <strong className="font-semibold">pluralité des dispositions</strong> chez un même individu, issu de socialisations multiples (famille, école, amis, etc.).</p>
              </>
            )}

            {activeSection === "socialisation-culture" && (
              <>
                <h2><Globe className="inline h-6 w-6 mr-2 text-green-500" /> Socialisation et Culture</h2>
                <p>
                  Chaque <strong className="font-semibold">culture</strong> (ensemble de valeurs, normes, pratiques partagées par un groupe social) modèle de manière spécifique la socialisation de ses membres. Ce qui est considéré comme normal ou attendu varie considérablement d'une société à l'autre.
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">Valeurs fondamentales :</strong> individualisme vs collectivisme, rapport au temps, à l'autorité, à la nature.</li>
                  <li><strong className="font-semibold">Normes de comportement :</strong> règles de politesse, expressions des émotions, codes vestimentaires.</li>
                  <li><strong className="font-semibold">Rituels et traditions :</strong> rites de passage, fêtes religieuses ou nationales, pratiques culinaires.</li>
                </ul>
                 <div className={`bg-green-50 dark:bg-green-900/20 rounded-lg p-4 my-4 not-prose border-l-4 border-green-600`}>
                    <h4 className="text-base font-semibold text-green-700 dark:text-green-300 mb-2">Enjeux :</h4>
                    <p className="text-sm mb-1">La confrontation à d'autres cultures (par la migration, les voyages, les médias) peut entraîner un <strong className="font-semibold">choc culturel</strong> mais aussi un enrichissement. Il est important d'éviter l'<strong className="font-semibold">ethnocentrisme</strong> (juger les autres cultures selon ses propres critères) et de privilégier le <strong className="font-semibold">relativisme culturel</strong> (comprendre une culture dans son propre contexte).</p>
                </div>
                <p>
                  Dans les sociétés de plus en plus mondialisées et multiculturelles, les individus sont souvent exposés à des influences culturelles diverses, conduisant à des <strong className="font-semibold">identités culturelles plurielles</strong>.
                </p>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className={`inline h-6 w-6 mr-2 text-${accentColor}`} /> Conclusion : Des socialisations plurielles</h2>
                <p>
                  La socialisation n'est donc pas un processus monolithique. Elle est façonnée par une multitude de facteurs qui s'entrecroisent : le genre, le milieu social, la culture, mais aussi les expériences individuelles, les rencontres, les événements biographiques.
                  Chaque individu est ainsi le produit d'une <strong className="font-semibold">socialisation plurielle</strong>, qui construit une identité unique et en constante évolution.
                </p>
                <div className={`my-4 p-3 bg-${accentColor}/10 dark:bg-${accentColor}/20 rounded-lg not-prose`}>
                  <h4 className={`text-base font-semibold text-${accentColor} mb-2`}>Points clés à retenir :</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-sm">
                    <li>La socialisation est différenciée selon le genre, le milieu social et la culture.</li>
                    <li>La socialisation de genre inculque des rôles et stéréotypes masculins/féminins.</li>
                    <li>Le milieu social transmet un capital culturel et un habitus spécifiques.</li>
                    <li>Chaque culture a ses propres normes et valeurs transmises par la socialisation.</li>
                    <li>Les individus développent des identités plurielles issues de ces multiples influences.</li>
                  </ul>
                </div>
                <p>
                   Reconnaître cette diversité est essentiel pour comprendre les dynamiques sociales contemporaines, les inégalités et les possibilités de changement social.
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
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur la diversité des socialisations.</p>
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