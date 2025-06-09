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
  ShieldCheck, // Icon for stabilization policies
  TrendingUp, // Icon for economic objectives (growth, employment)
  Sliders, // Icon for instruments
  Info,
  ListChecks,
  DollarSign, // Icon for fiscal policy
  Zap, // Icon for monetary policy
  HelpCircle // For quiz link
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

export default function PolitiquesStabilisationPage() {
  const { updateChapterProgress, getChapterProgress, formatTime } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeSection, setActiveSection] = useState("intro");
  const chapterId = "politiques-stabilisation";
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
    { id: "objectifs", title: "Objectifs et Cadre" },
    { id: "politique-budgetaire", title: "Politique Budgétaire" },
    { id: "politique-monetaire", title: "Politique Monétaire" },
    { id: "coordination-limites", title: "Coordination et Limites" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionMap = {
    intro: { icon: <Info className="h-5 w-5 mr-1 text-eco-blue" />, label: "Introduction" },
    objectifs: { icon: <TrendingUp className="h-5 w-5 mr-1 text-green-500" />, label: "Objectifs" },
    "politique-budgetaire": { icon: <DollarSign className="h-5 w-5 mr-1 text-red-500" />, label: "Politique Budgétaire" },
    "politique-monetaire": { icon: <Zap className="h-5 w-5 mr-1 text-purple-500" />, label: "Politique Monétaire" },
    "coordination-limites": { icon: <Sliders className="h-5 w-5 mr-1 text-yellow-500" />, label: "Coordination & Limites" },
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
              <ShieldCheck className="mr-2 h-8 w-8 text-eco-blue" /> Les Politiques de Stabilisation
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Comprendre comment les pouvoirs publics interviennent pour réguler l'activité économique et atteindre les objectifs du carré magique.
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
                <h2><Info className="inline h-6 w-6 mr-2 text-eco-blue" />Introduction aux Politiques de Stabilisation</h2>
                <p>Les politiques de stabilisation, également appelées politiques conjoncturelles, visent à réguler l'activité économique à court terme pour atténuer les fluctuations (cycles économiques) et maintenir l'économie sur une trajectoire de croissance stable avec un faible taux de chômage et une inflation maîtrisée.</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 my-3">
                  <p><strong>Objectif principal :</strong> Lisser les cycles économiques pour éviter les surchauffes (inflation, bulles) et les récessions (chômage, faillites).</p>
                </div>
                <p>Ces politiques s'appuient principalement sur deux leviers : la politique budgétaire (gérée par le gouvernement) et la politique monétaire (gérée par la banque centrale).</p>
              </>
            )}

            {activeSection === "objectifs" && (
              <>
                <h2><TrendingUp className="inline h-6 w-6 mr-2 text-green-500" />Objectifs et Cadre Général</h2>
                <p>Les politiques de stabilisation visent à atteindre les objectifs du <strong>"carré magique" de Kaldor</strong> :</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Plein emploi (faible taux de chômage)</li>
                    <li>Stabilité des prix (faible inflation)</li>
                    <li>Croissance économique soutenue</li>
                    <li>Équilibre extérieur (balance commerciale)</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 my-3">
                  <p>Atteindre simultanément ces quatre objectifs est souvent difficile, d'où le terme "magique". Des arbitrages sont souvent nécessaires.</p>
                </div>
                <h3>Politique conjoncturelle vs. structurelle :</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Conjoncturelle :</strong> Action à court terme sur la demande globale.</li>
                  <li><strong>Structurelle :</strong> Action à long terme sur l'offre globale et les structures de l'économie.</li>
                </ul>
                <p>Ce chapitre se concentre sur les politiques conjoncturelles.</p>
              </>
            )}

            {activeSection === "politique-budgetaire" && (
              <>
                <h2><DollarSign className="inline h-6 w-6 mr-2 text-red-500" />La Politique Budgétaire</h2>
                <p>La politique budgétaire consiste pour le gouvernement à utiliser ses dépenses publiques et ses recettes fiscales pour influencer l'activité économique.</p>
                
                <h3>Instruments :</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Dépenses publiques (G) :</strong> Investissements publics, salaires des fonctionnaires, prestations sociales. Une augmentation stimule la demande.</li>
                  <li><strong>Prélèvements obligatoires (T) :</strong> Impôts et cotisations sociales. Une baisse stimule la demande (hausse du revenu disponible).</li>
                </ul>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 my-3">
                  <p><strong>Solde budgétaire :</strong> Recettes (T) - Dépenses (G). Peut être excédentaire, déficitaire ou à l'équilibre.</p>
                </div>

                <h3>Orientations :</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Politique budgétaire expansive (ou de relance) :</strong> Augmentation des dépenses publiques et/ou baisse des impôts pour stimuler la demande globale en période de récession ou de faible croissance. Risque : inflation, déficit public, endettement.</li>
                  <li><strong>Politique budgétaire restrictive (ou de rigueur/austérité) :</strong> Baisse des dépenses publiques et/ou hausse des impôts pour freiner la demande globale en période de surchauffe (inflation) ou pour réduire le déficit public. Risque : récession, chômage.</li>
                </ul>
                
                <h3 className="mt-3">Mécanismes :</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li><strong>Effet multiplicateur keynésien :</strong> Une dépense publique initiale (ou baisse d'impôt) engendre une augmentation plus que proportionnelle du revenu national grâce aux dépenses successives des agents.</li>
                    <li><strong>Stabilisateurs automatiques :</strong> Certains postes budgétaires (ex: indemnités chômage, impôt sur le revenu progressif) évoluent automatiquement pour atténuer les chocs conjoncturels sans décision discrétionnaire.</li>
                </ul>

                <h3 className="mt-3">Avantages et Limites :</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <h4 className="font-semibold text-green-700 dark:text-green-300">Avantages</h4>
                        <ul className="list-disc list-inside text-sm">
                            <li>Impact direct et rapide sur la demande (surtout dépenses publiques).</li>
                            <li>Peut cibler des secteurs ou agents spécifiques.</li>
                            <li>Stabilisateurs automatiques efficaces.</li>
                        </ul>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <h4 className="font-semibold text-red-700 dark:text-red-300">Limites</h4>
                        <ul className="list-disc list-inside text-sm">
                            <li>Délais de décision et de mise en œuvre.</li>
                            <li>Risque d'éviction des investissements privés par la hausse des taux d'intérêt (si financement par emprunt).</li>
                            <li>Contrainte extérieure (fuite par les importations).</li>
                            <li>Augmentation de la dette publique.</li>
                            <li>Attentes des agents (peuvent anticiper une future hausse d'impôts).</li>
                        </ul>
                    </div>
                </div>
              </>
            )}

            {activeSection === "politique-monetaire" && (
              <>
                <h2><Zap className="inline h-6 w-6 mr-2 text-purple-500" />La Politique Monétaire</h2>
                <p>La politique monétaire est menée par la banque centrale (ex: Banque Centrale Européenne - BCE) et vise à influencer l'activité économique via la quantité de monnaie en circulation et le coût du crédit (taux d'intérêt).</p>
                
                <h3>Instruments :</h3>
                 <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 my-3">
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>Taux d'intérêt directeurs :</strong> Principal instrument. La banque centrale modifie ses taux directeurs (ex: taux de refinancement) pour influencer les taux d'intérêt pratiqués par les banques commerciales, et donc le coût du crédit pour les ménages et entreprises.</li>
                        <li><strong>Opérations d'open market :</strong> Achat ou vente de titres sur le marché monétaire pour injecter ou retirer des liquidités.</li>
                        <li><strong>Réserves obligatoires :</strong> Pourcentage des dépôts que les banques doivent conserver auprès de la banque centrale.</li>
                        <li><strong>Politiques non conventionnelles (depuis la crise de 2008) :</strong> Ex: Quantitative Easing (QE) - achat massif d'actifs par la banque centrale.</li>
                    </ul>
                </div>

                <h3>Orientations :</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Politique monétaire expansive (ou accommodante) :</strong> Baisse des taux d'intérêt directeurs pour stimuler le crédit, l'investissement, la consommation et donc la demande globale. Utilisée en période de récession ou de faible inflation.</li>
                  <li><strong>Politique monétaire restrictive (ou de resserrement) :</strong> Hausse des taux d'intérêt directeurs pour freiner le crédit et la demande globale. Utilisée pour lutter contre l'inflation.</li>
                </ul>

                <h3 className="mt-3">Canaux de transmission :</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li><strong>Canal du taux d'intérêt :</strong> Influence le coût du crédit.</li>
                    <li><strong>Canal du crédit :</strong> Influence l'offre de crédit par les banques.</li>
                    <li><strong>Canal du taux de change :</strong> Une baisse des taux d'intérêt peut déprécier la monnaie, stimulant les exportations.</li>
                    <li><strong>Canal du prix des actifs :</strong> Influence la valeur des actions, de l'immobilier, etc. (effet de richesse).</li>
                </ul>

                <h3 className="mt-3">Avantages et Limites :</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <h4 className="font-semibold text-green-700 dark:text-green-300">Avantages</h4>
                        <ul className="list-disc list-inside text-sm">
                            <li>Rapidité de décision (banques centrales souvent indépendantes).</li>
                            <li>Impact large sur l'économie.</li>
                            <li>Flexibilité des instruments.</li>
                        </ul>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <h4 className="font-semibold text-red-700 dark:text-red-300">Limites</h4>
                        <ul className="list-disc list-inside text-sm">
                            <li>Délais de transmission à l'économie réelle.</li>
                            <li>Trappe à liquidité (taux d'intérêt très bas, politique inefficace).</li>
                            <li>Difficulté à contrôler tous les agrégats monétaires.</li>
                            <li>Risque de bulles spéculatives.</li>
                            <li>Peu efficace contre le chômage structurel.</li>
                        </ul>
                    </div>
                </div>
                <p>L'indépendance de la banque centrale est souvent vue comme un gage de crédibilité pour maintenir la stabilité des prix.</p>
              </>
            )}

            {activeSection === "coordination-limites" && (
              <>
                <h2><Sliders className="inline h-6 w-6 mr-2 text-yellow-500" />Coordination et Limites des Politiques</h2>
                <h3>Policy-mix :</h3>
                <p>Le "policy-mix" désigne la combinaison des politiques budgétaire et monétaire. L'efficacité des politiques de stabilisation dépend de leur bonne coordination. Par exemple :</p>
                <ul className="list-disc list-inside space-y-1">
                    <li><strong>Relance coordonnée :</strong> Politique budgétaire expansive + politique monétaire expansive.</li>
                    <li><strong>Rigueur coordonnée :</strong> Politique budgétaire restrictive + politique monétaire restrictive.</li>
                </ul>
                <p>Des politiques contradictoires (ex: relance budgétaire et rigueur monétaire) peuvent se neutraliser.</p>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 my-3">
                  <h4 className="font-semibold">Le cas de la zone Euro :</h4>
                  <p>La politique monétaire est unique (BCE), mais les politiques budgétaires restent nationales, ce qui pose des défis de coordination, encadrés par des règles comme le Pacte de Stabilité et de Croissance (PSC).</p>
                </div>

                <h3 className="mt-3">Limites générales des politiques conjoncturelles :</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Délais :</strong> Délais de perception du problème, de décision, et d'action sur l'économie.</li>
                  <li><strong>Anticipations des agents :</strong> Si les agents anticipent les effets des politiques, ils peuvent modifier leur comportement et en réduire l'efficacité (critique de Lucas).</li>
                  <li><strong>Ouverture des économies :</strong> Une relance peut fuiter par les importations, réduisant son impact national et creusant le déficit commercial.</li>
                  <li><strong>Contraintes institutionnelles :</strong> Endettement public élevé limitant la marge de manœuvre budgétaire, indépendance de la banque centrale, règles européennes.</li>
                  <li><strong>Chocs d'offre :</strong> Les politiques conjoncturelles agissent surtout sur la demande et sont moins efficaces face à des chocs d'offre (ex: hausse du prix du pétrole).</li>
                </ul>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className="inline h-6 w-6 mr-2 text-eco-blue" />Conclusion</h2>
                <p>Les politiques de stabilisation sont des outils essentiels pour modérer les fluctuations économiques. Elles cherchent à atteindre un équilibre délicat entre croissance, emploi et stabilité des prix. Leur mise en œuvre est complexe et soumise à de nombreuses contraintes et débats théoriques.</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 my-3">
                  <strong>Points clés à retenir :</strong>
                  <ul className="list-disc list-inside mt-1">
                    <li>Les politiques conjoncturelles (budgétaire et monétaire) visent à stabiliser l'économie à court terme.</li>
                    <li>La politique budgétaire utilise les dépenses publiques et les impôts.</li>
                    <li>La politique monétaire utilise les taux d'intérêt et la masse monétaire.</li>
                    <li>Le "policy-mix" et la coordination sont cruciaux pour l'efficacité.</li>
                    <li>De nombreuses limites (délais, anticipations, contraintes externes et institutionnelles) affectent leur efficacité.</li>
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
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur les politiques de stabilisation.</p>
                <Link href="/quiz/economie/politiques-stabilisation" className="text-sm text-white bg-eco-blue px-3 py-1.5 rounded inline-flex items-center hover:bg-blue-700 transition-colors">Faire le quiz <ArrowLeft className="h-3.5 w-3.5 ml-1 rotate-180" /></Link>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-1">Notions clés</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                  <li>Politique conjoncturelle</li>
                  <li>Carré magique (Kaldor)</li>
                  <li>Politique budgétaire (expansive/restrictive)</li>
                  <li>Multiplicateur keynésien</li>
                  <li>Stabilisateurs automatiques</li>
                  <li>Politique monétaire (expansive/restrictive)</li>
                  <li>Taux directeurs (BCE)</li>
                  <li>Policy-mix</li>
                  <li>Trappe à liquidité</li>
                </ul>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-1">Chapitres liés</h4>
                <ul className="text-sm space-y-1">
                  <li><Link href="/economie/macroeconomie/fluctuations" className="text-eco-blue hover:underline">Les fluctuations économiques</Link></li>
                  <li><Link href="/economie/macroeconomie/chomage-inflation" className="text-eco-blue hover:underline">Le chômage et l'inflation</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
} 