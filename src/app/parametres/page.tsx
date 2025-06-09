"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, Trash2, Save, RefreshCw, Download } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

export default function ParametresPage() {
  const { theme, setTheme } = useTheme();
  const { progress, isLoading } = useProgress();
  const [resetConfirmation, setResetConfirmation] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Options pour la taille du texte
  const [fontSize, setFontSize] = useState("medium");
  
  // Options pour les notifications
  const [notifications, setNotifications] = useState({
    reminderEnabled: true,
    reminderFrequency: "daily",
    achievementEnabled: true,
    quizResultsEnabled: true
  });
  
  useEffect(() => {
    // Charger les préférences depuis localStorage
    const loadPreferences = () => {
      try {
        const savedPreferences = localStorage.getItem("user-preferences");
        if (savedPreferences) {
          const preferences = JSON.parse(savedPreferences);
          setFontSize(preferences.fontSize || "medium");
          setNotifications(preferences.notifications || {
            reminderEnabled: true,
            reminderFrequency: "daily",
            achievementEnabled: true,
            quizResultsEnabled: true
          });
        }
      } catch (error) {
        console.error("Erreur lors du chargement des préférences:", error);
      }
    };
    
    loadPreferences();
  }, []);
  
  const savePreferences = () => {
    try {
      const preferences = {
        fontSize,
        notifications
      };
      
      localStorage.setItem("user-preferences", JSON.stringify(preferences));
      setSaveSuccess(true);
      
      // Réinitialiser le message de succès après 3 secondes
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des préférences:", error);
    }
  };
  
  const resetProgress = () => {
    if (resetConfirmation) {
      // Réinitialiser la progression
      localStorage.removeItem("user-progress");
      localStorage.removeItem("user-favoris");
      
      // Recharger la page pour appliquer les changements
      window.location.reload();
    } else {
      setResetConfirmation(true);
      
      // Annuler la confirmation après 5 secondes
      setTimeout(() => {
        setResetConfirmation(false);
      }, 5000);
    }
  };
  
  const exportData = () => {
    try {
      const data = {
        progress: progress,
        preferences: {
          fontSize,
          notifications
        },
        favoris: localStorage.getItem("user-favoris") 
          ? JSON.parse(localStorage.getItem("user-favoris") || "[]") 
          : []
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = `bac-ses-revision-data-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      
      // Nettoyer
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors de l'exportation des données:", error);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Paramètres</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Personnalisez votre expérience de révision
        </p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <section className="card">
          <h2 className="text-2xl font-bold mb-4">Apparence</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Thème</h3>
              <div className="flex space-x-4">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex items-center p-3 rounded-lg border ${
                    theme === "light" 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <Sun className="h-5 w-5 mr-2 text-amber-500" />
                  <span>Clair</span>
                </button>
                
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex items-center p-3 rounded-lg border ${
                    theme === "dark" 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <Moon className="h-5 w-5 mr-2 text-indigo-400" />
                  <span>Sombre</span>
                </button>
                
                <button
                  onClick={() => setTheme("system")}
                  className={`flex items-center p-3 rounded-lg border ${
                    theme === "system" 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <span>Système</span>
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Taille du texte</h3>
              <div className="flex space-x-4">
                <button
                  onClick={() => setFontSize("small")}
                  className={`px-4 py-2 rounded-lg border ${
                    fontSize === "small" 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <span className="text-sm">Petit</span>
                </button>
                
                <button
                  onClick={() => setFontSize("medium")}
                  className={`px-4 py-2 rounded-lg border ${
                    fontSize === "medium" 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <span className="text-base">Moyen</span>
                </button>
                
                <button
                  onClick={() => setFontSize("large")}
                  className={`px-4 py-2 rounded-lg border ${
                    fontSize === "large" 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <span className="text-lg">Grand</span>
                </button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="card">
          <h2 className="text-2xl font-bold mb-4">Notifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="reminder-toggle" className="font-medium">
                Rappels de révision
              </label>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="reminder-toggle"
                  className="sr-only"
                  checked={notifications.reminderEnabled}
                  onChange={() => setNotifications({
                    ...notifications,
                    reminderEnabled: !notifications.reminderEnabled
                  })}
                />
                <div className={`block w-12 h-6 rounded-full transition-colors ${
                  notifications.reminderEnabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                }`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  notifications.reminderEnabled ? "transform translate-x-6" : ""
                }`}></div>
              </div>
            </div>
            
            {notifications.reminderEnabled && (
              <div className="pl-6 mb-4">
                <label htmlFor="reminder-frequency" className="block text-sm font-medium mb-1">
                  Fréquence des rappels
                </label>
                <select
                  id="reminder-frequency"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
                  value={notifications.reminderFrequency}
                  onChange={(e) => setNotifications({
                    ...notifications,
                    reminderFrequency: e.target.value
                  })}
                >
                  <option value="daily">Quotidien</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="biweekly">Deux fois par semaine</option>
                </select>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <label htmlFor="achievement-toggle" className="font-medium">
                Notifications d'accomplissement
              </label>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="achievement-toggle"
                  className="sr-only"
                  checked={notifications.achievementEnabled}
                  onChange={() => setNotifications({
                    ...notifications,
                    achievementEnabled: !notifications.achievementEnabled
                  })}
                />
                <div className={`block w-12 h-6 rounded-full transition-colors ${
                  notifications.achievementEnabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                }`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  notifications.achievementEnabled ? "transform translate-x-6" : ""
                }`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label htmlFor="quiz-results-toggle" className="font-medium">
                Résultats des quiz
              </label>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="quiz-results-toggle"
                  className="sr-only"
                  checked={notifications.quizResultsEnabled}
                  onChange={() => setNotifications({
                    ...notifications,
                    quizResultsEnabled: !notifications.quizResultsEnabled
                  })}
                />
                <div className={`block w-12 h-6 rounded-full transition-colors ${
                  notifications.quizResultsEnabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                }`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  notifications.quizResultsEnabled ? "transform translate-x-6" : ""
                }`}></div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <section className="card mb-8">
        <h2 className="text-2xl font-bold mb-4">Données et confidentialité</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Progression et favoris</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Vos données de progression et vos favoris sont stockés localement sur votre appareil.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={resetProgress}
                className={`flex items-center px-4 py-2 rounded-md ${
                  resetConfirmation 
                    ? "bg-red-600 hover:bg-red-700 text-white" 
                    : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                }`}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {resetConfirmation ? "Confirmer la réinitialisation" : "Réinitialiser toutes les données"}
              </button>
              
              <button
                onClick={exportData}
                className="flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md"
              >
                <Download className="h-4 w-4 mr-2" />
                Exporter mes données
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <div className="flex justify-end mb-8">
        <button
          onClick={savePreferences}
          className="flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          <Save className="h-4 w-4 mr-2" />
          Enregistrer les paramètres
        </button>
      </div>
      
      {saveSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-md shadow-md">
          Paramètres enregistrés avec succès !
        </div>
      )}
    </div>
  );
}
