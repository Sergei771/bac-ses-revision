"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { 
  Moon, Sun, Trash2, Save, RefreshCw, Download, Settings, 
  BellRing, Globe, PaintBucket, Type, Check, ChevronDown, Monitor
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

export default function ParametresPage() {
  const { theme, setTheme } = useTheme();
  const { progress, isLoading } = useProgress();
  const [resetConfirmation, setResetConfirmation] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"apparence" | "notifications" | "données">("apparence");
  
  // Options pour la taille du texte
  const [fontSize, setFontSize] = useState("medium");
  
  // Options pour les notifications
  const [notifications, setNotifications] = useState({
    reminderEnabled: true,
    reminderFrequency: "daily",
    achievementEnabled: true,
    quizResultsEnabled: true
  });

  // Langue de l'application
  const [language, setLanguage] = useState("fr");
  
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
          setLanguage(preferences.language || "fr");
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
        notifications,
        language
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
          notifications,
          language
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
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Paramètres
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Personnalisez votre expérience de révision
        </p>
      </motion.section>
      
      <motion.div 
        variants={item}
        className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
      >
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("apparence")}
            className={`flex items-center px-6 py-4 font-medium text-sm focus:outline-none ${
              activeTab === "apparence"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <PaintBucket className="h-4 w-4 mr-2" />
            Apparence
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center px-6 py-4 font-medium text-sm focus:outline-none ${
              activeTab === "notifications"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <BellRing className="h-4 w-4 mr-2" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab("données")}
            className={`flex items-center px-6 py-4 font-medium text-sm focus:outline-none ${
              activeTab === "données"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <Settings className="h-4 w-4 mr-2" />
            Données
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === "apparence" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-5 flex items-center">
                  <Sun className="h-5 w-5 mr-2 text-amber-500" />
                  Thème de l'application
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex flex-col items-center justify-center p-5 rounded-xl border transition ${
                      theme === "light" 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                        : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3">
                      <Sun className="h-8 w-8 text-amber-500" />
                    </div>
                    <span className="font-medium">Clair</span>
                    {theme === "light" && (
                      <div className="mt-2 px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50">
                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex flex-col items-center justify-center p-5 rounded-xl border transition ${
                      theme === "dark" 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                        : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center mb-3">
                      <Moon className="h-8 w-8 text-indigo-400" />
                    </div>
                    <span className="font-medium">Sombre</span>
                    {theme === "dark" && (
                      <div className="mt-2 px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50">
                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setTheme("system")}
                    className={`flex flex-col items-center justify-center p-5 rounded-xl border transition ${
                      theme === "system" 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                        : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white to-gray-900 border border-gray-200 flex items-center justify-center mb-3">
                      <Monitor className="h-8 w-8 text-gray-600" />
                    </div>
                    <span className="font-medium">Système</span>
                    {theme === "system" && (
                      <div className="mt-2 px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50">
                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-5 flex items-center">
                  <Type className="h-5 w-5 mr-2 text-blue-500" />
                  Taille du texte
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setFontSize("small")}
                    className={`flex flex-col items-center justify-center p-5 rounded-xl border transition ${
                      fontSize === "small" 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                        : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="text-2xl mb-2">A</div>
                    <span className="text-xs font-medium">Petit</span>
                    {fontSize === "small" && (
                      <div className="mt-2 px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50">
                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setFontSize("medium")}
                    className={`flex flex-col items-center justify-center p-5 rounded-xl border transition ${
                      fontSize === "medium" 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                        : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="text-3xl mb-2">A</div>
                    <span className="text-sm font-medium">Moyen</span>
                    {fontSize === "medium" && (
                      <div className="mt-2 px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50">
                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setFontSize("large")}
                    className={`flex flex-col items-center justify-center p-5 rounded-xl border transition ${
                      fontSize === "large" 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                        : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="text-4xl mb-2">A</div>
                    <span className="text-base font-medium">Grand</span>
                    {fontSize === "large" && (
                      <div className="mt-2 px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50">
                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-5 flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-green-500" />
                  Langue
                </h3>
                <div className="relative w-full md:w-64">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English (Anglais)</option>
                    <option value="es">Español (Espagnol)</option>
                    <option value="de">Deutsch (Allemand)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "notifications" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-5 flex items-center">
                  <BellRing className="h-5 w-5 mr-2 text-amber-500" />
                  Rappels de révision
                </h3>
                <div className="flex flex-col space-y-5">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div>
                      <label htmlFor="reminder-toggle" className="font-medium block mb-1">
                        Activer les rappels
                      </label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Recevez des notifications pour vous rappeler de réviser
                      </p>
                    </div>
                    <div className="relative inline-block w-14 h-7">
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
                      <div className={`block w-14 h-7 rounded-full transition-colors ${
                        notifications.reminderEnabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${
                        notifications.reminderEnabled ? "transform translate-x-7" : ""
                      }`}></div>
                    </div>
                  </div>
                  
                  {notifications.reminderEnabled && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <label htmlFor="reminder-frequency" className="block text-sm font-medium mb-2">
                        Fréquence des rappels
                      </label>
                      <select
                        id="reminder-frequency"
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        value={notifications.reminderFrequency}
                        onChange={(e) => setNotifications({
                          ...notifications,
                          reminderFrequency: e.target.value
                        })}
                      >
                        <option value="daily">Quotidien</option>
                        <option value="every_other_day">Un jour sur deux</option>
                        <option value="twice_a_week">Deux fois par semaine</option>
                        <option value="weekly">Hebdomadaire</option>
                      </select>
                      
                      <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-md text-sm">
                        <h4 className="font-medium mb-2">À quoi s'attendre :</h4>
                        {notifications.reminderFrequency === "daily" && (
                          <p className="text-gray-600 dark:text-gray-400">Vous recevrez un rappel chaque jour pour vous encourager à réviser.</p>
                        )}
                        {notifications.reminderFrequency === "every_other_day" && (
                          <p className="text-gray-600 dark:text-gray-400">Vous recevrez un rappel un jour sur deux.</p>
                        )}
                        {notifications.reminderFrequency === "twice_a_week" && (
                          <p className="text-gray-600 dark:text-gray-400">Vous recevrez deux rappels par semaine (mardi et vendredi).</p>
                        )}
                        {notifications.reminderFrequency === "weekly" && (
                          <p className="text-gray-600 dark:text-gray-400">Vous recevrez un rappel chaque semaine (le dimanche).</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-5 flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-purple-500" />
                  Autres notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div>
                      <label htmlFor="achievement-toggle" className="font-medium block mb-1">
                        Accomplissements
                      </label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Notifications quand vous atteignez de nouveaux objectifs
                      </p>
                    </div>
                    <div className="relative inline-block w-14 h-7">
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
                      <div className={`block w-14 h-7 rounded-full transition-colors ${
                        notifications.achievementEnabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${
                        notifications.achievementEnabled ? "transform translate-x-7" : ""
                      }`}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div>
                      <label htmlFor="quiz-toggle" className="font-medium block mb-1">
                        Résultats des quiz
                      </label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Résumé des quiz complétés et de vos performances
                      </p>
                    </div>
                    <div className="relative inline-block w-14 h-7">
                      <input
                        type="checkbox"
                        id="quiz-toggle"
                        className="sr-only"
                        checked={notifications.quizResultsEnabled}
                        onChange={() => setNotifications({
                          ...notifications,
                          quizResultsEnabled: !notifications.quizResultsEnabled
                        })}
                      />
                      <div className={`block w-14 h-7 rounded-full transition-colors ${
                        notifications.quizResultsEnabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${
                        notifications.quizResultsEnabled ? "transform translate-x-7" : ""
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "données" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-5 flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2 text-red-500" />
                  Réinitialiser les données
                </h3>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    Cette action supprimera définitivement toute votre progression et vos favoris. Cette action est irréversible.
                  </p>
                  <button
                    onClick={resetProgress}
                    className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                      resetConfirmation
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900/70"
                    }`}
                  >
                    {resetConfirmation ? "Confirmer la réinitialisation" : "Réinitialiser toutes les données"}
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-5 flex items-center">
                  <Download className="h-5 w-5 mr-2 text-green-500" />
                  Exportation des données
                </h3>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/50 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    Exportez votre progression et vos préférences dans un fichier JSON pour les sauvegarder ou les transférer vers un autre appareil.
                  </p>
                  <button
                    onClick={exportData}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                  >
                    Exporter mes données
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      
      <motion.div 
        variants={item}
        className="flex justify-end"
      >
        <button
          onClick={savePreferences}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center font-medium"
        >
          <Save className="h-5 w-5 mr-2" />
          Enregistrer les paramètres
        </button>
        
        {saveSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center"
          >
            <Check className="h-5 w-5 mr-2" />
            Paramètres enregistrés avec succès
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
