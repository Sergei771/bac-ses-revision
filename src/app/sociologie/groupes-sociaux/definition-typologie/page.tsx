"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen, 
  CheckCircle,
  Clock,
  Network, // Module Groupes et Réseaux
  Users, // Groupes sociaux (générique et primaire/secondaire)
  UserCheck, // Groupe d'appartenance
  Target, // Groupe de référence
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

const slug = "definition-typologie";
const chapterTitle = "Les Groupes Sociaux : Définition et Typologie";
const subject = "sociologie";
const moduleSlug = "groupes-sociaux";
const accentColor = "socio-purple";

export default function DefinitionTypologiePage() {
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
      id: "groupe-social",
      title: "Groupe social",
      explication: "Ensemble d\'individus ayant des interactions régulières, une conscience d\'appartenance commune et des objectifs partagés (implicites ou explicites).",
    },
    {
      id: "groupe-primaire",
      title: "Groupe primaire",
      explication: "Groupe de petite taille caractérisé par des relations directes, intimes et affectives, une forte cohésion et une influence importante sur ses membres (ex: famille, amis proches).",
    },
    {
      id: "groupe-secondaire",
      title: "Groupe secondaire",
      explication: "Groupe de plus grande taille où les relations sont plus formelles, impersonnelles et fonctionnelles, orientées vers des buts spécifiques (ex: entreprise, parti politique).",
    },
    {
      id: "groupe-appartenance",
      title: "Groupe d\'appartenance",
      explication: "Groupe social dont un individu fait objectivement partie (ex: sa classe sociale d'origine, sa profession).",
    },
    {
      id: "groupe-reference",
      title: "Groupe de référence",
      explication: "Groupe social auquel un individu s\'identifie ou aspire à appartenir, et dont il adopte les normes et valeurs (peut être différent du groupe d\'appartenance).",
    },
    {
      id: "interaction-sociale",
      title: "Interaction sociale",
      explication: "Action réciproque entre deux ou plusieurs individus au cours de laquelle leurs comportements s\'influencent mutuellement."
    }
  ];

  const pageSections = [
    { id: "introduction", title: "Introduction" },
    { id: "definition", title: "Qu\'est-ce qu\'un Groupe Social ?" },
    { id: "typologie-primaire-secondaire", title: "Primaire vs. Secondaire" },
    { id: "typologie-appartenance-reference", title: "Appartenance vs. Référence" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionIconMap = {
    introduction: { icon: <Info className={`h-5 w-5 mr-1 text-${accentColor}`} />, label: "Introduction" },
    definition: { icon: <Users className="h-5 w-5 mr-1 text-blue-500" />, label: "Définition" },
    "typologie-primaire-secondaire": { icon: <Users className="h-5 w-5 mr-1 text-orange-500" />, label: "Primaire/Secondaire" },
    "typologie-appartenance-reference": { icon: <Target className="h-5 w-5 mr-1 text-purple-500" />, label: "Appartenance/Référence" },
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
          Retour au module {moduleSlug.replace("-", " ").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center`}>
              <Network className={`mr-2 h-8 w-8 text-${accentColor}`} /> {chapterTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Comprendre les fondations de la vie sociale : ce qui définit un groupe et comment les sociologues les classifient.
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
                <h2><Info className={`inline h-6 w-6 mr-2 text-${accentColor}`} /> Introduction : L'individu n'est pas une île</h2>
                <p>
                  La sociologie s\'intéresse aux manières dont les individus interagissent et forment des collectivités. Le concept de <strong className="font-semibold">groupe social</strong> est fondamental pour comprendre ces dynamiques. Nous appartenons tous à une multitude de groupes (famille, amis, collègues, associations...) qui influencent notre identité, nos comportements et nos opportunités.
                </p>
                <div className={`bg-${accentColor}/5 dark:bg-${accentColor}/10 rounded-lg p-3 my-3 not-prose border-l-4 border-${accentColor}`}>
                  <h4 className={`text-base font-semibold text-${accentColor} mb-2`}>Pourquoi étudier les groupes ?</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Ils sont le lieu de la socialisation.</li>
                    <li>Ils structurent les relations sociales.</li>
                    <li>Ils sont à la base de l'action collective.</li>
                    <li>Ils sont source de solidarité mais aussi de conflits.</li>
                  </ul>
                </div>
                <p>
                  Ce chapitre définit ce qu\'est un groupe social et présente les principales typologies utilisées par les sociologues pour les distinguer.
                </p>
              </>
            )}

            {activeSection === "definition" && (
              <>
                <h2><Users className="inline h-6 w-6 mr-2 text-blue-500" /> Qu'est-ce qu'un Groupe Social ? Critères de définition</h2>
                <p>
                  Tous les rassemblements d\'individus ne constituent pas un groupe social au sens sociologique. Pour qu\'un groupe social existe, plusieurs critères doivent généralement être réunis :
                </p>
                <ul className="list-disc list-inside space-y-2 my-3">
                  <li><strong className="font-semibold">Interactions sociales régulières :</strong> Les membres du groupe communiquent et agissent les uns avec les autres de manière répétée, directe ou indirecte.</li>
                  <li><strong className="font-semibold">Conscience d'appartenance commune (ou sentiment du "nous") :</strong> Les membres se reconnaissent comme appartenant au groupe et sont reconnus comme tels par les autres membres. Ils partagent une identité collective.</li>
                  <li><strong className="font-semibold">Objectifs ou intérêts communs (implicites ou explicites) :</strong> Le groupe peut être formé autour d\'un but précis (ex: une équipe sportive) ou d\'intérêts plus diffus (ex: un groupe d\'amis partageant des loisirs).</li>
                  <li><strong className="font-semibold">Organisation et structure (plus ou moins formelle) :</strong> Des rôles, des statuts, des normes et des règles peuvent régir le fonctionnement du groupe.</li>
                </ul>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-2">Distinction importante :</h4>
                  <p className="text-sm">Il faut distinguer le groupe social de la <strong className="font-semibold">catégorie statistique</strong> (ensemble d\'individus partageant une caractéristique commune, ex: les jeunes de 15-24 ans, sans forcément interagir ni avoir conscience d\'appartenir à un groupe) et de l'<strong className="font-semibold">agrégat physique</strong> (rassemblement fortuit d\'individus en un même lieu, ex: file d\'attente, sans interaction significative).</p>
                </div>
              </>
            )}

            {activeSection === "typologie-primaire-secondaire" && (
              <>
                <h2><Users className="inline h-6 w-6 mr-2 text-orange-500" /> Typologie : Groupes Primaires et Groupes Secondaires</h2>
                <p>
                  L'une des distinctions les plus classiques est celle proposée par Charles Cooley entre groupes primaires et groupes secondaires :
                </p>
                <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
                  <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-orange-700 dark:text-orange-300 mb-2">Groupe Primaire</h4>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Petite taille.</li>
                      <li>Relations directes, intimes, affectives ("face-à-face").</li>
                      <li>Forte cohésion, solidarité importante.</li>
                      <li>Influence majeure sur la socialisation et l'identité (ex: famille, amis très proches).</li>
                      <li>Gratification émotionnelle et soutien.</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-amber-700 dark:text-amber-300 mb-2">Groupe Secondaire</h4>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Plus grande taille, souvent organisation formelle.</li>
                      <li>Relations plus impersonnelles, fonctionnelles, contractuelles.</li>
                      <li>Orienté vers des buts spécifiques, tâches à accomplir.</li>
                      <li>Moins d\'investissement affectif global (ex: entreprise, association, parti politique, classe d\'élèves).</li>
                      <li>Rôles et statuts plus clairement définis.</li>
                    </ul>
                  </div>
                </div>
                <p>Cette distinction est un <strong className="font-semibold">idéal-type</strong> : dans la réalité, de nombreux groupes présentent des caractéristiques des deux types. Par exemple, des relations de type primaire peuvent se développer au sein d\'un groupe secondaire (amitiés entre collègues).</p>
              </>
            )}

            {activeSection === "typologie-appartenance-reference" && (
              <>
                <h2><Target className="inline h-6 w-6 mr-2 text-purple-500" /> Typologie : Groupe d'Appartenance et Groupe de Référence</h2>
                <p>
                  Une autre distinction importante, notamment due à Robert K. Merton, est celle entre groupe d'appartenance et groupe de référence :
                </p>
                <ul className="list-disc list-inside space-y-2 my-3">
                  <li><strong className="font-semibold">Groupe d'appartenance :</strong> C'est le groupe social dont l'individu <strong className="font-semibold">fait objectivement partie</strong>, en fonction de critères sociaux (ex: sa famille d\'origine, sa catégorie socio-professionnelle, son genre, son groupe d\'âge). L'appartenance peut être subie ou choisie.</li>
                  <li><strong className="font-semibold">Groupe de référence :</strong> C'est le groupe social auquel l'individu <strong className="font-semibold">s'identifie psychologiquement</strong> et dont il adopte les normes, les valeurs et les comportements. Il sert de modèle pour l'individu, qui peut chercher à y être accepté ou simplement l'admirer.</li>
                </ul>
                <div className={`bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 my-4 not-prose border-l-4 border-purple-600`}>
                  <h4 className="text-base font-semibold text-purple-700 dark:text-purple-300 mb-2">Concordance et discordance :</h4>
                  <p className="text-sm mb-1">Le groupe de référence peut être le même que le groupe d'appartenance (ex: un ouvrier s'identifiant à la classe ouvrière). Mais il peut aussi être différent. C'est souvent le cas dans les situations de <strong className="font-semibold">socialisation anticipatrice</strong>, où un individu adopte les comportements d'un groupe qu'il aspire à rejoindre (ex: un étudiant adoptant les codes d'une profession avant même d'y entrer).</p>
                  <p className="text-sm">La discordance entre groupe d'appartenance et groupe de référence peut être source de tensions identitaires mais aussi de mobilité sociale.</p>
                </div>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className={`inline h-6 w-6 mr-2 text-${accentColor}`} /> Conclusion : Des outils pour comprendre la complexité sociale</h2>
                <p>
                  La définition du groupe social et les typologies (primaire/secondaire, appartenance/référence) sont des outils essentiels pour le sociologue. Ils permettent de décomposer la complexité des relations sociales, de comprendre comment les individus se structurent en collectivités et comment ces groupes influencent leurs trajectoires.
                </p>
                <div className={`my-4 p-3 bg-${accentColor}/10 dark:bg-${accentColor}/20 rounded-lg not-prose`}>
                  <h4 className={`text-base font-semibold text-${accentColor} mb-2`}>Points clés à retenir :</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-sm">
                    <li>Un groupe social implique interactions, conscience d'appartenance et objectifs communs.</li>
                    <li>Les groupes primaires (famille, amis) sont caractérisés par des liens affectifs forts.</li>
                    <li>Les groupes secondaires (entreprise, association) sont plus formels et orientés vers des buts.</li>
                    <li>Le groupe d'appartenance est celui dont on fait partie; le groupe de référence est celui auquel on s'identifie.</li>
                    <li>Ces distinctions aident à analyser la socialisation, l'identité et la mobilité sociale.</li>
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
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur les groupes sociaux.</p>
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