"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, BookCopy, CheckCircle, ExternalLink, FileText } from "lucide-react";
import { useState } from "react";

const chapterTitle = "Normes et déviance";
const moduleTitle = "Contrôle social et déviance";
const moduleSlug = "controle-social-deviance";
const chapterSlug = "normes-deviance";
const subject = "sociologie";
const accentColor = "socio-purple";

export default function NormesDeviancePage() {
  const [activeSection, setActiveSection] = useState("introduction");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm mb-6 flex items-center text-gray-600 dark:text-gray-400"
      >
        <Link href="/sociologie" className="hover:text-socio-purple transition-colors">Sociologie</Link>
        <span className="mx-2">/</span>
        <Link href={`/sociologie/${moduleSlug}`} className="hover:text-socio-purple transition-colors">{moduleTitle}</Link>
        <span className="mx-2">/</span>
        <span className="text-socio-purple font-medium">{chapterTitle}</span>
      </motion.div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <BookCopy className="mr-3 h-8 w-8 text-socio-purple" />
          {chapterTitle}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Comprendre les normes sociales et les mécanismes de déviance dans nos sociétés.
        </p>
      </motion.header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation latérale */}
        <motion.aside 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-64 flex-shrink-0"
        >
          <div className="sticky top-24">
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Sommaire</h3>
            <nav className="space-y-1">
              {["introduction", "definition", "fonction", "effets", "exemples", "conclusion"].map((section, index) => {
                const sectionTitles: {[key: string]: string} = {
                  introduction: "Introduction",
                  definition: "Définition des normes sociales",
                  fonction: "Fonction et construction des normes",
                  effets: "Sanctions et déviance",
                  exemples: "Exemples concrets",
                  conclusion: "Conclusion"
                };
                
                return (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === section
                        ? "bg-socio-purple/10 text-socio-purple"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {sectionTitles[section]}
                  </button>
                );
              })}
            </nav>
            
            <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
              <h4 className="font-semibold text-socio-purple mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" /> Points clés à retenir
              </h4>
              <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Les normes sociales sont des règles qui régissent le comportement</li>
                <li>• La déviance est un écart par rapport aux normes sociales</li>
                <li>• Les normes varient selon les contextes culturels et historiques</li>
                <li>• La déviance est relative et socialement construite</li>
                <li>• La sanction peut être formelle ou informelle</li>
              </ul>
            </div>
          </div>
        </motion.aside>

        {/* Contenu principal */}
        <motion.article
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sm:p-8"
        >
          {activeSection === "introduction" && (
            <motion.section variants={itemVariants} className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
              <p>
                Toute société repose sur un ensemble de règles, explicites ou implicites, qui définissent les comportements attendus de ses membres. Ces règles, que nous appelons normes sociales, constituent le fondement même de la vie en collectivité. Elles permettent aux individus de savoir comment se comporter dans différentes situations, facilitant ainsi les interactions sociales.
              </p>
              <p>
                Cependant, ces normes ne sont pas toujours respectées. Certains individus s'en écartent, volontairement ou non, donnant ainsi naissance au phénomène de déviance. Ce concept, central en sociologie, désigne tout comportement qui transgresse les normes établies dans un contexte social donné.
              </p>
              <p>
                Dans ce chapitre, nous explorerons la nature des normes sociales et de la déviance, leur construction sociale, leurs fonctions, ainsi que les mécanismes de sanction qui les accompagnent. Nous verrons également comment ces concepts varient selon les contextes culturels et historiques, soulignant ainsi leur caractère relatif.
              </p>
            </motion.section>
          )}
          
          {activeSection === "definition" && (
            <motion.section variants={itemVariants} className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Définition des normes sociales</h2>
              <p>
                Les <strong>normes sociales</strong> sont des règles qui définissent les comportements acceptables ou attendus dans un groupe ou une société. Elles constituent des modèles de conduite partagés qui orientent l'action des individus en société.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Caractéristiques des normes sociales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-300">Caractère contraignant</h4>
                  <p className="text-sm">Les normes exercent une pression sur les individus pour qu'ils s'y conforment.</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-medium mb-2 text-green-700 dark:text-green-300">Variabilité</h4>
                  <p className="text-sm">Elles varient selon les cultures, les groupes sociaux et les époques.</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h4 className="font-medium mb-2 text-amber-700 dark:text-amber-300">Intériorisation</h4>
                  <p className="text-sm">Elles sont généralement intériorisées par les individus à travers la socialisation.</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="font-medium mb-2 text-red-700 dark:text-red-300">Sanctions</h4>
                  <p className="text-sm">Leur non-respect entraîne des sanctions, formelles ou informelles.</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Types de normes</h3>
              <p>On distingue généralement plusieurs types de normes :</p>
              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type de norme</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Exemple</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="bg-blue-50 dark:bg-blue-900/10">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700 dark:text-blue-300">Normes juridiques</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Lois et règlements formalisés et sanctionnés par l'État</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Code pénal, code de la route</td>
                    </tr>
                    <tr className="bg-green-50 dark:bg-green-900/10">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700 dark:text-green-300">Normes morales</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Principes éthiques distinguant le bien du mal</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Honnêteté, respect d'autrui</td>
                    </tr>
                    <tr className="bg-pink-50 dark:bg-pink-900/10">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-pink-700 dark:text-pink-300">Normes de politesse</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Règles de savoir-vivre et d'étiquette</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Dire "bonjour", céder sa place</td>
                    </tr>
                    <tr className="bg-amber-50 dark:bg-amber-900/10">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-700 dark:text-amber-300">Normes techniques</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Standards définissant la manière correcte d'accomplir une tâche</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Normes ISO, protocoles médicaux</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">La déviance</h3>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-4 border-l-4 border-socio-purple">
                <h4 className="font-semibold text-socio-purple mb-2">Concept clé : La déviance</h4>
                <p className="text-gray-800 dark:text-gray-200">
                  La <strong>déviance</strong> désigne tout comportement qui s'écarte des normes sociales en vigueur dans un contexte donné. Howard Becker, sociologue américain, définit la déviance comme le produit d'une transaction entre un groupe social et un individu qui, aux yeux du groupe, a transgressé une norme.
                </p>
              </div>
              <p>
                Un point essentiel à retenir est que la déviance est toujours relative : un comportement considéré comme déviant dans un contexte peut être parfaitement normal dans un autre. Par exemple, boire de l'alcool peut être déviant dans certaines sociétés musulmanes mais accepté dans les sociétés occidentales.
              </p>
            </motion.section>
          )}
          
          {activeSection === "fonction" && (
            <motion.section variants={itemVariants} className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Fonction et construction des normes</h2>
              
              <h3 className="text-xl font-semibold mb-3">Fonctions des normes sociales</h3>
              <p>Les normes sociales remplissent plusieurs fonctions essentielles dans la société :</p>
              <ul>
                <li><strong>Réguler les interactions</strong> : Elles fournissent des cadres qui facilitent les interactions sociales en rendant les comportements prévisibles.</li>
                <li><strong>Maintenir la cohésion sociale</strong> : Elles créent un sentiment d'appartenance et d'identité commune.</li>
                <li><strong>Réduire l'incertitude</strong> : Elles diminuent l'anxiété liée aux interactions en indiquant comment se comporter.</li>
                <li><strong>Organiser la vie collective</strong> : Elles permettent la coordination des actions individuelles.</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Construction sociale des normes</h3>
              <p>
                Les normes ne sont pas des données naturelles mais des constructions sociales qui émergent à travers des processus complexes :
              </p>
              <ul>
                <li><strong>Institutionnalisation</strong> : Processus par lequel les pratiques deviennent des routines institutionnalisées.</li>
                <li><strong>Légitimation</strong> : Justification des normes par des systèmes de valeurs ou des idéologies.</li>
                <li><strong>Diffusion</strong> : Propagation des normes à travers les interactions sociales et les médias.</li>
                <li><strong>Renforcement</strong> : Consolidation des normes par des sanctions positives ou négatives.</li>
              </ul>
              
              <p>
                Selon Pierre Bourdieu, les normes dominantes reflètent souvent les intérêts des groupes dominants dans la société. Les rapports de pouvoir jouent donc un rôle crucial dans l'établissement et le maintien des normes sociales.
              </p>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mt-6">
                <h4 className="font-semibold text-socio-purple">L'approche de Durkheim</h4>
                <p className="text-sm">
                  Pour Émile Durkheim, les normes sociales constituent le "fait social" par excellence. Elles sont extérieures aux individus, s'imposent à eux et sont générales dans une société donnée. Durkheim considère que les normes sont essentielles au maintien de la solidarité sociale, qu'elle soit mécanique (basée sur la similitude) ou organique (basée sur la complémentarité).
                </p>
              </div>
            </motion.section>
          )}
          
          {activeSection === "effets" && (
            <motion.section variants={itemVariants} className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sanctions et déviance</h2>
              
              <h3 className="text-xl font-semibold mb-3">Les mécanismes de sanction</h3>
              <p>
                Le non-respect des normes sociales entraîne généralement des sanctions, qui peuvent prendre différentes formes :
              </p>
              <ul>
                <li><strong>Sanctions formelles</strong> : Punitions institutionnalisées et codifiées (amendes, peines de prison, etc.).</li>
                <li><strong>Sanctions informelles</strong> : Réactions sociales non institutionnalisées (moqueries, exclusion, regards désapprobateurs, etc.).</li>
                <li><strong>Sanctions positives</strong> : Récompenses pour la conformité aux normes (reconnaissance, promotion sociale, etc.).</li>
                <li><strong>Sanctions négatives</strong> : Punitions pour la déviance (blâme, stigmatisation, etc.).</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Les théories de la déviance</h3>
              <p>
                La sociologie a développé plusieurs théories pour expliquer la déviance :
              </p>
              
              <div className="mb-6 p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-semibold mb-3 text-indigo-700 dark:text-indigo-300 flex items-center">
                  <span className="flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-indigo-200 dark:bg-indigo-700 text-indigo-700 dark:text-indigo-200 text-sm">1</span>
                  La théorie de l'étiquetage (Howard Becker)
                </h4>
                <p className="text-gray-800 dark:text-gray-200">
                  Selon cette approche, la déviance n'est pas une qualité inhérente à un acte mais le résultat d'un processus d'étiquetage. Un individu devient déviant lorsque son comportement est étiqueté comme tel par les autres. Cette théorie souligne le rôle des entrepreneurs de morale dans la définition de ce qui est considéré comme déviant.
                </p>
              </div>
              
              <div className="mb-6 p-5 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                <h4 className="font-semibold mb-3 text-teal-700 dark:text-teal-300 flex items-center">
                  <span className="flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-teal-200 dark:bg-teal-700 text-teal-700 dark:text-teal-200 text-sm">2</span>
                  La théorie de l'anomie (Robert K. Merton)
                </h4>
                <p className="text-gray-800 dark:text-gray-200">
                  Merton explique la déviance comme le résultat d'un décalage entre les buts valorisés par la société (comme la réussite matérielle) et les moyens légitimes disponibles pour les atteindre. Face à cette tension, les individus peuvent adopter différentes stratégies d'adaptation, dont certaines sont déviantes.
                </p>
              </div>
              
              <div className="mb-6 p-5 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold mb-3 text-amber-700 dark:text-amber-300 flex items-center">
                  <span className="flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-amber-200 dark:bg-amber-700 text-amber-700 dark:text-amber-200 text-sm">3</span>
                  Les théories du contrôle social (Travis Hirschi)
                </h4>
                <p className="text-gray-800 dark:text-gray-200">
                  Ces théories considèrent que tous les individus sont potentiellement déviants et que c'est l'attachement aux normes et aux institutions sociales qui prévient la déviance. Plus un individu est intégré socialement, moins il est susceptible d'adopter des comportements déviants.
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mt-6">
                <h4 className="font-semibold text-socio-purple">La stigmatisation</h4>
                <p className="text-sm">
                  Erving Goffman a analysé le processus de stigmatisation, par lequel un individu déviant se voit attribuer une identité négative qui peut devenir prépondérante dans ses interactions sociales. Le stigmate devient alors un "statut principal" qui éclipse les autres caractéristiques de l'individu et peut conduire à une "carrière déviante".
                </p>
              </div>
            </motion.section>
          )}
          
          {activeSection === "exemples" && (
            <motion.section variants={itemVariants} className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Exemples concrets</h2>
              
              <h3 className="text-xl font-semibold mb-3">Variation historique et culturelle des normes</h3>
              <p>
                Les normes sociales varient considérablement selon les époques et les cultures :
              </p>
              <ul>
                <li>
                  <strong>Le tatouage</strong> : Longtemps associé à la marginalité en Occident, il est aujourd'hui largement accepté. Dans certaines cultures polynésiennes, il a toujours eu une valeur rituelle et sociale positive.
                </li>
                <li>
                  <strong>Le tabagisme</strong> : Considéré comme chic et sophistiqué dans les années 1950, il est aujourd'hui stigmatisé dans de nombreux pays occidentaux.
                </li>
                <li>
                  <strong>L'homosexualité</strong> : Condamnée pénalement pendant des siècles en Europe, elle est aujourd'hui légalement acceptée dans de nombreux pays, bien que la tolérance sociale varie encore considérablement.
                </li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Études de cas</h3>
              
              <h4 className="font-semibold mt-4 mb-2">Cas 1 : Le mouvement #MeToo et l'évolution des normes</h4>
              <p>
                Le mouvement #MeToo illustre comment des comportements longtemps tolérés (certaines formes de harcèlement sexuel) peuvent devenir fortement réprouvés suite à une mobilisation sociale. Ce cas montre la dynamique de changement des normes et le rôle des mouvements sociaux dans ce processus.
              </p>
              
              <h4 className="font-semibold mt-4 mb-2">Cas 2 : Les drogues et la relativité de la déviance</h4>
              <p>
                La consommation de cannabis est considérée comme déviante et illégale dans certains pays, tandis qu'elle est légalisée et normalisée dans d'autres. De même, l'alcool est licite dans la plupart des sociétés occidentales mais interdit dans certains pays musulmans. Ces exemples illustrent la relativité culturelle et légale de la déviance.
              </p>
              
              <h4 className="font-semibold mt-4 mb-2">Cas 3 : Les infractions routières et la conformité sélective</h4>
              <p>
                De nombreux conducteurs qui respectent généralement la loi enfreignent régulièrement les limitations de vitesse. Ce phénomène de "déviance ordinaire" montre que les individus peuvent adhérer à certaines normes tout en en transgressant d'autres, illustrant ainsi la complexité de la conformité sociale.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-6">
                <h4 className="font-semibold">Application au BAC</h4>
                <p className="text-sm">
                  Pour le baccalauréat, vous devez être capable d'analyser des situations concrètes en mobilisant les concepts de norme, déviance, sanction et stigmatisation. Vous devez également comprendre le caractère relatif et construit des normes sociales, ainsi que les différentes théories explicatives de la déviance.
                </p>
              </div>
            </motion.section>
          )}
          
          {activeSection === "conclusion" && (
            <motion.section variants={itemVariants} className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conclusion</h2>
              <p>
                L'étude des normes sociales et de la déviance nous révèle le caractère profondément social de comportements souvent perçus comme naturels ou individuels. Les normes ne sont pas des données immuables mais des constructions sociales qui évoluent en fonction des contextes historiques, culturels et des rapports de pouvoir.
              </p>
              <p>
                La déviance, quant à elle, n'est pas une qualité intrinsèque de certains actes mais le résultat d'un processus d'étiquetage social. Ce qui est considéré comme déviant varie considérablement selon les sociétés et les époques, soulignant ainsi la relativité des jugements moraux et sociaux.
              </p>
              <p>
                Les mécanismes de sanction, formels ou informels, jouent un rôle crucial dans le maintien des normes sociales, mais ils peuvent aussi contribuer à la stigmatisation des individus déviants et à leur engagement dans des "carrières déviantes".
              </p>
              <p>
                Comprendre ces dynamiques nous permet de porter un regard plus nuancé sur les comportements sociaux et de questionner les processus par lesquels certains groupes ou comportements sont marginalisés ou stigmatisés. Cette réflexion critique est essentielle pour appréhender les enjeux de justice sociale et d'inclusion dans nos sociétés contemporaines.
              </p>
              
              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-xl font-semibold mb-4">Pour aller plus loin</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="flex items-center text-socio-purple hover:underline">
                      <FileText className="h-4 w-4 mr-2" />
                      Fiche de révision - Normes et déviance
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-socio-purple hover:underline">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Glossaire des concepts clés
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-socio-purple hover:underline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Howard S. Becker, <em>Outsiders : Études de sociologie de la déviance</em>
                    </a>
                  </li>
                </ul>
              </div>
            </motion.section>
          )}
          
          <div className="mt-8 flex justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
            <Link
              href={`/sociologie/${moduleSlug}`}
              className="text-socio-purple hover:text-socio-purple/80 transition-colors flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour au module
            </Link>
            <Link
              href={`/quiz/sociologie/${moduleSlug}/${chapterSlug}`}
              className="bg-socio-purple hover:bg-socio-purple/90 text-white px-4 py-2 rounded-md transition-colors flex items-center"
            >
              Tester mes connaissances
              <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
            </Link>
          </div>
        </motion.article>
      </div>
    </div>
  );
}