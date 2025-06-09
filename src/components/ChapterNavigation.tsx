import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ChapterNavigationProps {
  next?: { slug: string; title: string };
  prev?: { slug: string; title: string };
  subject: string;
  module: string;
  onComplete?: () => void;
}

export default function ChapterNavigation({ 
  next, 
  prev, 
  subject, 
  module, 
  onComplete 
}: ChapterNavigationProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    if (onComplete && !isCompleted) {
      onComplete();
      setIsCompleted(true);
    }
  };

  return (
    <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full sm:w-1/3">
          {prev && (
            <Link 
              href={`/${subject}/${module}/${prev.slug}`}
              className="flex items-center justify-start text-socio-purple hover:text-socio-purple/80 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Précédent</div>
                <div className="font-medium">{prev.title}</div>
              </div>
            </Link>
          )}
        </div>
        
        <div className="w-full sm:w-1/3 flex justify-center">
          <button
            onClick={handleComplete}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              isCompleted 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 cursor-default'
                : 'bg-socio-purple/10 text-socio-purple hover:bg-socio-purple/20 dark:bg-socio-purple/20 dark:hover:bg-socio-purple/30'
            }`}
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            {isCompleted ? 'Chapitre terminé' : 'Marquer comme terminé'}
          </button>
        </div>
        
        <div className="w-full sm:w-1/3 flex justify-end">
          {next && (
            <Link 
              href={`/${subject}/${module}/${next.slug}`}
              className="flex items-center justify-end text-socio-purple hover:text-socio-purple/80 transition-colors"
            >
              <div className="text-right">
                <div className="text-xs text-gray-500 dark:text-gray-400">Suivant</div>
                <div className="font-medium">{next.title}</div>
              </div>
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 