"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  CheckCircle, 
  Clock, 
  DollarSign, // Icône principale
  TrendingUp, // Pour croissance/objectifs
  Briefcase, // Pour emploi
  ShieldCheck, // Pour stabilité prix
  Users, // Pour redistribution
  FileOutput, // Pour dépenses publiques
  Receipt, // Remplacement pour Prélèvements obligatoires
  BarChartBig, // Pour solde budgétaire
  Calculator, // Pour multiplicateur
  ZapOff, // Pour effet d'éviction
  AlertTriangle, // Pour dette/limites
  BookMarked,
  ListChecks,
  Info,
  HelpCircle,
  Scale // pour équilibre/déficit
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

interface Notion {
  id: string;
  title: string;
  explication: string;
}

const slug = "politique-budgetaire";
const chapterTitle = "La Politique Budgétaire : Objectifs, Instruments et Impacts";

export default function PolitiqueBudgetairePage() {
  const { getChapterProgress, updateChapterProgress, formatTime } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeSection, setActiveSection] = useState("introduction");
  const chapterId = slug;

  useEffect(() => {
    if (!mounted) return;
    const progress = getChapterProgress("economie", chapterId);
    if (progress) {
      setTimeSpent(progress.timeSpent);
      setIsCompleted(progress.completed);
    }
    if (!isCompleted) {
      intervalRef.current = setInterval(() => setTimeSpent(prev => prev + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      updateChapterProgress("economie", chapterId, { timeSpent: timeSpent, completed: isCompleted });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted) {
      updateChapterProgress("economie", chapterId, { timeSpent: timeSpent, completed: isCompleted });
    }
    if (isCompleted && intervalRef.current) {
      clearInterval(intervalRef.current);
    } else if (!isCompleted && mounted && !intervalRef.current) {
      intervalRef.current = setInterval(() => setTimeSpent(prev => prev + 1), 1000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted, timeSpent, mounted]);

  const handleMarkAsCompleted = () => setIsCompleted(!isCompleted);

  const notionsCles: Notion[] = [
    { id: "budget-etat", title: "Budget de l'État", explication: "Document prévisionnel qui retrace l'ensemble des recettes et des dépenses de l'État pour une année."}, 
    { id: "depenses-publiques", title: "Dépenses publiques (G)", explication: "Ensemble des dépenses réalisées par les administrations publiques (État, collectivités locales, sécurité sociale)." },
    { id: "prelevements-obligatoires", title: "Prélèvements obligatoires (T)", explication: "Impôts et cotisations sociales perçus par les administrations publiques." },
    { id: "solde-budgetaire", title: "Solde budgétaire", explication: "Différence entre les recettes et les dépenses de l'État. Peut être excédentaire, déficitaire ou à l'équilibre." },
    { id: "deficit-public", title: "Déficit public", explication: "Situation où les dépenses publiques sont supérieures aux recettes publiques sur une période donnée." },
    { id: "dette-publique", title: "Dette publique", explication: "Ensemble des engagements financiers contractés par les administrations publiques pour financer leurs déficits passés." },
    { id: "politique-relance", title: "Politique de relance", explication: "Politique budgétaire expansive visant à stimuler l'activité économique (hausse de G ou baisse de T)." },
    { id: "politique-rigueur", title: "Politique de rigueur (ou d'austérité)", explication: "Politique budgétaire restrictive visant à réduire le déficit et la dette (baisse de G ou hausse de T)." },
    { id: "multiplicateur-keynesien", title: "Multiplicateur keynésien", explication: "Mécanisme par lequel une dépense initiale de l'État engendre une augmentation plus que proportionnelle du revenu national." },
    { id: "effet-eviction", title: "Effet d'éviction", explication: "Phénomène par lequel l'augmentation des dépenses publiques financées par emprunt peut réduire l'investissement privé." },
    { id: "pacte-stabilite", title: "Pacte de Stabilité et de Croissance (PSC)", explication: "Ensemble de règles européennes visant à encadrer les politiques budgétaires nationales (déficit < 3% PIB, dette < 60% PIB)." },
  ];

  const pageSections = [
    { id: "introduction", title: "Introduction" },
    { id: "objectifs-politique-budgetaire", title: "Objectifs" },
    { id: "instruments-politique-budgetaire", title: "Instruments" },
    { id: "effets-politique-budgetaire", title: "Effets & Mécanismes" },
    { id: "limites-contraintes", title: "Limites & Contraintes" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionIconMap = {
    introduction: { icon: <Info className="h-5 w-5 mr-1 text-eco-blue" />, label: "Introduction" },
    "objectifs-politique-budgetaire": { icon: <TrendingUp className="h-5 w-5 mr-1 text-blue-500" />, label: "Objectifs" },
    "instruments-politique-budgetaire": { icon: <Briefcase className="h-5 w-5 mr-1 text-purple-500" />, label: "Instruments" },
    "effets-politique-budgetaire": { icon: <Calculator className="h-5 w-5 mr-1 text-orange-500" />, label: "Effets" },
    "limites-contraintes": { icon: <AlertTriangle className="h-5 w-5 mr-1 text-red-500" />, label: "Limites" },
    conclusion: { icon: <ListChecks className="h-5 w-5 mr-1 text-eco-blue" />, label: "Conclusion" },
  } as const;
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
              <DollarSign className="mr-2 h-8 w-8 text-eco-blue" /> {chapterTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Comprendre comment l'État utilise son budget pour influencer l'économie, atteindre ses objectifs et gérer les contraintes.
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
                <h2><Info className="inline h-6 w-6 mr-2 text-eco-blue" />Qu'est-ce que la politique budgétaire ?</h2>
                <p>La politique budgétaire désigne l'ensemble des décisions prises par les pouvoirs publics (principalement l'État) concernant les recettes (<strong className="font-semibold">prélèvements obligatoires</strong> : impôts, taxes, cotisations sociales) et les dépenses (<strong className="font-semibold">dépenses publiques</strong>) inscrites au budget de l'État. C'est un instrument majeur de la politique économique conjoncturelle et structurelle.</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 my-3 not-prose">
                  <h4 className="text-base font-semibold text-eco-blue mb-2">Rôle central de l'État :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>L'État utilise son budget pour influencer l'activité économique à court terme (relance, stabilisation) et à long terme (croissance, développement).</li>
                    <li>Il intervient également pour corriger les défaillances du marché et assurer des fonctions régaliennes et sociales.</li>
                  </ul>
                </div>
                <p>Le <strong className="font-semibold">budget de l'État</strong> est un document voté annuellement par le Parlement qui autorise et prévoit ces recettes et dépenses.</p>
              </>
            )}

            {activeSection === "objectifs-politique-budgetaire" && (
              <>
                <h2><TrendingUp className="inline h-6 w-6 mr-2 text-blue-500" />Objectifs de la politique budgétaire</h2>
                <p>La politique budgétaire vise traditionnellement plusieurs objectifs, souvent résumés par le "carré magique" de Kaldor (bien que ce dernier inclue aussi la balance commerciale) :</p>
                <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center"><TrendingUp className="h-5 w-5 mr-1.5"/>Stimuler la croissance économique</h4>
                    <p className="text-sm">Soutenir la demande globale, l'investissement et la production.</p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center"><Briefcase className="h-5 w-5 mr-1.5"/>Favoriser le plein-emploi</h4>
                    <p className="text-sm">Lutter contre le chômage en stimulant l'activité ou par des politiques ciblées.</p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-yellow-700 dark:text-yellow-300 mb-2 flex items-center"><ShieldCheck className="h-5 w-5 mr-1.5"/>Assurer la stabilité des prix</h4>
                    <p className="text-sm">Lutter contre l'inflation (ou la déflation) excessive.</p>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                    <h4 className="text-base font-semibold text-red-700 dark:text-red-300 mb-2 flex items-center"><Users className="h-5 w-5 mr-1.5"/>Réduire les inégalités (redistribution)</h4>
                    <p className="text-sm">Modifier la répartition des revenus et des richesses par les impôts et les transferts sociaux.</p>
                  </div>
                </div>
                <p>Ces objectifs peuvent parfois être contradictoires, obligeant les gouvernements à faire des arbitrages.</p>
              </>
            )}

            {activeSection === "instruments-politique-budgetaire" && (
              <>
                <h2><Briefcase className="inline h-6 w-6 mr-2 text-purple-500" />Instruments de la politique budgétaire</h2>
                <p>Les principaux leviers de la politique budgétaire sont :</p>
                <div className="my-4 p-4 border-l-4 border-purple-600 bg-purple-50 dark:bg-purple-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center"><FileOutput className="h-5 w-5 mr-1.5"/>Les dépenses publiques (G)</h4>
                  <p className="text-sm mb-1">Elles comprennent les dépenses de fonctionnement des administrations (salaires des fonctionnaires), les dépenses d'investissement public (infrastructures) et les dépenses de transfert (prestations sociales, subventions).</p>
                  <p className="text-sm">Une <strong className="font-semibold">augmentation des dépenses publiques</strong> (politique de relance) vise à stimuler la demande globale. Une <strong className="font-semibold">diminution</strong> (politique de rigueur) vise à réduire le déficit.</p>
                </div>
                <div className="my-4 p-4 border-l-4 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-indigo-700 dark:text-indigo-300 mb-2 flex items-center"><Receipt className="h-5 w-5 mr-1.5"/>Les prélèvements obligatoires (T)</h4>
                  <p className="text-sm mb-1">Ce sont les impôts (sur le revenu, sur les sociétés, TVA...) et les cotisations sociales. Ils constituent les recettes de l'État.</p>
                  <p className="text-sm">Une <strong className="font-semibold">diminution des prélèvements</strong> (politique de relance) vise à augmenter le revenu disponible des ménages et/ou les profits des entreprises pour stimuler la consommation et l'investissement. Une <strong className="font-semibold">augmentation</strong> (politique de rigueur) vise à augmenter les recettes de l'État.</p>
                </div>
                <div className="my-4 p-4 border-l-4 border-teal-600 bg-teal-50 dark:bg-teal-900/30 not-prose rounded-r-lg">
                  <h4 className="text-base font-semibold text-teal-700 dark:text-teal-300 mb-2 flex items-center"><BarChartBig className="h-5 w-5 mr-1.5"/>Le solde budgétaire</h4>
                  <p className="text-sm mb-1">C'est la différence entre les recettes (T) et les dépenses (G). Il peut être :</p>
                  <ul className="list-disc list-inside space-y-0.5 text-sm pl-4">
                    <li><strong className="font-semibold">Excédentaire :</strong> T &gt; G</li>
                    <li><strong className="font-semibold">Déficitaire :</strong> T &lt; G. Un déficit public persistant alimente la <strong className="font-semibold">dette publique</strong>.</li>
                    <li><strong className="font-semibold">À l'équilibre :</strong> T = G</li>
                  </ul>
                </div>
                <p>Une <strong className="font-semibold">politique budgétaire expansive (ou de relance)</strong> se traduit par une augmentation du déficit (ou une réduction de l'excédent). Une <strong className="font-semibold">politique budgétaire restrictive (ou de rigueur/austérité)</strong> vise à réduire le déficit.</p>
              </>
            )}

            {activeSection === "effets-politique-budgetaire" && (
              <>
                <h2><Calculator className="inline h-6 w-6 mr-2 text-orange-500" />Effets et Mécanismes de la politique budgétaire</h2>
                <div className="my-4 p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg not-prose">
                    <h4 className="text-base font-semibold text-orange-700 dark:text-orange-300 mb-2 flex items-center"><Calculator className="h-5 w-5 mr-1.5"/>Le multiplicateur keynésien</h4>
                    <p className="text-sm">Selon Keynes, une augmentation des dépenses publiques (ou une baisse des impôts) engendre une augmentation du revenu national plus que proportionnelle. Par exemple, si l'État investit 100€, cela crée 100€ de revenus qui seront en partie consommés, créant de nouveaux revenus, et ainsi de suite. L'ampleur de cet effet dépend de la propension à consommer.</p>
                </div>
                <div className="my-4 p-3 bg-red-50 dark:bg-red-900/30 rounded-lg not-prose">
                    <h4 className="text-base font-semibold text-red-700 dark:text-red-300 mb-2 flex items-center"><ZapOff className="h-5 w-5 mr-1.5"/>L'effet d'éviction (crowding-out effect)</h4>
                    <p className="text-sm">Si l'État finance son déficit par emprunt sur les marchés financiers, cela peut entraîner une hausse des taux d'intérêt. Cette hausse peut décourager l'investissement privé, réduisant ainsi l'efficacité de la relance budgétaire. L'ampleur de cet effet est débattue.</p>
                </div>
                <div className="my-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg not-prose">
                    <h4 className="text-base font-semibold text-yellow-700 dark:text-yellow-300 mb-2 flex items-center"><Scale className="h-5 w-5 mr-1.5"/>Soutenabilité de la dette publique</h4>
                    <p className="text-sm">Une accumulation de déficits publics conduit à une augmentation de la dette publique. Si la dette devient trop élevée par rapport au PIB, elle peut devenir insoutenable : les charges d'intérêt pèsent lourdement sur le budget, la confiance des investisseurs diminue, et le pays risque une crise de la dette souveraine. La soutenabilité dépend du taux de croissance, du taux d'intérêt et du solde primaire (solde budgétaire hors charges d'intérêt).</p>
                </div>
                <p>Les effets de la politique budgétaire dépendent aussi du contexte économique (sous-emploi ou plein-emploi), du degré d'ouverture de l'économie, et des anticipations des agents économiques (équivalence ricardienne).</p>
              </>
            )}

            {activeSection === "limites-contraintes" && (
              <>
                <h2><AlertTriangle className="inline h-6 w-6 mr-2 text-red-500" />Limites et Contraintes de la politique budgétaire</h2>
                <p>L'efficacité de la politique budgétaire est soumise à plusieurs limites et contraintes :</p>
                 <div className="my-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-red-700 dark:text-red-300 mb-2">Principales contraintes :</h4>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-sm">
                    <li><strong>Délais de mise en œuvre :</strong> Entre la décision politique, le vote et l'impact effectif sur l'économie, des délais importants peuvent réduire la pertinence de la politique.</li>
                    <li><strong>Contraintes extérieures :</strong> Dans une économie ouverte, une partie de la relance peut "fuir" à l'étranger via les importations. Les engagements internationaux (ex: Pacte de Stabilité et de Croissance en Europe limitant le déficit à 3% du PIB et la dette à 60% du PIB) peuvent restreindre la marge de manœuvre.</li>
                    <li><strong>Endettement public élevé :</strong> Un fort niveau de dette limite la capacité à mener des politiques de relance et peut entraîner une défiance des marchés financiers.</li>
                    <li><strong>Anticipations des agents économiques :</strong> Si les agents anticipent une hausse future des impôts pour rembourser la dette (théorème d'équivalence ricardienne), ils peuvent épargner davantage, annulant l'effet de la relance.</li>
                    <li><strong>Chocs externes :</strong> Des événements imprévus (crises financières, pandémies, guerres) peuvent rendre les politiques inopérantes ou nécessiter des ajustements massifs.</li>
                  </ul>
                </div>
                <p>Ces contraintes expliquent pourquoi les gouvernements doivent souvent jongler entre objectifs de court terme (soutien à l'activité) et de long terme (soutenabilité des finances publiques).</p>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className="inline h-6 w-6 mr-2 text-eco-blue" />Conclusion</h2>
                <p>La politique budgétaire est un outil essentiel dont disposent les gouvernements pour orienter l'économie. Elle permet d'agir sur la croissance, l'emploi, l'inflation et la redistribution, mais son efficacité est sujette à débat et dépend de nombreux facteurs, notamment les instruments utilisés, le contexte économique et les contraintes qui pèsent sur les finances publiques.</p>
                <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg not-prose">
                  <h4 className="text-base font-semibold text-eco-blue mb-2">Points clés à retenir :</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-sm">
                    <li>La politique budgétaire joue sur les dépenses publiques et les prélèvements obligatoires.</li>
                    <li>Ses objectifs principaux sont la croissance, l'emploi, la stabilité des prix et la redistribution.</li>
                    <li>Le multiplicateur keynésien et l'effet d'éviction sont deux mécanismes clés analysant ses impacts.</li>
                    <li>Elle est limitée par les délais, les contraintes extérieures (notamment européennes), l'endettement et les anticipations des agents.</li>
                  </ul>
                </div>
                <p>Les débats contemporains portent sur le bon dosage entre relance et rigueur, la soutenabilité des dettes publiques dans un contexte de taux d'intérêt bas puis potentiellement plus élevés, et la coordination des politiques budgétaires au niveau international, notamment au sein de la zone euro.</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Testez vos connaissances sur la politique budgétaire.</p>
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