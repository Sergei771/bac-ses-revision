"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Star, Trash2 } from "lucide-react";

// Type pour les éléments favoris
type FavoriItem = {
  id: string;
  title: string;
  type: "chapitre" | "quiz";
  subject: "economie" | "sociologie" | "science-politique";
  path: string;
  dateAdded: string;
};

export default function FavorisPage() {
  const [favoris, setFavoris] = useState<FavoriItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
              dateAdded: new Date().toISOString()
            },
            {
              id: "quiz-croissance-economique",
              title: "Quiz sur la croissance économique",
              type: "quiz",
              subject: "economie",
              path: "/quiz/economie/croissance-economique",
              dateAdded: new Date().toISOString()
            },
            {
              id: "socialisation",
              title: "La socialisation",
              type: "chapitre",
              subject: "sociologie",
              path: "/sociologie/socialisation",
              dateAdded: new Date().toISOString()
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

  return (
    <div className="max-w-7xl mx-auto">
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Vos favoris</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Retrouvez rapidement vos chapitres et quiz préférés
        </p>
      </section>

      {isLoading ? (
        <div className="card p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">Chargement de vos favoris...</p>
        </div>
      ) : favoris.length === 0 ? (
        <div className="card p-8 text-center">
          <Star className="h-12 w-12 mx-auto mb-4 text-amber-400 opacity-50" />
          <h2 className="text-xl font-semibold mb-2">Aucun favori</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Vous n'avez pas encore ajouté de favoris. Explorez les chapitres et les quiz, puis cliquez sur l'étoile pour les ajouter ici.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Explorer le contenu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {favoris.map((favori) => (
            <div 
              key={favori.id}
              className="card flex items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
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
                    <Link href={favori.path} className="font-medium hover:underline">
                      {favori.title}
                    </Link>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span className={`${getSubjectColor(favori.subject)}`}>
                        {getSubjectName(favori.subject)}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{favori.type === "chapitre" ? "Chapitre" : "Quiz"}</span>
                      <span className="mx-2">•</span>
                      <span>
                        Ajouté le {new Date(favori.dateAdded).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFavori(favori.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                    aria-label="Retirer des favoris"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
