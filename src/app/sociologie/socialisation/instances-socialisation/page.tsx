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
  Home, // Famille
  School, // École
  Tv, // Médias
  Briefcase, // Travail
  HeartHandshake, // Associations
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

const slug = "instances-socialisation";
const chapterTitle = "Les Instances de Socialisation";
const subject = "sociologie";
const moduleSlug = "socialisation";
const accentColor = "socio-purple";

export default function InstancesSocialisationPage() {
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
      id: "instance-socialisation",
      title: "Instance de socialisation",
      explication: "Groupe social ou institution qui participe à la transmission des normes et valeurs sociales.",
    },
    {
      id: "pluralite-instances",
      title: "Pluralité des instances",
      explication: "Fait que les individus sont socialisés par plusieurs instances dont les influences peuvent être convergentes ou divergentes.",
    },
    {
      id: "socialisation-professionnelle",
      title: "Socialisation professionnelle",
      explication: "Apprentissage des normes, valeurs et compétences spécifiques à un milieu de travail.",
    },
    {
      id: "socialisation-conjugale",
      title: "Socialisation conjugale",
      explication: "Processus d'ajustement mutuel des normes et valeurs au sein d'un couple.",
    },
    {
      id: "hexis-corporelle",
      title: "Hexis corporelle",
      explication: "Manière socialement construite de se tenir, de se mouvoir, d'utiliser son corps, transmise par la socialisation.",
    },
  ];

  const pageSections = [
    { id: "introduction", title: "Introduction" },
    { id: "famille", title: "La Famille" },
    { id: "ecole", title: "L'École" },
    { id: "pairs", title: "Le Groupe de Pairs" },
    { id: "medias", title: "Les Médias" },
    { id: "travail-autres", title: "Travail et Autres Instances" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionIconMap = {
    introduction: { icon: <Info className={`h-5 w-5 mr-1 text-${accentColor}`} />, label: "Introduction" },
    famille: { icon: <Home className="h-5 w-5 mr-1 text-red-500" />, label: "Famille" },
    ecole: { icon: <School className="h-5 w-5 mr-1 text-green-500" />, label: "École" },
    pairs: { icon: <Users className="h-5 w-5 mr-1 text-yellow-500" />, label: "Pairs" },
    medias: { icon: <Tv className="h-5 w-5 mr-1 text-purple-500" />, label: "Médias" },
    "travail-autres": { icon: <Briefcase className="h-5 w-5 mr-1 text-orange-500" />, label: "Autres" },
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
              Identifier les acteurs clés (famille, école, médias, etc.) qui façonnent nos identités et comportements.
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
                <h2><Info className={`inline h-6 w-6 mr-2 text-${accentColor}`} /> Qui nous socialise ? Les instances clés</h2>
                <p>
                  La socialisation est un processus complexe assuré par différentes <strong className="font-semibold">instances de socialisation</strong>. Ce sont des groupes sociaux ou des institutions qui transmettent des normes, des valeurs, des savoirs et des manières d'être. Chaque individu est exposé à une <strong className="font-semibold">pluralité d'instances</strong> dont les influences peuvent se cumuler, se compléter ou parfois entrer en tension.
                </p>
                <div className={`bg-${accentColor}/5 dark:bg-${accentColor}/10 rounded-lg p-3 my-3 not-prose border-l-4 border-${accentColor}`}>
                  <h4 className={`text-base font-semibold text-${accentColor} mb-2`}>Principales instances :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>La famille</li>
                    <li>L'école</li>
                    <li>Le groupe de pairs</li>
                    <li>Les médias</li>
                    <li>Le monde du travail</li>
                  </ul>
                </div>
                <p>
                  L'importance relative de ces instances évolue au cours de la vie et selon les contextes sociaux.
                </p>
              </>
            )}

            {activeSection === "famille" && (
              <>
                <h2><Home className="inline h-6 w-6 mr-2 text-red-500" /> La Famille : Le berceau de la socialisation</h2>
                <p>
                  La <strong className="font-semibold">famille</strong> est la première et l'une des plus influentes instances de socialisation, surtout durant la socialisation primaire. Elle transmet :
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">Les normes fondamentales :</strong> langage, politesse, propreté, règles de vie commune.</li>
                  <li><strong className="font-semibold">Les valeurs :</strong> morales, religieuses (éventuellement), politiques (souvent implicitement).</li>
                  <li><strong className="font-semibold">Les rôles sociaux :</strong> notamment les rôles de genre, par l'exemple et l'inculcation.</li>
                  <li><strong className="font-semibold">L'hexis corporelle :</strong> manières de se tenir, de manger, de parler.</li>
                  <li>Un certain <strong className="font-semibold">capital culturel et social</strong>.</li>
                </ul>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-red-600 dark:text-red-400 mb-2">Spécificités :</h4>
                  <p className="text-sm">Son influence est forte car elle intervient tôt, dans un contexte affectif intense, et de manière continue. Les modèles familiaux (monoparental, recomposé, etc.) et le style éducatif varient et influencent la socialisation.</p>
                </div>
              </>
            )}

            {activeSection === "ecole" && (
              <>
                <h2><School className="inline h-6 w-6 mr-2 text-green-500" /> L'École : L'apprentissage de la vie en société élargie</h2>
                <p>
                  L'<strong className="font-semibold">école</strong> prend le relais et complète l'action de la famille. Elle a pour mission explicite de transmettre des savoirs et des compétences, mais elle socialise aussi de manière plus implicite :
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">Savoirs formels :</strong> lire, écrire, compter, connaissances disciplinaires.</li>
                  <li><strong className="font-semibold">Normes scolaires :</strong> ponctualité, respect des règles, travail personnel, discipline.</li>
                  <li><strong className="font-semibold">Valeurs :</strong> mérite, égalité des chances (en théorie), effort, compétition.</li>
                  <li><strong className="font-semibold">Rôles :</strong> apprendre à être élève, à interagir avec des adultes hors de la famille et avec des pairs.</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-green-700 dark:text-green-300 mb-2">Fonction d'intégration :</h4>
                  <p className="text-sm">L'école confronte l'enfant à l'altérité et à des règles universelles, préparant à la vie civique. Elle joue un rôle crucial dans l'orientation scolaire et professionnelle, et donc dans la reproduction ou la mobilité sociale.</p>
                </div>
              </>
            )}

            {activeSection === "pairs" && (
              <>
                <h2><Users className="inline h-6 w-6 mr-2 text-yellow-500" /> Le Groupe de Pairs : L'influence des semblables</h2>
                <p>
                  Le <strong className="font-semibold">groupe de pairs</strong> (amis, camarades de classe, etc.) gagne en importance à l'adolescence mais est présent tout au long de la vie. Il est un lieu d'apprentissage par l'interaction horizontale :
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">Normes spécifiques au groupe :</strong> codes vestimentaires, langage, goûts musicaux, pratiques culturelles (jeux, sorties).</li>
                  <li><strong className="font-semibold">Solidarité et compétition :</strong> apprentissage de la coopération, de la gestion des conflits, de la hiérarchie au sein du groupe.</li>
                  <li><strong className="font-semibold">Construction identitaire :</strong> permet de s'affirmer, de se différencier de la famille, d'expérimenter des rôles.</li>
                  <li><strong className="font-semibold">Socialisation de genre :</strong> les pairs renforcent souvent les stéréotypes de masculinité et de féminité.</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Influence croissante :</h4>
                  <p className="text-sm">Avec l'essor des réseaux sociaux numériques, l'influence des pairs s'étend et se complexifie, créant de nouvelles formes de sociabilité et de pression à la conformité.</p>
                </div>
              </>
            )}

             {activeSection === "medias" && (
              <>
                <h2><Tv className="inline h-6 w-6 mr-2 text-purple-500" /> Les Médias : Fenêtres sur le monde et modèles</h2>
                <p>
                  Les <strong className="font-semibold">médias</strong> (télévision, internet, réseaux sociaux, presse, cinéma, etc.) jouent un rôle croissant dans la socialisation contemporaine. Ils transmettent :
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">Informations et connaissances :</strong> sur le monde, l'actualité, diverses cultures.</li>
                  <li><strong className="font-semibold">Modèles de comportement et de réussite :</strong> à travers les personnages de fiction, les célébrités, les influenceurs.</li>
                  <li><strong className="font-semibold">Valeurs et idéologies :</strong> souvent de manière implicite, à travers les récits et les représentations.</li>
                  <li><strong className="font-semibold">Stéréotypes :</strong> de genre, sociaux, culturels, qui peuvent être puissamment véhiculés et renforcés.</li>
                </ul>
                <div className={`bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 my-4 not-prose border-l-4 border-purple-600`}>
                  <h4 className="text-base font-semibold text-purple-700 dark:text-purple-300 mb-2">Ambivalence :</h4>
                  <p className="text-sm mb-1">Les médias peuvent être source d'ouverture et d'émancipation, mais aussi de conformisme et de diffusion de représentations simplifiées ou erronées. L'éducation aux médias est cruciale pour développer un esprit critique.</p>
                </div>
              </>
            )}

            {activeSection === "travail-autres" && (
              <>
                <h2><Briefcase className="inline h-6 w-6 mr-2 text-orange-500" /> Travail et Autres Instances de Socialisation Secondaire</h2>
                <p>
                  Au-delà des instances déjà citées, de nombreuses autres participent à la socialisation, notamment durant la phase secondaire :
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">Le monde du travail (socialisation professionnelle) :</strong> apprentissage d'un métier, de la culture d'entreprise, des relations hiérarchiques et collégiales.</li>
                  <li><strong className="font-semibold">Les institutions religieuses :</strong> transmission de croyances, de valeurs morales, de rituels.</li>
                  <li><strong className="font-semibold">Les associations (sportives, culturelles, caritatives) :</strong> apprentissage de règles spécifiques, de la coopération, de l'engagement.</li>
                  <li><strong className="font-semibold">Les institutions politiques (partis, syndicats) :</strong> transmission d'idéologies, de modes d'action collective.</li>
                  <li><strong className="font-semibold">Le couple (socialisation conjugale) :</strong> ajustement des modes de vie, des valeurs, construction d'un "nous".</li>
                </ul>
                <div className={`bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 my-3 not-prose`}>
                  <h4 className="text-base font-semibold text-orange-600 dark:text-orange-400 mb-2">Interactions complexes :</h4>
                  <p className="text-sm">Ces instances peuvent interagir, leurs influences se renforçant ou entrant en conflit, contribuant à la construction d'identités plurielles et parfois contradictoires.</p>
                </div>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className={`inline h-6 w-6 mr-2 text-${accentColor}`} /> Conclusion : Une socialisation plurielle et continue</h2>
                <p>
                  L'individu est façonné par une <strong className="font-semibold">pluralité d'instances de socialisation</strong> qui interviennent à différents moments de sa vie et avec des poids variables. De la famille à l'école, des amis aux médias et au monde du travail, chacune contribue à l'intégration des normes et valeurs qui permettent de vivre en société.
                </p>
                <div className={`my-4 p-3 bg-${accentColor}/10 dark:bg-${accentColor}/20 rounded-lg not-prose`}>
                  <h4 className={`text-base font-semibold text-${accentColor} mb-2`}>Points clés à retenir :</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-sm">
                    <li>La famille et l'école sont des instances majeures, surtout dans la socialisation primaire.</li>
                    <li>Les groupes de pairs et les médias ont une influence croissante, notamment à l'adolescence.</li>
                    <li>Le travail et d'autres institutions (associations, couple) continuent la socialisation à l'âge adulte.</li>
                    <li>Les influences de ces instances peuvent être convergentes, complémentaires ou contradictoires.</li>
                    <li>Comprendre le rôle de chaque instance aide à analyser la formation des identités et les comportements sociaux.</li>
                  </ul>
                </div>
                <p>
                  Cette socialisation est un processus dynamique et jamais totalement achevé, qui façonne des individus à la fois conformes et uniques.
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
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur les instances de socialisation.</p>
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