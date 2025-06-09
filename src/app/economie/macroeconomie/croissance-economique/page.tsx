"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  ArrowLeft,
  BookMarked,
  Lightbulb,
  Info,
  ListChecks,
  BarChart3, // Pour le lien vers le graphique PIB
  HelpCircle // Pour le lien vers le quiz
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

export default function CroissanceEconomiquePage() {
  const { updateChapterProgress, getChapterProgress, formatTime } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeSection, setActiveSection] = useState("intro");
  const chapterId = "croissance-economique"; // Identifiant unique pour ce chapitre
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
    { id: "definition-mesure", title: "Définition et Mesure" },
    { id: "sources", title: "Sources de la Croissance" },
    { id: "theories", title: "Théories de la Croissance" },
    { id: "fluctuations", title: "Croissance et Fluctuations" },
    { id: "developpement-durable", title: "Croissance et Développement Durable" },
    { id: "conclusion", title: "Conclusion" },
  ];

  const sectionMap = {
    intro: { icon: <Info className="h-5 w-5 mr-1 text-eco-blue" />, label: "Introduction" },
    "definition-mesure": { icon: <Lightbulb className="h-5 w-5 mr-1 text-yellow-400" />, label: "Définition & Mesure" },
    sources: { icon: <Lightbulb className="h-5 w-5 mr-1 text-green-500" />, label: "Sources" },
    theories: { icon: <Lightbulb className="h-5 w-5 mr-1 text-purple-500" />, label: "Théories" },
    fluctuations: { icon: <Lightbulb className="h-5 w-5 mr-1 text-pink-500" />, label: "Fluctuations" },
    "developpement-durable": { icon: <Lightbulb className="h-5 w-5 mr-1 text-teal-500" />, label: "Développement Durable" },
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
              <TrendingUp className="mr-2 h-8 w-8 text-eco-blue" />
              La croissance économique
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Comprendre ce qu'est la croissance économique, comment elle est mesurée, ses déterminants et ses enjeux.
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
                  La croissance économique est l'augmentation soutenue, sur une longue période, de la production de biens et services dans un pays. C'est un objectif majeur pour la plupart des économies car elle est souvent associée à une amélioration du niveau de vie, à la création d'emplois et à une augmentation des recettes pour l'État.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 my-4">
                  <strong>Pourquoi s'intéresser à la croissance ?</strong>
                  <ul className="mt-2">
                    <li>Amélioration du niveau de vie moyen.</li>
                    <li>Création d'emplois et réduction du chômage.</li>
                    <li>Financement des services publics (santé, éducation).</li>
                    <li>Capacité d'innovation et de développement.</li>
                  </ul>
                </div>
                <p>
                  Cependant, la croissance soulève aussi des questions importantes, notamment sur sa mesure, ses sources, sa durabilité et ses effets sur les inégalités et l'environnement. Ce chapitre explore ces différentes dimensions.
                </p>
              </>
            )}

            {activeSection === "definition-mesure" && (
              <>
                <h2><Lightbulb className="inline h-6 w-6 mr-2 text-yellow-400" />Définition et Mesure de la Croissance</h2>
                <h3>Le Produit Intérieur Brut (PIB)</h3>
                <p>
                  L'indicateur le plus couramment utilisé pour mesurer la production d'un pays est le <strong>Produit Intérieur Brut (PIB)</strong>. Il représente la valeur totale de tous les biens et services finaux produits sur le territoire d'un pays au cours d'une période donnée (généralement un an).
                </p>
                <p>Le PIB peut être calculé selon trois optiques :</p>
                <ul>
                  <li><strong>Optique production :</strong> Somme des valeurs ajoutées de toutes les unités de production résidentes + Impôts sur les produits - Subventions sur les produits. (La valeur ajoutée = Valeur de la production - Consommations intermédiaires)</li>
                  <li><strong>Optique demande :</strong> Somme des dépenses finales : Consommation finale + Formation Brute de Capital Fixe (FBCF ou investissement) + Variations de stocks + (Exportations - Importations).</li>
                  <li><strong>Optique revenus :</strong> Somme des revenus distribués : Rémunération des salariés + Excédent Brut d'Exploitation (EBE) des entreprises + Revenus mixtes + Impôts sur la production et les importations - Subventions d'exploitation.</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 my-4">
                  <strong>PIB nominal vs. PIB réel :</strong> Le PIB nominal est mesuré aux prix courants, tandis que le PIB réel est mesuré à prix constants (corrigé de l'inflation) pour refléter l'augmentation réelle des quantités produites. Le taux de croissance économique est généralement calculé à partir du PIB réel.
                </div>
                
                <h3>Les limites du PIB</h3>
                <p>
                  Bien qu'utile, le PIB présente plusieurs limites en tant qu'indicateur de richesse et de bien-être :
                </p>
                <ul>
                  <li><strong>Ne mesure pas le bien-être :</strong> Une catastrophe naturelle peut augmenter le PIB (reconstruction), mais diminue le bien-être.</li>
                  <li><strong>Ignore le travail domestique et le bénévolat :</strong> Activités non marchandes importantes ne sont pas comptabilisées.</li>
                  <li><strong>Ne tient pas compte des externalités négatives :</strong> La pollution ou l'épuisement des ressources ne sont pas déduits.</li>
                  <li><strong>Ne dit rien sur la répartition des revenus :</strong> Une forte croissance peut s'accompagner d'une augmentation des inégalités.</li>
                  <li><strong>Prend mal en compte l'amélioration de la qualité des biens et services.</strong></li>
                </ul>
                <p>Face à ces limites, d'autres indicateurs ont été développés, comme l'Indice de Développement Humain (IDH), l'Empreinte Écologique, ou le Bonheur National Brut (BNB).</p>
              </>
            )}

            {activeSection === "sources" && (
              <>
                <h2><Lightbulb className="inline h-6 w-6 mr-2 text-green-500" />Les Sources de la Croissance</h2>
                <p>La croissance économique peut provenir de deux sources principales : l'augmentation de la quantité des facteurs de production utilisés et l'amélioration de leur efficacité (productivité).</p>
                
                <h3>Augmentation des facteurs de production (Croissance extensive)</h3>
                <ul>
                  <li>
                    <strong>Facteur travail :</strong> Augmentation de la population active, du taux d'emploi, de la durée du travail. La qualité du travail (capital humain), via l'éducation et la formation, est aussi cruciale.
                  </li>
                  <li>
                    <strong>Facteur capital (ou capital physique) :</strong> Accumulation de capital fixe (machines, bâtiments, infrastructures) grâce à l'investissement (Formation Brute de Capital Fixe - FBCF). Le progrès technique incorporé dans le capital est un moteur essentiel.
                  </li>
                </ul>

                <h3>Amélioration de la Productivité Globale des Facteurs (PGF) (Croissance intensive)</h3>
                <p>
                  La <strong>Productivité Globale des Facteurs (PGF)</strong> mesure l'efficacité avec laquelle les facteurs de production (travail et capital) sont combinés pour produire. C'est la part de la croissance qui n'est pas expliquée par l'augmentation de la quantité de ces facteurs. Elle reflète principalement le <strong>progrès technique</strong>.
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 my-4">
                  <strong>Sources de la PGF :</strong>
                  <ul className="mt-2">
                    <li><strong>Progrès technique :</strong> Innovations de produits, de procédés, organisationnelles.</li>
                    <li><strong>Capital humain :</strong> Niveau d'éducation, de formation et de santé de la main-d'œuvre.</li>
                    <li><strong>Organisation du travail :</strong> Taylorisme, fordisme, toyotisme, méthodes agiles, etc.</li>
                    <li><strong>Qualité des institutions :</strong> Droit de propriété, stabilité politique, efficacité de la justice, lutte contre la corruption.</li>
                    <li><strong>Infrastructures publiques :</strong> Transport, communication, énergie.</li>
                  </ul>
                </div>
                <p>La croissance intensive, basée sur la PGF, est considérée comme plus durable à long terme que la croissance extensive.</p>
              </>
            )}

            {activeSection === "theories" && (
              <>
                <h2><Lightbulb className="inline h-6 w-6 mr-2 text-purple-500" />Les Théories de la Croissance</h2>
                <p>Plusieurs théories économiques tentent d'expliquer les mécanismes de la croissance.</p>
                
                <h3>Le modèle de Solow (croissance exogène)</h3>
                <p>
                  Développé par Robert Solow (Prix Nobel 1987), ce modèle néoclassique met l'accent sur l'accumulation du capital physique.
                </p>
                <ul>
                  <li>La croissance provient de l'augmentation du stock de capital par travailleur.</li>
                  <li>En raison des rendements décroissants du capital, cette accumulation conduit à un état stationnaire où la croissance par tête s'arrête.</li>
                  <li>Seul le <strong>progrès technique</strong>, considéré comme <strong>exogène</strong> (tombé du ciel), peut permettre une croissance continue du revenu par tête à long terme.</li>
                  <li>Ce modèle prédit une convergence des niveaux de vie entre pays riches et pauvres (si le progrès technique se diffuse).</li>
                </ul>

                <h3>Les théories de la croissance endogène</h3>
                <p>
                  Apparues dans les années 1980 (Paul Romer, Robert Lucas, Robert Barro), ces théories cherchent à expliquer l'origine du progrès technique, le rendant <strong>endogène</strong> au système économique.
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 my-4">
                  <strong>Principaux moteurs de la croissance endogène :</strong>
                  <ul className="mt-2">
                    <li><strong>Capital humain (Lucas) :</strong> L'investissement dans l'éducation et la formation augmente la productivité et la capacité d'innovation.</li>
                    <li><strong>Recherche et Développement (R&D) (Romer) :</strong> Les dépenses en R&D génèrent des innovations qui sont des biens publics (non-rivals) et stimulent la croissance.</li>
                    <li><strong>Capital public (Barro) :</strong> Les infrastructures publiques (routes, communication) et un cadre institutionnel stable favorisent l'investissement privé et la productivité.</li>
                    <li><strong>Apprentissage par la pratique (learning by doing).</strong></li>
                  </ul>
                </div>
                <p>
                  Contrairement au modèle de Solow, les théories de la croissance endogène n'impliquent pas nécessairement une convergence des économies. Les pays qui investissent davantage dans ces moteurs peuvent connaître une croissance durablement plus élevée.
                </p>
              </>
            )}

            {activeSection === "fluctuations" && (
              <>
                <h2><Lightbulb className="inline h-6 w-6 mr-2 text-pink-500" />Croissance et Fluctuations Économiques</h2>
                <p>
                  La croissance économique n'est pas un processus linéaire et régulier. Elle est sujette à des <strong>fluctuations</strong>, c'est-à-dire des variations à court et moyen terme du rythme de la croissance autour de sa tendance de long terme.
                </p>
                <p>
                  Ces fluctuations dessinent des <strong>cycles économiques</strong> caractérisés par plusieurs phases :
                </p>
                <ul>
                  <li><strong>Expansion :</strong> Période de croissance forte, augmentation de l'investissement, de l'emploi et de la consommation.</li>
                  <li><strong>Crise (ou pic) :</strong> Point de retournement où la croissance ralentit brutalement.</li>
                  <li><strong>Récession :</strong> Période de croissance faible ou négative (techniquement, au moins deux trimestres consécutifs de baisse du PIB). Le chômage augmente.</li>
                  <li><strong>Reprise (ou creux) :</strong> Point où l'activité économique recommence à croître.</li>
                </ul>
                <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4 my-4">
                  Les chocs d'offre (ex: choc pétrolier), les chocs de demande (ex: crise financière), les politiques économiques ou encore les cycles d'innovation peuvent expliquer ces fluctuations. L'étude détaillée des fluctuations fera l'objet du chapitre suivant.
                </div>
              </>
            )}
            
            {activeSection === "developpement-durable" && (
              <>
                <h2><Lightbulb className="inline h-6 w-6 mr-2 text-teal-500" />Croissance et Développement Durable</h2>
                <p>
                  La poursuite de la croissance économique soulève des défis majeurs en termes de <strong>développement durable</strong>, c'est-à-dire un développement qui répond aux besoins du présent sans compromettre la capacité des générations futures à répondre aux leurs.
                </p>
                <h3>Les défis environnementaux</h3>
                <ul>
                  <li><strong>Épuisement des ressources naturelles :</strong> La croissance intensive en ressources (matières premières, énergie fossile) menace leur disponibilité future.</li>
                  <li><strong>Pollution et dégradation de l'environnement :</strong> Émissions de gaz à effet de serre, changement climatique, perte de biodiversité, pollution de l'eau et de l'air.</li>
                </ul>
                <h3>Vers une croissance soutenable ?</h3>
                <p>
                  Le débat porte sur la possibilité de concilier croissance économique et préservation de l'environnement.
                </p>
                <ul>
                  <li><strong>Soutenabilité faible :</strong> Suppose que le capital naturel (ressources) peut être substitué par du capital physique ou humain. Le progrès technique permettrait de surmonter les limites environnementales.</li>
                  <li><strong>Soutenabilité forte :</strong> Considère que le capital naturel est critique et non substituable au-delà d'un certain seuil. La préservation de l'environnement est une condition préalable à la croissance.</li>
                </ul>
                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4 my-4">
                  <strong>Pistes pour une croissance plus durable :</strong>
                  <ul className="mt-2">
                    <li><strong>Croissance verte :</strong> Vise à découpler la croissance de l'utilisation des ressources et des impacts environnementaux, grâce aux technologies vertes, à l'efficacité énergétique, aux énergies renouvelables.</li>
                    <li><strong>Économie circulaire :</strong> Réduire, réutiliser, recycler pour minimiser les déchets et l'extraction de nouvelles ressources.</li>
                    <li><strong>Politiques environnementales :</strong> Taxes carbones, subventions aux énergies vertes, réglementations.</li>
                  </ul>
                </div>
                <p>Certains économistes plaident même pour la "décroissance" dans les pays riches, arguant que la croissance continue est incompatible avec les limites planétaires.</p>
              </>
            )}

            {activeSection === "conclusion" && (
              <>
                <h2><ListChecks className="inline h-6 w-6 mr-2 text-eco-blue" />Conclusion</h2>
                <p>
                  La croissance économique, mesurée principalement par le PIB, est un phénomène complexe influencé par l'accumulation des facteurs de production et surtout par le progrès technique. Les théories de la croissance endogène soulignent l'importance des investissements dans le capital humain, la R&D et les infrastructures.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 my-4">
                  <strong>Points clés à retenir :</strong>
                  <ul className="mt-2">
                    <li>Le PIB est l'indicateur principal de la croissance, mais il a des limites.</li>
                    <li>La croissance provient de l'augmentation des facteurs (travail, capital) et de la PGF (progrès technique).</li>
                    <li>Les théories endogènes expliquent comment le progrès technique est généré.</li>
                    <li>La croissance n'est pas linéaire et connaît des fluctuations.</li>
                    <li>La soutenabilité de la croissance face aux enjeux environnementaux est un défi majeur.</li>
                  </ul>
                </div>
                <p>
                  Si la croissance a permis d'améliorer considérablement les niveaux de vie, elle doit aujourd'hui être repensée pour être plus inclusive et respectueuse de l'environnement. Les politiques économiques jouent un rôle crucial pour orienter la croissance vers un modèle plus durable.
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
                  Testez vos connaissances sur la croissance économique.
                </p>
                <Link
                  href="/quiz/economie/croissance-economique"
                  className="text-sm text-white bg-eco-blue px-3 py-1.5 rounded inline-flex items-center hover:bg-blue-700 transition-colors"
                >
                  Faire le quiz
                  <ArrowLeft className="h-3.5 w-3.5 ml-1 rotate-180" />
                </Link>
              </div>

              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-medium text-yellow-700 dark:text-yellow-300 mb-1 flex items-center"><BarChart3 className="h-5 w-5 mr-1.5"/>Graphique interactif</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Visualisez l'évolution du PIB et de la croissance.
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
                  <li>PIB (Produit Intérieur Brut)</li>
                  <li>Taux de croissance</li>
                  <li>Facteurs de production</li>
                  <li>Productivité Globale des Facteurs (PGF)</li>
                  <li>Croissance exogène (Solow)</li>
                  <li>Croissance endogène</li>
                  <li>Développement durable</li>
                </ul>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-1">Chapitres liés</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <Link href="/economie/macroeconomie/fluctuations-economiques" className="text-eco-blue hover:underline">
                      Les fluctuations économiques
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