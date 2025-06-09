"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  CheckCircle, 
  Clock, 
  Users, // Icône principale pour politiques de l'emploi
  Briefcase, // Pour types de chômage / marché du travail
  Wrench, // Pour instruments des politiques (remplace Tool)
  BarChartHorizontalBig, // Pour effets et évaluation
  AlertOctagon, // Pour limites et débats
  BookMarked,
  ListChecks,
  Info,
  HelpCircle,
  UserCheck, // Pour insertion professionnelle
  SearchX // Pour lutte contre le chômage
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

interface Notion {
  id: string;
  title: string;
  explication: string;
}

const slug = "politiques-emploi";
const chapterTitle = "Les Politiques de l'Emploi : Objectifs, Instruments et Enjeux";

export default function PolitiquesEmploiPage() {
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
    { id: "chomage", title: "Chômage", explication: "Situation d'une personne sans emploi, disponible pour travailler et recherchant activement un emploi." },
    { id: "politiques-actives", title: "Politiques actives de l'emploi", explication: "Mesures visant à améliorer directement le fonctionnement du marché du travail et l'employabilité (formation, aides à l'embauche)." },
    { id: "politiques-passives", title: "Politiques passives de l'emploi", explication: "Mesures visant à indemniser les chômeurs et à faciliter leur transition (allocations chômage, préretraites)." },
    { id: "chomage-structurel", title: "Chômage structurel", explication: "Chômage lié aux rigidités et inadéquations du marché du travail, indépendant des fluctuations conjoncturelles." },
    { id: "chomage-conjoncturel", title: "Chômage conjoncturel (ou keynésien)", explication: "Chômage dû à une insuffisance de la demande globale dans l'économie." },
    { id: "flexibilite-marche-travail", title: "Flexibilité du marché du travail", explication: "Capacité du marché du travail à s'ajuster aux chocs économiques (flexibilité des salaires, de l'emploi, fonctionnelle)." },
    { id: "cout-travail", title: "Coût du travail", explication: "Ensemble des dépenses supportées par l'employeur pour l'utilisation du facteur travail (salaires bruts + cotisations sociales)." },
    { id: "formation-professionnelle", title: "Formation professionnelle", explication: "Processus d'apprentissage permettant d'acquérir des compétences spécifiques pour un métier ou une profession." },
    { id: "salarie-minimum", title: "Salaire minimum", explication: "Rémunération horaire minimale légale qu'un employeur doit verser à ses salariés." },
  ];

  const pageSections = [
    { id: "introduction", title: "Introduction" },
    { id: "types-chomage-objectifs", title: "Chômage & Objectifs" },
    { id: "instruments-politiques-emploi", title: "Instruments" },
    { id: "effets-evaluation", title: "Effets & Évaluation" },
    { id: "limites-debats", title: "Limites & Débats" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionIconMap = {
    introduction: { icon: <Info className="h-5 w-5 mr-1 text-eco-blue" />, label: "Introduction" },
    "types-chomage-objectifs": { icon: <Briefcase className="h-5 w-5 mr-1 text-blue-500" />, label: "Chômage & Objectifs" },
    "instruments-politiques-emploi": { icon: <Wrench className="h-5 w-5 mr-1 text-blue-600" />, label: "Instruments" },
    "effets-evaluation": { icon: <BarChartHorizontalBig className="h-5 w-5 mr-1 text-blue-600" />, label: "Effets & Évaluation" },
    "limites-debats": { icon: <AlertOctagon className="h-5 w-5 mr-1 text-blue-600" />, label: "Limites & Débats" },
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
              <Users className="mr-2 h-8 w-8 text-eco-blue" /> {chapterTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Explorer les stratégies et mesures mises en œuvre pour lutter contre le chômage et favoriser l'emploi.
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
                <h2><Info className="inline h-6 w-6 mr-2 text-eco-blue" />Introduction aux politiques de l'emploi</h2>
                <p>Les politiques de l'emploi regroupent l'ensemble des interventions des pouvoirs publics visant à influencer le niveau et la structure de l'emploi, ainsi qu'à lutter contre le <strong className="font-semibold">chômage</strong>. Elles constituent un enjeu majeur des politiques économiques et sociales en raison des conséquences individuelles et collectives du chômage.</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-eco-blue mb-2">Pourquoi des politiques de l'emploi ?</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Réduire le chômage et ses coûts économiques et sociaux.</li>
                    <li>Favoriser l'insertion professionnelle des jeunes et des publics vulnérables.</li>
                    <li>Adapter les compétences de la main-d'œuvre aux besoins de l'économie.</li>
                    <li>Améliorer le fonctionnement du marché du travail.</li>
                  </ul>
                </div>
                <p>Ces politiques peuvent être classées en deux grandes catégories : les politiques actives et les politiques passives.</p>
              </>
            )}

            {activeSection === "types-chomage-objectifs" && (
              <>
                <h2><Briefcase className="inline h-6 w-6 mr-2 text-blue-500" />Comprendre le chômage et les objectifs des politiques</h2>
                <p>Pour être efficaces, les politiques de l'emploi doivent tenir compte des différentes formes de chômage :</p>
                <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center"><SearchX className="h-5 w-5 mr-1.5"/>Chômage conjoncturel</h4>
                    <p className="text-sm">Lié à un ralentissement de l'activité économique. Il se combat par des politiques de soutien de la demande globale (budgétaire, monétaire).</p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center"><Briefcase className="h-5 w-5 mr-1.5"/>Chômage structurel</h4>
                    <p className="text-sm">Résulte d'inadéquations entre l'offre et la demande de travail (compétences, localisation), de rigidités sur le marché du travail. C'est la cible principale des politiques structurelles de l'emploi.</p>
                  </div>
                </div>
                <p>Les objectifs principaux des politiques de l'emploi sont :</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Atteindre le <strong className="font-semibold">plein-emploi</strong> ou réduire significativement le taux de chômage.</li>
                    <li>Augmenter le <strong className="font-semibold">taux d'emploi</strong> (part des personnes en âge de travailler qui occupent un emploi).</li>
                    <li>Améliorer la <strong className="font-semibold">qualité des emplois</strong> (conditions de travail, salaires, stabilité).</li>
                    <li>Favoriser l'<strong className="font-semibold">insertion professionnelle</strong> durable des demandeurs d'emploi.</li>
                </ul>
              </>
            )}

            {activeSection === "instruments-politiques-emploi" && (
              <>
                <h2><Wrench className="inline h-6 w-6 mr-2 text-blue-600" />Instruments des politiques de l'emploi</h2>
                <p>Les instruments se répartissent entre politiques actives et passives :</p>
                <div className="my-4 p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center">Politiques actives</h4>
                  <p className="text-sm mb-1">Elles visent à améliorer l'employabilité et à faciliter le retour à l'emploi :</p>
                  <ul className="list-disc list-inside space-y-0.5 text-xs pl-4">
                    <li><strong className="font-semibold">Formation professionnelle :</strong> adaptation et développement des compétences.</li>
                    <li><strong className="font-semibold">Aides à l'embauche :</strong> subventions, exonérations de charges pour inciter les entreprises à recruter (notamment certains publics).</li>
                    <li><strong className="font-semibold">Accompagnement personnalisé des chômeurs :</strong> services publics de l'emploi (ex: Pôle emploi en France).</li>
                    <li><strong className="font-semibold">Création d'emplois aidés :</strong> emplois subventionnés dans le secteur marchand ou non marchand.</li>
                    <li><strong className="font-semibold">Soutien à la création d'entreprise.</strong></li>
                  </ul>
                </div>
                <div className="my-4 p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center">Politiques passives</h4>
                  <p className="text-sm mb-1">Elles visent à indemniser les chômeurs et à gérer les sureffectifs :</p>
                  <ul className="list-disc list-inside space-y-0.5 text-xs pl-4">
                    <li><strong className="font-semibold">Indemnisation du chômage :</strong> allocations chômage pour compenser la perte de revenu.</li>
                    <li><strong className="font-semibold">Dispositifs de préretraite ou de retrait anticipé d'activité.</strong></li>
                  </ul>
                </div>
                <p>D'autres politiques, plus structurelles, agissent sur le <strong className="font-semibold">coût du travail</strong> (baisses de cotisations sociales) ou la <strong className="font-semibold">flexibilité du marché du travail</strong> (réforme du droit du travail, du salaire minimum).</p>
              </>
            )}

            {activeSection === "effets-evaluation" && (
              <>
                <h2><BarChartHorizontalBig className="inline h-6 w-6 mr-2 text-blue-600" />Effets et Évaluation des politiques de l'emploi</h2>
                <p>L'évaluation de l'efficacité des politiques de l'emploi est complexe et sujette à débat.</p>
                <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                    <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">Facteurs d'efficacité :</h4>
                    <ul className="list-disc list-inside space-y-0.5 text-sm">
                        <li>Ciblage adéquat des dispositifs sur les publics les plus en difficulté.</li>
                        <li>Bonne articulation avec la conjoncture économique.</li>
                        <li>Qualité de la mise en œuvre et des services d'accompagnement.</li>
                        <li>Effets sur l'employabilité à long terme (notamment pour la formation).</li>
                    </ul>
                </div>
                <p>Les économistes utilisent diverses méthodes pour évaluer ces politiques, en essayant d'isoler leurs effets propres d'autres facteurs. Les résultats sont souvent mitigés et dépendent du type de mesure et du contexte.</p>
                <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                    <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">Risques et effets pervers :</h4>
                     <ul className="list-disc list-inside space-y-0.5 text-sm">
                        <li><strong className="font-semibold">Effets d'aubaine :</strong> les entreprises auraient embauché même sans l'aide.</li>
                        <li><strong className="font-semibold">Effets de substitution :</strong> une personne aidée prend la place d'une autre non aidée.</li>
                        <li><strong className="font-semibold">Stigmatisation :</strong> certains dispositifs peuvent marquer négativement les bénéficiaires.</li>
                        <li><strong className="font-semibold">Dépendance aux aides et faible qualité des emplois créés.</strong></li>
                    </ul>
                </div>
              </>
            )}

            {activeSection === "limites-debats" && (
              <>
                <h2><AlertOctagon className="inline h-6 w-6 mr-2 text-blue-600" />Limites et Débats contemporains</h2>
                <p>Les politiques de l'emploi font face à plusieurs limites et sont au cœur de débats importants :</p>
                 <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2">Principales limites et débats :</h4>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-sm">
                    <li><strong>Coût budgétaire :</strong> certaines politiques (notamment les baisses de charges ou les emplois aidés) peuvent être très coûteuses pour les finances publiques.</li>
                    <li><strong>Débat flexibilité vs. sécurité (flexisécurité) :</strong> trouver un équilibre entre la nécessité d'adapter le marché du travail et la protection des salariés.</li>
                    <li><strong>Impact de la mondialisation et des mutations technologiques :</strong> automatisation, polarisation des emplois, besoin de nouvelles compétences.</li>
                    <li><strong>Question de l'adéquation formation-emploi :</strong> comment mieux orienter et former pour répondre aux besoins réels des entreprises ?</li>
                    <li><strong>Rôle du dialogue social :</strong> implication des partenaires sociaux (syndicats, organisations patronales) dans la définition et la mise en œuvre des politiques.</li>
                  </ul>
                </div>
                <p>Les défis actuels incluent la lutte contre le chômage de longue durée, l'emploi des jeunes et des seniors, et l'adaptation aux transitions écologique et numérique.</p>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className="inline h-6 w-6 mr-2 text-eco-blue" />Conclusion</h2>
                <p>Les politiques de l'emploi sont un ensemble diversifié de mesures visant à améliorer la situation du marché du travail. Leur conception et leur efficacité sont cruciales pour le bien-être économique et social. Elles doivent être adaptées en permanence aux évolutions de l'économie et de la société.</p>
                <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-eco-blue mb-2">Points clés à retenir :</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-sm">
                    <li>Distinction entre chômage conjoncturel et structurel.</li>
                    <li>Politiques actives (formation, aides à l'embauche) et passives (indemnisation).</li>
                    <li>L'évaluation est complexe et doit tenir compte des effets d'aubaine et de substitution.</li>
                    <li>Débats sur la flexibilité, le coût du travail, et l'adéquation formation-emploi.</li>
                  </ul>
                </div>
                <p>Un marché du travail performant est essentiel pour une croissance inclusive et durable.</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur les politiques de l'emploi.</p>
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