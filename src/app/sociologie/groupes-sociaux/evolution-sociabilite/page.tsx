"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Users, // Module Icon
  History, // Main chapter icon: Évolution
  Network, // Icon for networks
  UserPlus, // Icon for new forms
  Building, // Icon for urbanization
  BookMarked,
  ListChecks,
  Info,
  HelpCircle,
  Briefcase, // Icon for work
  Globe // Icon for globalization
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

interface Notion {
  id: string;
  title: string;
  explication: string;
}

const slug = "evolution-sociabilite";
const chapterTitle = "L'Évolution des Formes de Sociabilité";
const subject = "sociologie";
const moduleSlug = "groupes-sociaux";
const accentColor = "socio-purple";

export default function EvolutionSociabilitePage() {
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
      id: "sociabilite",
      title: "Sociabilité",
      explication: "Ensemble des relations qu'un individu entretient avec d'autres, ainsi que les formes et modalités de ces relations.",
    },
    {
      id: "sociabilite-formelle",
      title: "Sociabilité formelle",
      explication: "Relations sociales organisées autour d'institutions et de cadres structurés (associations, syndicats, partis politiques).",
    },
    {
      id: "sociabilite-informelle",
      title: "Sociabilité informelle",
      explication: "Relations sociales spontanées et moins structurées (amitié, voisinage, rencontres occasionnelles).",
    },
    {
      id: "individualisation",
      title: "Individualisation",
      explication: "Processus par lequel les individus s'affranchissent progressivement des cadres collectifs traditionnels pour construire leurs propres parcours et identités.",
    },
    {
      id: "sociabilite-elective",
      title: "Sociabilité élective",
      explication: "Relations sociales choisies librement par les individus en fonction de leurs affinités et intérêts personnels.",
    },
  ];

  const pageSections = [
    { id: "introduction", title: "Introduction" },
    { id: "sociabilite_traditionnelle", title: "Sociabilité Traditionnelle" },
    { id: "transformations_modernes", title: "Transformations Modernes" },
    { id: "sociabilite_contemporaine", title: "Sociabilité Contemporaine" },
    { id: "tendances_futures", title: "Tendances Futures" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionIconMap = {
    introduction: { icon: <Info className={`h-5 w-5 mr-1 text-${accentColor}`} />, label: "Intro" },
    sociabilite_traditionnelle: { icon: <Building className="h-5 w-5 mr-1 text-blue-500" />, label: "Traditionnelle" },
    transformations_modernes: { icon: <Network className="h-5 w-5 mr-1 text-green-500" />, label: "Transformations" },
    sociabilite_contemporaine: { icon: <UserPlus className="h-5 w-5 mr-1 text-yellow-500" />, label: "Contemporaine" },
    tendances_futures: { icon: <Globe className="h-5 w-5 mr-1 text-red-500" />, label: "Tendances" },
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
              <History className={`mr-3 h-8 w-8 text-${accentColor}`} /> {chapterTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Comprendre comment les formes de sociabilité ont évolué à travers le temps et les transformations sociales.
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
                <h2><Info className={`inline h-6 w-6 mr-2 text-${accentColor}`} /> Introduction: La sociabilité en mouvement</h2>
                <p>
                  La <strong className="font-semibold">sociabilité</strong>, définie comme l'ensemble des relations qu'un individu entretient avec d'autres, n'est pas une réalité figée. Elle évolue constamment au rythme des transformations économiques, technologiques et culturelles qui traversent les sociétés. Les formes, l'intensité et la nature des liens sociaux se sont profondément modifiées au cours de l'histoire, particulièrement depuis la révolution industrielle et l'avènement de la modernité.
                </p>
                <div className={`bg-${accentColor}/5 dark:bg-${accentColor}/10 rounded-lg p-3 my-3 not-prose border-l-4 border-${accentColor}`}>
                  <h4 className={`text-base font-semibold text-${accentColor} mb-2`}>Questions centrales :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Comment les formes de sociabilité ont-elles évolué au fil du temps ?</li>
                    <li>Quels facteurs sociaux, économiques et technologiques ont influencé ces évolutions ?</li>
                    <li>Assiste-t-on à un déclin ou à une transformation des liens sociaux ?</li>
                    <li>Vers quelles nouvelles formes de sociabilité nous dirigeons-nous ?</li>
                  </ul>
                </div>
              </>
            )}

            {activeSection === "sociabilite_traditionnelle" && (
              <>
                <h2><Building className="inline h-6 w-6 mr-2 text-blue-500" /> La sociabilité dans les sociétés traditionnelles</h2>
                <p>Dans les sociétés préindustrielles, la sociabilité était principalement caractérisée par :</p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">L'ancrage local et communautaire :</strong> Les relations sociales étaient fortement ancrées dans la communauté locale (village, quartier) et marquées par l'interconnaissance.</li>
                  <li><strong className="font-semibold">La prédominance des liens primaires :</strong> Les relations familiales et de parenté constituaient le socle principal de la sociabilité.</li>
                  <li><strong className="font-semibold">L'importance des traditions et des rituels collectifs :</strong> Fêtes religieuses, marchés, veillées structuraient la vie sociale.</li>
                  <li><strong className="font-semibold">Une sociabilité imposée plus que choisie :</strong> Les relations sociales étaient largement déterminées par la naissance et la position sociale.</li>
                  <li><strong className="font-semibold">L'importance des solidarités de proximité :</strong> Entraide entre voisins, travaux collectifs (moissons, vendanges).</li>
                </ul>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-2">Focus sur la sociabilité villageoise</h4>
                  <p className="text-sm">Le village constituait un microcosme social où chacun connaissait tout le monde. Les lieux de sociabilité comme la place du village, l'église, le marché ou le café jouaient un rôle central dans la vie communautaire. La sociabilité y était intense mais aussi fortement contrôlée par le regard collectif.</p>
                </div>
                <p>
                  Selon Ferdinand Tönnies, ces sociétés traditionnelles relevaient de la <strong className="font-semibold">communauté (Gemeinschaft)</strong>, caractérisée par des liens affectifs forts, une forte intégration sociale et un sentiment d'appartenance prononcé.
                </p>
              </>
            )}

            {activeSection === "transformations_modernes" && (
              <>
                <h2><Network className="inline h-6 w-6 mr-2 text-green-500" /> Les grandes transformations de la modernité</h2>
                <p>
                  Plusieurs phénomènes majeurs ont bouleversé les formes traditionnelles de sociabilité à partir du XIXe siècle :
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">L'industrialisation et l'urbanisation :</strong> L'exode rural et la concentration urbaine ont affaibli les communautés traditionnelles et créé de nouvelles formes de sociabilité urbaine.</li>
                  <li><strong className="font-semibold">La mobilité géographique accrue :</strong> Les déplacements plus fréquents ont distendu les liens de proximité.</li>
                  <li><strong className="font-semibold">L'émergence de la société salariale :</strong> Le travail en usine ou au bureau a créé de nouveaux espaces de sociabilité professionnelle.</li>
                  <li><strong className="font-semibold">Le développement de l'État-providence :</strong> La prise en charge collective de certains risques a réduit la dépendance aux solidarités traditionnelles.</li>
                  <li><strong className="font-semibold">L'émergence de la vie associative moderne :</strong> Syndicats, partis politiques, associations sportives et culturelles ont offert de nouveaux cadres de sociabilité.</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-green-600 dark:text-green-400 mb-2">La sociabilité ouvrière</h4>
                  <p className="text-sm">Au XIXe et début du XXe siècle, une forte sociabilité ouvrière s'est développée autour des quartiers populaires, des usines, des cafés et des organisations syndicales. Cette sociabilité était marquée par une forte conscience de classe et des solidarités professionnelles intenses.</p>
                </div>
                <p>
                  Pour Tönnies, ces transformations marquent le passage à la <strong className="font-semibold">société (Gesellschaft)</strong>, caractérisée par des relations plus impersonnelles, contractuelles et utilitaires. Émile Durkheim parle quant à lui du passage d'une <strong className="font-semibold">solidarité mécanique</strong> (basée sur la ressemblance) à une <strong className="font-semibold">solidarité organique</strong> (basée sur la complémentarité des fonctions).
                </p>
              </>
            )}

            {activeSection === "sociabilite_contemporaine" && (
              <>
                <h2><UserPlus className="inline h-6 w-6 mr-2 text-yellow-500" /> La sociabilité contemporaine : entre individualisation et nouvelles appartenances</h2>
                <p>
                  Depuis les années 1960-1970, de nouvelles tendances ont émergé dans l'évolution des formes de sociabilité :
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">L'individualisation croissante :</strong> Les individus s'affranchissent davantage des appartenances héritées pour construire leur propre réseau de relations.</li>
                  <li><strong className="font-semibold">La montée de la sociabilité élective :</strong> Les relations sont davantage choisies en fonction des affinités et des intérêts personnels.</li>
                  <li><strong className="font-semibold">La diversification des cercles de sociabilité :</strong> Les individus appartiennent simultanément à plusieurs groupes sociaux distincts.</li>
                  <li><strong className="font-semibold">L'affaiblissement des sociabilités formelles :</strong> Déclin relatif des engagements dans les structures traditionnelles (syndicats, partis, églises).</li>
                  <li><strong className="font-semibold">Le développement de sociabilités plus informelles et flexibles :</strong> Relations moins institutionnalisées et plus adaptables aux parcours individuels.</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-yellow-600 dark:text-yellow-400 mb-2">L'évolution des liens familiaux</h4>
                  <p className="text-sm">La famille reste un lieu central de sociabilité mais sa forme a évolué : familles recomposées, monoparentales, couples non cohabitants... Les relations familiales sont davantage négociées et moins hiérarchiques. La "famille élargie à distance" maintient des liens forts malgré l'éloignement géographique.</p>
                </div>
                <p>
                  François de Singly parle d'<strong className="font-semibold">individualisme relationnel</strong> : l'individu contemporain cherche à s'affirmer comme autonome tout en maintenant des liens significatifs avec les autres. Robert Putnam a quant à lui alerté sur le risque de <strong className="font-semibold">déclin du capital social</strong> dans les sociétés contemporaines, notamment dans son ouvrage "Bowling Alone" (2000).
                </p>
              </>
            )}

            {activeSection === "tendances_futures" && (
              <>
                <h2><Globe className="inline h-6 w-6 mr-2 text-red-500" /> Tendances actuelles et perspectives futures</h2>
                <p>
                  Plusieurs évolutions récentes dessinent de nouvelles tendances dans les formes de sociabilité :
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li><strong className="font-semibold">La révolution numérique :</strong> Les technologies de communication transforment radicalement les modalités d'interaction sociale (réseaux sociaux, messageries instantanées, communautés en ligne).</li>
                  <li><strong className="font-semibold">La mondialisation des échanges :</strong> Les réseaux sociaux s'internationalisent et se diversifient culturellement.</li>
                  <li><strong className="font-semibold">Les nouvelles formes d'engagement :</strong> Émergence de mobilisations plus ponctuelles, plus souples et moins institutionnalisées.</li>
                  <li><strong className="font-semibold">Le retour de certaines formes de sociabilité locale :</strong> Développement des circuits courts, des jardins partagés, des initiatives de quartier.</li>
                  <li><strong className="font-semibold">L'évolution des espaces de travail :</strong> Télétravail, coworking, travail nomade redéfinissent la sociabilité professionnelle.</li>
                </ul>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-red-600 dark:text-red-400 mb-2">L'individualisme connecté</h4>
                  <p className="text-sm">Selon le sociologue Barry Wellman, nous sommes entrés dans l'ère de "l'individualisme en réseau" : les individus sont au centre de leurs propres réseaux personnels qu'ils gèrent activement, plutôt que d'être intégrés dans des groupes communautaires denses et locaux.</p>
                </div>
                <p>
                  Ces évolutions posent de nouvelles questions : assistons-nous à un appauvrissement des relations sociales ou à leur reconfiguration ? Comment maintenir des liens sociaux forts dans un contexte de mobilité et de flexibilité accrues ? Les sociabilités virtuelles peuvent-elles compenser l'affaiblissement des sociabilités traditionnelles ?
                </p>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className={`inline h-6 w-6 mr-2 text-${accentColor}`} /> Conclusion</h2>
                <p>
                  L'évolution des formes de sociabilité reflète les transformations profondes des sociétés. Nous sommes passés de sociabilités traditionnelles, ancrées dans la communauté locale et largement imposées, à des sociabilités plus choisies, diversifiées et individualisées. Cependant, cette évolution ne signifie pas nécessairement un déclin des liens sociaux, mais plutôt leur reconfiguration.
                </p>
                <p>
                  Les sociologues contemporains mettent en évidence plusieurs caractéristiques des sociabilités actuelles :
                </p>
                <ul className="list-disc list-inside space-y-1 my-3">
                  <li>La <strong className="font-semibold">pluralité des appartenances</strong> : les individus circulent entre différents cercles sociaux</li>
                  <li>La <strong className="font-semibold">flexibilité des engagements</strong> : les liens sociaux sont davantage négociés et réversibles</li>
                  <li>L'<strong className="font-semibold">articulation entre relations virtuelles et réelles</strong> : les deux dimensions se complètent plus qu'elles ne s'opposent</li>
                  <li>La <strong className="font-semibold">tension entre besoin d'autonomie et désir d'appartenance</strong> : l'individu contemporain cherche à concilier ces deux aspirations</li>
                </ul>
                <div className={`bg-${accentColor}/5 dark:bg-${accentColor}/10 rounded-lg p-3 my-3 not-prose border-l-4 border-${accentColor}`}>
                  <h4 className={`text-base font-semibold text-${accentColor} mb-2`}>À retenir :</h4>
                  <p className="text-sm">L'évolution des formes de sociabilité ne doit pas être interprétée comme un simple déclin des liens sociaux, mais comme une transformation profonde de leur nature et de leurs modalités. Les sociétés contemporaines ne sont pas moins riches en relations sociales que les sociétés traditionnelles, mais ces relations prennent des formes différentes, plus diversifiées, plus choisies et plus individualisées.</p>
                </div>
              </>
            )}

            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="font-semibold text-lg mb-3">Notions clés à retenir</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {notionsCles.map((notion) => (
                  <div key={notion.id} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <h4 className={`font-medium text-${accentColor} mb-1`}>{notion.title}</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{notion.explication}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Link 
                href={`/quiz/${subject}/${moduleSlug}/${slug}`}
                className={`btn btn-primary bg-${accentColor} hover:bg-${accentColor}/90 flex items-center`}
              >
                <HelpCircle className="h-5 w-5 mr-2" />
                Tester mes connaissances
              </Link>
              <button
                onClick={handleMarkAsCompleted}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  isCompleted
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                <CheckCircle className="h-5 w-5 mr-1" />
                {isCompleted ? "Chapitre terminé" : "Marquer comme terminé"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 