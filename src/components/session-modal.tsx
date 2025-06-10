"use client";

import { useState } from 'react';
import { useSession } from '@/providers/session-provider';
import { Clock, BookOpen, Target, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SessionModal({ isOpen, onClose }: SessionModalProps) {
  const { startSession } = useSession();
  const [subject, setSubject] = useState<'economie' | 'sociologie' | 'science-politique' | 'all'>('all');
  const [goal, setGoal] = useState('');
  
  const handleStartSession = () => {
    startSession(subject, goal || 'Révision générale');
    onClose();
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <Clock className="mr-2 h-5 w-5 text-blue-500" />
                Démarrer une session
              </h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Matière à réviser</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className={`flex items-center justify-center p-3 rounded-md transition-colors ${
                      subject === 'all' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setSubject('all')}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Toutes
                  </button>
                  <button
                    type="button"
                    className={`flex items-center justify-center p-3 rounded-md transition-colors ${
                      subject === 'economie' 
                        ? 'bg-eco-blue/20 text-eco-blue dark:bg-eco-blue/30' 
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setSubject('economie')}
                  >
                    <span className="h-4 w-4 mr-2 bg-eco-blue rounded-full"></span>
                    Économie
                  </button>
                  <button
                    type="button"
                    className={`flex items-center justify-center p-3 rounded-md transition-colors ${
                      subject === 'sociologie' 
                        ? 'bg-socio-purple/20 text-socio-purple dark:bg-socio-purple/30' 
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setSubject('sociologie')}
                  >
                    <span className="h-4 w-4 mr-2 bg-socio-purple rounded-full"></span>
                    Sociologie
                  </button>
                  <button
                    type="button"
                    className={`flex items-center justify-center p-3 rounded-md transition-colors ${
                      subject === 'science-politique' 
                        ? 'bg-politic-red/20 text-politic-red dark:bg-politic-red/30' 
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setSubject('science-politique')}
                  >
                    <span className="h-4 w-4 mr-2 bg-politic-red rounded-full"></span>
                    Science Politique
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="goal" className="block text-sm font-medium mb-2">
                  Objectif de la session (optionnel)
                </label>
                <input
                  type="text"
                  id="goal"
                  placeholder="Ex: Réviser le chapitre sur la croissance économique"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={goal}
                  onChange={e => setGoal(e.target.value)}
                />
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                <div className="flex items-start">
                  <Target className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-700 dark:text-blue-300">Conseils pour une session efficace</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1 list-disc list-inside">
                      <li>Fixez-vous un objectif clair</li>
                      <li>Éliminez les distractions</li>
                      <li>Faites des pauses régulières</li>
                      <li>Testez vos connaissances avec des quiz</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                type="button"
                className="flex-1 btn btn-secondary"
                onClick={onClose}
              >
                Annuler
              </button>
              <button
                type="button"
                className="flex-1 btn btn-primary bg-eco-blue hover:bg-eco-blue/90"
                onClick={handleStartSession}
              >
                Commencer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 