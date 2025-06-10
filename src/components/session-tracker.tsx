"use client";

import { useEffect, useState } from 'react';
import { useSession } from '@/providers/session-provider';
import { Clock, Target, Bookmark, PauseCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SessionTracker() {
  const { session, endSession, getElapsedTime, formatTime } = useSession();
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Mise à jour du temps écoulé toutes les secondes
  useEffect(() => {
    if (session.active) {
      const timer = setInterval(() => {
        setElapsedTime(getElapsedTime());
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [session.active, getElapsedTime]);
  
  if (!session.active) {
    return null;
  }
  
  // Déterminer la couleur selon la matière
  const getSubjectColor = () => {
    switch (session.subject) {
      case 'economie':
        return 'border-eco-blue';
      case 'sociologie':
        return 'border-socio-purple';
      case 'science-politique':
        return 'border-politic-red';
      default:
        return 'border-blue-500';
    }
  };
  
  const getSubjectName = () => {
    switch (session.subject) {
      case 'economie':
        return 'Économie';
      case 'sociologie':
        return 'Sociologie';
      case 'science-politique':
        return 'Science Politique';
      default:
        return 'Toutes les matières';
    }
  };
  
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className={`fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm w-full border-l-4 ${getSubjectColor()} z-50`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg flex items-center">
          <Clock className="h-5 w-5 mr-2 text-blue-500" />
          Session en cours
        </h3>
        <button
          onClick={endSession}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <XCircle className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <Bookmark className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {getSubjectName()}
          </span>
        </div>
        
        {session.goal && (
          <div className="flex items-center">
            <Target className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {session.goal}
            </span>
          </div>
        )}
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          <div className="text-center">
            <span className="text-2xl font-mono font-bold">
              {formatTime(elapsedTime)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <button
          onClick={endSession}
          className="flex-1 btn btn-primary bg-red-500 hover:bg-red-600 flex items-center justify-center"
        >
          <XCircle className="h-4 w-4 mr-1" />
          Terminer
        </button>
      </div>
    </motion.div>
  );
} 