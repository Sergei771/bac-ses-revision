import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

interface QuizCardProps {
  title: string;
  description: string;
  href: string;
}

export default function QuizCard({ title, description, href }: QuizCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center mb-3">
        <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-md mr-3 text-socio-purple">
          <HelpCircle className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {description}
      </p>
      
      <Link 
        href={href}
        className="w-full flex items-center justify-center px-4 py-2 bg-socio-purple text-white rounded-lg hover:bg-socio-purple/90 transition-colors"
      >
        Commencer le quiz
      </Link>
    </div>
  );
} 