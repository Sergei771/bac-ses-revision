"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  BarChart3, 
  BookOpen, 
  GraduationCap, 
  Home, 
  LineChart, 
  Settings, 
  Star, 
  Users, 
  Vote
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };
  
  const navItems = [
    { name: "Accueil", href: "/", icon: Home },
    { name: "Économie", href: "/economie", icon: LineChart, color: "text-eco-blue" },
    { name: "Sociologie", href: "/sociologie", icon: Users, color: "text-socio-purple" },
    { name: "Science Politique", href: "/science-politique", icon: Vote, color: "text-politic-red" },
    { name: "Quiz", href: "/quiz", icon: GraduationCap },
    { name: "Progression", href: "/progression", icon: BarChart3 },
    { name: "Favoris", href: "/favoris", icon: Star },
    { name: "Paramètres", href: "/parametres", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Navigation</h2>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive(item.href)
                    ? "bg-gray-100 dark:bg-gray-800 font-medium"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                } ${item.color || ""}`}
              >
                <Icon className="mr-3 h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
            Session de révision
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Suivez votre progression et gardez le rythme !
          </p>
          <button className="w-full btn btn-primary bg-eco-blue hover:bg-eco-blue/90">
            Démarrer une session
          </button>
        </div>
      </div>
    </aside>
  );
}
