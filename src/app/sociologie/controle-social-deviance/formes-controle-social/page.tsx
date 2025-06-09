"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, BookCopy, CheckCircle, ExternalLink, FileText, Shield, Scale, Users, AlertTriangle } from "lucide-react";
import { useState } from "react";

const chapterTitle = "Les formes du contrôle social";
const moduleTitle = "Contrôle social et déviance";
const moduleSlug = "controle-social-deviance";
const chapterSlug = "formes-controle-social";
const subject = "sociologie";
const accentColor = "socio-purple";

export default function FormesControleSocialPage() {
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
          <Shield className="mr-3 h-8 w-8 text-socio-purple" />
          {chapterTitle}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Le contrôle social regroupe l'ensemble des moyens mis en œuvre par la société pour maintenir l'ordre social
          et assurer la conformité des comportements aux normes établies.
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
              {["introduction", "definition", "formel", "informel", "comparaison", "evolution"].map((section, index) => {
                const sectionTitles: {[key: string]: string} = {
                  introduction: "Introduction",
                  definition: "Définition du contrôle social",
                  formel: "Le contrôle social formel",
                  informel: "Le contrôle social informel",
                  comparaison: "Comparaison des formes",
                  evolution: "Évolution du contrôle social"
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
                <li>• Le contrôle social comprend des formes formelles et informelles</li>
                <li>• Le contrôle formel s'appuie sur des institutions et des sanctions codifiées</li>
                <li>• Le contrôle informel opère par la pression sociale et les interactions quotidiennes</li>
                <li>• Les deux formes sont complémentaires et essentielles à l'ordre social</li>
                <li>• Les formes évoluent avec les transformations sociales et technologiques</li>
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
                Dans toute société, le maintien de l'ordre social repose sur un ensemble de mécanismes qui visent à assurer la conformité 
                des comportements individuels aux normes établies. Ces mécanismes, regroupés sous le terme de contrôle social, 
                constituent un objet d'étude fondamental en sociologie.
              </p>
              <p>
                Le contrôle social prend des formes variées, allant des lois et règlements formels aux pressions informelles 
                exercées par les pairs et la famille. Ces différentes formes coexistent et se complètent pour réguler 
                efficacement les comportements au sein d'une société.
              </p>
              <p>
                Dans ce chapitre, nous explorerons les différentes formes que peut prendre le contrôle social, 
                en distinguant notamment le contrôle social formel et informel. Nous analyserons leurs caractéristiques, 
                leurs fonctionnements et leurs évolutions dans le contexte des sociétés contemporaines.
              </p>
            </motion.section>
          )}
          
          {activeSection === "definition" && (
            <motion.section variants={itemVariants} className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Définition du contrôle social</h2>
              <p>
                Le <strong>contrôle social</strong> désigne l'ensemble des moyens et processus par lesquels une société ou un groupe 
                régule les comportements de ses membres et assure leur conformité aux normes et valeurs établies.
              </p>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-l-4 border-socio-purple mb-6">
                <h3 className="font-semibold text-socio-purple mb-2">Concept sociologique</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Selon <strong>Émile Durkheim</strong>, le contrôle social est nécessaire à la cohésion sociale et à la 
                  stabilité de la société. Il permet d'éviter l'anomie, c'est-à-dire l'affaiblissement des normes sociales.
                </p>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Fonctions du contrôle social</h3>
              <ul>
                <li><strong>Prévention</strong> : Dissuader les individus d'adopter des comportements déviants</li>
                <li><strong>Régulation</strong> : Maintenir l'ordre et la stabilité sociale</li>
                <li><strong>Intégration</strong> : Favoriser l'adhésion aux valeurs collectives</li>
                <li><strong>Sanction</strong> : Punir les comportements qui s'écartent des normes</li>
              </ul>
              
              <p className="mt-4">
                Les mécanismes de contrôle social visent à <strong>prévenir, dissuader et sanctionner</strong> les comportements déviants, 
                mais aussi à <strong>valoriser et encourager</strong> les comportements conformes aux attentes sociales.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Types de contrôle social</h3>
              <p>On distingue généralement deux grandes formes de contrôle social :</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-300">Contrôle social formel</h4>
                  <p className="text-sm">Mécanismes institutionnalisés et explicites de régulation sociale (lois, police, justice...)</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-medium mb-2 text-green-700 dark:text-green-300">Contrôle social informel</h4>
                  <p className="text-sm">Mécanismes diffus et implicites opérant à travers les interactions quotidiennes (regards, remarques...)</p>
                </div>
              </div>
            </motion.section>
          )}
          
          {activeSection === "formel" && (
            <motion.section variants={itemVariants} className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Le contrôle social formel</h2>
              
              <p className="mb-4">
                Le contrôle social formel désigne les mécanismes explicitement organisés et institutionnalisés pour réguler les comportements.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Caractéristiques du contrôle social formel</h3>
              <ul>
                <li><strong>Institutionnalisation</strong> : Ancré dans des structures officielles</li>
                <li><strong>Codification</strong> : Repose sur des règles écrites et explicites</li>
                <li><strong>Légitimité</strong> : S'appuie sur une autorité reconnue</li>
                <li><strong>Sanctions formalisées</strong> : Prévoit des punitions codifiées et graduées</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Principaux agents du contrôle formel</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Scale className="h-5 w-5 text-socio-purple mr-2" />
                    <h3 className="font-semibold">Système juridique et judiciaire</h3>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                    <li>Lois et règlements codifiés</li>
                    <li>Police et forces de l'ordre</li>
                    <li>Tribunaux et système pénitentiaire</li>
                    <li>Sanctions légales (amendes, prison)</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-socio-purple mr-2" />
                    <h3 className="font-semibold">Institutions administratives</h3>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                    <li>Administrations publiques</li>
                    <li>Établissements scolaires</li>
                    <li>Services sociaux</li>
                    <li>Règlements intérieurs d'entreprises</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border-l-4 border-orange-500 mb-6">
                <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Point important</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Le contrôle social formel se caractérise par son <strong>caractère explicite</strong>, sa <strong>légitimité institutionnelle</strong> 
                  et l'existence de <strong>sanctions officielles et codifiées</strong>. Il s'appuie sur un pouvoir reconnu de contrainte.
                </p>
              </div>
            </motion.section>
          )}
          
          {activeSection === "informel" && (
            <motion.section variants={itemVariants} className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Le contrôle social informel</h2>
              
              <p className="mb-4">
                Le contrôle social informel s'exerce de manière diffuse à travers les interactions quotidiennes et les relations sociales, 
                sans cadre institutionnel explicite.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Caractéristiques du contrôle social informel</h3>
              <ul>
                <li><strong>Diffusion</strong> : Opère de manière implicite et quotidienne</li>
                <li><strong>Intériorisation</strong> : Souvent intégré par les individus via la socialisation</li>
                <li><strong>Spontanéité</strong> : Ne repose pas sur une planification systématique</li>
                <li><strong>Proximité</strong> : S'exerce principalement dans les relations interpersonnelles</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Agents et mécanismes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-socio-purple mr-2" />
                    <h3 className="font-semibold">Agents du contrôle informel</h3>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                    <li>Famille et proches</li>
                    <li>Groupes de pairs</li>
                    <li>Voisinage et communauté</li>
                    <li>Médias et réseaux sociaux</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-socio-purple mr-2" />
                    <h3 className="font-semibold">Mécanismes informels</h3>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                    <li>Approbation ou désapprobation</li>
                    <li>Rumeurs et commérages</li>
                    <li>Moqueries et exclusion</li>
                    <li>Reconnaissance sociale et valorisation</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Exemple concret</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Lorsqu'une personne s'habille de façon inappropriée pour une occasion (trop décontractée pour un entretien d'embauche), 
                  elle peut faire l'objet de regards désapprobateurs, de remarques ou même être exclue de certaines interactions. 
                  Ces réactions constituent une forme de contrôle social informel qui vise à ramener la personne vers un comportement 
                  conforme aux attentes sociales.
                </p>
              </div>
            </motion.section>
          )}
          
          {activeSection === "comparaison" && (
            <motion.section variants={itemVariants} className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Comparaison des formes de contrôle social</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Tableau comparatif</h3>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                  <thead className="bg-purple-100 dark:bg-purple-900/30 text-gray-800 dark:text-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left">Critères</th>
                      <th className="py-3 px-4 text-left">Contrôle social formel</th>
                      <th className="py-3 px-4 text-left">Contrôle social informel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="py-3 px-4 font-medium">Nature</td>
                      <td className="py-3 px-4">Institutionnalisé, explicite</td>
                      <td className="py-3 px-4">Diffus, implicite</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-800/50">
                      <td className="py-3 px-4 font-medium">Agents</td>
                      <td className="py-3 px-4">État, institutions, autorités</td>
                      <td className="py-3 px-4">Famille, pairs, communauté</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Sanctions</td>
                      <td className="py-3 px-4">Codifiées, officielles (amendes, prison)</td>
                      <td className="py-3 px-4">Diffuses, non-officielles (rejet, moqueries)</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-800/50">
                      <td className="py-3 px-4 font-medium">Légitimité</td>
                      <td className="py-3 px-4">Basée sur le droit et les règlements</td>
                      <td className="py-3 px-4">Basée sur les normes sociales et les valeurs</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Efficacité</td>
                      <td className="py-3 px-4">Variable selon le contexte, peut être contourné</td>
                      <td className="py-3 px-4">Souvent plus intériorisé et préventif</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Complémentarité des deux formes</h3>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500 mb-6">
                <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Complémentarité des formes de contrôle</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Les deux formes de contrôle social sont complémentaires et s'influencent mutuellement. 
                  Le contrôle informel est souvent plus efficace pour prévenir les comportements déviants, 
                  tandis que le contrôle formel intervient davantage pour les sanctionner lorsqu'ils se produisent.
                </p>
              </div>
              
              <p>
                Selon de nombreux sociologues, une société qui s'appuierait uniquement sur le contrôle formel serait inefficace. 
                Le contrôle informel, en agissant sur l'intériorisation des normes, joue un rôle crucial dans le maintien de 
                l'ordre social sans recourir systématiquement à la coercition.
              </p>
            </motion.section>
          )}
          
          {activeSection === "evolution" && (
            <motion.section variants={itemVariants} className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Évolution du contrôle social</h2>
              
              <p className="mb-4">
                Les formes de contrôle social évoluent en fonction des transformations sociales, culturelles et technologiques.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Transformations historiques</h3>
              <p>
                Historiquement, on observe plusieurs transformations majeures :
              </p>
              <ul>
                <li>Passage de sociétés basées principalement sur le <strong>contrôle informel</strong> (communautés traditionnelles) vers des sociétés où le <strong>contrôle formel</strong> prend plus d'importance</li>
                <li>Développement de l'<strong>État moderne</strong> et de ses institutions de contrôle (police, justice, administration)</li>
                <li>Complexification des <strong>systèmes normatifs</strong> avec la diversification des sphères sociales</li>
                <li>Émergence de nouvelles formes de contrôle liées aux <strong>technologies numériques</strong></li>
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-6">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-socio-purple mb-3">Tendances contemporaines</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="inline-block h-5 w-5 text-socio-purple mr-2">•</span>
                      <span><strong>Judiciarisation</strong> croissante des rapports sociaux</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-5 w-5 text-socio-purple mr-2">•</span>
                      <span>Développement de la <strong>vidéosurveillance</strong> et du contrôle numérique</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-5 w-5 text-socio-purple mr-2">•</span>
                      <span>Émergence de nouvelles formes de <strong>contrôle social en ligne</strong> (réseaux sociaux)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-socio-purple mb-3">Enjeux et défis</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="inline-block h-5 w-5 text-socio-purple mr-2">•</span>
                      <span>Équilibre entre <strong>sécurité et liberté</strong> individuelle</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-5 w-5 text-socio-purple mr-2">•</span>
                      <span>Affaiblissement des <strong>instances traditionnelles</strong> de contrôle social (famille, communauté)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-5 w-5 text-socio-purple mr-2">•</span>
                      <span>Question de la <strong>surveillance de masse</strong> et protection de la vie privée</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500 mb-6">
                <h3 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">Perspective sociologique</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Selon <strong>Michel Foucault</strong>, les sociétés modernes ont évolué vers des formes de contrôle plus diffuses et intériorisées, 
                  qu'il qualifie de "disciplinaires". Le pouvoir s'exerce désormais moins par la contrainte directe que par la normalisation 
                  et l'autodiscipline. Les individus intègrent les normes et s'auto-régulent, rendant le contrôle plus efficace et moins visible.
                </p>
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