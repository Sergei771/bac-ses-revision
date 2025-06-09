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
  BarChart3, // Pour le lien vers le graphique PIB
  HelpCircle, // Pour le lien vers le quiz
  Activity // Icon for fluctuations
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

export default function FluctuationsEconomiquesPage() {
  const { updateChapterProgress, getChapterProgress, formatTime } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeSection, setActiveSection] = useState("intro");
  const chapterId = "fluctuations"; // Identifiant unique pour ce chapitre
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!mounted) return;
    intervalRef.current = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (mounted && timeSpent > 0) {
        const progress = getChapterProgress("economie", chapterId);
        updateChapterProgress("economie", chapterId, {
          timeSpent: (progress?.timeSpent || 0) + timeSpent
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
    const progress = getChapterProgress("economie", chapterId);
    if (progress) {
      setIsCompleted(progress.completed);
    }
  }, [getChapterProgress, chapterId]);

  const handleMarkAsCompleted = () => {
    updateChapterProgress("economie", chapterId, {
      completed: !isCompleted
    });
    setIsCompleted(!isCompleted);
  };

  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "definition-cycles", title: "Définition et Cycles" },
    { id: "causes", title: "Causes des Fluctuations" },
    { id: "consequences", title: "Conséquences" },
    { id: "mesure-indicateurs", title: "Mesure et Indicateurs" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionMap = {
    intro: { icon: <Info className="h-5 w-5 mr-1 text-eco-blue" />, label: "Introduction" },
    "definition-cycles": { icon: <Activity className="h-5 w-5 mr-1 text-orange-500" />, label: "Définition & Cycles" },
    causes: { icon: <Lightbulb className="h-5 w-5 mr-1 text-green-500" />, label: "Causes" },
    consequences: { icon: <Lightbulb className="h-5 w-5 mr-1 text-red-500" />, label: "Conséquences" },
    "mesure-indicateurs": { icon: <BarChart3 className="h-5 w-5 mr-1 text-purple-500" />, label: "Mesure & Indicateurs" },
    conclusion: { icon: <ListChecks className="h-5 w-5 mr-1 text-eco-blue" />, label: "Conclusion" },
  } as const;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/economie/macroeconomie" 
          className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour à la macroéconomie
        </Link>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <Activity className="mr-2 h-8 w-8 text-eco-blue" />
              Les fluctuations économiques
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Comprendre la nature, les causes et les conséquences des cycles et fluctuations économiques.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="h-5 w-5 mr-1" />
              <span>Temps: {formatTime(timeSpent)}</span>
            </div>
            
            <button
              onClick={handleMarkAsCompleted}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isCompleted
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              <CheckCircle className="h-5 w-5 mr-1" />
              {isCompleted ? "Terminé" : "Marquer comme terminé"}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation des sections et Contenu */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sommaire flottant */}
        <nav className="md:w-64 w-full md:sticky md:top-24 self-start bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-8 md:mb-0 flex-shrink-0">
          <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Sommaire du chapitre</h3>
          <ul className="space-y-2 md:space-y-2 flex md:flex-col flex-row overflow-x-auto">
            {sections.map(section => (
              <li key={section.id} className="flex-1 md:flex-none">
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors text-left focus:outline-none focus:ring-2 focus:ring-eco-blue ${
                    activeSection === section.id
                      ? "bg-eco-blue text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                  aria-current={activeSection === section.id ? "page" : undefined}
                >
                  {sectionMap[section.id as keyof typeof sectionMap].icon}
                  <span className="hidden md:inline ml-2">{sectionMap[section.id as keyof typeof sectionMap].label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Contenu principal */}
        <div className="flex-1 min-w-0">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 prose dark:prose-invert max-w-none"
          >
            {activeSection === "intro" && (
              <>
                <h2><Info className="inline h-6 w-6 mr-2 text-eco-blue" />Introduction</h2>
                <p>
                  Comme nous l'avons vu dans le chapitre sur la croissance, celle-ci n'est pas un long fleuve tranquille. L'activité économique connaît des périodes d'accélération et de ralentissement : ce sont les <strong>fluctuations économiques</strong>.
                </p>
                <p>
                  Ces variations affectent l'ensemble des agents économiques (ménages, entreprises, État) et sont au cœur des préoccupations des politiques économiques. Comprendre leur nature, leurs causes et leurs conséquences est donc essentiel.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 my-4">
                  <strong>Pourquoi étudier les fluctuations ?</strong>
                  <ul className="mt-2">
                    <li>Anticiper les retournements de conjoncture.</li>
                    <li>Comprendre l'origine des crises économiques.</li>
                    <li>Adapter les politiques économiques pour stabiliser l'activité (voir chapitre dédié).</li>
                    <li>Analyser l'impact sur l'emploi, l'inflation, et le bien-être.</li>
                  </ul>
                </div>
              </>
            )}

            {activeSection === "definition-cycles" && (
              <>
                <h2><Activity className="inline h-6 w-6 mr-2 text-orange-500" />Définition et Cycles Économiques</h2>
                <p>
                  Les <strong>fluctuations économiques</strong> désignent l'ensemble des mouvements de l'activité économique (mesurée par le PIB réel le plus souvent) autour de sa tendance de long terme (croissance potentielle). Lorsque ces fluctuations se répètent avec une certaine régularité, on parle de <strong>cycles économiques</strong>.
                </p>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 my-4">
                  <p><strong>Fluctuations vs. Cycles :</strong></p>
                  <ul className="mt-2 list-disc list-inside">
                    <li><strong>Fluctuations :</strong> Variations de court terme, parfois erratiques.</li>
                    <li><strong>Cycles :</strong> Fluctuations qui présentent une certaine périodicité, avec des phases qui se succèdent.</li>
                  </ul>
                  <p className="mt-2">La croissance potentielle est le niveau de production qu'un pays peut atteindre en utilisant pleinement et efficacement ses facteurs de production, sans tensions inflationnistes.</p>
                </div>

                <h3>Les phases du cycle économique classique</h3>
                <p>Un cycle économique typique se décompose en quatre phases principales :</p>
                <ol>
                  <li><strong>Expansion :</strong> Période de croissance du PIB réel. L'investissement, la consommation et l'emploi augmentent. L'inflation peut apparaître en fin de phase. Les entreprises sont optimistes et embauchent.</li>
                  <li><strong>Crise (ou pic / sommet) :</strong> Point de retournement où l'activité économique atteint son maximum et commence à décliner. Souvent marqué par une saturation de la demande ou des tensions sur les capacités de production.</li>
                  <li><strong>Récession (ou contraction) :</strong> Période de baisse de l'activité économique. Le PIB diminue (techniquement, au moins deux trimestres consécutifs de baisse du PIB), le chômage augmente, l'investissement chute. Si la récession est profonde et durable, on parle de <strong>dépression</strong>. Les entreprises deviennent pessimistes et réduisent leurs effectifs.</li>
                  <li><strong>Reprise (ou creux / plancher) :</strong> Point de retournement inférieur où l'activité économique atteint son minimum et commence à remonter. La confiance revient progressivement.</li>
                </ol>
                
                {/* Image supprimée et sa légende */}
                <p className="my-4">Ces phases ne sont pas toujours de durée égale et leur intensité peut varier considérablement d'un cycle à l'autre.</p>
                
                <h3>Différents types de cycles</h3>
                <p>Les économistes ont identifié plusieurs types de cycles selon leur durée et leurs causes supposées :</p>
                <ul>
                  <li><strong>Cycles de Kitchin (courts) :</strong> 3-5 ans. Souvent expliqués par la gestion des stocks des entreprises.
                    <div className="text-sm bg-gray-50 dark:bg-gray-700 p-2 mt-1 rounded">
                      <em>Exemple :</em> Une entreprise anticipe une forte demande et augmente sa production et ses stocks. Si la demande est plus faible que prévu, elle réduit sa production pour écouler les stocks excédentaires, créant un cycle court.
                    </div>
                  </li>
                  <li><strong>Cycles de Juglar (ou cycles des affaires) :</strong> 7-11 ans. Principalement liés aux fluctuations de l'investissement productif des entreprises.
                     <div className="text-sm bg-gray-50 dark:bg-gray-700 p-2 mt-1 rounded">
                      <em>Exemple :</em> Une vague d'investissements dans de nouvelles machines suite à une innovation peut stimuler l'économie pendant plusieurs années (expansion). Une fois ces investissements réalisés, la demande de biens d'équipement ralentit, contribuant à un ralentissement.
                    </div>
                  </li>
                  <li><strong>Cycles de Kondratiev (longs) :</strong> 40-60 ans. Associés par des économistes comme Schumpeter aux vagues d'innovations technologiques majeures (ex: machine à vapeur, électricité, informatique) qui transforment profondément l'économie.</li>
                  <li><strong>Cycles de Kuznets (plus contestés) :</strong> 15-25 ans. Parfois liés aux investissements dans les infrastructures lourdes ou à des facteurs démographiques (ex: vagues de construction résidentielle).</li>
                </ul>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 my-4">
                  <strong>Important :</strong> La périodicité des cycles n'est pas mécanique. Les économies modernes sont complexes, ouvertes sur l'extérieur et sujettes à des chocs variés et souvent imprévisibles (pandémies, guerres, crises financières...). La notion de cycle est donc plus un cadre d'analyse qu'un outil de prédiction exact.
                </div>
              </>
            )}

            {activeSection === "causes" && (
              <>
                <h2><Lightbulb className="inline h-6 w-6 mr-2 text-green-500" />Causes des Fluctuations</h2>
                <p>Les fluctuations économiques résultent de divers <strong>chocs</strong> qui affectent l'équilibre entre l'offre globale (la production totale que les entreprises sont prêtes à offrir) et la demande globale (la dépense totale souhaitée dans l'économie).</p>
                
                <h3>Chocs de demande</h3>
                <p>Un choc de demande est un événement imprévu qui modifie l'une des composantes de la demande globale : Consommation (C), Investissement (I), Dépenses publiques (G), ou Exportations netes (X-M).</p>
                <ul>
                  <li>
                    <strong>Choc de demande positif (expansion) :</strong> Entraîne une augmentation de la demande globale.
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 my-2 rounded-lg">
                      <p><em>Exemples :</em></p>
                      <ul className="list-disc list-inside text-sm">
                        <li>Hausse soudaine de la confiance des consommateurs les incitant à dépenser plus.</li>
                        <li>Vague d'optimisme des entreprises qui augmentent leurs investissements.</li>
                        <li>Politique budgétaire expansive : augmentation des dépenses publiques (ex: grands travaux) ou baisses d'impôts.</li>
                        <li>Politique monétaire expansive : baisse des taux d'intérêt par la banque centrale, facilitant le crédit.</li>
                        <li>Forte augmentation des exportations (ex: forte demande d'un partenaire commercial).</li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <strong>Choc de demande négatif (récession) :</strong> Entraîne une diminution de la demande globale.
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 my-2 rounded-lg">
                      <p><em>Exemples :</em></p>
                      <ul className="list-disc list-inside text-sm">
                        <li>Baisse de la confiance (ex: suite à une crise sanitaire ou financière) entraînant une prudence accrue et une baisse de la consommation/investissement.</li>
                        <li>Politique budgétaire restrictive : baisse des dépenses publiques ou hausse des impôts.</li>
                        <li>Politique monétaire restrictive : hausse des taux d'intérêt.</li>
                        <li>Chute des exportations (ex: récession chez un partenaire commercial).</li>
                      </ul>
                    </div>
                  </li>
                </ul>

                <h3 className="mt-6">Chocs d'offre</h3>
                <p>Un choc d'offre est un événement imprévu qui modifie les coûts de production des entreprises et donc leur capacité ou leur volonté de produire pour un niveau de prix donné, affectant ainsi l'offre globale.</p>
                <ul>
                  <li>
                    <strong>Choc d'offre positif (expansion, baisse des prix) :</strong> Permet de produire plus et/ou à moindre coût.
                     <div className="bg-green-50 dark:bg-green-900/20 p-3 my-2 rounded-lg">
                      <p><em>Exemples :</em></p>
                      <ul className="list-disc list-inside text-sm">
                        <li>Baisse significative du prix des matières premières clés (ex: pétrole, gaz).</li>
                        <li>Innovations technologiques majeures réduisant les coûts de production ou créant de nouveaux produits.</li>
                        <li>Conditions climatiques exceptionnellement favorables pour l'agriculture.</li>
                        <li>Réformes structurelles améliorant l'efficacité du marché du travail ou la concurrence.</li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <strong>Choc d'offre négatif (récession, hausse des prix = stagflation) :</strong> Augmente les coûts de production ou réduit la capacité à produire.
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 my-2 rounded-lg">
                      <p><em>Exemples :</em></p>
                      <ul className="list-disc list-inside text-sm">
                        <li>Hausse brutale du prix des matières premières (ex: chocs pétroliers des années 1970, flambée des prix du gaz en 2022).</li>
                        <li>Catastrophes naturelles (séismes, inondations) détruisant des capacités de production.</li>
                        <li>Pandémie perturbant les chaînes d'approvisionnement mondiales.</li>
                        <li>Instauration de nouvelles réglementations environnementales ou sociales coûteuses pour les entreprises (à court terme).</li>
                        <li>Conflits sociaux importants (grèves prolongées dans des secteurs clés).</li>
                      </ul>
                    </div>
                  </li>
                </ul>
                
                <h3 className="mt-6">Autres facteurs et mécanismes de propagation</h3>
                <p>Au-delà des chocs initiaux, plusieurs facteurs peuvent amplifier ou atténuer les fluctuations :</p>
                <ul>
                  <li><strong>Facteurs financiers et monétaires :</strong> Les crises financières (krachs boursiers, crises bancaires), les bulles spéculatives et leur éclatement, les variations dans l'offre de crédit. Une crise financière peut transformer un ralentissement modéré en une récession profonde.</li>
                  <li>
                    <strong>Facteurs psychologiques (Keynes) :</strong>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 my-2 rounded-lg">
                       John Maynard Keynes a souligné l'importance des <strong>"esprits animaux"</strong> (animal spirits) des entrepreneurs : leurs vagues d'optimisme ou de pessimisme, non toujours fondées sur des calculs rationnels, influencent massivement les décisions d'investissement et peuvent être auto-réalisatrices. Un pessimisme généralisé peut freiner l'investissement même si les conditions objectives sont bonnes.
                    </div>
                  </li>
                  <li>
                    <strong>Innovations et cycles technologiques (Schumpeter) :</strong>
                     <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 my-2 rounded-lg">
                      Joseph Schumpeter a mis en lumière le rôle des <strong>"grappes d'innovations"</strong>. L'introduction d'innovations majeures (ex: machine à vapeur, internet) engendre une phase d'expansion ("destruction créatrice" où de nouvelles industries remplacent les anciennes), potentiellement suivie d'une phase de réajustement ou de saturation.
                    </div>
                  </li>
                  <li><strong>Politiques économiques :</strong> Des politiques gouvernementales (budgétaires, monétaires) peuvent être procycliques (amplifiant le cycle) ou contracycliques (atténuant le cycle). Des erreurs de politique peuvent aussi être sources de chocs.</li>
                </ul>
                 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 my-4">
                  <strong>Mécanismes de propagation :</strong>
                  <ul className="list-disc list-inside">
                    <li><strong>Le multiplicateur (Keynes) :</strong> Une variation initiale d'une composante de la demande (ex: investissement) entraîne une variation plus importante du revenu national. Par exemple, une dépense d'investissement crée des revenus, qui sont en partie consommés, créant d'autres revenus, etc.</li>
                    <li><strong>L'accélérateur :</strong> L'investissement des entreprises dépend de la variation de la demande. Une simple anticipation de ralentissement de la croissance de la demande peut entraîner une baisse de l'investissement, accélérant le ralentissement.</li>
                  </ul>
                  Ces mécanismes expliquent comment un choc initial peut avoir des effets amplifiés et durables sur l'économie.
                </div>
              </>
            )}

            {activeSection === "consequences" && (
              <>
                <h2><Lightbulb className="inline h-6 w-6 mr-2 text-red-500" />Conséquences des Fluctuations</h2>
                <p>Les fluctuations économiques ont des impacts significatifs et variés sur l'économie et la société.</p>
                
                <h4 className="font-semibold mt-4">Sur la production et la croissance :</h4>
                <p>Évidemment, la conséquence la plus directe est la variation du PIB. Les expansions apportent une augmentation de la richesse produite, tandis que les récessions signifient une contraction de cette richesse, avec des implications sur le niveau de vie potentiel.</p>

                <h4 className="font-semibold mt-4">Sur l'emploi et le chômage :</h4>
                <p>En phase d'expansion, la demande de travail augmente, les entreprises embauchent et le chômage tend à diminuer. Inversement, en récession, la baisse de l'activité conduit à des destructions d'emplois et à une hausse du chômage. Les jeunes et les travailleurs peu qualifiés sont souvent les plus touchés.</p>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 my-2 rounded-lg">
                  <strong>Loi d'Okun :</strong> Arthur Okun a mis en évidence une relation empirique (variable selon les pays et les époques) : une baisse du taux de chômage est généralement associée à une croissance du PIB réel supérieure à sa tendance de long terme. Inversement, une croissance faible ou négative se traduit par une hausse du chômage.
                </div>

                <h4 className="font-semibold mt-4">Sur l'inflation et les prix :</h4>
                <p>En phase d'expansion, une forte demande peut exercer des tensions sur les capacités de production et entraîner une hausse des prix (inflation par la demande). En fin de cycle d'expansion, le risque de surchauffe inflationniste augmente. En récession, la faiblesse de la demande peut conduire à une baisse des prix (déflation, un phénomène redouté car il peut paralyser l'investissement et la consommation) ou à un simple ralentissement de l'inflation (désinflation). Un choc d'offre négatif est particulièrement problématique car il peut causer de la stagflation (stagnation de l'activité + forte inflation).</p>
                
                <h4 className="font-semibold mt-4">Sur l'investissement :</h4>
                <p>L'investissement des entreprises est très sensible aux fluctuations (on dit qu'il est procyclique). Il augmente fortement en période d'expansion (anticipations optimistes de demande future) et chute brutalement en récession (anticipations pessimistes, surcapacités de production). Ce comportement est en partie expliqué par l'effet d'accélérateur.</p>

                <h4 className="font-semibold mt-4">Sur les finances publiques :</h4>
                <p>Les fluctuations affectent le budget de l'État. En récession, les recettes fiscales diminuent (moins de revenus taxés, moins de consommation) tandis que les dépenses sociales augmentent (indemnités chômage, aides sociales). Cela tend à creuser le déficit public et, si cela se prolonge, la dette publique.</p>

                <h4 className="font-semibold mt-4">Sur le commerce extérieur :</h4>
                <p>Les importations d'un pays sont généralement liées à son revenu national : en expansion, les importations augmentent ; en récession, elles diminuent. Les exportations dépendent de la conjoncture chez les partenaires commerciaux. Ainsi, les fluctuations peuvent influencer le solde de la balance commerciale.</p>

                <h4 className="font-semibold mt-4">Sur le bien-être social et les inégalités :</h4>
                <p>Les récessions ont souvent des coûts sociaux élevés : augmentation de la pauvreté, précarisation de l'emploi, difficultés pour les ménages endettés, impacts sur la santé physique et mentale. Elles peuvent aussi exacerber les inégalités, car les pertes de revenus et d'emplois ne sont pas uniformément réparties.</p>
                
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 my-4">
                  <strong>Conséquences asymétriques :</strong> Il est souvent observé que les pertes de bien-être et de production dues à une récession sont plus importantes et plus longues à effacer que les gains d'une expansion de même ampleur. Les "cicatrices" d'une crise (chômage de longue durée, faillites d'entreprises) peuvent persister.
                </div>
              </>
            )}
            
            {activeSection === "mesure-indicateurs" && (
              <>
                <h2><BarChart3 className="inline h-6 w-6 mr-2 text-purple-500" />Mesure et Indicateurs des Fluctuations</h2>
                <p>Pour analyser la conjoncture économique et anticiper les fluctuations, les économistes et les institutions (comme l'INSEE en France, Eurostat, les banques centrales) s'appuient sur un ensemble varié d'indicateurs :</p>
                <ul>
                  <li><strong>Le Produit Intérieur Brut (PIB) réel et son taux de variation :</strong> C'est l'indicateur de référence pour mesurer l'activité économique globale et ses variations trimestrielles ou annuelles.</li>
                  <li><strong>Les enquêtes de conjoncture :</strong> Réalisées régulièrement auprès des chefs d'entreprise (sur leurs carnets de commandes, leurs perspectives de production, leurs difficultés de recrutement, le climat des affaires général) et des ménages (sur leur confiance en l'avenir, leurs intentions d'achat de biens durables, leur perception de l'inflation). Exemples : l'indice PMI (Purchasing Managers' Index), les enquêtes de l'INSEE.</li>
                  <li><strong>Le taux de chômage et les indicateurs du marché du travail :</strong> Taux de chômage, créations/destructions d'emplois, taux d'emploi, recours au chômage partiel.</li>
                  <li><strong>L'indice des prix à la consommation (IPC) :</strong> Mesure l'évolution du niveau général des prix et donc l'inflation.</li>
                  <li><strong>La production industrielle :</strong> Un indicateur plus spécifique mais réactif aux variations de la demande.</li>
                  <li><strong>Les ventes au détail et la consommation des ménages.</strong></li>
                  <li><strong>Le taux d'utilisation des capacités de production (TRIM) :</strong> Indique si les entreprises sont en sous-capacité ou en surchauffe.</li>
                  <li>
                    <strong>Les indicateurs avancés :</strong> Ce sont des variables économiques qui ont tendance à changer avant que l'économie globale ne change de direction. Ils peuvent aider à anticiper les points de retournement du cycle.
                    <div className="text-sm bg-gray-50 dark:bg-gray-700 p-2 mt-1 rounded">
                      <em>Exemples d'indicateurs avancés :</em> Les commandes de biens d'équipement, les permis de construire, les indices boursiers, les écarts de taux d'intérêt (spreads), certains indicateurs de confiance très prospectifs.
                    </div>
                  </li>
                </ul>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 my-4">
                  <strong>Analyse des séries chronologiques :</strong> L'analyse des fluctuations implique souvent de décomposer statistiquement l'évolution d'une série économique (comme le PIB) en plusieurs composantes :
                  <ul className="list-disc list-inside mt-1">
                    <li>La <strong>tendance de long terme (trend)</strong> : la croissance potentielle.</li>
                    <li>Le <strong>cycle</strong> : les fluctuations autour de cette tendance.</li>
                    <li>Les <strong>variations saisonnières</strong> : les mouvements réguliers liés aux saisons (ex: pic d'activité avant Noël).</li>
                    <li>La <strong>composante irrégulière (ou aléatoire)</strong> : les chocs imprévus et non récurrents.</li>
                  </ul>
                </div>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className="inline h-6 w-6 mr-2 text-eco-blue" />Conclusion</h2>
                <p>
                  Les fluctuations économiques sont une caractéristique inhérente aux économies de marché. Elles résultent de l'interaction complexe de multiples chocs et mécanismes de propagation.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 my-4">
                  <strong>Points clés à retenir :</strong>
                  <ul className="mt-2">
                    <li>Les fluctuations désignent les variations de l'activité économique autour de sa tendance, formant des cycles (expansion, crise, récession, reprise).</li>
                    <li>Elles sont causées par des chocs d'offre et de demande, ainsi que par des facteurs financiers et psychologiques.</li>
                    <li>Elles ont des conséquences importantes sur le PIB, l'emploi, l'inflation et le bien-être.</li>
                    <li>Leur analyse repose sur de nombreux indicateurs conjoncturels.</li>
                  </ul>
                </div>
                <p>
                  La compréhension des fluctuations est cruciale pour les décideurs politiques qui cherchent à atténuer leur ampleur et leurs effets négatifs par des politiques de stabilisation, sujet que nous aborderons dans un prochain chapitre.
                </p>
              </>
            )}
          </motion.div>
        </div>

        {/* Sidebar */}
        <aside className="md:w-64 w-full flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:sticky md:top-24">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <BookMarked className="h-5 w-5 mr-2 text-eco-blue" />
              Ressources du chapitre
            </h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-eco-blue mb-1 flex items-center"><HelpCircle className="h-5 w-5 mr-1.5"/>Quiz associé</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Testez vos connaissances sur les fluctuations économiques.
                </p>
                <Link
                  href="/quiz/economie/fluctuations"
                  className="text-sm text-white bg-eco-blue px-3 py-1.5 rounded inline-flex items-center hover:bg-blue-700 transition-colors"
                >
                  Faire le quiz
                  <ArrowLeft className="h-3.5 w-3.5 ml-1 rotate-180" />
                </Link>
              </div>

              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-medium text-yellow-700 dark:text-yellow-300 mb-1 flex items-center"><BarChart3 className="h-5 w-5 mr-1.5"/>Graphique interactif</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Visualisez l'évolution du PIB pour observer les fluctuations.
                </p>
                <Link
                  href="/economie/graphiques/pib-croissance"
                  className="text-sm text-white bg-yellow-600 px-3 py-1.5 rounded inline-flex items-center hover:bg-yellow-700 transition-colors"
                >
                  Voir le graphique
                  <ArrowLeft className="h-3.5 w-3.5 ml-1 rotate-180" />
                </Link>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-1">Notions clés</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                  <li>Cycle économique</li>
                  <li>Expansion, Crise, Récession, Reprise</li>
                  <li>Choc d'offre / demande</li>
                  <li>Stagflation</li>
                  <li>Politiques contracycliques</li>
                  <li>Indicateurs conjoncturels</li>
                </ul>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-1">Chapitres liés</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <Link href="/economie/macroeconomie/croissance-economique" className="text-eco-blue hover:underline">
                      La croissance économique
                    </Link>
                  </li>
                   <li>
                    <Link href="/economie/macroeconomie/chomage-inflation" className="text-eco-blue hover:underline">
                      Le chômage et l'inflation
                    </Link>
                  </li>
                  <li>
                    <Link href="/economie/macroeconomie/politiques-stabilisation" className="text-eco-blue hover:underline">
                      Les politiques de stabilisation
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
} 