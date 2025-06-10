"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Star, Trash2, Search, ChevronRight, Filter, Clock, Info, BookmarkPlus, FolderOpen } from "lucide-react";

// Type pour les éléments favoris
type FavoriItem = {
  id: string;
  title: string;
  type: "chapitre" | "quiz";
  subject: "economie" | "sociologie" | "science-politique";
  path: string;
  dateAdded: string;
  description?: string; // Description optionnelle
};

export default function FavorisPage() {
  const [favoris, setFavoris] = useState<FavoriItem[]>([]);
  const [filteredFavoris, setFilteredFavoris] = useState<FavoriItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"tous" | "chapitre" | "quiz" | "economie" | "sociologie" | "science-politique">("tous");
  const [sortOrder, setSortOrder] = useState<"recent" | "ancien" | "alphabetique">("recent");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  useEffect(() => {
    // Charger les favoris depuis le localStorage
    const loadFavoris = () => {
      setIsLoading(true);
      try {
        const savedFavoris = localStorage.getItem("user-favoris");
        if (savedFavoris) {
          setFavoris(JSON.parse(savedFavoris));
        } else {
          // Ajouter des favoris par défaut pour la démo
          const defaultFavoris: FavoriItem[] = [
            {
              id: "croissance-economique",
              title: "La croissance économique",
              type: "chapitre",
              subject: "economie",
              path: "/economie/macroeconomie/croissance",
              dateAdded: new Date().toISOString(),
              description: "Les mécanismes et facteurs de la croissance économique à long terme"
            },
            {
              id: "quiz-croissance-economique",
              title: "Quiz sur la croissance économique",
              type: "quiz",
              subject: "economie",
              path: "/quiz/economie/croissance-economique",
              dateAdded: new Date().toISOString(),
              description: "Testez vos connaissances sur la croissance économique et ses déterminants"
            },
            {
              id: "socialisation",
              title: "La socialisation",
              type: "chapitre",
              subject: "sociologie",
              path: "/sociologie/socialisation",
              dateAdded: new Date().toISOString(),
              description: "Le processus par lequel les individus intériorisent les normes et valeurs"
            },
            {
              id: "democratie",
              title: "La démocratie",
              type: "chapitre",
              subject: "science-politique",
              path: "/science-politique/democratie",
              dateAdded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 jours avant
              description: "Les principes et enjeux des régimes démocratiques"
            },
            {
              id: "quiz-normes-deviance",
              title: "Quiz sur les normes et la déviance",
              type: "quiz",
              subject: "sociologie",
              path: "/quiz/sociologie/controle-social-deviance/normes-deviance",
              dateAdded: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 jours avant
              description: "Quiz sur les normes sociales et les formes de déviance"
            }
          ];
          setFavoris(defaultFavoris);
          localStorage.setItem("user-favoris", JSON.stringify(defaultFavoris));
        }
      } catch (error) {
        console.error("Erreur lors du chargement des favoris:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavoris();
  }, []);

  // Filtrer et trier les favoris quand les filtres ou la recherche changent
  useEffect(() => {
    let result = [...favoris];
    
    // Filtrer par terme de recherche
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(favori => 
        favori.title.toLowerCase().includes(search) || 
        (favori.description && favori.description.toLowerCase().includes(search))
      );
    }
    
    // Filtrer par type ou sujet
    if (activeFilter !== "tous") {
      if (activeFilter === "chapitre" || activeFilter === "quiz") {
        result = result.filter(favori => favori.type === activeFilter);
      } else {
        result = result.filter(favori => favori.subject === activeFilter);
      }
    }
    
    // Trier les résultats
    switch (sortOrder) {
      case "recent":
        result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case "ancien":
        result.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
        break;
      case "alphabetique":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    
    setFilteredFavoris(result);
  }, [favoris, searchTerm, activeFilter, sortOrder]);

  const removeFavori = (id: string) => {
    const updatedFavoris = favoris.filter(favori => favori.id !== id);
    setFavoris(updatedFavoris);
    localStorage.setItem("user-favoris", JSON.stringify(updatedFavoris));
  };

  const getSubjectColor = (subject: FavoriItem["subject"]) => {
    switch (subject) {
      case "economie":
        return "text-eco-blue";
      case "sociologie":
        return "text-socio-purple";
      case "science-politique":
        return "text-politic-red";
      default:
        return "text-gray-600";
    }
  };

  const getSubjectName = (subject: FavoriItem["subject"]) => {
    switch (subject) {
      case "economie":
        return "Économie";
      case "sociologie":
        return "Sociologie";
      case "science-politique":
        return "Science Politique";
      default:
        return subject;
    }
  };

  const getSubjectBgColor = (subject: FavoriItem["subject"]) => {
    switch (subject) {
      case "economie":
        return "bg-eco-blue/10";
      case "sociologie":
        return "bg-socio-purple/10";
      case "science-politique":
        return "bg-politic-red/10";
      default:
        return "bg-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Aujourd'hui";
    } else if (diffDays === 1) {
      return "Hier";
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jours`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <motion.section 
        variants={item}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
          Vos favoris
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Retrouvez rapidement vos chapitres et quiz préférés
        </p>
      </motion.section>

      <motion.section 
        variants={item}
        className="mb-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-lg border-gray-300 pl-10 pr-3 py-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Rechercher dans vos favoris..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </button>
              
              <select
                className="rounded-lg border-gray-300 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
              >
                <option value="recent">Plus récent</option>
                <option value="ancien">Plus ancien</option>
                <option value="alphabetique">A-Z</option>
              </select>
            </div>
          </div>
          
          {isFilterMenuOpen && (
            <div className="mt-4 pt-4 border-t dark:border-gray-700">
              <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Filtrer par:</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter("tous")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                    activeFilter === "tous"
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setActiveFilter("chapitre")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition flex items-center ${
                    activeFilter === "chapitre"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                  Chapitres
                </button>
                <button
                  onClick={() => setActiveFilter("quiz")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition flex items-center ${
                    activeFilter === "quiz"
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  <Star className="h-3.5 w-3.5 mr-1.5" />
                  Quiz
                </button>
                <button
                  onClick={() => setActiveFilter("economie")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                    activeFilter === "economie"
                      ? "bg-eco-blue text-white"
                      : "bg-eco-blue/10 text-eco-blue hover:bg-eco-blue/20 dark:bg-eco-blue/20"
                  }`}
                >
                  Économie
                </button>
                <button
                  onClick={() => setActiveFilter("sociologie")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                    activeFilter === "sociologie"
                      ? "bg-socio-purple text-white"
                      : "bg-socio-purple/10 text-socio-purple hover:bg-socio-purple/20 dark:bg-socio-purple/20"
                  }`}
                >
                  Sociologie
                </button>
                <button
                  onClick={() => setActiveFilter("science-politique")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                    activeFilter === "science-politique"
                      ? "bg-politic-red text-white"
                      : "bg-politic-red/10 text-politic-red hover:bg-politic-red/20 dark:bg-politic-red/20"
                  }`}
                >
                  Science Politique
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.section>

      {isLoading ? (
        <motion.div 
          variants={item}
          className="card p-12 text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Chargement de vos favoris...</p>
        </motion.div>
      ) : filteredFavoris.length === 0 ? (
        <motion.div 
          variants={item}
          className="card p-12 text-center"
        >
          {searchTerm || activeFilter !== "tous" ? (
            <>
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
                Aucun favori ne correspond à votre recherche. Essayez de modifier vos critères de filtrage ou de recherche.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("tous");
                }}
                className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50"
              >
                Réinitialiser les filtres
              </button>
            </>
          ) : (
            <>
              <Star className="h-12 w-12 mx-auto mb-4 text-amber-400 opacity-50" />
              <h2 className="text-xl font-semibold mb-2">Aucun favori</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
                Vous n'avez pas encore ajouté de favoris. Explorez les chapitres et les quiz, puis cliquez sur l'étoile pour les ajouter ici.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition"
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                Explorer le contenu
              </Link>
            </>
          )}
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          className="grid grid-cols-1 gap-4"
        >
          <motion.div variants={item} className="mb-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {filteredFavoris.length} {filteredFavoris.length === 1 ? "résultat" : "résultats"}
              </p>
              
              {favoris.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm("Êtes-vous sûr de vouloir supprimer tous vos favoris ?")) {
                      setFavoris([]);
                      localStorage.setItem("user-favoris", JSON.stringify([]));
                    }
                  }}
                  className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Tout supprimer
                </button>
              )}
            </div>
          </motion.div>

          {filteredFavoris.map((favori, index) => (
            <motion.div 
              key={favori.id}
              variants={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative rounded-t-xl overflow-hidden">
                <div className={`h-2 ${
                  favori.subject === "economie" 
                    ? "bg-eco-blue" 
                    : favori.subject === "sociologie"
                    ? "bg-socio-purple"
                    : "bg-politic-red"
                }`}></div>
              </div>
              
              <div className="p-5">
                <div className="flex">
                  <div className={`p-2 rounded-md mr-4 ${
                    favori.type === "chapitre" 
                      ? "bg-blue-50 dark:bg-blue-900/20" 
                      : "bg-amber-50 dark:bg-amber-900/20"
                  }`}>
                    {favori.type === "chapitre" ? (
                      <BookOpen className={`h-5 w-5 ${getSubjectColor(favori.subject)}`} />
                    ) : (
                      <Star className="h-5 w-5 text-amber-500" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link 
                          href={favori.path} 
                          className="font-medium text-lg hover:underline flex items-center group"
                        >
                          {favori.title}
                          <ChevronRight className="h-4 w-4 ml-1 opacity-0 -translate-x-2 transition group-hover:opacity-100 group-hover:translate-x-0" />
                        </Link>
                        
                        {favori.description && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                            {favori.description}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubjectBgColor(favori.subject)} ${getSubjectColor(favori.subject)}`}>
                            {getSubjectName(favori.subject)}
                          </span>
                          
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            favori.type === "chapitre" 
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" 
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                          }`}>
                            {favori.type === "chapitre" ? "Chapitre" : "Quiz"}
                          </span>
                          
                          <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {formatDate(favori.dateAdded)}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeFavori(favori.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        aria-label="Retirer des favoris"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {!isLoading && favoris.length > 0 && (
        <motion.div 
          variants={item}
          className="mt-8 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 flex items-start"
        >
          <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-full mr-3">
            <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="font-medium">Comment ajouter des favoris ?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Lorsque vous consultez un chapitre ou un quiz, cliquez sur l'icône <Star className="h-4 w-4 text-amber-400 inline mx-1" /> 
              dans la barre d'actions pour l'ajouter à vos favoris. Vous pourrez ainsi y accéder rapidement depuis cette page.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
