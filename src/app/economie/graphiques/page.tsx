"use client";

import Link from "next/link";
import { BarChart3, Landmark, TrendingUp, ArrowLeft } from "lucide-react";

export default function GraphiquesEconomieIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/economie" className="flex items-center text-eco-blue hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Retour à l'accueil économie
      </Link>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 mb-8">
        <h1 className="text-3xl font-bold text-eco-blue mb-2 flex items-center">
          <BarChart3 className="h-8 w-8 text-eco-blue mr-3" />
          Graphiques économiques interactifs
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Explorez les concepts économiques à travers des graphiques interactifs modernes pour mieux comprendre les mécanismes fondamentaux : marché, flux économiques, croissance…
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/economie/graphiques/offre-demande" className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
            <BarChart3 className="h-7 w-7 text-eco-blue mb-2" />
            <h2 className="text-lg font-semibold text-eco-blue mb-1">Offre et Demande</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Comprendre l'équilibre du marché</p>
          </Link>
          <Link href="/economie/graphiques/circuit-economique" className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
            <Landmark className="h-7 w-7 text-green-600 dark:text-green-400 mb-2" />
            <h2 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-1">Circuit économique</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Les flux entre les agents économiques</p>
          </Link>
          <Link href="/economie/graphiques/pib-croissance" className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-start">
            <TrendingUp className="h-7 w-7 text-purple-600 dark:text-purple-400 mb-2" />
            <h2 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-1">PIB et croissance</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Évolution des indicateurs macroéconomiques</p>
          </Link>
        </div>
      </div>
    </div>
  );
} 