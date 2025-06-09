"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  ArrowLeft,
  BookMarked,
  Lightbulb,
  Info,
  ListChecks,
  Users, // Icon for unemployment
  DollarSign, // Icon for inflation
  Link as LinkIcon, // Icon for Phillips curve
  HelpCircle // Pour le lien vers le quiz
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

export default function ChomageInflationPage() {
  const { updateChapterProgress, getChapterProgress, formatTime } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeSection, setActiveSection] = useState("intro");
  const chapterId = "chomage-inflation";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!mounted) return;
    intervalRef.current = setInterval(() => setTimeSpent(prev => prev + 1), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (mounted && timeSpent > 0) {
        const progress = getChapterProgress("economie", chapterId);
        updateChapterProgress("economie", chapterId, { timeSpent: (progress?.timeSpent || 0) + timeSpent });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
    const progress = getChapterProgress("economie", chapterId);
    if (progress) setIsCompleted(progress.completed);
  }, [getChapterProgress, chapterId]);

  const handleMarkAsCompleted = () => {
    updateChapterProgress("economie", chapterId, { completed: !isCompleted });
    setIsCompleted(!isCompleted);
  };

  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "chomage", title: "Le Chômage" },
    { id: "inflation", title: "L'Inflation" },
    { id: "relation", title: "Relation Chômage-Inflation" },
    { id: "politiques", title: "Politiques de lutte" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionMap = {
    intro: { icon: <Info className="h-5 w-5 mr-1 text-eco-blue" />, label: "Introduction" },
    chomage: { icon: <Users className="h-5 w-5 mr-1 text-red-500" />, label: "Le Chômage" },
    inflation: { icon: <DollarSign className="h-5 w-5 mr-1 text-green-500" />, label: "L'Inflation" },
    relation: { icon: <LinkIcon className="h-5 w-5 mr-1 text-purple-500" />, label: "Relation Chômage-Inflation" },
    politiques: { icon: <Lightbulb className="h-5 w-5 mr-1 text-yellow-500" />, label: "Politiques" },
    conclusion: { icon: <ListChecks className="h-5 w-5 mr-1 text-eco-blue" />, label: "Conclusion" },
  } as const;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/economie/macroeconomie" className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour à la macroéconomie
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <Users className="mr-2 h-8 w-8 text-eco-blue" /> Le Chômage et l'Inflation
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Comprendre les définitions, les causes, les conséquences et les politiques liées au chômage et à l'inflation.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600 dark:text-gray-300"><Clock className="h-5 w-5 mr-1" /><span>Temps: {formatTime(timeSpent)}</span></div>
            <button onClick={handleMarkAsCompleted} className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isCompleted ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}>
              <CheckCircle className="h-5 w-5 mr-1" />{isCompleted ? "Terminé" : "Marquer comme terminé"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <nav className="md:w-64 w-full md:sticky md:top-24 self-start bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-8 md:mb-0 flex-shrink-0">
          <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Sommaire</h3>
          <ul className="space-y-2 md:space-y-2 flex md:flex-col flex-row overflow-x-auto">
            {sections.map(section => (
              <li key={section.id} className="flex-1 md:flex-none">
                <button onClick={() => setActiveSection(section.id)} className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors text-left focus:outline-none focus:ring-2 focus:ring-eco-blue ${activeSection === section.id ? "bg-eco-blue text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"}`} aria-current={activeSection === section.id ? "page" : undefined}>
                  {sectionMap[section.id as keyof typeof sectionMap].icon} <span className="hidden md:inline ml-2">{sectionMap[section.id as keyof typeof sectionMap].label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="flex-1 min-w-0">
          <motion.div key={activeSection} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 prose dark:prose-invert max-w-none">
            
            {activeSection === "intro" && (
              <>
                <h2><Info className="inline h-6 w-6 mr-2 text-eco-blue" />Introduction</h2>
                <p>Le chômage et l'inflation sont deux déséquilibres macroéconomiques majeurs. Ils ont des conséquences économiques et sociales importantes et sont au centre des préoccupations des politiques économiques.</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 my-3">
                  <p><strong>Objectifs de ce chapitre :</strong> Définir ces deux phénomènes, analyser leurs causes et conséquences, et explorer la relation qui peut exister entre eux.</p>
                </div>
              </>
            )}

            {activeSection === "chomage" && (
              <>
                <h2><Users className="inline h-6 w-6 mr-2 text-red-500" />Le Chômage</h2>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-3">
                  <p><strong>Définition (BIT) :</strong> Un chômeur est une personne en âge de travailler (15 ans ou plus) qui remplit simultanément trois conditions :</p>
                  <ol>
                    <li>Être sans emploi durant une semaine de référence.</li>
                    <li>Être disponible pour prendre un emploi dans les 15 jours.</li>
                    <li>Avoir cherché activement un emploi dans le mois précédent (ou en avoir trouvé un qui commence plus tard).</li>
                  </ol>
                  <p>Le <strong>taux de chômage</strong> = (Nombre de chômeurs / Population active) x 100.</p>
                </div>
                
                <h3>Types de chômage :</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Chômage conjoncturel (ou keynésien) :</strong> Lié à un ralentissement de l'activité économique (demande globale insuffisante).</li>
                  <li><strong>Chômage structurel :</strong> Lié aux caractéristiques structurelles de l'économie (inadéquation qualifications/besoins, rigidités du marché du travail, progrès technique...). Plus durable.</li>
                  <li><strong>Chômage frictionnel :</strong> Période incompressible entre la perte d'un emploi et la recherche d'un nouvel emploi.</li>
                </ul>

                <h3 className="mt-4">Causes principales :</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Insuffisance de la demande globale (récession, faible croissance).</li>
                  <li>Coût du travail jugé trop élevé par les entreprises.</li>
                  <li>Inadéquation entre l'offre et la demande de travail (qualifications, localisation).</li>
                  <li>Progrès technique (peut détruire des emplois à court terme).</li>
                  <li>Rigidités sur le marché du travail (ex: réglementation, SMIC pour certains économistes).</li>
                </ul>

                <h3 className="mt-4">Conséquences :</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Économiques :</strong> Perte de production, baisse de la demande, augmentation des dépenses publiques (indemnités), baisse des recettes fiscales.</li>
                  <li><strong>Sociales :</strong> Baisse du niveau de vie, pauvreté, exclusion sociale, problèmes de santé, perte de compétences.</li>
                </ul>
              </>
            )}

            {activeSection === "inflation" && (
              <>
                <h2><DollarSign className="inline h-6 w-6 mr-2 text-green-500" />L'Inflation</h2>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-3">
                  <p><strong>Définition :</strong> L'inflation est une augmentation générale, auto-entretenue et durable du niveau général des prix des biens et services. Elle se traduit par une perte de pouvoir d'achat de la monnaie.</p>
                  <p>Elle est mesurée par l'<strong>Indice des Prix à la Consommation (IPC)</strong>.</p>
                  <p><em>Ne pas confondre avec :</em> Désinflation (ralentissement de l'inflation), Déflation (baisse durable des prix).</p>
                </div>
                
                <h3>Types d'inflation selon ses causes :</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Inflation par la demande :</strong> La demande globale excède l'offre globale disponible (trop de monnaie pour trop peu de biens). Souvent en période de forte croissance.</li>
                  <li><strong>Inflation par les coûts :</strong> Hausse des coûts de production des entreprises (salaires, matières premières, énergie) qui est répercutée sur les prix de vente.</li>
                  <li><strong>Inflation importée :</strong> Hausse des prix des biens et services importés.</li>
                  <li><strong>Inflation par excès de création monétaire :</strong> Une quantité de monnaie en circulation trop importante par rapport à la production.</li>
                  <li><strong>Inflation structurelle :</strong> Liée aux dysfonctionnements des marchés (concurrence insuffisante).</li>
                </ul>

                <h3 className="mt-4">Conséquences :</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Sur le pouvoir d'achat :</strong> Baisse si les revenus n'augmentent pas aussi vite que les prix. Affecte surtout les revenus fixes.</li>
                  <li><strong>Sur l'épargne :</strong> Dévalorisation de l'épargne non indexée sur l'inflation.</li>
                  <li><strong>Sur la compétitivité-prix :</strong> Si l'inflation nationale est plus forte qu'à l'étranger, les produits nationaux deviennent moins compétitifs.</li>
                  <li><strong>Sur les taux d'intérêt :</strong> Les prêteurs exigent des taux d'intérêt réels positifs, donc les taux nominaux augmentent avec l'inflation.</li>
                  <li><strong>Incertitude :</strong> Peut freiner l'investissement et la consommation.</li>
                </ul>
                 <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 my-3">
                  <p><strong>Une inflation modérée (autour de 2%)</strong> est souvent considérée comme un objectif par les banques centrales, car elle peut faciliter les ajustements de prix relatifs et éviter les risques de déflation.</p>
                </div>
              </>
            )}

            {activeSection === "relation" && (
              <>
                <h2><LinkIcon className="inline h-6 w-6 mr-2 text-purple-500" />La Relation Chômage-Inflation</h2>
                <p>La relation entre chômage et inflation a fait l'objet de nombreux débats théoriques.</p>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 mb-3">
                  <h4 className="font-semibold">La courbe de Phillips (A.W. Phillips, 1958)</h4>
                  <p>Initialement, Phillips observe une relation empirique inverse (décroissante) entre le taux de croissance des salaires nominaux et le taux de chômage au Royaume-Uni. Par extension, cela a été interprété comme un arbitrage possible entre inflation et chômage : pour réduire le chômage, il faudrait accepter plus d'inflation, et inversement.</p>
                  <p><em>Explication :</em> Un faible chômage donne plus de pouvoir de négociation aux salariés pour obtenir des hausses de salaires, ce qui augmente les coûts de production et donc les prix.</p>
                </div>
                
                <h3 className="mt-4">Critiques et limites :</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>La stagflation des années 1970 :</strong> Coexistence d'un chômage élevé ET d'une forte inflation, contredisant la relation simple de Phillips.</li>
                  <li><strong>Le rôle des anticipations (M. Friedman, E. Phelps) :</strong> Les agents économiques anticipent l'inflation. Si la politique économique vise à réduire le chômage en stimulant l'inflation, les agents vont anticiper cette inflation et demander des hausses de salaires, annulant l'effet sur le chômage réel à long terme.</li>
                  <li><strong>Le taux de chômage naturel (NAIRU) :</strong> Il existerait un taux de chômage (dit "naturel" ou "structurel" ou NAIRU - Non-Accelerating Inflation Rate of Unemployment) en dessous duquel l'inflation s'accélère. À long terme, la courbe de Phillips serait verticale à ce niveau de chômage.</li>
                </ul>
                <p className="mt-3">Aujourd'hui, la relation est considérée comme plus complexe et instable, surtout à court terme. D'autres facteurs (mondialisation, crédibilité des banques centrales, chocs d'offre) jouent un rôle important.</p>
              </>
            )}

            {activeSection === "politiques" && (
              <>
                <h2><Lightbulb className="inline h-6 w-6 mr-2 text-yellow-500" />Politiques de Lutte</h2>
                <p>Les politiques économiques visent à maintenir un faible niveau de chômage et une inflation maîtrisée.</p>
                
                <h3>Lutte contre le chômage :</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 my-2 rounded-lg">
                  <ul className="list-disc list-inside">
                    <li><strong>Politiques de soutien à la demande globale (conjoncturelles) :</strong> Politiques budgétaire et monétaire expansives pour stimuler l'activité en cas de chômage conjoncturel. (Voir chapitre Politiques de stabilisation)</li>
                    <li><strong>Politiques structurelles du marché du travail :</strong> Formation professionnelle, aides à la mobilité, amélioration du fonctionnement des agences pour l'emploi, flexibilisation du marché du travail (débats sur son efficacité et ses conséquences sociales), baisses de charges sur les bas salaires.</li>
                    <li><strong>Politiques de l'emploi ciblées :</strong> Aides à l'embauche pour certaines catégories (jeunes, chômeurs de longue durée), contrats aidés.</li>
                  </ul>
                </div>

                <h3 className="mt-4">Lutte contre l'inflation :</h3>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 my-2 rounded-lg">
                  <ul className="list-disc list-inside">
                    <li><strong>Politique monétaire restrictive :</strong> Principal instrument. La banque centrale (ex: BCE) augmente ses taux d'intérêt directeurs pour freiner la demande de crédit et donc la demande globale, et pour ancrer les anticipations d'inflation.</li>
                    <li><strong>Politique budgétaire restrictive :</strong> Réduction des dépenses publiques ou hausse des impôts pour calmer la demande.</li>
                    <li><strong>Politiques de concurrence :</strong> Pour limiter la formation de monopoles et d'oligopoles qui pourraient abuser de leur position pour augmenter les prix.</li>
                    <li><strong>Contrôle des prix (rare et souvent peu efficace à long terme).</strong></li>
                  </ul>
                </div>
                 <p className="mt-3">L'indépendance des banques centrales est souvent vue comme un gage de crédibilité dans la lutte contre l'inflation.</p>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className="inline h-6 w-6 mr-2 text-eco-blue" />Conclusion</h2>
                <p>Le chômage et l'inflation sont des défis persistants pour les économies. Leur analyse montre la complexité des mécanismes économiques et l'importance des choix de politique économique.</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 my-3">
                  <strong>Points clés à retenir :</strong>
                  <ul className="list-disc list-inside mt-1">
                    <li>Le chômage a des causes conjoncturelles et structurelles, et des conséquences économiques et sociales lourdes.</li>
                    <li>L'inflation, perte de pouvoir d'achat de la monnaie, peut être due à la demande, aux coûts ou à des facteurs monétaires/structurels.</li>
                    <li>La relation chômage-inflation (courbe de Phillips) est complexe et a évolué, notamment avec le rôle des anticipations.</li>
                    <li>Les politiques de lutte mobilisent des instruments monétaires, budgétaires et structurels, avec des débats sur leur efficacité et leurs priorités.</li>
                  </ul>
                </div>
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
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur le chômage et l'inflation.</p>
                <Link href="/quiz/economie/chomage-inflation" className="text-sm text-white bg-eco-blue px-3 py-1.5 rounded inline-flex items-center hover:bg-blue-700 transition-colors">Faire le quiz <ArrowLeft className="h-3.5 w-3.5 ml-1 rotate-180" /></Link>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-1">Notions clés</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                  <li>Taux de chômage (BIT)</li>
                  <li>Chômage structurel/conjoncturel</li>
                  <li>Inflation (IPC)</li>
                  <li>Inflation par la demande/coûts</li>
                  <li>Courbe de Phillips</li>
                  <li>NAIRU</li>
                </ul>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-1">Chapitres liés</h4>
                <ul className="text-sm space-y-1">
                  <li><Link href="/economie/macroeconomie/fluctuations" className="text-eco-blue hover:underline">Les fluctuations économiques</Link></li>
                  <li><Link href="/economie/macroeconomie/politiques-stabilisation" className="text-eco-blue hover:underline">Les politiques de stabilisation</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
} 