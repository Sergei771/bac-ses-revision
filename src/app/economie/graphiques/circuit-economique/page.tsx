"use client";

import Link from "next/link";
import { ArrowLeft, Landmark } from "lucide-react";
import { useState } from "react";

// Définition des agents et des flux
const agents = [
  { id: "menages", label: "Ménages", color: "#2563eb", x: 50, y: 200, explication: "Les ménages consomment des biens/services, offrent leur travail et reçoivent des revenus (salaires, prestations)." },
  { id: "entreprises", label: "Entreprises", color: "#f59e42", x: 350, y: 200, explication: "Les entreprises produisent des biens/services, emploient du travail, versent des salaires et paient des impôts." },
  { id: "etat", label: "État", color: "#10b981", x: 200, y: 60, explication: "L'État prélève des impôts, redistribue des prestations, subventionne et régule l'économie." },
  { id: "monde", label: "Reste du monde", color: "#a78bfa", x: 200, y: 340, explication: "Le reste du monde échange avec l'économie nationale (import/export)." },
];
const flux = [
  { from: "menages", to: "entreprises", label: "Travail, consommation", color: "#2563eb", explication: "Les ménages offrent leur travail aux entreprises et achètent leurs biens/services." },
  { from: "entreprises", to: "menages", label: "Salaires, biens/services", color: "#f59e42", explication: "Les entreprises versent des salaires et vendent des biens/services aux ménages." },
  { from: "menages", to: "etat", label: "Impôts", color: "#10b981", explication: "Les ménages paient des impôts à l'État." },
  { from: "etat", to: "menages", label: "Prestations sociales", color: "#10b981", explication: "L'État verse des prestations sociales aux ménages (allocations, retraites, etc.)." },
  { from: "entreprises", to: "etat", label: "Impôts, cotisations", color: "#10b981", explication: "Les entreprises paient des impôts et cotisations à l'État." },
  { from: "etat", to: "entreprises", label: "Subventions, commandes publiques", color: "#10b981", explication: "L'État subventionne ou achète des biens/services aux entreprises." },
  { from: "entreprises", to: "monde", label: "Exportations", color: "#a78bfa", explication: "Les entreprises vendent des biens/services à l'étranger (exportations)." },
  { from: "monde", to: "entreprises", label: "Importations", color: "#a78bfa", explication: "Les entreprises achètent des biens/services à l'étranger (importations)." },
];

function getAgentById(id: string) {
  return agents.find(a => a.id === id)!;
}

export default function CircuitEconomiqueGraphiquePage() {
  const [selected, setSelected] = useState<{ type: 'agent' | 'flux'; id: string } | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  let encadre = null;
  if (selected) {
    if (selected.type === 'agent') {
      const agent = agents.find(a => a.id === selected.id);
      if (agent) {
        encadre = (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4 animate-fade-in">
            <h3 className="font-semibold text-eco-blue mb-1">{agent.label}</h3>
            <p className="text-gray-700 dark:text-gray-200">{agent.explication}</p>
          </div>
        );
      }
    } else if (selected.type === 'flux') {
      const f = flux.find((f, i) => `${f.from}-${f.to}` === selected.id);
      if (f) {
        encadre = (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mt-4 animate-fade-in">
            <h3 className="font-semibold text-green-700 dark:text-green-300 mb-1">{f.label}</h3>
            <p className="text-gray-700 dark:text-gray-200">{f.explication}</p>
          </div>
        );
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/economie/graphiques" className="flex items-center text-eco-blue hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Retour aux graphiques
      </Link>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 mb-8">
        <div className="flex items-center mb-4">
          <Landmark className="h-8 w-8 text-eco-blue mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-eco-blue">Graphique interactif : Circuit économique</h1>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Visualisez les flux entre les agents économiques (ménages, entreprises, État, reste du monde). Cliquez sur un agent ou une flèche pour voir le détail.
        </p>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 flex flex-col items-center justify-center min-h-[420px] mb-6 w-full">
          <svg width={420} height={400} className="block mx-auto">
            {/* Agents */}
            {agents.map(agent => (
              <g key={agent.id} style={{ cursor: 'pointer' }} onClick={() => setSelected({ type: 'agent', id: agent.id })}>
                <circle
                  cx={agent.x}
                  cy={agent.y}
                  r={38}
                  fill={agent.color}
                  opacity={selected?.type === 'agent' && selected.id === agent.id ? 0.35 : 0.15}
                  style={{ transition: 'opacity 0.2s' }}
                />
                <circle
                  cx={agent.x}
                  cy={agent.y}
                  r={30}
                  fill={agent.color}
                  stroke={selected?.type === 'agent' && selected.id === agent.id ? '#fff' : 'none'}
                  strokeWidth={selected?.type === 'agent' && selected.id === agent.id ? 4 : 0}
                  style={{ transition: 'stroke 0.2s' }}
                />
                <text x={agent.x} y={agent.y + 5} textAnchor="middle" fontSize={16} fill="#fff" fontWeight={600}>{agent.label}</text>
              </g>
            ))}
            {/* Flux (flèches) */}
            {flux.map((f, i) => {
              const from = getAgentById(f.from);
              const to = getAgentById(f.to);
              const dx = to.x - from.x;
              const dy = to.y - from.y;
              const angle = Math.atan2(dy, dx);
              const len = Math.sqrt(dx * dx + dy * dy) - 38;
              const startX = from.x + 38 * Math.cos(angle);
              const startY = from.y + 38 * Math.sin(angle);
              const endX = from.x + len * Math.cos(angle);
              const endY = from.y + len * Math.sin(angle);
              const isSelected = selected?.type === 'flux' && selected.id === `${f.from}-${f.to}`;
              return (
                <g key={i} style={{ cursor: 'pointer' }}
                  onClick={() => setSelected({ type: 'flux', id: `${f.from}-${f.to}` })}
                  onMouseEnter={() => setHovered(f.label)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <line
                    x1={startX} y1={startY} x2={endX} y2={endY}
                    stroke={f.color}
                    strokeWidth={isSelected ? 7 : 4}
                    markerEnd="url(#arrow)"
                    opacity={hovered === f.label || isSelected ? 1 : 0.7}
                    style={{ transition: 'stroke-width 0.2s, opacity 0.2s' }}
                  />
                  {/* Etiquette au milieu de la flèche */}
                  <text x={(startX + endX) / 2} y={(startY + endY) / 2 - 8} textAnchor="middle" fontSize={13} fill={f.color} fontWeight={600} opacity={hovered === f.label || isSelected ? 1 : 0.8}>{f.label}</text>
                </g>
              );
            })}
            {/* Définition de la flèche */}
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10 Z" fill="#6b7280" />
              </marker>
            </defs>
          </svg>
          {encadre}
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <h2>Légende</h2>
          <ul>
            <li><span className="font-bold text-eco-blue">Ménages</span> : Consommateurs, offre travail</li>
            <li><span className="font-bold text-orange-500">Entreprises</span> : Production, demande travail</li>
            <li><span className="font-bold text-green-600">État</span> : Impôts, prestations, subventions</li>
            <li><span className="font-bold text-purple-600">Reste du monde</span> : Import/export</li>
          </ul>
          <p className="mt-4">Cliquez sur un agent ou une flèche pour voir le détail de son rôle ou du flux.</p>
        </div>
      </div>
      <div className="flex justify-end">
        <Link href="/economie/graphiques" className="text-eco-blue hover:underline text-sm flex items-center">
          Voir tous les graphiques <ArrowLeft className="h-3.5 w-3.5 ml-1 rotate-180" />
        </Link>
      </div>
    </div>
  );
} 