"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "./theme-provider";
import { Menu, Search, Moon, Sun, X } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="md:hidden mr-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-eco-blue to-socio-purple bg-clip-text text-transparent">
              BAC SES Révision
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href="/economie"
              className="nav-link text-eco-blue hover:bg-blue-50 dark:hover:bg-blue-950/30"
            >
              Économie
            </Link>
            <Link
              href="/sociologie"
              className="nav-link text-socio-purple hover:bg-purple-50 dark:hover:bg-purple-950/30"
            >
              Sociologie
            </Link>
            <Link
              href="/science-politique"
              className="nav-link text-politic-red hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              Science Politique
            </Link>
            <Link
              href="/quiz"
              className="nav-link"
            >
              Quiz
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Recherche"
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
          <button
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Mode clair" : "Mode sombre"}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Barre de recherche */}
      {isSearchOpen && (
        <div className="border-t border-gray-200 dark:border-gray-800 py-3 px-4 animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher un concept, une notion..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 animate-fade-in">
          <nav className="flex flex-col py-2 px-4 space-y-1">
            <Link
              href="/economie"
              className="nav-link py-3 text-eco-blue hover:bg-blue-50 dark:hover:bg-blue-950/30"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Économie
            </Link>
            <Link
              href="/sociologie"
              className="nav-link py-3 text-socio-purple hover:bg-purple-50 dark:hover:bg-purple-950/30"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sociologie
            </Link>
            <Link
              href="/science-politique"
              className="nav-link py-3 text-politic-red hover:bg-red-50 dark:hover:bg-red-950/30"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Science Politique
            </Link>
            <Link
              href="/quiz"
              className="nav-link py-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Quiz
            </Link>
            <Link
              href="/progression"
              className="nav-link py-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Progression
            </Link>
            <Link
              href="/favoris"
              className="nav-link py-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Favoris
            </Link>
            <Link
              href="/parametres"
              className="nav-link py-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Paramètres
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
